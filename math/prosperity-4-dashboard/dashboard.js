// ============================================================================
// Prosperity 4 Trading Dashboard
// ----------------------------------------------------------------------------
// Parses Prosperity 4 price CSVs (semicolon-delimited order book snapshots)
// and renders interactive charts via Chart.js.
// ============================================================================

// ---------- Global state ----------------------------------------------------
// Everything the UI needs to re-render lives here. `render()` reads this and
// rebuilds the DOM; any user interaction mutates state and calls render().
const state = {
  rows: [],             // all parsed rows across all loaded CSVs
  products: [],         // unique product names, sorted
  days: [],             // unique day numbers, sorted
  selectedProduct: null,
  selectedDay: 'all',   // 'all' or a specific day number
  charts: {},           // active Chart.js instances, keyed by chart name
};

// Tiny alias for querySelector — used everywhere.
const $ = (sel) => document.querySelector(sel);

// ---------- CSV parsing -----------------------------------------------------
// Prosperity CSVs use `;` as the delimiter. The `product` column is a string;
// everything else is numeric. Blank numeric cells become null so chart gaps
// render correctly instead of collapsing to 0.
function parseCSV(text) {
  const lines = text.trim().split(/\r?\n/);
  if (!lines.length) return [];

  const header = lines[0].split(';').map(h => h.trim());
  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    const parts = lines[i].split(';');
    // Skip malformed / truncated lines rather than polluting the dataset.
    if (parts.length < header.length) continue;

    const row = {};
    for (let j = 0; j < header.length; j++) {
      const key = header[j];
      const val = parts[j];
      if (key === 'product') {
        row[key] = val;
      } else {
        row[key] = val === '' || val == null ? null : Number(val);
      }
    }
    rows.push(row);
  }
  return rows;
}

// Handles a FileList from the <input type="file"> element. Reads each file,
// parses it, merges the rows, and refreshes the UI.
async function handleFiles(files) {
  if (!files.length) return;

  const all = [];
  for (const f of files) {
    const text = await f.text();
    const rows = parseCSV(text);
    all.push(...rows);
  }

  state.rows = all;
  state.products = [...new Set(all.map(r => r.product))].sort();
  state.days = [...new Set(all.map(r => r.day))].sort((a, b) => a - b);
  state.selectedProduct = state.products[0] || null;
  state.selectedDay = 'all';

  $('#fileInfo').textContent =
    `${all.length.toLocaleString()} rows · ${state.products.length} products · days ${state.days.join(',')}`;

  render();
}

// ---------- Data access helpers ---------------------------------------------
// Returns rows matching the current product + day filter, sorted so the
// x-axis is monotonic (day first, then timestamp within a day).
function filteredRows() {
  return state.rows
    .filter(r =>
      r.product === state.selectedProduct &&
      (state.selectedDay === 'all' || r.day === state.selectedDay)
    )
    .sort((a, b) => (a.day - b.day) || (a.timestamp - b.timestamp));
}

// Chart.js leaks memory if old charts aren't destroyed before new ones are
// created on the same canvas. Call this before every re-render.
function destroyCharts() {
  for (const k of Object.keys(state.charts)) {
    state.charts[k]?.destroy();
    delete state.charts[k];
  }
}

// ---------- Top-level render ------------------------------------------------
// Rebuilds the entire main area. Cheap enough for this dataset size; keeps the
// UI logic simple (no diffing) and guarantees charts never get out of sync.
function render() {
  const main = $('#main');

  // Empty state — no data loaded yet.
  if (!state.rows.length) {
    main.innerHTML = '<div class="empty full" id="empty"><p>Upload one or more Prosperity 4 price CSV files to begin.</p></div>';
    return;
  }

  destroyCharts();

  // Layout: controls → summary → 1 wide chart → 2x2 grid → order book table.
  main.innerHTML = `
    <div class="panel full">
      <div class="product-pills" id="productPills"></div>
      <div style="display:flex;gap:10px;align-items:center;">
        <label>Day:</label>
        <select id="daySelect">
          <option value="all">All days</option>
          ${state.days.map(d => `<option value="${d}">Day ${d}</option>`).join('')}
        </select>
      </div>
    </div>

    <div class="panel full">
      <h2>Summary — <span id="sumProd"></span></h2>
      <div class="stats" id="stats"></div>
    </div>

    <div class="panel full">
      <h2>Mid Price + Best Bid / Ask</h2>
      <div class="chart-wrap tall"><canvas id="priceChart"></canvas></div>
    </div>

    <div class="panel">
      <h2>Spread</h2>
      <div class="chart-wrap"><canvas id="spreadChart"></canvas></div>
    </div>

    <div class="panel">
      <h2>Profit &amp; Loss</h2>
      <div class="chart-wrap"><canvas id="pnlChart"></canvas></div>
    </div>

    <div class="panel">
      <h2>Order Book Depth (Volume)</h2>
      <div class="chart-wrap"><canvas id="depthChart"></canvas></div>
    </div>

    <div class="panel">
      <h2>Mid Price Distribution</h2>
      <div class="chart-wrap"><canvas id="histChart"></canvas></div>
    </div>

    <div class="panel full">
      <h2>Latest Order Book Snapshot</h2>
      <div id="bookTable"></div>
    </div>
  `;

  // Product pills — click to switch the active product.
  const pills = $('#productPills');
  pills.innerHTML = state.products.map(p =>
    `<div class="pill ${p === state.selectedProduct ? 'active' : ''}" data-p="${p}">${p}</div>`
  ).join('');
  pills.querySelectorAll('.pill').forEach(el => {
    el.addEventListener('click', () => {
      state.selectedProduct = el.dataset.p;
      render();
    });
  });

  // Day dropdown.
  const daySel = $('#daySelect');
  daySel.value = String(state.selectedDay);
  daySel.addEventListener('change', () => {
    state.selectedDay = daySel.value === 'all' ? 'all' : Number(daySel.value);
    render();
  });

  $('#sumProd').textContent = state.selectedProduct;

  drawAll();
}

// ---------- Chart drawing ---------------------------------------------------
// Computes stats, renders the summary cards, and builds every Chart.js
// instance for the currently-filtered rows.
function drawAll() {
  const rows = filteredRows();
  if (!rows.length) return;

  // ---- Aggregate stats ----
  const mids = rows.map(r => r.mid_price).filter(v => v != null);
  const pnls = rows.map(r => r.profit_and_loss).filter(v => v != null);
  const spreads = rows
    .map(r => (r.ask_price_1 != null && r.bid_price_1 != null) ? r.ask_price_1 - r.bid_price_1 : null)
    .filter(v => v != null);

  const lastPnl = pnls.length ? pnls[pnls.length - 1] : 0;
  const minMid = Math.min(...mids);
  const maxMid = Math.max(...mids);
  const meanMid = mids.reduce((a, b) => a + b, 0) / mids.length;
  // Population standard deviation — we have the whole series, not a sample.
  const stdMid = Math.sqrt(mids.reduce((a, b) => a + (b - meanMid) ** 2, 0) / mids.length);
  const meanSpread = spreads.reduce((a, b) => a + b, 0) / spreads.length;

  $('#stats').innerHTML = `
    ${stat('Rows', rows.length.toLocaleString())}
    ${stat('Final P&L', fmt(lastPnl), lastPnl)}
    ${stat('Mean Mid', fmt(meanMid))}
    ${stat('Std Mid', fmt(stdMid))}
    ${stat('Min / Max', `${fmt(minMid)} / ${fmt(maxMid)}`)}
    ${stat('Mean Spread', fmt(meanSpread))}
  `;

  // X-axis labels: if we're looking at a single day, show just the timestamp;
  // otherwise prefix with `D{day}:` so concatenated days stay disambiguated.
  const labels = rows.map(r =>
    state.selectedDay === 'all' ? `D${r.day}:${r.timestamp}` : r.timestamp
  );

  // ---- Price chart: mid + best bid + best ask ----
  state.charts.price = new Chart($('#priceChart'), {
    type: 'line',
    data: {
      labels,
      datasets: [
        { label: 'Mid',      data: rows.map(r => r.mid_price),    borderColor: '#58a6ff', backgroundColor: 'transparent', borderWidth: 1.5, pointRadius: 0, tension: 0 },
        { label: 'Best Bid', data: rows.map(r => r.bid_price_1),  borderColor: '#3fb950', backgroundColor: 'transparent', borderWidth: 1,   pointRadius: 0, tension: 0 },
        { label: 'Best Ask', data: rows.map(r => r.ask_price_1),  borderColor: '#f85149', backgroundColor: 'transparent', borderWidth: 1,   pointRadius: 0, tension: 0 },
      ],
    },
    options: chartOpts(),
  });

  // ---- Spread chart: scatter of (ask_1 - bid_1) ----
  // Dots (not a line) because spreads are typically discrete integer values
  // and a line chart would imply continuous variation that isn't there.
  state.charts.spread = new Chart($('#spreadChart'), {
    type: 'scatter',
    data: {
      datasets: [{
        label: 'Spread',
        data: rows.map((r, i) => ({
          x: i,
          y: (r.ask_price_1 != null && r.bid_price_1 != null) ? r.ask_price_1 - r.bid_price_1 : null,
        })).filter(p => p.y != null),
        backgroundColor: '#d29922',
        borderColor: '#d29922',
        pointRadius: 2,
        pointHoverRadius: 4,
        showLine: false,
      }],
    },
    // Scatter axes are numeric, so we substitute in the text labels via a
    // tick callback to match the other charts visually.
    options: chartOpts({
      xTickCallback: (val) => labels[Math.round(val)] ?? '',
    }),
  });

  // ---- P&L chart ---- (color-coded by final sign)
  state.charts.pnl = new Chart($('#pnlChart'), {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'P&L',
        data: rows.map(r => r.profit_and_loss),
        borderColor: lastPnl >= 0 ? '#3fb950' : '#f85149',
        backgroundColor: lastPnl >= 0 ? 'rgba(63,185,80,0.15)' : 'rgba(248,81,73,0.15)',
        borderWidth: 1.5,
        pointRadius: 0,
        fill: true,
        tension: 0,
      }],
    },
    options: chartOpts(),
  });

  // ---- Depth chart: total bid vs ask volume over time ----
  // Ask volume plotted as negative so the chart mirrors around zero like a
  // traditional depth view.
  state.charts.depth = new Chart($('#depthChart'), {
    type: 'line',
    data: {
      labels,
      datasets: [
        { label: 'Total Bid Vol', data: rows.map(r => sumVol(r, 'bid')),  borderColor: '#3fb950', backgroundColor: 'rgba(63,185,80,0.2)', borderWidth: 1, pointRadius: 0, fill: true, tension: 0 },
        { label: 'Total Ask Vol', data: rows.map(r => -sumVol(r, 'ask')), borderColor: '#f85149', backgroundColor: 'rgba(248,81,73,0.2)', borderWidth: 1, pointRadius: 0, fill: true, tension: 0 },
      ],
    },
    options: chartOpts(),
  });

  // ---- Mid-price histogram ----
  // Fixed 30 bins over the observed range; clamps the max-value edge case.
  const bins = 30;
  const range = maxMid - minMid || 1;
  const binW = range / bins;
  const hist = new Array(bins).fill(0);
  for (const m of mids) {
    let i = Math.floor((m - minMid) / binW);
    if (i >= bins) i = bins - 1;
    if (i < 0) i = 0;
    hist[i]++;
  }
  state.charts.hist = new Chart($('#histChart'), {
    type: 'bar',
    data: {
      labels: hist.map((_, i) => (minMid + i * binW).toFixed(1)),
      datasets: [{ label: 'Frequency', data: hist, backgroundColor: '#58a6ff' }],
    },
    options: chartOpts(),
  });

  // ---- Latest order book snapshot ----
  const last = rows[rows.length - 1];
  $('#bookTable').innerHTML = renderBook(last);
}

// ---------- Small utilities -------------------------------------------------

// Sums bid or ask volumes across all 3 book levels for a single row.
function sumVol(r, side) {
  let s = 0;
  for (let i = 1; i <= 3; i++) {
    const v = r[`${side}_volume_${i}`];
    if (v != null) s += v;
  }
  return s;
}

// Renders a 3-level order book table for a single snapshot row.
// Asks are listed top→bottom in reverse (3, 2, 1) so the best ask sits
// directly above the best bid, like a real exchange book.
function renderBook(r) {
  const rows = [];
  for (let i = 3; i >= 1; i--) {
    const p = r[`ask_price_${i}`], v = r[`ask_volume_${i}`];
    if (p != null) rows.push(`<tr><td class="ask">${p}</td><td class="ask">${v}</td><td>ASK ${i}</td></tr>`);
  }
  for (let i = 1; i <= 3; i++) {
    const p = r[`bid_price_${i}`], v = r[`bid_volume_${i}`];
    if (p != null) rows.push(`<tr><td class="bid">${p}</td><td class="bid">${v}</td><td>BID ${i}</td></tr>`);
  }
  return `<table><thead><tr><th>Price</th><th>Volume</th><th>Level</th></tr></thead><tbody>${rows.join('')}</tbody></table>
  <p class="file-info" style="margin-top:8px;">Snapshot @ day ${r.day}, t=${r.timestamp} · mid=${r.mid_price}</p>`;
}

// Builds a single summary stat card. Pass `signed` to colorize by sign.
function stat(label, val, signed) {
  let cls = '';
  if (signed != null) cls = signed >= 0 ? 'pos' : 'neg';
  return `<div class="stat"><div class="label">${label}</div><div class="value ${cls}">${val}</div></div>`;
}

// Compact number formatter for the summary cards.
function fmt(n) {
  if (n == null || isNaN(n)) return '—';
  if (Math.abs(n) >= 1000) return n.toFixed(0);
  return n.toFixed(2);
}

// Shared Chart.js options — dark theme, no aspect ratio lock (we size the
// wrapper div instead). Accepts an `extra.xTickCallback` for the scatter
// chart, which needs custom tick label resolution.
function chartOpts(extra = {}) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: { labels: { color: '#e6edf3', font: { size: 11 } } },
      tooltip: { backgroundColor: '#161b22', borderColor: '#2a313c', borderWidth: 1 },
    },
    scales: {
      x: {
        ticks: {
          color: '#8b949e',
          maxTicksLimit: 10,
          font: { size: 10 },
          ...(extra.xTickCallback ? { callback: extra.xTickCallback } : {}),
        },
        grid: { color: 'rgba(255,255,255,0.04)' },
      },
      y: {
        ticks: { color: '#8b949e', font: { size: 10 } },
        grid: { color: 'rgba(255,255,255,0.04)' },
      },
    },
  };
}

// ---------- Wire up controls ------------------------------------------------
$('#fileInput').addEventListener('change', e => handleFiles([...e.target.files]));

$('#clearBtn').addEventListener('click', () => {
  state.rows = [];
  state.products = [];
  state.days = [];
  state.selectedProduct = null;
  $('#fileInput').value = '';
  $('#fileInfo').textContent = 'No file loaded';
  destroyCharts();
  render();
});
