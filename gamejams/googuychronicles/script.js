

const TARGET_SCREEN_DIMENSIONS = { x: 600, y: 400 }
const SCREEN_DIMENSIONS = {x:0,y:0}
let screenOn = "title"
let scaleFactor = 1;
let volume = 1;
let screens;
function preload() {
    Assets.loadAssets()
}
function setup() {
    createCanvas(windowWidth, windowHeight);
    screens = { 
        "title": new TitleScreen(), 
        "game": new GameScreen(), 
        "levelselect": new LevelSelectScreen(),
        "death": new DeathScreen(),
        "win": new WinScreen(),
    }
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
function draw() {
    noSmooth()
    if (windowWidth / TARGET_SCREEN_DIMENSIONS.x < windowHeight / TARGET_SCREEN_DIMENSIONS.y) {
        scaleFactor = windowWidth / TARGET_SCREEN_DIMENSIONS.x
        SCREEN_DIMENSIONS.x = TARGET_SCREEN_DIMENSIONS.x
        SCREEN_DIMENSIONS.y = windowHeight / scaleFactor
    } else {
        scaleFactor = windowHeight / TARGET_SCREEN_DIMENSIONS.y;
        SCREEN_DIMENSIONS.y = TARGET_SCREEN_DIMENSIONS.y
        SCREEN_DIMENSIONS.x = windowWidth / scaleFactor
    }
    let xTranslation = (windowWidth - scaleFactor * TARGET_SCREEN_DIMENSIONS.x) / 2
    let yTranslation = (windowHeight - scaleFactor * TARGET_SCREEN_DIMENSIONS.y) / 2
    push ()
    translate(xTranslation, yTranslation)
    scale(scaleFactor, scaleFactor)
    background(0);
    let mousePosition = getMousePosition()
    screens[screenOn].Draw(mousePosition.x, mousePosition.y);
    pop ()
}
function mouseClicked() {
    let mousePosition = getMousePosition()
    screens[screenOn].HandleClick(mousePosition.x, mousePosition.y);
}
function keyPressed() {
    if (screenOn == "game") {
        screens.game.keyPressed(key)
    }
}
function getMousePosition() {
    let mousePosition = { x: mouseX, y: mouseY }


    mousePosition.x -= (windowWidth - scaleFactor * TARGET_SCREEN_DIMENSIONS.x) / 2;
    mousePosition.y -= (windowHeight - scaleFactor * TARGET_SCREEN_DIMENSIONS.y) / 2;
    mousePosition.x /= scaleFactor;
    mousePosition.y /= scaleFactor;

    return mousePosition
}
function mouseInRange(x, y, w, h) {
    mousePosition = getMousePosition();
    return (mousePosition.x >= x && mousePosition.y >= y && mousePosition.x <= x + w && mousePosition.y <= y + h)
}