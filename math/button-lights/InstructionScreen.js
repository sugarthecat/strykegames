class InstructionScreen extends GUI {
    constructor() {
        super();
        this.elements = [
            new Button(250, 335, 100, 30, "Return", function () { screenOn = "title" })
        ]
        this.backgroundColor = color(100)
    }
    DrawBackground() {
        super.DrawBackground();
        DrawTitleGrid()
        push ()
        fill(200)
        stroke(0)
        strokeWeight(5)
        rect(50, 85, 500, 150)
        fill(0)
        textSize(25)
        noStroke()
        textAlign(CENTER)
        text("Instructions:",300,110)
        textAlign(LEFT)
        text("Buttons are the only input.",60,140)
        text("Lights fully represent all information.",60,165)
        text("Bananas are marsupials.",60,190)
        text("There are no instructions.",60,215)
        pop ()
    }
}