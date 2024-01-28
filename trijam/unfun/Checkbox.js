class Checkbox {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.enabled = false;
    }
    HandleClick(x, y) {
        if (x >= this.x && y > this.y && y <= this.y + this.h && x <= this.x + this.w) {
            this.enabled = !this.enabled;
            if(this.enabled){
                Assets.check.play()
            }else{
                Assets.erase.play();
            }
        }
    }
    //mouseX and Y
    Draw(x, y) {
        let box = Assets.button.unchecked;
        if(this.enabled){
            box = Assets.button.checked;
        }
        image(box,this.x,this.y,this.w,this.h)
    }
}