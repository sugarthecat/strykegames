class TitleScreen extends GUI {
    constructor() {
        super();
        this.elements = [new Button(100, 200, 400, 50, "Test", function(){console.log("clicked")})]
    }
}