class GUIButton {
    constructor(x, y, w, h, text, action) {
        this.x = x;
        this.originalx = x;
        this.y = y;
        this.originaly = y;
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
    ResetPosition(){
        this.x = this.originalx;
        this.y = this.originaly;
    }
    //mouseX and Y
    Draw(x, y) {
        textSize(this.h * 3 / 4)
        textSize(min(textSize(), textSize() * (this.w - 10) / textWidth(this.text)))
        fill(255)
        if (x >= this.x && y > this.y && y <= this.y + this.h && x <= this.x + this.w) {
            fill(200)
        }
        stroke(0)
        strokeWeight(2)
        rect(this.x, this.y, this.w, this.h, 10)
        noStroke()
        fill(0)
        textAlign(CENTER)
        text(this.text, this.x + this.w / 2, this.y + this.h * 8 / 10)
    }
}