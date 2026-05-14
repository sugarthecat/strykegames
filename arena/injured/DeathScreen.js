class DeathScreen extends GUI {
    constructor() {
        super();
        this.elements = [
            new GUIText(100, 100, 400, 60, "You Died"),
            new Button(100, 200, 400, 50, "Retry", function () {
                screens.game = new GameScreen();
                screenOn = "game";
            })
        ];
    }
}
