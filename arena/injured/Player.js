class Player {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
        this.speed = 60;
        this.canReload = true;
        this.reloadTime = 0;
        this.alive = true;
        this.disabled = false;
        this.moveReshuffle = false;
        this.backwardsRotation = false;
        this.moveKeys = [{ keyCode: 87, symbol: "W" }, { keyCode: 83, symbol: "S" }, { keyCode: 65, symbol: "A" }, { keyCode: 68, symbol: "D" }];
        this.facing = 0;
        this.dyingTime = -1;
        this.dx = 0;
        this.dy = 0;
        this.trackdx = 0;
        this.trackdy = 0;
        this.radius = 20;
        this.goalTime = 0;
    }
    isAlive() {
        return this.alive;
    }
    kill() {
        //return;
        //temporarily immune for testing
        if (this.dyingTime >= 0) {
            return;
        }
        this.disabled = true;
        this.dyingTime = 0;
    }
    Move() {
        if (this.disabled) {
            return;
        }
        let delta = { x: 0, y: 0 }
        if (keyIsDown(this.moveKeys[0].keyCode)) {
            delta.y--;
            //w
        }
        if (keyIsDown(this.moveKeys[1].keyCode)) {
            delta.y++;
            //s
        }
        if (keyIsDown(this.moveKeys[2].keyCode)) {
            delta.x--;
            //a
        }
        if (keyIsDown(this.moveKeys[3].keyCode)) {
            delta.x++;
            //d
        }

        let deltaMag = max(1, sqrt(delta.x ** 2 + delta.y ** 2))
        this.dy = delta.y * this.speed / deltaMag;
        this.dx = delta.x * this.speed / deltaMag;
        this.x += this.dx * deltaTime / 1000;
        this.y += this.dy * deltaTime / 1000;
        if (this.dx != 0 || this.dy != 0) {
            this.trackdx = this.dx;
            this.trackdy = this.dy;
        }
    }
    Update() {
        this.reloadTime += deltaTime / 1000
        if (this.dyingTime >= 0) {
            this.dyingTime += deltaTime / 1000;
            if (this.dyingTime >= 1) {
                this.alive = false;
            }
        }
        this.Move()
        if (this.moveReshuffle) {
            this.moveReshuffle.time += deltaTime / 1000
            if (this.moveReshuffle.time >= this.moveReshuffle.shuffleTime) {
                let availKeys = []
                for (let key of this.moveReshuffle.keys) {
                    availKeys.push(key)
                }
                availKeys = shuffle(availKeys)
                while (availKeys.length > 4) {
                    availKeys.pop()
                }
                this.moveKeys = availKeys
                this.moveReshuffle.time = 0;
            }
        }
    }
    Draw(targetx, targety) {
        this.Update()
        push()
        translate(this.x, this.y);
        fill(0)
        if (!this.disabled) {
            this.facing = atan2(targety - this.y, targetx - this.x);
        }
        rotate(this.facing)
        circle(0, 0, this.radius * 2)
        scale(1.5, 1.5)
        image(Assets.player, -50, -50, 100, 100)
        pop()
        push()
        stroke(255, 255, 0)
        strokeWeight(5)
        noFill()
        arc(this.x, this.y - 50, 40, 40, 0, 2 * PI * min(1, this.goalTime / 5))
        pop()
    }
    DrawGUI() {
        if (this.dyingTime >= 0) {
            const red = color(255, 0, 0)
            red.setAlpha(200 * (this.dyingTime))
            fill(red)
            rect(0, 0, 600, 400)
        }
        if (this.moveReshuffle) {
            push()
            stroke(0)
            strokeWeight(3)
            textAlign(CENTER, CENTER)
            fill(255)
            rect(70, 10, 60, 60)
            rect(10, 70, 60, 60)
            rect(70, 70, 60, 60)
            rect(130, 70, 60, 60)
            textSize(30)
            noStroke()
            fill(0)
            text(this.moveKeys[0].symbol, 100, 40)
            text(this.moveKeys[2].symbol, 40, 100)
            text(this.moveKeys[1].symbol, 100, 100)
            text(this.moveKeys[3].symbol, 160, 100)
            stroke(255,255,0)
            strokeWeight(8)
            noFill()
            arc (40, 40, 40, 40, 0, 2 * PI * this.moveReshuffle.time / this.moveReshuffle.shuffleTime)
            pop()
        }
    }
    canFire() {
        if (this.reloadTime < 1) {
            return false;
        }
        return true;
    }
    attemptShoot(targetx, targety) {
        print(`new Tree(${targetx}, ${targety}, ${Math.floor(random(35, 50))})`)
        if (!this.canFire()) {
            return null;
        }
        this.reloadTime = 0;
        const speed = 400;
        const muzzleRad = 48;
        const muzzleOff = -5;
        return new Bullet(
            this.x + cos(this.facing) * muzzleRad + sin(this.facing) * muzzleOff,
            this.y + sin(this.facing) * muzzleRad - cos(this.facing) * muzzleOff,
            cos(this.facing) * speed, sin(this.facing) * speed
        );
    }
}