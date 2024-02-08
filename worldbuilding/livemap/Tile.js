
class Tile {
    constructor() {
        this.points = []
        this.points2 = []
        this.vertexes = []
        this.color = color(random(10, 255), random(10, 255), random(10, 255))
    }
    Draw() {
        for (let i = 0; i < this.points.length; i++) {
            //vertex(this.points[i].x / TILE_WIDTH * MAP_WIDTH, this.points[i].y / TILE_HEIGHT * MAP_HEIGHT)
            //circle(this.points[i].x / TILE_WIDTH * MAP_WIDTH, this.points[i].y / TILE_HEIGHT * MAP_HEIGHT, 5)
        }
        fill(0)
        noStroke();
        for (let i = 0; i < this.points2.length; i++) {
            circle(this.points2[i].x / TILE_WIDTH * MAP_WIDTH, this.points2[i].y / TILE_HEIGHT * MAP_HEIGHT, 8)
        }
        if (this.firstPoint !== undefined) {
            circle(this.firstPoint.x / TILE_WIDTH * MAP_WIDTH, this.firstPoint.y / TILE_HEIGHT * MAP_HEIGHT, 12)
        }
        fill(this.color)
        beginShape();
        for (let i = 0; i < this.vertexes.length; i++) {

            vertex(this.vertexes[i].x / TILE_WIDTH * MAP_WIDTH, this.vertexes[i].y / TILE_HEIGHT * MAP_HEIGHT)
        }
        endShape(CLOSE);
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
                                    nearbyTiles.push({x:newx,y:newy})
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
        let firstPoint = null;
        for (let i = 0; i < world.length; i++) {
            for (let j = 0; j < world[i].length; j++) {
                if (mapped[i][j] == true) {
                    if (firstPoint === null) {
                        firstPoint = { x: i, y: j }
                        this.firstPoint = firstPoint;
                    }
                    this.points2.push(new Point(i, j))
                }
            }
        }
        let searchPoint = firstPoint;
        let going = searchPoint !== null;
        while (going) {
            going = false;
            //this.vertexes.push({x: searchPoint.x + random(-0.4,0.4), y: searchPoint.y + random(-0.4,0.4)});
            this.vertexes.push({ x: searchPoint.x, y: searchPoint.y });
            //console.log(points[0])
            for (let round = 1; round < 3; round++) {
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        let newx = i + searchPoint.x
                        let newy = j + searchPoint.y
                        if (
                            newx >= 0
                            && newy >= 0
                            && (i == 0 || j == 0 || round >= 2)
                            && newx < isLandArr.length
                            && newy < isLandArr[newx].length
                            && mapped[newx][newy]
                            && !going
                        ) {
                            //console.log(mapped[newx][newy])
                            searchPoint = ({ x: newx, y: newy })
                            going = true;
                        }
                    }
                }
            }
            //console.log(consolestr)
            mapped[searchPoint.x][searchPoint.y] = false;
        }
    }
}