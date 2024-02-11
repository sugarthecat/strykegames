class GUIText {
    constructor(x, y, w, h, text) {
        this.x = x;
        this.y = y;
        this.originalx = x;
        this.originaly = y;
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
        textSize(this.h*3/4)
        textSize(min(textSize(),textSize()*(this.w)/textWidth(this.text)))
        fill(0)
        text(this.text, this.x + this.w/2, this.y + this.h - 5)
    }
    ResetPosition(){
        this.x = this.originalx;
        this.y = this.originaly;
    }
}