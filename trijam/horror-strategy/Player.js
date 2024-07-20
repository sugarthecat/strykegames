class Player{
    constructor(){
        this.x = 0;
        this.y = 0;
        this.health = 5
        this.speed = 15;
    }
    draw(){
        push ()
        translate (300+this.x,200+this.y)
        fill (255,0,0)
        let mousePos = getMousePosition()
        rect(-20,-30,40,10)
        fill (0,255,0)
        rect(-20,-30,40 * this.health / 5,10)
        rotate (atan2(mousePos.y-(this.y+200),mousePos.x-(300+this.x)) + PI/2)
        //console.log(this.y-mousePos.y,this.x-mousePos.x)
        image (Assets.player,-20,-20,40,40)
        let left = keyIsDown(65);
        let right = keyIsDown(68);
        let up = keyIsDown(87);
        let down = keyIsDown(83);
        let vertical = up != down
        let horizontal = left != right
        let multiple = deltaTime/100;
        if(horizontal && vertical){
            multiple /= sqrt (2)
        }
        if(left){
            this.x -= this.speed * multiple
        }
        if(right){
            this.x += this.speed * multiple
        }
        if(up){
            this.y -= this.speed * multiple
        }
        if(down){
            this.y += this.speed * multiple
        }
        if( this.x < -280 ){
            this.x = -280
        }
        if(this.x > 280){
            this.x = 280
        }
        if(this.y > 180){
            this.y = 180
        }
        if(this.y < -180){
            this.y = -180
        }
        noFill()
        stroke(0)
        rotate(-PI/2)
        strokeWeight(800)
        strokeCap(SQUARE);
        arc(0, 0, 900, 900, PI/9,17*PI/9);
        pop ( )
    }
}