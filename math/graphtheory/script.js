let vertexes = []
class Vertex {
    constructor() {
        this.connections = []
    }
}
class Connection {
    constructor(a, b) {
        this.weight = 0;
        this.vertexes = [a, b]
    }
}
function addVertex() {
    vertexes.push(new Vertex())
    if (vertexes.length > 1) {
        vertexes[vertexes.length - 1].Connect(vertexes[0])
    }
}
function setup() {
    createCanvas(400, 400)
}
function draw() {
    background(0)
}