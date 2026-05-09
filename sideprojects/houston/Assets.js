class Assets {
    static loadAssets() {
        this.chess = {}
        this.chess.pawn = {
            "black": loadImage("assets/blackpawn.png"),
            "white": loadImage("assets/whitepawn.png"),
        }
        this.chess.rook = {
            "black": loadImage("assets/blackrook.png"),
            "white": loadImage("assets/whiterook.png"),
        }
        this.chess.knight = {
            "black": loadImage("assets/blackknight.png"),
            "white": loadImage("assets/whiteknight.png"),
        }
        this.chess.bishop = {
            "black": loadImage("assets/blackbishop.png"),
            "white": loadImage("assets/whitebishop.png"),
        }
        this.chess.queen = {
            "black": loadImage("assets/blackqueen.png"),
            "white": loadImage("assets/whitequeen.png"),
        }
        this.chess.king = {
            "black": loadImage("assets/blackking.png"),
            "white": loadImage("assets/whiteking.png"),
        }
    }
    static setVolume(volume) {

    }
}