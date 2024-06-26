class Button {
    constructor(x, y, w, h, text, action) {
        this.x = x;
        this.y = y;
        this.offsetx = x;
        this.offsety = y;
        this.w = w;
        this.h = h;
        this.text = text;
        this.action = action;
    }
    HandleClick(x, y) {
        if (x >= this.x && y > this.y && y <= this.y + this.h && x <= this.x + this.w) {
            this.action();
            return true;
        }
    }
    //mouseX and Y
    Draw(x, y) {
        this.x = width - this.w - this.offsetx;
        this.y = height - this.h - this.offsety;
        textSize(this.h * 3 / 4)
        textSize(min(textSize(), textSize() * (this.w - 20) / textWidth(this.text)))
        fill(255)
        if (x >= this.x && y > this.y && y <= this.y + this.h && x <= this.x + this.w) {
            fill(200)
        }
        stroke(0)
        strokeWeight(3)
        rect(this.x, this.y, this.w, this.h, 10)
        noStroke()
        fill(0)
        textAlign(CENTER)
        text(this.text, this.x + this.w / 2, this.y + this.h * 7 / 10)
    }
}