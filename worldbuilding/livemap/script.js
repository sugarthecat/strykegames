let tiles = []
const NOISE_SCALE = 0.01;
const TEMP_NOISE_SCALE = 0.008;
const LAND_CUTOFF = 0.5;
const TILE_SIZE = 3
const TILE_HEIGHT = 200;
const TILE_WIDTH = 300;
const MAP_WIDTH = TILE_SIZE*TILE_WIDTH;
const MAP_HEIGHT = TILE_SIZE*TILE_HEIGHT;
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
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
        }
    }
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
                if (newTile.points.length > 100){
                    //break continents with > 100 area
                    let newTiles = newTile.Split();
                    for(let i = 0; i<newTiles.length; i++){
                        tiles.push(newTiles[i])
                    }
                }else if(newTile.points.length > 15){
                    
                    //clear islands with < 15 area;
                    tiles.push(newTile)
                }
            }
        }
    }
    isLandArr = []
    coveredLand = []
}
function getLandmass(x1, y1) {
    //let landArea = 1;
    coveredLand[x1][y1] = true;
    let land = [new Point(x1, y1)]
    let toSearch = [new Point(x1, y1)]
    while (toSearch.length > 0) {
        let x = toSearch[0].x
        let y = toSearch[0].y
        let borderingOceans = 0;
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