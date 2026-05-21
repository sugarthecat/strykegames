class Tree {
    constructor(x, y, radius = 50) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }
    isAlive() {
        return true;
    }
    DrawLower() {
    }
    DrawUpper() {
        for (let i = 0; i < 5; i++) {
            fill(0, 80 + i * 30, 0)
            circle(this.x, this.y, this.radius * 2 * (5 - i) / 5)
        }
    }
    Update(player, background, bullets) {
        for (const b of bullets) {
            const d = dist(b.x, b.y, this.x, this.y)
            if (d > this.radius) {
                continue;
            }
            b.landed = true;
        }
        const d = dist(player.x, player.y, this.x, this.y);
        const targetDist = player.radius + this.radius;
        if (d < targetDist) {
            let deltaX = player.x - this.x;
            let deltaY = player.y - this.y;
            player.x = this.x + targetDist / d * deltaX;
            player.y = this.y + targetDist / d * deltaY;
        }
    }
}