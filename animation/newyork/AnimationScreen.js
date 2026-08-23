const animationTimes = [
    2, // It's the railway's rest,
    2, // between college towns.
    2, // It's the place that I left,
    4, // the same place that I found.
    2, // It's tiny apartments,
    2, // trash in the streets.
    2, // It's subway compartments,
    2, // broiling in the heat.
    2, // It's loud live music,
    2, // you see in the papers.
    2, // It's lovers colliding,
    2, // and loving your neighbors.
    2, // It's not about the clout,
    1, // nor the swagger I lack.
    1, // It's where I was born,
    1, // I'll find my way back.
    1, // final frame
]

class AnimationScreen extends GUI {
    constructor(line) {
        super();
        this.line = line;
        this.time = 0;
    }
    Draw(x, y) {
        background(0)
        this.time += deltaTime / 1000
        const progress = min(1, this.time / animationTimes[this.line])
        push()
        drawAnimation(this.line, progress)
        pop()

        const poemLine = lines[this.line]
        const wordLen = poemLine.length
        //fade between lines
        if (this.line > 0 && progress < 0.5) {
            const oldLine = lines[this.line - 1]
            const oldLen = oldLine.length
            noStroke()
            textFont(Assets.fonts.quantico)
            textSize(16)
            textAlign(LEFT)
            fill(255)
            text(oldLine.substring(0, floor((1 - progress * 2) * oldLen)), 300 - textWidth(oldLine) / 2, 30)
        } else if (progress > 0.5 && floor((progress * 2 - 1) * wordLen) > 0) {
            noStroke()
            textFont(Assets.fonts.quantico)
            textSize(16)
            textAlign(LEFT)
            fill(255)
            text(poemLine.substring(0, floor((progress * 2 - 1) * wordLen)), 300 - textWidth(poemLine) / 2, 30)
        }
        if (progress == 1) {
            this.Advance()
        }
    }
    Advance() {
        screenOn = "interact"
        screens.interact = new InteractableScreen(this.line)
    }
}


function drawAnimation(upcomingLevel, progress) {
    push()
    if (upcomingLevel == 0) {
        translate(50, 0)
        stroke(STD_COLORS.COASTLINE)
        strokeWeight(0.01 + 3 * progress)
        const points = [[355, 49.5], [359.6, 11.9], [369.7, 7.7], [389.5, 36.2], [366.2, 82.3], [371.5, 94.2], [379, 94.2], [373, 100.9],
        [368, 107], [354, 121], [365, 119], [354, 128], [348, 128], [346, 134], [351, 135], [348, 155], [341, 150], [348, 166], [344, 185],
        [337, 166], [333, 160], [335, 167], [343, 195], [350, 215], [310, 286], [308, 310], [329, 358], [328, 391], [321, 390], [299, 360],
        [297, 340], [281, 326], [273, 334], [249, 327]]
        for (let i = 0; i + 1 < points.length; i++) {
            line(points[i][0], points[i][1], points[i + 1][0], points[i + 1][1])
        }
    }
    if (upcomingLevel == 1) {
        drawScreenBase(0)
        strokeWeight(0.1 + progress * 4)
        stroke(STD_COLORS.RAILROAD)
        line(417, 91, 402, 122)
        line(402, 122, 392, 144)
        line(392, 144, 376, 166)
        line(376, 166, 352, 206)
        drawCityBubble(417, 91, "", 0.1 + progress * 9.9, STD_COLORS.CITY_UNCLICKED)
        drawCityBubble(352, 206, "", 0.1 + progress * 9.9, STD_COLORS.CITY_UNCLICKED)
    }
    if (upcomingLevel == 2) {
        drawScreenBase(2)
        drawCityBubble(402, 122, "", 0.1 + progress * 9.9, STD_COLORS.CITY_UNCLICKED)
    }
    if (upcomingLevel == 3) {
        if (progress < 0.5) {
            strokeWeight(4 * (1 - progress * 2))
            stroke(STD_COLORS.RAILROAD)
            line(417, 91, 402, 122)
            line(402, 122, 392, 144)
            line(392, 144, 376, 166)
            line(376, 166, 352, 206)

            drawCityBubble(417, 91, "Boston".substring(0, floor((1 - progress * 2) * 6)), (1 - progress * 2) * 15)
            drawCityBubble(352, 206, "Blacksburg".substring(0, floor((1 - progress * 2) * 10)), (1 - progress * 2) * 15)
            drawCityBubble(402, 122, "New York".substring(0, floor((1 - progress * 2) * 8)), (1 - progress * 2) * 15)
        }
        else {
            fill(STD_COLORS.SKY)
            const maxDiam = sqrt(VIEWPORT_DIMENSIONS.x ** 2 + VIEWPORT_DIMENSIONS.y ** 2)
            circle(300, 200, maxDiam * 2 * (progress - 0.5))
            fill(STD_COLORS.PAVEMENT)
            const pavementWidth = (progress - 0.5) * VIEWPORT_DIMENSIONS.x * 2
            rect(300 - pavementWidth / 2, 275, pavementWidth, VIEWPORT_DIMENSIONS.y)
        }

    }
    if (upcomingLevel > 3) {
        drawScreenBase(3)
    }
    if (upcomingLevel == 4) {

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
            drawBuilding(currMinX - buildingWidth, buildingWidth, buildingHeight,getBuildingColor(currMinX),progress)
            currMinX -= buildingWidth
        }
        let maxX = (VIEWPORT_DIMENSIONS.x + 600) / 2
        let currMaxX = 550
        while (currMaxX < maxX) {
            const buildingWidth = 100 + 20 * sin((currMaxX * currMaxX + 4))
            const buildingHeight = cos(currMaxX * currMaxX + 3) * 40 + 175
            drawBuilding(currMaxX, buildingWidth, buildingHeight,getBuildingColor(currMaxX),progress)
            currMaxX += buildingWidth
        }
    }
    if (upcomingLevel > 4) {
        drawScreenBase(4)
    }
    pop()
}