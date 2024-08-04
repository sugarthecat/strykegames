class FailScreen extends GUI {
    constructor() {
        super();
        this.elements = [
            new GUIText(50, 290, 500, 50, "Mission Failed."),
            new Button(200, 350, 200, 50, "Return", function () { screenOn = "title"; })]
        this.backgroundColor = color(100)
    }
    DrawBackground() {
        super.DrawBackground();
        fill(150)
        stroke(0)
        strokeWeight(5)
        image (Assets.title,0,0,600,400)
        this.elements[0].text = "You survived " + floor(time_survived) + " seconds"
    }
}