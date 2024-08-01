
class Enemy {
    constructor() {
        this.hp = 3
        this.deltaPos = 0
        this.speed = 80
        this.lastPathIndex = 0
    }
    Draw() {
        if (this.lastPathIndex + 1 < path.length) {
            let pos = this.GetPosition()

            this.deltaPos += deltaTime * this.speed / 1000

            let prevPos = path[this.lastPathIndex]
            let nextPos = path[this.lastPathIndex + 1]
            let distance = dist(prevPos.x, prevPos.y, nextPos.x, nextPos.y)

            let portion = this.deltaPos / distance
            if (portion > 1) {
                this.lastPathIndex++;
                this.deltaPos = 0
                this.DrawAt(pos.x, pos.y)
            } else {
                this.DrawAt(pos.x, pos.y)
            }
        }
    }
    DrawAt(x, y) {
        push()
        fill(255, 0, 0)
        if (this.lastPathIndex + 1 < path.length) {
            let prevPos = path[this.lastPathIndex]
            let nextPos = path[this.lastPathIndex + 1]
            if(prevPos.x < nextPos.x){

                image(Assets.robber, x + 40, y - 40, -80, 80)
            }else{

                image(Assets.robber, x - 40, y - 40, 80, 80)
            }
        }
        pop()
    }
    GetPosition() {

        let prevPos = path[this.lastPathIndex]
        if (this.lastPathIndex + 1 < path.length) {
            let nextPos = path[this.lastPathIndex + 1]
            let distance = dist(prevPos.x, prevPos.y, nextPos.x, nextPos.y)
            let portion = this.deltaPos / distance
            return { x: nextPos.x * portion + prevPos.x * (1 - portion), y: nextPos.y * portion + prevPos.y * (1 - portion) }
        } else {
            return prevPos
        }
    }
}