class AddNode extends EditorNode {
    constructor(x, y) {
        super(x, y, 40, 40, Assets.addNode, ["Addend #1", "Addend #2"], ["Sum"]);
    }
    static getSymbol(){
        return Assets.addNode;
    }
    static getWidth(){
        return 40;
    }
    static getHeight(){
        return 40;
    }
    getFunction(){
        return ((inputs) => {return [inputs[0]+inputs[1]]})
    }
}