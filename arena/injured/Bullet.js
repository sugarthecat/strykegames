class Bullet {
    constructor(x, y, dx, dy) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.landed = false;
    }
    Update(player) {
        this.x += this.dx * deltaTime / 1000;
        this.y += this.dy * deltaTime / 1000;
        if (dist(this.x, this.y, player.x, player.y) < player.radius) {
            player.kill()
            this.landed = true;
        }
    }
    Draw() {
        push();
        stroke(255, 220, 0);
        strokeWeight(5)
        line(this.x, this.y, this.x - this.dx * 0.02, this.y - this.dy * 0.02)
        pop();
    }
}
