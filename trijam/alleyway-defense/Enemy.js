let enemies = []
let enemyBullets = []
class Enemy {
    constructor(y, reloadTime) {
        if (random() < 0.5) {
            this.x = -60
        } else[
            this.x = 660
        ]
        this.y = y;
        this.reloadTime = reloadTime
        this.reload = 0
    }
    Draw() {
        if (this.x < 50) {
            this.x += deltaTime / 30
        }
        if (this.x > 550) {
            this.x -= deltaTime / 30
        }
        this.reload += deltaTime / 1000
        push()
        fill(255, 0, 0)
        translate(this.x, this.y)
        if (this.x > 300) {
            scale(-1, 1)
        }
        image(Assets.robber, -45, - 45, 90, 90)
        pop()
        if (this.reload > this.reloadTime) {
            //fire bullet
            this.reload = 0
            enemyBullets.push(new EnemyBullet(this.x, this.y, player.x, player.y))
        }
    }
}