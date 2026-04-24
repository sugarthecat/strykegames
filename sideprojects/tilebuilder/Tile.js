class Tile {
    constructor(type) {
        this.type = type;
        if (this.type == "wheat" || type == "corn" || type == "strawberry") {
            this.dots = []
            for (let i = 0; i < 10; i++) {
                this.dots.push({ x: random(0.1, 0.9), y: random(0.1, 0.9) })
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
            riseTime: TICK_SPEED / 4 + random(TICK_SPEED / 8),
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
    DrawIncomeBubble(x, y, size) {
        const bubble = this.incomeBubble;
        if (bubble.time > bubble.riseTime + bubble.lifespan
            || bubble.value.length == 0
        ) {
            return;
        }
        bubble.time += deltaTime / 1000
        push()
        textSize(size / 4)
        let boxWidth = 0
        let boxHeight = textSize() * bubble.value.length;
        for (let i = 0; i < bubble.value.length; i++) {
            boxWidth = max(boxWidth, textWidth(`${bubble.value[i].count}`) + size / 3)
        }
        if (bubble.time < bubble.riseTime) {
            const prog = bubble.time / bubble.riseTime
            translate(0, lerp(0, size - boxHeight, 1 - prog))
        }
        const boxLeft = x + size / 2 - boxWidth / 2
        fill(255)
        rect(boxLeft, y, boxWidth, boxHeight)
        textSize(size / 5)
        fill (0)
        textAlign(LEFT, CENTER)
        for (let i = 0; i < bubble.value.length; i++) {
            drawSymbol(bubble.value[i].currency, boxLeft + size / 8, y + size / 8 + i * size / 4, size / 6)
            text(bubble.value[i].count, boxLeft + size / 8 + size / 6, y + size / 8 + i * size / 4)
        }
        pop()
    }
    Draw(x, y, size) {
        if (this.type == "empty") {
            push()
            fill(0)
            rect(x, y, size, size)
            stroke(255)
            strokeWeight(size / 10)
            line(x + size / 3, y + size / 3, x + size * 2 / 3, y + size * 2 / 3)
            pop()
        }
        else if (this.type == "farm") {
            push()
            fill(0, 200, 0)
            rect(x, y, size, size)
            stroke(255, 255, 0)
            strokeWeight(size / 10)
            line(x + size / 3, y + size / 3, x + size * 2 / 3, y + size * 2 / 3)
            pop()
            return;
        }
        else if (this.type == "dirt") {
            push()
            fill(100, 50, 0)
            rect(x, y, size, size)
            pop()
        }
        else if (this.type == "wheat") {
            push()
            fill(220, 220, 0)
            rect(x, y, size, size)
            fill(150, 150, 0)
            for (let i = 0; i < this.dots.length; i++) {
                circle(x + this.dots[i].x * size, y + this.dots[i].y * size, size / 10)
            }
            pop()
        }
        else if (this.type == "corn") {
            push()
            fill(0, 160, 0)
            rect(x, y, size, size)
            fill(220, 220, 0)
            for (let i = 0; i < this.dots.length; i++) {
                circle(x + this.dots[i].x * size, y + this.dots[i].y * size, size / 10)
            }
            pop()
        }
        else if (this.type == "strawberry") {
            push()
            fill(0, 160, 0)
            rect(x, y, size, size)
            fill(255, 0, 0)
            for (let i = 0; i < this.dots.length; i++) {
                circle(x + this.dots[i].x * size, y + this.dots[i].y * size, size / 10)
            }
            pop()
        }
        this.DrawIncomeBubble(x, y, size);
    }
}