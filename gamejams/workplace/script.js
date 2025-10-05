

const SCREEN_DIMENSIONS = { x: 600, y: 400 }
let screenOn = "title"
let scaleFactor = 1;
let screens = {};
// Dynamic near-white triangular background
function preload() {
    Assets.loadAssets()
}
function setup() {
    createCanvas(windowWidth, windowHeight);
    fixCanvasSize()
    initBackground();
    screens = {
        quiz: new QuizScreen(),
        art: new ArtScreen(),
        cooking: new CookingScreen(),
        fearofgod: new FearOfGodScreen(),
        tictactoe: new TicTacToeScreen(),
        transition: new TransitionScreen(),
        monologue: new MonologueScreen(),
        title: new TitleScreen(),
        badending: new BadEndingScreen(),
        goodending: new GoodEndingScreen(),
        nut: new NutScreen(),
        serve: new ServeScreen(),
    }
    screens.monologue.Reset("art","This is a long ass monologue, continue from here",10)
}
function fixCanvasSize() {
    resizeCanvas(windowWidth, windowHeight);
    if (windowWidth / SCREEN_DIMENSIONS.x < windowHeight / SCREEN_DIMENSIONS.y) {
        scaleFactor = windowWidth / SCREEN_DIMENSIONS.x
    } else {
        scaleFactor = windowHeight / SCREEN_DIMENSIONS.y;
    }
}
function windowResized() {
    fixCanvasSize()
}
function draw() {
    noSmooth()
    let xTranslation = (windowWidth - scaleFactor * SCREEN_DIMENSIONS.x) / 2
    let yTranslation = (windowHeight - scaleFactor * SCREEN_DIMENSIONS.y) / 2
    push()
    translate(xTranslation, yTranslation)

    scale(scaleFactor, scaleFactor)
    drawBackground();
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
    //rect(-xTranslation, 0, xTranslation, 400)
    //rect(600, 0, xTranslation, 400)
    //rect(0, -yTranslation, 600, yTranslation)
    //rect(0, 400, 600, yTranslation)
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
function mousePressed(){
    let mousePosition = getMousePosition()
    screens[screenOn].HandleMouseDown(mousePosition.x, mousePosition.y);
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