class EditorScreen extends GUI {
    constructor() {
        super();
        this.itemsAvailable = [ConstantNode, AddNode, DivNode, SubNode, MultNode, FactorialNode, InputNode, OutputNode]
        this.tableObjects = []
        this.inputs = []
        this.itemSelected = false;
        this.instructions = ""
        this.itemTypeSelected = '';
        this.tableXOffset = 0;
        this.tableYOffset = 0;
        this.menuYOffset = 0;

        let ref = this;
        this.verifierOutput;
        this.reviewingAnswers = false;
        this.answerReviewProg = 0;
        this.elements.push(new Button(380, 55, 60, 30, "Play", function () {
            ref.reviewingAnswers = true;
            ref.verifierOutput = VerifyCurrentSolution();
        }))
        this.elements.push(new Button(380, 15, 60, 30, "☰", function () { screenOn = "levelselect"; }))
    }
    Reset(itemsAvailable = [ConstantNode], inputs = [], instructions = "") {
        this.itemsAvailable = itemsAvailable;
        this.inputs = inputs;
        this.instructions = instructions;
        this.tableObjects = []
        this.tableXOffset = 0;
        this.tableYOffset = 0;
        this.menuYOffset = 0;
        this.reviewingAnswers = false;
        this.answerReviewProg = 0;
    }
    Draw(x, y) {
        //deselect item if let go
        this.UpdateItemSelection(x, y);
        //draw background
        push()

        background(241, 234, 210)
        for (let i = -OFFSET.x + (frameCount / 10 % 50); i < 800 + OFFSET.x; i += 50) {
            stroke(230, 222, 194)
            strokeWeight(25)
            line(i, -OFFSET.y, i - 200, 400 + OFFSET.y)
        }
        pop()
        this.DrawTableObjects(x, y);
        fill(195, 66, 59)
        rect(400, -OFFSET.y, 10, OFFSET.y * 2 + 400)
        fill(214, 207, 180)
        rect(410, -OFFSET.y, 290 + OFFSET.x, OFFSET.y * 2 + 400)
        //draw menu
        push()
        translate(0, this.menuYOffset)
        let vertOffset = 20 - OFFSET.y
        for (let i = 0; i < this.itemsAvailable.length; i++) {
            this.itemsAvailable[i].DrawSymbol((405 + 600 + OFFSET.x - this.itemsAvailable[i].getWidth()) / 2, vertOffset)
            vertOffset += this.itemsAvailable[i].getHeight() * 1.2;
        }
        pop()
        this.DrawSelectedItem(x, y);
        this.DrawLabels(x, y);
        super.Draw(x, y)
        this.DrawInstructions()
        if (this.reviewingAnswers) {
            this.answerReviewProg += deltaTime / 1000;
            fill(255)
            rect(50, 25, 500, 350 * min(this.answerReviewProg, 1))
            if (this.answerReviewProg > 1) {
                fill(0)
                textSize(15)
                textAlign(CENTER)
                text("Input".substring(0, (this.answerReviewProg - 1) * 10), 150, 50)
                text("Your Answer".substring(0, (this.answerReviewProg - 1.5) * 25), 300, 50)
                text("Correct Answer".substring(0, (this.answerReviewProg - 2) * 25), 450, 50)
            }
            push()
            if (this.answerReviewProg > 3) {
                let progOffset = -3;
                for (let i = 0; i < this.verifierOutput.cases.length; i++) {
                    let offsetProg = this.answerReviewProg + progOffset;
                    if (offsetProg > 0) {
                        fill(0)
                        textSize(25)
                        textStyle(BOLD)
                        text(this.verifierOutput.cases[i].input.join(", "), 150, 100 + i * 50)
                        if (offsetProg > 1) {
                            if (this.verifierOutput.cases[i].correct == this.verifierOutput.cases[i].output) {
                                fill(0, 180, 0)
                            }
                            else {
                                fill(180, 0, 0)
                            }
                        }
                        text(this.verifierOutput.cases[i].output, 300, 100 + i * 50)
                        fill(0)
                        text(floor(this.verifierOutput.cases[i].correct * min(offsetProg * 2, 1)), 450, 100 + i * 50)

                    }
                    progOffset -= 1.5;
                }
            }
            if (this.answerReviewProg > 12) {
                if (this.verifierOutput.success) {
                    fill(0, 180, 0)
                    text("Correct!", 200, 350)
                    if (x > 350 && x < 550 && y > 325 && y < 375) {
                        fill(0, 120, 0)
                    }
                    rect(350, 325, 200, 50)
                    fill(255)
                    text("Level Select", 435, 360)
                } else {
                    fill(180, 0, 0)
                    text(`${floor(100 * this.verifierOutput.successRate)}% Accurate`, 200, 350)
                    if (x > 350 && x < 550 && y > 325 && y < 375) {
                        fill(120, 0, 0)
                    }
                    rect(350, 325, 200, 50)
                    fill(255)
                    text("Retry", 435, 360)
                }
            }

            pop()
        }
    }
    DrawTableObjects(x, y) {

        push()
        translate(this.tableXOffset, this.tableYOffset)
        for (let i = 0; i < this.tableObjects.length; i++) {
            this.tableObjects[i].DrawCircuitLayer1();
        }
        for (let i = 0; i < this.tableObjects.length; i++) {
            this.tableObjects[i].DrawCircuitLayer2();
        }
        fill(195, 66, 59)
        for (let i = 0; i < this.tableObjects.length; i++) {
            this.tableObjects[i].Draw();
            this.tableObjects[i].Update();
            if ((this.itemTypeSelected == "outputNode" && this.itemSelected) || !this.itemSelected) {
                for (let j = 0; j < this.tableObjects[i].inputs.length; j++) {
                    if (this.tableObjects[i].animProgress < 1) {
                        continue;
                    }
                    let pos = this.tableObjects[i].GetInputPosition(j);
                    if (dist(pos.x, pos.y, x - this.tableXOffset, y - this.tableYOffset) < 50) {
                        circle(pos.x, pos.y, 15)
                    }
                }
            }
            if ((this.itemTypeSelected == "inputNode" && this.itemSelected) || !this.itemSelected) {
                for (let j = 0; j < this.tableObjects[i].outputs.length; j++) {
                    if (this.tableObjects[i].animProgress < 1) {
                        continue;
                    }
                    let pos = this.tableObjects[i].GetOutputPosition(j);
                    if (dist(pos.x, pos.y, x - this.tableXOffset, y - this.tableYOffset) < 50) {
                        circle(pos.x, pos.y, 15)
                    }

                }
            }
        }
        pop()
    }
    DrawInstructions() {

        push()
        textSize(20)
        textAlign(CENTER)
        let words = this.instructions.split(" ");
        let yPos = 40 - OFFSET.y;
        while (words.length > 0) {
            //print a line
            let newLine = [words.shift()];
            let textW = textWidth(newLine[0])
            while (textW < 360 && words.length > 0) {
                newLine.push(words.shift());
                textW += textWidth(" " + newLine[newLine.length - 1])
            }
            if (textW > 360) {
                words.unshift(newLine.pop());
            }
            let newLineStr = newLine.join(" ")

            fill(255)
            rect(190 - OFFSET.x / 2 - textWidth(newLineStr) / 2, yPos - 15, textWidth(newLineStr) + 20, 20)
            fill(0)
            text(newLineStr, 200 - OFFSET.x / 2, yPos)
            yPos += 25;
        }
        pop()
    }
    DrawLabels(x, y) {
        push()
        translate(this.tableXOffset, this.tableYOffset)
        for (let i = 0; i < this.tableObjects.length; i++) {
            if ((this.itemTypeSelected == "outputNode" && this.itemSelected) || !this.itemSelected) {
                for (let j = 0; j < this.tableObjects[i].inputs.length; j++) {
                    if (this.tableObjects[i].animProgress < 1) {
                        continue;
                    }

                    let pos = this.tableObjects[i].GetInputPosition(j);
                    if (dist(pos.x, pos.y, x - this.tableXOffset, y - this.tableYOffset) < 15) {
                        this.tableObjects[i].DrawInputLabel(j)
                    }
                }
            }
            if ((this.itemTypeSelected == "inputNode" && this.itemSelected) || !this.itemSelected) {
                for (let j = 0; j < this.tableObjects[i].outputs.length; j++) {
                    if (this.tableObjects[i].animProgress < 1) {
                        continue;
                    }
                    let pos = this.tableObjects[i].GetOutputPosition(j);
                    if (dist(pos.x, pos.y, x - this.tableXOffset, y - this.tableYOffset) < 15) {
                        this.tableObjects[i].DrawOutputLabel(j)
                    }

                }
            }
        }
        pop()
    }
    EvaluateForInput(inputArr) {
        let updating = true;
        let discoveredValues = [];
        let undiscoveredValues = []
        for (let i = 0; i < this.tableObjects.length; i++) {
            if (this.tableObjects[i] instanceof InputNode) {
                discoveredValues.push([this.tableObjects[i], inputArr]);
            } else {
                undiscoveredValues.push(this.tableObjects[i])
            }
        }
        while (updating) {
            updating = false;
            for (let i = 0; i < undiscoveredValues.length; i++) {
                if (undiscoveredValues[i].CanEvaluate(discoveredValues)) {
                    if (undiscoveredValues[i] instanceof OutputNode) {
                        return { complete: true, output: undiscoveredValues[i].Evaluate(discoveredValues)[0] }
                    }
                    discoveredValues.push([undiscoveredValues[i], undiscoveredValues[i].Evaluate(discoveredValues)])
                    undiscoveredValues.splice(i, 1)
                    i--;
                    updating = true;
                }
            }
        }
        return { complete: false, output: 0 }
    }
    DrawSelectedItem(x, y) {

        //Draw selected item
        if (this.itemSelected) {
            if (this.itemTypeSelected == "blueprint") {
                this.itemSelected.DrawSymbol(x - this.itemSelected.getWidth() / 2, y - this.itemSelected.getHeight() / 2)
            } else if (this.itemTypeSelected == "instance") {
                this.itemSelected.x = x - this.tableXOffset;
                this.itemSelected.y = y - this.tableYOffset;
            } else if (this.itemTypeSelected == "table") {
                this.tableXOffset += x - this.itemSelected.x
                this.tableYOffset += y - this.itemSelected.y
                this.itemSelected.x = x;
                this.itemSelected.y = y;
            } else if (this.itemTypeSelected == "menu") {
                this.menuYOffset += y - this.itemSelected.y
                this.itemSelected.y = y;
                let vertOffset = 20 - OFFSET.y
                for (let i = 0; i < this.itemsAvailable.length; i++) {
                    vertOffset += this.itemsAvailable[i].getHeight() * 1.2;
                }
                this.menuYOffset = constrain(this.menuYOffset, min(0, 400 - OFFSET.y * 2 - vertOffset), 0)
            } else if (this.itemTypeSelected == "inputNode") {
                push()
                stroke(195, 66, 59)
                strokeWeight(5)
                line(
                    this.itemSelected.obj.GetInputPosition(this.itemSelected.idx).x + this.tableXOffset,
                    this.itemSelected.obj.GetInputPosition(this.itemSelected.idx).y + this.tableYOffset,
                    x,
                    min(y, this.itemSelected.obj.GetInputPosition(this.itemSelected.idx).y + this.tableYOffset)
                )
                pop()
            } else if (this.itemTypeSelected == "outputNode") {
                push()
                stroke(195, 66, 59)
                strokeWeight(8)
                line(
                    this.itemSelected.obj.GetOutputPosition(this.itemSelected.idx).x + this.tableXOffset,
                    this.itemSelected.obj.GetOutputPosition(this.itemSelected.idx).y + this.tableYOffset,
                    x,
                    max(y, this.itemSelected.obj.GetOutputPosition(this.itemSelected.idx).y + this.tableYOffset)
                )
                pop()
            }
        }
    }
    UpdateItemSelection(x, y) {
        if (this.itemSelected && !mouseIsPressed) {
            if (this.itemTypeSelected == "blueprint") {
                if (x < 400) {
                    if (this.itemSelected == OutputNode) {
                        for (let i = 0; i < this.tableObjects.length; i++) {
                            if (this.tableObjects[i] instanceof OutputNode) {
                                this.tableObjects[i].isDead = true;
                                this.tableObjects.splice(i, 1);
                                i--;
                            }
                        }
                    }
                    this.tableObjects.push(new this.itemSelected(x - this.tableXOffset, y - this.tableYOffset))
                    if (this.itemSelected == InputNode) {
                        this.tableObjects[this.tableObjects.length - 1].outputs = this.inputs;
                    }

                }
            } else if (this.itemTypeSelected == "instance") {
                if (x > 400) {
                    //delete node
                    this.itemSelected.isDead = true;
                    this.tableObjects.splice(this.tableObjects.indexOf(this.itemSelected), 1);

                }
            } else if (this.itemTypeSelected == "inputNode") {

                for (let i = 0; i < this.tableObjects.length; i++) {
                    for (let j = 0; j < this.tableObjects[i].outputs.length; j++) {
                        let pos = this.tableObjects[i].GetOutputPosition(j);
                        if (dist(pos.x, pos.y, x - this.tableXOffset, y - this.tableYOffset) < 15
                        ) {
                            this.itemSelected.obj.ConnectInputToOutput(this.itemSelected.idx, this.tableObjects[i], j);
                        }

                    }
                }
            } else if (this.itemTypeSelected == "outputNode") {

                for (let i = 0; i < this.tableObjects.length; i++) {
                    for (let j = 0; j < this.tableObjects[i].inputs.length; j++) {
                        let pos = this.tableObjects[i].GetInputPosition(j);
                        if (dist(pos.x, pos.y, x - this.tableXOffset, y - this.tableYOffset) < 15
                        ) {
                            this.tableObjects[i].ConnectInputToOutput(j, this.itemSelected.obj, this.itemSelected.idx);
                        }

                    }
                }
            }
            this.itemSelected = false;
        }

    }
    mousePressed(x, y) {
        if (this.reviewingAnswers) {
            //pass
        } else if (x < 400) {
            //select heavy object
            for (let i = 0; i < this.tableObjects.length; i++) {
                let node = this.tableObjects[i]
                if (mouseInRange(node.x - node.width / 2 + this.tableXOffset,
                    node.y - node.height / 2 + this.tableYOffset,
                    node.width,
                    node.height)) {
                    if (!node.hasInteraction(x - this.tableXOffset - node.x,
                        y - this.tableYOffset - node.y)) {
                        this.itemSelected = node;
                        this.itemTypeSelected = "instance"
                    }
                    return
                }
            }
            //or wire
            for (let i = 0; i < this.tableObjects.length; i++) {
                for (let j = 0; j < this.tableObjects[i].inputs.length; j++) {
                    let pos = this.tableObjects[i].GetInputPosition(j);
                    if (dist(pos.x, pos.y, x - this.tableXOffset, y - this.tableYOffset) < 15) {
                        this.tableObjects[i].ClearInputNode(j)
                        this.itemTypeSelected = "inputNode"
                        this.itemSelected = { obj: this.tableObjects[i], idx: j }
                        return;
                    }
                }
                for (let j = 0; j < this.tableObjects[i].outputs.length; j++) {
                    let pos = this.tableObjects[i].GetOutputPosition(j);

                    if (dist(pos.x, pos.y, x - this.tableXOffset, y - this.tableYOffset) < 15) {
                        this.itemTypeSelected = "outputNode"
                        this.itemSelected = { obj: this.tableObjects[i], idx: j }
                        return;
                    }
                }
            }
            //or the ground 
            if (this.itemSelected == false) {
                this.itemTypeSelected = "table"
                this.itemSelected = { x: x, y: y }
            }
        } else if (x > 410) {
            //select "menu" object
            let vertOffset = 20 - OFFSET.y
            for (let i = 0; i < this.itemsAvailable.length; i++) {
                if (mouseInRange(
                    (405 + 600 + OFFSET.x - this.itemsAvailable[i].getWidth()) / 2,
                    vertOffset + this.menuYOffset,
                    this.itemsAvailable[i].getWidth(),
                    this.itemsAvailable[i].getHeight())) {
                    this.itemSelected = this.itemsAvailable[i];
                    this.itemTypeSelected = "blueprint";
                    return;
                }
                vertOffset += this.itemsAvailable[i].getHeight() * 1.2;
            }
            //or the menu back
            if (this.itemSelected == false) {
                this.itemTypeSelected = "menu"
                this.itemSelected = { y: y }
            }
        }
    }
    HandleClick(x, y) {
        if (this.reviewingAnswers) {
            if (x > 350 && x < 550 && y > 325 && y < 375) {
                if (this.verifierOutput.success) {
                    screenOn = "levelselect";
                    if (levelOn == levelsUnlocked) {
                        levelsUnlocked++;
                        localStorage.setItem("levelsUnlocked", levelsUnlocked);
                        screens.levelselect.ResetLevels();
                    }
                }
                else {
                    this.reviewingAnswers = false;
                    this.answerReviewProg = 0;
                }
            }
        } else {
            super.HandleClick(x, y)
        }
    }
}