

const SCREEN_DIMENSIONS = { x: 600, y: 400 }
let screenOn = "game"
let scaleFactor = 1;
let volume = 1;
let screens;
function preload() {
    screens = { title: new TitleScreen(), game: new GameScreen(), select: new CharacterSelectScreen() , end: new EndScreen()}
    Assets.loadAssets()
}
function setup() {
    createCanvas(windowWidth, windowHeight);
    noSmooth()
    textFont('monospace')
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
function draw() {
    if (windowWidth / SCREEN_DIMENSIONS.x < windowHeight / SCREEN_DIMENSIONS.y) {
        scaleFactor = windowWidth / SCREEN_DIMENSIONS.x
    } else {
        scaleFactor = windowHeight / SCREEN_DIMENSIONS.y;
    }
    let xTranslation = (windowWidth - scaleFactor * SCREEN_DIMENSIONS.x) / 2
    let yTranslation = (windowHeight - scaleFactor * SCREEN_DIMENSIONS.y) / 2
    push()
    translate(xTranslation, yTranslation)

    scale(scaleFactor, scaleFactor)
    background(0);
    const gamepads = getGamepads();
    if (gamepads.length != 2) {
        drawErrorScreen();
    } else {
        screens[screenOn].Draw(gamepads);
    }
    pop()
    fill(0)
    noStroke()
    if (xTranslation != 0) {
        rect(0, 0, xTranslation, windowHeight);
        rect(windowWidth - xTranslation, 0, xTranslation, windowHeight);
    }
    if (yTranslation != 0) {
        rect(0, 0, windowWidth, yTranslation);
        rect(0, windowHeight - yTranslation, windowWidth, yTranslation);
    }
}

// connected gamepads, with trailing empty slots removed
function getGamepads() {
    const gamepads = navigator.getGamepads();
    while (gamepads.length > 0 && gamepads[gamepads.length - 1] === null) {
        gamepads.pop();
    }
    return gamepads;
}
function drawErrorScreen() {
    push()
    background(0)
    fill(255)
    textAlign(CENTER)
    textSize(40)
    text("Please connect controllers", 300, 200)
    pop()
}
