class Goal {
    constructor(x, y) {
        this.x = x * 50;
        this.y = y * 50;
    }
    Draw() {
        let d = new Date();
        let secondsSinceEpoch = d.getTime();
        for (let i = 5; i >= 0; i--) {

            let pos = (i - (1000 - (secondsSinceEpoch % 1000)) / 1000) / 5
            let clr = color(255, 255 - pos * 30, 255 - pos * 255)
            if (pos > 0.9) {
                clr.setAlpha(255 - (pos - 0.9) / 0.1 * 255)
            }
            fill(clr)
            circle(this.x, this.y, 50 * pos)
        }
    }
    Collide(entity) {
        //console.log(dist(entity.x, 0, this.x, 0),dist(entity.y, 0, this.y, 0) )
        if (dist(entity.x, entity.y, this.x, this.y) < 40) {
            screenOn = "levelup"
            if(game.levelOn >= 6){
                screenOn = "win";
            }
        }
    }
}