class Assets {

    static loadAssets() {
        this.yellowButton = loadImage("assets/yellowButton.png")
        this.indicatorCover = loadImage("assets/indicatorcover.png")
    }
    static setVolume(volume) {
        this.winsound.setVolume(volume)
        this.explosion.setVolume(volume * 4)
        this.alarm.setVolume(volume * 2)
        this.music.setVolume(volume / 4)
        this.click.setVolume(volume)
        this.crumple.setVolume(volume)
    }
}