
function getIncome(tileGrid, code, currencies) {
    let income = {}
    for (let i = 0; i < currencies.length; i++) {
        income[currencies[i]] = 0
    }
    for (let i = 0; i < tileGrid.length; i++) {
        for (let j = 0; j < tileGrid[i].length; j++) {
            tileGrid[i][j].income = {}
            for (let k = 0; k < currencies.length; k++) {
                tileGrid[i][j].income[currencies[k]] = 0
            }
        }
    }
    //code specific behavior
    if (code == "garden") {
        for (let i = 0; i < tileGrid.length; i++) {
            for (let j = 0; j < tileGrid[i].length; j++) {
                const tile = tileGrid[i][j]
                if (tile.type == "wheat") {
                    tile.income.coins = 1
                }
                if (tile.type == "corn") {
                    for (const adjTile of getAdjacent(tileGrid, i, j)) {
                        if (adjTile.type == "wheat") {
                            tile.income.coins = 4;
                            break;
                        }
                    }
                }
                if (tile.type == "strawberry") {
                    tile.income.coins = 8;
                    for (const adjTile of getAdjacent(tileGrid, i, j)) {
                        if (adjTile.type !== "strawberry") {
                            tile.income.coins = 0;
                        }
                    }
                }
            }
        }
    } else if (code == "farm") {
        for (let i = 0; i < tileGrid.length; i++) {
            for (let j = 0; j < tileGrid[i].length; j++) {
                const tile = tileGrid[i][j]
                if (tile.type == "wheat") {
                    tile.income.coins = 1
                }
                if (tile.type == "silo") {
                    const added = new Set()
                    const toCheck = [{ i: i, j: j }]
                    while (toCheck.length > 0) {
                        const curr = toCheck.pop()
                        for (const adjTile of getAdjacent(tileGrid, curr.i, curr.j)) {
                            if (added.has(adjTile)) {
                                continue;
                            }
                            added.add(adjTile)
                            if (adjTile.type == "dirtroad") {
                                toCheck.push({ i: adjTile.x, j: adjTile.y })
                            }
                            if (adjTile.type == "wheat") {
                                tile.income.coins += 1
                            }
                        }
                    }
                }
            }
        }
    } else if (code == "datacenter") {
        for (let i = 0; i < tileGrid.length; i++) {
            for (let j = 0; j < tileGrid[i].length; j++) {
                const tile = tileGrid[i][j]
                if (tile.type == "serverrack") {
                    tile.income.compute = 1
                }
                if (tile.type == "edgerouter") {
                    tile.income.bandwidth = 1
                }
                if (tile.type == "terminal") {
                    let neighboringsingalp = 0
                    for (const adjTile of getAdjacent(tileGrid, i, j)) {
                        if (adjTile.type == "signalp") {
                            neighboringsingalp++;
                        }
                    }
                    if (neighboringsingalp == 2) {
                        tile.income.compute = 10
                    }
                }
            }
        }
        for (let i = 0; i < tileGrid.length; i++) {
            for (let j = 0; j < tileGrid[i].length; j++) {
                const tile = tileGrid[i][j]
                if (tile.type == "coolanttank") {
                    for (const adjTile of getAdjacent(tileGrid, i, j)) {
                        if (adjTile.type == "serverrack") {
                            adjTile.income.compute *= 2
                        }
                    }
                }
                if (tile.type == "signalp") {
                    const added = new Set()
                    const toCheck = [{ i: i, j: j }]
                    while (toCheck.length > 0) {
                        const curr = toCheck.pop()
                        for (const adjTile of getAdjacent(tileGrid, curr.i, curr.j)) {
                            if (!added.has(adjTile) && adjTile.type == "edgerouter") {
                                toCheck.push({ i: adjTile.x, j: adjTile.y })
                                adjTile.income.bandwidth += 1
                                added.add(adjTile)
                            }
                        }
                    }
                }
            }
        }
    } else if (code == "sunmoon") {
        for (let i = 0; i < tileGrid.length; i++) {
            for (let j = 0; j < tileGrid[i].length; j++) {
                const tile = tileGrid[i][j]
                if (tile.type == "sun" || tile.type == "moon") {
                    let hasFailed = false
                    for (const adjTile of getAdjacent(tileGrid, i, j)) {
                        if (adjTile.type == "cloud") {
                            tile.income.coins += 1
                        }
                        if (adjTile.type == tile.type) {
                            hasFailed = true
                        }
                    }
                    if (hasFailed) {
                        tile.income.coins = 0;
                    }
                    for (let k = 0; k < tileGrid.length; k++) {
                        if (k !== j && tileGrid[i][k] == tile.type) {
                            tile.income.coins = 0
                        }
                        if (k !== i && tileGrid[k][j] == tile.type) {
                            tile.income.coins = 0
                        }
                    }
                }
            }
        }
    } else if (code == "chess") {
        for (let i = 0; i < tileGrid.length; i++) {
            for (let j = 0; j < tileGrid[i].length; j++) {
                const tile = tileGrid[i][j]
                if (tile.type == "pawn") {
                    tile.income.coins = 1;
                }
                if (tile.type == "rook") {
                    if (i == 0 || j == 0 || j == tileGrid[i].length - 1 || i == tileGrid.length - 1) {
                        tile.income.coins = 3;
                    }
                }
                if (tile.type == "bishop") {
                    tile.income.coins = 3;
                    const offsets = [[-1, 1], [1, 1], [1, -1], [-1, -1]]
                    for (const offset of offsets) {
                        let cX = i + offset[0];
                        let cY = j + offset[1];
                        while (cX >= 0 && cY >= 0 && cX < tileGrid.length - 1 && cY < tileGrid[0].length) {
                            if (tileGrid[cX][cY].type == "bishop") {
                                tile.income.coins = 0;
                            }
                            cX += offset[0]
                            cY += offset[1]
                        }
                    }
                }
                if (tile.type == "knight") {
                    for (const adjTile of getAdjacent(tileGrid, i, j)) {
                        if (adjTile.type == "bishop") {
                            tile.income.coins = 3;
                        }
                    }
                }
                if (tile.type == "king" || tile.type == "queen") {
                    tile.income.coins = 5
                    const offsets = [[-2, 1], [-2, -1], [-1, 2], [-1, -2], [1, 2], [1, -2], [2, 1], [2, -1]]
                    for (const offset of offsets) {
                        const kX = i + offset[0]
                        if (kX < 0 || kX >= tileGrid.length) {
                            continue;
                        }
                        const kY = j + offset[1]
                        if (kY < 0 || kY >= tileGrid[0].length) {
                            continue;
                        }
                        if (tileGrid[kX][kY].type == "knight") {
                            tile.income.coins = 0;
                        }
                    }
                }
                if(tile.type == "king"){
                    for(const nTile of getNeighbors(tileGrid,i,j)){
                        if(nTile.type == "king"){
                            tile.income.coins = 0
                        }
                    }
                    const cardinals = [[-1, 0], [1, 0], [0, -1], [0, 1]]
                    for (const c of cardinals) {
                        let rX = i + c[0]
                        let rY = j + c[1]
                        while (rX >= 0 && rX < tileGrid.length && rY >= 0 && rY < tileGrid[0].length) {
                            const blocker = tileGrid[rX][rY]
                            if (blocker.type !== "chessboard") {
                                if (blocker.type == "rook") {
                                    tile.income.coins = 0
                                }
                                break;
                            }
                            rX += c[0]
                            rY += c[1]
                        }
                    }
                }
            }
        }
        const failLimits = { pawn: 8, rook: 2, bishop: 2, knight: 2, king: 1, queen: 1 }
        const counts = {}
        for (let i = 0; i < tileGrid.length; i++) {
            for (let j = 0; j < tileGrid[i].length; j++) {
                const tile = tileGrid[i][j]
                if (tile.type in failLimits) {
                    const color = (i + j) % 2 == 1 ? "white" : "black"
                    const key = tile.type + "_" + color
                    counts[key] = (counts[key] || 0) + 1
                }
            }
        }
        for (let i = 0; i < tileGrid.length; i++) {
            for (let j = 0; j < tileGrid[i].length; j++) {
                const tile = tileGrid[i][j]
                if (tile.type in failLimits) {
                    const color = (i + j) % 2 == 1 ? "white" : "black"
                    const key = tile.type + "_" + color
                    if (counts[key] > failLimits[tile.type]) {
                        for (const currency of currencies) {
                            tile.income[currency] = 0
                        }
                    }
                }
            }
        }
    }

    //income congregation

    for (let i = 0; i < tileGrid.length; i++) {
        for (let j = 0; j < tileGrid[i].length; j++) {
            for (let k = 0; k < currencies.length; k++) {
                income[currencies[k]] += tileGrid[i][j].income[currencies[k]]
            }
        }
    }
    return income;
}

function getNeighbors(tileGrid, x, y, manhattan = 1) {
    const neighbors = []
    for (let i = -manhattan; i <= manhattan; i++) {
        if (i + x >= tileGrid.length || i + x < 0) {
            continue;
        }
        for (let j = -manhattan; j <= manhattan; j++) {
            if (j + y >= tileGrid[i + x].length || j + y < 0) {
                continue;
            }
            if (i == 0 && j == 0) {
                continue;
            }
            neighbors.push(tileGrid[x + i][y + j])
        }
    }
    return neighbors
}

function getAdjacent(tileGrid, x, y) {
    const adj = []
    for (let i = -1; i <= 1; i++) {
        if (i + x >= tileGrid.length || i + x < 0) {
            continue;
        }
        for (let j = -1; j <= 1; j++) {
            if (j + y >= tileGrid[i + x].length || j + y < 0) {
                continue;
            }
            if (i == 0 && j == 0) {
                continue;
            }
            if (i != 0 && j != 0) {
                continue;
            }
            adj.push(tileGrid[x + i][y + j])
        }
    }
    return adj
}