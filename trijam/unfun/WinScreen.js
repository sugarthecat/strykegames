class WinScreen extends GUI {
    constructor() {
        super();
        this.elements = [new Button(250, 300, 100, 50, "Return", function(){screenOn = "title"}),
                new GUIText(200,100,200,100,"Taxes Paid!")]
    }
    Draw(){
        fill (255)
        rect (0,0,600,400)
        super.Draw();

    }
}