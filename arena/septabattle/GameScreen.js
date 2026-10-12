class GameScreen {
    constructor() {
        this.runner = {
            x: 0, y: 0
        }
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
        this.updateRunner(gamepads[0])
        fill (100)
        rect (150,150,300,200)
        fill(255, 0, 0)
        circle(this.runner.x + 300, this.runner.y + 250, 10)

    }

    updateRunner(gamepad) {

        const xdir = Math.round(gamepad.axes[0])
        const ydir = Math.round(gamepad.axes[1])
        const speed = 120;
        this.runner.x += deltaTime * xdir * speed / 1000
        this.runner.y += deltaTime * ydir * speed / 1000

        this.runner.x = constrain(this.runner.x,-150,150);
        this.runner.y = constrain(this.runner.y,-100,100);
        
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