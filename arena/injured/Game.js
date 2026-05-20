const CAM_ADJUST_SPEED = 0.05;
class GameScreen extends GUI {
    static scaleFactor = 2;
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
            new Barricade(200, 200, PI / 2, PI * 3 / 2),
            new EnemySniper(200, 200, 2),
        ]
        this.bullets = []
        this.background = new Background(this.bounds.x.min, this.bounds.x.max, this.bounds.y.min, this.bounds.y.max);
    }
    Draw(x, y) {
        if (deltaTime / 1000 > 0.3) {
            return;
        }
        background(0, 200, 0)
        push()
        this.camera.x -= CAM_ADJUST_SPEED * (this.camera.x - this.player.x);
        this.camera.y -= CAM_ADJUST_SPEED * (this.camera.y - this.player.y);
        translate(300, 200)
        scale(1 / GameScreen.scaleFactor)
        translate(- this.camera.x, - this.camera.y)
        this.background.Draw(this.camera.x, this.camera.y)
        this.DrawLowerEnemies()
        this.UpdateEnemies()
        this.UpdateBullets()
        this.player.Draw((x - 300) * GameScreen.scaleFactor + this.camera.x, (y - 200) * GameScreen.scaleFactor + this.camera.y)
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
        const sf = GameScreen.scaleFactor;
        push()
        stroke(255)
        strokeWeight(8)
        push()
        translate(0, this.camera.y)
        if (this.camera.x < this.bounds.x.min + 300 * sf) {
            for (let i = -500 * sf; i <= 300 * sf; i += 50) {
                line(this.bounds.x.min, i, this.bounds.x.min - 300 * sf, i + 300 * sf)
            }
        }
        if (this.camera.x > this.bounds.x.max - 300 * sf) {
            for (let i = -300 * sf; i <= 500 * sf; i += 50) {
                line(this.bounds.x.max, i, this.bounds.x.max + 300 * sf, i - 300 * sf)
            }
        }
        pop()
        push()
        translate(this.camera.x, 0)
        if (this.camera.y < this.bounds.y.min + 200 * sf) {
            for (let i = -400 * sf; i <= 800 * sf; i += 50) {
                line(i, this.bounds.y.min, i - 200 * sf, this.bounds.y.min - 200 * sf)
            }
        }
        if (this.camera.y > this.bounds.y.max - 200 * sf) {
            for (let i = -400 * sf; i <= 800 * sf; i += 50) {
                line(i, this.bounds.y.max + 200 * sf, i - 200 * sf, this.bounds.y.max)
            }
        }
        pop()
        pop()
    }
    UpdateBullets() {
        const sf = GameScreen.scaleFactor;
        for (let i = 0; i < this.bullets.length; i++) {
            const b = this.bullets[i];
            if (b.landed
                || b.x < this.bounds.x.min - 300 * sf
                || b.x > this.bounds.x.max + 300 * sf
                || b.y < this.bounds.y.min - 200 * sf
                || b.y > this.bounds.y.max + 200 * sf) {
                this.bullets.splice(i, 1);
                i--;
                continue;
            }
            b.Update(this.player);
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
            this.enemies[i].Update(this.player, this.background, this.bullets)
            if (this.enemies[i] instanceof EnemySniper) {
                const bullet = this.enemies[i].attemptShoot();
                if (bullet) {
                    this.bullets.push(bullet);
                }
            }
            if (!this.enemies[i].alive) {
                this.enemies.splice(i, 1)
                i--;
            }
        }
    }
    HandleClick(x, y) {
        const bullet = this.player.attemptShoot(
            (x - 300) * GameScreen.scaleFactor + this.camera.x,
            (y - 200) * GameScreen.scaleFactor + this.camera.y
        )
        if (bullet) {
            this.bullets.push(bullet);
        }
    }
}