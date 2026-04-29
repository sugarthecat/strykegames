class DialogScreen extends GUI {
    constructor() {
        super();
        this.elements = [new Button(250, 320, 100, 36, "Continue", () => {
            screenOn = "levelSelect";
        })]
        this.message = ""
        this.author = ""
    }
    Load(message, author) {
        this.message = message;
        this.author = author;
    }
    Draw(x, y) {
        push()
        drawStripes(this.author)
        noStroke()
        fill(255)
        rect(100, 100, 400, 200, 50)
        fill(0)
        textAlign(LEFT)
        textSize(13)
        text(this.message, 125, 150, 350, 100)
        textSize(16)
        if (this.author.length > 0) {
            text(`- ${this.author}`, 200, 275)
        }
        super.Draw(x, y)
        pop()
    }
}

function drawStripes(author) {
    push()
    let bgcolor = color(0)
    let stripecolor = color(255)
    switch (author.toLowerCase()) {
        case "sherman":
            bgcolor = color(0, 0, 200)
            stripecolor = color(50, 50, 250)
    }
    background(bgcolor)
    stroke(stripecolor)
    strokeWeight(20)
    const timeOffset = (millis() / 1000 * 30) % 60
    for (let i = 0; i < 20; i++) {
        line(i * 60 - timeOffset, 0, i * 60 - 100 - timeOffset, 400)
    }
    pop()
}