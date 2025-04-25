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
        fill(this.getColor())
        circle(this.x, this.y, this.size)
        image(Assets.indicatorCover, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size)
        pop()
    }
}