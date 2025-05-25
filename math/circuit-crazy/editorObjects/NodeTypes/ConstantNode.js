class ConstantNode extends EditorNode {
    constructor(x, y) {
        super(x, y, 100, 40, Assets.constantNode, [], ["Constant number"]);
        this.value = 1;
    }
    static getSymbol() {
        return Assets.constantNode;
    }
    static getWidth() {
        return 100;
    }
    static getHeight() {
        return 40;
    }
    hasInteraction(x, y) {
        if (x < -20) {
            this.value--;
        } else if (x > 20) {
            this.value++;
        } else {
            return false;
        }
        if (this.value < -99) {
            this.value = -99
        } else if (this.value > 99) {
            this.value = 99;
        }
        return true;
    }
    static DrawSymbol(x, y) {
        push()
        image(this.getSymbol(), x, y, this.getWidth(), this.getHeight())
        textSize(25)
        textFont("Courier New")
        fill(255)
        text(1, x + this.getWidth() / 2, y + this.getHeight() / 2 + 6)
        pop()
    }
    getFunction() {
        let val = this.value
        return ((inputs) => { return [val] })
    }
    Draw() {
        push()
        image(this.image, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height)
        textSize(25)
        textFont("Courier New")
        fill(255)
        text(this.value, this.x, this.y + 6)
        pop()

    }
}