class LevelSelectScreen extends GUI{
    constructor(){
        super();
        this.elements = [
            new Button(25, 150, 150, 50, "University", function(){screenOn = "game", screens.game.Reset( new University())}),
            new Button(225, 150, 150, 50, "Skyscraper", function(){screenOn = "game", screens.game.Reset( new Skyscraper())}),
            new Button(425, 150, 150, 50, "Area51", function(){screenOn = "game", screens.game.Reset( new Area51())}),
            new Button(10, 10, 100, 50, "Back", function(){screenOn = "title"}),
        ]
    }
    Draw(x,y){
        image(Assets.screens.levelselectscreen,0,0,600,400);
        super.Draw(x,y);
    }
}