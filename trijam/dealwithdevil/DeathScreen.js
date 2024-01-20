
class DeathScreen {
    static Draw() {
        background(0);
        fill(50, 0, 0)
        noStroke();
        rect(0, 0, 600, 400)
        textAlign(CENTER);
        stroke(200, 0, 0)
        fill(150, 0, 0)
        textSize(50)
        text("Terminal access closed.", 300, 150)

        textSize(30)
        text("Terminal crashed on level-" + levelOn + ".purg", 300, 300)
        textSize(50)
        stroke(200, 0, 0)
        if (mouseInRange(240, 310, 120, 50)) {
            fill(10, 0, 0)
        } else {
            fill(80, 0, 0)
        }
        rect(240, 310, 120, 50)
        fill(150, 0, 0)
        text("Return", 300, 350)


    }
    static HandleClick() {
        if (mouseInRange(240, 310, 120, 50)) {
            screenOn = "title"
        }
    }
}