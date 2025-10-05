class Button {
    constructor(x, y, w, h, text, action, active = true) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.text = text;
        this.action = action;
        this.active = active;
    }
    HandleClick(x, y) {
        if (this.active && x >= this.x && y > this.y && y <= this.y + this.h && x <= this.x + this.w) {
            this.action();
        }
    }
    //mouseX and Y
    Draw(x, y) {
        textSize(this.h * 3 / 4)
        textSize(min(textSize(), textSize() * (this.w - 20) / textWidth(this.text)))
        fill(255)
        if (!this.active) {
            fill(180)
        } else if (x >= this.x && y > this.y && y <= this.y + this.h && x <= this.x + this.w) {
            fill(180)
        }
        stroke(0)
        if (!this.active) {
            stroke(100)
        }
        strokeWeight(3)
        rect(this.x, this.y, this.w, this.h, 10)
        noStroke()
        if (!this.active) {
            fill(100)
        } else {
            fill(0)
        }
        textAlign(CENTER)
        text(this.text, this.x + this.w / 2, this.y + this.h / 2 + textAscent(this.text) / 2)
    }
}