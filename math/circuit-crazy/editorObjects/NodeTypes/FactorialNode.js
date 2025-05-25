class FactorialNode extends EditorNode {
    constructor(x, y) {
        super(x, y, 40, 40, Assets.factorialNode, ["N"], ["The Factorial of N"]);
    }
    static getSymbol() {
        return Assets.factorialNode;
    }
    static getWidth() {
        return 40;
    }
    static getHeight() {
        return 40;
    }
    getFunction() {
        return ((inputs) => {
            let prod = 1;
            for (let i = 1; i <= inputs[0]; i++) {
                prod *= i;
            }
            return [prod]
        })
    }
}