
let player;

let playerBullets = [];
let enemies = [];
let enemyBullets = [];
let levelOn = 0;
let timeSinceLastEnemy = 0;
let enemiesRemaining = 0;

let enemyHealth = 5;
let enemySpeed = 1;
class Game {
    static Draw() {
        fill(50)
        noStroke()
        rect(0, 0, 600, 400)
        for (let i = 0; i < playerBullets.length; i++) {
            playerBullets[i].Draw();
            for (let j = 0; j < enemies.length; j++) {
                if (dist(playerBullets[i].x, playerBullets[i].y, enemies[j].x, enemies[j].y) < 20) {
                    enemies[j].health -= player.damage;
                    Assets.ouch.play();
                    playerBullets[i].x = -1000000;
                }
            }
            if (playerBullets[i].OutOfBounds()) {
                playerBullets.splice(i, 1);
                i--;
            }
        }
        for (let i = 0; i < enemyBullets.length; i++) {
            enemyBullets[i].Draw();
            if (enemyBullets[i].OutOfBounds()) {
                enemyBullets.splice(i, 1);
                i--;
            }
        }
        for (let i = 0; i < enemies.length; i++) {
            enemies[i].Draw();
            if (enemies[i].Dead()) {
                enemies.splice(i, 1);
                i--;
            }
        }
        if (timeSinceLastEnemy > 600 / levelOn && enemiesRemaining > 0) {
            timeSinceLastEnemy = 0;
            enemiesRemaining--;
            enemies.push(new Enemy());
        }
        timeSinceLastEnemy++;
        player.Draw()
        //autofire

        if (buffs.includes("an automatic gun") && mouseIsPressed) {
            this.fireGun();
        }

        if (debuffs.includes("blind spots")) {

            for (let i = 0; i < this.blindspots.length; i++) {
                for (let j = 0; j < 10; j++) {
                    let tempColor = color(150)
                    tempColor.setAlpha(j * 25)
                    fill(tempColor)
                    circle(this.blindspots[i].x, this.blindspots[i].y, 20 * j + 20)
                }
            }
        }

        if (player.health <= 0) {
            screenOn = "death"
        } else if (enemies.length == 0 && enemiesRemaining == 0) {
            screenOn = "devil"
            DevilScreen.NewDeal();
            Assets.keyboard.play();
        }
    }
    static HandleClick() {
        this.fireGun();
    }
    static fireGun() {

        if (player.reloadTime <= 0) {
            if (random() < 0.8 || !debuffs.includes("gun jams")) {
                playerBullets.push(new Bullet())
                if (buffs.includes("multishot rounds")) {
                    playerBullets.push(new Bullet())
                    playerBullets.push(new Bullet())
                    playerBullets.push(new Bullet())
                }
                Assets.gunshot.play();
            } else {
                Assets.gunjam.play();
            }

            player.reloadTime = player.reload;
        }
    }
    static NewLevel() {
        enemies = [];
        enemyBullets = [];
        playerBullets = [];
        levelOn++;
        enemiesRemaining = Math.pow(levelOn, 2);
        timeSinceLastEnemy = 10000;
        if (debuffs.includes("blind spots")) {
            this.blindspots = []
            for (let i = 0; i < 3; i++) {
                this.blindspots.push({ x: random(0, 600), y: random(0, 400) })
            }
        }
        Assets.newLevel.play();
    }
    static ApplyStats() {
        switch (DevilScreen.buff) {
            case "a stronger gun":
                player.damage++;
                break;
            case "a faster gun":
                player.reload *= 2 / 3
                break;
            default:

                buffs.push(DevilScreen.buff);
                break;
        }
        switch (DevilScreen.debuff) {
            case "stronger opponents":
                enemyHealth *= 1.5
                break;
            case "faster opponents":
                enemySpeed *= 1.5
                break;
            default:

                debuffs.push(DevilScreen.debuff);
                break;
        }
    }
    static NewGame() {
        DevilScreen.NewGame();
        levelOn = 0;
        enemyHealth = 5;
        enemySpeed = 1
        player = new Player();
        buffs = [];
        debuffs = []
        this.NewLevel();
    }
}
class Bullet {
    constructor() {
        let mousePosition = getMousePosition();
        this.x = player.x;
        this.y = player.y;
        this.dx = mousePosition.x - player.x;
        this.dy = mousePosition.y - player.y;
        this.speed = 5;
        this.damage = 2;
        let deltaSpeed = sqrt(this.dx * this.dx + this.dy * this.dy)
        this.dx *= this.speed / deltaSpeed
        this.dy *= this.speed / deltaSpeed
        if (buffs.includes("multishot rounds")) {
            this.dx += random(-2, 2)
            this.dy += random(-2, 2)
            deltaSpeed = sqrt(this.dx * this.dx + this.dy * this.dy)
            this.damage /= 2
            this.dx *= this.speed / deltaSpeed
            this.dy *= this.speed / deltaSpeed
        }
    }
    Draw() {
        push()
        stroke(200, 200, 0)
        strokeWeight(4)
        line(this.x, this.y, this.x + this.dx, this.y + this.dy)
        pop()
        this.x += this.dx;
        this.y += this.dy;
    }
    OutOfBounds() {
        return !(this.x > 0 && this.y > 0 && this.x < 600 && this.y < 400)
    }
}
class Entity {
    DrawHealthBar() {
        fill(0, 150, 0)
        rect(this.x - 15, this.y - 25, max(30 * this.health / this.maxHealth, 0), 5)
    }
}
class Player extends Entity {
    constructor() {
        super();
        this.x = 300;
        this.y = 200;
        this.health = 20;
        this.maxHealth = 20;
        this.reload = 40;
        this.reloadTime = 0;
        this.speed = 1;
        this.damage = 2;
    }
    Draw() {
        if (this.reloadTime > 0) {
            this.reloadTime--;
        }
        push();
        noStroke()
        fill(255)
        push();
        translate(this.x, this.y)
        let mousePos = getMousePosition();
        rotate(-atan2(mousePos.x - this.x, mousePos.y - this.y,))
        image(Assets.player, -15, -15, 30, 30)
        pop();
        this.DrawHealthBar();
        fill(150, 150, 0)
        //ammo bar
        rect(this.x - 15, this.y - 22, max(30 - 30 * this.reloadTime / this.reload, 0), 3)

        let delta = { x: 0, y: 0 }
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
        if (delta.y == 0 || delta.x == 0) {

            this.y += delta.y * this.speed;
            this.x += delta.x * this.speed;
        } else {
            this.y += delta.y / sqrt(2) * this.speed;
            this.x += delta.x / sqrt(2) * this.speed;
        }
        if (this.x < 15) {
            this.x = 15;
        }
        if (this.y < 15) {
            this.y = 15
        }
        if (this.x > 585) {
            this.x = 585
        }
        if (this.y > 385) {
            this.y = 385;
        }
        pop();

        if (buffs.includes("healing abilities") && this.health < this.maxHealth) {
            this.health += 0.01
        }
    }
}
class Enemy extends Entity {
    constructor() {
        super();
        if (random(3) < 1) {
            this.x = floor(random(2)) * 700 - 50
            this.y = random(0, 400)
        } else {
            this.x = random(0, 600)
            this.y = floor(random(2)) * 500 - 50
        }
        this.health = enemyHealth;
        this.maxHealth = enemyHealth;
        this.speed = enemySpeed;
        this.attackCooldown = 60 / this.speed;
        this.attack = 0;
    }
    Draw() {
        fill(255)
        push();
        translate(this.x, this.y)
        rotate(-atan2(player.x - this.x, player.y - this.y,))
        image(Assets.meleeEnemy, -15, -15, 30, 30)
        pop();
        this.DrawHealthBar();
        this.dx = player.x - this.x;
        this.dy = player.y - this.y;
        let deltaSpeed = sqrt(this.dx * this.dx + this.dy * this.dy)
        if (deltaSpeed < 20 || this.attack > 0) {
            if (this.attack > 0) {
                this.attack -= 1;
            } else {
                this.attack = this.attackCooldown;
                player.health -= 2;
                Assets.stab.play();
            }
        } else {
            this.dx *= this.speed / deltaSpeed
            this.dy *= this.speed / deltaSpeed
            this.x += this.dx;
            this.y += this.dy
        }
    }
    Dead() {
        return this.health < 0;
    }

}