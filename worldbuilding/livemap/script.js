let tiles = []
const NOISE_SCALE = 0.01;
const TEMP_NOISE_SCALE = 0.008;
const MAP_WIDTH = 600;
const MAP_HEIGHT = 400;
const TILE_WIDTH = 300;
const TILE_HEIGHT = 200;
class Tile {
    constructor(x, y) {
        this.x = floor(x);
        this.y = floor(y);
        this.elevation = noise(this.x * NOISE_SCALE, this.y * NOISE_SCALE) 
        this.temperature = noise(this.x * TEMP_NOISE_SCALE + 500, this.y * TEMP_NOISE_SCALE + 500)
    }
    Draw() {
        if (this.elevation > 0.6) {
            //mountain
            if(this.temperature < 0.4){
                fill(200, 200, 250)
            }else if(this.temperature > 0.6){
                fill(100,50,0)
            }else{
                fill(50, 50, 50)
            }
        } else if (this.elevation > 0.45) {
            //normal land
            if(this.temperature < 0.4){
                fill(255,255,255)
            }else if(this.temperature > 0.6){
                fill(200,150,0)
            }else{
                fill(0,200,0)
            }
        } else {
            fill(0, this.elevation*100, this.elevation*400)
        }
        rect((this.x), (this.y), ceil(MAP_WIDTH / TILE_WIDTH)+1, 0.3+ceil(MAP_HEIGHT / TILE_HEIGHT))
    }
}
let currDate = new Date();
function setup() {
    noStroke();
    randomSeed(currDate.getMonth() + currDate.getFullYear() * 200)
    noiseSeed(currDate.getMonth() + currDate.getFullYear() * 200)
    createCanvas(MAP_WIDTH, MAP_HEIGHT)
}
function draw() {
    resizeCanvas(windowWidth, windowHeight);
    scale(max(width / MAP_WIDTH, height / MAP_HEIGHT))
    for (let i = 0; i < TILE_WIDTH; i++) {
        tiles.push([])
        for (let j = 0; j < TILE_HEIGHT; j++) {
            tiles[i].push(new Tile(i * MAP_WIDTH / TILE_WIDTH, j * MAP_HEIGHT / TILE_HEIGHT));
            tiles[i][j].Draw();
        }
    }

}
function mouseClicked() {

}