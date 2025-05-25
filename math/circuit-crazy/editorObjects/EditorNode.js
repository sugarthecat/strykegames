class EditorNode {
    constructor(x, y, width, height, symbol, inputs, outputs,) {
        this.inputs = []
        for (let i = 0; i < inputs.length; i++) {
            this.inputs.push({ label: inputs[i], conn: false })
        }
        this.outputs = outputs;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = symbol;
        this.animProgress = 0;
    }
    MoveTo(x, y) {
        this.x = x;
        this.y = y;
    }
    getFunction() {
        return (() => { return [] })
    }
    Update() {
        this.animProgress += deltaTime / 1000;
        this.animProgress = min(this.animProgress, 1);
    }
    CanEvaluate(values) {
        let canEval = true;
        for (let i = 0; i < this.inputs.length; i++) {
            if (!this.inputs[i].conn) {
                canEval = false;
                return;
            } else {
                let hasSatisfactoryMatch = false;
                for (let j = 0; j < values.length; j++) {
                    if (values[j][0] == this.inputs[i].conn.node) {
                        hasSatisfactoryMatch = true;
                    }
                }
                canEval = canEval && hasSatisfactoryMatch
            }
        }
        return canEval
    }
    Evaluate(values) {
        let functionInputs = []
        for (let i = 0; i < this.inputs.length; i++) {
            let conn = this.inputs[i].conn
            for (let j = 0; j < values.length; j++) {
                if (values[j][0] == conn.node) {
                    functionInputs.push(values[j][1][conn.idx])
                }
            }
        }
        return this.getFunction()(functionInputs)
    }
    GetInputPosition(index) {
        let prog = (this.animProgress);
        return { x: this.x + prog * (2 * (1 + index) / (1 + this.inputs.length) - 1) * this.width, y: this.y - prog * this.height * 0.8 }
    }
    GetOutputPosition(index) {
        let prog = (this.animProgress);
        return { x: this.x + prog * (2 * (1 + index) / (1 + this.outputs.length) - 1) * this.width, y: this.y + prog * this.height * 0.8 }
    }
    Draw() {
        this.animProgress += deltaTime / 1000;
        image(this.image, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height)
    }
    hasInteraction(x, y) {
        return false
    }
    DrawCircuitLayer1() {
        push()
        //draw nodes
        stroke(180, 60, 55)
        strokeWeight(8)
        this.DrawCircuitPaths();
        pop()
    }
    DrawCircuitLayer2() {
        push()
        //draw nodes
        stroke(195, 66, 59)
        strokeWeight(5)
        this.DrawCircuitPaths();
        pop()
    }
    DrawCircuitPaths() {
        let prog = sqrt(min(this.animProgress, 1))
        for (let i = 0; i < this.inputs.length; i++) {
            line(this.x, this.y, this.GetInputPosition(i).x, this.GetInputPosition(i).y)
            if (this.inputs[i].conn) {
                let pos = this.inputs[i].conn.node.GetOutputPosition(this.inputs[i].conn.idx)
                line(this.GetInputPosition(i).x, this.GetInputPosition(i).y, pos.x, pos.y)
                if (this.y < this.inputs[i].conn.node.y || this.inputs[i].conn.node.isDead) {
                    this.inputs[i].conn = false;
                }
            }
        }
        for (let i = 0; i < this.outputs.length; i++) {
            line(this.x, this.y, this.GetOutputPosition(i).x, this.GetOutputPosition(i).y)
        }

    }
    DrawOutputLabel(idx) {
        let pos = this.GetOutputPosition(idx)
        push()
        textAlign(LEFT)
        textSize(10)
        fill(255)
        rect(pos.x + 5, pos.y - 8, textWidth(this.outputs[idx]) + 10, 16)
        fill(0)
        text(this.outputs[idx], pos.x + 10, pos.y + 5)
        pop()
    }
    DrawInputLabel(idx) {
        let pos = this.GetInputPosition(idx)
        push()
        textAlign(LEFT)
        textSize(10)
        fill(255)
        rect(pos.x + 5, pos.y - 8, textWidth(this.inputs[idx].label) + 10, 16)
        fill(0)
        text(this.inputs[idx].label, pos.x + 10, pos.y + 5)
        pop()

    }
    ClearInputNode(idx) {
        this.inputs[idx].conn = false;
    }
    ConnectInputToOutput(idx, other, otherIdx) {
        this.inputs[idx].conn = { node: other, idx: otherIdx }
    }
    static getSymbol() {
        return Assets.ham;
    }
    static DrawSymbol(x, y) {
        push()
        image(this.getSymbol(), x, y, this.getWidth(), this.getHeight())
        pop()
    }
}