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
            new Landmine(200, 400),
            new Barricade(200, 200, PI / 2, PI * 3 / 2),
            new EnemySniper(200, 200, 2),
            new Tree(200, 0, 50)
        ]
        this.bullets = []
        this.bgcolor = color(0, 150, 0)
        this.background = new Background(this.bounds);
    }
    Draw(x, y) {
        if (deltaTime / 1000 > 0.3) {
            return;
        }
        background(this.bgcolor)
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
        } else if (this.player.goalTime > 5) {
            screenOn = "dialogue";
            screens.dialogue.Load(this.level + 1)
        }
    }
    DrawBoundaries() {
        const sf = GameScreen.scaleFactor;
        push()
        stroke(180)
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
            if (!this.enemies[i].isAlive()) {
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

    Load(level) {
        this.player = new Player(0, 0)
        this.bullets = []
        this.level = level;
        switch (level) {
            case 1:
                this.bgcolor = color(0, 150, 0)
                GameScreen.scaleFactor = 1.5
                this.bounds = {
                    x: { min: -300, max: 800 },
                    y: { min: -200, max: 200 }
                }
                this.enemies = [
                    new Landmine(100, -100),
                    new Landmine(125, 20),
                    new Landmine(200, 0),
                    new Landmine(200, 100),
                    new Landmine(225, -175),
                    new Landmine(350, -50),
                    new Landmine(340, 95),
                    new Landmine(380, 50),
                    new Landmine(415, 95),
                    new Landmine(500, -25),
                    new Barricade(230, -70, PI * 3 / 4, PI * 7 / 4),
                    new Tree(-153, 86, 55),
                    new Tree(-80, -30, 35),
                    new Tree(-15, 60, 35),
                    new Tree(250, 150, 50),
                    new Tree(300, -120, 40),
                    new Tree(425, -80, 45),
                    new Tree(525, 50, 50),
                    new Tree(680, 125, 55),
                    new Tree(700, -120, 70),
                    new Goal(650, 0)
                ]
                break;
            case 2:
                this.bgcolor = color(0, 150, 0)
                GameScreen.scaleFactor = 1.5
                this.bounds = {
                    x: { min: -200, max: 1000 },
                    y: { min: -300, max: 300 }
                }
                this.enemies = [
                    new Barricade(350, -75, PI * 3 / 4, PI * 7 / 4),
                    new Barricade(350, 0, PI * 1 / 4, PI * 7 / 4),
                    new Barricade(350, 75, PI * 1 / 4, PI * 5 / 4),
                    new EnemySniper(350, -75, 3),
                    new EnemySniper(350, 75, 3),
                    new EnemySniper(600, -95, 2),
                    new Tree(-125, -120, 55),
                    new Tree(100, 0, 45),
                    new Tree(135, 65, 30),
                    new Tree(250, -120, 52),
                    new Tree(290, 190, 42),
                    new Tree(355, 175, 29),
                    new Tree(536, -123, 42),
                    new Tree(566, -30, 48),
                    new Tree(575, -186, 40),
                    new Tree(600, -254, 34),
                    new Landmine(325, -250),
                    new Landmine(300, -205),
                    new Goal(850, 0)
                ]
                break;
            case 3:
                this.bgcolor = color(0, 150, 0)
                GameScreen.scaleFactor = 1.5
                this.bounds = {
                    x: { min: -200, max: 2400 },
                    y: { min: -250, max: 250 }
                }
                this.enemies = [
                    new Artillery(0, 5, 3, 175, 1, 0),
                    new Artillery(0, 4, 4, 150, 0, 0),
                    new Artillery(0, 3, 5, 145, 0.9, -1 / 2),
                    new Artillery(0, 2, 6, 125, 0.9, 1 / 2),
                    new Artillery(1, 2, 2, 75, 0, 0),
                    new Artillery(1, 2, 3, 75, -1, 0),
                    new Tree(100, -227, 40),
                    new Tree(200, -44, 33),
                    new Tree(300, 20, 45),
                    new Tree(400, 164, 50),
                    new Tree(500, -156, 37),
                    new Tree(600, -201, 39),
                    new Tree(700, -114, 43),
                    new Tree(800, 216, 47),
                    new Tree(900, 177, 39),
                    new Tree(1300, -141, 35),
                    new Tree(1400, 21, 47),
                    new Tree(1500, -85, 44),
                    new Tree(1600, 15, 44),
                    new Tree(1700, 131, 45),
                    new Tree(1800, 153, 40),
                    new Tree(1900, 60, 40),
                    new Tree(2000, -240, 33),
                    new Tree(2100, -155, 32),
                    new Tree(2200, -118, 40),
                    new Tree(2400, -235, 50),
                    new Goal(2300, 0, 50),
                ]
                break;
        }

        this.camera = {
            x: this.player.x,
            y: this.player.y
        }
        this.background = new Background(this.bounds);
    }

    ReloadLevel() {
        this.Load(this.level);
    }
}