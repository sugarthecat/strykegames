class Button {
    constructor(x, y, w, h, text, action, color) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.text = text;
        this.action = action;
        this.color = '#BAD6B0'||color;
    }
    HandleClick(x, y) {
        if (x >= this.x && y > this.y && y <= this.y + this.h && x <= this.x + this.w) {
            this.action();
        }
    }
    //mouseX and Y
    Draw(x, y) {
        push ()
        textFont("Courier New")
        textSize(this.h - 10)
        textSize(min(this.h - 10,(this.h - 10)*.9*this.w/textWidth(this.text)))
        fill(this.color)
        if (x >= this.x && y > this.y && y <= this.y + this.h && x <= this.x + this.w) {
            fill(200)
        }
        stroke(0)
        strokeWeight(4)
        rect(this.x, this.y, this.w, this.h,5)
        noStroke()
        fill(0)
        textAlign(CENTER)
        text(this.text, this.x + this.w / 2, this.y + this.h *.75)
        pop ()
    }
}