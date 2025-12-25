const SCREEN_DIMENSIONS = { x: 800, y: 600 }

const TILE_SIZE = 25;
let prevInput = ""
let autoPlay = false;
let values = []

function setup() {
    createCanvas(SCREEN_DIMENSIONS.x, SCREEN_DIMENSIONS.y);
    for (let i = 0; i < SCREEN_DIMENSIONS.x / TILE_SIZE; i++) {
        values.push([])
        for (let j = 0; j < SCREEN_DIMENSIONS.y / TILE_SIZE; j++) {
            values[i].push(false)
        }
    }
}
let timeSinceLastFrame = 0;

function getFPS(){
    const fps = document.getElementById("stepsec").value;
    document.getElementById("sps").innerText = `${fps} Steps / Second`
    document.getElementById("playBtn").innerText = autoPlay ? "Stop" : "Autoplay"
    return fps;
}
function updateGridSize(){
    const newWidth = document.getElementById("width").value;
    document.getElementById("widthtxt").innerText =`Width: ${newWidth} tiles`
    if(newWidth != SCREEN_DIMENSIONS.x/TILE_SIZE){
        SCREEN_DIMENSIONS.x = newWidth * TILE_SIZE;
        setupVals()
    }
    const newHeight = document.getElementById("height").value;
    document.getElementById("heighttxt").innerText =`Height: ${newHeight} tiles`
    if(newHeight != SCREEN_DIMENSIONS.y/TILE_SIZE){
        SCREEN_DIMENSIONS.y = newHeight * TILE_SIZE;
        setupVals()
    }
}
function draw() {
    background(0);
    noStroke()
    updateGridSize()
    let FPS = getFPS()
    if (autoPlay) {
        timeSinceLastFrame += deltaTime / 1000
        if(timeSinceLastFrame > 1/FPS){
            timeSinceLastFrame = 0;
            stepSim()
        }
    }
    fill(255)
    for (let i = 0; i < SCREEN_DIMENSIONS.x / TILE_SIZE; i++) {
        for (let j = 0; j < SCREEN_DIMENSIONS.y / TILE_SIZE; j++) {
            if (values[i][j]) {
                rect(i * TILE_SIZE, j * TILE_SIZE, TILE_SIZE, TILE_SIZE)
            }
        }
    }
    stroke(150)
    strokeWeight(4)
    for (let i = 0; i <= SCREEN_DIMENSIONS.y / TILE_SIZE; i++) {
        line(0, i * TILE_SIZE, width, i * TILE_SIZE)
    }
    for (let i = 0; i <= SCREEN_DIMENSIONS.x / TILE_SIZE; i++) {
        line(i * TILE_SIZE, 0, i * TILE_SIZE, height)
    }
}
function mouseClicked() {
    if (mouseX < 0 || mouseY < 0) {
        return;
    }
    if (mouseX > width || mouseY > height) {
        return;
    }
    let xPos = floor(mouseX / TILE_SIZE)
    let yPos = floor(mouseY / TILE_SIZE)
    values[xPos][yPos] = !values[xPos][yPos]
}

function stepSim() {
    let newValues = []
    // knight:
    const neighborOffsets = [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]]
    // typical:
    //const neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]
    for (let i = 0; i < SCREEN_DIMENSIONS.x / TILE_SIZE; i++) {
        newValues.push([])
        for (let j = 0; j < SCREEN_DIMENSIONS.y / TILE_SIZE; j++) {
            let neighborCount = 0;
            let isAlive = values[i][j]
            for (let k = 0; k < neighborOffsets.length; k++) {
                let xPos = neighborOffsets[k][0] + i;
                let yPos = neighborOffsets[k][1] + j;
                if (xPos < 0 || yPos < 0) {
                    continue;
                }
                if (xPos >= values.length || yPos >= values[xPos].length) {
                    continue;
                }
                if (!values[xPos][yPos]) {
                    continue
                }
                neighborCount++;
            }
            newValues[i].push(neighborCount == 3 || (neighborCount == 2 && isAlive))
        }
    }
    values = newValues;
}
function popRandom() {
    autoPlay = false;
    for (let i = 0; i < SCREEN_DIMENSIONS.x / TILE_SIZE; i++) {
        for (let j = 0; j < SCREEN_DIMENSIONS.y / TILE_SIZE; j++) {
            values[i][j] = Math.random() > 0.6
        }
    }
}
function setupVals() {
    autoPlay = false;
    let newValues = []
    for (let i = 0; i < SCREEN_DIMENSIONS.x / TILE_SIZE; i++) {
        newValues.push([])
        for (let j = 0; j < SCREEN_DIMENSIONS.y / TILE_SIZE; j++) {
            newValues[i].push(false)
        }
    }
    resizeCanvas(SCREEN_DIMENSIONS.x,SCREEN_DIMENSIONS.y)
    values = newValues;
}

function togglePlay(){
    autoPlay = !autoPlay
}