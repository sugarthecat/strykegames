class TitleScreen extends GUI {
    constructor() {
        super();
        this.elements = [
            new Button(200, 100, 200, 50, "Swapper", function () { screenOn = "swapper"; }),
            new Button(200, 200, 200, 50, "Spinner", function () { screenOn = "spinner"; })
        ]
    }
    Draw(x, y) {
        push()
        fill(255)
        rect(0, 0, 600, 400)
        fill(0)
        textSize(40)
        textAlign(CENTER)
        text("Mom's Art Puzzles", 300, 50)
        pop()
        super.Draw(x, y);
    }
}