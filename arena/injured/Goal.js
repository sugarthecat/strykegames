class Goal {
    constructor(x, y, radius=60) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.time = 0;
    }
    isAlive() {
        return true;
    }
    DrawLower() {
        push()
        fill(200, 200, 0)
        circle(this.x, this.y, 24)
        noFill()
        for (let i = 0; i < 3; i++) {
            strokeWeight(4 * (3 - (this.time % 1 + i)))
            stroke(200, 200, 0)
            circle(this.x, this.y, 2 * this.radius * ((this.time % 1 + i)) / 3)
        }
        pop()
    }
    DrawUpper() {
    }
    Update(player, background, bullets) {
        this.time += deltaTime / 1000;
        if (dist(player.x, player.y, this.x, this.y) < this.radius) {
            player.goalTime += deltaTime / 1000;
        } else {
            player.goalTime = max(0, player.goalTime - deltaTime / 1000);
        }
    }
}