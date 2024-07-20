class ScoreScreen extends GUI {
    constructor() {
        super();
        this.backgroundColor = color(0)
        this.elements = [
            new Button(200, 330, 200, 40, "Return", function () {
                screenOn = "title";
                //other game init stuff here
            }),
            new GUIText(200, 275, 200, 45, "Score: score")
        ]
    }
    DrawBackground() {
        super.DrawBackground()
        image(Assets.titleScreen, 0, 0, 600, 400)
        fill(200)
        stroke(0)
        strokeWeight(10)
        rect(200, 275, 200, 50)
        this.elements[1].text = "You Survived " + floor(gameTime) + "s"
    }
}