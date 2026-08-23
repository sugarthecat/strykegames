class GUI {
    constructor() {
        this.elements = []
    }
    Draw(x, y) {
        cursor(ARROW)
        for (let i = 0; i < this.elements.length; i++) {
            this.elements[i].Draw(x, y);
            if (this.elements[i].isHovering(x, y)) {
                cursor(HAND)
            }
        }
    }
    HandleClick(x, y) {
        for (let i = 0; i < this.elements.length; i++) {
            if (this.elements[i].isHovering(x, y)) {
                this.elements[i].HandleClick(x, y)
            }
        }
    }
}