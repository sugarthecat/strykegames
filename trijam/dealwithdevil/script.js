const SCREEN_DIMENSIONS = { x: 600, y: 400 }
let screenOn = "title"
let scaleFactor = 1;
let buffs = [];
let debuffs = [];
function preload() {
    Assets.loadAssets()
}
function setup() {
    createCanvas(windowWidth, windowHeight);
    Assets.music.setVolume(0.5)
    Assets.music.loop();
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

    textFont(Assets.hackFont);
    switch (screenOn) {
        case "title":
            TitleScreen.Draw()
            break;
        case "game":
            Game.Draw()
            break;
        case "devil":
            DevilScreen.Draw()
            break;
        case "death":
            DeathScreen.Draw()
            break;
    }
    fill(0)
    noStroke()
    rect(-xTranslation, 0, xTranslation, 400)
    rect(600, 0, xTranslation, 400)
    rect(0, -yTranslation, 600, yTranslation)
    rect(0, 400, 600, yTranslation)
    if (debuffs.includes("bad vision") && screenOn == "game") {
        filter(BLUR, 8);
    }
    if (debuffs.includes("color blindness") && (screenOn == "game" || screenOn == "devil")) {
        filter(GRAY);
    }
}
function mouseClicked() {
    switch (screenOn) {
        case "title":
            TitleScreen.HandleClick()
            break;
        case "game":
            Game.HandleClick()
            break;
        case "devil":
            DevilScreen.HandleClick()
            break;
        case "death":
            DeathScreen.HandleClick()
            break;
    }
}
function getMousePosition() {
    let mousePosition = { x: mouseX, y: mouseY }


    mousePosition.x -= (windowWidth - scaleFactor * SCREEN_DIMENSIONS.x) / 2;
    mousePosition.y -= (windowHeight - scaleFactor * SCREEN_DIMENSIONS.y) / 2;
    mousePosition.x /= scaleFactor;
    mousePosition.y /= scaleFactor;

    if (screenOn == "game" && debuffs.includes("shaky hands")) {
        mousePosition.x += cos(frameCount * 0.03) * 50
        mousePosition.y += sin(frameCount * 0.03) * 50
    }
    return mousePosition
}
function mouseInRange(x, y, w, h) {
    mousePosition = getMousePosition();
    return (mousePosition.x >= x && mousePosition.y >= y && mousePosition.x <= x + w && mousePosition.y <= y + h)
}
function shuffleString(toShuffle){
    let newString = toShuffle;
    for(let i = 0; i<toShuffle.length * 2; i++){
        let index = floor(random(toShuffle.length-1))
        newString = newString.substring(0,i) + newString.substring(i+1,newString.length)
    }
    return newString;
}