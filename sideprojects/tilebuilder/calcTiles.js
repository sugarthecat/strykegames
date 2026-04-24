class Tile {
    constructor(type) {
        this.type = type;
        if (this.type == "wheat" || type == "corn" || type == "strawberry") {
            this.dots = []
            for (let i = 0; i < 10; i++) {
                this.dots.push({ x: random(0.1, 0.9), y: random(0.1, 0.9) })
            }
        }
    }
    Draw(x, y, size) {
        if (this.type == "empty") {
            push()
            fill(0)
            rect(x, y, size, size)
            stroke(255)
            strokeWeight(size / 10)
            line(x + size / 3, y + size / 3, x + size * 2 / 3, y + size * 2 / 3)
            pop()
            return;
        }
        if (this.type == "farm") {
            push()
            fill(0, 200, 0)
            rect(x, y, size, size)
            stroke(255, 255, 0)
            strokeWeight(size / 10)
            line(x + size / 3, y + size / 3, x + size * 2 / 3, y + size * 2 / 3)
            pop()
            return;
        }
        if (this.type == "dirt") {
            push()
            fill(100, 50, 0)
            rect(x, y, size, size)
            pop()
            return;
        }
        if (this.type == "wheat") {
            push()
            fill(220, 220, 0)
            rect(x, y, size, size)
            fill(150, 150, 0)
            for (let i = 0; i < this.dots.length; i++) {
                circle(x + this.dots[i].x * size, y + this.dots[i].y * size, size / 10)
            }
            pop()
            return;
        }
        if (this.type == "corn") {
            push()
            fill(0, 160, 0)
            rect(x, y, size, size)
            fill(220, 220, 0)
            for (let i = 0; i < this.dots.length; i++) {
                circle(x + this.dots[i].x * size, y + this.dots[i].y * size, size / 10)
            }
            pop()
            return;
        }
        if (this.type == "strawberry") {
            push()
            fill(0, 160, 0)
            rect(x, y, size, size)
            fill(255, 0, 0)
            for (let i = 0; i < this.dots.length; i++) {
                circle(x + this.dots[i].x * size, y + this.dots[i].y * size, size / 10)
            }
            pop()
            return;
        }
        fill(0, 255, 0)
        if (this.type == "filled") {
            fill(0, 0, 255)
        }
        rect(x, y, size, size)
        fill(255, 0, 0)
        circle(x + size / 2, y + size / 2, size)
    }
}
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
                        console.log(adjTile.type)
                        if (adjTile.type == "wheat") {
                            tile.income.coins = 4;
                            console.log("WEEEE")
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