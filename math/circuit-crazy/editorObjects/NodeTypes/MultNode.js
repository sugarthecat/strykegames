class MultNode extends EditorNode {
    constructor(x, y) {
        super(x, y, 40, 40, Assets.multNode, ["Factor #1", "Factor #2"], ["Product"]);
    }
    static getSymbol(){
        return Assets.multNode;
    }
    static getWidth(){
        return 40;
    }
    static getHeight(){
        return 40;
    }
    getFunction(){
        return ((inputs) => {return [inputs[0]*inputs[1]]})
    }
}