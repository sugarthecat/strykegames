class Assets{

    static loadAssets(){
        this.hackFont = loadFont("assets/Hacked-KerX.ttf")
        this.player = loadImage("assets/player.png")
        this.rangedEnemy = loadImage("assets/rifle.png")
        this.meleeEnemy = loadImage("assets/knife.png")
        this.gunshot = loadSound("assets/gunshot.mp3")
        this.keyboard = loadSound("assets/keyboard.mp3")
        this.ouch = loadSound("assets/ouch.mp3")
        this.newLevel = loadSound("assets/newLevel.mp3")
        this.stab = loadSound("assets/stab.mp3")
        this.music = loadSound("assets/music.mp3")
        this.gunjam = loadSound("assets/gunjam.mp3")
    }
}