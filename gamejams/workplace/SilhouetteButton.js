class SilhouetteButton {
    constructor(x, y, w, h, image, action) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.img = image;
        this.action = action;
        this.selected = false;
    }
    HandleClick(x, y) {
        if (x >= this.x && y > this.y && y <= this.y + this.h && x <= this.x + this.w) {
            this.action();
        }
    }
    //mouseX and Y
    Draw(x, y) {
        push ()
        fill(255)
        if(this.selected){
            fill(180)
        }
        else if (x >= this.x && y > this.y && y <= this.y + this.h && x <= this.x + this.w) {
            fill(220)
        }
        stroke(0)
        strokeWeight(3)
        rect (this.x,this.y,this.w,this.h)
        image(this.img,this.x, this.y, this.w, this.h)
        pop ()
    }
}