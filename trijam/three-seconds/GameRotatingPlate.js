class GameRotatingPlate {
    constructor(x, y, size, speed, items) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speed = speed
        this.items = items;
        this.rotPosition = 0;

    }
    Project(x, y) {

        let angleFromCenter = atan2(y - this.y, x - this.x);
        let distanceFromCenter = sqrt((y - this.y) ** 2 + (x - this.x) ** 2)
        angleFromCenter -= this.rotPosition;
        let newX = cos(angleFromCenter) * distanceFromCenter + this.x
        let newY = sin(angleFromCenter) * distanceFromCenter + this.y
        return { x: newX, y: newY };
    }
    HandleClick(x, y) {
        let projection = this.Project(x, y)
        let projX = projection.x
        let projY = projection.y
        for (let i = 0; i < this.items.length; i++) {
            this.items[i].HandleClick(projX, projY)
        }
    }
    Draw(x, y) {
        this.rotPosition += this.speed * deltaTime / 1000
        this.rotPosition = this.rotPosition % (2 * PI)
        push()
        fill(120)
        translate(this.x, this.y)
        rotate(this.rotPosition)
        push ()
        stroke (0)
        strokeWeight(8)
        circle(0,0, this.size, this.size)
        pop ()
        translate(-this.x, -this.y)
        let projection = this.Project(x, y)
        let projX = projection.x
        let projY = projection.y
        for (let i = 0; i < this.items.length; i++) {
            this.items[i].Draw(projX, projY)
        }
        pop()
    }
}