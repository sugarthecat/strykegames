function drawSymbol(currency, x, y, size) {
    push()
    translate(x, y)
    if (currency == "coins") {
        strokeCap(ROUND)
        stroke(200, 200, 0)
        strokeWeight(size / 10)
        fill(255, 255, 0)
        circle(0, 0, size)
        strokeWeight(size / 6)
        line(0, - size / 3, 0, size / 3)
    } else if (currency == "gems") {
        fill(50, 255, 50)
        stroke(0, 200, 0)
        strokeWeight(size / 12)
        beginShape()
        vertex(0, -size / 2)
        vertex(-size / 4, 0)
        vertex(0, size / 2)
        vertex(size / 4, 0)
        endShape(CLOSE)
    } else if (currency == "bandwidth") {
        strokeWeight(size / 4)
        translate(-size / 6, -size / 6)
        stroke(200, 0, 0)
        line(size / 4, - size / 4, - size / 4, size / 4)
        translate(size / 6, size / 6)
        stroke(0, 200, 0)
        line(size / 4, - size / 4, - size / 4, size / 4)
        translate(size / 6, size / 6)
        stroke(0, 0, 200)
        line(size / 4, - size / 4, - size / 4, + size / 4)
        strokeWeight(size / 3)
        translate(-size / 6, -size / 6)
        stroke(0)
        line(size / 4 - size / 5, - size / 4 - size / 5,
            size / 4 + size / 5, - size / 4 + size / 5,
        )
    } else if (currency == "memory") {
        fill(80, 80, 220)
        beginShape()
        vertex(- size / 2, - size / 2)
        vertex(- size / 2, size / 2)
        vertex(size / 2, size / 2)
        vertex(size / 2, -size / 4)
        vertex(size / 4, -size / 2)
        endShape(CLOSE)
        fill(200)
        rect(-size / 4, -size / 2, size / 2, size / 3)
        fill(80, 80, 220)
        rect(-size / 5, -size / 2 + size / 24, size / 6, size / 4 * 0.9)
    } else if (currency == "tokens") {
        stroke(180, 130, 30)
        strokeWeight(size / 10)
        fill(240, 200, 60)
        circle(0, 0, size)
        noStroke()
        fill(180, 130, 30)
        rect(-size / 8, -size / 8, size / 4, size / 4)
    } else if (currency == "pizza") {
        fill(220, 180, 100)
        arc(size / 2, 0, size * 2, size * 2, PI  * 0.8 , PI * 1.2)
        fill(220, 50, 30)
        arc(size / 2, 0, size * 1.8, size * 1.8, PI  * 0.8, PI * 1.2)
        fill('#F1C232')
        arc(size / 2, 0, size * 1.6, size * 1.6, PI  * 0.8, PI * 1.2)
    } else if (currency == "compute") {
        fill(0, 180, 0)
        rect(-size / 2, -size / 2, size, size)
        fill(255, 255, 0)
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 6; j++) {
                circle(-size / 2 + size / 12 + size / 6 * i,
                    -size / 2 + size / 12 + size / 6 * j,
                    size / 12
                )
            }
        }
        fill(230)
        rect(-size / 6, -size / 6, size / 3, size / 3)
    }
    pop()
}
