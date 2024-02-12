class GameButton {
    constructor(x, y, w, h, image, action) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.image = image;
        this.action = action;
    }
    HandleClick(x, y) {
        if (x >= this.x && y > this.y && y <= this.y + this.h && x <= this.x + this.w && !this.hidden) {
            this.action();
            Assets.click.play();
        }
    }
    //mouseX and Y
    Draw(x, y) {
        if(this.hidden){
            return;
        }
        push()
        if (dist ( x,y, this.x + this.w/2 , this.y + this.h/2) < this.w/2) {
            tint(200)
        }
        image(this.image, this.x, this.y, this.w, this.h)

        pop()
    }
}