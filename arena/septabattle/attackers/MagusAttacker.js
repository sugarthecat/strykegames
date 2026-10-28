class MagusAttacker extends Attacker {
    constructor() {
        super();
        this.rotation = 3;
        this.x = 0;
        this.y = -70;
    }
    reset() {

        super.reset()
    }
    triggerAction(action) {

        if (action == 4) {
            this.rotation--;
        } else if (action == 5) {
            this.rotation++;
        }

        if (action == 1) {
            //light 1
        } else if (action == 2) {
            //light 2
        } else if (action == 3) {

        }
    }

    draw() {
        push()
        translate(this.x + 300, this.y + 250)
        const speed = this.expFade(8, 15);
        this.x += deltaTime / 1000 * speed * this.lastGamepad.axes[0];
        this.y += deltaTime / 1000 * speed * this.lastGamepad.axes[1];
        this.x = constrain(this.x, -125, 125)
        this.y = constrain(this.y, -90, 90)
        imageMode(CENTER)
        rotate(this.rotation * PI / 6)
        image(Assets.magus.scope, 0, 0, 64, 16)
        pop()
        image(Assets.magus.main, 300 - 35, 100 - 25, 70, 70)
    }
}

class MagusFireball {
    constructor(x, y, dir, speed = 30) {
        this.x = x;
        this.y = y;
        this.dx = cos(dir) * speed
        this.dy = sin(dir) * speed
    }
}