class Sin {
    constructor(x, y) {
        this.x = 50 * x;
        this.y = 50 * y;
        this.sin = floor(random(Assets.sins.length));
    }
    Collide(entity) {
        //console.log(dist(entity.x, 0, this.x, 0),dist(entity.y, 0, this.y, 0) )
        if (dist(entity.x, entity.y, this.x, this.y) < 40) {
            screenOn = "death"
            switch (this.sin) {
                case 0:
                    screens.death.SetText("Money is the root of all problems")
                    break;
                case 1:
                    screens.death.SetText("The sword only brings harm.")
                    break;
                default:
                    screens.death.SetText("I shouldn't haven given in.")
                    break;
            }
            game.levelOn--;
        }
    }
    Draw() {
        image(Assets.sins[this.sin], this.x - 15, this.y - 15, 30, 30)
    }
}