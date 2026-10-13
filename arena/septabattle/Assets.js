class Assets {

    static loadAssets() {
        this.houston = {
            main: loadImage("assets/houstonboss.png"),
            rocket: loadImage("assets/houstonrocket.png"),
            gun: loadImage("assets/houstongun.png"),
            bullet: loadImage("assets/houstonbullet.png"),
            mini: loadImage("assets/houstonmini.png")
        }
        this.oculus = {
            main: loadImage("assets/oculusboss.png"),
            mini: loadImage("assets/oculusmini.png")
        }
        this.magus = {
            main: loadImage("assets/magusboss.png"),
            mini: loadImage("assets/magusmini.png")
        }
    }
    static setVolume(volume) {
    }
}