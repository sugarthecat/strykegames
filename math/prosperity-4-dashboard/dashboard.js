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
  rows: [],             // all parsed rows across all loaded CSVs / logs
  rowsIndex: new Map(), // product → { byDay: Map<day, rows[]>, all: rows[] }, each pre-sorted
  trades: [],           // user's buy/sell fills parsed from .log files
  products: [],         // unique product names, sorted
  days: [],             // unique day numbers, sorted
  selectedProduct: null,
  selectedDay: 'all',   // 'all' or a specific day number
  charts: {},           // active Chart.js instances, keyed by chart name
  optionMappings: [],   // user-declared: [{product, underlying, strike, quantity}]
  mappingsCollapsed: localStorage.getItem('prosperity4.optionMappingsCollapsed') === '1',
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

// Parses a Prosperity `.log` submission file. These are JSON documents that
// bundle the activities CSV (same columns as a standalone CSV) together with
// the submission's trade history. We only care about rows + user trades.
//
// Trades have no `day` field — Prosperity training logs cover a single day, so
// we tag trades with the unique day found in the activities rows (or the first
// day if multiple are present) so downstream day-filtering works.
function parseLog(text) {
  const obj = JSON.parse(text);
  const rows = parseCSV(obj.activitiesLog || '');

  const days = [...new Set(rows.map(r => r.day))];
  const defaultDay = days.length ? days[0] : null;

  // Trades with empty buyer AND seller are market trades from other bots;
  // keep only fills where SUBMISSION (us) is on one side.
  const trades = (obj.tradeHistory || [])
    .filter(t => t.buyer === 'SUBMISSION' || t.seller === 'SUBMISSION')
    .map(t => ({
      day: defaultDay,
      timestamp: t.timestamp,
      product: t.symbol,
      price: t.price,
      quantity: t.quantity,
      side: t.buyer === 'SUBMISSION' ? 'buy' : 'sell',
    }));

  return { rows, trades };
}

// Handles a FileList from the <input type="file"> element. Reads each file,
// auto-detects CSV vs JSON .log format, merges rows + trades, refreshes UI.
async function handleFiles(files) {
  if (!files.length) return;

  const allRows = [];
  const allTrades = [];

  for (const f of files) {
    const text = await f.text();
    // Cheap format sniff: a JSON log starts with `{`, a CSV with `day;...`.
    if (text.trimStart().startsWith('{')) {
      const { rows, trades } = parseLog(text);
      allRows.push(...rows);
      allTrades.push(...trades);
    } else {
      allRows.push(...parseCSV(text));
    }
  }

  state.rows = allRows;
  state.trades = allTrades;
  state.rowsIndex = buildRowsIndex(allRows);
  state.products = [...state.rowsIndex.keys()].sort();
  const daySet = new Set();
  for (const r of allRows) daySet.add(r.day);
  state.days = [...daySet].sort((a, b) => a - b);
  state.selectedProduct = state.products[0] || null;
  state.selectedDay = 'all';

  const tradeInfo = allTrades.length ? ` · ${allTrades.length} trades` : '';
  $('#fileInfo').textContent =
    `${allRows.length.toLocaleString()} rows · ${state.products.length} products · days ${state.days.join(',')}${tradeInfo}`;

  render();
}

// ---------- Data access helpers ---------------------------------------------
// Builds a per-product, per-day index of rows pre-sorted by timestamp (and a
// cross-day flat array sorted by (day, timestamp)). Done once per file load so
// filteredRows / rowsForProduct become O(1) lookups instead of O(N) filter +
// O(N log N) sort on every call — and they're called many times per render
// (once per option mapping for the arb scanner).
function buildRowsIndex(allRows) {
  const idx = new Map();
  for (const r of allRows) {
    let entry = idx.get(r.product);
    if (!entry) {
      entry = { byDay: new Map(), all: [] };
      idx.set(r.product, entry);
    }
    let bucket = entry.byDay.get(r.day);
    if (!bucket) {
      bucket = [];
      entry.byDay.set(r.day, bucket);
    }
    bucket.push(r);
    entry.all.push(r);
  }
  for (const entry of idx.values()) {
    for (const bucket of entry.byDay.values()) {
      bucket.sort((a, b) => a.timestamp - b.timestamp);
    }
    entry.all.sort((a, b) => (a.day - b.day) || (a.timestamp - b.timestamp));
  }
  return idx;
}

// Rows matching the current product + day filter. Returns the index bucket
// directly — callers must not mutate.
function filteredRows() {
  return rowsForProduct(state.selectedProduct);
}

// Same filter applied to user trades from a loaded .log file.
function filteredTrades() {
  return state.trades.filter(t =>
    t.product === state.selectedProduct &&
    (state.selectedDay === 'all' || t.day === state.selectedDay)
  );
}

// Rows for an arbitrary product, filtered by the current day selection.
// Backed by the pre-built index — no filter/sort on the hot path.
function rowsForProduct(product) {
  const entry = state.rowsIndex.get(product);
  if (!entry) return [];
  if (state.selectedDay === 'all') return entry.all;
  return entry.byDay.get(state.selectedDay) || [];
}

// ---------- Option ↔ underlying mapping -------------------------------------
// Mappings are user-declared via the "Option Mappings" panel (each entry
// specifies which product is an option on which underlying, plus strike and
// quantity/multiplier). Persisted to localStorage so they survive reloads.
// Naming conventions vary across rounds (VOLCANIC_ROCK_VOUCHER_10000 vs
// VEV_5000 → VELVETFRUIT_EXTRACT, etc.) so there's no reliable auto-derivation.
const LS_KEY_OPTIONS = 'prosperity4.optionMappings';
const LS_KEY_MAPPINGS_COLLAPSED = 'prosperity4.optionMappingsCollapsed';

function loadOptionMappings() {
  try {
    const arr = JSON.parse(localStorage.getItem(LS_KEY_OPTIONS) || '[]');
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function saveOptionMappings() {
  localStorage.setItem(LS_KEY_OPTIONS, JSON.stringify(state.optionMappings));
}

// Returns the mapping for `product` if it has been declared as an option,
// otherwise null. Quantity defaults to 1 if unset.
function getOptionMapping(product) {
  const m = state.optionMappings.find(x => x.product === product);
  if (!m) return null;
  return { ...m, quantity: m.quantity ?? 1 };
}

// All declared options on a given underlying, sorted by strike ascending.
function optionsOn(underlying) {
  return state.optionMappings
    .filter(m => m.underlying === underlying)
    .map(m => ({ ...m, quantity: m.quantity ?? 1 }))
    .sort((a, b) => a.strike - b.strike);
}

// ---------- Arbitrage scanner -----------------------------------------------
// Scans the filtered range for arbitrage opportunities at the best bid/ask of
// both option and underlying (so the detected profit is actually tradeable,
// not just a mid-price illusion). Returns {long, short} where each side is
// {count, best, latest} or null if no opportunities were found.
//
//   Long-option arb (option below intrinsic):
//     Buy option at opAsk, sell qty × underlying at spotBid.
//     Locked-in profit = (spotBid − strike) × qty − opAsk
//     This is the "buy a strike-3000 voucher for 500 and sell underlying at 4000" case.
//
//   Short-option arb (option above underlying upper bound):
//     Sell option at opBid, buy qty × underlying at spotAsk.
//     Locked-in profit = opBid − spotAsk × qty
//     Rare — fires only when a call trades above its own underlying per share.
function scanArbitrage(mapping, undByKey) {
  const opRows = rowsForProduct(mapping.product);
  const K = mapping.strike;
  const Q = mapping.quantity;

  const longOpps = [];
  const shortOpps = [];
  for (const o of opRows) {
    const u = undByKey.get(`${o.day}:${o.timestamp}`);
    if (!u) continue;

    if (o.ask_price_1 != null && u.bid_price_1 != null) {
      const profit = (u.bid_price_1 - K) * Q - o.ask_price_1;
      if (profit > 0) longOpps.push({
        day: o.day, timestamp: o.timestamp, profit,
        opPrice: o.ask_price_1, spot: u.bid_price_1,
      });
    }

    if (o.bid_price_1 != null && u.ask_price_1 != null) {
      const profit = o.bid_price_1 - u.ask_price_1 * Q;
      if (profit > 0) shortOpps.push({
        day: o.day, timestamp: o.timestamp, profit,
        opPrice: o.bid_price_1, spot: u.ask_price_1,
      });
    }
  }

  const summarize = (arr) => {
    if (!arr.length) return null;
    const best = arr.reduce((a, b) => b.profit > a.profit ? b : a);
    return { count: arr.length, best, latest: arr[arr.length - 1] };
  };
  return { long: summarize(longOpps), short: summarize(shortOpps) };
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

  // Determine if the current selection is an option, and what (if any) options
  // exist on the relevant underlying. These flags drive whether option panels
  // are inserted into the layout below.
  const opt = getOptionMapping(state.selectedProduct);
  const underlyingName = opt ? opt.underlying : state.selectedProduct;
  const siblings = optionsOn(underlyingName);
  const showOptionTimeSeries = !!opt;
  const showArbScanner = siblings.length >= 1;

  // Layout: controls → mappings → summary → 1 wide chart → [option panels] → 2x2 grid → book.
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
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
        <h2 style="margin:0;flex:1;">Option Mappings${state.optionMappings.length ? ` (${state.optionMappings.length})` : ''}</h2>
        <button id="mapToggle" style="padding:2px 10px;">${state.mappingsCollapsed ? '▸ Expand' : '▾ Collapse'}</button>
      </div>
      <div id="optionMappings" style="${state.mappingsCollapsed ? 'display:none;' : ''}"></div>
    </div>

    <div class="panel full">
      <h2>Summary — <span id="sumProd"></span></h2>
      <div class="stats" id="stats"></div>
    </div>

    <div class="panel full">
      <h2>Mid Price + Best Bid / Ask</h2>
      <div class="chart-wrap tall"><canvas id="priceChart"></canvas></div>
    </div>

    ${showOptionTimeSeries ? `
    <div class="panel full">
      <h2>Option vs Underlying — ${state.selectedProduct} (strike ${opt.strike}, qty ${opt.quantity}) vs ${opt.underlying}</h2>
      <div class="chart-wrap tall"><canvas id="optionChart"></canvas></div>
    </div>` : ''}

    ${showArbScanner ? `
    <div class="panel full">
      <h2>Arbitrage Scanner — options on ${underlyingName}</h2>
      <div id="arbTable"></div>
    </div>` : ''}

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

  renderOptionMappings();

  drawAll();
}

// ---------- Option mappings UI ----------------------------------------------
// Renders the table of declared mappings + a row of inputs to add a new one.
// Wires up Add and Remove handlers; both mutate state.optionMappings, persist
// to localStorage, and trigger a full re-render.
function renderOptionMappings() {
  // Wire up the collapse toggle regardless of expanded state.
  const toggle = $('#mapToggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      state.mappingsCollapsed = !state.mappingsCollapsed;
      localStorage.setItem(LS_KEY_MAPPINGS_COLLAPSED, state.mappingsCollapsed ? '1' : '0');
      render();
    });
  }

  const host = $('#optionMappings');
  if (!host || state.mappingsCollapsed) return;

  const rows = state.optionMappings.map((m, i) => `
    <tr>
      <td style="text-align:left;">${m.product}</td>
      <td style="text-align:left;">${m.underlying}</td>
      <td>${m.strike}</td>
      <td>${m.quantity ?? 1}</td>
      <td><button data-rm="${i}" style="padding:2px 8px;">×</button></td>
    </tr>
  `).join('');

  // Default the Strike input to the trailing digits of the product name (handy
  // for VEV_5000-style products) but it's freely editable.
  const productOpts = state.products.map(p => `<option value="${p}">${p}</option>`).join('');
  const underlyingOpts = state.products.map(p => `<option value="${p}">${p}</option>`).join('');
  const trailingDigits = (s) => { const m = String(s).match(/_(\d+)$/); return m ? m[1] : ''; };
  const initialStrike = trailingDigits(state.products[0] || '');

  host.innerHTML = `
    ${state.optionMappings.length ? `
      <table style="margin-bottom:10px;">
        <thead><tr>
          <th style="text-align:left;">Option</th>
          <th style="text-align:left;">Underlying</th>
          <th>Strike</th>
          <th>Qty</th>
          <th></th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table>
    ` : '<p class="file-info" style="margin:0 0 10px;">No mappings declared. Add one below to enable option-vs-underlying charts.</p>'}

    <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
      <label>Option</label>
      <select id="mapProduct">${productOpts}</select>
      <label>on</label>
      <select id="mapUnderlying">${underlyingOpts}</select>
      <label>Strike</label>
      <input id="mapStrike" type="number" step="any" value="${initialStrike}" style="width:90px;">
      <label>Qty</label>
      <input id="mapQuantity" type="number" step="any" value="1" style="width:60px;">
      <button id="mapAdd">Add mapping</button>
    </div>
  `;

  // When the user picks a different option product, refresh the strike input
  // from its trailing digits — only if they haven't typed something else.
  $('#mapProduct').addEventListener('change', () => {
    const guess = trailingDigits($('#mapProduct').value);
    if (guess) $('#mapStrike').value = guess;
  });

  $('#mapAdd').addEventListener('click', () => {
    const product = $('#mapProduct').value;
    const underlying = $('#mapUnderlying').value;
    const strike = Number($('#mapStrike').value);
    const quantity = Number($('#mapQuantity').value) || 1;
    if (!product || !underlying || product === underlying || !Number.isFinite(strike)) return;
    // Replace any existing mapping for this option product (one-to-one).
    state.optionMappings = state.optionMappings.filter(m => m.product !== product);
    state.optionMappings.push({ product, underlying, strike, quantity });
    saveOptionMappings();
    render();
  });

  host.querySelectorAll('button[data-rm]').forEach(btn => {
    btn.addEventListener('click', () => {
      const i = Number(btn.dataset.rm);
      state.optionMappings.splice(i, 1);
      saveOptionMappings();
      render();
    });
  });
}

// ---------- Chart drawing ---------------------------------------------------
// Computes stats, renders the summary cards, and builds every Chart.js
// instance for the currently-filtered rows.
function drawAll() {
  const rows = filteredRows();
  if (!rows.length) return;

  // ---- Aggregate stats ----
  // Single pass: mid sum/min/max + spread sum + materialize mids for the
  // histogram below. Avoids Math.min(...mids), which blows the JS arg-list
  // stack on long arrays and runs ~3× slower than a loop.
  const mids = [];
  let midSum = 0, minMid = Infinity, maxMid = -Infinity;
  let spreadSum = 0, spreadCount = 0;
  let lastPnl = 0;
  for (const r of rows) {
    const m = r.mid_price;
    if (m != null) {
      mids.push(m);
      midSum += m;
      if (m < minMid) minMid = m;
      if (m > maxMid) maxMid = m;
    }
    if (r.ask_price_1 != null && r.bid_price_1 != null) {
      spreadSum += r.ask_price_1 - r.bid_price_1;
      spreadCount++;
    }
    if (r.profit_and_loss != null) lastPnl = r.profit_and_loss;
  }
  const meanMid = mids.length ? midSum / mids.length : 0;
  // Population standard deviation — we have the whole series, not a sample.
  let sqSum = 0;
  for (const m of mids) { const d = m - meanMid; sqSum += d * d; }
  const stdMid = mids.length ? Math.sqrt(sqSum / mids.length) : 0;
  const meanSpread = spreadCount ? spreadSum / spreadCount : 0;

  // ---- Trade overlays: align user fills with the row index ----
  // Price chart datasets are indexed by row position, so we build sparse
  // arrays of the same length as `rows` where index i is the fill price if a
  // buy/sell happened at that row's (day, timestamp), otherwise null. Chart.js
  // skips null points, which gives us the "dot on the line" look for free.
  const trades = filteredTrades();
  const rowIdx = new Map();
  rows.forEach((r, i) => rowIdx.set(`${r.day}:${r.timestamp}`, i));

  const buyOverlay = new Array(rows.length).fill(null);
  const sellOverlay = new Array(rows.length).fill(null);
  let buyQty = 0, sellQty = 0, buyNotional = 0, sellNotional = 0;

  for (const t of trades) {
    const i = rowIdx.get(`${t.day}:${t.timestamp}`);
    if (i != null) {
      if (t.side === 'buy') buyOverlay[i] = t.price;
      else sellOverlay[i] = t.price;
    }
    if (t.side === 'buy') { buyQty += t.quantity; buyNotional += t.price * t.quantity; }
    else { sellQty += t.quantity; sellNotional += t.price * t.quantity; }
  }
  const netQty = buyQty - sellQty;
  const tradeCash = sellNotional - buyNotional; // realized cash flow from fills

  $('#stats').innerHTML = `
    ${stat('Rows', rows.length.toLocaleString())}
    ${stat('Final P&L', fmt(lastPnl), lastPnl)}
    ${stat('Mean Mid', fmt(meanMid))}
    ${stat('Std Mid', fmt(stdMid))}
    ${stat('Min / Max', `${fmt(minMid)} / ${fmt(maxMid)}`)}
    ${stat('Mean Spread', fmt(meanSpread))}
    ${trades.length ? stat('Fills', `${trades.length}`) : ''}
    ${trades.length ? stat('Buy / Sell Qty', `${buyQty} / ${sellQty}`) : ''}
    ${trades.length ? stat('Net Position', `${netQty >= 0 ? '+' : ''}${netQty}`, netQty) : ''}
    ${trades.length ? stat('Trade Cash', fmt(tradeCash), tradeCash) : ''}
  `;

  // X-axis labels: if we're looking at a single day, show just the timestamp;
  // otherwise prefix with `D{day}:` so concatenated days stay disambiguated.
  const labels = rows.map(r =>
    state.selectedDay === 'all' ? `D${r.day}:${r.timestamp}` : r.timestamp
  );

  // ---- Price chart: mid + best bid + best ask + trade markers ----
  // Buy markers are up-triangles, sells are down-triangles (via rotation: 180).
  // `showLine: false` turns the dataset into a scatter overlay on top of the
  // line chart, so sparse null-filled arrays become isolated dots.
  const priceDatasets = [
    { label: 'Mid',      data: rows.map(r => r.mid_price),    borderColor: '#58a6ff', backgroundColor: 'transparent', borderWidth: 1.5, pointRadius: 0, tension: 0 },
    { label: 'Best Bid', data: rows.map(r => r.bid_price_1),  borderColor: '#3fb950', backgroundColor: 'transparent', borderWidth: 1,   pointRadius: 0, tension: 0 },
    { label: 'Best Ask', data: rows.map(r => r.ask_price_1),  borderColor: '#f85149', backgroundColor: 'transparent', borderWidth: 1,   pointRadius: 0, tension: 0 },
  ];
  if (trades.length) {
    priceDatasets.push(
      { label: 'Buy',  data: buyOverlay,  borderColor: '#3fb950', backgroundColor: '#3fb950', pointStyle: 'triangle', pointRadius: 7, pointHoverRadius: 9, showLine: false },
      { label: 'Sell', data: sellOverlay, borderColor: '#f85149', backgroundColor: '#f85149', pointStyle: 'triangle', pointRadius: 7, pointHoverRadius: 9, rotation: 180, showLine: false },
    );
  }

  state.charts.price = new Chart($('#priceChart'), {
    type: 'line',
    data: { labels, datasets: priceDatasets },
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

  // ---- Option vs Underlying overlay ----
  // Aligns the underlying's mid by exact (day, timestamp) so the two series
  // sit on the same x-axis. Plots the option mid + intrinsic on the left axis
  // (option-price scale) and the underlying mid on the right axis (commodity
  // scale) — they're typically orders of magnitude apart, so dual axes keep
  // both readable. Intrinsic is computed for a call: max(0, spot − K) × qty.
  const optMap = getOptionMapping(state.selectedProduct);
  if (optMap && $('#optionChart')) {
    const undRows = rowsForProduct(optMap.underlying);
    const undMidByKey = new Map();
    for (const r of undRows) undMidByKey.set(`${r.day}:${r.timestamp}`, r.mid_price);

    const spot = rows.map(r => undMidByKey.get(`${r.day}:${r.timestamp}`) ?? null);
    const intrinsic = spot.map(s => s != null ? Math.max(0, s - optMap.strike) * optMap.quantity : null);
    const optMid = rows.map(r => r.mid_price);

    // Latest non-null values for stat cards.
    const lastSpot = [...spot].reverse().find(v => v != null) ?? null;
    const lastMid  = [...optMid].reverse().find(v => v != null) ?? null;
    const lastIntrinsic = lastSpot != null ? Math.max(0, lastSpot - optMap.strike) * optMap.quantity : null;
    const lastExtrinsic = (lastMid != null && lastIntrinsic != null) ? lastMid - lastIntrinsic : null;

    $('#stats').insertAdjacentHTML('beforeend',
      stat('Strike', String(optMap.strike)) +
      stat('Qty', String(optMap.quantity)) +
      stat('Spot', fmt(lastSpot)) +
      stat('Intrinsic', fmt(lastIntrinsic)) +
      stat('Extrinsic', fmt(lastExtrinsic), lastExtrinsic)
    );

    state.charts.option = new Chart($('#optionChart'), {
      type: 'line',
      data: {
        labels,
        datasets: [
          { label: 'Option Mid',                 data: optMid,    borderColor: '#58a6ff', backgroundColor: 'transparent', borderWidth: 1.5, pointRadius: 0, tension: 0, yAxisID: 'y' },
          { label: 'Intrinsic ((S−K)·qty, ≥0)',  data: intrinsic, borderColor: '#d29922', backgroundColor: 'transparent', borderWidth: 1, borderDash: [4, 4], pointRadius: 0, tension: 0, yAxisID: 'y' },
          { label: `${optMap.underlying} Spot`,  data: spot,      borderColor: '#8b949e', backgroundColor: 'transparent', borderWidth: 1, pointRadius: 0, tension: 0, yAxisID: 'y1' },
        ],
      },
      options: chartOpts({ dualAxis: true }),
    });
  }

  // ---- Arbitrage scanner -----------------------------------
  const skewUnderlying = optMap ? optMap.underlying : state.selectedProduct;
  const siblings = optionsOn(skewUnderlying);

  // Per-option summary of all snapshots in the filtered range where the
  // bid/ask permits a locked-in profit. Build the underlying row-by-key map
  // once and share it across every option scan — otherwise an underlying with
  // N options pays for N rebuilds of the same map.
  if (siblings.length >= 1 && $('#arbTable')) {
    const undByKey = new Map();
    for (const r of rowsForProduct(skewUnderlying)) {
      undByKey.set(`${r.day}:${r.timestamp}`, r);
    }
    const scans = siblings.map(m => ({ mapping: m, arb: scanArbitrage(m, undByKey) }));
    $('#arbTable').innerHTML = renderArbTable(scans);
  }
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

// Renders the arbitrage scanner table. `scans` is [{mapping, arb}], where arb
// is the {long, short} structure produced by `scanArbitrage`.
function renderArbTable(scans) {
  const cell = (side) => {
    if (!side) return '<span style="color:var(--muted);">none</span>';
    const b = side.best;
    return `<span class="pos">${side.count}× · best <strong>${fmt(b.profit)}</strong> @ d${b.day}/t${b.timestamp} (op ${fmt(b.opPrice)} vs spot ${fmt(b.spot)})</span>`;
  };
  const cells = scans.map(({ mapping, arb }) => `
    <tr>
      <td style="text-align:left;">${mapping.product}</td>
      <td>${mapping.strike}</td>
      <td>${mapping.quantity}</td>
      <td style="text-align:left;">${cell(arb.long)}</td>
      <td style="text-align:left;">${cell(arb.short)}</td>
    </tr>
  `).join('');

  return `
    <table>
      <thead><tr>
        <th style="text-align:left;">Option</th>
        <th>Strike</th>
        <th>Qty</th>
        <th style="text-align:left;">Long-option arb (buy &lt; intrinsic)</th>
        <th style="text-align:left;">Short-option arb (sell &gt; underlying)</th>
      </tr></thead>
      <tbody>${cells}</tbody>
    </table>
    <p class="file-info" style="margin-top:8px;">
      Uses best bid/ask of both option and underlying.
      <strong>Long-option</strong>: buy option at ask, sell qty&nbsp;×&nbsp;underlying at bid → profit = (spotBid − strike)·qty − opAsk.
      <strong>Short-option</strong>: sell option at bid, buy qty&nbsp;×&nbsp;underlying at ask → profit = opBid − spotAsk·qty.
      Profit shown is per option contract, locked in at execution.
    </p>
  `;
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
// wrapper div instead). Accepts `extra.xTickCallback` for the scatter chart
// (custom tick label resolution) and `extra.dualAxis` for the option-vs-
// underlying chart, which adds a right-side y-axis at scales.y1.
function chartOpts(extra = {}) {
  const opts = {
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
  if (extra.dualAxis) {
    opts.scales.y1 = {
      position: 'right',
      ticks: { color: '#8b949e', font: { size: 10 } },
      grid: { drawOnChartArea: false },
    };
  }
  return opts;
}

// ---------- Wire up controls ------------------------------------------------
// Restore any previously saved option mappings so they're available the moment
// data is loaded.
state.optionMappings = loadOptionMappings();

$('#fileInput').addEventListener('change', e => handleFiles([...e.target.files]));

$('#clearBtn').addEventListener('click', () => {
  state.rows = [];
  state.rowsIndex = new Map();
  state.trades = [];
  state.products = [];
  state.days = [];
  state.selectedProduct = null;
  $('#fileInput').value = '';
  $('#fileInfo').textContent = 'No file loaded';
  destroyCharts();
  render();
});
