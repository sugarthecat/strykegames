export default class Chicken {
    constructor() {
        this.x = 20;
        this.y = 100;
        this.w = 25
        this.h = 25
        this.rightmove = false;
        this.leftmove = false;
        this.jumpable = false;
        this.momentum = 0;
    }
    draw(ctx, scalex, scaley) {
        ctx.fillStyle = "#fff"
        ctx.fillRect(this.x * scalex, this.y * scaley, this.w * scalex, this.h * scaley);
        if (this.momentum < 0) {
            this.momentum *=0.9
        }
          this.momentum -=1;
        
        if (this.y < 0) {
          this.momentum = 0;
          this.y = 0;
        }
        if(this.rightmove){
            this.x+=3;
        }
        if(this.leftmove){
            this.x-=3;
        }
        this.y-=this.momentum/2;
    }
    drawEditor(ctx, scalex, scaley) {
        ctx.fillStyle = "#fff"
        ctx.fillRect(this.x * scalex * 5/6, this.y * scaley * 3/4, this.w * scalex * 5/6, this.h * scaley*3/4);
    }
    collides(object){
        if(object.x + object.w < this.x || this.x + this.w < object.x || this.y + this.h < object.y || object.y + object.h < this.y){
            return false
        }
        return true
    }
    jump(){
        if(this.jumpable){
            this.momentum = 20;
        }
    }
    canJump(){
        this.jumpable = true;
    }
}