class Grass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = random(20, 50)
        this.angles = [
            random(-0.5, 0),
            random(-0.25, 0.25),
            random(0, 0.5)
        ]
        this.lengths = [
            random(10, 15),
            random(15, 20),
            random(10, 15)
        ]
    }
    Draw(cx, cy) {
        const sf = GameScreen.scaleFactor;
        if (this.x < cx - 400 * sf || this.x > cx + 400 * sf) {
            return;
        }
        if (this.y < cy - 250 * sf || this.y > cy + 250 * sf) {
            return
        }
        stroke(0, 120, 0)
        strokeWeight(5)
        translate(this.x, this.y)
        for (let i = 0; i < this.angles.length; i++) {
            line(0, 0, this.lengths[i] * cos(this.angles[i] - PI / 2), this.lengths[i] * sin(this.angles[i] - PI / 2))
        }
    }
}
class Crater {
    constructor(x, y, diameter = 150) {
        this.x = x;
        this.y = y;
        this.size = diameter * random(0.55, 0.7);
        this.offsets = [{
            x: random(-5, 5),
            y: random(-5, 5)
        }, {
            x: random(-5, 5),
            y: random(-5, 5)
        }, {
            x: random(-5, 5),
            y: random(-5, 5)
        }]
        this.time = 0;
    }
    Draw(cx, cy) {
        this.time += deltaTime / 1000;
        const sf = GameScreen.scaleFactor;
        if (this.x < cx - 400 * sf || this.x > cx + 400 * sf) {
            return;
        }
        if (this.y < cy - 250 * sf || this.y > cy + 250 * sf) {
            return;
        }

        let size = this.time * 5 - 4
        size = constrain(size, 0, 1)
        size *= this.size;
        noStroke()
        fill(95, 65, 35)
        circle(this.x + this.offsets[0].x, this.y + this.offsets[0].y, size)
        fill(60, 40, 20)
        circle(this.x + this.offsets[1].x, this.y + this.offsets[1].y, size * 0.65)
        fill(35, 25, 15)
        circle(this.x + this.offsets[2].x, this.y + this.offsets[2].y, size * 0.3)
    }
}
class Background {
    constructor(minx, maxx, miny, maxy) {
        this.entities = []
        for (let i = minx; i <= maxx; i += 150) {
            for (let j = miny; j <= maxy; j += 150) {
                this.entities.push(new Grass(i + random(-50, 50), j + random(-50, 50)))
            }
        }
    }
    Draw(cx, cy) {
        for (let i = 0; i < this.entities.length; i++) {
            push()
            this.entities[i].Draw(cx, cy);
            pop()
        }
    }
}