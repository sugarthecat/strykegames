class Car {
    constructor(x, deltaY) {
        this.x = x;
        this.deltaY = deltaY;
        if (deltaY > 0) {
            this.y = -200
        } else {
            this.y = 600
        }
    }
    Draw() {
        this.y += this.deltaY * deltaTime / 1000;
        push()
        translate(this.x, this.y)
        //rect(-50, -100, 100, 200)
        if(this.deltaY > 0){
            scale(1,-1)
        }
        image(Assets.car, -100, -100, 200, 200)
        pop()
    }
    Collides(point) {
        return point.x > this.x - 50 && point.x < this.x + 50 && point.y > this.y-100 && point.y < this.y+100
    }
}