class GUI{
    constructor(){
        this.elements = []
    }
    reset(){

    }
    mousePressed(x,y){

    }
    mouseReleased(x,y){
        
    }
    keyPressed(key){
        
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
}