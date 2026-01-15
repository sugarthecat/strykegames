class Button {
    constructor(x, y, w, h, text, action) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.text = text;
        this.action = action;
    }
    HandleClick(x, y) {
        if (x >= this.x && y > this.y && y <= this.y + this.h && x <= this.x + this.w) {
            this.action();
        }
    }
    //mouseX and Y
    Draw(x, y) {
        push()
        noStroke()
        textSize(this.h - 10)
        textSize(min(textSize(), textSize() * this.w / textWidth(this.text)))
        fill(0)
        rect(this.x - 2, this.y - 2, this.w + 4, this.h + 4, 4)
        fill(150)
        if (x >= this.x && y > this.y && y <= this.y + this.h && x <= this.x + this.w) {
            fill(200)
        }
        rect(this.x, this.y, this.w, this.h, 4)
        fill(0)
        textAlign(CENTER)
        let top = this.y + textAscent();
        let bottom = this.y + this.h - textDescent()
        text(this.text, this.x + this.w / 2, (top + bottom) / 2)
        pop()
    }
}