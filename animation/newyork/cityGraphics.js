class BuildableBuilding {
    constructor(x, width, height) {
        this.x = x;
        this.width = width;
        this.height = height;
        this.clicked = false;
        this.timeSinceClicked = 0;
        this.timeSinceExisted = 0;
        //ground level = 275
        this.color = getBuildingColor(x)
        this.y = 275 - height;
    }

    isHovering(x, y) {
        let midpoint = this.x + this.width / 2;

        return dist(midpoint, 250, x, y) < 25 && !this.clicked
    }
    Draw(x, y) {
        this.timeSinceExisted += deltaTime / 1000
        if (this.clicked) {
            this.timeSinceClicked += deltaTime / 1000
        }
        fill(255)
        fill(STD_COLORS.SCAFFOLDING_COLOR)
        const mid = this.x + this.width / 2;

        const signprog1 = min(1, this.timeSinceExisted)
        rect(mid - 5, 275 - 50 * signprog1, 10, 50 * signprog1)
        const signprog2 = constrain(this.timeSinceExisted - 1, 0, 1)
        rect(mid - 25 * signprog2, 225, 50 * signprog2, 30)


        if (this.timeSinceClicked > 0) {
            drawBuilding(this.x, this.width, this.height, this.color, min(this.timeSinceClicked / 5, 1))
        }
    }
    isFinished() {
        return this.timeSinceClicked > 5
    }
    HandleClick(x, y) {
        this.clicked = true
    }
}

function getBuildingColor(x) {
    const lerpVal = 0.5 + sin(x)
    return lerpColor(color(132, 32, 32), color(221, 125, 125), lerpVal)
}

function drawBuilding(x, width, height, color = getBuildingColor(x), progress = 1) {
    push()
    fill(getBuildingColor(x * x))
    rect(x, 275 - height * min(2 * progress, 1), width, height * min(2 * progress, 1))
    const floorCount = floor(height / 50)
    const floorHeight = height / floorCount
    const windowCount = floor(width / 25)
    const windowWidth = width / windowCount * 0.9
    fill(0)
    push()
    const buildingTopY = 275 - height * min(2 * progress, 1);
    translate(width * 0.05, 0)
    const leg2Progress = min(1, (progress - 0.5) * 2)
    for (let i = 0; i < floorCount; i++) {
        for (let j = 0; j < windowCount; j++) {
            push()
            translate(x + windowWidth * j, 0)
            const windowBottomY = 275 - floorHeight * (1 + i) + floorHeight * (0.18 + 0.64)
            const windowTopY = 275 - floorHeight * (1 + i) + floorHeight * (0.18)
            const extraSpace = windowBottomY - buildingTopY
            fill(50)
            if (extraSpace > 0) {

                rect(windowWidth * 0.08, max(windowBottomY - extraSpace, windowTopY), windowWidth * 0.84, min(extraSpace, floorHeight * 0.64))
            }

            translate(0, windowTopY - floorHeight * 0.18)
            fill(8, 109, 156)
            if (leg2Progress > 0) {
                rect(windowWidth * 0.12, floorHeight * 0.22, windowWidth * 0.76 * leg2Progress, floorHeight * 0.56)
            }

            fill(50)
            if (progress > 0.5) {
                rect(windowWidth * 0.08, floorHeight * 0.48, windowWidth * 0.84, floorHeight * 0.04)
                rect(windowWidth * 0.06, floorHeight * 0.78, windowWidth * 0.88, floorHeight * 0.05)
            }
            pop()
        }
    }
    pop()
    pop()
}