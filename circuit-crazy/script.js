const TARGET_SCREEN_DIMENSIONS = { x: 600, y: 400 }
const OFFSET = { x: 600, y: 400 }
let screenOn = "title"
let scaleFactor = 1;
let volume = 1;
let screens;
function preload() {
    screens = {
        "title": new TitleScreen(),
        "levelselect": new LevelSelectScreen(),
        "editor": new EditorScreen(),
    }
    Assets.loadAssets()
}
function setup() {
    createCanvas(windowWidth, windowHeight);
    if(localStorage.getItem("levelsUnlocked") === null){
        localStorage.setItem("levelsUnlocked", 1)
    }else{
        levelsUnlocked = parseInt(localStorage.getItem("levelsUnlocked"))
        screens.levelselect.ResetLevels();
    }
}
function draw() {
    textFont('Arial Rounded MT ExtraBold');
    resizeCanvas(windowWidth, windowHeight);

    if (windowWidth / TARGET_SCREEN_DIMENSIONS.x < windowHeight / TARGET_SCREEN_DIMENSIONS.y) {
        //scaled to restrict height
        scaleFactor = windowWidth / TARGET_SCREEN_DIMENSIONS.x
    } else {
        //scaled to restrict width
        scaleFactor = windowHeight / TARGET_SCREEN_DIMENSIONS.y;
    }
    let xTranslation = (windowWidth - scaleFactor * TARGET_SCREEN_DIMENSIONS.x) / 2
    let yTranslation = (windowHeight - scaleFactor * TARGET_SCREEN_DIMENSIONS.y) / 2
    OFFSET.x = xTranslation / scaleFactor;
    OFFSET.y = yTranslation / scaleFactor;
    translate(xTranslation, yTranslation)

    scale(scaleFactor, scaleFactor)
    background(0);
    let mousePosition = getMousePosition()
    screens[screenOn].Draw(mousePosition.x, mousePosition.y);
    fill(0)
    noStroke()
}
function mousePressed() {
    let mousePosition = getMousePosition()
    screens[screenOn].mousePressed(mousePosition.x, mousePosition.y)
}
function mouseClicked() {
    let mousePosition = getMousePosition()
    screens[screenOn].HandleClick(mousePosition.x, mousePosition.y);
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