
class PlayerBullet {
    constructor(x, y, deltaX) {
        this.x = x
        this.y = y
        this.deltaX = deltaX
    }
    Draw() {
        push()
        fill(255, 255, 0)
        circle(this.x, this.y,15)
        pop()
        //update movement
        this.x += deltaTime * this.deltaX / 1000
        for(let i = 0; i<enemies.length; i++){
            if(dist ( enemies[i].x, enemies[i].y, this.x, this.y) < 40){
                this.x = 100000
                enemies[i].dead = true
            }
        }
    }


}
//path