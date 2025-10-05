let backgroundSecs = 0
class GUI{
    constructor(){
        this.elements = []
    }
    Draw(x,y){
        backgroundSecs += deltaTime / 10000
        //image (Assets.background,0,0,600,400)
        this.DrawElements(x,y);
    }
    DrawElements(x,y){
        for(let i = 0; i<this.elements.length; i++){
            this.elements[i].Draw(x,y);
        }

    }
    HandleClick(x,y){
        for(let i = 0; i<this.elements.length; i++){
            this.elements[i].HandleClick(x,y)
        }
    }
    HandleMouseDown(x,y){
        //nothing
    }
}