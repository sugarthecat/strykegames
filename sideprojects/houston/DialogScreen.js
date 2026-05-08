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
        text(this.message, 125, 125, 350, 150)
        textSize(16)
        if (this.author.length > 0) {
            text(`- ${this.author}`, 200, 275)
        }
        super.Draw(x, y)
        pop()
    }
}