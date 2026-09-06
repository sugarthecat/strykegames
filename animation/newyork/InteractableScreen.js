// It's the railway's rest,
// between college towns.
// It's the place that I left,
// the same place that I found.

// It's tiny apartments,
// trash in the streets.
// It's subway compartments,
// broiling in the heat.

// It's loud live music,
// you see in the papers.
// It's lovers colliding,
// and loving your neighbors.

// It's not about the clout,
// nor the swagger I lack.
// It's where I was born,
// I'll find my way back.

const lines = [
    "It's the railway's rest,",
    "between college towns.",
    "It's the place that I left,",
    "the same place that I found.",
    "It's tiny apartments,",
    "trash in the streets.",
    "It's subway compartments,",
    "broiling in the heat.",
    "It's loud live music,",
    "you see in the papers.",
    "It's lovers colliding,",
    "and loving your neighbors",
    "It's not about the clout,",
    "nor the swagger I lack.",
    "It's where I was born,",
    "I'll find my way back."
]
class InteractableScreen extends GUI {
    constructor(line) {
        super();
        this.line = line;
        this.elements = []
        if (line == 1) {
            this.elements = [
                new ClickableCity(417, 91, "Boston"),
                new ClickableCity(352, 206, "Blacksburg"),
            ]
        }
        if (line == 2) {
            this.elements = [
                new ClickableCity(402, 122, "New York"),
            ]
        }
        if (line == 3) {
            this.elements = [
                new BuildableBuilding(50, 75, 250),
                new BuildableBuilding(125, 100, 200),
                new BuildableBuilding(225, 80, 225),
                new BuildableBuilding(305, 75, 150),
                new BuildableBuilding(380, 90, 180),
                new BuildableBuilding(470, 80, 240)
            ]
        }
    }
    Draw(x, y) {
        push()
        textFont(Assets.fonts.quantico)
        drawScreenBase(this.line)
        textSize(16)
        textAlign(CENTER)
        fill(255)
        text(lines[this.line], 300, 30)
        super.Draw(x, y)
        pop()
        if (this.Finished() && this.elements.length > 0) {
            this.Advance()
        }
    }
    HandleClick(x, y) {
        if (this.Finished()) {
            this.Advance()
        }
        console.log(`[${Math.floor(x)}, ${Math.floor(y)}]`)
        super.HandleClick(x, y)
    }
    Finished() {
        for (let i = 0; i < this.elements.length; i++) {
            if (!this.elements[i].isFinished()) {
                return false
            }
        }
        return true
    }
    Advance() {
        if (this.line + 1 < lines.length) {
            screenOn = "animation"
            screens.animation = new AnimationScreen(this.line + 1)
        }
    }
}

function drawScreenBase(level) {
    push()
    if (level == 0) {
        translate(50, 0)
        stroke(STD_COLORS.COASTLINE)
        strokeWeight(3)
        const points = [[355, 49.5], [359.6, 11.9], [369.7, 7.7], [389.5, 36.2], [366.2, 82.3], [371.5, 94.2], [379, 94.2], [373, 100.9],
        [368, 107], [354, 121], [365, 119], [354, 128], [348, 128], [346, 134], [351, 135], [348, 155], [341, 150], [348, 166], [344, 185],
        [337, 166], [333, 160], [335, 167], [343, 195], [350, 215], [310, 286], [308, 310], [329, 358], [328, 391], [321, 390], [299, 360],
        [297, 340], [281, 326], [273, 334], [249, 327]]
        for (let i = 0; i + 1 < points.length; i++) {
            line(points[i][0], points[i][1], points[i + 1][0], points[i + 1][1])
        }

    }
    if (level == 1) {
        drawScreenBase(0)
        //image(Assets.eastcoast, 200, 0, 200, 400)
        strokeWeight(4)
        stroke(STD_COLORS.RAILROAD)
        line(417, 91, 402, 122)
        line(402, 122, 392, 144)
        line(392, 144, 376, 166)
        line(376, 166, 352, 206)
    }
    if (level == 2) {
        drawScreenBase(1)
        drawCityBubble(417, 91, "Boston")
        drawCityBubble(352, 206, "Blacksburg")
        //drawCityBubble(402, 122, "New York")
    }
    if (level >= 3) {
        background(STD_COLORS.SKY)
        fill(STD_COLORS.PAVEMENT)
        rect(-(VIEWPORT_DIMENSIONS.x - 600) / 2, 275, VIEWPORT_DIMENSIONS.x, VIEWPORT_DIMENSIONS.y)
    }
    if (level >= 4) {

        drawBuilding(50, 75, 250)
        drawBuilding(125, 100, 200)
        drawBuilding(225, 80, 225)
        drawBuilding(305, 75, 150)
        drawBuilding(380, 90, 180)
        drawBuilding(470, 80, 240)
        let minX = -(VIEWPORT_DIMENSIONS.x - 600) / 2
        let currMinX = 50
        while (currMinX > minX) {
            const buildingWidth = 100 + 20 * sin((currMinX * currMinX + 4))
            const buildingHeight = cos(currMinX * currMinX + 3) * 20 + 150
            drawBuilding(currMinX - buildingWidth, buildingWidth, buildingHeight)
            currMinX -= buildingWidth
        }
        let maxX = (VIEWPORT_DIMENSIONS.x + 600) / 2
        let currMaxX = 550
        while (currMaxX < maxX) {
            const buildingWidth = 100 + 20 * sin((currMaxX * currMaxX + 4))
            const buildingHeight = cos(currMaxX * currMaxX + 3) * 40 + 175
            drawBuilding(currMaxX, buildingWidth, buildingHeight)
            currMaxX += buildingWidth
        }
    }
    if (level >= 6) {

        let minX = -(VIEWPORT_DIMENSIONS.x - 600) / 2
        fill(120)
        rect(minX, 300, VIEWPORT_DIMENSIONS.x, 100)
        fill(60)
        rect(minX, 310, VIEWPORT_DIMENSIONS.x, 100)
        fill(20)
        rect(minX, 325, VIEWPORT_DIMENSIONS.x, 100)
    }
    pop()
}