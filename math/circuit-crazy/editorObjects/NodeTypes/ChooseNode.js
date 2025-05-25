class ChooseNode extends EditorNode {
    constructor(x, y) {
        super(x, y, 40, 40, Assets.chooseNode, ["N", "K"], ["N choose K"]);
    }
    static getSymbol() {
        return Assets.chooseNode;
    }
    static getWidth() {
        return 40;
    }
    static getHeight() {
        return 40;
    }
    getFunction() {
        return ((inputs) => {
            console.log(inputs)
            return [floor(factorial(inputs[0]) / (factorial(inputs[1]) * factorial(inputs[0] - inputs[1])))]
        })
    }
}