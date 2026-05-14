class Player {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.speed = 60;
        this.canReload = true;
        this.reloadTime = 0;
        this.alive = true;
        this.disabled = false;
        this.facing = 0;
        this.dyingTime = -1;
        this.dx = 0;
        this.dy = 0;
    }
    isAlive() {
        return this.alive;
    }
    kill() {
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
        if (keyIsDown(87)) {
            delta.y--;
            //w
        }
        if (keyIsDown(83)) {
            delta.y++;
            //s
        }
        if (keyIsDown(65)) {
            delta.x--;
            //a
        }
        if (keyIsDown(68)) {
            delta.x++;
            //d
        }

        if (delta.y == 0 || delta.x == 0) {
            this.dy = delta.y * this.speed;
            this.dx = delta.x * this.speed;
        } else {
            this.dy = delta.y / sqrt(2) * this.speed;
            this.dx = delta.x / sqrt(2) * this.speed;
        }
        this.x += this.dx * deltaTime / 1000;
        this.y += this.dy * deltaTime / 1000;
    }

    Draw(targetx, targety) {
        this.reloadTime += deltaTime / 1000
        if (this.dyingTime >= 0) {
            this.dyingTime += deltaTime / 1000;
            if (this.dyingTime >= 1) {
                this.alive = false;
            }
        }
        push()
        translate(this.x, this.y);
        fill(0)
        if (!this.disabled) {
            this.facing = atan2(targety - this.y, targetx - this.x);
        }
        rotate(this.facing)
        circle(0, 0, 40)
        scale(1.5, 1.5)
        image(Assets.player, -50, -50, 100, 100)
        pop()
    }
    canFire() {
        if (this.reloadTime < 1) {
            return false;
        }
        return true;
    }
    attemptShoot(targetx, targety) {
        const angle = atan2(targety - this.y, targetx - this.x)
        if (!this.canFire()) {
            return false;
        }
        this.reloadTime = 0;
        const speed = 400;
        const muzzleRad = 48;
        const muzzleOff = -5;
        return new Bullet(this.x + cos(angle) * muzzleRad + sin(angle) * muzzleOff,
            this.y + sin(angle) * muzzleRad - cos(angle) * muzzleOff,
            cos(angle) * speed, sin(angle) * speed);
    }
}