
class Bullet {
    constructor(origin, target) {
        this.x = origin.x;
        this.y = origin.y;
        this.dx = target.x - origin.x;
        this.dy = target.y - origin.y;
        this.speed = 5;
        this.damage = 2;
        let deltaSpeed = sqrt(this.dx * this.dx + this.dy * this.dy)
        this.dx *= this.speed / deltaSpeed
        this.dy *= this.speed / deltaSpeed
        this.hit = [];
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
    }
    Update() {
        if (debuffs.includes("swaying bullets")) {
            this.dx += random(-0.5, 0.5)
            this.dy += random(-0.5, 0.5)
        }
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
        //make vertigo less sucky
        if (debuffs.includes("vertigo") && (delta.x != 0 || delta.y != 0)) {
            let theta = atan2(delta.y, delta.x) - frameCount / 300;
            delta.y = sin(theta)
            delta.x = cos(theta)
        }

        if (delta.y == 0 || delta.x == 0) {
            this.y += delta.y * this.speed;
            this.x += delta.x * this.speed;
        } else {
            this.y += delta.y / sqrt(2) * this.speed;
            this.x += delta.x / sqrt(2) * this.speed;
        }
        if (debuffs.includes("vertigo")) {
            let maxdist = dist(0, 0, 300, 200) + 10;
            let currdist = dist(this.x,this.y,300,200)
            if (maxdist < currdist) {
                this.x += 300;
                this.y += 200;
                this.x *= currdist / maxdist;
                this.y *= currdist / maxdist;
                this.x -= 300;
                this.y -= 200;
            }
        } else {
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
        }
        pop();

        if (buffs.includes("healing abilities") && this.health < this.maxHealth) {
            this.health += 0.001
        }
    }
}
class MeleeEnemy extends Entity {
    constructor() {
        super();
        if (random(3) < 1) {
            this.x = floor(random(2)) * 700 - 50
            this.y = random(0, 600)
        } else {
            this.x = random(0, 600)
            this.y = floor(random(2)) * 700 - 50
        }
        this.health = enemyHealth;
        this.maxHealth = enemyHealth;
        this.damage = sqrt(this.health)
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
                player.health -= this.damage;
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

class RangedEnemy extends Entity {
    constructor() {
        super();
        if (random(3) < 1) {
            this.x = floor(random(2)) * 700 - 50
            this.y = random(0, 600)
        } else {
            this.x = random(0, 600)
            this.y = floor(random(2)) * 700 - 50
        }
        this.health = enemyHealth;
        this.maxHealth = enemyHealth;
        this.speed = enemySpeed * 2 / 3;
        this.attackCooldown = 60 / this.speed;
        this.attack = 0;
    }
    Draw() {
        fill(255)
        push();
        translate(this.x, this.y)
        rotate(-atan2(player.x - this.x, player.y - this.y,))
        image(Assets.rangedEnemy, -15, -15, 30, 30)
        pop();
        this.DrawHealthBar();
        this.dx = player.x - this.x;
        this.dy = player.y - this.y;
        let deltaSpeed = sqrt(this.dx * this.dx + this.dy * this.dy)
        if (deltaSpeed > 100 && this.attack <= 0) {
            this.dx *= this.speed / deltaSpeed
            this.dy *= this.speed / deltaSpeed
            this.x += this.dx;
            this.y += this.dy
        } else {
            if (this.attack > 0) {
                this.attack--;
            } else {
                enemyBullets.push(new Bullet(this, player))
                this.attack = this.attackCooldown
                Assets.enemyshot.play();
            }
        }
    }
    Dead() {
        return this.health < 0;
    }

}