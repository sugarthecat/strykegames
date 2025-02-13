class Assets{
    static fonts = {}
    static loadAssets(){
        this.fonts.handwriting = loadFont("Assets/pizzaFav.ttf")
        this.fonts.love = loadFont("Assets/heartEyes.ttf")
    }
}