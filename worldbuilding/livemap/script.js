let tiles = []
const NOISE_SCALE = 0.01;
const TEMP_NOISE_SCALE = 0.008;
const LAND_CUTOFF = 0.45;
const TILE_HEIGHT = 100;
const TILE_WIDTH = 150;
const MAP_WIDTH = 1200;
const MAP_HEIGHT = 800;

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
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
        circle(this.firstPoint.x / TILE_WIDTH * MAP_WIDTH, this.firstPoint.y / TILE_HEIGHT * MAP_HEIGHT, 12)
        fill(this.color)
        beginShape();
        for (let i = 0; i < this.vertexes.length; i++) {

            vertex(this.vertexes[i].x / TILE_WIDTH * MAP_WIDTH, this.vertexes[i].y / TILE_HEIGHT * MAP_HEIGHT)
        }
        endShape(CLOSE);
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
        let going = true;
        while (going) {
            going = false;
            this.vertexes.push(searchPoint);
            //console.log(points[0])
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    let newx = i + searchPoint.x
                    let newy = j + searchPoint.y
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
                    }
                }
            }
            //console.log(consolestr)
            mapped[searchPoint.x][searchPoint.y] = false;
        }
    }
}
let currDate = new Date();

let isLandArr = []
let coveredLand = []
function setup() {
    noStroke();
    randomSeed(currDate.getMonth() + currDate.getFullYear() * 200)
    noiseSeed(currDate.getMonth() + currDate.getFullYear() * 200)
    createCanvas(1, 1)
    //generate land array
    for (let i = 0; i < TILE_WIDTH; i++) {
        isLandArr.push([])
        coveredLand.push([])
        for (let j = 0; j < TILE_HEIGHT; j++) {
            let x = i * MAP_WIDTH / TILE_WIDTH;
            let y = j * MAP_HEIGHT / TILE_HEIGHT;
            let isLand = noise(x * NOISE_SCALE, y * NOISE_SCALE) > LAND_CUTOFF;
            isLandArr[i].push(isLand)
            coveredLand[i].push(false);
            if (isLand) {

                //tiles.push(new Tile(x, y,));
            }
        }
    }
    //clear islands with < 15 area;
    for (let i = 0; i < isLandArr.length; i++) {
        for (let j = 0; j < isLandArr[i].length; j++) {
            if (isLandArr[i][j] && !coveredLand[i][j]) {
                let landArea = getLandmass(i, j)
                //console.log(landArea.length)
                let newTile = new Tile()
                for (let i = 0; i < landArea.length; i++) {
                    newTile.points.push(landArea[i])
                }
                newTile.Setup()
                tiles.push(newTile)
            }
        }
    }
}
function getLandmass(x1, y1) {
    //let landArea = 1;
    coveredLand[x1][y1] = true;
    let land = [new Point(x1, y1)]
    let toSearch = [new Point(x1, y1)]
    while (toSearch.length > 0) {
        let x = toSearch[0].x
        let y = toSearch[0].y
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                let newx = i + x;
                let newy = j + y
                if (newx >= 0
                    && newy >= 0
                    && (i == 0 || j == 0)
                    && newx < isLandArr.length
                    && newy < isLandArr[newx].length
                    && isLandArr[newx][newy]
                    && !coveredLand[newx][newy]) {
                    //landArea += 1
                    coveredLand[newx][newy] = true;
                    land.push(new Point(newx, newy))
                    toSearch.push(new Point(newx, newy))
                }
            }
        }
        //console.log(`x: ${x}, y: ${y}, len:${toSearch.length}`)
        toSearch.shift()
    }
    return land;
}
let camerax = 0;
let cameray = 0;
function draw() {
    resizeCanvas(windowWidth, windowHeight);
    scale(max(width / MAP_WIDTH, height / MAP_HEIGHT))
    translate(-camerax, -cameray)
    background(20, 50, 200)
    for (let i = 0; i < tiles.length; i++) {
        tiles[i].Draw();
    }
    let speed = 2;
    if (keyIsDown(UP_ARROW)) {
        cameray -= speed;
    }
    if (keyIsDown(DOWN_ARROW)) {
        cameray += speed;
    }
    if (keyIsDown(LEFT_ARROW)) {
        camerax -= speed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
        camerax += speed;
    }
}
function mouseClicked() {

}