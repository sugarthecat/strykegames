class Assets {

    static loadAssets() {
        this.typefont = loadFont("assets/COPYN.ttf")

        this.button = {
            checked: loadImage("assets/checked.png"),
            unchecked: loadImage("assets/unchecked.png")
        }
        this.govtpaper = loadImage("assets/govtpaper.png")
        this.crumpledpaper = loadImage("assets/crumpledpaper.png")

        this.jail = loadImage("assets/jail.png")
    }
    static setVolume(volume) {
    }
}