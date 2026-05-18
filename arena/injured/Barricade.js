class Barricade {
    constructor(x, y, startAngle, endAngle) {
        this.x = x;
        this.y = y;
        this.startAngle = this.nAngle(startAngle)
        this.endAngle = endAngle
        this.alive = true;
        this.angle = 0;
    }
    nAngle(angle) {
        //normalizes an angle to [0, 2pi)
        if (angle < PI * 2 && angle >= 0) {
            return angle;
        }
        return this.nAngle(angle % (PI * 2) + PI * 2)
    }
    isAlive() {
        return this.alive;
    }
    DrawLower() {
        push()
        noFill()
        stroke(100)
        strokeWeight(12)
        arc(this.x, this.y, 75, 75, this.startAngle, this.endAngle)
        stroke(150)
        strokeWeight(6)
        arc(this.x, this.y, 75, 75, this.startAngle, this.endAngle)
        pop()
    }
    DrawUpper() {
    }
    Update(player, background) {
        for (const b of player.bullets) {
            const d = dist(b.x, b.y, this.x, this.y)
            if (d > 43 || d < 30) {
                continue;
            }
            const angle = this.nAngle(atan2(b.y - this.y, b.x - this.x))
            if (angle < this.startAngle || angle > this.endAngle) {
                continue;
            }
            b.landed = true;
        }
        let surfaceColl = true;
        const d = dist(player.x, player.y, this.x, this.y);
        if (d < 30 - player.radius || d > 43 + player.radius) {
            surfaceColl = false;
        }
        const angle = this.nAngle(atan2(player.y - this.y, player.x - this.x));
        if (angle < this.startAngle || angle > this.endAngle) {
            surfaceColl = false;
        }
        if (surfaceColl) {
            const targetR = d > 36.5 ? 43 + player.radius : 30 - player.radius;// choose if to push out or to push in
            player.x = this.x + cos(angle) * targetR;
            player.y = this.y + sin(angle) * targetR;
        } else {
            const vertices = [{
                x: this.x + cos(this.startAngle) * 75 / 2,
                y: this.y + sin(this.startAngle) * 75 / 2
            }, {
                x: this.x + cos(this.endAngle) * 75 / 2,
                y: this.y + sin(this.endAngle) * 75 / 2
            }]
            for (const vertex of vertices) {
                if (dist(player.x, player.y, vertex.x, vertex.y) < player.radius + 6) {
                    let deltX = player.x - vertex.x;
                    let deltY = player.y - vertex.y;
                    let scale = (player.radius + 6) / dist(player.x, player.y, vertex.x, vertex.y)
                    player.x = vertex.x + deltX * scale;
                    player.y = vertex.y + deltY * scale;
                }
            }
        }
    }
}