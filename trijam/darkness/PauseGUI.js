class PauseGUI extends GUI {
    constructor() {
        super();
        this.elements = [new Button(200, 325, 200, 50, "Return.", function () { paused = false }),
        new GUIText(200, 50, 200, 100, "Paused")]
    }
    Draw(x, y) {
        //Assets.playHeaven();
        fill(255)
        rect(0, 0, 600, 400)
        super.Draw(x, y);
    }
}