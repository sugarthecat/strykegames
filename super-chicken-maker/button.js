class Button{
    constructor(x,y,w,h, action){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    click(mouseX, mouseY){
        if(mouseX>= this.x  && mouseY >= this.x && mouseX <= this.x+this.w && mouseY <= this.y+this.h){
            this.action();
        }
    }
    draw(){
        fillRect(this.x,this.y,this.w,this.h);
    }
}