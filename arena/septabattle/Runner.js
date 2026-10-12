class Runner {
    constructor() {
        this.x = 0
        this.y = 0
        this.health = 10;
        this.maxhealth = 10;
        this.invTimer = 0;
        this.progress = 0;
        this.maxProgress = 10;

        this.radius = 5;
    }

    updateGamepad(gamepad) {
        this.invTimer -= deltaTime / 1000;
        const xdir = Math.round(gamepad.axes[0])
        const ydir = Math.round(gamepad.axes[1])
        const speed = 60;
        this.x += deltaTime * xdir * speed / 1000
        this.y += deltaTime * ydir * speed / 1000

        this.x = constrain(this.x, -125 + this.radius, 125 - this.radius);
        this.y = constrain(this.y, -90 + this.radius, 90 - this.radius);
    }

    draw(centerX, centerY) {
        fill(255, 0, 0)
        circle(this.x + centerX, this.y + centerY, 10)
    }

    drawHealthBar() {
        fill(100)
        rect(200, 360, 200, 20)
        fill(200, 0, 0)
        rect(202, 362, 196 * this.health / this.maxhealth, 16)
    }

    drawProgressBar() {
        fill(200)
        rect(200, 360, 200 * this.progress / this.maxProgress, 20)
    }

    getHit() {
        if (this.invTimer > 0) {
            return;
        }
        this.invTimer = 3;
        this.health--;
    }
}
