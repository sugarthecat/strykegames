class LevelUpGUI extends GUI {
    constructor() {
        super();
        this.elements = [new Button(200, 325, 200, 50, "Elevate.", function () { screenOn = "game"; game.NewLevel(); }),
        new GUIText(200, 50, 200, 100, "I wasn't worthy.")]
    }
    Draw(x, y) {
        let romanNumeral = [
            "0","I","II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV"
        ]
        this.elements[1].text = "Stage " + romanNumeral[game.levelOn] + " completed.";
        Assets.playHeaven();
        fill(255)
        rect(0, 0, 600, 400)
        super.Draw(x, y);
    }
}