class GameScreen extends GUI {
    constructor() {
        super();
        let ref = this
        this.elements = [
        ]
        this.backgroundColor = color(100)
        this.buttons = []
        this.indicators = []
    }
    isSolved() {
        let isSolved = true;
        for (let i = 0; i < this.indicators.length; i++) {
            isSolved = isSolved && this.indicators[i].active
        }
        return isSolved;
    }
    Draw(x, y) {
        super.Draw(x, y)
        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].Draw(x, y)
        }
        for (let i = 0; i < this.indicators.length; i++) {
            this.indicators[i].Draw(x, y)
        }
        if (this.isSolved()) {
            push()
            fill(255, 255, 255, 50)
            rect(0, 0, 600, 400)
            stroke(0)
            strokeWeight(5)
            fill(255)
            rect(200, 100, 200, 200)
            noStroke()
            fill(0)
            textSize(30)
            textAlign(CENTER)
            text("Solved!", 300, 150)
            this.elements[0].x = 250
            this.elements[0].y = 200
            this.elements[1].x = 250
            this.elements[1].y = 250
            this.elements[0].Draw(x, y)
            this.elements[1].Draw(x, y)
            highestLevel = max(highestLevel, level + 1)
            pop()
        }
    }
    HandleClick(x, y) {
        super.HandleClick(x, y);
        if (!this.isSolved()) {
            for (let i = 0; i < this.buttons.length; i++) {
                if (this.buttons[i].HandleClick(x, y)) {
                    return;
                }
            }
        }
    }
    NewLevel() {
        let ref = this;
        this.elements = [
            new Button(50, 10, 100, 30, "Levels", function () { screenOn = "levelSelect" }),
            new Button(450, 10, 100, 30, "Reset", function () { ref.NewLevel() })
        ]
        const levelElts = getLevel(level)
        this.indicators = levelElts.indicators
        this.buttons = levelElts.buttons
    }

}
