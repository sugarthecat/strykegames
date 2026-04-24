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
                screenOn = "message"
            }),
        ]
    }
    Load(level) {
        this.time = 0;
        this.defaultType = "empty"
        this.balance = {}
        this.perSecond = {}
        let tileW = 5;
        let tileH = 5;

        if (level.code == "farm") {
            this.defaultType = "dirt"
            tileW = 5;
            tileH = 5;
            this.goalPerSecond = { coins: 80 }
            this.maxBalance = { coins: 250 }
            this.currShopItem = 0;
            this.tileShop = [
                {
                    price: { coins: 5, gems: 0 },
                    name: "Wheat",
                    description: "Earns 1 coin.",
                    type: "wheat",
                    avail: 21,
                    owned: 3
                },
                {
                    price: { coins: 20, gems: 0 },
                    name: "Corn",
                    description: "Earns 4 coins if adjacent to wheat.",
                    type: "corn",
                    avail: 12,
                    owned: 0
                },
                {
                    price: { coins: 50, gems: 0 },
                    name: "Strawberry Patch",
                    description: "Earns 8 coins if adjacent to only strawberries.",
                    type: "strawberry",
                    avail: 8,
                    owned: 0
                }
            ]
            this.currencies = ["coins"]
        }

        screens.message.Load(level);
        for (let i = 0; i < this.currencies.length; i++) {
            this.balance[this.currencies[i]] = 0
        }
        this.currLevel = level.code
        this.levelName = level.title
        this.tiles = []
        for (let i = 0; i < tileW; i++) {
            this.tiles.push([])
            for (let j = 0; j < tileH; j++) {
                this.tiles[i].push(new Tile(this.defaultType))
            }
        }
        this.currShopTile = new Tile(this.tileShop[this.currShopItem].type)
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
        background(255)
        fill(0)
        this.DrawTileGrid(x, y)
        this.DrawGoal()
        this.DrawTileShop()
        //draw lines
        push()
        stroke(0)
        strokeWeight(10)
        line(400, 0, 400, 400)
        line(0, 60, 400, 60)
        pop()
        textAlign(CENTER, CENTER)
        textSize(12)
        text("Click to place tiles. Right click to delete.", 200, 80)
        textSize(20)
        text(this.levelName, 200, 30)
        pop()
        super.Draw(x, y)
    }
    giveIncome() {
        for (let i = 0; i < this.currencies.length; i++) {
            const currency = this.currencies[i]
            this.balance[currency] += this.perSecond[currency];
            if (this.balance[currency] > this.maxBalance[currency]) {
                this.balance[currency] = this.maxBalance[currency]
            }
        }
        for (let i = 0; i < this.tiles.length; i++) {
            for (let j = 0; j < this.tiles[i].length; j++) {
                this.tiles[i][j].addIncomeBubble(this.currencies);
            }
        }
    }
    updateIncome() {
        this.perSecond = getIncome(this.tiles, this.currLevel)
    }
    HandleClick(x, y) {
        super.HandleClick(x, y)
        if (this.tileShop[this.currShopItem].owned > 0) {
            //attempt to place tile
            let xOffset = 10
            let yOffset = 90

            let gridWidth = 380;
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
            for (let i = 0; i < this.tiles.length; i++) {
                for (let j = 0; j < this.tiles[i].length; j++) {
                    if (mouseInRange(xOffset + i * size, yOffset + j * size, size, size)) {
                        const oldTile = this.tiles[i][j]
                        for (let i = 0; i < this.tileShop.length; i++) {
                            if (this.tileShop[i].type == oldTile.type) {
                                this.tileShop[i].owned++;
                            }
                        }
                        if (mouseButton === LEFT) {
                            this.tiles[i][j] = new Tile(this.tileShop[this.currShopItem].type)
                            this.tileShop[this.currShopItem].owned--;
                        } else if(mouseButton === RIGHT) {
                            this.tiles[i][j] = new Tile(this.defaultType)
                        }
                        this.updateIncome();

                        return;
                    }
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
        this.currShopTile.Draw(415, 180, 60)
        fill(0)
        textSize(10)
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
        push()
        translate(10, 90)

        let xOffset = 10
        let yOffset = 90

        let gridWidth = 380;
        let gridHeight = 300;
        let tileWidth = this.tiles.length;
        let tileHeight = this.tiles[0].length;
        if (gridHeight / tileHeight > gridWidth / tileWidth) {
            let newGridHeight = gridWidth / tileWidth * tileHeight
            translate(0, (gridHeight - newGridHeight) / 2)
            yOffset += (gridHeight - newGridHeight) / 2
            gridHeight = newGridHeight
        } else {
            let newGridWidth = gridHeight / tileHeight * tileWidth
            translate((gridWidth - newGridWidth) / 2, 0)
            xOffset += (gridWidth - newGridWidth) / 2
            gridWidth = newGridWidth
        }
        let size = gridWidth / tileWidth
        fill(255, 0, 0)
        for (let i = 0; i < this.tiles.length; i++) {
            for (let j = 0; j < this.tiles[i].length; j++) {
                this.tiles[i][j].Draw(i * size, j * size, size)
            }
        }
        pop()
    }
}

function drawSymbol(currency, x, y, size) {
    if (currency == "coins") {
        push()
        strokeCap(ROUND)
        stroke(200, 200, 0)
        strokeWeight(size / 10)
        fill(255, 255, 0)
        circle(x, y, size)
        strokeWeight(size / 6)
        line(x, y - size / 3, x, y + size / 3)
        pop()
    }
}