const TILE_BACKGROUNDS = {
    empty: { r: 0, g: 0, b: 0 },
    floor: { r: 200, g: 200, b: 200 },
    dirt: { r: 100, g: 50, b: 0 },
    wheat: { r: 220, g: 220, b: 0 },
    corn: { r: 0, g: 160, b: 0 },
    strawberry: { r: 0, g: 160, b: 0 },
    terminal: { r: 120, g: 120, b: 120 },
    signalp: { r: 120, g: 120, b: 120 },
    sky: { r: 40, g: 130, b: 220 },
    cloud: { r: 40, g: 130, b: 220 },
    sun: { r: 40, g: 130, b: 220 },
    moon: { r: 40, g: 130, b: 220 },
    silo: { r: 100, g: 50, b: 0 },
    dirtroad: { r: 100, g: 50, b: 0 },
}

class Tile {
    constructor(type, x = 0, y = 0) {
        this.x = x;
        this.y = y;
        this.time = 0;
        this.type = type;
        this.backgroundColor = TILE_BACKGROUNDS[type] ?? { r: 0, g: 0, b: 0 };
        if (type == "chessboard" || type == "pawn" || type == "knight" || type == "rook"
            || type == "bishop" || type == "king" || type == "queen") {
            this.backgroundColor = { r: 255, g: 255, b: 255 }
            if ((this.x + this.y) % 2 == 1) {
                this.backgroundColor = { r: 93, g: 93, b: 93 }
            }
        }
        if (type == "wheat" || type == "corn" || type == "strawberry") {
            this.dots = []
            for (let i = 0; i < 10; i++) {
                this.dots.push({ x: random(0.1, 0.9), y: random(0.1, 0.9) })
            }
        }
        if (type == "serverrack") {
            this.colors = []
            for (let i = 0; i < 9; i++) {
                this.colors.push(random([color(255, 0, 0), color(0, 255, 0)]))
            }
        }
        if (type == "terminal") {
            this.message = random(["Hello World", "claude please fix", "TODO: implement",
                "Enter Password", "Welcome Houston", "sudo rm -rf", "Welcome Sherman", "Enter Username"])
        }
        if (type == "moon") {
            const rad = random(5, 20)
            const theta = random(0, 2 * PI)
            this.crater = {
                x: rad * cos(theta),
                y: rad * sin(theta),
            }
        }
        if (type == "edgerouter") {
            const leftSpots = []
            for (let i = 0; i < 8; i++) {
                leftSpots.push(i * 10 + 10)
            }
            this.wires = []
            for (let i = 0; i < 8; i++) {
                const leftSpot = random(leftSpots)
                leftSpots.splice(leftSpots.indexOf(leftSpot), 1)
                this.wires.push({ y1: leftSpot, y2: i * 10 + 10, color: random([color(255, 0, 0), color(0, 255, 0), color(0, 0, 255), color(255, 255, 0)]) })
            }
        }
        if (type == "silo") {
            const rIntensity = random(180, 255)
            const gbIntensity = random(0, 100)
            this.paintColor = color(rIntensity, gbIntensity, gbIntensity)
            this.roofColor = color(random(0, 100))
        }
        if (type == "dirtroad") {
            this.midpoint = { x: random(30, 70), y: random(30, 70) }
            this.edgepoints = [
                { edgex: 2, edgey: 50 },
                { edgex: 98, edgey: 50 },
                { edgex: 50, edgey: 2 },
                { edgex: 50, edgey: 98 },
            ]
            for (let i = 0; i < this.edgepoints.length; i++) {
                this.edgepoints[i].x = random(this.edgepoints[i].edgex, this.midpoint.x)
                this.edgepoints[i].y = random(this.edgepoints[i].edgey, this.midpoint.y)
            }

        }
        this.income = {}
        this.incomeBubble = {
            time: 80,
            lifespan: 1,
            riseTime: 1,
            value: []
        }
    }
    addIncomeBubble(currencies) {
        this.incomeBubble = {
            lifespan: random(TICK_SPEED / 8) + TICK_SPEED / 4,
            riseTime: random(TICK_SPEED / 8) + TICK_SPEED / 4,
            time: 0,
            value: []
        }
        for (const currency of currencies) {
            if (currency in this.income && this.income[currency] > 0) {
                this.incomeBubble.value.push({
                    currency: currency, count: this.income[currency]
                })
            }
        }
    }
    DrawIncomeBubble() {
        const bubble = this.incomeBubble;
        if (bubble.time > bubble.riseTime + bubble.lifespan
            || bubble.value.length == 0
        ) {
            return;
        }
        bubble.time += deltaTime / 1000
        push()
        textSize(25)
        let boxWidth = 0
        let boxHeight = textSize() * bubble.value.length;
        for (let i = 0; i < bubble.value.length; i++) {
            boxWidth = max(boxWidth, textWidth(`${bubble.value[i].count}`) + 100 / 3)
        }
        if (bubble.time < bubble.riseTime) {
            const prog = bubble.time / bubble.riseTime
            translate(0, lerp(0, 100 - boxHeight, 1 - prog))
        }
        const boxLeft = 50 - boxWidth / 2
        fill(255)
        rect(boxLeft, 0, boxWidth, boxHeight, boxWidth / 10)
        textSize(20)
        fill(0)
        textAlign(LEFT, CENTER)
        for (let i = 0; i < bubble.value.length; i++) {
            drawSymbol(bubble.value[i].currency, boxLeft + 100 / 8, 100 / 8 + i * 100 / 4, 100 / 6)
            text(bubble.value[i].count, boxLeft + 100 / 8 + 100 / 6, 100 / 8 + i * 100 / 4)
        }
        pop()
    }
    DrawTile(type) {
        push()
        noStroke()
        fill(this.backgroundColor.r, this.backgroundColor.g, this.backgroundColor.b)
        //magic 1.008 fixes gridlines
        rect(0, 0, 100.8, 100.8)
        if (type == "empty") {
            stroke(255)
            strokeWeight(10)
            line(100 / 3, 100 / 3, 200 / 3, 200 / 3)
        }
        else if (type == "wheat") {
            fill(150, 150, 0)
            for (let i = 0; i < this.dots.length; i++) {
                circle(this.dots[i].x * 100, this.dots[i].y * 100, 10)
            }
        }
        else if (type == "corn") {
            fill(220, 220, 0)
            for (let i = 0; i < this.dots.length; i++) {
                circle(this.dots[i].x * 100, this.dots[i].y * 100, 10)
            }
        }
        else if (type == "strawberry") {
            fill(255, 0, 0)
            for (let i = 0; i < this.dots.length; i++) {
                circle(this.dots[i].x * 100, this.dots[i].y * 100, 10)
            }
        }
        else if (type == "serverrack") {
            for (let i = 0; i < 3; i++) {
                fill(150)
                rect(10, 30 * i + 10, 80, 20)
                push()
                stroke(0)

                for (let j = 0; j < 3; j++) {
                    fill(this.colors[i * 3 + j])
                    circle(50 + (j - 1) * 25, 30 * i + 20, 15)
                }
                pop()
            }
        } else if (type == "edgerouter") {
            fill(150)
            rect(10, 10, 80, 80)
            strokeWeight(5)
            for (let i = 0; i < this.wires.length; i++) {
                stroke(this.wires[i].color)
                line(10, this.wires[i].y1, 90, this.wires[i].y2)
            }
        } else if (type == "coolanttank") {
            fill(150)
            rect(10, 10, 35, 80)
            rect(55, 10, 35, 80)
            const waterHeight = 40 + 20 * sin(this.time / 4)
            const waterHeight2 = 40 + 20 * cos(this.time / 4)
            fill(90, 100, 250)
            rect(55, 90 - waterHeight, 35, waterHeight)
            fill(90, 100, 250)
            rect(10, 90 - waterHeight2, 35, waterHeight2)
        } else if (type == "signalp") {
            fill(0)
            rect(5, 5, 90, 90)
            noFill()
            stroke(255)
            strokeWeight(3)
            beginShape()
            for (let i = 0; i <= 20; i += 1) {
                vertex(lerp(12, 82, i / 20),
                    50 +
                    sin(i + this.time) * 5 +
                    sin(i * 0.5 + this.time * 1.2 + 3) * 7 +
                    sin(i * 2 + this.time * 3.7 + 3) * 3
                )
            }
            endShape()
        }
        else if (type == "terminal") {
            fill(0)
            rect(5, 5, 90, 90)
            fill(0, 255, 0)
            textAlign(LEFT, TOP)
            textFont("monospace")
            textSize(14)
            const period = 10;
            if (this.time % period < 2) {
                text("> ", 10, 20, 80, 60)
                //do nothing: no print yet
            } else if (this.time % period < 5) {
                text("> " + this.message.substring(0, floor(this.message.length * (this.time % period - 2) / 3)), 10, 20, 80, 60)
            } else if (this.time % period < 7) {
                text("> " + this.message, 10, 20, 80, 60)
            } else if (this.time % period < 10) {
                text("> " + this.message.substring(0, floor(this.message.length * (10 - (this.time % period)) / 3)), 10, 20, 80, 60)
                //do nothing: no print yet
            }
        } else if (type == "cloud") {
            fill(255)
            circle(noise(this.time * 0.5) * 20 + 40, noise(this.time * 0.5 + 80) * 20 + 35, 60)
            circle(25 + noise(this.time * 0.5 + 20) * 10, 55 + noise(this.time * 0.5 + 250) * 10, 35)
            circle(65 + noise(this.time * 0.5 + 210) * 10, 55 + noise(this.time * 0.5 + 220) * 10, 35)
        } else if (type == "sun") {
            fill(255, 180, 0)
            const diameter = cos(this.time * 0.5) * 10 + 50
            circle(50, 50, diameter)
            const radius = diameter / 2;
            stroke(255, 180, 0)
            strokeWeight(5)
            for (let i = 0; i < 10; i++) {
                line(
                    50 + cos(i / 10 * 2 * PI) * radius * 1.2,
                    50 + sin(i / 10 * 2 * PI) * radius * 1.2,
                    50 + cos(i / 10 * 2 * PI) * 45,
                    50 + sin(i / 10 * 2 * PI) * 45
                )
            }
        } else if (type == "moon") {
            fill(220, 250, 255)
            circle(50, 50, 80)
            fill(20, 50, 60)
            circle(this.crater.x + 50, this.crater.y + 50, 30)
            fill(40, 130, 220)
            arc(100, 0, 150, 150, PI / 2, PI)
        } else if (type == "silo") {
            fill(this.paintColor)
            rect(30, 30, 40, 60)
            fill(this.roofColor)
            arc(50, 30, 40, 40, PI, 0)
        } else if (type == "dirtroad") {
            stroke(160, 90, 10)
            strokeWeight(8)
            for (let i = 0; i < this.edgepoints.length; i++) {
                line(this.midpoint.x, this.midpoint.y, this.edgepoints[i].x, this.edgepoints[i].y)
                line(this.edgepoints[i].x, this.edgepoints[i].y, this.edgepoints[i].edgex, this.edgepoints[i].edgey)
            }
        } else if (type == "chessboard") {

        } else if (type == "pawn" || type == "knight" || type == "rook"
            || type == "bishop" || type == "king" || type == "queen") {
            if (type in Assets.chess) {
                if ((this.x + this.y) % 2 == 1) {
                    image(Assets.chess[type].white, 0, 0, 100, 100)
                } else {
                    image(Assets.chess[type].black, 0, 0, 100, 100)
                }
            }
        }
        else if (!(type in TILE_BACKGROUNDS)) {
            textSize(20)
            textAlign(CENTER, CENTER)
            fill(255)
            text(type, 50, 50)
        }
        pop()
    }
    Draw(size) {
        this.time += deltaTime / 1000
        push()
        translate(this.x * size, this.y * size)
        scale(size / 100)
        this.DrawTile(this.type)
        this.DrawIncomeBubble();
        pop()
    }
}