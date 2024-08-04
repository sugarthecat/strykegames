class Assets {

    static loadAssets() {
        this.map = loadImage("assets/map.png")
        this.pillar = loadImage("assets/pillar.png")
        this.detective = loadImage("assets/detective.png")
        this.robber = loadImage("assets/robber.png")
        this.title = loadImage("assets/title.png")
        this.money = loadImage("assets/money.png")
        this.theme = loadSound("assets/theme.m4a")
        this.theme.setVolume(0.5)
        this.gunshot = loadSound("assets/gunshot.m4a")
        this.car = loadImage("assets/car.png")
    }
}