class Player {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.speed = 120;
        this.supressionLeft = 3;
        this.demonActive = false;
        this.demonDelta = { x: 0, y: 1 }
        this.demonDeltaTimer = 0;
    }
    Draw() {

        let suppressed = keyIsDown(16)
        if (this.demonActive) {
            suppressed = false;
        }

        let delta = { x: 0, y: 0 }
        if (suppressed) {
            Assets.playHeaven()
            image(Assets.player, this.x - 25, this.y - 25, 50, 50)
            this.supressionLeft -= deltaTime / 2000
            if (this.supressionLeft < 0) {
                this.demonActive = true;
            }
            if (keyIsDown(87)) {
                delta.y--;
                //w
            }
            if (keyIsDown(83)) {
                delta.y++;
                //s
            }
            if (keyIsDown(65)) {
                delta.x--;
                //a
            }
            if (keyIsDown(68)) {
                delta.x++;
                //d
            }
        } else {
            Assets.playDemon();
            image(Assets.demon, this.x - 25, this.y - 25, 50, 50)
            this.supressionLeft = min(2.5, this.supressionLeft + deltaTime / 1000)
            if (this.supressionLeft == 2.5) {
                this.demonActive = false;
            }
            if (game.levelOn > 5) {
                setLineDash([PI * 5, PI * 5]);
                noFill()
                stroke(200, 0, 0)
                strokeWeight(5)
                circle(this.x, this.y, 150);
            }
            this.demonDeltaTimer -= deltaTime / 1000
            if (this.demonDeltaTimer < 0) {
                this.demonDeltaTimer = random(0.5, 3)
                this.demonDelta.x = random(-1, 1)
                this.demonDelta.y = random(-1, 1)
            }
            delta = this.demonDelta
        }
        let oldx = this.x;
        let oldy = this.y;
        if (delta.y == 0 || delta.x == 0) {
            this.y += delta.y * this.speed * deltaTime / 1000;
            this.x += delta.x * this.speed * deltaTime / 1000;
        } else {
            this.y += delta.y / sqrt(2) * this.speed * deltaTime / 1000;
            this.x += delta.x / sqrt(2) * this.speed * deltaTime / 1000;
        }
        let newx = this.x;
        if(game.Collides(this)){
            this.x = oldx;
            if(game.Collides(this)){
                this.y = oldy;
                this.x = newx;
                if(game.Collides(this)){
                    this.x = oldx;
                    this.y = oldy;
                }
            }
        }
    }
}

function setLineDash(list) {
    drawingContext.setLineDash(list);
}