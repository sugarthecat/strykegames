class GameScreen extends GUI {
    constructor() {
        super();
        let ref = this
        this.elements = [
        ]
        this.backgroundColor = color(100)
        this.buttons = []
        this.indicators = []
    }
    isSolved() {
        let isSolved = true;
        for (let i = 0; i < this.indicators.length; i++) {
            isSolved = isSolved && this.indicators[i].active
        }
        return isSolved;
    }
    Draw(x, y) {
        super.Draw(x, y)
        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].Draw(x, y)
        }
        for (let i = 0; i < this.indicators.length; i++) {
            this.indicators[i].Draw(x, y)
        }
        if (this.isSolved()) {
            push()
            fill(255, 255, 255, 50)
            rect(0, 0, 600, 400)
            stroke(0)
            strokeWeight(5)
            fill(255)
            rect(200, 100, 200, 200)
            noStroke()
            fill(0)
            textSize(30)
            textAlign(CENTER)
            text("Solved!", 300, 150)
            this.elements[0].x = 250
            this.elements[0].y = 200
            this.elements[1].x = 250
            this.elements[1].y = 250
            this.elements[0].Draw(x, y)
            this.elements[1].Draw(x, y)
            highestLevel = max(highestLevel, level + 1)
            pop()
        }
    }
    HandleClick(x, y) {
        super.HandleClick(x, y);
        if (!this.isSolved()) {
            for (let i = 0; i < this.buttons.length; i++) {
                if (this.buttons[i].HandleClick(x, y)) {
                    return;
                }
            }
        }
    }
    NewLevel() {
        let ref = this;
        this.elements = [
            new Button(50, 10, 100, 30, "Levels", function () { screenOn = "levelSelect" }),
            new Button(450, 10, 100, 30, "Reset", function () { ref.NewLevel() })
        ]
        this.indicators = []
        this.buttons = []
        let indicators = this.indicators
        switch (level) {
            case 0:
                for (let i = 0; i < 10; i++) {
                    let tgtIndicator = new GameIndicator(75 + i * 50, 175, 30)
                    this.indicators.push(tgtIndicator)
                    this.buttons.push(new GameButton(75 + i * 50, 125, 40, function () {
                        tgtIndicator.Toggle();
                    }))
                }
                for (let i = 0; i < 10; i++) {
                    let tgtIndicator = new GameIndicator(75 + i * 50, 225, 30)
                    this.indicators.push(tgtIndicator)
                    this.buttons.push(new GameButton(75 + i * 50, 275, 40, function () {
                        tgtIndicator.Toggle();
                    }))
                }
                break;
            case 1:
                for (let i = 0; i < 4; i++) {
                    for (let j = 0; j < 2 ** (3 - i); j++) {
                        let tgtIndicator = new GameIndicator(j * 50 * 2 ** (i) + 100 + 25 * (2 ** i), i * 50 + 150, 30)
                        this.indicators.push(tgtIndicator)
                    }
                }
                for (let i = 0; i < 8; i++) {
                    let index = i;
                    this.buttons.push(new GameButton(i * 50 + 125, 100, 40, function () {

                        let listprog = 0;
                        for (let i = 0; i < 4; i++) {
                            if (!indicators[listprog + Math.floor(index / (2 ** i))].active) {
                                //stuff happens here
                                if (i == 0) {
                                    //first row, ez
                                    indicators[listprog + Math.floor(index / (2 ** i))].active = true
                                    return
                                } else {
                                    if (indicators[listprog - 2 ** (4 - i) + 2 * Math.floor(index / (2 ** i))].active
                                        && indicators[listprog - 2 ** (4 - i) + 2 * Math.floor(index / (2 ** i)) + 1].active) {
                                        indicators[listprog + Math.floor(index / (2 ** i))].active = true
                                    } else {
                                        let upperBound = listprog + Math.floor(index / (2 ** i))
                                        let lowerBound = upperBound;
                                        for (let j = 0; j <= i; j++) {
                                            for (let k = lowerBound; k <= upperBound; k++) {
                                                indicators[k].active = false;
                                            }
                                            upperBound -= 2 ** (4 + j - i) - Math.floor(index / (2 ** i)) * 2 ** (j) - 2 ** j
                                            lowerBound -= 2 ** (4 + j - i) - Math.floor(index / (2 ** i)) * 2 ** (j)
                                        }
                                    }
                                }
                                return;
                            }
                            listprog += 2 ** (3 - i)
                        }

                    }))
                }
                break;
            case 2:
                addLightsRow(indicators, 300, 175, 6, 40)
                //password: 231443
                //btn 1
                this.buttons.push(new GameButton(225, 225, 40, function () {
                    if (indicators[1].active && !indicators[2].active) {
                        indicators[2].active = true
                    } else {
                        for (let i = 0; i < 6; i++) {
                            indicators[i].active = false;
                        }
                    }
                }))
                //btn 2
                this.buttons.push(new GameButton(275, 225, 40, function () {
                    if (!indicators[0].active) {
                        indicators[0].active = true
                    } else {
                        for (let i = 0; i < 6; i++) {
                            indicators[i].active = false;
                        }
                    }
                }))
                //btn 3
                this.buttons.push(new GameButton(325, 225, 40, function () {
                    if (indicators[0].active && !indicators[1].active) {
                        indicators[1].active = true
                    } else if (indicators[4].active && !indicators[5].active) {
                        indicators[5].active = true
                    } else {
                        for (let i = 0; i < 6; i++) {
                            indicators[i].active = false;
                        }
                    }
                }))
                this.buttons.push(new GameButton(375, 225, 40, function () {
                    if (indicators[3].active && !indicators[4].active) {
                        indicators[4].active = true
                    } else if (indicators[2].active && !indicators[3].active) {
                        indicators[3].active = true
                    } else {
                        for (let i = 0; i < 6; i++) {
                            indicators[i].active = false;
                        }
                    }
                }))
                break;
            case 3:
                for (let i = 0; i < 10; i++) {
                    let index = i;
                    let tgtIndicator = new GameIndicator(300 + 100 * cos(i * PI * 2 / 10), 200 + 100 * sin(i * PI * 2 / 10), 30)
                    indicators.push(tgtIndicator)
                    let buttonFlipper = new GameButton(300 + 150 * cos(i * PI * 2 / 10), 200 + 150 * sin(i * PI * 2 / 10), 40
                        , function () {
                            indicators[(index + 9) % 10].Toggle();
                            indicators[index].Toggle();
                            indicators[(index + 1) % 10].Toggle();
                            indicators[10].Toggle();
                        })
                    this.buttons.push(buttonFlipper)
                }
                indicators.push(new GameIndicator(300, 200, 30))
                this.buttons.push(new GameButton(50, 200, 40, function () {
                    indicators[10].Toggle();
                    indicators[5].Toggle();
                    indicators[0].Toggle();
                }))
                break;
            case 4:
                addLightsRow(indicators, 300, 175, 3)
                addLightsRow(indicators, 300, 225, 5)
                addLightsRow(indicators, 300, 275, 7)
                this.buttons.push(new GameButton(300, 125, 40, function () {
                    //toggle middle row
                    let ind1 = indicators[1]
                    let ind2 = indicators[5]
                    let ind3 = indicators[11]
                    if (ind1.active == ind2.active) {
                        ind1.Toggle();
                        ind2.Toggle();
                        ind3.active = false;
                    }
                }))
                this.buttons.push(new GameButton(400, 175, 40, function () {
                    //toggle middle row
                    let ind1 = indicators[7]
                    let ind2 = indicators[13]
                    ind1.Toggle();
                    ind2.Toggle();

                }))
                this.buttons.push(new GameButton(100, 225, 40, function () {
                    //swap forward
                    let hold = indicators[0].active;
                    for (let i = 0; i + 1 < 3; i++) {
                        indicators[i].active = indicators[i + 1].active
                    }
                    indicators[2].active = hold
                    //swap forward - row 2
                    hold = indicators[3].active;
                    for (let i = 3; i + 1 < 8; i++) {
                        indicators[i].active = indicators[i + 1].active
                    }
                    indicators[7].active = hold
                    //swap forward - row 3
                    hold = indicators[8].active;
                    for (let i = 8; i + 1 < 15; i++) {
                        indicators[i].active = indicators[i + 1].active
                    }
                    indicators[14].active = hold
                }))
                break;
            case 5:
                for (let i = 0; i < 6; i++) {
                    addLightsRow(indicators, 300, 100 + 40 * i, 6, 40)
                }

                this.buttons.push(new GameButton(450, 200, 40, function () {
                    for (let j = 0; j < 6; j++) {
                        let hold = indicators[j * 6].active;
                        for (let i = j * 6; i + 1 < 6 + j * 6; i++) {
                            indicators[i].active = indicators[i + 1].active
                            if (i == 13 || i == 19 || i == 15 || i == 21) {
                                indicators[i].Toggle();
                            }
                        }
                        indicators[j * 6 + 5].active = hold
                    }
                }))
                this.buttons.push(new GameButton(150, 100, 40, function () {
                    indicators[0].Toggle();
                    indicators[1].Toggle();
                    indicators[6].Toggle();
                    indicators[7].Toggle();

                }))
                this.buttons.push(new GameButton(300, 350, 40, function () {
                    for (let j = 0; j < 6; j++) {
                        let hold = indicators[j].active;
                        for (let i = 0; i + 1 < 6; i++) {
                            indicators[j + i * 6].active = indicators[i * 6 + j + 6].active
                            if ((i == 3 || i == 1) && j >= 2 && j <= 3) {
                                indicators[j + i * 6].Toggle();
                            }
                        }
                        indicators[j + 5 * 6].active = hold
                    }
                }))
                break;
            case 6:

                break;
            case 7:

                break;
        }
    }

}

function addLightsRow(indicators, x, y, count, gap = 50) {
    for (let i = 0; i < count; i++) {
        let tgtIndicator = new GameIndicator(x + gap / 2 - gap / 2 * count + gap * i, y, 30)
        indicators.push(tgtIndicator)
    }
}