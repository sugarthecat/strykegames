class EndScreen {
    constructor() {

    }
    setWinner(winner) {
        this.winner = winner;
        this.player1cont = false;
        this.player2cont = false;
    }
    Draw(gamepads) {
        push()
        background(0)
        textAlign(CENTER)
        fill(255)
        textSize(20)
        text(`Victory`, 300, 40)
        textSize(40)
        text(`${this.winner.name}`, 300, 90)
        textSize(15)
        text(`Player ${this.winner.player} wins`, 300, 120)
        image(Assets.getCharacter(this.winner.name).main, 200, 150, 200, 200)
        textSize(15)
        text(`Press start to return to character select`, 300, 380)
        pop()
        if (gamepads[0].buttons[9].pressed) {
            this.player1cont = true
        }
        if (gamepads[1].buttons[9].pressed) {
            this.player2cont = true
        }

        if (this.player1cont && this.player2cont) {
            screenOn = "select"
            screens.select.reset();
        }

        push()
        textSize(12)
        fill (255)
        textAlign(LEFT, CENTER)
        if (!this.player1cont) {
            text("Awaiting player 1", 20, 300)
        }
        if (!this.player2cont) {
            text("Awaiting player 2", 20, 320)
        }
        pop()

    }
}