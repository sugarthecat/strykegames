class Button {
    constructor(x, y, w, h, text, action, active = true, hidden = false) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.text = text;
        this.action = action;
        this.active = active;
        this.hidden = hidden;
    }
    contains(x, y) {
        return x >= this.x && x <= this.x + this.w && y >= this.y && y <= this.y + this.h;
    }
    HandleClick(x, y) {
        if (this.contains(x, y) && this.active && !this.hidden) {
            this.action();
        }
    }
    //mouseX and Y
    Draw(x, y) {
        if(this.hidden){
            return;
        }
        push()
        let size = this.h * 0.8;
        textSize(size);
        let width = textWidth(this.text);
        if (width > 0) {
            textSize(min(size, size * 0.8* this.w / width));
        }
        fill(255)
        if (!this.active) {
            fill(180)
        } else if (this.contains(x,y)) {
            fill(180)
        }
        stroke(0)
        if (!this.active) {
            stroke(100)
        }
        strokeWeight(3)
        rect(this.x, this.y, this.w, this.h, min (this.w,this.h)/10)
        noStroke()
        if (!this.active) {
            fill(100)
        } else {
            fill(0)
        }
        textAlign(CENTER,CENTER)
        text(this.text, this.x + this.w / 2, this.y + this.h / 2)
        pop()
    }
}