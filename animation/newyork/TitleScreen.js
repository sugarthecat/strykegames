class TitleScreen extends GUI {
    constructor() {
        super();
    }
    Draw(x,y){
        push ()
        fill (255)
        textAlign(CENTER)
        textSize (24)
        text("Homecoming",300,50)
        textSize (18)
        text("A Playable Poem.",300,70)
        textSize (12)
        text("(Click anywhere to continue.)",300,370)
        pop ()
    }
    HandleClick(x,y){
        screenOn = "animation"
        screens.animation = new AnimationScreen(2)
    }
}