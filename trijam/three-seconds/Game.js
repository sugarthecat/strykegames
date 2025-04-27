class GameScreen extends GUI {
    constructor() {
        super();
        this.backgroundColor = color(200, 150, 0)
        this.gameObjects = []
    }
    Draw(x, y) {
        fill(150)
        rect(0, 0, 600, 400)
        fill(0, 200, 0)
        rect(0, 0, 600 * this.timeLeft / 3, 20)
        this.timeLeft -= deltaTime / 1000;
        if (this.timeLeft <= 0) {
            Assets.explosion.play();
            screens.fail.reset();
            screenOn = "fail"
        }
        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].Draw(x, y)
        }
    }
    HandleClick(x, y) {

        for (let i = this.gameObjects.length - 1; i >= 0; i--) {
            if (this.gameObjects[i].HandleClick(x, y)) {
                return;
            }
        }
    }
    FinishLevel() {
        highestLevel = max(highestLevel, level + 1)
        screenOn = "win"
        Assets.winsound.play()
        volume *= 2
        Assets.alarm.stop();
        screens.win.reset();
    }
    NewLevel() {
        volume /= 2;
        this.timeLeft = 3;
        let ref = this;
        Assets.alarm.play();
        let correctButton;
        switch (level) {
            case 0:
                this.gameObjects = [
                    new GameButton(275, 175, 50, 50, Assets.stopGreen, function () { ref.FinishLevel(); })
                ]
                break;
            case 1:
                this.gameObjects = [
                    new GameButton(300, 175, 50, 50, Assets.stopGreen, function () { ref.FinishLevel(); }),
                    new GameButton(250, 175, 50, 50, Assets.detonateRed, function () { ref.timeLeft = 0 })
                ]
                break;
            case 2:
                this.gameObjects = [
                    new GameButton(10, 340, 50, 50, Assets.stopGreen, function () { ref.FinishLevel(); }),
                    new GameButton(300, 100, 200, 200, Assets.detonateRed, function () { ref.timeLeft = 0 })
                ]
                break;
            case 3:
                this.gameObjects = [
                    new GameButton(250, 175, 50, 50, Assets.stopRed, function () { ref.FinishLevel(); }),
                    new GameButton(300, 175, 50, 50, Assets.detonateGreen, function () { ref.timeLeft = 0 })
                ]
                break;
            case 4:
                this.gameObjects = [
                    new GameButton(100, 150, 100, 100, Assets.stopGreen, function () { ref.FinishLevel(); }),
                    new GameButton(400, 150, 100, 100, Assets.detonateRed, function () { ref.timeLeft = 0 }),
                    new GamePaper(200, 200, 250)
                ]
                break;
            case 4:
                this.gameObjects = [
                    new GameButton(100, 150, 100, 100, Assets.stopGreen, function () { ref.FinishLevel(); }),
                    new GameButton(400, 150, 100, 100, Assets.detonateRed, function () { ref.timeLeft = 0 }),
                    new GamePaper(200, 200, 250)
                ]
                break;
            case 5:
                correctButton = floor(random(2))
                this.gameObjects = []
                for (let i = 0; i < 2; i++) {
                    if (correctButton == i) {
                        this.gameObjects.push(new GameButton(275, 75 + 200 * (i % 2), 50, 50, Assets.stopGreen, function () { ref.FinishLevel(); }))
                    } else {
                        this.gameObjects.push(new GameButton(275, 75 + 200 * (i % 2), 50, 50, Assets.detonateRed, function () { ref.timeLeft = 0 }))
                    }
                }
                for (let i = 0; i < 2; i++) {
                    this.gameObjects.push(new GamePaper(300, 100 + 200 * (i % 2), 150))
                }
                break;
            case 6:
                correctButton = floor(random(6))
                this.gameObjects = []
                for (let i = 0; i < 6; i++) {
                    if (correctButton == i) {
                        this.gameObjects.push(new GameButton(floor(i / 2) * 200 + 75, 75 + 200 * (i % 2), 50, 50, Assets.stopGreen, function () { ref.FinishLevel(); }))
                    } else {
                        this.gameObjects.push(new GameButton(floor(i / 2) * 200 + 75, 75 + 200 * (i % 2), 50, 50, Assets.detonateGreen, function () { ref.timeLeft = 0 }))
                    }
                }
                for (let i = 0; i < 6; i++) {
                    this.gameObjects.push(new GamePaper(floor(i / 2) * 200 + 100, 100 + 200 * (i % 2), 150))
                }
                break;
            case 7:
                this.gameObjects = [new GameButton(275, 175, 50, 50, Assets.stopGreen, function () { ref.FinishLevel(); })]
                for (let i = 1; i < 7; i++) {
                    this.gameObjects.push(new GamePaper(300, 200, 50 + i * 40))
                }
                break;
            case 8:
                this.gameObjects = [
                    new GameButton(275, 175, 50, 50, Assets.stopGreen, function () {
                        if (ref.timeLeft < 1) {
                            ref.FinishLevel();
                        } else {
                            ref.timeLeft = 0;
                        }
                    }),
                    new GameIndicator(300, 150, 25, function () { return ref.timeLeft < 1 ? color(0, 200, 0) : color(50) })
                ]
                break;
            case 9:
                this.gameObjects = [
                    new GameButton(275, 175, 50, 50, Assets.stopGreen, function () {
                        if (ref.timeLeft < 1 && ref.timeLeft > 0.5) {
                            ref.FinishLevel();
                        } else {
                            ref.timeLeft = 0;
                        }
                    }),
                ]
                for (let i = -0.5; i < 4; i++) {
                    let angle = i * PI / 3
                    let rad = 50;
                    let checkPoint = 3 - i / 2
                    this.gameObjects.push(
                        new GameIndicator(300 + rad * cos(angle), rad * sin(angle) + 200, 25, function () {
                            if (ref.timeLeft < 0.5) {
                                return color(200, 0, 0)
                            } else if (ref.timeLeft < checkPoint) {
                                return color(0, 200, 0)
                            } else {
                                return color(200, 0, 0)
                            }
                        }))
                }
                break;
            case 10:
                let target = random(0.5, 2.5)
                this.gameObjects = [
                    new GameButton(275, 250, 50, 50, Assets.stopGreen, function () {
                        if (abs(target - ref.timeLeft) < 0.125) {
                            ref.FinishLevel();
                        } else {
                            ref.timeLeft = 0;
                        }
                    }),
                ]
                for (let i = 0; i < 6; i++) {
                    let targetDist = (i + 1) * 0.125
                    this.gameObjects.push(
                        new GameIndicator(50 + i * 100, 200, 25, function () {
                            if (abs(target - ref.timeLeft) < targetDist) {
                                return color(0, 200, 0)
                            } else {
                                return color(200, 0, 0)
                            }
                        }))
                }
                break;
            case 11:
                ref.rotation = floor(random(5));
                let colors = [color(50), color(200, 0, 0), color(200, 200, 0), color(200, 0, 200), color(0, 0, 200), color(200, 200, 200), color(0, 200, 0)]
                this.gameObjects = [
                    new GameButton(100, 175, 50, 50, Assets.stopGreen, function () {
                        if (ref.rotation == colors.length - 1) {
                            ref.FinishLevel();
                        } else {
                            ref.timeLeft = 0;
                        }
                    }),
                    new GameIndicator(300, 200, 25, function () {
                        return colors[ref.rotation];
                    }),
                    new GameButton(450, 175, 50, 50, Assets.yellowButton, function () {
                        ref.rotation++
                        ref.rotation = ref.rotation % colors.length;
                    }),
                ]
                break;
            case 12:
                ref.binarynum = floor(random(10, 13));
                this.gameObjects = [
                    new GameButton(100, 250, 50, 50, Assets.stopGreen, function () {
                        if (ref.binarynum == 15) {
                            ref.FinishLevel();
                        } else {
                            ref.timeLeft = 0;
                        }
                    }),
                    new GameButton(450, 250, 50, 50, Assets.yellowButton, function () {
                        ref.binarynum++
                        ref.binarynum %= 16;
                    }),
                ]
                for (let i = 0; i < 4; i++) {
                    let powerOf2 = pow(2, i)
                    this.gameObjects.push(new GameIndicator(150 + i * 100, 100, 25, function () {
                        if (floor(ref.binarynum / powerOf2) % 2 == 1) {
                            return color(0, 200, 0)
                        }
                        return color(200, 0, 0)
                    })
                    )
                }
                for (let i = 0; i < 4; i++) {
                    //this.gameObjects.push(new GamePaper(150 + i * 100, 100, 50))
                }
                break;
            case 13:
                ref.binarynum = floor(random(10, 13));
                this.gameObjects = [
                    new GameButton(100, 250, 50, 50, Assets.stopGreen, function () {
                        if (ref.binarynum == 15) {
                            ref.FinishLevel();
                        } else {
                            ref.timeLeft = 0;
                        }
                    }),
                    new GameButton(450, 250, 50, 50, Assets.yellowButton, function () {
                        ref.binarynum++
                        ref.binarynum %= 16;
                    }),
                ]
                for (let i = 0; i < 4; i++) {
                    let powerOf2 = pow(2, i)
                    this.gameObjects.push(new GameIndicator(150 + i * 100, 100, 25, function () {
                        if (floor(ref.binarynum / powerOf2) % 2 == 1) {
                            return color(0, 200, 0)
                        }
                        return color(200, 0, 0)
                    })
                    )
                }
                this.gameObjects.push(new GamePaper(150 + floor(random(2)) * 100, 100, 50))
                this.gameObjects.push(new GamePaper(150 + floor(random(2, 4)) * 100, 100, 50))
                break;
            case 14:
                this.gameObjects = [
                    new GameButton(275, 300, 50, 50, Assets.stopGreen, function () {
                        ref.FinishLevel();
                    })
                ]
                for (let i = 0; i < 5; i++) {
                    let index = i;
                    this.gameObjects.push(new GameButton(475 - i * 100, 200, 50, 50, Assets.yellowButton, function () {
                        ref.gameObjects[index].hidden = false;
                    }))
                    this.gameObjects[i].hidden = true;
                }
                break;
            case 15:
                this.gameObjects = [
                    new GameRotatingPlate(300, 200, 150, 0.7, [
                        new GameButton(225, 175, 50, 50, Assets.yellowButton, function () {
                            ref.gameObjects[0].items[1].hidden = false;
                        }),
                        new GameButton(325, 175, 50, 50, Assets.yellowButton, function () {
                            ref.gameObjects[0].items[2].hidden = false;
                        }),
                        new GameButton(275, 125, 50, 50, Assets.yellowButton, function () {
                            ref.gameObjects[0].items[3].hidden = false;
                        }),
                        new GameButton(275, 225, 50, 50, Assets.stopGreen, function () {
                            ref.FinishLevel();
                        })
                    ])
                ]
                
                for (let i = 1; i < 4; i++) {
                    ref.gameObjects[0].items[i].hidden = true;
                }
                break;
            case 16:
                this.gameObjects = [
                    new GameButton(275, 300, 50, 50, Assets.stopGreen, function () {
                        ref.FinishLevel();
                    })
                ]
                for (let i = 0; i < 3; i++) {
                    let index = i;
                    this.gameObjects.push(new GameButton(475 - i * 200, 75 + floor(random(2)) * 100, 50, 50, Assets.yellowButton, function () {
                        ref.gameObjects[index].hidden = false;
                    }))
                    this.gameObjects[i].hidden = true;
                }
                for (let i = 0; i < 3; i++) {
                    this.gameObjects.push(new GamePaper(500 - i * 200, 200, 75))
                    this.gameObjects.push(new GamePaper(500 - i * 200, 100, 75))
                }
                break;
            default:
                this.gameObjects = []
                break;
        }
    }

}