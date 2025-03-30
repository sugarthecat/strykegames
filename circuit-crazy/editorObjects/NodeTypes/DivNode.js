class DivNode extends EditorNode {
    constructor(x, y) {
        super(x, y, 40, 40, Assets.divNode, ["Dividend", "Divisor"], ["Quotient","Remainder"]);
    }
    static getSymbol(){
        return Assets.divNode;
    }
    static getWidth(){
        return 40;
    }
    static getHeight(){
        return 40;
    }
    getFunction(){
        return ( (inputs)=> {
            if(inputs[1] == 0){
                return [0,inputs[0]]
            }
            return [(inputs[0] - inputs[0] % inputs[1]) / inputs[1], inputs[0] % inputs[1]]
        })
    }
}