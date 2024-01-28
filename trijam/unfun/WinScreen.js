class WinScreen extends GUI {
    constructor() {
        super();
        this.elements = [new Button(250, 300, 100, 50, "Return", function () { screenOn = "title" })]
    }
    Draw(x,y) {
        if (difficulty == 5) {
            image(Assets.superwin, 0, 0, 600, 400)

        } else {
            image(Assets.win, 0, 0, 600, 400)
        }
        image(Assets.paid,200,200,200,100)
        super.Draw(x,y);

    }
}