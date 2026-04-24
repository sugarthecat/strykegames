class MessageScreen extends GUI {
    constructor() {
        super();
        this.elements = [new Button(250, 320, 100, 36, "Continue", () => {
            screenOn = "levelSelect";
        })]
        this.message = ""
        this.author = ""
        this.time = 0;
    }
    Load(level) {
        this.message = level.completionMessage;
        this.author = level.author;
        this.time = 0
    }
    Draw(x, y) {
        background(255)
        fill(0)
        textAlign(LEFT)
        textSize(20)
        text(this.message, 100, 150, 400, 100)
        textSize(16)
        text(`- ${this.author}`, 200, 275)
        super.Draw(x, y)
    }
}