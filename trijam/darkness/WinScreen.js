class WinScreen extends GUI {
    constructor() {
        super();
        this.elements = [new Button(200, 325, 200, 50, "Return.", function () { screenOn = "title"; }),
        new GUIText(200, 50, 200, 100, "I succeeded."),
        new GUIText(200, 200, 200, 100, "I proved myself.")]
    }
    Draw(x, y) {
        Assets.playHeaven();
        fill(255)
        rect(0, 0, 600, 400)
        super.Draw(x, y);
    }
}