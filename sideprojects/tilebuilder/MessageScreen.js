class MessageScreen extends GUI {
    constructor() {
        super();
        this.elements = [new Button(350, 250, 150, 50, "Continue", () => {
            screenOn = "levelSelect";
        })]
        this.message = ""
        this.author = ""
    }
    Load(level){
        this.message = level.completionMessage;
        this.author = level.author;
    }
    Draw(x, y) {
        background(255)
        super.Draw(x, y)
    }
}