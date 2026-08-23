

const SCREEN_DIMENSIONS = { x: 600, y: 400 }

const VIEWPORT_DIMENSIONS = {}
let screenOn = "title"
let scaleFactor = 1;
let volume = 1;
let screens;
const STD_COLORS = {SKY: null, PAVEMENT: null, CITY: null, CITY_UNCLICKED: null, RAILROAD: null, COASTLINE: null,
    SCAFFOLDING_COLOR: null
}
async function setup() {
    createCanvas(windowWidth, windowHeight);
    await Assets.loadAssets()
    screens = {
        "title": new TitleScreen(),
        "interact": new InteractableScreen(1),
        "animation": new AnimationScreen(1),
    }
    STD_COLORS.SKY = color(90, 180, 240)
    STD_COLORS.PAVEMENT = color(80)
    STD_COLORS.CITY =color (255)
    STD_COLORS.CITY_UNCLICKED =  color (0,150,255)
    STD_COLORS.RAILROAD = color(150)
    STD_COLORS.COASTLINE = color(0, 200, 0)
    STD_COLORS.SCAFFOLDING_COLOR = color(166, 128, 100)
}
function draw() {
    resizeCanvas(windowWidth, windowHeight);

    if (windowWidth / SCREEN_DIMENSIONS.x < windowHeight / SCREEN_DIMENSIONS.y) {
        scaleFactor = windowWidth / SCREEN_DIMENSIONS.x;
    } else {
        scaleFactor = windowHeight / SCREEN_DIMENSIONS.y;
    }
    let xTranslation = (windowWidth - scaleFactor * SCREEN_DIMENSIONS.x) / 2
    let yTranslation = (windowHeight - scaleFactor * SCREEN_DIMENSIONS.y) / 2
    VIEWPORT_DIMENSIONS.x = SCREEN_DIMENSIONS.x + xTranslation / scaleFactor * 2;
    VIEWPORT_DIMENSIONS.y = SCREEN_DIMENSIONS.y + yTranslation / scaleFactor * 2;

    push()
    translate(xTranslation, yTranslation)

    scale(scaleFactor, scaleFactor)
    background(0);
    let mousePosition = getMousePosition()
    screens[screenOn].Draw(constrain(mousePosition.x, 0, 600), constrain(mousePosition.y, 0, 600));
    pop()
    fill(0)
    noStroke()
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