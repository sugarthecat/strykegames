class Artillery {
    constructor(startTime = 0, reloadTime = 15, fireTime = 5, diameter = 150, trackScale = 0, trackSpin = 0) {
        this.reloadTime = reloadTime;
        this.fireTime = fireTime;
        this.time = startTime;
        this.explodeTime = 9999;
        this.diameter = diameter;
        this.targetx = 0;
        this.targety = 0;
        this.trackScale = trackScale;
        this.trackSpin = trackSpin;
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

    UpdateTarget(player) {
        this.targetx = player.x
        this.targetx += player.trackdx * this.fireTime * this.trackScale;
        this.targetx -= player.trackdy * this.fireTime * this.trackSpin;
        this.targety = player.y
        this.targety += player.trackdy * this.fireTime * this.trackScale;
        this.targety += player.trackdx * this.fireTime * this.trackSpin;
    }

    DrawUpper() {
        if (this.explodeTime > 0 && this.explodeTime < 2) {

            const explodeDia = (1 - abs(1 - this.explodeTime)) ** 2 * this.diameter
            for (let i = 0; i < 5; i++) {
                const c = color(250, i * 50, 0)
                c.setAlpha(100 + i * 20)
                fill(c)
                circle(this.targetx, this.targety, (5 - i) * explodeDia / 5)
            }
        }
    }
    Update(player, background) {
        if (this.explodeTime > 0 && this.explodeTime < 2) {
            const explodeDia = (1 - abs(1 - this.explodeTime)) ** 2 * this.diameter
            if (dist(this.targetx, this.targety, player.x, player.y) < explodeDia / 2 + player.radius * 0.75) {
                player.kill()
            }
        }

        this.explodeTime += deltaTime / 1000
        if (this.time < this.reloadTime) {
            this.time += deltaTime / 1000
            if (this.time >= this.reloadTime) {
                this.UpdateTarget(player)
            }
        } else if (this.time < this.reloadTime + this.fireTime) {
            this.time += deltaTime / 1000
            //firetime
        } else {
            //fire
            background.entities.push(new Crater(this.targetx, this.targety, this.diameter));
            this.explodeTime = 0;
            this.time = 0;
        }
    }
    isDead() {
        return false;
    }
}