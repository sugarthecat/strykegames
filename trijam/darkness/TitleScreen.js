class TitleScreen extends GUI {
    constructor() {
        super();
        this.elements = [new Button(200, 200, 200, 50, "Story.", function () { screenOn = "game"; game.NewGame() }),
        new Button(200, 275, 200, 50, "Settings.", function () {  screenOn = "settings" }),
        new GUIText(100, 20, 400, 100, "Good-Natured.")]
    }
    Draw(x, y) {
        fill(255)
        rect(0, 0, 600, 400)
        super.Draw(x, y);
    }
}