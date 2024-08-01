class Tower {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.reloadTime = 2
        this.reload = random(0,2)
        this.range = 250;
        this.attacks = []
        this.active = false
    }
    Attack(enemies) {
        if( ! this.active){
            return;
        }
        console.log(this.x)
        push()
        stroke(255, 255, 0)
        strokeWeight(5)
        this.reload += deltaTime / 1000
        if (this.reload > this.reloadTime) {
            this.reload -= this.reloadTime
            for (let i = 0; i < enemies.length; i++) {
                let enemyPos = enemies[i].GetPosition()
                if (dist(this.x, this.y, enemyPos.x, enemyPos.y) < this.range) {
                    this.attacks.push([this.x, this.y - 35, enemyPos.x, enemyPos.y, 0.5])
                    enemies[i].hp -= 1;
                    break;
                }
            }
        }
        for (let i = 0; i < this.attacks.length; i++) {
            this.attacks[i][4] -= deltaTime / 1000
            if (this.attacks[i][4] < 0) {
                this.attacks.splice(i, 1)
                i--;
            } else {
                let attack = this.attacks[i]
                line(attack[0], attack[1], attack[2], attack[3])
            }

        }
        pop()

    }
    Draw(x, y) {
        this.reload += deltaTime / 1000
        push()
        image(Assets.pillar, this.x - 45, this.y - 60, 100, 100)
        let hovered = false
        if (dist(x, y, this.x, this.y) < 40 && !this.active) {
            fill(100)
            hovered = true
            rect (this.x-50,this.y-20,100,40)
            image(Assets.money,this.x-49,this.y-15,30,30)
            textSize(20)
            textAlign(LEFT)
            fill(200)
            text ("20", this.x-20,this.y+7,)
        } else {
            fill(120)
        }
        if( this.active){
            image(Assets.detective, this.x - 45, this.y - 60, 100, 100)
        }
        pop()
    }
    HandleClick(x, y) {
        if (dist(x, y, this.x, this.y) < 40 && !this.active && money >= 20) {
            money -= 20;
            this.active = true
        }
    }
}