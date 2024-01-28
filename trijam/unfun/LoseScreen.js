class LoseScreen extends GUI {
    constructor() {
        super();
        this.elements = [new Button(250, 300, 100, 50, "Return", function () { screenOn = "title" })]
    }
    Draw(x,y) {
        image(Assets.jail, 0, 0, 600, 400)
        fill(255)
        image(Assets.fraud,200,200,200,100)
        super.Draw(x,y);
    }
}