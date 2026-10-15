class MagusRunner extends Runner {
    constructor() {
        super();
        this.reset()
    }

    reset() {
        super.reset()
    }


    canSwitch() {
        return false;
    }

    updateGoals() {
    }
    draw() {
        push()
        fill(255, 0, 0)
        imageMode(CENTER)
        image(Assets.magus.mini, this.x, this.y, 2 * this.radius, 2 * this.radius)
        pop()
    }
    drawGui() {
        super.drawGui();
        push()
        pop()
    }
}
