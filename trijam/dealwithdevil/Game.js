
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
        push()
        translate(300, 200)
        if (debuffs.includes("vertigo")) {
            rotate(frameCount / 300)
        }
        image(Assets.bricks, -400, -400, 800, 800)
        translate(-300, -200)


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
            if (dist(player.x, player.y, enemyBullets[i].x, enemyBullets[i].y) < 20) {
                player.health -= 3;
                Assets.ouch.play();
                enemyBullets[i].x = -1000000;
            }
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

        this.spawnEnemies();
        player.Draw()

        //autofire
        if (buffs.includes("an automatic gun") && mouseIsPressed) {
            this.fireGun();
        }
        pop();
        Debuffs.DrawDebuffs();
        if (buffs.includes("enemy counts")) {
            textSize(30)
            fill(0)
            stroke(255)
            text((enemiesRemaining + enemies.length) + " Remain.", 525, 30)
        }
        if (player.health <= 0) {
            screenOn = "death"
        } else if (enemies.length == 0 && enemiesRemaining == 0) {
            screenOn = "devil"
            DevilScreen.NewDeal();
            Assets.keyboard.play();
        }

    }
    static spawnEnemies() {

        if (timeSinceLastEnemy > 600 / levelOn && enemiesRemaining > 0) {
            timeSinceLastEnemy = 0;
            enemiesRemaining--;
            if (levelOn < 5 || random() < 5 / levelOn) {
                enemies.push(new MeleeEnemy());
            } else {
                enemies.push(new RangedEnemy())
            }
        }
        timeSinceLastEnemy++;
    }
    static HandleClick() {
        this.fireGun();
    }
    static fireGun() {

        if (player.reloadTime <= 0) {
            if (random() < 0.8 || !debuffs.includes("gun jams")) {
                playerBullets.push(new Bullet(player, getMousePosition()))
                if (buffs.includes("multishot rounds")) {
                    playerBullets.push(new Bullet(player, getMousePosition()))
                    playerBullets.push(new Bullet(player, getMousePosition()))
                    playerBullets.push(new Bullet(player, getMousePosition()))
                }
                Assets.gunshot.play();
            } else {
                Assets.gunjam.play();
            }

            player.reloadTime = player.reload;
        }
    }
    static NewLevel() {
        Debuffs.RefreshDebuffs();
        enemies = [];
        enemyBullets = [];
        playerBullets = [];
        levelOn++;
        enemiesRemaining = Math.pow(levelOn, 2);
        timeSinceLastEnemy = 10000;
        Assets.newLevel.play();
    }
    static ApplyStats() {
        switch (DevilScreen.buff) {
            case "a stronger gun":
                player.damage++;
                break;
            case "a faster gun":
                player.reload *= 4 / 5
                break;
            case "greater stamina":
                player.speed += 1
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
            case "frailness":
                player.maxHealth -= 10
                player.health = player.maxHealth
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