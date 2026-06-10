function getLevel(level) {
    let indicators = []
    let buttons = []
    switch (level) {
        case 0:
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
                    indicators[9-i].active = tmp
                }
            }))
            break;
        case 1:
            break;
        case 2:
            break;
        case 3:
            break;
        case 4:
            break;
        case 5:
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