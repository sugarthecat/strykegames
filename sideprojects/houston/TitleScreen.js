class TitleScreen extends GUI {
    constructor() {
        super();
        this.elements = [new Button(150, 300, 300, 50, "Play", function () {
            screenOn = "dialog";
            screens.dialog.Load("Welcome!\n"
                + "You've done so much throughout five years in the society, fixing every single problem we've ran into.\n"
                + "Even though you've done so much, we still have some problems for you to fix. \nHouston, we have a problem!  ", "Sherman")
        })]
    }
    Draw(x, y) {
        push()
        textFont("monospace")
        drawStripes("sherman")
        const line1 = "Houston,"
        const line1spacing = 0.15
        const line2 = "We have a problem!"
        const line2spacing = 0.04
        textSize(75)
        fill(255)
        stroke(0)
        push()
        translate(300, 400)
        rotate(-line1spacing / 2 * line1.length)
        for (let i = 0; i < line1.length; i++) {
            text(line1.charAt(i), 0, -325)
            rotate(line1spacing)
        }
        pop()
        push()
        textSize(20)
        translate(300, -100)
        rotate(line2spacing / 2 * line2.length)
        for (let i = 0; i < line2.length; i++) {
            text(line2.charAt(i), 0, 350)
            rotate(-line2spacing)
        }
        pop()
        pop()
        super.Draw(x, y)
    }
}