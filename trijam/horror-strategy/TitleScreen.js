class TitleScreen extends GUI {
    constructor() {
        super();
        this.backgroundColor = color(0)
        this.elements = [new Button(150, 300, 300, 60, "Play", function(){
            screenOn = "game";
            player = new Player();
            gameTime = 0
            //other game init stuff here
        })]
    }
    DrawBackground(){
        super.DrawBackground()
        image(Assets.titleScreen,0,0,600,400)
    }
}