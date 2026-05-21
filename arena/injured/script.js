

const SCREEN_DIMENSIONS = { x: 600, y: 400 }
let screenOn = "title"
let scaleFactor = 1;
let volume = 1;
let screens;
function preload() {
    screens = { "title": new TitleScreen() ,
        "game": new GameScreen(),
        "death": new DeathScreen(),
        "dialogue": new DialogueScreen()
    }
    screens.dialogue.Load()
    Assets.loadAssets()
}
function setup() {
    createCanvas(windowWidth, windowHeight);
    noSmooth()
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
    screens[screenOn].Draw(constrain(mousePosition.x, 0, 600), constrain(mousePosition.y, 0, 600));
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
    screens[screenOn].HandleClick(constrain(mousePosition.x, 0, 600), constrain(mousePosition.y, 0, 400));
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