
class ServeScreen extends GUI {
    constructor() {
        super();
        const ref = this;
        this.elements = [
            new Button(220, 350, 60, 25, "Yes.", function () {
                score -= 3;
                if (score > 0) {
                    screenOn = "goodending"
                } else {
                    screenOn = "badending"
                }
            }, false), new Button(320, 350, 60, 25, "No.", function () {
                score += 3;
                if (score > 0) {
                    screenOn = "goodending"
                } else {
                    screenOn = "badending"
                }
            }, false)
        ]
        this.message = "Was I made to replace you?"
        this.time = 0;
        this.targetTime = 10
    }
    Draw(x, y) {
        this.time += deltaTime / 1000
        push()
        background(0)
        noStroke()
        for (let i = 0; i < 10; i++) {
            fill(0, 100, 200, 50 + i * 5)
            circle(300 + random(-5, 5), 125 + random(-5, 5), 220 - i * 20 + cos(this.time + i) * 10)
        }
        fill(255)
        textSize(24)
        textAlign(CENTER)
        if (random() < 0.5) {
            if (random() < 0.5) {
                textStyle(BOLDITALIC)
            } else {
                textStyle(BOLD)
            }
        } else {
            if (random() < 0.5) {
                textStyle(ITALIC)
            } else {
                textStyle(NORMAL)
            }
        }
        textFont('Courier New')
        text(this.message.substring(0, floor(min(this.time / this.targetTime, 1) * this.message.length)), 300 + random(-2, 2), 275 + random(-2, 2))
        pop()
        if (this.time > this.targetTime + 1) {
            super.DrawElements(x, y)
        }
        this.elements[0].active = this.time > this.targetTime + 3;
        this.elements[1].active = this.time > this.targetTime + 3;
    }
}