//idea: ex assasinator
//idea: flower planter
//idea: cookie maker
class AssasinGame extends GUI {
    constructor() {
        super();
    }
    reset() {
        this.time = 0;
        const ref = this;
        this.elements = [new Button(2, 2, 100, 20, "Return To Mailbox", function () { screenOn = "title"; ref.reset() })];
        this.lastFire = 0;
        this.bullet = null;
        this.colors =
            [
                color(200, 0, 0), //red
                color(220, 180, 0), //yellow
                color(0, 180, 0), //green
                color(0, 0, 230), //blue
                color(150, 0, 150), //purple
            ]
        this.level = 0;
        this.currColor = 0;
    }
    Draw(x, y) {
        this.time += deltaTime / 100;
        push()
        noStroke()
        background(255)
        this.elements[0].visible = this.time > 30;
        let lTime = this.time;
        textStyle(BOLD);
        fill(0)
        textAlign(CENTER)
        text(this.textFade("So it's been another year...", 1, 10, 3, lTime), 300, 50)
        text(this.textFade("And a wonderful one at that.", 10, 15, 2, lTime), 300, 50)
        text(this.textFade("To end on a question like last time,", 15, 25, 3, lTime), 300, 50)
        text(this.textFade("Can I be a stop", 25, 225, 195, lTime), 300, 35)
        text(this.textFade("on the metro line of your heart?", 28, 228, 195, lTime), 300, 65)
        lTime -= 3;
        if (0 < lTime ) {
            stroke(this.colors[0]);
            strokeWeight(constrain(lTime , 0, 20))
            line(50, 200, constrain(lTime * 25, 50, 500), 200)
        }
        lTime -= 17
        if(0 < lTime){
            noStroke()
            fill(this.colors[0])
            const stop_size = constrain(lTime *4,0,60 );
            circle ( 50,200,stop_size)
            circle ( 500,200,stop_size)
            circle ( 300,200,stop_size)
        }
        lTime -= 5;
        fill (this.colors[0])
        if(0 < lTime){
            textAlign(LEFT);
            textSize(30)
            push ()
            translate (50,250)
            rotate ( 2 * PI / 8)
            text(this.textFade("Your Cats",0,100,98,lTime),0,0)
            pop ()
            push ()
            translate (300,250)
            rotate ( 2 * PI / 8)
            text(this.textFade("Me?",0,100,98,lTime),0,0)
            pop ()
            push ()
            translate (500,250)
            rotate ( 2 * PI / 8)
            text(this.textFade("London",0,100,98,lTime),0,0)
            pop ()
        }
        pop()
        super.Draw(x, y)
    }
    textFraction(text, fraction) {
        return text.substring(0, floor(min(fraction, 1) * text.length))
    }
    textFade(text, start, end, radius, time) {
        if (time < start || time > end) {
            return ""
        }
        const midpoint = (start + end) / 2
        if (abs(time - midpoint) <= radius) {
            return text;
        }
        const endFadeIn = midpoint - radius;
        const startFadeOut = midpoint + radius;
        if (time < endFadeIn) {
            return this.textFraction(text, (time - start) / (endFadeIn - start))
        } else {
            return this.textFraction(text, (end - time) / (end - startFadeOut))
        }
    }
}