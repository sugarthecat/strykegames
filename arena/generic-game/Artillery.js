class Artillery {
    constructor(reloadTime = 15, fireTime = 5, diameter = 150) {
        this.reloadTime = reloadTime;
        this.fireTime = fireTime;
        this.time = 0;
        this.explodeTime = 9999;
        this.diameter = diameter;
        this.targetx = 0;
        this.targety = 0;
    }

    DrawLower() {
        if (this.time > this.reloadTime && this.time < this.fireTime + this.reloadTime) {
            push()
            stroke(120, 0, 0)
            strokeWeight(12)
            line(this.targetx - 50, this.targety + 50, this.targetx, this.targety - 50)
            line(this.targetx + 50, this.targety + 50, this.targetx, this.targety - 50)
            line(this.targetx + 50, this.targety + 50, this.targetx - 50, this.targety + 50)
            stroke(200, 0, 0)
            strokeWeight(4)
            line(this.targetx - 50, this.targety + 50, this.targetx, this.targety - 50)
            line(this.targetx + 50, this.targety + 50, this.targetx, this.targety - 50)
            line(this.targetx + 50, this.targety + 50, this.targetx - 50, this.targety + 50)
            fill(200, 0, 0)
            stroke(120, 0, 0)
            strokeWeight(4)
            textSize(30)
            textAlign(CENTER, CENTER)
            text(ceil(this.fireTime + this.reloadTime - this.time), this.targetx, this.targety + 20)
            pop()
        }
    }
    DrawUpper() {
        if (this.explodeTime > 0 && this.explodeTime < 2) {
            const explodeRad = (1 - abs(1 - this.explodeTime)) ** 2 * this.diameter
            for (let i = 0; i < 5; i++) {
                const c = color(250, i * 50, 0)
                c.setAlpha(100 + i * 20)
                fill(c)
                circle(this.targetx, this.targety, 5 + (5 - i) * explodeRad / 5)
            }
        }
    }
    Update(player) {
        if (this.explodeTime > 0 && this.explodeTime < 2) {
            const explodeRad = (1 - abs(1 - this.explodeTime)) ** 2 * this.diameter
            if (dist(this.targetx, this.targety, player.x, player.y) < this.diameter / 2 + 20) {
                player.kill()
            }
        }

        this.explodeTime += deltaTime / 1000
        if (this.time < this.reloadTime) {
            this.time += deltaTime / 1000
            if (this.time >= this.reloadTime) {
                this.targetx = player.x
                this.targety = player.y
            }
        } else if (this.time < this.reloadTime + this.fireTime) {
            this.time += deltaTime / 1000
            //firetime
        } else {
            //fire
            this.explodeTime = 0;
            this.time = 0;
        }
    }
    isDead() {
        return false;
    }
}