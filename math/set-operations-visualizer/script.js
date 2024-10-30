

const SCREEN_DIMENSIONS = { x: 600, y: 400 }
let scaleFactor = 1;
let currSet = empty;
let prevInput = ""
function preload() {
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
function setup() {
    createCanvas(windowWidth, windowHeight);
}
function draw() {

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
    if (prevInput != document.getElementById("formula").value) {
        updateSet();
    }
    displaySet(currSet)
    drawLetters();
    fill(0)
    noStroke()
    rect(-xTranslation, 0, xTranslation, 400)
    rect(600, 0, xTranslation, 400)
    rect(0, -yTranslation, 600, yTranslation)
    rect(0, 400, 600, yTranslation)
}
function addSymbol(symbol) {
    const inputField = document.getElementById("formula")
    let start = inputField.selectionStart
    if (start) {
        inputField.value = inputField.value.substring(0, start) + symbol + inputField.value.substring(start);
    } else {
        inputField.value += symbol;
        inputField.focus();
    }
}
function drawLetters() {

    push()
    strokeWeight(1)
    textAlign(CENTER)
    fill(0)
    textSize(25)
    text("U", 25, 25)
    text("A", 300, 75)
    text("B", 200, 250)
    text("C", 400, 250)
    pop()
}
function drawShapes(set) {

    //draw stuff
    push()
    //background
    if (set.at(0, 0, 0)) {
        fill(150)
    } else {
        fill(255)
    }
    rect(0, 0, 600, 400)
    stroke(0)
    strokeWeight(4)
    //circles
    fill(255)
    circle(300, 125, 200)
    circle(250, 225, 200)
    circle(350, 225, 200)
    noFill()
    circle(300, 125, 200)
    circle(250, 225, 200)
    circle(350, 225, 200)
    fill(150)
    //now we do speficic segments
    //A - outside
    if (set.at(1, 0, 0)) {
        drawExclusiveA();
    }
    if (set.at(0, 1, 0)) {
        drawExclusiveB();
    }
    if (set.at(0, 0, 1)) {
        drawExclusiveC();
    }
    if (set.at(1, 1, 0)) {
        drawAB();
    }
    if (set.at(0, 1, 1)) {
        drawBC();
    }
    if (set.at(1, 0, 1)) {
        drawAC();
    }
    if (set.at(1, 1, 1)) {
        drawABC();
    }
    pop()
}
function displaySet(set) {
    drawShapes(set)

}
function updateSet() {
    prevInput = document.getElementById("formula").value
    try {
        currSet = evaluateString(document.getElementById("formula").value)
    } catch {
        //pass, we just dont set it
    }
}