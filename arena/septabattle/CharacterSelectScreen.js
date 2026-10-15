class CharacterSelectScreen {
    constructor() {
        this.characters = [
            {
                name: "Houston",
                attacker: HoustonAttacker,
                runner: HoustonRunner,
            },
            /*
            {
                name: "Magus",
                attacker: HoustonAttacker,
                runner: HoustonRunner,
            },*/
            {
                name: "Oculus",
                attacker: OculusAttacker,
                runner: OculusRunner,
            }
        ]
        this.selected = [0, 0];
        this.locked = [false, false];
        this.lastGamepads = [null, null];
    }

    updateGamepad(player, gamepad) {
        const lastGamepad = this.lastGamepads[player];
        this.lastGamepads[player] = gamepad;
        if (lastGamepad === null) {
            return
        }
        for (let i = 0; i < lastGamepad.buttons.length; i++) {
            if (!lastGamepad.buttons[i].pressed && gamepad.buttons[i].pressed) {
                this.triggerAction(player, i);
            }
        }
    }

    triggerAction(player, action) {
        if (action == 4 && !this.locked[player]) {
            this.selected[player]--;
        } else if (action == 5 && !this.locked[player]) {
            this.selected[player]++;
        } else if (action == 2) {
            this.locked[player] = false
        } else if (action == 8) {
            this.locked[player] = true
        }
        this.selected[player] = (this.selected[player] + this.characters.length) % this.characters.length
        if (this.locked[0] && this.locked[1]) {
            screens.game.loadPlayers(this.characters[this.selected[0]], this.characters[this.selected[1]])
            screenOn = "game"
        }
    }

    reset() {
        this.selected = [0, 0];
        this.locked = [false, false];
        this.lastGamepads = [null, null];
    }
    Draw(gamepads) {

        this.updateGamepad(0, gamepads[0])
        this.updateGamepad(1, gamepads[1])

        background(0)
        for (let i = 0; i < this.characters.length; i++) {
            image(Assets.getCharacter(this.characters[i].name).main, 50 + i * 100, 50, 100, 100)
        }
        push()
        noFill()
        strokeWeight(6)
        stroke(0, 0, 200)
        rect(50 + this.selected[0] * 100 - 3, 50 - 3, 106, 106)
        stroke(200, 0, 0)
        rect(50 + this.selected[1] * 100 + 3, 50 + 3, 94, 94)
        pop()
        for (let i = 0; i < 2; i++) {
            push()
            image(Assets.getCharacter(this.characters[this.selected[i]].name).main,
                50 + i * 400, 250, 100, 100)
            textSize(25)
            textAlign(CENTER, CENTER)
            fill(255)
            noStroke()
            text(this.characters[this.selected[i]].name, 100 + i * 400, 225)
            if (!this.locked[i]) {
                textSize(12)
                text("press SELECT to select", 100 + i * 400, 375)
            }
            pop()
        }
    }
}