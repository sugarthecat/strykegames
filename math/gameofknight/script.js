const SCREEN_DIMENSIONS = { x: 800, y: 600 }

const TILE_DIM = { x: 32, y: 16 }
let tileSize = 25;
let prevInput = ""
let autoPlay = false;
let values = []

function setup() {
    createCanvas(SCREEN_DIMENSIONS.x, SCREEN_DIMENSIONS.y);
    for (let i = 0; i < SCREEN_DIMENSIONS.x / tileSize; i++) {
        values.push([])
        for (let j = 0; j < SCREEN_DIMENSIONS.y / tileSize; j++) {
            values[i].push(false)
        }
    }
    updateGrid()
    updateRules()
    new p5(neighborEditor);
    setupPresets();
    loadPreset(presets[1])
}
let timeSinceLastFrame = 0;

function getFPS() {
    const fps = document.getElementById("stepsec").value;
    document.getElementById("sps").innerText = `${fps} Steps / Second`
    document.getElementById("playBtn").innerText = autoPlay ? "Stop" : "Autoplay"
    return fps;
}
function draw() {
    background(0);
    noStroke()
    let FPS = getFPS()
    if (autoPlay) {
        timeSinceLastFrame += deltaTime / 1000
        if (timeSinceLastFrame > 1 / FPS) {
            timeSinceLastFrame = 0;
            stepSim()
        }
    }
    fill(255)
    for (let i = 0; i < TILE_DIM.x; i++) {
        for (let j = 0; j < TILE_DIM.y; j++) {
            if (values[i][j]) {
                rect(i * tileSize, j * tileSize, tileSize, tileSize)
            }
        }
    }
    stroke(150)
    strokeWeight(3)
    for (let i = 0; i <= TILE_DIM.y; i++) {
        line(0, i * tileSize, width, i * tileSize)
    }
    for (let i = 0; i <= TILE_DIM.x; i++) {
        line(i * tileSize, 0, i * tileSize, height)
    }
    drawOnGrid()
}

let mouseSetting = false;

function drawOnGrid() {
    if (!mouseIsPressed) {
        return
    }
    if (mouseX < 0 || mouseY < 0) {
        return;
    }
    if (mouseX >= width || mouseY >= height) {
        return;
    }
    let xPos = floor(mouseX / tileSize)
    let yPos = floor(mouseY / tileSize)
    values[xPos][yPos] = mouseSetting
}
function mousePressed() {
    if (!mouseIsPressed) {
        return
    }
    if (mouseX < 0 || mouseY < 0) {
        return;
    }
    if (mouseX > width || mouseY > height) {
        return;
    }
    let xPos = floor(mouseX / tileSize)
    let yPos = floor(mouseY / tileSize)
    mouseSetting = !values[xPos][yPos]
}
function popRandom() {
    autoPlay = false;
    for (let i = 0; i < SCREEN_DIMENSIONS.x / tileSize; i++) {
        for (let j = 0; j < SCREEN_DIMENSIONS.y / tileSize; j++) {
            values[i][j] = Math.random() > 0.5
        }
    }
}
function popNone() {
    autoPlay = false;
    for (let i = 0; i < SCREEN_DIMENSIONS.x / tileSize; i++) {
        for (let j = 0; j < SCREEN_DIMENSIONS.y / tileSize; j++) {
            values[i][j] = false
        }
    }
}
function togglePlay() {
    autoPlay = !autoPlay
}

function toggleMenu(menu) {
    document.getElementById(`${menu}settings`).hidden = !document.getElementById(`${menu}settings`).hidden 
}