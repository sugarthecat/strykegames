class InputNode extends EditorNode {
    
    constructor(x, y ) {
        super(x, y, 80, 50, Assets.inputNode, [], ["Input Value"]);
    }
    static getSymbol(){
        return Assets.inputNode;
    }
    static getWidth(){
        return 80;
    }
    static getHeight(){
        return 50;
    }
}