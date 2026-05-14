class Landmine {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.time = random(0, 10)
        this.exploding = false;
        this.explodeTime = 0;
    }

    DrawLower() {

        fill(120)
        circle(this.x, this.y, 40)
        fill(80)
        circle(this.x, this.y, 35)
        fill(cos(this.time * 5) * 50 + 50, 0, 0)
        circle(this.x, this.y, 10)
        fill(cos(this.time * 5) * 100 + 100, 0, 0)
        circle(this.x, this.y, 5)
    }
    DrawUpper() {

        if (this.exploding) {
            for (let i = 0; i < 5; i++) {
                const c = color(250, i * 50, 0)
                c.setAlpha(100 + i * 20)
                fill(c)
                circle(this.x, this.y, 5 + (5 - i) * (this.explodeTime ** 2) * 75)
            }
        }
    }
    Update(player, background) {
        if (dist(player.x, player.y, this.x, this.y) < 40) {
            this.exploding = true;
            player.kill()
        }
        this.time += deltaTime / 1000
        if (this.exploding) {
            this.explodeTime += deltaTime / 1000
        }
    }
    isDead() {
        return false;
    }
}