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
        noStroke()
        textAlign(CENTER)
        textSize(this.h - 20)
        textSize(min(textSize(),textSize()*(this.w-10)/textWidth(this.text)))
        fill(0)
        text(this.text, this.x + this.w/2, this.y + this.h - 5)
    }
}