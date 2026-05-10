const TICK_SPEED = 4 //seconds per payout
class LevelScreen extends GUI {
    constructor() {
        super();
        const ref = this;
        this.elements = [
            new Button(425, 150, 25, 15, "Prev", () => {
                ref.currShopItem--;
                ref.currShopTile = new Tile(ref.tileShop[ref.currShopItem].type)
            }),
            new Button(550, 150, 25, 15, "Next", () => {
                ref.currShopItem++;
                ref.currShopTile = new Tile(ref.tileShop[ref.currShopItem].type)
            }),
            new Button(485, 341, 30, 18, "Buy", () => {
                ref.buyItem()
            }),
            new Button(500 - 30, 120, 60, 21, "Complete", () => {
                screenOn = "dialog"
            }),
            new Button(15, 20, 55, 20, "Exit", () => {
                screenOn = "levelSelect"
                this.ClearBoard();
            }),
        ]
    }
    Load(level) {
        this.time = 0;
        this.alert = { time: 0, maxTime: 5, x: 100, y: 100, text: "This is an alert!" }
        this.defaultType = level.defaultType
        this.balance = {}
        this.perSecond = {}
        let tileW = level.tileW;
        let tileH = level.tileH;
        this.currencies = level.currencies
        this.maxBalance = level.maxBalance
        this.currShopItem = 0;
        this.goalPerSecond = level.goalPerSecond
        this.tileShop = level.tileShop
        this.author = level.author

        screens.dialog.Load(level.completionMessage, level.author);
        for (let i = 0; i < this.currencies.length; i++) {
            this.balance[this.currencies[i]] = 0
        }
        this.currLevel = level.code
        this.levelName = level.title
        this.tiles = []
        for (let i = 0; i < tileW; i++) {
            this.tiles.push([])
            for (let j = 0; j < tileH; j++) {
                this.tiles[i].push(new Tile(this.defaultType, i, j))
            }
        }
        this.currShopTile = new Tile(this.tileShop[this.currShopItem].type, 0, 0)
        this.updateIncome()
    }
    Draw(x, y) {

        this.time += deltaTime / 1000
        if (this.time > TICK_SPEED) {
            this.time -= TICK_SPEED;
            this.giveIncome();
        }
        if (this.time > TICK_SPEED) {
            this.time = 0;
        }
        this.elements[0].active = this.currShopItem > 0;
        this.elements[1].active = this.currShopItem < this.tileShop.length - 1;
        push()
        drawStripes(this.author)
        fill(255)
        rect(400, 0, 200, 400)
        textSize(12)
        let rectWidth = textWidth("Click to place tiles. Right click to delete.") + 20
        rect(200 - rectWidth / 2, 70, rectWidth, 20, 20)
        textSize(20)
        rectWidth = textWidth(this.levelName) + 30
        rect(200 - rectWidth / 2, 15, rectWidth, 30, 30)
        fill(0)
        this.DrawTileGrid(x, y)
        this.DrawGoal()
        this.DrawTileShop()
        this.drawAlert()

        //draw lines
        push()
        stroke(0)
        strokeWeight(10)
        line(400, 0, 400, 400)
        pop()
        textAlign(CENTER, CENTER)
        textSize(12)
        text("Click to place tiles. Right click to delete.", 200, 80)
        textSize(20)
        text(this.levelName, 200, 30)
        pop()

        super.Draw(x, y)
    }

    drawAlert() {
        if (this.alert.time <= 0) {
            return;
        }
        const progress = 1 - (this.alert.time / this.alert.maxTime)
        const sizePortion = 1 - progress ** 3

        push()
        translate(this.alert.x, this.alert.y)
        textSize(15 * sizePortion)
        const w = textWidth(this.alert.text) * 1.1
        const h = 15 * sizePortion * 1.2
        fill(255)
        rect(- w / 2, -h / 2, w, h, min(w * 0.2, h * 0.4))
        fill(0)
        textAlign(CENTER, CENTER)
        text(this.alert.text, 0, 0)
        pop()
        this.alert.time -= deltaTime / 1000
    }

    giveIncome() {
        for (let i = 0; i < this.currencies.length; i++) {
            const currency = this.currencies[i]
            this.balance[currency] += this.perSecond[currency];
            this.balance[currency] = constrain(this.balance[currency], 0, this.maxBalance[currency])
        }
        for (let i = 0; i < this.tiles.length; i++) {
            for (let j = 0; j < this.tiles[i].length; j++) {
                this.tiles[i][j].addIncomeBubble(this.currencies);
            }
        }
    }
    updateIncome() {
        this.perSecond = getIncome(this.tiles, this.currLevel, this.currencies)
    }
    getGridLayout() {
        let xOffset = 10
        let yOffset = 90
        let gridWidth = 380 - 5; // -5 for stroke width
        let gridHeight = 300;
        let tileWidth = this.tiles.length;
        let tileHeight = this.tiles[0].length;
        if (gridHeight / tileHeight > gridWidth / tileWidth) {
            let newGridHeight = gridWidth / tileWidth * tileHeight
            yOffset += (gridHeight - newGridHeight) / 2
            gridHeight = newGridHeight
        } else {
            let newGridWidth = gridHeight / tileHeight * tileWidth
            xOffset += (gridWidth - newGridWidth) / 2
            gridWidth = newGridWidth
        }
        let size = gridWidth / tileWidth
        return { xOffset, yOffset, size }
    }
    ClearBoard() {
        for (let i = 0; i < this.tiles.length; i++) {
            for (let j = 0; j < this.tiles[i].length; j++) {
                if (this.tiles[i][j].type !== this.defaultType) {
                    this.tiles[i][j] = new Tile(this.defaultType, i, j)
                    for (let i = 0; i < this.tileShop.length; i++) {
                        if (this.tileShop[i].type == oldTile.type) {
                            this.tileShop[i].owned++;
                        }
                    }
                }
            }
        }
    }
    HandleClick(x, y) {
        super.HandleClick(x, y)
        //attempt to place tile
        const { xOffset, yOffset, size } = this.getGridLayout()
        for (let i = 0; i < this.tiles.length; i++) {
            for (let j = 0; j < this.tiles[i].length; j++) {
                if (mouseInRange(xOffset + i * size, yOffset + j * size, size, size)) {
                    const oldTile = this.tiles[i][j]
                    if (mouseButton === LEFT) {
                        if (this.tileShop[this.currShopItem].owned > 0) {
                            this.tiles[i][j] = new Tile(this.tileShop[this.currShopItem].type, i, j)
                            this.tileShop[this.currShopItem].owned--;
                            for (let i = 0; i < this.tileShop.length; i++) {
                                if (this.tileShop[i].type == oldTile.type) {
                                    this.tileShop[i].owned++;
                                }
                            }
                        } else {
                            this.alert = { x: x, y: y, time: 1.5, maxTime: 1.5, text: "None in storage." }
                        }
                    } else if (mouseButton === RIGHT) {
                        if (this.tiles[i][j].type !== this.defaultType) {
                            this.tiles[i][j] = new Tile(this.defaultType, i, j)
                            for (let i = 0; i < this.tileShop.length; i++) {
                                if (this.tileShop[i].type == oldTile.type) {
                                    this.tileShop[i].owned++;
                                }
                            }
                        }
                    }
                    this.updateIncome();

                    return;
                }
            }
        }

    }
    buyItem() {
        const shopItem = this.tileShop[this.currShopItem];
        shopItem.owned += 1;
        shopItem.avail -= 1;
        for (let i = 0; i < this.currencies.length; i++) {
            const currency = this.currencies[i]
            this.balance[currency] -= shopItem.price[currency]
        }
    }
    DrawGoal() {
        push()
        fill(0)
        textAlign(LEFT, CENTER)
        textSize(24)
        text(`Goal (Income): `, 425, 30)
        textSize(15)
        let success = true
        for (let i = 0; i < this.currencies.length; i++) {
            const currency = this.currencies[i]
            drawSymbol(currency, 430, 55 + 25 * i, 20)
            text(`${this.goalPerSecond[currency]} (${this.perSecond[currency]})`, 450, 55 + 25 * i)
            if (this.perSecond[currency] >= this.goalPerSecond[currency]) {
                this.DrawCheck(575, 55 + 25 * i)
            } else {
                success = false;
            }
        }
        this.elements[3].hidden = !success
        pop()
    }
    DrawTileShop() {
        push()
        textAlign(CENTER, CENTER)
        textSize(18)
        const currItem = this.tileShop[this.currShopItem]
        if (textWidth(currItem.name) > 90) {
            textSize(textSize() * 90 / textWidth(currItem.name))
        }
        text(currItem.name, 500, 157)
        push()
        translate(415, 180)
        this.currShopTile.Draw(60)
        pop()
        fill(0)
        textSize(9)
        textAlign(LEFT, TOP)
        text(currItem.description, 485, 180, 100, 100)
        if (currItem.avail > 0) {

            textAlign(LEFT, CENTER)
            textSize(15)
            let allValid = true;
            for (let i = 0; i < this.currencies.length; i++) {
                const currency = this.currencies[i]
                drawSymbol(currency, 460, 255 + 25 * i, 20)
                text(`${this.balance[currency]} / ${currItem.price[currency]}`, 480, 255 + 25 * i)
                if (this.balance[currency] >= currItem.price[currency]) {
                    this.DrawCheck(425, 255 + 25 * i)
                } else {
                    allValid = false;
                }
            }
            textSize(12)
            textAlign(LEFT, CENTER)
            text(`${currItem.owned} stored`, 410, 350)
            textAlign(RIGHT, CENTER)
            text(`${currItem.avail} for sale`, 590, 350)
            this.elements[2].hidden = false;
            this.elements[2].active = allValid;
        } else {
            textSize(15)
            textAlign(CENTER, CENTER)
            text(`${currItem.owned} stored`, 500, 300)
            text(`None left for sale`, 500, 320)
            this.elements[2].hidden = true;
        }
        pop()
    }
    DrawCheck(x, y) {

        push()
        stroke(0, 200, 0)
        strokeWeight(6)
        // 0 45 30
        line(x - 10, y - 5, x - 5, y + 5)
        line(x - 5, y + 5, x + 10, y - 10)
        pop()
    }
    DrawTileGrid(x, y) {
        const { xOffset, yOffset, size } = this.getGridLayout()
        push()
        translate(xOffset, yOffset)
        fill(255, 0, 0)
        for (let i = 0; i < this.tiles.length; i++) {
            for (let j = 0; j < this.tiles[i].length; j++) {
                this.tiles[i][j].Draw(size)
            }
        }
        pop()
    }
}