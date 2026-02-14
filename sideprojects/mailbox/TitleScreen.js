class TitleScreen extends GUI {
    constructor() {
        super();

    }
    reset(){
        this.elements = [
            new Button(50, 180, 200, 40, "A Message Never Sent", function () {
                screenOn = "unwritten";
                screens.unwritten.reset();
            }), 
            new Button(350, 180, 200, 40, "A Handwritten Note", function () {
                screenOn = "handwriting";
                screens.handwriting.reset();
            }),
            new Button(50, 250, 200, 40, "A Letter", function () {
                screenOn = "letter";
                screens.letter.reset();
            }),
            new Button(350, 250, 200, 40, "A Boyfriend Simulator", function () {
                screenOn = "simulator";
                screens.letter.reset();
            }), 
            //new Button(50, 320, 200, 40, "A Stupid Game", function () {
            //    screenOn = "assasingame";
            //    screens.letter.reset();
            //}), 
            new Button(50, 320, 200, 40, "A Memoir", function () {
                screenOn = "memoir";
                screens.letter.reset();
            }), 
            new Button(350, 320, 200, 40, "Letter (Part 2)", function () {
                screenOn = "assasingame";
                screens.letter.reset();
            })
        ]
        this.updateButtons();
    }
    updateButtons() {

        let now = new Date("December 27, 2025 13:00:00");
        const releaseTimes = [new Date("February 14, 2025 00:00:00"),
        new Date("February 14, 2025 08:00:00"),
        new Date("February 14, 2025 16:00:00"),
        new Date("December 24, 2025 12:00:00"),
        //new Date("December 26, 2025 18:00:00"),
        new Date("December 26, 2025 18:00:00"),
        new Date("February 14, 2025 12:00:00")
        ]
        for (let i = 0; i < min(releaseTimes.length, this.elements.length); i++) {
            this.elements[i].visible = now > releaseTimes[i]
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
        text("The Mailbox.", 300, 125)
        pop()
        super.Draw(x, y)
    }
}