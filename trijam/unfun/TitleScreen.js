class TitleScreen extends GUI {
    constructor() {
        super();
        this.elements = [new Button(250, 300, 100, 50, "Play", function(){screenOn = "select"})]
    }
}