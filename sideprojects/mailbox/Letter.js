class Letter extends GUI {
    constructor() {
        super();
        this.level = 0;
        this.elements = []
    }
    reset() {
        this.level = 0;
        this.elements = []
    }
    Draw(x, y) {
        push()
        fill (255)
        rect (0,0,600,400)
        pop()
        super.Draw(x, y)
    }
}