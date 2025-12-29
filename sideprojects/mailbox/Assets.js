class Assets{
    static fonts = {}
    static simulator = {}
    static memoirPages = []
    static loadAssets(){
        this.fonts.handwriting = loadFont("Assets/pizzaFav.ttf")
        this.fonts.love = loadFont("Assets/heartEyes.ttf")
        this.simulator.background = loadImage("Assets/background.png")
        this.simulator.bffire = loadImage("Assets/bffire.png")
        this.simulator.bfchat = loadImage("Assets/bfchat.png")
        this.simulator.bfserve = loadImage("Assets/bfserve.png")
        this.simulator.bfstand = loadImage("Assets/bfstand.png")
        this.simulator.bfkiss = loadImage("Assets/bfkiss.png")

        this.simulator.plate = loadImage("Assets/plate.png")
        this.simulator.potato1 = loadImage("Assets/potato1.png")
        this.simulator.potato2 = loadImage("Assets/potato2.png")
        this.simulator.potato3 = loadImage("Assets/potato3.png")

        this.simulator.book1 = loadImage("Assets/book1.png")
        this.simulator.book2 = loadImage("Assets/book2.png")
        this.simulator.book3 = loadImage("Assets/book3.png")

        this.simulator.cake1 = loadImage("Assets/cake1.png")
        this.simulator.cake2 = loadImage("Assets/cake2.png")
        this.simulator.cake3 = loadImage("Assets/cake3.png")
        this.simulator.cake4 = loadImage("Assets/cake4.png")
        this.simulator.cake5 = loadImage("Assets/cake5.png")
        
        for(let i = 0; i<1; i++){
            this.memoirPages.push(loadImage(`Assets/memoir/page${i+1}.png`))
        }
    }
}