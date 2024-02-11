let tiles = []
const NOISE_SCALE = 0.01;
const TEMP_NOISE_SCALE = 0.008;
const LAND_CUTOFF = 0.5;
const TILE_SIZE = 3
const TILE_HEIGHT = 200;
const TILE_WIDTH = 300;
const MAP_WIDTH = TILE_SIZE * TILE_WIDTH;
const MAP_HEIGHT = TILE_SIZE * TILE_HEIGHT;
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
let currDate = new Date();
let buttons;
let isLandArr = []
let coveredLand = []
let occupyingTile = []
let MAP_MODE = 1;
let selectedTileGUI;
function setup() {
    selectedTileGUI = new SelectedTileGUI();
    noStroke();
    randomSeed(currDate.getMonth() + currDate.getFullYear() * 200)
    noiseSeed(currDate.getMonth() + currDate.getFullYear() * 200)
    createCanvas(1, 1)
    setup_land();
    buttons = [
        new Button(0, 0, 200, 50, "Geography", function () { MAP_MODE = 0 }),
        new Button(0, 50, 200, 50, "Political", function () { MAP_MODE = 1 }),
        new Button(0, 100, 200, 50, "Troops", function () { MAP_MODE = 2 }),
    ]
}
let camerax = 0;
let cameray = 0;
let scaleFactor = 1
let ticksRan = 0
let mostTroops = 0;
function draw() {
    mostTroops = 1;
    for (let i = 0; i < tiles.length; i++) {
        if(tiles[i].troops > mostTroops){
            mostTroops = tiles[i].troops
        }
    }
    currDate = new Date();
    let currentTick = (currDate.getDate() - 1) * 24 * 6 + currDate.getHours() * 6 + currDate.getMinutes() / 10 + currDate.getSeconds() / 600
    //if(ticksRan < (currDate.getDate()-1) * 24 + currDate.getHours()){
    if (frameCount % 1 == 0) {
        Tick();
        ticksRan++;
    }
    resizeCanvas(windowWidth, windowHeight);
    push()
    translate(-camerax, -cameray)
    background(20, 50, 200)
    scaleFactor = max(width / MAP_WIDTH, height / MAP_HEIGHT)
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
    DrawSelectedTile();
    for (let i = 0; i < tiles.length; i++) {
        tiles[i].DrawCity();
    }
    if (selectedTile) {
        selectedTileGUI.Draw(mouseX+camerax,mouseY+cameray)
    }
    pop()
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].Draw(mouseX, mouseY);
    }
}
let selectedTile = false;
function mouseClicked() {
    let mousepos = getProjectedMousePosition()
    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].HandleClick(mouseX, mouseY)) {
            return;
        }
    }
    if (selectedTile && selectedTileGUI.HandleClick(mouseX+camerax,mouseY+cameray)) {
        return;
    }
    let mousex = floor(mousepos.x)
    let mousey = floor(mousepos.y)
    selectedTile = false;
    if (mousex >= 0 && mousey >= 0 && mousex <= occupyingTile.length && occupyingTile[mousex][mousey]) {
        selectedTile = occupyingTile[mousex][mousey];
    }
}
function Tick() {
    for (let i = 0; i < tiles.length; i++) {
        tiles[i].UpdateInternal();
    }
    for (let i = 0; i < nations.length; i++) {
        nations[i].Update()
    }
    for (let i = 0; i < tiles.length; i++) {
        tiles[i].AttackNeighbors();
    }
}
function getProjectedMousePosition() {

    //get occupying tile
    let mousex = mouseX + camerax
    let mousey = mouseY + cameray
    mousex *= TILE_WIDTH / MAP_WIDTH
    mousey *= TILE_HEIGHT / MAP_HEIGHT
    mousex /= scaleFactor
    mousey /= scaleFactor
    return { x: mousex, y: mousey }
}