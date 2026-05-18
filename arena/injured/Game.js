const CAM_ADJUST_SPEED = 0.05;
class GameScreen extends GUI {
    constructor() {
        super();
        this.player = new Player()
        this.camera = {
            x: 0,
            y: 0
        }
        this.bounds = {
            x: { min: -300, max: 500 },
            y: { min: -600, max: 600 }
        }
        this.enemies = [
            // new Artillery(0, 2, 2, 150, 0, 1),
            new Landmine(200, 200),
            new Barricade(200, 0,0,PI)
        ]
        this.background = new Background(this.bounds.x.min, this.bounds.x.max, this.bounds.y.min, this.bounds.y.max);
    }
    Draw(x, y) {
        if(deltaTime/ 1000 > 0.3){
            return;
        }
        background(0, 200, 0)
        push()
        this.camera.x -= CAM_ADJUST_SPEED * (this.camera.x - this.player.x);
        this.camera.y -= CAM_ADJUST_SPEED * (this.camera.y - this.player.y);
        translate(300 - this.camera.x, 200 - this.camera.y)
        this.background.Draw(this.camera.x, this.camera.y)
        this.DrawLowerEnemies()
        this.UpdateEnemies()
        this.UpdateBullets()
        this.player.Draw(x - 300 + this.camera.x, y - 200 + this.camera.y)
        this.DrawUpperEnemies()
        this.player.Move()
        this.player.x = constrain(this.player.x, this.bounds.x.min + this.player.radius, this.bounds.x.max - this.player.radius);
        this.player.y = constrain(this.player.y, this.bounds.y.min + this.player.radius, this.bounds.y.max - this.player.radius);
        this.DrawBoundaries()
        pop()
        super.Draw(x, y);
        if (!this.player.isAlive()) {
            screenOn = "death";
        }
    }
    DrawBoundaries() {
        push()
        stroke(255)
        strokeWeight(5)
        push()
        translate(0, this.camera.y)
        if (this.camera.x < this.bounds.x.min + 300) {
            for (let i = - 500; i <= 300; i += 20) {
                line(this.bounds.x.min, i, this.bounds.x.min - 300, i + 300)
            }
        }
        if (this.camera.x > this.bounds.x.max - 300) {
            for (let i = - 300; i <= 500; i += 20) {
                line(this.bounds.x.max, i, this.bounds.x.max + 300, i - 300)
            }
        }
        pop()
        push()
        translate(this.camera.x, 0)
        if (this.camera.y < this.bounds.y.min + 200) {
            for (let i = - 400; i <= 800; i += 20) {
                line(i, this.bounds.y.min, i - 200, this.bounds.y.min - 200)
            }
        }
        if (this.camera.y > this.bounds.y.max - 200) {
            for (let i = - 400; i <= 800; i += 20) {
                line(i, this.bounds.y.max + 200, i - 200, this.bounds.y.max)
            }
        }
        pop()
        pop()
    }
    UpdateBullets() {
        for (let i = 0; i < this.player.bullets.length; i++) {
            const b = this.player.bullets[i];
            if (b.landed
                || b.x < this.bounds.x.min - 300
                || b.x > this.bounds.x.max + 300
                || b.y < this.bounds.y.min - 200
                || b.y > this.bounds.y.max + 200) {
                this.player.bullets.splice(i, 1);
                i--;
                continue;
            }
            b.Update();
            b.Draw();
        }
    }
    DrawLowerEnemies() {
        for (let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].DrawLower();
        }
    }
    DrawUpperEnemies() {
        for (let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].DrawUpper();
        }
    }
    UpdateEnemies() {
        for (let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].Update(this.player, this.background)
        }
    }
    HandleClick(x, y) {
        this.player.attemptShoot(x - 300 + this.camera.x, y - 200 + this.camera.y)
    }
}