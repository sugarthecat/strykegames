class GameButton {
    constructor(x, y, size, action) {
        this.x = x;
        this.y = y;
        this.size = size
        this.image = Assets.yellowButton;
        this.action = action;
    }
    HandleClick(x, y) {
        if (x >= this.x - this.size / 2 
            && y > this.y - this.size / 2 
            && y <= this.y + this.size / 2 
            && x <= this.x + this.size / 2 
            && !this.hidden) {
            this.action();
        }
    }
    //mouseX and Y
    Draw(x, y) {
        if (this.hidden) {
            return;
        }
        push()
        let hovered = false
        let pushed = false;
        if (dist(x, y, this.x, this.y) < this.size / 2) {
            hovered = true;
            if(mouseIsPressed){
                pushed = true;
            }
        }
        fill(0)
        circle (this.x,this.y,this.size)
        fill (200,200,0)
        circle (this.x,this.y,this.size*0.8)
        fill (200,200,0)
        if(hovered){
            fill(180,180,0)
        }
        if(pushed){
            fill(150,150,0)
        }
        circle (this.x,this.y,this.size*0.8)
        fill (255,255,0)
        if(hovered){
            fill(205,205,0)
        }
        if(pushed){
            fill(180,180,0)
        }
        circle (this.x,this.y,this.size*0.6)

        pop()
    }
}