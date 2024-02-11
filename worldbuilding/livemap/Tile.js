const TARGET_TILE_SIZE = 30;
const TILE_MIN_SIZE = 20;
class Tile {
    constructor() {
        this.nation = false;
        this.takenThisTurn = false;
        this.population = 0
        this.points = []
        this.vertexes = []
        this.connections = []
        this.geocolor = color(0)
        this.politicalColor = color(255, 0, 0)
    }
    UpdateInternal() {
        this.takenThisTurn = false;
    }
    AttackNeighbors() {
        if (!this.takenThisTurn) {
            for (let i = 0; i < this.connections.length; i++) {
                if (this.connections[i].nation != this.nation && !this.connections[i].takenThisTurn) {
                    let attack = random(1)
                    if (attack < 0.2) {
                        this.connections[i].nation = this.nation;
                        this.connections[i].takenThisTurn = true;
                    } else if (attack > 0.9) {
                        this.nation = this.connections[i].nation;
                        this.takenThisTurn = true;
                    }

                }
            }
        }
    }
    Draw() {
        switch (MAP_MODE) {
            case 0:
                fill(this.geocolor)
                break;
            case 1:
                if (this.nation) {
                    fill(this.nation.color)
                } else {
                    fill(50)
                }
                break;
            default:
                fill(this.geocolor)
                break
        }
        beginShape();
        noStroke();
        for (let i = 0; i < this.vertexes.length; i++) {
            vertex(floor(this.vertexes[i].x * TILE_SIZE * scaleFactor), floor(this.vertexes[i].y * TILE_SIZE * scaleFactor))
        }
        endShape(CLOSE);

    }
    DrawCity() {

        if (this.isMajorCity) {
            fill(50)
            circle(this.position.x * TILE_SIZE * scaleFactor, this.position.y * TILE_SIZE * scaleFactor, TILE_SIZE * scaleFactor * 4)
            fill(255)
            circle(this.position.x * TILE_SIZE * scaleFactor, this.position.y * TILE_SIZE * scaleFactor, TILE_SIZE * scaleFactor * 3)
            fill(50)
            circle(this.position.x * TILE_SIZE * scaleFactor, this.position.y * TILE_SIZE * scaleFactor, TILE_SIZE * scaleFactor * 2)
        } else if (this.isCity) {
            fill(50)
            circle(this.position.x * TILE_SIZE * scaleFactor, this.position.y * TILE_SIZE * scaleFactor, TILE_SIZE * scaleFactor * 2)
            fill(255)
            circle(this.position.x * TILE_SIZE * scaleFactor, this.position.y * TILE_SIZE * scaleFactor, TILE_SIZE * scaleFactor * 1)
        }
    }
    SetupVariables() {
        let avgYValue = 0;
        let avgXValue = 0
        for (let i = 0; i < this.points.length; i++) {
            avgYValue += this.points[i].y
            avgXValue += this.points[i].x
        }

        avgYValue /= this.points.length
        avgXValue /= this.points.length

        this.position = { x: avgXValue, y: avgYValue }
        //add some temp offset
        let tempOffset = 1 - noise(avgXValue * TEMP_NOISE_SCALE, avgYValue * TEMP_NOISE_SCALE)
        let temp = (tempOffset - abs(TILE_HEIGHT / 2 - avgYValue) / TILE_HEIGHT) * 2
        this.population = max(noise(avgXValue * NOISE_SCALE + 100, avgYValue * NOISE_SCALE + 100), 0.5) - min(Math.abs(0.5 - temp), 0.2)

        this.population = floor(Math.pow(this.population, 7) * 1000000)
        //console.log(this.population)
        if (noise(avgXValue, avgYValue + 100) > 0.7) {
            this.isMajorCity = true;
        }
        if (noise(avgXValue, avgYValue + 100) > 0.65) {
            this.isCity = true;
        }
        if (temp < 0.3) {
            //snow
            this.geocolor = color(255 - temp * 350)
        } else if (temp < 0.55) {
            this.geocolor = color(50, 30 + temp * 200, 20)
        } else if (temp < 0.8) {
            this.geocolor = color(temp * 300 - 30, 220 - temp * 50, 0)
        } else {
            this.geocolor = color(250, 50 + temp * 150, 20)
        }

    }
    Connect(other) {
        if (!this.connections.includes(other)) {
            this.connections.push(other)
            other.Connect(this);
        }
    }
    Split() {
        let spawnerPoints = []
        let tiles = []

        for (let i = 0; i < this.points.length / TARGET_TILE_SIZE; i++) {
            let newPoint = this.points[floor(i * TARGET_TILE_SIZE)]
            spawnerPoints.push(newPoint)
            tiles.push(new Tile())
        }
        let going = true;

        let closestTiles = []
        let points = []
        while (closestTiles.length < isLandArr.length) {
            closestTiles.push([])
            points.push([])
        }
        for (let i = 0; i < this.points.length; i++) {
            points[this.points[i].x][this.points[i].y] = this.points[i]
        }
        while (going) {
            for (let i = 0; i < tiles.length; i++) {
                tiles[i].points = []
            }
            going = false
            for (let i = 0; i < this.points.length; i++) {
                let closestTileIndex = 0

                for (let j = 0; j < tiles.length; j++) {
                    if (
                        dist2(spawnerPoints[closestTileIndex].x, spawnerPoints[closestTileIndex].y, this.points[i].x, this.points[i].y)
                        >
                        dist2(spawnerPoints[j].x, spawnerPoints[j].y, this.points[i].x, this.points[i].y)
                    ) {
                        closestTileIndex = j;
                    }
                }
                tiles[closestTileIndex].points.push(this.points[i])
                closestTiles[this.points[i].x][this.points[i].y] = tiles[closestTileIndex]
            }
            for (let i = 0; i < this.points.length; i++) {
                let point = this.points[i]
                if (closestTiles[point.x][point.y]
                    && point.x > 0
                    && closestTiles[point.x - 1][point.y]
                    && closestTiles[point.x][point.y] != closestTiles[point.x - 1][point.y]
                ) {
                    closestTiles[point.x][point.y].points.push(points[point.x - 1][point.y])
                    closestTiles[point.x][point.y].Connect(closestTiles[point.x - 1][point.y])
                }

                if (closestTiles[point.x][point.y]
                    && point.y > 0
                    && closestTiles[point.x][point.y - 1]
                    && closestTiles[point.x][point.y] != closestTiles[point.x][point.y - 1]
                ) {
                    closestTiles[point.x][point.y].points.push(points[point.x][point.y - 1])
                    closestTiles[point.x][point.y].Connect(closestTiles[point.x][point.y - 1])
                }

                if (closestTiles[point.x][point.y]
                    && point.y > 0
                    && point.x > 0
                    && closestTiles[point.x - 1][point.y - 1]
                    && closestTiles[point.x][point.y] != closestTiles[point.x - 1][point.y - 1]
                ) {
                    closestTiles[point.x][point.y].points.push(points[point.x - 1][point.y - 1])
                    closestTiles[point.x][point.y].Connect(closestTiles[point.x - 1][point.y - 1])

                }
            }
            for (let i = 0; i < tiles.length; i++) {
                if (tiles[i].points.length < TILE_MIN_SIZE) {
                    tiles.splice(i, 1)
                    spawnerPoints.splice(i, 1)
                    going = true;
                    i--;
                }
            }
        }
        for (let i = 0; i < tiles.length; i++) {
            tiles[i].Setup();
        }
        return tiles
    }
    CleanupExtremedies(mapped) {
        let cleaning = true;
        while (cleaning) {
            cleaning = false
            for (let i = 0; i < mapped.length; i++) {
                for (let j = 0; j < mapped[i].length; j++) {
                    let nearbyOcean = 0;
                    let nearbyTiles = []
                    for (let i2 = -1; i2 <= 1; i2++) {
                        for (let j2 = -1; j2 <= 1; j2++) {
                            let newx = i + i2;
                            let newy = j + j2;
                            if (
                                mapped[i][j] &&
                                (
                                    newx >= 0
                                    && newy >= 0
                                    && newx < isLandArr.length
                                    && newy < isLandArr[newx].length
                                    && !mapped[newx][newy]
                                )
                            ) {
                                if (mapped[newx][newy]) {
                                    nearbyTiles.push({ x: newx, y: newy })
                                }
                                else {
                                    nearbyOcean++;
                                }
                            }
                        }
                    }
                    if (nearbyOcean >= 7) {
                        mapped[i][j] = false;
                        cleaning = true
                    }
                }
            }
        }
    }
    Setup() {
        //remap selected continent
        let world = [];
        let mapped = [];
        //console.log(this.points)
        for (let i = 0; i < this.points.length; i++) {
            //console.log(this.points[i].x)
            while (this.points[i].x >= world.length - 2) {
                world.push([])
                mapped.push([])
            }
            world[this.points[i].x][this.points[i].y] = true
            mapped[this.points[i].x][this.points[i].y] = false
        }
        for (let i = 0; i < world.length; i++) {
            for (let j = 0; j < world[i].length; j++) {
                for (let i2 = -1; i2 <= 1; i2++) {
                    for (let j2 = -1; j2 <= 1; j2++) {
                        let newx = i + i2;
                        let newy = j + j2;
                        if (
                            (
                                (
                                    newx >= 0
                                    && (i2 == 0 || j2 == 0)
                                    && newy >= 0
                                    && newx < isLandArr.length
                                    && newy < isLandArr[newx].length
                                    && world[newx][newy] == undefined
                                )
                                ||
                                (
                                    newx < 0
                                    || newy < 0
                                    || newx >= isLandArr.length
                                    || newy >= isLandArr[newx].length
                                )
                            )
                            &&
                            //false ||
                            world[i][j]
                        ) {
                            mapped[i][j] = true;
                        }
                    }
                }
            }
        }
        //this.CleanupExtremedies(mapped);
        let proximityToStart = [];
        while (proximityToStart.length < mapped.length) {
            proximityToStart.push([])
        }
        let firstPoint = null;
        for (let i = 0; i < world.length; i++) {
            for (let j = 0; j < world[i].length; j++) {
                if (mapped[i][j] == true) {
                    if (firstPoint === null) {
                        firstPoint = { x: i, y: j }
                        this.firstPoint = firstPoint;
                        proximityToStart[firstPoint.x][firstPoint.y] = 0;
                    }
                }
            }
        }
        let searchPoint = firstPoint;
        let going = searchPoint !== null;
        let dir = 0;
        let dirs = [[1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1]];

        while (going) {
            going = false;
            this.vertexes.push({ x: searchPoint.x, y: searchPoint.y });
            let proximity = proximityToStart[searchPoint.x][searchPoint.y]
            //console.log(points[0])
            let finalNewDir = dir;
            for (let dirChange = -2; dirChange < dirs.length; dirChange++) {
                let newDirIndex = ((dir + dirChange + dirs.length) % dirs.length)
                let newdir = dirs[newDirIndex]
                let newx = newdir[0] + searchPoint.x
                let newy = newdir[1] + searchPoint.y
                if (
                    newx >= 0
                    && newy >= 0
                    && newx < isLandArr.length
                    && newy < isLandArr[newx].length
                    && mapped[newx][newy]
                    && !going
                ) {
                    //console.log(mapped[newx][newy])
                    searchPoint = ({ x: newx, y: newy })
                    going = true;
                    finalNewDir = newDirIndex
                    proximityToStart[newx][newy] = proximity + 1
                    if (searchPoint.x == firstPoint.x && searchPoint.y == firstPoint.y) {
                        going = false;
                        break;
                    }
                }
            }
            dir = finalNewDir
            //console.log(consolestr)
            //mapped[searchPoint.x][searchPoint.y] = false;
        }
        this.SetupVariables();
        this.OptimizeVertexes();
    }
    OptimizeVertexes() {
        for (let i = 0; i + 2 < this.vertexes.length; i++) {
            if (
                (this.vertexes[i].x - this.vertexes[i + 1].x == this.vertexes[i + 1].x - this.vertexes[i + 2].x)
                &&
                (this.vertexes[i].y - this.vertexes[i + 1].y == this.vertexes[i + 1].y - this.vertexes[i + 2].y)
            ) {
                this.vertexes.splice(i + 1, 1)
                i--;
            }
        }
    }
}
function DrawSelectedTile() {
    if (selectedTile) {
        let vertexes = selectedTile.vertexes
        stroke(0)
        strokeWeight(scaleFactor * 5)
        beginShape();
        noFill();
        for (let i = 0; i < vertexes.length; i++) {
            vertex(floor(vertexes[i].x * TILE_SIZE * scaleFactor), floor(vertexes[i].y * TILE_SIZE * scaleFactor))
        }
        endShape(CLOSE);
        noStroke()
    }
}
function dist2(x1, y1, x2, y2) {
    let xdist = x1 - x2;
    let ydist = y1 - y2;
    return Math.floor(xdist * xdist + ydist * ydist)
}