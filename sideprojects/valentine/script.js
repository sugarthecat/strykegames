

const SCREEN_DIMENSIONS = { x: 600, y: 400 }
let scaleFactor = 1;
let screens;
let potato;
function preload() {
    potato = loadImage("badtaters.png")
}
function setup() {
    createCanvas(windowWidth, windowHeight);
    for(let i = 0; i<10; i++){
        taters.push( new BurningObject(i/10*600))
    }
}
let taters = []
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
    fill(255, 0, 0)
    scale(scaleFactor, scaleFactor)
    background(0);
    fill(255,150,255)
    rect(0, 0, 600, 400)
    fill(255,50,200)
    textSize(80)
    textAlign(CENTER)
    for(let i = 0; i<taters.length; i++){
        taters[i].draw()
    }
    text("Will you be my",300,100)
    textSize(100)
    text("Sweet Potato",300,380)
    fill(0)
    noStroke()
    rect(-xTranslation, 0, xTranslation, 400)
    rect(600, 0, xTranslation, 400)
    rect(0, -yTranslation, 600, yTranslation)
    rect(0, 400, 600, yTranslation)
}

class BurningObject {
    constructor(targetx) {
        this.x = targetx;
        this.y = random(-height, height) - 25;
        this.rotation = random(0, PI)
        this.rotspeed = random(-1, 1)
    }
    draw() {
        push()
        translate(this.x, this.y)
        rotate(this.rotation)
        image(potato, -40, -40, 80, 80)
        pop()
        this.y += deltaTime / 6000 * height
        this.rotation += deltaTime / 2000 * this.rotspeed
        if (this.y > height) {
            this.y = - random(height) - 25;
            this.rotation = random(0, PI)
            this.rotspeed = random(-1, 1)
        }
    }
}