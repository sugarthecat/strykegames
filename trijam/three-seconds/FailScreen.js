class FailScreen extends GUI {
    constructor() {
        super();
        this.elements = [
            new GUIText(50, 50, 500, 100, "Mission Failed."),
            new Button(200, 300, 200, 50, "Return", function () { screenOn = "levelSelect"})]
        this.backgroundColor = color(200, 150, 0)
    }
    DrawBackground() {
        super.DrawBackground();
        push ()
        translate ( 300,200)
        rotate ( frameCount * 0.01)
        image ( Assets.nuclearSymbol,-250,-250,500,500)
        pop ()
        fill (250, 200, 0)
        stroke(0)
        strokeWeight(5)
        rect ( 50, 60, 500, 90)
    }
}