
class TicTacToeScreen extends GUI {
    constructor() {
        super();
        this.ResetGame();
        this.finished = false;
        this.won = false;
        this.tied = false;
    }
    ResetGame() {

        this.spots = []
        for (let i = 0; i < 3; i++) {
            this.spots.push([]);
            for (let j = 0; j < 3; j++) {
                this.spots[i].push(0)
            }
        }
        this.elements = [];
        this.finished = false;
        this.won = false;
        this.tied = false;
    }
    HandleClick(x, y) {
        super.HandleClick(x, y);
        let played = false;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (x > 180 + i * 80 && x < 260 + i * 80
                    && y > 80 + j * 80 && y < 160 + j * 80
                    && this.spots[i][j] == 0
                    && !this.finished
                ) {
                    this.spots[i][j] = 1
                    played = true;
                    //horizontal
                    if (this.spots[(i + 1) % 3][j] == 1 && this.spots[(i + 2) % 3][j] == 1) {
                        this.won = true;
                        this.finished = true;
                    }
                    //vertical
                    if (this.spots[i][(j + 1) % 3] == 1 && this.spots[i][(j + 2) % 3] == 1) {
                        this.won = true;
                        this.finished = true;
                    }
                    //topleft-bottomright diagonal
                    if (i == j && this.spots[(i + 1) % 3][(j + 1) % 3] == 1 && this.spots[(i + 2) % 3][(j + 2) % 3] == 1) {
                        this.won = true;
                        this.finished = true;
                    }
                    //bottomleft-topright diagonal
                    if (i == 2 - j && this.spots[(i + 1) % 3][(j + 2) % 3] == 1 && this.spots[(i + 2) % 3][(j + 1) % 3] == 1) {
                        this.won = true;
                        this.finished = true;
                    }
                    if (this.finished) {
                        const ref = this;
                        ref.elements = [new Button(260, 360, 80, 25, "Play Again", function () {
                            ref.ResetGame();
                        })]
                    }
                }
            }
        }
        if (played && !this.finished) {

            let possibleMoves = []
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (this.spots[i][j] === 0) {
                        possibleMoves.push([i, j])
                    }
                }
            }
            if (possibleMoves.length === 0) {
                this.finished = true;
                this.won = false;
                this.tied = true;
                const ref = this;
                this.elements = [
                    new Button(260, 360, 80, 25, "Play Again", function () {
                        ref.ResetGame();
                    })
                ]

            } else {
                const move = random(possibleMoves)
                const i = move[0]
                const j = move[1]
                this.spots[i][j] = -1
                //horizontal
                if (this.spots[(i + 1) % 3][j] == -1 && this.spots[(i + 2) % 3][j] == -1) {
                    this.won = false;
                    this.finished = true;
                }
                //vertical
                if (this.spots[i][(j + 1) % 3] == -1 && this.spots[i][(j + 2) % 3] == -1) {
                    this.won = false;
                    this.finished = true;
                }
                //topleft-bottomright diagonal
                if (i == j && this.spots[(i + 1) % 3][(j + 1) % 3] == -1 && this.spots[(i + 2) % 3][(j + 2) % 3] == -1) {
                    this.won = false;
                    this.finished = true;
                }
                //bottomleft-topright diagonal
                if (i == 2 - j && this.spots[(i + 1) % 3][(j + 2) % 3] == -1 && this.spots[(i + 2) % 3][(j + 1) % 3] == -1) {
                    this.won = false;
                    this.finished = true;
                }
                if (this.finished) {
                    const ref = this;
                    this.elements = [
                        new Button(200, 360, 80, 25, "Continue", function () {
                            screenOn = "transition"
                            screens.transition.Reset("art","Sometimes to lose the battle, you must win the war.")
                        }),
                        new Button(320, 360, 80, 25, "Play Again", function () {
                            ref.ResetGame();
                        })
                    ]
                }
            }
        }
    }
    Draw(x, y) {
        super.Draw(x, y);
        push()
        fill(0)
        textAlign(CENTER)

        textSize(20)
        textFont("Trebuchet MT")
        text("Play Tic-Tac-Toe.", 300, 50)
        stroke(0)
        strokeWeight(10)
        line(260, 80, 260, 320)
        line(340, 80, 340, 320)
        line(180, 160, 420, 160)
        line(180, 240, 420, 240)
        noFill()
        strokeWeight(7)
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.spots[i][j] === 1) {
                    circle(220 + i * 80, 120 + j * 80, 45)
                } else if (this.spots[i][j] === -1) {
                    line(200 + i * 80, 100 + j * 80, 240 + i * 80, 140 + j * 80)
                    line(240 + i * 80, 100 + j * 80, 200 + i * 80, 140 + j * 80)
                }
            }
        }
        if (this.finished) {
            noStroke()
            fill(0)
            textAlign(CENTER)
            textSize(18)
            if (this.tied) {
                text("A tie is most common. Do better.", 300, 350)
            } else if (this.won) {
                text("It's easy to beat random chance. Do better.", 300, 350)
            } else {
                text("Great job!", 300, 350)
            }
        }
        pop()
        super.DrawElements(x, y)
    }
}