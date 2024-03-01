const TARGET_TILE_SIZE = 30;
const TILE_MIN_SIZE = 20;

const URBANIZATION_NOISE_SCALE = 0.3
class Tile {
    constructor() {
        this.nation = false;
        this.takenThisTurn = false;
        this.population = 0
        this.maxpop = 0
        this.points = []
        this.vertexes = []
        this.connections = []
        this.geocolor = color(0)
        this.politicalColor = color(255, 0, 0)
        this.militia = 0;
        this.potentialMilitia = 0;
        this.troops = 0;
        this.arrivingTroops = 0;
        this.isFrontline = false;
        this.entrenchment = 0;
        this.security = 1000;
        this.milRecruitment = 0;
        this.attackBonus = 1;
    }
    UpdateInternal() {
        this.takenThisTurn = false;
        //this.population -= mobilizedTroops;
        this.isFrontline = false;
        this.isEncircled = true;
        for (let i = 0; i < this.connections.length; i++) {
            if (this.connections[i].nation != (this.nation)) {
                this.isFrontline = true;
            } else {
                this.isEncircled = false;
            }
        }
        if (this.isFrontline) {
            this.attackBonus += 0.01;
            this.entrenchment++;
            this.security = 0
            let newMilitia = floor(this.potentialMilitia * (this.nation == this.originalNation ? 0.001 : 0.00001));
            this.militia += newMilitia;
            this.potentialMilitia -= newMilitia;
            this.recruits = 0;
        } else {
            this.attackBonus = 0.2
            this.recruits = this.population * 0.0001
            this.recruits *= log(this.security + 1)
            if (this.nation != this.originalNation) {
                this.recruits /= 5
            }
            this.security++;
            this.entrenchment = 0;

            this.potentialMilitia += this.militia;
            this.militia = 0;
            this.recruits += this.troops;
            this.troops = 0;
        }
        this.recruits = floor(this.recruits)
        //this.population -= this.recruits;
    }
    GetDefenseModifier() {
        let str = 0.6 + this.importance + dist1(0.5, this.temp);
        if (this.nation == this.originalNation) {
            str *= 1.5
        }
        return log(this.entrenchment + 1) * str
    }
    SeizeTile(oppTile) {
        this.troops -= oppTile.GetDefenders()
        this.nation.AnnexTile(oppTile)
        oppTile.troops = this.troops * 1 / 2
        this.troops /= 2
        this.takenThisTurn = true;
        oppTile.takenThisTurn = true
        oppTile.entrenchment = 0;
        oppTile.security = 0;
        oppTile.militia = 0
    }
    GetDefenders() {
        let defenders = max(0, this.troops + this.militia / 2);
        return defenders;
    }
    TakeCasualties(casualties) {
        this.militia = max(this.militia - casualties * 2, 0);
        if (this.militia <= 0) {
            this.troops = max(this.troops * 2 + this.militia - casualties * 2, 0) / 2
        }
    }
    AttackNeighbors() {
        if (this.isFrontline && !this.takenThisTurn && !this.isEncircled) {
            let tilesToAttack = []
            for (let i = 0; i < this.connections.length; i++) {
                let oppTile = this.connections[i]
                if (oppTile.nation != this.nation && !oppTile.takenThisTurn && (this.nation.recruits > this.nation.troops / 2 || this.troops * this.attackBonus > oppTile.GetDefenders() * oppTile.GetDefenseModifier() || oppTile.isEncircled)) {
                    tilesToAttack.push(oppTile)
                }
            }
            if (tilesToAttack.length > 0) {
                let oppTile = random(tilesToAttack)
                let atk = this.troops;
                let oppTroops = oppTile.GetDefenders();
                this.TakeCasualties(oppTroops * random(0.01, 0.05))
                oppTile.TakeCasualties(atk * random(0.01, 0.05) / oppTile.GetDefenseModifier() * this.attackBonus)
                oppTile.security *= 0.9
                if (oppTile.GetDefenders() * 10 < this.troops) {
                    this.SeizeTile(oppTile)
                }

            }
        } else if (!this.takenThisTurn) {
            //this.recruits += this.troops;
            //this.troops = 0;
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
            case 2:
                let scalar = min(sqrt(this.troops) / sqrt(100000), 1)
                fill(this.nation.color._getRed() * scalar, this.nation.color._getGreen() * scalar, this.nation.color._getBlue() * scalar)
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
        this.temp = temp
        this.importance = max(noise(avgXValue * URBANIZATION_NOISE_SCALE, avgYValue * URBANIZATION_NOISE_SCALE + 100), 0.5)
        this.population = floor(Math.pow(this.importance + 1, 23) * this.points.length * Math.pow(max(1 - dist1(0.5, temp), 0.01), 2))
        this.maxpop = this.population;
        //console.log(this.population)
        this.terrain = ""
        if (temp < 0.3) {
            //snow
            this.terrain = "Tundra"
            this.geocolor = color(255 - temp * 350)
        } else if (temp < 0.55) {
            this.terrain = "Forest"
            this.geocolor = color(50, 30 + temp * 200, 20)
        } else if (temp < 0.8) {
            this.terrain = "Grasslands"
            this.geocolor = color(temp * 300 - 30, 220 - temp * 50, 0)
        } else {
            this.terrain = "Desert"
            this.geocolor = color(250, 50 + temp * 150, 20)
        }
        if (this.importance > 0.7) {
            this.isMajorCity = true;
            this.terrain = "Urban Area"
        }
        if (this.importance > 0.65) {
            this.isCity = true;
        }
        this.potentialMilitia = this.population * 0.2;
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
            if (going) {
                for (let i = 0; i < tiles.length; i++) {
                    tiles[i].connections = []
                }
            }
        }
        for (let i = 0; i < tiles.length; i++) {
            tiles[i].Setup();
        }
        return tiles
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
                            world[i][j]
                        ) {
                            mapped[i][j] = true;
                        }
                    }
                }
            }
        }
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