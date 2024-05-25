let buildings = []
const nodesX = 10;
const nodesY = 10;
function setup() {

    createCanvas(windowWidth, windowHeight, WEBGL);
    //road nodes
    let roadNodes = []
    for (let x = 0; x < nodesX; x++) {
        roadNodes[x] = []
        for (let y = 0; y < nodesY; y++) {
            roadNodes[x][y] = new RoadNode(x * 180 - nodesX * 90 + 70, 70 + y * 180 - nodesY * 90);
            buildings.push(roadNodes[x][y])
        }
    }
    //roadNodes is now connected to buildings array

    for (let x = 0; x < nodesX; x++) {
        for (let y = 0; y < nodesY; y++) {
            let possConnects = []
            if (x > 0) {
                possConnects.push(roadNodes[x - 1][y])
            } else {
                possConnects.push(roadNodes[x + 1][y])
            }
            if (y > 0) {
                possConnects.push(roadNodes[x][y - 1])
            } else {
                possConnects.push(roadNodes[x][y + 1])
            }
            if (possConnects.length > 0) {

                roadNodes[x][y].connect(random(possConnects))
                if (random(1) > 0.2) {
                    roadNodes[x][y].connect(random(possConnects))
                }
            }
        }
    }
    /*
    for (let i = 0; i < 50; i++) {
        houses.push(new House());
    }*/
}
let rotup = 0;
let rotside = 0;
let xpos = 0;
let ypos = 0;
//between 0 and 1;
let offsetHeight = 400
function draw() {
    background(50);
    noStroke()
    let displacement = offsetHeight * sin(rotup)
    camera(xpos + displacement * sin(rotside), ypos + displacement * cos(rotside), offsetHeight, xpos, ypos, 0, sin(rotside), cos(rotside), 0)
    fill(0, 200, 0)
    plane(nodesX * 180 + 100, nodesY * 180 + 100)
    fill(120)
    for (let i = 0; i < buildings.length; i++) {
        buildings[i].draw()
    }
    updateCamera();
}
const CAM_ROT_SPD = 0.001;
const CAM_MOV_SPD = 0.2
function updateCamera() {
    if (keyIsDown(87)) {
        //w
        ypos += deltaTime * CAM_MOV_SPD * cos(rotside + PI)
        xpos += deltaTime * CAM_MOV_SPD * sin(rotside + PI)
    }
    if (keyIsDown(83)) {
        //s
        ypos += deltaTime * CAM_MOV_SPD * cos(rotside)
        xpos += deltaTime * CAM_MOV_SPD * sin(rotside)
    }
    if (keyIsDown(68)) {
        //d
        ypos += deltaTime * CAM_MOV_SPD * cos(rotside + PI / 2)
        xpos += deltaTime * CAM_MOV_SPD * sin(rotside + PI / 2)
    }
    if (keyIsDown(65)) {
        //a
        ypos += deltaTime * CAM_MOV_SPD * cos(rotside + PI * 3 / 2)
        xpos += deltaTime * CAM_MOV_SPD * sin(rotside + PI * 3 / 2)
    }

    if (keyIsDown(UP_ARROW)) {
        rotup -= CAM_ROT_SPD * deltaTime
    }
    if (keyIsDown(DOWN_ARROW)) {
        rotup += CAM_ROT_SPD * deltaTime
    }
    if (keyIsDown(LEFT_ARROW)) {
        rotside += CAM_ROT_SPD * deltaTime
    }
    if (keyIsDown(RIGHT_ARROW)) {
        rotside -= CAM_ROT_SPD * deltaTime
    }
    if (rotup > 1) {
        rotup = 1;
    } else if (rotup < 0) {
        rotup = 0;
    }
}
function mouseWheel(event) {
    offsetHeight += event.delta;
    if (offsetHeight > 1200) {
        offsetHeight = 1200;
    } else if (offsetHeight < 300) {
        offsetHeight = 300;
    }
}