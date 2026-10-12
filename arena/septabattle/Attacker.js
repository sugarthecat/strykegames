class Attacker {
    constructor() {
        this.cooldown = 2;
        this.lastGamepad = null;
    }

    savePlayer(runner) {
        this.runner = runner;
    }


    updateGamepad(gamepad) {
        this.cooldown -= deltaTime / 1000;
        if (this.cooldown < 0) {
            this.cooldown = 0;
        }
        const lastGamepad = this.lastGamepad;
        this.lastGamepad = gamepad;
        if(lastGamepad === null){
            return
        }
        for(let i = 0; i<lastGamepad.buttons.length; i++){
            if(!lastGamepad.buttons[i].pressed && gamepad.buttons[i].pressed){
                this.triggerAction(i);
            }
        }
    }

    triggerAction(action){
        console.log(action)
    }

    draw(centerX, centerY) {

    }
}
