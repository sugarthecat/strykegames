 class Assets{

    static loadAssets(){
        this.player = loadImage("assets/player.png")
        this.enemies = [loadImage("assets/enemy.png"),loadImage("assets/enemy2.png")]
        this.titleCard = loadImage("assets/titlecard.png")
        this.backgrounds = {
            ussr: loadImage("assets/ussrbackground.png"),
            poland: loadImage("assets/polandbackground.png"),
        }
        this.characters = {
            radio: loadImage("assets/radio.png"),
            soldier: loadImage("assets/soldier.png"),
            officer: loadImage("assets/officer.png"),
            explosion: loadImage("assets/explosion.png"),
        }
    }
    static setVolume(volume){
    }
}