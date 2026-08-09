class Assets {

    static loadAssets() {
        this.player = loadImage("assets/player.png")
        this.playerSurrendering = loadImage("assets/player2.png")
        this.enemies = [
            loadImage("assets/enemy.png"),
            loadImage("assets/enemy2.png"),
            loadImage("assets/enemy3.png"),
            loadImage("assets/enemy4.png"),
            loadImage("assets/enemy5.png")]
        this.backgrounds = {
            ussr: loadImage("assets/ussrbackground.png"),
            germany: loadImage("assets/germanybackground.png"),
            poland: loadImage("assets/polandbackground.png"),
        }
        this.characters = {
            radio: loadImage("assets/radio.png"),
            soldier: loadImage("assets/soldier.png"),
            injured: loadImage("assets/soldierInjured.png"),
            surrender: loadImage("assets/soldiersurrender.png"),
            officer: loadImage("assets/officer.png"),
            german: loadImage("assets/german.png"),
            explosion: loadImage("assets/explosion.png"),
        }
        this.gui = {
            norotate: loadImage("assets/norotate.png"),
            titleCard: loadImage("assets/titlecard.png"),
            deathCard: loadImage("assets/deathCard.png"),
            deathBackground: loadImage("assets/deathBackground.png")
        }
    }
    static setVolume(volume) {
    }
}