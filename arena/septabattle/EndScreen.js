class EndScreen {
    constructor() {

    }
    setWinner(winner){
        this.winner = winner;
    }
    Draw(){
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