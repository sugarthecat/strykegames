class TitleScreen extends GUI {
    constructor() {
        super();
        this.elements = [
            new Button(200, 275, 200, 50, "Play", function(){screenOn = "levelselect"}),
        ]
    }
    Draw(x,y){
        image(Assets.screens.titlescreen,0,0,600,400);
        super.Draw(x,y);
    }
}