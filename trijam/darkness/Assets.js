class Assets {

    static loadAssets() {
        this.font = loadFont("assets/OpenSans-Regular.ttf")
        this.demonmusic = loadSound("assets/demon-music.mp3")
        this.heavenmusic = loadSound("assets/heaven-music.mp3")

        this.angels = [];
        for (let i = 1; i <= 4; i++) {
            this.angels.push(loadImage("assets/angel" + i + ".png"))
        }
        this.player = loadImage("assets/player.png")
        this.demon = loadImage("assets/demon.png")
        this.cloudtile = loadImage("assets/cloudtile.png")
        this.fence = loadImage("assets/fence.png")
        this.sins = [];
        for (let i = 1; i <= 2; i++) {
            this.sins.push(loadImage("assets/sin" + i + ".png"))
        }
    }
    static setVolume(volume) {
        this.demonmusic.setVolume(volume / 2)
        this.heavenmusic.setVolume(volume / 2)
    }
    static playDemon() {
        if (this.demonmusic.isPaused()) {
            this.demonmusic.play();
            this.heavenmusic.pause();
        }
    }
    static playHeaven() {
        if (this.heavenmusic.isPaused()) {
            this.heavenmusic.play();
            this.demonmusic.pause();
        }
    }
    static checkMusic() {
        if (!this.demonmusic.isPlaying() && !this.heavenmusic.isPlaying()) {
            this.heavenmusic.loop();
            this.demonmusic.loop();
            this.demonmusic.pause();
        }
    }
}