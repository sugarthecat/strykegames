

const SCREEN_DIMENSIONS = { x: 600, y: 400 }
let screenOn = "game"
let scaleFactor = 1;
let volume = 1;
let screens;
function preload() {
    screens = { title: new TitleScreen(), game: new GameScreen(), select: new CharacterSelectScreen() }
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
    screens[screenOn].Draw();
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
}