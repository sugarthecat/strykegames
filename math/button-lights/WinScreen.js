class WinScreen extends GUI {
    constructor() {
        super();
        this.elements = [
            new GUIText(50, 50, 500, 100, "Solved!"),
        ]
        this.backgroundColor = color(100)
    }
    reset() {
        this.time = 0;
        if (this.elements.length == 2) {
            this.elements.pop();
        }
    }
    DrawBackground() {
        super.DrawBackground();
        DrawTitleGrid()
        fill(200)
        stroke(0)
        strokeWeight(5)
        rect(50, 60, 500, 90)
        this.time += deltaTime / 1000
        if (this.time > 1 && this.elements.length == 1) {
            this.elements.push(
                new Button(200, 275, 200, 50, "Return", function () { 
                    screenOn = "levelSelect";})
            )
        }
    }
}