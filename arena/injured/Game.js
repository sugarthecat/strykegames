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
            x: { min: -300, max: 5000 },
            y: { min: -600, max: 600 }
        }
        this.playerBullets = []
        this.enemies = [
            new Landmine(200, 200),
            new Artillery(2, 2, 150, "speed")
        ]
        this.background = new Background(this.bounds.x.min, this.bounds.x.max, this.bounds.y.min, this.bounds.y.max);
    }
    Draw(x, y) {
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
        this.player.x = constrain(this.player.x, this.bounds.x.min, this.bounds.x.max);
        this.player.y = constrain(this.player.y, this.bounds.y.min, this.bounds.y.max);
        pop()
        super.Draw(x, y);
        if (!this.player.isAlive()) {
            screenOn = "death";
        }
    }
    UpdateBullets() {
        for (let i = 0; i < this.playerBullets.length; i++) {
            const b = this.playerBullets[i];
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
        let bullet = this.player.attemptShoot(x - 300 + this.camera.x, y - 200 + this.camera.y)
        if (bullet) {
            this.playerBullets.push(bullet)
        }
    }
}