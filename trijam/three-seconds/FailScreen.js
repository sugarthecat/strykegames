class FailScreen extends GUI {
    constructor() {
        super();
        this.elements = [
            new GUIText(50, 50, 500, 100, "Mission Failed."),
        ]
        this.backgroundColor = color(200, 150, 0)
    }
    reset() {
        this.time = 0;
        if (this.elements.length == 2) {
            this.elements.pop();
        }
    }
    DrawBackground() {
        super.DrawBackground();
        push()
        this.time += deltaTime / 1000;
        translate(300, 200)
        rotate(frameCount * 0.01)
        image(Assets.nuclearSymbol, -250, -250, 500, 500)
        pop()
        fill(250, 200, 0)
        stroke(0)
        strokeWeight(5)
        rect(50, 60, 500, 90)
        if (this.time > 1 && this.elements.length == 1) {
            this.elements.push(
                new Button(200, 300, 200, 50, "Return", function () { 
                    volume *= 2; screenOn = "levelSelect"; Assets.alarm.stop(); Assets.explosion.stop(); })
            )
        }
    }
}