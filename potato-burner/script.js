let potato;
let flame;
function preload() {
    potato = loadImage("badtaters.png")
    flame = loadImage("flame.png")
}
function setup() {
    createCanvas(windowWidth, windowHeight)
}
let objects = []
const NOISE_SCALE = 0.01;
function draw() {
    while (windowWidth / 50 > objects.length) {
        objects.push(new BurningObject(objects.length * 50))
    }
    background(0)
    for (let i = 0; i < objects.length; i++) {
        objects[i].draw();
    }
    let tgtFlameSize = min(height / 2, width / 2)
    for (let i = -100; i < width+100; i += 25) {
        let flameSize = tgtFlameSize * noise((i+frameCount) * NOISE_SCALE)
        image(flame, i, height - flameSize/2, flameSize,flameSize)
    }
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
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
        this.y += deltaTime / 3000 * height
        this.rotation += deltaTime / 2000 * this.rotspeed
        if (this.y > height) {
            this.y = - random(height) - 25;
            this.rotation = random(0, PI)
            this.rotspeed = random(-1, 1)
        }
    }
}