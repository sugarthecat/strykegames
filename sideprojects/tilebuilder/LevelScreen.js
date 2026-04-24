const TICK_SPEED = 2 //seconds per payout
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
        ]
    }
    Load(level) {
        this.time = 0;
        let defaultType = "empty";
        this.balance = {}
        this.perSecond = {}
        if (level.code == "farm") {
            this.goalPerSecond = { coins: 35}
            this.maxBalance = { coins: 100}
            this.currShopItem = 0;
            this.tileShop = [
                {
                    price: { coins: 3, gems: 0 },
                    name: "Dirt",
                    description: "An empty, dusty chunk of dirt. Earns no coins.",
                    type: "dirt",
                    avail: 12,
                    owned: 6
                },
                {
                    price: { coins: 5, gems: 0 },
                    name: "Wheat",
                    description: "Earns 1 coin.",
                    type: "wheat",
                    avail: 20,
                    owned: 1
                },
                {
                    price: { coins: 20, gems: 0 },
                    name: "Corn",
                    description: "Earns 2 coins if adjacent to wheat.",
                    type: "corn",
                    avail: 12,
                    owned: 0
                }
                /*,
                {
                    price: { coins: 100, gems: 0 },
                    name: "Cow",
                    description: "Earns 1 coin per neighboring dirt, and 5 coins per neighboring cow.",
                    type: "cow",
                    avail: 3,
                    owned: 0
                },*/
            ]
            this.currencies = ["coins"]
        }


        for(let i = 0; i<this.currencies.length; i++){
            this.balance[this.currencies[i]] = 0
        }
        this.currLevel = level.code
        this.levelName = level.title
        this.tiles = []
        for (let i = 0; i < 5; i++) {
            this.tiles.push([])
            for (let j = 0; j < 5; j++) {
                this.tiles[i].push(new Tile(defaultType))
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
        text("Click to place tiles.",200,80)
        textSize(20)
        text(this.levelName, 200, 30)
        pop()
        super.Draw(x, y)
    }
    giveIncome() {
        for(let i = 0; i<this.currencies.length; i++){
            const currency = this.currencies[i]
            this.balance[currency] += this.perSecond[currency];
            if(this.balance[currency] > this.maxBalance[currency]){
                this.balance = this.maxBalance[currency]
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
                    if (x - xOffset > i * size && x - xOffset < i * size + size
                        && y - yOffset > j * size && y - yOffset < j * size + size
                    ) {
                        const oldTile = this.tiles[i][j]
                        this.tiles[i][j] = new Tile(this.tileShop[this.currShopItem].type)
                        this.tileShop[this.currShopItem].owned--;
                        for (let i = 0; i < this.tileShop.length; i++) {
                            if (this.tileShop[i].type == oldTile.type) {
                                this.tileShop[i].owned++;
                            }
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
        console.log(shopItem)
        for (let i = 0; i < this.currencies.length; i++) {
            const currency = this.currencies[i]
            this.balance[currency] -= shopItem.price[currency]
            console.log(this.balance)
        }
    }
    DrawGoal() {
        push()
        fill(0)
        textAlign(LEFT, CENTER)
        textSize(24)
        text(`Income (/ Goal): `, 425, 30)
        textSize(15)
        for (let i = 0; i < this.currencies.length; i++) {
            const currency = this.currencies[i]
            this.DrawSymbol(currency, 430, 55 + 25 * i, 20)
            text(`${this.perSecond[currency]} / ${this.goalPerSecond[currency]}`, 450, 55 + 25 * i)
            if (this.perSecond[currency] >= this.goalPerSecond[currency]) {
                this.DrawCheck(575, 55 + 25 * i)
            }
        }
        pop()
    }
    DrawSymbol(currency, x, y, size) {
        if (currency == "coins") {

            push()
            strokeCap(ROUND)
            stroke(200, 200, 0)
            strokeWeight(size/10)
            fill(255, 255, 0)
            circle(x, y, size)
            strokeWeight(size / 6)
            line(x, y - size / 3, x, y + size / 3)
            pop()
        }
    }
    DrawTileShop() {
        push()
        textAlign(CENTER, CENTER)
        textSize(18)
        const currItem = this.tileShop[this.currShopItem]
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
                this.DrawSymbol(currency, 460, 255 + 25 * i, 20)
                text(`${this.balance[currency]} / ${currItem.price[currency]}`, 480, 255 + 25 * i)
                if (this.balance[currency] >= currItem.price[currency]) {
                    this.DrawCheck(425, 255 + 25 * i)
                } else {
                    allValid = false;
                }
            }
            textSize(12)
            textAlign(LEFT, CENTER)
            text(`${currItem.owned} owned`, 410, 350)
            textAlign(RIGHT, CENTER)
            text(`${currItem.avail} available`, 590, 350)
            this.elements[2].hidden = false;
            this.elements[2].active = allValid;
        } else if (currItem.owned > 0) {
            textSize(15)
            textAlign(CENTER, CENTER)
            text(`${currItem.owned} owned`, 500, 300)
            this.elements[2].hidden = true;
        } else {
            textSize(15)
            textAlign(CENTER, CENTER)
            text(`None left for sale`, 500, 300)
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