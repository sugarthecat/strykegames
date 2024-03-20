

const SCREEN_DIMENSIONS = { x: 600, y: 600 }
let scaleFactor = 1;
let volume = 1;
function preload() {
    Assets.loadAssets()
}
//ham
function setup() {
    createCanvas(windowWidth, windowHeight);
}
let circlepos = { x: -100, y: 0 }
function draw() {
    resizeCanvas(windowWidth, windowHeight);

    if (windowWidth / SCREEN_DIMENSIONS.x < windowHeight / SCREEN_DIMENSIONS.y) {
        scaleFactor = windowWidth / SCREEN_DIMENSIONS.x
    } else {
        scaleFactor = windowHeight / SCREEN_DIMENSIONS.y;
    }
    let xTranslation = (windowWidth - scaleFactor * SCREEN_DIMENSIONS.x) / 2
    let yTranslation = (windowHeight - scaleFactor * SCREEN_DIMENSIONS.y) / 2
    translate(xTranslation, yTranslation)

    scale(scaleFactor, scaleFactor)
    background(0);
    let mousePosition = getMousePosition()
    fill(255)
    rect(0, 0, 600, 600)
    fill(0, 255, 0)
    circle(mousePosition.x,mousePosition.y, 100)
    fill(255, 0, 0)
    circle(circlepos.x, circlepos.y, 100)
    noStroke()
    fill(0)
    rect(-xTranslation, 0, xTranslation, SCREEN_DIMENSIONS.y)
    rect(SCREEN_DIMENSIONS.x, 0, xTranslation, SCREEN_DIMENSIONS.y)
    rect(0, -yTranslation, SCREEN_DIMENSIONS.x, yTranslation)
    rect(0, SCREEN_DIMENSIONS.y, SCREEN_DIMENSIONS.x, yTranslation)
}
function touchStarted() {
    let mousepos = getMousePosition()
    circlepos.x = mousepos.x;
    circlepos.y = mousepos.y
}
function touchEnded(){
    circlepos.x = -200
    circlepos.y = -200
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
    mousePosition = getMousePosition();
    return (mousePosition.x >= x && mousePosition.y >= y && mousePosition.x <= x + w && mousePosition.y <= y + h)
}