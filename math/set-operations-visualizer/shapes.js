let apos = { x: 300, y: 125 };
let bpos = { x: 250, y: 225 };
let cpos = { x: 350, y: 225 };
const SMOOTH_INC = 0.05
function drawExclusiveA() {
    drawExclusiveSet(apos, bpos, cpos)
}
function drawExclusiveB() {
    drawExclusiveSet(bpos, cpos, apos)
}
function drawExclusiveC() {
    drawExclusiveSet(cpos, apos, bpos,)
}
function drawAB() {
    drawSmallIntersection(apos, bpos, cpos)
}
function drawAC() {
    drawSmallIntersection(cpos, apos, bpos)
}
function drawBC() {
    drawSmallIntersection(bpos, cpos, apos)
}
function drawABC() {
    beginShape();
    let spots = [apos, bpos, cpos]
    for (let i = 0; i < spots.length; i++) {
        let a = spots[i]
        let b = spots[(i + 1) % 3]
        let c = spots[(i + 2) % 3]
        start_theta =  atan2(a.y - 200, a.x - 300)
        for (let theta = 2 * PI + start_theta; theta - start_theta > 0; theta -= SMOOTH_INC) {
            let xpos = a.x + cos(theta) * 100
            let ypos = a.y + sin(theta) * 100
            if (dist(xpos, ypos, b.x, b.y) < 100 && dist(xpos, ypos, c.x, c.y) < 100) {
                vertex(xpos, ypos)
            }
        }
    }
    endShape(CLOSE);
}
function drawExclusiveSet(a, b, c) {
    beginShape();
    let start_theta = PI + atan2(a.y - 200, a.x - 300)
    for (let theta = start_theta; theta - start_theta <= 2 * PI; theta += SMOOTH_INC) {
        let xpos = a.x + cos(theta) * 100
        let ypos = a.y + sin(theta) * 100
        if (dist(xpos, ypos, b.x, b.y) > 100 && dist(xpos, ypos, c.x, c.y) > 100) {
            vertex(xpos, ypos)
        }
    }

    start_theta = PI + atan2(c.y - 200, c.x - 300)
    for (let theta = 2 * PI + start_theta; theta - start_theta > 0; theta -= SMOOTH_INC) {
        let xpos = c.x + cos(theta) * 100
        let ypos = c.y + sin(theta) * 100
        if (dist(xpos, ypos, a.x, a.y) < 100 && dist(xpos, ypos, b.x, b.y) > 100) {
            vertex(xpos, ypos)
        }
    }
    start_theta = PI + atan2(b.y - 200, b.x - 300)
    for (let theta = 2 * PI; theta >= 0; theta -= SMOOTH_INC) {
        let xpos = b.x + cos(theta) * 100
        let ypos = b.y + sin(theta) * 100
        if (dist(xpos, ypos, a.x, a.y) < 100 && dist(xpos, ypos, c.x, c.y) > 100) {
            vertex(xpos, ypos)
        }
    }
    endShape(CLOSE);
}
function drawSmallIntersection(a, b, c) {
    beginShape()
    let start_theta = PI + atan2(a.y - 200, a.x - 300)
    for (let theta = start_theta; theta - start_theta <= 2 * PI; theta += SMOOTH_INC) {
        let xpos = a.x + cos(theta) * 100
        let ypos = a.y + sin(theta) * 100
        if (dist(xpos, ypos, b.x, b.y) < 100 && dist(xpos, ypos, c.x, c.y) > 100) {
            vertex(xpos, ypos)
        }
    }
    start_theta = PI + atan2(b.y - 200, b.x - 300)
    for (let theta = start_theta; theta - start_theta <= 2 * PI; theta += SMOOTH_INC) {
        let xpos = b.x + cos(theta) * 100
        let ypos = b.y + sin(theta) * 100
        if (dist(xpos, ypos, a.x, a.y) < 100 && dist(xpos, ypos, c.x, c.y) > 100) {
            vertex(xpos, ypos)
        }
    }
    start_theta = atan2(c.y - 200, c.x - 300)
    for (let theta = start_theta + PI * 2; theta - start_theta > 0; theta -= SMOOTH_INC) {
        let xpos = c.x + cos(theta) * 100
        let ypos = c.y + sin(theta) * 100
        if (dist(xpos, ypos, b.x, b.y) < 100 && dist(xpos, ypos, a.x, a.y) < 100) {
            vertex(xpos, ypos)
        }
    }
    endShape(CLOSE);
}