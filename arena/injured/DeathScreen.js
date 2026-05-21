class DeathScreen extends GUI {
    constructor() {
        super();
        this.elements = [
            new GUIText(100, 100, 400, 60, "You Died"),
            new Button(200, 300, 200, 50, "Retry", function () {
                screens.game = new GameScreen();
                screenOn = "game";
            })
        ];
    }
    Draw(x, y) {
        super.Draw(x, y)
    }
}
