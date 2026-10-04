// Demo game: an encroaching claimer (blue) plays a random claimer (red) on a fresh random graph, forever.
const svg = document.getElementById("demo");
const NS = "http://www.w3.org/2000/svg";
const W = 600, H = 360, N = 34;
let timer = null;

function makeGraph() {
    const pts = [];
    for (let tries = 0; pts.length < N && tries < 5000; tries++) {
        const p = { x: 30 + Math.random() * (W - 60), y: 30 + Math.random() * (H - 60) };
        if (pts.every(q => Math.hypot(p.x - q.x, p.y - q.y) > 52)) pts.push(p);
    }
    // Link each vertex to its 2-3 nearest neighbors.
    const adj = pts.map(() => new Set());
    pts.forEach((p, i) => {
        pts.map((q, j) => [j, Math.hypot(p.x - q.x, p.y - q.y)])
            .filter(([j]) => j !== i)
            .sort((a, b) => a[1] - b[1])
            .slice(0, 2 + Math.floor(Math.random() * 2))
            .forEach(([j]) => { adj[i].add(j); adj[j].add(i); });
    });
    return { pts, adj };
}

function connected(adj) {
    const seen = new Set([0]), stack = [0];
    while (stack.length) for (const n of adj[stack.pop()]) if (!seen.has(n)) { seen.add(n); stack.push(n); }
    return seen.size === adj.length;
}

function legalMoves(adj, mine, owner) {
    const moves = new Set();
    for (const v of mine) for (const n of adj[v]) if (owner[n] === null) moves.add(n);
    return [...moves];
}

// Encroach: claim the move closest (by graph distance) to the opponent's vertices.
function encroach(adj, moves, theirs) {
    const dist = new Map(theirs.map(v => [v, 0]));
    const queue = [...theirs];
    for (let k = 0; k < queue.length; k++) {
        for (const n of adj[queue[k]]) {
            if (!dist.has(n)) { dist.set(n, dist.get(queue[k]) + 1); queue.push(n); }
        }
    }
    let best = moves[0], bestScore = Infinity;
    for (const m of moves) {
        const score = dist.get(m) + Math.random() * 0.5;
        if (score < bestScore) { bestScore = score; best = m; }
    }
    return best;
}

function play() {
    clearTimeout(timer);
    let g;
    do { g = makeGraph(); } while (!connected(g.adj));
    const { pts, adj } = g;

    // Start on the leftmost and rightmost vertices so the sides meet in the middle.
    const order = pts.map((_, i) => i).sort((a, b) => pts[a].x - pts[b].x);
    const owner = pts.map(() => null);
    const claims = { blue: [order[0]], red: [order[order.length - 1]] };
    owner[claims.blue[0]] = "blue";
    owner[claims.red[0]] = "red";

    svg.innerHTML = "";
    const edges = document.createElementNS(NS, "g");
    const nodes = document.createElementNS(NS, "g");
    svg.append(edges, nodes);
    const edgeEls = [];
    adj.forEach((set, i) => set.forEach(j => {
        if (j < i) return;
        const l = document.createElementNS(NS, "line");
        l.setAttribute("x1", pts[i].x); l.setAttribute("y1", pts[i].y);
        l.setAttribute("x2", pts[j].x); l.setAttribute("y2", pts[j].y);
        edges.append(l);
        edgeEls.push({ l, i, j });
    }));
    const circles = pts.map(p => {
        const c = document.createElementNS(NS, "circle");
        c.setAttribute("cx", p.x); c.setAttribute("cy", p.y); c.setAttribute("r", 11);
        nodes.append(c);
        return c;
    });

    const paint = () => {
        circles.forEach((c, i) => c.style.fill = owner[i] ? `var(--${owner[i]})` : "var(--empty)");
        edgeEls.forEach(({ l, i, j }) => {
            l.style.stroke = owner[i] && owner[i] === owner[j] ? `var(--${owner[i]})` : "var(--edge)";
        });
        document.getElementById("blueScore").textContent = claims.blue.length;
        document.getElementById("redScore").textContent = claims.red.length;
    };
    paint();

    const status = document.getElementById("status");
    let turn = 0, passes = 0;
    const step = () => {
        const side = turn % 2 === 0 ? "blue" : "red";
        const moves = legalMoves(adj, claims[side], owner);
        if (moves.length) {
            passes = 0;
            const m = side === "blue" ? encroach(adj, moves, claims.red) : moves[Math.floor(Math.random() * moves.length)];
            owner[m] = side;
            claims[side].push(m);
            paint();
        } else {
            passes++;
        }
        turn++;
        if (passes >= 2) {
            const b = claims.blue.length, r = claims.red.length;
            status.textContent = b === r ? "Tie!" : (b > r ? "Encroach wins" : "Random wins");
            timer = setTimeout(play, 2800);
            return;
        }
        status.textContent = `Turn ${turn + 1}`;
        timer = setTimeout(step, 380);
    };
    timer = setTimeout(step, 700);
}

play();
