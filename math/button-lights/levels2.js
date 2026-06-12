function getLevel(level) {
    let indicators = []
    let buttons = []
    switch (level) {
        case 0:
            addLightsRow(indicators, 300, 75, 6)
            addLightsRow(indicators, 300, 125, 6)
            addLightsRow(indicators, 300, 175, 6)
            addLightsRow(indicators, 300, 225, 6)
            addLightsRow(indicators, 300, 275, 6)
            addLightsRow(indicators, 300, 325, 6)
            buttons.push(new GameButton(75, 200, 40, function () {

                for (let i = 0; i < 3; i++) {
                    indicators[i * 6 + 2].Toggle();
                    indicators[i * 6 + 3].Toggle();
                }

            }))
            buttons.push(new GameButton(75, 150, 40, function () {
                let nextStatus = []
                for (let i = 0; i < 6; i++) {
                    nextStatus.push([])
                    for (let j = 0; j < 6; j++) {
                        if (j <= i && i < 5 - j) {
                            nextStatus[i].push(indicators[j * 6 + i + 1].active)
                        } else if (j < i) {
                            nextStatus[i].push(indicators[j * 6 + i + 6].active)
                        } else if (5 - i >= j) {
                            nextStatus[i].push(indicators[j * 6 + i - 6].active)
                        } else {
                            nextStatus[i].push(indicators[j * 6 + i - 1].active)
                        }
                    }
                }

                for (let i = 0; i < 6; i++) {
                    for (let j = 0; j < 6; j++) {
                        indicators[j * 6 + i].active = nextStatus[i][j]
                    }
                }
            }))
            break;
        case 1:

            for (let i = 0; i < 10; i++) {
                const rad = sqrt(i * 1200)
                let tgtIndicator = new GameIndicator(300 + cos(i * TWO_PI / 9) * rad,
                    200 + sin(i * TWO_PI / 9) * rad, 30)
                indicators.push(tgtIndicator)
            }
            for (let i = 0; i < 12; i++) {
                const rad = 150
                let tgtIndicator = new GameIndicator(300 + cos(i * TWO_PI / 12) * rad,
                    200 + sin(i * TWO_PI / 12) * rad, 30)
                indicators.push(tgtIndicator)
            }

            buttons.push(new GameButton(75, 200, 40, function () {
                for (let i = 0; i < 10; i++) {
                    if (indicators[i].active) {
                        return;
                    }
                }
                indicators[0].active = true;

            }))
            buttons.push(new GameButton(75, 150, 40, function () {
                let failed = false;
                let i10Status = indicators[10].active
                for (let i = 10; i < 22 - 1; i++) {
                    indicators[i].active = indicators[i + 1].active
                }
                indicators[21].active = i10Status
                if (indicators[9].active) {
                    if (indicators[10].active) {
                        for (let i = 0; i < 22; i++) {
                            indicators[i].active = false;
                        }
                        //fail
                        return;
                    }
                    indicators[10].active = true;
                    indicators[9].active = false;
                }
                for (let i = 9; i > 0; i--) {
                    indicators[i].active = indicators[i - 1].active
                }
                indicators[0].active = false;

            }))

            buttons.push(new GameButton(75, 250, 40, function () {
                if (indicators[0].active && indicators[1].active) {
                    for (let i = 0; i < 22; i++) {
                        indicators[i].active = false;
                    }
                } else {
                    for (let i = 0; i < 10; i++) {
                        indicators[i].active = true;
                    }
                }
            }))
            break;
        case 2:
            //dihedral group of order 18
            for (let i = 0; i < 9; i++) {
                let tgtIndicator = new GameIndicator(300 + cos(i * TWO_PI / 9) * 100,
                    200 + sin(i * TWO_PI / 9) * 100, 30)
                indicators.push(tgtIndicator)
            }
            indicators.push(new GameIndicator(100, 200, 30)) // has part 1 been activated?
            buttons.push(new GameButton(50, 200, 40, function () {
                if (indicators[9].active) {
                    for (let i = 0; i < indicators.length; i++) {
                        indicators[i].active = false;
                    }
                } else {
                    indicators[1].Toggle();
                    indicators[2].Toggle();
                    indicators[3].Toggle();
                    indicators[5].Toggle();
                    indicators[6].Toggle();
                    indicators[8].Toggle();

                    indicators[9].Toggle();
                }

            }))
            indicators.push(new GameIndicator(100, 250, 30)) // has part 2 been activated?
            buttons.push(new GameButton(50, 250, 40, function () {
                if (indicators[10].active) {
                    for (let i = 0; i < indicators.length; i++) {
                        indicators[i].active = false;
                    }
                } else {
                    indicators[0].Toggle();
                    indicators[4].Toggle();
                    indicators[6].Toggle();

                    indicators[10].Toggle();
                }
            }))
            buttons.push(new GameButton(550, 200, 40, function () {
                let ind9Status = indicators[8].active
                for (let i = 8; i > 0; i--) {
                    indicators[i].active = indicators[i - 1].active
                }
                indicators[0].active = ind9Status
            }))
            buttons.push(new GameButton(550, 250, 40, function () {
                for (let i = 1; i < 5; i++) {
                    let tmp = indicators[i].active
                    indicators[i].active = indicators[9 - i].active
                    indicators[9 - i].active = tmp
                }
            }))
            break;
        case 3:
            break;
        case 4:
            break;
        case 5:
            indicators.push(new GameIndicator(300, 100, 30)) // 2 
            indicators.push(new GameIndicator(350, 100, 30)) // 2 
            indicators.push(new GameIndicator(300, 200, 30)) // 3    
            indicators.push(new GameIndicator(350, 200, 30)) // 3    
            indicators.push(new GameIndicator(300, 300, 30)) // 5   
            const vals = [2, 2, 3, 3, 5] 
            function get_displayed_num() {
                let val = 1;
                for(let i = 0; i < 5; i++) {
                    if(indicators[i].active) {
                        val *= vals[i]
                    }
                }
                return val;
            }
            function display_num(num) {
                let cval = num;
                for(let i = 0; i < 5; i++) {
                    if(cval % vals[i] == 0) {
                        indicators[i].active = true;
                        cval /= vals[i]
                    } else {
                        indicators[i].active = false;
                    }
                }
            }
            buttons.push(new GameButton(300, 150, 40, function () {
                let num = get_displayed_num();
                display_num(num + 2);
            }))
            buttons.push(new GameButton(350, 150, 40, function () {
                let num = get_displayed_num();
                display_num(num + 4);
            }))
            buttons.push(new GameButton(400, 150, 40, function () {
                let num = get_displayed_num();
                display_num(num + 8);
            }))
            buttons.push(new GameButton(300, 250, 40, function () {
                let num = get_displayed_num();
                display_num(num + 3);
            }))
            buttons.push(new GameButton(350, 250, 40, function () {
                let num = get_displayed_num();
                display_num(num + 9);
            }))
            buttons.push(new GameButton(400, 250, 40, function () {
                let num = get_displayed_num();
                display_num(num + 27);
            }))
            buttons.push(new GameButton(150, 300, 40, function () {
                let num = get_displayed_num();
                display_num(num * 5);
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