let retreatSpeed
let gameTime
class Devil{
    constructor(){
        if(random(0,1) < 0.4){
            this.x = floor(random(0,2))*600-300
            this.y = random(-300,300)
        }else{
            this.y = floor(random(0,2))*400-200
            this.x = random(-200,200)
        }
    }
    draw(){
        
        push ()
        translate (300+this.x,200+this.y)
        fill (255,0,0)
        rotate (atan2(player.y-(this.y),player.x-(this.x)) + PI/2)
        //console.log(this.y-mousePos.y,this.x-mousePos.x)
        image (Assets.enemy,-20,-20,40,40)
        let deltaX = this.x - player.x
        let deltaY = this.y - player.y
        let deltaPos = sqrt ( deltaX * deltaX + deltaY * deltaY)
        let movement = deltaTime * (0.01 + sqrt (gameTime)*0.01)
        let mousePos = getMousePosition()
        
        let angleFromPlayer = atan2(this.y-(player.y),this.x-(player.x))
        let angleFromMouse = atan2(mousePos.y-(player.y+200),mousePos.x-(300+player.x))
        //console.log(angleFromPlayer,angleFromMouse)
        let rdist = min(abs(angleFromMouse - angleFromPlayer), abs(angleFromMouse - angleFromPlayer - 2*PI))
        if (rdist < 0.35){
            movement *= -2
        }
        let fraction = (deltaPos - movement) / deltaPos
        this.x = this.x * fraction + player.x * (1 - fraction) 
        this.y = this.y * fraction + player.y * (1 - fraction) 
        if(dist(this.x,this.y,player.x,player.y) < 30){
            player.health -= 1
            this.x = -10000000
        }
        noFill()
        pop ( )
    }
}