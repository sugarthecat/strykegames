class GameIndicator {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.active = false;
    }
    HandleClick(x, y) {
    }
    getActive(){
        return this.active
    }
    Toggle(){
        this.active = !this.active
    }
    getColor(){
        if(this.getActive()){
            return color (0,255,0)
        }else{
            return color (255,0,0)
        }
    }
    Draw(x, y) {

        push()
        fill(red(this.getColor())*0.6,green(this.getColor())*0.6,blue(this.getColor())*0.6)
        circle(this.x, this.y, this.size*0.96)
        fill(red(this.getColor())*0.8,green(this.getColor())*0.8,blue(this.getColor())*0.8)
        circle(this.x, this.y, this.size*2/3)
        fill(this.getColor())
        circle(this.x, this.y, this.size/2)
        image(Assets.indicatorCover, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size)
        pop()
    }
}