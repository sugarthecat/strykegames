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
        this.logo = loadImage("assets/logo.webp")

        this.arcade = {
            carpet: loadImage("assets/arcadecarpet.webp"),
            arcade: loadImage("assets/arcademachine.webp"),
            prizebooth: loadImage("assets/prizebooth.webp"),
            chair: loadImage("assets/chair.webp"),
            table: loadImage("assets/table.webp"),
            pizzashop: loadImage("assets/pizzashop.webp"),
        }
    }
    static setVolume(volume) {

    }
}