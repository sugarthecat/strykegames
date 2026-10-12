class HoustonAttacker extends Attacker {
    constructor() {
        super();
        this.xpos = 0;
        this.actionTime = 0;
        this.currAction = "none";
        this.projectiles = []
        this.currX = 0;
        this.currY = 0;
    }
    triggerAction(action) {
        if (this.actionTime < 0 && this.currAction != "none") {
            this.cooldown = 3;
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
                    this.cooldown = 1
                }
                if (action == 1) {
                    this.projectiles.push(new HoustonBullet(theta, this.currX, gunY, 25, 60))
                    this.cooldown = 1.2
                }
                if (action == 3) {
                    this.projectiles.push(new HoustonBullet(theta + 0.25, this.currX, gunY, 10, 80))
                    this.projectiles.push(new HoustonBullet(theta, this.currX, gunY, 10, 80))
                    this.projectiles.push(new HoustonBullet(theta - 0.25, this.currX, gunY, 10, 80))
                    this.cooldown = 2
                }
                if (action == 4) {
                    this.projectiles.push(new HoustonBullet(theta, this.currX, gunY, 10, 80))
                    this.projectiles.push(new HoustonBullet(theta + PI / 2, this.currX, gunY, 10, 80))
                    this.projectiles.push(new HoustonBullet(theta + PI, this.currX, gunY, 10, 80))
                    this.projectiles.push(new HoustonBullet(theta + PI * 3 / 2, this.currX, gunY, 10, 80))
                    this.cooldown = 2
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
            this.cooldown = 2
        } else if (action == 2) {
            this.projectiles.push(new HoustonRocket(1, this.xpos))
            this.cooldown = 1.5
        } else if (action == 3) {
            this.currAction = "gunslinger"
            this.actionTime = 10;
            this.currY = 0;
            if (this.runner.x > 0) {
                this.currX = -125 + 20;
            } else {
                this.currX = 125 - 20;
            }
        } else {
            console.log("No attack for ", action)
        }

    }

    draw() {
        this.actionTime -= deltaTime / 1000;

        //left corner: 175
        //right corner: 425
        //top spot: 250 - 90 = 160
        //say a step is 50

        for (let i = 0; i < this.projectiles.length; i++) {
            this.projectiles[i].draw();
        }
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
    }
}
class HoustonRocket {
    constructor(dir, xpos) {
        this.dir = dir;
        this.xpos = xpos * 50 + 175;
        if (dir == 1) {
            this.ypos = -100;
        } else {
            this.ypos = 400;
        }
        this.alive = true;
    }
    draw() {
        const speed = 100
        push()
        translate(this.xpos + 25, this.ypos + 50);
        angleMode(DEGREES)
        rotate(90)
        if (this.dir == -1) {
            rotate(180)
        }
        image(Assets.houston.rocket, -50, -25, 100, 50)
        pop()
        this.ypos += this.dir * deltaTime / 1000 * speed;
    }
    collides(player) {
        return false;
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
        translate(300, 250)
        imageMode(CENTER)
        rotate(this.theta)
        image(Assets.houston.bullet, 0, 0, this.size, this.size)
        pop()
        this.x += this.dx * deltaTime / 1000
        this.y += this.dy * deltaTime / 1000
    }
}