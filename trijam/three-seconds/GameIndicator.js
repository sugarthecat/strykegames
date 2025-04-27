class GameIndicator {
    constructor(x, y, size, getColor) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.getColor = getColor
    }
    HandleClick(x, y) {
    }
    Draw(x, y) {
        push()
        fill(red(this.getColor())*0.6,green(this.getColor())*0.6,blue(this.getColor())*0.6)
        circle(this.x, this.y, this.size)
        fill(red(this.getColor())*0.8,green(this.getColor())*0.8,blue(this.getColor())*0.8)
        circle(this.x, this.y, this.size*2/3)
        fill(this.getColor())
        circle(this.x, this.y, this.size/2)
        image(Assets.indicatorCover, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size)
        pop()
    }
}