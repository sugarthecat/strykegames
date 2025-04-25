class Assets {

    static loadAssets() {
        this.nuclearSymbol = loadImage("assets/nuclear.png")
        this.winsound = loadSound("assets/win.mp3")
        this.explosion = loadSound("assets/explosion.mp3")
        this.alarm = loadSound("assets/alarm.mp3")
        this.music = loadSound("assets/music.mp3")
        this.click = loadSound("assets/click.mp3")
        this.crumple = loadSound("assets/crumple.mp3")
        this.nuclearSymbol = loadImage("assets/nuclear.png")
        this.detonateRed = loadImage("assets/detonatered.png")
        this.stopRed = loadImage("assets/stopred.png")
        this.detonateGreen = loadImage("assets/detonategreen.png")
        this.stopGreen = loadImage("assets/stopgreen.png")
        this.yellowButton = loadImage("assets/yellowButton.png")
        this.indicatorCover = loadImage("assets/indicatorcover.png")
        this.stickynotes = []
        for (let i = 0; i < 5; i++) {
            this.stickynotes.push(loadImage(`assets/stickynote${i + 1}.png`))
        }
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