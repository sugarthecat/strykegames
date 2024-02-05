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
        fill(0, 0, 0)
        rect(200, 198, 200, 4)
        fill(0, 0, 0)
        rect(200 + 200 * volume, 185, 3, 30)
        if (mouseInRange(200, 180, 200, 40) && mouseIsPressed) {
            let mousepos = getMousePosition();
            volume = (mousepos.x - 200) / 200
            Assets.setVolume(volume)
        }
        super.Draw(x, y);
    }
}