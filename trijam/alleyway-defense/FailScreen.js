class FailScreen extends GUI {
    constructor() {
        super();
        this.elements = [
            new GUIText(50, 50, 500, 100, "Mission Failed."),
            new Button(200, 300, 200, 50, "Return", function () { screenOn = "title"; })]
        this.backgroundColor = color(100)
    }
    DrawBackground() {
        super.DrawBackground();
        fill(150)
        stroke(0)
        strokeWeight(5)
        rect(50, 60, 500, 90)
        this.elements[0].text = "You survived " + floor(time_survived) + " seconds"
    }
}