class HoustonRunner extends Runner {
    constructor() {
        super();
        this.reset()
    }

    reset() {
        this.goals = shuffle([
            { x: -100, y: -60, active: false },
            { x: 100, y: -60, active: false },
            { x: -100, y: 60, active: false },
            { x: 100, y: 60, active: false },
            { x: 0, y: 0, active: false },
        ])
        super.reset()
    }


    canSwitch() {
        for (let i = 0; i < this.goals.length; i++) {
            if (!this.goals[i].active) {
                return false
            }
        }
        return true;
    }
    updateGoals() {
        let allGoalsDone = true;
        for (let i = 0; i < this.goals.length; i++) {
            if (dist(this.x, this.y, this.goals[i].x, this.goals[i].y) < this.radius + 10) {
                if (allGoalsDone) {
                    this.goals[i].active = true;
                } else {
                    for (let j = 0; j < this.goals.length; j++) {
                        this.goals[j].active = false;
                    }
                }
            }
            allGoalsDone = allGoalsDone && this.goals[i].active;
        }
    }
    draw() {
        push()
        for (let i = 0; i < this.goals.length; i++) {
            if (this.goals[i].active) {
                fill(0, 255, 0)
            } else {
                fill(255, 0, 0)
            }
            circle(this.goals[i].x, this.goals[i].y, 20)
        }
        fill(255, 0, 0)
        imageMode(CENTER)
        image(Assets.houston.mini, this.x, this.y, 2 * this.radius, 2 * this.radius)
        pop()
    }
    drawGui() {
        super.drawGui();
        push()
        fill(255)
        textSize(12)
        textAlign(LEFT, CENTER)
        text("Launch Sequence: ", 205, 375)
        for (let i = 0; i < this.goals.length; i++) {
            if (this.goals[i].active) {
                fill(0, 255, 0)
            } else {
                fill(255, 0, 0)
            }
            circle(320 + i * 15, 375, 12)
        }
        pop()
    }
}
