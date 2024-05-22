
class House {
    constructor(x, y, dir) {
        this.x = x;
        this.y = y;
        this.dir = dir;
        this.height = random(25, 40)
        this.roofHeight = 20;
        push()
        colorMode(HSB, 100);
        this.color = color(random(100), 70, 80)
        this.roofColor = color(30, 0, random(30, 80))
        pop()
    }
    draw() {

        push()
        stroke(0)
        fill(this.color)
        translate(this.x, this.y, this.height / 2)
        rotateZ(this.dir)
        box(30, 30, this.height)
        fill(this.roofColor)
        //roof triangles
        push()
        translate(0, 0, this.height / 2)
        rotateX(PI/2)
        translate (0,0,15)
        triangle(-15,0,15,0,0,30)
        translate (0,0,-30)
        triangle(-15,0,15,0,0,30)
        pop()
        pop()
    }
}
class RoadNode {
    constructor(x, y) {
        this.x = x + random(-30, 30);
        this.y = y + random(-30, 30);
        this.connections = []
        this.roads = []
    }
    draw() {
        push()
        if (this.connections.length > 2) {
            // traffic lights?
        }
        fill(100)
        translate(this.x, this.y, 0.1)

        circle(0, 0, 40)
        pop()
        for (let i = 0; i < this.roads.length; i++) {
            this.roads[i].draw();
        }
    }
    connect(roadNode) {
        if (!this.connections.includes(roadNode)) {
            this.connections.push(roadNode)
            roadNode.connections.push(this)
            this.roads.push(new Road(this, roadNode))
        }
    }
}
class Road {
    constructor(origin, destination) {
        this.midx = origin.x * 0.5 + destination.x * 0.5
        this.midy = origin.y * 0.5 + destination.y * 0.5
        let deltax = origin.x - destination.x
        let deltay = origin.y - destination.y
        this.angle = -atan2(-deltay, deltax)
        this.length = sqrt(deltax * deltax + deltay * deltay)
        this.width = 40
        this.houses = []
        let housesCount = 0;

        for (let i = 0; i < 1; i++) {
            this.houses.push(new House(this.midx - sin(this.angle) * this.width, this.midy - cos(this.angle) * this.width, this.angle))
            this.houses.push(new House(this.midx + sin(this.angle) * this.width, this.midy + cos(this.angle) * this.width, this.angle))
        }
    }
    draw() {

        push()
        fill(100)
        translate(this.midx, this.midy, 0.1)
        rotateZ(this.angle)
        plane(this.length, this.width)
        stroke(0)
        pop()
        for (let i = 0; i < this.houses.length; i++) {
            this.houses[i].draw()
        }
    }
}