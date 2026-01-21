class GooStain {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.gooTime = 0;
    }
    Draw() {
        push()
        translate(this.x, this.y)
        this.gooTime += deltaTime / 1000;
        let gooProgress = min(1,this.gooTime/TIME_TO_EAT_HUMAN)
        image(Assets.entities.goostain, 
            -50, 0, 100, 25*gooProgress, 
            0, 0, Assets.entities.goostain.width, Assets.entities.goostain.height * gooProgress)
        pop()
    }
}