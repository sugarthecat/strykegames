class GameScreen {
    constructor() {
        this.runner = new Runner()
        this.attacker = new HoustonAttacker();
        this.attacker.savePlayer(this.runner)
    }
    Draw() {
        const gamepads = navigator.getGamepads();
        while (gamepads.length > 0 && gamepads[gamepads.length - 1] === null) {
            gamepads.pop();
        }
        if (gamepads.length != 2) {
            this.DrawErrorScreen();
            return
        }
        background(0)
        this.runner.updateGamepad(gamepads[0])
        this.attacker.updateGamepad(gamepads[1])

        fill(100)
        rect(300-250/2, 250-180/2, 250, 180)
        this.runner.draw(300,250)
        this.attacker.draw()
        this.runner.drawHealthBar()
        if(this.runner.health == 0){
            screenOn = "roundend"
            screens.roundEnd.setWinner(1)
        }
    }

    DrawErrorScreen() {
        push()
        background(0)
        fill(255)
        textAlign(CENTER)
        textSize(40)
        text("Please connect controllers", 300, 200)
        pop()
    }
}