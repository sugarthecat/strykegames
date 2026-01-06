let tiles = []
const LAND_NOISE_SCALE = 0.01;
const URBANIZATION_NOISE_SCALE = 0.005
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
let buttons;
let isLandArr = []
let coveredLand = []
let occupyingTile = []
let MAP_MODE = 0;
let selectedTileGUI;
let selectedNationGUI;
let selectedNation = null;
function setup() {
    selectedTileGUI = new SelectedTileGUI();
    selectedNationGUI = new SelectedNationGUI();
    let startTime = (new Date()).getTime()
    noStroke();
    noiseSeed(12323);
    randomSeed(99);
    SetupWorld();
    buttons = [
        new Button(0, 0, 200, 50, "Geography", function () { MAP_MODE = 0 }),
        new Button(0, 50, 200, 50, "Political", function () { MAP_MODE = 1 }),
    ]
    console.log(`${(new Date()).getTime() - startTime} ms`)
    Tick()
    //log nations at start, sorted by population
    nations.sort((a, b) => b.population - a.population);
    for (let i = 0; i < nations.length; i++) {
        if (nations[i].population > 2000000) {
            console.log(`${nations[i].name.name}: ${Math.floor(nations[i].population / 100000) / 10} Million`)

        } else {

            console.log(`${nations[i].name.name}: ${nations[i].population.toLocaleString()}`)
        }
    }
}
let camerax = 0;
let cameray = 0;
let scaleFactor = 1
function draw() {
    currDate = new Date();
    Tick();

    resizeCanvas(windowWidth, windowHeight);
    push()
    translate(-camerax, -cameray)
    background(20, 50, 200)
    scaleFactor = min(width / MAP_WIDTH, height / MAP_HEIGHT)
    //cannot use p5 scaling because tiles will have gaps
    for (let i = 0; i < tiles.length; i++) {
        tiles[i].Draw();
    }
    push()
    scale(scaleFactor, scaleFactor)
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
    pop()
    if (selectedTile) {
        selectedTileGUI.Draw(mouseX + camerax, mouseY + cameray)
    }
    if (selectedNation) {
        selectedNationGUI.Draw(mouseX + camerax, mouseY + cameray)
    }
    pop()
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].Draw(mouseX, mouseY);
    }
}
let selectedTile = false;
function mouseClicked(e) {
    let mousepos = getProjectedMousePosition()
    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].HandleClick(mouseX, mouseY)) {
            return;
        }
    }
    if (selectedTile && selectedTileGUI.HandleClick(mouseX + camerax, mouseY + cameray)) {
        return;
    }
    if (selectedNation && selectedNationGUI.HandleClick(mouseX + camerax, mouseY + cameray)) {
        return;
    }
    let mousex = floor(mousepos.x)
    let mousey = floor(mousepos.y)
    selectedTile = false;
    if (mousex >= 0 && mousey >= 0 && mousex <= occupyingTile.length && occupyingTile[mousex][mousey]) {
        let copystring = ""
        selectedTile = occupyingTile[mousex][mousey];
        console.log(occupyingTile[mousex][mousey].name)
        for (let i = 0; i < occupyingTile[mousex][mousey].points.length; i++) {
            copystring += (`\n(${occupyingTile[mousex][mousey].points[i].x},${occupyingTile[mousex][mousey].points[i].y})`)
        }
        console.log(copystring)
        selectedNation = false;
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
