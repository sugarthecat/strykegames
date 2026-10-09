 class Assets{

    static loadAssets(){
        this.title = {
            applications: loadImage("assets/applications.png"),
            chipdesign: loadImage("assets/chipdesign.png"),
            architecture: loadImage("assets/architecture.png"),
            research: loadImage("assets/research.png") ,
            core: loadImage("assets/core.png") 
        }
    }
    static setVolume(volume){
    }
}