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
        this.win = loadImage("assets/win.png")
        this.superwin = loadImage("assets/superwin.png")
        this.titlescreen = loadImage("assets/title.png")

        this.logo = loadImage("assets/logo.png")
        
        this.fraud = loadImage("assets/fraud.png")
        this.paid = loadImage("assets/paid.png")

        this.blond = loadImage("assets/license2.png")
        this.black = loadImage("assets/license1.png")
        this.gray = loadImage("assets/license3.png")

        this.erase = loadSound("assets/erase.mp3")
        this.check = loadSound("assets/check.mp3")
        this.buttonclick = loadSound("assets/buttonclick.mp3")
        this.jailsound = loadSound("assets/jail.mp3")
        this.winsound = loadSound("assets/winsound.mp3")
        this.music = loadSound("assets/music.mp3");
    }
    static setVolume(volume) {
        this.erase.setVolume(volume);
        this.check.setVolume(volume)
        this.buttonclick.setVolume(volume);
        this.jailsound.setVolume(volume);
        this.winsound.setVolume(volume)
        this.music.setVolume(volume/2)
    }
}