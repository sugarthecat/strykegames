class OculusAttacker extends Attacker {
    constructor() {
        super();
        this.xPos = 0;
        this.actionTime = 0;
        this.currAction = "none";
        this.currX = 0;
        this.currY = 0;
    }
    reset() {
        this.actionTime = 0;
        this.currAction = "none";
        super.reset()
    }
    triggerAction(action) {
        if (this.currAction == "field") {
            if (this.cooldown > 0) {
                return;
            }
            if (action == 2) {
                this.projectiles.push(new OculusLaser(this.currX, this.currY, atan2(this.runner.y - this.currY, this.runner.x - this.currX), 90, 40))
                this.cooldown = 1.5
            }
            if (action == 1) {
                this.projectiles.push(new OculusLaser(this.currX, this.currY, atan2(this.runner.y - this.currY, this.runner.x - this.currX) - 0.3, 90, 40))
                this.projectiles.push(new OculusLaser(this.currX, this.currY, atan2(this.runner.y - this.currY, this.runner.x - this.currX) + 0.3, 90, 40))
                this.cooldown = 2
            }
            if (action == 0) {
                for (let i = 0; i < 18; i++) {
                    const yPos = i * 10 - 85
                    if (abs(this.currY - yPos) < 40) {
                        continue
                    }
                    this.projectiles.push(new OculusLaser(-175, yPos, 0, 70, 50))
                    this.projectiles.push(new OculusLaser(175, yPos, PI, 70, 50))
                }
                this.cooldown = 5
            }
            if (action == 3) {
                for (let i = 0; i < 25; i++) {
                    const xPos = i * 10 - 125
                    if (abs(this.currX - xPos) < 30) {
                        continue
                    }
                    this.projectiles.push(new OculusLaser(xPos, -90, PI / 2, 60, 50))
                    this.projectiles.push(new OculusLaser(xPos, 90, -PI / 2, 60, 50))
                }
                this.cooldown = 5
            }

            // field actions go here
            return
        }

        if (action == 4) {
            this.xPos--;
        } else if (action == 5) {
            this.xPos++;
        }
        if (this.cooldown > 0) {
            return;
        }
        if (action == 2) {
            let x = this.xPos * 50 - 100;

            this.projectiles.push(new OculusLaser(x, -100, atan2(this.runner.y + 100, this.runner.x - x), 80, 50))
            this.cooldown = 1.25
        }
        if (action == 1) {
            let x = this.xPos * 50 - 100;
            this.projectiles.push(new OculusLaser(x, -100, atan2(this.runner.y + 100, this.runner.x - x) - 0.3, 80, 50))
            this.projectiles.push(new OculusLaser(x, -100, atan2(this.runner.y + 100, this.runner.x - x) + 0.3, 80, 50))
            this.cooldown = 1.75
        }
        if (action == 0) {
            let x = this.xPos * 50 - 100;
            for (let i = 0; i < 8; i++) {
                const theta = i * PI / 4
                const playerDist = 200
                this.projectiles.push(new OculusLaser(
                    this.runner.x - cos(theta) * playerDist,
                    this.runner.y - sin(theta) * playerDist, theta, 60, 75))
            }
            this.cooldown = 5
        }
        if (action == 3) {
            this.currAction = "field"
            this.actionTime = 15;
            this.currX = 0;
            if (this.runner.y > 0) {
                this.currY = -90 + 20;
            } else {
                this.currY = 90 - 20;
            }
        }
    }

    draw() {
        super.drawProjectiles()
        this.actionTime -= deltaTime / 1000
        if (this.actionTime < 0 && this.currAction == "field") {
            this.currAction = "none"
            this.cooldown = 4
        }
        if (this.currAction == "field") {
            const speed = 25;
            this.currX += deltaTime / 1000 * speed * this.lastGamepad.axes[0];
            this.currY += deltaTime / 1000 * speed * this.lastGamepad.axes[1];
            this.currX = constrain(this.currX, -125 + 20, 125 - 20);
            this.currY = constrain(this.currY, -90 + 20, 90 - 20);
            push()
            translate(this.currX + 300, this.currY + 250);
            imageMode(CENTER)
            image(Assets.oculus.main, 0, 0, 40, 40)
            pop()
        } else {
            image(Assets.oculus.main, 175 + this.xPos * 50 - 10, 100 - 25, 70, 70)
        }
    }
}
class OculusLaser {
    constructor(startx, starty, dir, speed, length = 100) {
        this.x = startx;
        this.y = starty;
        this.startx = this.x;
        this.starty = this.y;
        this.dx = cos(dir) * speed
        this.dy = sin(dir) * speed
        this.length = length
    }
    draw() {
        push()
        strokeWeight(8)
        stroke(17, 68, 105)
        line(this.x, this.y, this.startx, this.starty)
        strokeWeight(4)
        stroke(0, 188, 255)
        line(this.x, this.y, this.startx, this.starty)

        this.x += this.dx * deltaTime / 1000;
        this.y += this.dy * deltaTime / 1000;
        if (dist(this.x, this.y, this.startx, this.starty) > this.length) {
            const frac = this.length / dist(this.x, this.y, this.startx, this.starty)
            this.startx = frac * this.startx + (1 - frac) * this.x
            this.starty = frac * this.starty + (1 - frac) * this.y
        }
        pop()
    }
    collides(player) {
        // unit vector along the laser
        const speed = mag(this.dx, this.dy)
        const ux = this.dx / speed
        const uy = this.dy / speed
        // unit vector orthogonal to the laser
        const ox = -uy
        const oy = ux
        // vector from the laser's tail to the player
        const px = player.x - this.startx
        const py = player.y - this.starty
        // projections onto the laser and its orthogonal
        const along = px * ux + py * uy
        const across = abs(px * ox + py * oy)
        const length = dist(this.x, this.y, this.startx, this.starty)
        return along >= 0 && along <= length && across < player.radius + 4
    }
    toBeRemoved() {
        return this.y < -1000 || this.y > 1000 || this.x < -1000 || this.x > 1000
    }
}