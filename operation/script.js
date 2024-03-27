

const SCREEN_DIMENSIONS = { x: 600, y: 600 }
let scaleFactor = 1;
let volume = 1;
let items = []
function preload() {
    Assets.loadAssets()
}
//ham
function setup() {
    createCanvas(windowWidth, windowHeight);
    items = [new SurgeryItem(280, 200, Assets.heart, 20)]
}
let selectedObject = false;
let onEndScreen = false;
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
    if (selectedObject) {
        image(Assets.bronco, 100, 0, 400, 600)
        selectedObject.draw()
    } else {
        image(Assets.bronco, 100, 0, 400, 600)
        push()
        tint(255, 200)
        for (let i = 0; i < items.length; i++) {
            items[i].draw();
        }
        pop()
    }

    noStroke()
    fill(0)
    rect(-xTranslation, 0, xTranslation, SCREEN_DIMENSIONS.y)
    rect(SCREEN_DIMENSIONS.x, 0, xTranslation, SCREEN_DIMENSIONS.y)
    rect(0, -yTranslation, SCREEN_DIMENSIONS.x, yTranslation)
    rect(0, SCREEN_DIMENSIONS.y, SCREEN_DIMENSIONS.x, yTranslation)
}
function touchStarted() {
    let mousepos = getMousePosition()
    if (onEndScreen) {

    } else {
        for (let i = 0; i < items.length; i++) {
            if (items[i].containsPoint(mousepos)) {
                selectedObject = items[i]
            }
        }
    }
}
function touchEnded() {
    if (onEndScreen) {
    } else {
        selectedObject = false
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
    mousePosition = getMousePosition();
    return (mousePosition.x >= x && mousePosition.y >= y && mousePosition.x <= x + w && mousePosition.y <= y + h)
}