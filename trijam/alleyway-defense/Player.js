let playerBullets = []
class Player {
    constructor() {
        this.x = 300
        this.y = 200
        this.speed = 140
        this.leftmove = true;
        this.reload = 1
        this.reloadTime = 0.5
    }
    Draw() {
        push()
        fill(255, 0, 0)
        translate(this.x, this.y)
        if (this.leftmove) {
            scale(-1, 1)
        }
        image(Assets.detective, - 40, - 40, 80, 80)
        pop()
        //update movement
        let deltaPos = deltaTime * this.speed / 1000
        let deltaY = 0;
        let deltaX = 0
        if (keyIsDown(65)) {
            //left
            deltaX -= 1
        }
        if (keyIsDown(87)) {
            //up
            deltaY -= 1
        }
        if (keyIsDown(68)) {
            //right
            deltaX += 1
        }
        if (keyIsDown(83)) {
            //down
            deltaY += 1
        }
        if (deltaX == 0 || deltaY == 0) {
            this.x += deltaX * deltaPos
            this.y += deltaY * deltaPos
        } else {
            this.x += deltaX * deltaPos / sqrt(2)
            this.y += deltaY * deltaPos / sqrt(2)
        }
        if (deltaX != 0) {
            this.leftmove = (deltaX > 0)
        }
        this.reload += deltaTime / 1000
        this.x = max(this.x, 120)
        this.x = min(this.x, 480)
        this.y = max(this.y, 20)
        this.y = min(this.y, 380)
        //shoot
        if (keyIsDown(32) && this.reload > this.reloadTime) {
            this.reload = 0
            Assets.gunshot.play()
            if (this.leftmove) {

                playerBullets.push(new PlayerBullet(this.x, this.y - 10, 500))
            } else {
                playerBullets.push(new PlayerBullet(this.x, this.y - 10, -500))

            }
        }
    }


}
//path