class TitleScreen extends GUI {
    constructor() {
        super();
        this.elements = [new Button(100, 200, 400, 50, "Play", function(){screenOn = "levelSelect"})]
    }
}