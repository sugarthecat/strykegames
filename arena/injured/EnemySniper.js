class EnemySniper {
    constructor(x, y, timeBetweenFire = 1, turnSpeed = 1, turnRange = 100, maxRange = 500) {
        this.x = x;
        this.y = y;
        this.alive = true;
        this.angle = random (0,2 * PI);
        this.reloadTime = 0;
        this.timeBetweenFire = timeBetweenFire;
        this.radius = 20;
        this.turnRange = turnRange;
        this.turnSpeed = turnSpeed;
        this.maxRange = maxRange;
        this.wantsToFire = false;
    }
    isAlive() {
        return this.alive;
    }
    DrawLower() { }
    DrawUpper() {
        push()
        translate(this.x, this.y);
        fill(0)
        rotate(this.angle)
        circle(0, 0, 40)
        scale(1.5, 1.5)
        image(Assets.enemy, -50, -50, 100, 100)
        pop()
    }
    Update(player, background, bullets) {
        this.reloadTime += deltaTime / 1000
        for (const bullet of bullets) {
            if (dist(this.x, this.y, bullet.x, bullet.y) < this.radius) {
                this.alive = false;
                bullet.landed = true;
            }
        }
        let deltaX = player.x - this.x;
        let deltaY = player.y - this.y;
        let pAngle = atan2(deltaY, deltaX)
        let turnSpeedFactor = min(1, this.turnRange / dist(0, 0, deltaX, deltaY))
        let turnSpeed = this.turnSpeed * turnSpeedFactor
        if (abs(pAngle - this.angle) < PI) {
            if (this.angle > pAngle) {
                this.angle = max(pAngle, this.angle - deltaTime / 1000 * turnSpeed)
            }
            if (this.angle < pAngle) {
                this.angle = min(pAngle, this.angle + deltaTime / 1000 * turnSpeed)
            }
        } else {
            if (this.angle < pAngle) {
                this.angle += 2 * PI
            } else {
                this.angle -= 2 * PI
            }
        }
        this.wantsToFire= abs(pAngle - this.angle) < PI/4 && dist (0,0,deltaX,deltaY) < this.maxRange

    }
    attemptShoot() {
        if (this.reloadTime < this.timeBetweenFire || !this.wantsToFire) {
            return;
        }
        const angle = this.angle;
        this.reloadTime = 0;
        const speed = 400;
        const muzzleRad = 48;
        const muzzleOff = -5;
        return new Bullet(this.x + cos(angle) * muzzleRad + sin(angle) * muzzleOff,
            this.y + sin(angle) * muzzleRad - cos(angle) * muzzleOff,
            cos(angle) * speed, sin(angle) * speed);
    }
}