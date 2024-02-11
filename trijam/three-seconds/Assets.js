 class Assets{

    static loadAssets(){
        this.nuclearSymbol = loadImage("assets/nuclear.png")
        this.winsound = loadSound("assets/win.mp3")
        this.explosion = loadSound("assets/explosion.mp3")
        this.click = loadSound("assets/click.mp3")
        this.crumple = loadSound("assets/crumple.mp3")
        this.nuclearSymbol = loadImage("assets/nuclear.png")
        this.detonateRed = loadImage("assets/detonatered.png")
        this.stopRed = loadImage("assets/stopred.png")
        this.detonateGreen = loadImage("assets/detonategreen.png")
        this.stopGreen = loadImage("assets/stopgreen.png")
        this.stickynotes = []
        for(let i =0; i<5;i++){
            this.stickynotes.push(loadImage(`assets/stickynote${i+1}.png`))
        }
    }
    static setVolume(volume){
    }
}