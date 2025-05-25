class ExpNode extends EditorNode {
    constructor(x, y) {
        super(x, y, 40, 40, Assets.expNode, ["Base", "Exponent"], ["Exponent"]);
    }
    static getSymbol() {
        return Assets.expNode;
    }
    static getWidth() {
        return 40;
    }
    static getHeight() {
        return 40;
    }
    getFunction() {
        return ((inputs) => { return [floor(inputs[0] ** inputs[1])] })
    }
}