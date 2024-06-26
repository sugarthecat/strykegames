

const SCREEN_DIMENSIONS = { x: 600, y: 400 }
let screenOn = "title"
let scaleFactor = 1;
let volume = 1;
let difficulty = 0;
let screens;
function preload() {
    screens = {
        "title": new TitleScreen(),
        "select": new DifficultySelectScreen(),
        "game": new GameScreen(),
        "win": new WinScreen(),
        "lose": new LoseScreen(),
        "documents": new Documents()
    }
    Assets.loadAssets()
}
function setup() {
    Assets.setVolume(0.8)
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
    translate(xTranslation, yTranslation)

    scale(scaleFactor, scaleFactor)
    background(0);
    let mousePosition = getMousePosition()
    screens[screenOn].Draw(mousePosition.x, mousePosition.y);
    fill(0)
    noStroke()
    rect(-xTranslation, 0, xTranslation, 400)
    rect(600, 0, xTranslation, 400)
    rect(0, -yTranslation, 600, yTranslation)
    rect(0, 400, 600, yTranslation)
}
function mouseWheel(event) {
    //print(event.delta);
    if (screenOn == "game") {
        screens.game.Scroll(event.delta / 5)
    }
}
function mouseClicked() {
    let mousePosition = getMousePosition()
    screens[screenOn].HandleClick(mousePosition.x, mousePosition.y);
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