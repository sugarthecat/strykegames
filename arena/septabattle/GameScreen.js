class GameScreen {
    constructor() {
        this.loadPlayers(
            {
                name: "Oculus",
                attacker: OculusAttacker,
                runner:  OculusRunner
            },
            {
                name: "Oculus",
                attacker: OculusAttacker,
                runner:  OculusRunner
            }
        )
    }
    loadPlayers(player1, player2) {
        this.player1 = {
            name: player1.name,
            player: 1,
            attacker: new player1.attacker(),
            runner: new player1.runner()
        }
        this.player2 = {
            name: player2.name,
            player: 2,
            attacker: new player2.attacker(),
            runner: new player2.runner()
        }
        this.p1attacking = true;

        this.player1.attacker.savePlayer(this.player2.runner)
        this.player2.attacker.savePlayer(this.player1.runner)
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

        let runner = this.player2.runner;
        let attacker = this.player1.attacker;
        if (this.p1attacking) {
            runner.updateGamepad(gamepads[1])
            attacker.updateGamepad(gamepads[0])
        } else {
            runner = this.player1.runner;
            attacker = this.player2.attacker;
            runner.updateGamepad(gamepads[0])
            attacker.updateGamepad(gamepads[1])
        }


        fill(100)
        rect(300 - 250 / 2, 250 - 180 / 2, 250, 180)
        runner.draw(300, 250)
        attacker.draw()
        runner.drawGui()
        if (runner.health == 0) {
            screenOn = "end"
            if (this.p1attacking) {
                screens.end.setWinner(this.player1)
            } else {
                screens.end.setWinner(this.player2)
            }
        } else
            if (runner.canSwitch()) {
                this.p1attacking = !this.p1attacking;
                runner.reset();
                attacker.reset();
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