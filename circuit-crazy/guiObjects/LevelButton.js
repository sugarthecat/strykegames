class LevelButton {
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
        noStroke()
        textSize(this.h - 25)
        textSize(min(textSize(), textSize() * this.w / textWidth(this.text)))
        fill(255);


        if (x >= this.x && y > this.y && y <= this.y + this.h && x <= this.x + this.w) {
            fill(200)
        }

        stroke((0, 0, 0));
        strokeWeight(3);
        rect(this.x, this.y, this.w, this.h, 17);
        text(this.text, this.x + this.w / 2, this.y + this.h - 17)
        fill(0)
        textAlign(CENTER)
    }
}