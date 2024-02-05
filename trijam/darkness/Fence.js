class Fence {
    constructor(x, y) {
        this.x = 50 * x;
        this.y = 50 * y
    }
    Collides(entity) {
        //console.log(dist(entity.x, 0, this.x, 0),dist(entity.y, 0, this.y, 0) )
        return (dist(entity.x, 0, this.x, 0) < 50) && (dist(entity.y, 0, this.y, 0) < 50)
    }
    Draw() {
        image(Assets.fence, this.x - 25, this.y - 25, 50, 50)
    }
}