class HoustonAttacker extends Attacker {
    constructor() {
        super();
        this.xpos = 2;
        this.actionTime = 0;
        this.currAction = "none";
        this.currX = 0;
        this.currY = 0;
        this.color = color(200,0,0)
    }
    reset(){
        this.actionTime = 0;
        this.xpos = 2;
        this.currAction = "none";
        super.reset()
    }
    triggerAction(action) {
        if (this.actionTime < 0 && this.currAction != "none") {
            this.setCooldown(4)
            this.currAction = "none"
        }
        if (this.actionTime > 0) {
            if (this.cooldown > 0) {
                return;
            }
            let gunY = this.currY + 10
            let theta = atan2(this.runner.y - gunY, this.runner.x - this.currX)
            if (this.currAction == "gunslinger") {
                if (action == 2) {
                    this.projectiles.push(new HoustonBullet(theta, this.currX, gunY, 10, 115))
                    this.setCooldown(1)
                }
                if (action == 1) {
                    this.projectiles.push(new HoustonBullet(theta, this.currX, gunY, 25, 60))
                    this.setCooldown(1.2)
                }
                if (action == 3) {
                    this.projectiles.push(new HoustonBullet(theta, this.currX, gunY, 10, 80))
                    this.projectiles.push(new HoustonBullet(theta + 0.2, this.currX, gunY, 10, 80))
                    this.projectiles.push(new HoustonBullet(theta - 0.2, this.currX, gunY, 10, 80))
                    //this.projectiles.push(new HoustonBullet(theta + 0.4, this.currX, gunY, 10, 80))
                    //this.projectiles.push(new HoustonBullet(theta - 0.4, this.currX, gunY, 10, 80))
                    this.setCooldown(2)
                }
                if (action == 0) {
                    this.projectiles.push(new HoustonBullet(theta, this.currX, gunY, 10, 80))
                    this.projectiles.push(new HoustonBullet(theta + PI / 2, this.currX, gunY, 10, 80))
                    this.projectiles.push(new HoustonBullet(theta + PI, this.currX, gunY, 10, 80))
                    this.projectiles.push(new HoustonBullet(theta + PI * 3 / 2, this.currX, gunY, 10, 80))
                    this.setCooldown(4)
                }
            }
            return
        }

        if (action == 4) {
            this.xpos--;
        } else if (action == 5) {
            this.xpos++;
        }

        this.xpos = constrain(this.xpos, 0, 4)
        if (this.cooldown > 0) {
            return
        }
        if (action == 1) {
            this.projectiles.push(new HoustonRocket(-1, this.xpos))
            this.setCooldown(2)
        } else if (action == 2) {
            this.projectiles.push(new HoustonRocket(1, this.xpos))
            this.setCooldown(1.5)
        } else if (action == 3) {
            this.currAction = "gunslinger"
            this.actionTime = 15;
            this.currY = 0;
            if (this.runner.x > 0) {
                this.currX = -125 + 20;
            } else {
                this.currX = 125 - 20;
            }
        } else if (action == 0) {
            for (let i = 0; i <= 4; i++) {
                if (i != this.xpos) {
                    this.projectiles.push(new HoustonRocket(1, i))
                }
            }
            this.setCooldown(4)
        } else {
            console.log("No attack for ", action)
        }

    }

    draw() {
        this.actionTime -= deltaTime / 1000;

        if (this.actionTime < 0) {
            image(Assets.houston.main, 175 + this.xpos * 50 - 10, 100 - 25, 70, 70)
        } else if (this.currAction == "gunslinger") {
            const speed = 25;
            this.currX += deltaTime / 1000 * speed * this.lastGamepad.axes[0];
            this.currY += deltaTime / 1000 * speed * this.lastGamepad.axes[1];
            this.currX = constrain(this.currX, -125 + 20, 125 - 20);
            this.currY = constrain(this.currY, -90 + 20, 90 - 20);
            let gunY = this.currY + 10
            let theta = atan2(this.runner.y - gunY, this.runner.x - this.currX)
            push()
            translate(this.currX + 300, this.currY + 250);
            imageMode(CENTER)
            image(Assets.houston.main, 0, 0, 40, 40)
            translate(0, 10)
            rotate(theta)
            if (theta > PI / 2 || theta < -PI / 2) {
                scale(1, -1)
            }
            image(Assets.houston.gun, 0, 0, 30, 30)
            pop()
        }
        this.drawProjectiles();
        this.drawCooldown();
    }
}
class HoustonRocket {
    // x, y is the rocket's center in arena coords
    constructor(dir, lane) {
        this.dir = dir;
        this.x = lane * 50 - 100;
        if (dir == 1) {
            this.y = -300;
        } else {
            this.y = 200;
        }
    }
    draw() {
        const speed = 100
        push()
        translate(this.x, this.y);
        rotate(PI / 2)
        if (this.dir == -1) {
            rotate(PI)
        }
        image(Assets.houston.rocket, -50, -25, 100, 50)
        pop()
        this.y += this.dir * deltaTime / 1000 * speed;
    }
    collides(player) {
        const tipGap = 30; // ignore the narrow nose of the rocket
        const sideGap = 5;
        let left = this.x - 25 + sideGap;
        let right = this.x + 25 - sideGap;
        let top = this.y - 50;
        let bottom = this.y + 50;
        if (this.dir == 1) {
            bottom -= tipGap;
        } else {
            top += tipGap;
        }
        return player.x + player.radius > left && player.x - player.radius < right &&
            player.y + player.radius > top && player.y - player.radius < bottom;
    }
    toBeRemoved() {
        return this.y < -1000 || this.y > 1000
    }
}
class HoustonBullet {
    constructor(dir, xpos, ypos, size, speed) {
        this.theta = dir;
        this.dx = cos(dir) * speed;
        this.dy = sin(dir) * speed;
        this.size = size;
        this.x = xpos;
        this.y = ypos;
    }
    draw() {
        push()
        translate(this.x, this.y)
        imageMode(CENTER)
        rotate(this.theta)
        image(Assets.houston.bullet, 0, 0, this.size, this.size)
        pop()
        this.x += this.dx * deltaTime / 1000
        this.y += this.dy * deltaTime / 1000
    }
    collides(player) {
        return dist(this.x, this.y, player.x, player.y) < this.size / 3 + player.radius
    }
    toBeRemoved() {
        return dist(0, 0, this.x, this.y) > 2000;
    }
}