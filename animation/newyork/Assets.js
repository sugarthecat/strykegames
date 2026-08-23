 class Assets{

    static async loadAssets(){
        this.fonts = {
            quantico: await loadFont("assets/quantico.ttf"),
            badeen: await loadFont("assets/badeen.ttf")
        }
    }
}