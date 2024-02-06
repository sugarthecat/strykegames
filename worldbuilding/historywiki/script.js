let tiles = []
const NOISE_SCALE = 0.01;
const MAP_WIDTH = 600;
const MAP_HEIGHT = 400;
const TILE_WIDTH = 150;
const TILE_HEIGHT = 100;
class Tile {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.isLand =  noise(this.x * NOISE_SCALE, this.y * NOISE_SCALE) > 0.45;
        this.isMountain =  noise(this.x * NOISE_SCALE, this.y * NOISE_SCALE) > 0.55;
    }
    Draw() {
        if(this.isMountain){
            fill ( 50,50,50)
        }if(this.isLand){
            fill ( 0,255,0)
        }else{
            fill ( 0,0,200)
        }
        rect(floor (this.x), floor (this.y), ceil (MAP_WIDTH / TILE_WIDTH ), ceil ( MAP_HEIGHT / TILE_HEIGHT))
    }
}
function setup() {
    noStroke();
    randomSeed(50)
    noiseSeed(50)
    createCanvas(MAP_WIDTH, MAP_HEIGHT)
    for (let i = 0; i < TILE_WIDTH; i++) {
        tiles.push([])
        for (let j = 0; j < TILE_HEIGHT; j++) {
            tiles[i].push(new Tile(i * MAP_WIDTH / TILE_WIDTH, j * MAP_HEIGHT / TILE_HEIGHT));
            tiles[i][j].Draw();
        }
    }
}
function draw() {

}
function mouseClicked() {

}