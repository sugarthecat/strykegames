class GUI {
    constructor() {
        this.elements = []
        this.backgroundColor = color(255)
    }
    Draw(x, y) {
        this.DrawBackground();
        this.DrawElements(x, y)
    }
    DrawElements(x, y) {
        for (let i = 0; i < this.elements.length; i++) {
            this.elements[i].Draw(x, y);
        }
    }
    DrawBackground() {
        fill(this.backgroundColor)
        rect(0, 0, 600, 400)
    }
    HandleClick(x, y) {
        for (let i = 0; i < this.elements.length; i++) {
            this.elements[i].HandleClick(x, y)
        }
    }
}