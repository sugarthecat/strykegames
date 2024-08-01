
class EnemyBullet {
    constructor(x, y, playerX, playerY) {
        this.x = x
        this.y = y
        this.speed = 200;
        let deltaX = playerX - x;
        let deltaY = playerY - y;
        let dist = sqrt(deltaX * deltaX + deltaY * deltaY)
        this.deltaX = deltaX / dist
        this.deltaY = deltaY / dist
    }
    Draw() {
        push()
        fill(255, 255, 0)
        circle(this.x, this.y, 15)
        pop()
        //update movement
        this.x += deltaTime * this.deltaX / 1000 * this.speed
        this.y += deltaTime * this.deltaY / 1000 * this.speed
    }


}
//path