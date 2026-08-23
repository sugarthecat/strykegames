

class ClickableCity {
    constructor(x, y, name) {
        this.x = x;
        this.y = y;
        this.name = name;
        this.timeSinceClicked = 0;
        this.clicked = false;
    }
    isHovering(x, y) {
        return (dist(this.x, this.y, x, y) < 10) && !this.clicked;
    }
    Draw(x, y) {
        fill(255)
        if (this.clicked) {
            this.timeSinceClicked += deltaTime / 1000
        }
        const fadeprog = min(1, this.timeSinceClicked)
        drawCityBubble(this.x, this.y,
            this.name.substring(0, floor(this.name.length * fadeprog)), 10 + fadeprog * 5,
            lerpColor(STD_COLORS.CITY_UNCLICKED, STD_COLORS.CITY, fadeprog)
        )
    }
    isFinished() {
        return this.timeSinceClicked > 1.2;
    }
    HandleClick(x, y) {
        this.clicked = true
    }
}



function drawCityBubble(x, y, cityName, diameter = 15, color = STD_COLORS.CITY) {
    noStroke()
    for (let i = 1; i < 6; i++) {
        fill(color)
        const prog = (i + (millis() / 1000 % 1)) / 5
        const diam = diameter * 2 * prog
        fill(red(color), green(color), blue(color), 300 - prog * 255)
        circle(x, y, diam)
    }
    textAlign(RIGHT)
    push()
    fill(color)
    translate(x, y)
    textSize(12)
    rotate(0.35)
    textFont(Assets.fonts.quantico)
    text(cityName, -10, 0)
    pop()
}