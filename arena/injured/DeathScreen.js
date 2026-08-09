class DeathScreen extends GUI {
    constructor() {
        super();
        this.elements = [
            new Button(200, 335, 200, 50, "Once More", function () {
                screens.game.ReloadLevel()
                screenOn = "game";
            })
        ];
        this.time = 0;
    }
    Draw(x, y) {
        image(Assets.gui.deathBackground, 0, 0, 600, 400)
        image(Assets.gui.deathCard, 0, 20 + cos (this.time/ 4) * 20, 600, 400)
        this.time += deltaTime / 1000
        super.Draw(x, y)
    }
}
