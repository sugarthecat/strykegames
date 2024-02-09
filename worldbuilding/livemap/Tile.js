const TARGET_TILE_SIZE = 30;
class Tile {
    constructor() {
        this.points = []
        this.points2 = []
        this.vertexes = []
        this.color = color(random(100, 255), random(100, 255), random(10, 100))
    }
    Draw() {
        fill(this.color)
        beginShape();
        for (let i = 0; i < this.vertexes.length; i++) {
            vertex(this.vertexes[i].x / TILE_WIDTH * MAP_WIDTH, this.vertexes[i].y / TILE_HEIGHT * MAP_HEIGHT)
        }
        endShape(CLOSE);
        fill(0)
        noStroke();
    }
    Split() {
        let spawnerPoints = []
        let tiles = []
        for (let i = 0; i < this.points.length / TARGET_TILE_SIZE; i++) {
            let newPoint = random(this.points)
            //while (this.points.includes(newPoint)) {
            //newPoint = random(this.points)
            //}
            spawnerPoints.push(newPoint)
            tiles.push(new Tile())
        }
        for (let i = 0; i < this.points.length; i++) {
            let closestTileIndex = 0
            for (let j = 0; j < tiles.length; j++) {
                if (
                    dist(spawnerPoints[closestTileIndex].x, spawnerPoints[closestTileIndex].y, this.points[i].x, this.points[i].y)
                    >
                    dist(spawnerPoints[j].x, spawnerPoints[j].y, this.points[i].x, this.points[i].y)
                ) {
                    closestTileIndex = j;
                }
            }
            tiles[closestTileIndex].points.push(this.points[i])
            for (let j = 0; j < tiles.length; j++) {
                if (
                    dist(spawnerPoints[closestTileIndex].x, spawnerPoints[closestTileIndex].y, this.points[i].x, this.points[i].y) 
                    >
                    dist(spawnerPoints[j].x, spawnerPoints[j].y, this.points[i].x, this.points[i].y) 
                    && j !== closestTileIndex
                ) {
                    tiles[j].points.push(this.points[i])
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
        this.CleanupExtremedies(mapped);
        this.points2 = []
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
                    this.points2.push(new Point(i, j))
                }
            }
        }
        let searchPoint = firstPoint;
        let going = searchPoint !== null;
        let dir = 0;
        let dirs = [[1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1]];

        while (going) {
            going = false;
            //this.vertexes.push({x: searchPoint.x + random(-0.4,0.4), y: searchPoint.y + random(-0.4,0.4)});
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
                }
            }
            dir = finalNewDir
            //console.log(consolestr)
            mapped[searchPoint.x][searchPoint.y] = false;
        }
    }
}