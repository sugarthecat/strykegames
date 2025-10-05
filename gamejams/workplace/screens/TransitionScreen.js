
class TransitionScreen extends GUI {
    constructor() {
        super();
    }
    Reset(destination, message, targetTime = 6) {
        this.time = 0
        this.targetTime = targetTime
        this.destination = destination;
        this.message = message;
    }
    Draw(x, y) {
        super.Draw(x, y);
        this.time += deltaTime / 1000
        if (this.time > this.targetTime) {
            screenOn = this.destination;
            return;
        }
        push()
        textAlign(CENTER)
        textSize(20)
        fill (0)
        textFont("Trebuchet MT")
        text(this.message, 300, 100)
        stroke(0)
        strokeWeight(20)
        noFill()
        const start = cos(this.time * 5.7) * 0.5 + (this.time * 5.7);
        const fadeProgress = min(1,sqrt (this.time), sqrt(this.targetTime-this.time))
        arc(300, 250, fadeProgress * 120, fadeProgress * 120,start, start + PI/3);
        pop()
    }
}