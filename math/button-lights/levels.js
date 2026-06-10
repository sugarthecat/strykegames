function getLevel(level) {
    let indicators = []
    let buttons = []
    switch (level) {
        case 0:
            for (let i = 0; i < 10; i++) {
                let tgtIndicator = new GameIndicator(75 + i * 50, 175, 30)
                indicators.push(tgtIndicator)
                buttons.push(new GameButton(75 + i * 50, 125, 40, function () {
                    tgtIndicator.Toggle();
                }))
            }
            for (let i = 0; i < 10; i++) {
                let tgtIndicator = new GameIndicator(75 + i * 50, 225, 30)
                indicators.push(tgtIndicator)
                buttons.push(new GameButton(75 + i * 50, 275, 40, function () {
                    tgtIndicator.Toggle();
                }))
            }
            break;
        case 1:
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 2 ** (3 - i); j++) {
                    let tgtIndicator = new GameIndicator(j * 50 * 2 ** (i) + 100 + 25 * (2 ** i), i * 50 + 150, 30)
                    indicators.push(tgtIndicator)
                }
            }
            for (let i = 0; i < 8; i++) {
                let index = i;
                buttons.push(new GameButton(i * 50 + 125, 100, 40, function () {

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
            buttons.push(new GameButton(225, 225, 40, function () {
                if (indicators[1].active && !indicators[2].active) {
                    indicators[2].active = true
                } else {
                    for (let i = 0; i < 6; i++) {
                        indicators[i].active = false;
                    }
                }
            }))
            //btn 2
            buttons.push(new GameButton(275, 225, 40, function () {
                if (!indicators[0].active) {
                    indicators[0].active = true
                } else {
                    for (let i = 0; i < 6; i++) {
                        indicators[i].active = false;
                    }
                }
            }))
            //btn 3
            buttons.push(new GameButton(325, 225, 40, function () {
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
            buttons.push(new GameButton(375, 225, 40, function () {
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
                buttons.push(buttonFlipper)
            }
            indicators.push(new GameIndicator(300, 200, 30))
            buttons.push(new GameButton(50, 200, 40, function () {
                indicators[10].Toggle();
                indicators[5].Toggle();
                indicators[0].Toggle();
            }))
            break;
        case 4:
            addLightsRow(indicators, 300, 175, 3)
            addLightsRow(indicators, 300, 225, 5)
            addLightsRow(indicators, 300, 275, 7)
            buttons.push(new GameButton(300, 125, 40, function () {
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
            buttons.push(new GameButton(400, 175, 40, function () {
                //toggle middle row
                let ind1 = indicators[7]
                let ind2 = indicators[13]
                ind1.Toggle();
                ind2.Toggle();

            }))
            buttons.push(new GameButton(100, 225, 40, function () {
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

            buttons.push(new GameButton(450, 200, 40, function () {
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
            buttons.push(new GameButton(150, 100, 40, function () {
                indicators[0].Toggle();
                indicators[1].Toggle();
                indicators[6].Toggle();
                indicators[7].Toggle();

            }))
            buttons.push(new GameButton(300, 350, 40, function () {
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
    }
    return { indicators: indicators, buttons: buttons }
}


function addLightsRow(indicators, x, y, count, gap = 50) {
    for (let i = 0; i < count; i++) {
        let tgtIndicator = new GameIndicator(x + gap / 2 - gap / 2 * count + gap * i, y, 30)
        indicators.push(tgtIndicator)
    }
}