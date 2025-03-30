class SubNode extends EditorNode {
    constructor(x, y) {
        super(x, y, 40, 40, Assets.subNode, ["Minuend", "Subtrahend"], ["Difference"]);
    }
    static getSymbol() {
        return Assets.subNode;
    }
    static getWidth() {
        return 40;
    }
    static getHeight() {
        return 40;
    }
    getFunction() {
        return ((inputs) => { return [inputs[0] - inputs[1]] })
    }
}