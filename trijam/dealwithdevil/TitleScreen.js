
class TitleScreen{
    static Draw(){
        background(0);
        fill (50,0,0)
        noStroke();
        rect (0,0,600,400)
        textAlign(CENTER);
        stroke(200,0,0)
        fill (150,0,0)
        textSize( 120)
        text("UNHOLY",300,150)

        textSize( 40)
        stroke(200,0,0)
        if(mouseInRange(240,160,120,50)){
            fill (10,0,0)
        }else{
            fill (80,0,0)
        }
        rect(240,160,120,50)
        fill (150,0,0)
        text("Play",300,200)
        
        
    }
    static HandleClick(){
        if(mouseInRange(240,160,120,50)){
            screenOn = "game"
            Game.NewGame();
        }
    }
}