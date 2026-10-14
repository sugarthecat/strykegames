class Attacker {
    constructor() {
        this.cooldown = 2;
        this.lastGamepad = null;
        this.projectiles = [];
    }

    
    reset() {
        this.cooldown = 2;
        this.projectiles = [];
    }

    // projectiles draw with (0, 0) at the center of the arena
    drawProjectiles() {
        push()
        translate(300, 250)
        for (let i = 0; i < this.projectiles.length; i++) {
            this.projectiles[i].draw();
            if (this.projectiles[i].collides(this.runner)) {
                this.runner.getHit();
            }
            if(this.projectiles[i].toBeRemoved()){
                this.projectiles.splice(i,1);
                i--;
            }
        }
        pop()
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
