

const SCREEN_DIMENSIONS = { x: 600, y: 400 }
let screenOn = "title"
let scaleFactor = 1;
let volume = 1;
let screens;
function preload() {
    screens = {
        "title": new TitleScreen(),
        "levelSelect": new LevelSelectScreen(),
        "dialog": new DialogScreen,
        "level": new LevelScreen()
    }
    Assets.loadAssets()
}
function setup() {
    createCanvas(windowWidth, windowHeight);
}
function draw() {
    resizeCanvas(windowWidth, windowHeight);

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
    let mousePosition = getMousePosition()
    screens[screenOn].Draw(mousePosition.x, mousePosition.y);
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
function mouseClicked() {
    let mousePosition = getMousePosition()
    screens[screenOn].HandleClick(mousePosition.x, mousePosition.y);
}
function mouseReleased() {
    if (mouseButton === RIGHT) {
        let mousePosition = getMousePosition()
        screens[screenOn].HandleClick(mousePosition.x, mousePosition.y);
        return false;
    }
}
function getMousePosition() {
    let mousePosition = { x: mouseX, y: mouseY }
    mousePosition.x -= (windowWidth - scaleFactor * SCREEN_DIMENSIONS.x) / 2;
    mousePosition.y -= (windowHeight - scaleFactor * SCREEN_DIMENSIONS.y) / 2;
    mousePosition.x /= scaleFactor;
    mousePosition.y /= scaleFactor;

    return mousePosition
}
function mouseInRange(x, y, w, h) {
    let mousePosition = getMousePosition();
    return (mousePosition.x >= x && mousePosition.y >= y && mousePosition.x <= x + w && mousePosition.y <= y + h)
}
document.oncontextmenu = function() {
        return false;
    }