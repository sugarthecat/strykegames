class GUI{
    constructor(){
        this.elements = []
    }
    Draw(x,y){
        for(let i = 0; i<this.elements.length; i++){
            this.elements[i].Draw(x,y);
        }
    }
    HandleClick(x,y){
        for(let i = 0; i<this.elements.length; i++){
            this.elements[i].HandleClick(x,y)
        }
    }
    mousePressed(x,y){

    }
}