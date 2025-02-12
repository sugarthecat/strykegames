class TitleScreen extends GUI {
    constructor() {
        super();

        this.elements = []
        this.updateButtons();
    }
    updateButtons(){
        
        this.elements = []
        let now = new Date();
        let buttonOneRelease = new Date("February 14, 2025 00:00:00");
        let buttonTwoRelease = new Date("February 14, 2025 08:00:00");
        let buttonThreeRelease = new Date("February 14, 2025 16:00:00");
        if (now > buttonOneRelease) {
            this.elements.push(new Button(100, 180, 400, 40, "A Message Never Sent,", function () {
                screenOn = "unwritten";
                screens.unwritten.reset();
            }))
        }
        if (now > buttonTwoRelease) {
            this.elements.push(new Button(100, 250, 400, 40, "A Handwritten Note", function () {
                screenOn = "handwriting";
                screens.handwriting.reset();
            }))
        }
        if (now > buttonThreeRelease) {
            this.elements.push(new Button(100, 320, 400, 40, "and A Letter", function () {
                screenOn = "letter";
                screens.letter.reset();
            }))
        }
    }
    Draw(x, y) {
        push()
        noStroke();
        fill(255)
        rect(0, 0, 600, 400)
        textAlign(CENTER)
        fill(0)
        textSize(75)
        text("The Mailbox.", 300, 150)
        pop()
        super.Draw(x, y)
    }
}