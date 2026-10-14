class Runner {
    constructor() {
        this.x = 0
        this.y = 0
        this.health = 3;
        this.maxhealth = 3;
        this.invTimer = 0;

        this.radius = 7;
    }
    reset() {
        this.x = 0
        this.y = 0
        this.invTimer = 0;
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
        this.updateGoals()
    }

    updateGoals(){

    }
    draw(centerX, centerY) {
        fill(255, 0, 0)
        circle(this.x + centerX, this.y + centerY, 2*this.radius)
    }

    drawGui(){
        this.drawHealthBar();
    }
    drawHealthBar() {
        fill(100)
        rect(200, 345, 200, 20)
        fill(200, 0, 0)
        rect(202, 347, 196 * this.health / this.maxhealth, 16)
    }

    canSwitch(){
        return false;
    }

    getHit() {
        if (this.invTimer > 0) {
            return;
        }
        this.invTimer = 2;
        this.health--;
    }
}
