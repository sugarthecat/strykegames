
const completedLevels = []

class LevelSelectScreen extends GUI {
    constructor() {
        super();
        const ref = this;
        this.elements = [new Button(350, 300, 150, 50, "Play", () => {
            screenOn = "level";
            screens.level.Load(ref.selectedLevel);

        })]
        this.selectedLevel = null
    }
    Draw(x, y) {
        background(255)
        if (this.selectedLevel) {
            drawStripes(this.selectedLevel.author)
            fill(255)
            rect(0, 0, 250, 400)
        }
        noStroke()
        fill(0)
        textAlign(LEFT)
        for (let i = 0; i < Math.min(levels.length, 5); i++) {
            fill(255)
            if (this.selectedLevel == levels[i]) {
                fill(200, 200, 225)
            }
            if (0 < x && x < 250 && y > i * 80 && y < i * 80 + 80) {
                fill(175)
            }
            rect(0, 80 * i, 250, 80)
            fill(0)
            textSize(16)
            text(levels[i].title, 10, 30 + i * 80)
            textSize(12)
            text(`By ${levels[i].author}`, 20, 55 + i * 80)
        }
        push()
        stroke(0)
        strokeWeight(12)
        line(250, 0, 250, 600)
        if (levels.length > 0) {
            line(0, 0, 250, 0)
        }
        for (let i = 0; i < Math.min(levels.length, 5); i++) {
            line(0, i * 80 + 80, 250, i * 80 + 80)
        }
        pop()
        this.elements[0].hidden = (this.selectedLevel == null)
        if (this.selectedLevel) {
            fill(255)
            let topcardWidth = 0
            textSize(22)
            topcardWidth = max(textWidth(this.selectedLevel.title), topcardWidth)
            textSize(18)
            topcardWidth = max(textWidth("By " + this.selectedLevel.author), topcardWidth)
            topcardWidth *= 1.2
            rect(425 - topcardWidth / 2, 20, topcardWidth, 80, 20)
            rect(275, 125, 300, 150, 25)
            fill(0)
            //bounds: 0<y<400
            // 250<x<600, midx = 850/2 = 425
            textSize(22)
            textAlign(CENTER)
            text(this.selectedLevel.title, 425, 50)
            textSize(18)
            textAlign(CENTER)
            text(`By ${this.selectedLevel.author}`, 425, 80)
            textSize(12)
            textAlign(LEFT)
            text(this.selectedLevel.description, 300, 150, 250, 100)
        }
        super.Draw(x, y)
    }
    HandleClick(x, y) {

        for (let i = 0; i < Math.min(levels.length, 5); i++) {
            if (0 < x && x < 250 && y > i * 80 && y < i * 80 + 80) {
                this.selectedLevel = levels[i]
            }
        }
        super.HandleClick(x, y)
    }
}