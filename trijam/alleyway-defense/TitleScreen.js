class TitleScreen extends GUI {
    constructor() {
        super();
        this.elements = [
            new Button(200, 325, 200, 50, "Play", function () { screens['game'].Reset(); screenOn = "game"})
        ]
        this.backgroundColor = color(150)
    }
    DrawBackground() {
        super.DrawBackground();
        fill (220)
        stroke(0)
        strokeWeight(5)
        image ( Assets.title,0,0,600,400)
    }
}