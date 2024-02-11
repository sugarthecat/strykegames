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
        screenOn = "levelSelect"
        Assets.winsound.play()
    }
    NewLevel() {
        this.timeLeft = 3;
        let ref = this;

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
                for (let i = 0; i < 7; i++) {
                    this.gameObjects.push(new GamePaper(300, 200, 50 + i * 40))
                }
                break;
            default:
                this.gameObjects = []
                break;
        }
    }

}