
class MonologueScreen extends GUI {
    constructor() {
        super();
        const ref = this;
        this.elements = [
            new Button (275,360,50,25,"Continue",function(){
                screenOn = "transition";
                screens.transition.Reset(ref.destination, random(['Engaging in further testing...',"Preparing your next experience...","Gathering more data..."]))
            },false)
        ]
    }
    Reset(destination, message, targetTime = 6) {
        this.time = 0
        this.targetTime = targetTime
        this.destination = destination;
        this.message = message;

    }
    Draw(x, y) {
        this.time += deltaTime / 1000
        super.Draw(x, y);
        push ()
        noStroke()
        for(let i =0; i<10; i++){
            fill (0,100,200,50+i*5)
            circle (300, 125, 220 - i * 20 + cos (this.time + i) * 10 )
        }
        fill (0)
        textSize(12)
        textAlign(CENTER)
        textStyle(BOLD)
        textFont('Courier New')
        text ( this.message.substring (0, floor (min(this.time/this.targetTime,1)*this.message.length)),20,250,560,120)
        pop ()
        this.elements[0].active = this.time > this.targetTime + 1;
    }
}