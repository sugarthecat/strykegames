class TitleScreen extends GUI {
    constructor() {
        super();
        this.elements = [new Button(100, 200, 400, 50, "Play", function(){
            screenOn = "dialog";
            screens.dialog.Load("Welcome!","Sherman")
        })]
    }
    Draw(x,y){
        
        super.Draw(x,y)
    }
}