class LevelSelectScreen extends GUI {
    constructor() {
        super();
        this.elements = [new Button(20, 20, 50, 50, "X", function () { screenOn = "title" })]
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                let levelTo = i * 4 + j
                this.elements.push(new Button(110 + j * 100, 50 + i * 80, 80, 50, levelTo + 1, function () { 
                    screenOn = "game"; 
                    level = levelTo; 
                    screens.game.NewLevel()
                    Assets.alarm.play();
                }))
            }
        }
        this.backgroundColor = color(200, 150, 0)
    }
    DrawBackground() {
        //update
        for (let i = 0; i < this.elements.length; i++) {
            this.elements[i].hidden = i > highestLevel+1
        }
        //bomba
        super.DrawBackground();
        push()
        translate(300, 200)
        rotate(frameCount * 0.01)
        image(Assets.nuclearSymbol, -250, -250, 500, 500)
        pop()
    }
}