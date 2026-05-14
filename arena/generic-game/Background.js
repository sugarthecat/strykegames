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
        if (this.x < cx - 400 || this.x > cx + 400) {
            return;
        }
        if (this.y < cy - 250 || this.y > cy + 250) {
            return
        }
        stroke(0, 150, 0)
        strokeWeight(5)
        translate(this.x, this.y)
        for (let i = 0; i < this.angles.length; i++) {
            line(0, 0, this.lengths[i] * cos(this.angles[i] - PI / 2), this.lengths[i] * sin(this.angles[i] - PI / 2))
        }
    }
}
class Background {
    constructor(minx, maxx, miny, maxy) {
        this.entities = []
        for (let i = minx; i <= maxx; i+=150) {
            for (let j = miny; j <= maxy; j+=150) {
                this.entities.push(new Grass(i + random(-50,50), j + random(-50,50)))
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