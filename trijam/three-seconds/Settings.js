class Settings extends GUI {
    constructor() {
        super();
        this.elements = [new Button(20, 20, 50, 50, "X", function () { screenOn = "title" })]
        this.backgroundColor = color(200, 150, 0)
    }
    DrawBackground() {
        //update
        for (let i = 0; i < this.elements.length; i++) {
            this.elements[i].hidden = i > highestLevel+1
        }
        //bomba
        super.DrawBackground();
        push()
        translate(300, 200)
        rotate(frameCount * 0.01)
        image(Assets.nuclearSymbol, -250, -250, 500, 500)
        pop()
        
        fill (250, 200, 0)
        stroke(0)
        strokeWeight(5)
        rect(125,75,350,200)
        fill(0)
        rect(200, 190, 200, 20)
        fill (250, 200, 0)
        rect(180 + 200 * volume, 165, 40, 70)
        if (mouseInRange(200, 180, 200, 40) && mouseIsPressed) {
            let mousepos = getMousePosition();
            volume = (mousepos.x - 200) / 200
            Assets.setVolume(volume)
        }
        fill (0)
        noStroke();
        text("Volume",300,150)
    }
}