
class TitleScreen extends GUI {
    constructor() {
        super();
        this.elements = [new Button(100, 290, 400, 50, "START", function () { screenOn = "levelselect"; })]
    }
    Draw(x, y) {
        background(214, 207, 180)
        image(Assets.titleBkgd, 0, 0, 600, 400)
        super.Draw(x, y)
    }
}