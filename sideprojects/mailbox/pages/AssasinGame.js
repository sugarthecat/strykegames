//idea: ex assasinator
//idea: flower planter
//idea: cookie maker
class AssasinGame extends GUI {
    constructor() {
        super();
    }
    reset() {
        this.time = 0;
        this.elements = [];
    }
    Draw(x, y) {
        this.time += deltaTime / 1000;
        push()
        noStroke()
        background(255)
        
        pop()
        super.Draw(x, y)
    }
}