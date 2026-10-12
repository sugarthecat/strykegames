class CharacterSelectScreen {
    constructor() {

    }
    Draw() {
        const gamepads = navigator.getGamepads();
        while(gamepads.length > 0 && gamepads[gamepads.length-1] === null){
            gamepads.pop();
        }
        if (gamepads.length != 2) {
            this.DrawErrorScreen();
            return
        }
        
        background(0)
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