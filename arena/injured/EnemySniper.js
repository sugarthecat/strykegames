class EnemySniper {
    constructor(x, y, fireSpeed) {
        this.x = 0;
        this.y = 0;
        this.alive = true;
        this.angle = 0;
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
    Update(player, background) {

    }
    attemptShoot() {
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