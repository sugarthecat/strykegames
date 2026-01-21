class EndScreen extends GUI {
    constructor(message) {
        super();
        this.message = message;
        this.timeCooldown = 0;
    }
    Reset() {
        this.timeCooldown = 0;
        this.elements = [

        ]
        Assets.music.entergoo.stop()
        Assets.music.robot.stop()
        Assets.music.fifty1.stop()
    }
    Draw(x, y) {
        this.timeCooldown += deltaTime / 1000;
        push()
        noStroke()
        image(Assets.screens.levelselectscreen, 0, 0, 600, 400);
        fill(255)
        rect(200, 150, 200, 50)
        fill(0)
        textSize(20)
        textAlign(CENTER)
        textFont("Courier New")
        text(this.message, 300, 180)
        pop()
        super.Draw(x, y);
    }
}
class DeathScreen extends EndScreen {
    constructor() {
        super("You Died.");
    }
    Draw(x,y){
        super.Draw(x,y)
        if (this.timeCooldown > 2 && this.elements.length < 1) {
            this.elements = [
                new Button(50, 320, 200, 50, "Restart Level",function(){screenOn = "game"; screens.game.RestartLevel()}),
                new Button(350, 320, 200, 50, "Return",function(){screenOn = "levelselect"})
            ]
        }
    }
}
class WinScreen extends EndScreen {
    constructor() {
        super("Escaped!");
    }
    Draw(x,y){
        super.Draw(x,y)
        
        if (this.timeCooldown > 2 && this.elements.length < 1) {
            this.elements = [
                new Button(200, 320, 200, 50, "Return",function(){screenOn = "levelselect"})
            ]
        }
    }
}