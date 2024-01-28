class DifficultySelectScreen extends GUI {
    constructor() {
        super();
        this.elements = [new Button(15, 15, 150, 40, "Return", function () { screenOn = "title" }),
        new Button(50, 100, 200, 40, "Citizen", function () {
            screenOn = "game"; difficulty = 0; screens["game"].NewLevel();
        }),
        new Button(350, 100, 200, 40, "Businessman", function () {
            screenOn = "game"; difficulty = 1; screens["game"].NewLevel();
        }),
        new Button(50, 200, 200, 40, "Clerk", function () {
            screenOn = "game"; difficulty = 2; screens["game"].NewLevel();
        }),
        new Button(350, 200, 200, 40, "Accountant", function () {
            screenOn = "game"; difficulty = 3; screens["game"].NewLevel();
        }),
        new Button(50, 300, 200, 40, "Financier", function () {
            screenOn = "game"; difficulty = 4; screens["game"].NewLevel();
        }),
        new Button(350, 300, 200, 40, "C.F.O.", function () {
            screenOn = "game"; difficulty = 5; screens["game"].NewLevel();
        }),
        new GUIText(200, 5, 300, 60, "Select Difficulty"),
    ]
    }
    Draw(x, y) {
        fill(200)
        rect(0, 0, 600, 400)
        super.Draw(x, y);
    }
}