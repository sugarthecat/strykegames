class LoseScreen extends GUI {
    constructor() {
        super();
        this.elements = [new Button(250, 300, 100, 50, "Return", function () { screenOn = "title" }),
        new GUIText(200, -30, 200, 100, "Jail :(")]
    }
    Draw() {
        image(Assets.jail, 0, 0, 600, 400)
        fill(255)
        rect(180, 0, 240, 100,20)
        super.Draw();
    }
}