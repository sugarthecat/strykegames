
class Handwritten extends GUI {
    constructor() {
        super();
        this.note =
            [
                "There's something about your pencil strokes.",
                "Your careful spacing between lines of graphite,",
                "Makes hundreds of miles feel ever close.",
                "Your unven characters write my history;",
                "A letter could light up the darkest night,",
                "into a constellation's bright symphony.",
                "Your glyphs never lack your lovely mystery.",
                "For the words are perfected, as they might",
                "when they are written with such calligraphy"
            ]
    }
    reset() {
        this.velocity = 0;
        this.pageSelected = false
        this.elements = [new Button(5, 5, 200, 40, "Return To Mailbox", function () { screenOn = "title" })]
        this.leftX = 400;
        this.buffer = createGraphics(800, 800);
        this.buffer.textFont(Assets.fonts.handwriting)
        this.buffer.textAlign(CENTER)
        this.buffer.textSize(45)
        this.buffer.noStroke()
        this.buffer.rect(0, 0, 800, 800)
        this.buffer.strokeWeight(10)
        this.buffer.strokeCap(ROUND);
        this.buffer.stroke(220)

        let lastX = 400;
        for (let i = 50; i < 750; i += 50) {
            let newX = random(390, 410)
            this.buffer.line(lastX, i, newX, i + 50);
            lastX = newX;
        }
        this.buffer.stroke(200, 200, 255)
        for (let i = 0; i < this.note.length; i++) {
            this.buffer.line(50, 120 + i * 75, 750, 120 + i * 75)
        }
        this.buffer.noStroke()
        for (let i = 0; i < this.note.length; i++) {
            this.buffer.text(this.note[i], 400, 110 + i * 75)
        }
    }
    mousePressed() {
        let coords = getMousePosition();
        if (abs(this.leftX - coords.x) < 20) {
            this.pageSelected = true;
        }
    }
    mouseReleased() {
        this.pageSelected = false;
        this.velocity = 0
    }
    HandleClick(x, y) {
        super.HandleClick(x, y)
    }
    Draw(x, y) {
        let coords = getMousePosition();
        if (this.pageSelected) {
            this.leftX = constrain(coords.x, 120, 480)
        } else if (deltaTime < 1000) {
            this.leftX = constrain(this.leftX + this.velocity * deltaTime / 1000, 120, 480)

            let targetVelocity = (this.leftX - 300)
            if (abs(targetVelocity) > 178) {
                targetVelocity *= -0.2
            } else if (abs(targetVelocity) > 101) {
                targetVelocity /= abs(targetVelocity) - 100
            }

            this.velocity = lerp(this.velocity, targetVelocity, min(deltaTime / 1000, 1))

        }
        push()
        //draw background images & right note outline
        fill(255, 192, 203)
        rect(0, 0, 600, 400)
        fill(100)
        image(this.buffer, 300, 20, 180, 360, 400, 0, 400, 800)
        strokeWeight(5)
        stroke(0)
        line(300, 20, 480, 20)
        line(480, 20, 480, 380)
        line(300, 380, 480, 380)
        //Draw note

        noStroke()
        push()//offwhite 
        if (this.leftX < 300) {
            image(this.buffer, this.leftX, 20, 300 - this.leftX, 360, 0, 0, 400, 800)
        }
        let theta = acos((this.leftX - 300) / 180)


        //shadow
        for (let i = 0; i < 20; i++) {
            if (sin(theta) * 180 - i * 3 < 0) {
                break
            }
            fill(100, 100, 100, (20 - i) );
            rect(this.leftX, 20 + i * 1.5, sin(theta) * 180 - i * 3, 360 - i * 3)
        }

        if (this.leftX >= 300) {
            fill(240, 240, 255)
            rect(300, 20, this.leftX - 300, 360)
        }
        pop()

        stroke(0)
        line(300, 20, this.leftX, 20)
        line(this.leftX, 20, this.leftX, 380)
        line(300, 380, this.leftX, 380)
        //image (this.buffer,0,0,400,400)
        pop()

        super.Draw(x, y)
    }
}