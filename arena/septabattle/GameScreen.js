class GameScreen {
    constructor() {
        this.loadPlayers(
            {
                name: "Oculus",
                attacker: OculusAttacker,
                runner: MagusRunner
            },
            {
                name: "Oculus",
                attacker: OculusAttacker,
                runner: MagusRunner
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
    Draw(gamepads) {
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
        push()
        translate(300, 250)
        runner.draw()
        pop()
        attacker.draw()
        runner.drawGui()
        if (runner.health <= 0) {
            screenOn = "end"
            if (this.p1attacking) {
                screens.end.setWinner(this.player1)
            } else {
                screens.end.setWinner(this.player2)
            }
        } else if (runner.canSwitch()) {
            this.p1attacking = !this.p1attacking;
            runner.reset();
            this.player1.attacker.reset()
            this.player2.attacker.reset()

        }
    }
}