class GUIText {
    constructor(x, y, w, h, text) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.text = text;
    }
    HandleClick(x, y) {
    }
    //mouseX and Y
    Draw(x, y) {
        textFont(Assets.font)
        noStroke()
        textSize(this.h - 10)
        textSize(min(textSize(),textSize()*this.w/textWidth(this.text)))
        fill(255)
        if (x >= this.x && y > this.y && y <= this.y + this.h && x <= this.x + this.w) {
            fill(200)
        }
        fill(0)
        textAlign(CENTER)
        text(this.text, this.x + this.w / 2, this.y + this.h - 5)
    }
}