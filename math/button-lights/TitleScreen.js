class TitleScreen extends GUI {
    constructor() {
        super();
        this.elements = [
            new GUIText(50, 62, 500, 100, "Buttons & Lights"),
            new Button(200, 235, 200, 50, "Level Select", function () { screenOn = "levelSelect" }),
            new Button(200, 315, 200, 50, "How To Play", function () { screenOn = "instructions" })
        ]
        this.backgroundColor = color(100)
    }
    DrawBackground() {
        super.DrawBackground();
        DrawTitleGrid()
        fill(200)
        stroke(0)
        strokeWeight(5)
        rect(50, 85, 500, 75)
    }
}
function DrawTitleGrid() {
    for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 10; j++) {
            let x = i * 40 + 20
            let y = j * 40 + 20
            let buttonColor = color(255, 0, 0)

            let cycleFrame = (millis() / 10) % 1200
            //frame cycles:
            //0-300 (up down snake)
            //300-600 (left right snake)
            //600-900 (prime shenanigans)

            if (cycleFrame < 300) {
                if (i * 10 + j < cycleFrame / 2) {
                    buttonColor = color(0, 255, 0)
                }
            } else if (cycleFrame < 600) {
                cycleFrame -= 300
                if (j * 15 + i > cycleFrame / 2) {
                    buttonColor = color(0, 255, 0)
                }
            } else if (cycleFrame < 900) {
                cycleFrame -= 600
                if ((j * 15 + i) * 19 % 31 + j + i < cycleFrame / 300 * 65) {
                    buttonColor = color(0, 255, 0)
                }
            } else if (cycleFrame < 1200) {
                cycleFrame -= 900
                let x = 15 - i
                let line = i + j
                let offset = (line - 9) * (line - 10) / 2
                if (line < 10) {
                    offset = 0
                }
                if (line * (line - 1) / 2 - j - offset > cycleFrame / 2) {
                    buttonColor = color(0, 255, 0)
                }
            }
            push()
            fill(red(buttonColor) * 0.6, green(buttonColor) * 0.6, blue(buttonColor) * 0.6)
            circle(x, y, 24)
            fill(red(buttonColor) * 0.8, green(buttonColor) * 0.8, blue(buttonColor) * 0.8)
            circle(x, y, 16)
            fill(buttonColor)
            circle(x, y, 12)
            image(Assets.indicatorCover, x - 12, y - 12, 24, 24)
        }
    }
}