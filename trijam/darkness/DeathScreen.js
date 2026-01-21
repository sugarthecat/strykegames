class DeathScreen extends GUI {
    constructor() {
        super();
        this.elements = [new Button(200, 325, 200, 50, "Return.", function () { screenOn = "game"; game.NewLevel(); }),
        new GUIText(200, 50, 200, 100, "I failed."),
        new GUIText(200, 150, 200, 100, "I wasn't worthy.")]
    }
    Draw(x, y) {
        Assets.playHeaven();
        fill(255)
        rect(0, 0, 600, 400)
        super.Draw(x, y);
    }
    SetText(text){
        this.elements[2].text = text;
    }
}