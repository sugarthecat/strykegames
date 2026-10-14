class OculusRunner extends Runner {
    constructor() {
        super();
        this.reset()
    }

    reset() {
        this.boxes = [
        ]
        //250 x 180
        for (let i = 0; i < 25; i++) {
            for (let j = 0; j < 18; j++) {
                this.boxes.push({
                    x: -125 + i * 10,
                    y: -90 + j * 10,
                    active: false
                })
            }
        }
        super.reset()
    }


    canSwitch() {
        for (let i = 0; i < this.boxes.length; i++) {
            if (!this.boxes[i].active) {
                return false
            }
        }
        return true;
    }
    updateGoals() {
        let allGoalsDone = true;
        for (let i = 0; i < this.boxes.length; i++) {
            const box = this.boxes[i];
            if (abs(this.boxes[i].x + 5 - this.x) < 7 + this.radius
                && abs(this.boxes[i].y + 5 - this.y) < 7 + this.radius) {
                box.active = true;
            }
        }
    }
    draw(centerX, centerY) {
        push()
        translate(centerX, centerY)
        for (let i = 0; i < this.boxes.length; i++) {
            if (this.boxes[i].active) {
                fill(17,68,150)
            } else {
                fill(50)
            }
            rect(this.boxes[i].x, this.boxes[i].y, 10.5, 10.5)
        }
        fill(255, 0, 0)
        imageMode(CENTER)
        image(Assets.oculus.mini, this.x, this.y, 2 * this.radius, 2 * this.radius)
        pop()
    }
    drawGui() {
        super.drawGui();
        push()
        textFont('monospace')
        fill(255)
        textSize(12)
        textAlign(LEFT, CENTER)
        let nActive = 0;
        for (let i = 0; i < this.boxes.length; i++) {
            if (this.boxes[i].active) {
                nActive++;
            }
        }
        text(`Camera Cover: ${Math.floor(nActive*100/this.boxes.length)}%`, 205, 375)
        pop()
    }
}
