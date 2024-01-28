class TitleScreen extends GUI {
    constructor() {
        super();
        this.elements = [new Button(250, 300, 100, 50, "Play", function(){screenOn = "select"})]
    }
    Draw(x,y){
        image (Assets.titlescreen,0,0,600,400)
        super.Draw(x,y)
    }
}