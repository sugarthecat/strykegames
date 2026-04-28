class DialogScreen extends GUI {
    constructor() {
        super();
        this.elements = [new Button(250, 320, 100, 36, "Continue", () => {
            screenOn = "levelSelect";
        })]
        this.message = ""
        this.author = ""
        this.time = 0;
    }
    Load(message, author) {
        this.message = message;
        this.author = author;
        this.bgcolor = color(0)
        this.stripecolor = color(255)
        switch(author.toLowerCase()){
            case "sherman":
                this.bgcolor = color (0,0,200)
                this.stripecolor = color(50,50,250)
        }
    }
    Draw(x, y) {
        this.time += deltaTime / 1000
        background(this.bgcolor)
        stroke(this.stripecolor)
        strokeWeight(20)
        const timeOffset = (this.time * 30) % 60
        for (let i = 0; i < 20; i++) {
            line(i * 60 - timeOffset, 0, i * 60 - 100 - timeOffset, 400)
        }
        noStroke()
        fill(255)
        rect(100, 100, 400, 200, 50)
        fill(0)
        textAlign(LEFT)
        textSize(20)
        text(this.message, 150, 150, 300, 100)
        textSize(16)
        if (this.author.length > 0) {
            text(`- ${this.author}`, 200, 275)
        }
        super.Draw(x, y)
    }
}