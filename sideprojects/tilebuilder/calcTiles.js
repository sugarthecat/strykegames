
function getIncome(tileGrid, code) {
    if (code == "farm") {
        let income = { coins: 0 }
        for (let i = 0; i < tileGrid.length; i++) {
            for (let j = 0; j < tileGrid[i].length; j++) {
                const tile = tileGrid[i][j]
                tile.income = { coins: 0 }
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
                    tile.income = { coins: 8 }
                    for (const adjTile of getAdjacent(tileGrid, i, j)) {
                        if (adjTile.type !== "strawberry") {
                            tile.income.coins = 0;
                        }
                    }
                }
                income.coins += tile.income.coins

            }
        }
        return income
    }
}

function getNeighbors(tileGrid, x, y) {
    const neighbors = []
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