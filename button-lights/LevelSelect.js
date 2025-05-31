class LevelSelectScreen extends GUI {
    constructor() {
        super();
        this.elements = [
            new GUIText(100, 13, 400, 100, "Level Select"),
            new Button(20, 20, 50, 50, "X", function () { screenOn = "title" })]
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 3; j++) {
                let levelTo = i * 3 + j
                this.elements.push(new Button(160 + j * 100, 130 + i * 80, 80, 50, levelTo + 1, function () { 
                    screenOn = "game"; 
                    level = levelTo; 
                    screens.game.NewLevel()
                }))
            }
        }
        this.backgroundColor = color(100)
    }
    DrawBackground() {
        //update
        for (let i = 0; i < this.elements.length; i++) {
            this.elements[i].hidden = i > highestLevel+1
        }
        //bomba
        super.DrawBackground();
        DrawTitleGrid()
        fill(200)
        stroke(0)
        strokeWeight(5)
        rect(100, 25, 400, 75)
    }
}