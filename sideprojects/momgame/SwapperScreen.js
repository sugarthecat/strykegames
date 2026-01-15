class SwapperScreen extends GUI {
    
    constructor() {
        super();
        this.elements = [
            new Button(30, 10, 60, 20, "Return Home", function () { screenOn = "title"; }),
        ]
        this.score = 0;
        this.setupGame()
        this.selectedTile = false;
        this.wintime = 0;
    }
    getSideLen() {
        return this.score + 2 + (this.wintime > 0 ? -1 : 0);
    }
    setupGame() {
        this.image = random(Assets.covers)
        let initVals = []
        for (let i = 0; i < (this.getSideLen()) * (this.getSideLen()); i++) {
            initVals.push(i)
        }
        let firstVal = initVals.shift();
        this.slicePerm = [random(initVals)]
        initVals.splice(initVals.indexOf(this.slicePerm[0]), 1)
        initVals.push(firstVal);
        while (initVals.length > 0) {
            let val = random(initVals);
            initVals.splice(initVals.indexOf(val), 1)
            this.slicePerm.push(val);
        }
    }
    isFinished() {
        for (let i = 0; i < this.slicePerm.length; i++) {
            if (i !== this.slicePerm[i]) {
                return false;
            }
        }
        return true
    }
    finishLevel() {
        this.score++;
        this.wintime = 2;
    }

    HandleClick(x, y) {
        super.HandleClick(x, y);
        if (this.isFinished()) {
            return;
        }
        let sidelen = this.getSideLen();
        let h = 300;
        let w = 240;
        let tileHeight = h / sidelen;
        let tileWidth = w / sidelen;
        for (let i = 0; i < sidelen; i++) {
            for (let j = 0; j < sidelen; j++) {
                let n = j * (sidelen) + i;
                let imgSlide = this.slicePerm[n]

                let xpos = 300 - w / 2 + i * tileWidth;
                let ypos = 225 - h / 2 + j * tileHeight;
                if (x > xpos && y > ypos && x < xpos + tileWidth && y < ypos + tileHeight) {
                    //swap code
                    if (this.selectedTile !== false) {
                        this.slicePerm[n] = this.slicePerm[this.selectedTile]
                        this.slicePerm[this.selectedTile] = imgSlide;
                        this.selectedTile = false;
                        if (this.isFinished()) {
                            this.finishLevel()
                        }
                    } else {
                        this.selectedTile = n;
                    }
                }
            }
        }
    }
    Draw(x, y) {
        if (this.wintime > 0) {
            this.wintime -= deltaTime / 1000
        }
        if (this.wintime < 0) {
            this.wintime = 0;
            this.setupGame()
        }
        push()
        fill(255)
        rect(0, 0, 600, 400)
        fill(0)
        textSize(30)
        textAlign(CENTER)
        text(`${this.score} solved`, 300, 50)
        //bounding box: 300x400
        let h = 300;
        let w = 240;

        const globalShrink =  0.92

        let sidelen = this.getSideLen();
        let tileHeight = h / sidelen;
        let tileWidth = w / sidelen;
        let srcSlideWidth = this.image.width / sidelen
        let srcSlideHeight = this.image.height / sidelen

        for (let i = 0; i < sidelen; i++) {
            for (let j = 0; j < sidelen; j++) {
                let n = j * (sidelen) + i;
                let imgSlide = this.slicePerm[n]

                let xpos = 300 - w / 2 + i * tileWidth;
                let ypos = 225 - h / 2 + j * tileHeight;
                let shrunkPortion = globalShrink
                fill(0)
                if (this.wintime > 0) {
                    //pass
                } else if (n === this.selectedTile) {
                    fill(200)
                    shrunkPortion = 0.87
                } else if (x > xpos && y > ypos && x < xpos + tileWidth && y < ypos + tileHeight) {
                    fill(100)
                    shrunkPortion = 0.85
                }

                rect(xpos, ypos, tileWidth, tileHeight)

                if (this.wintime > 0) {
                    image(this.image,
                        xpos + tileWidth * max(0, this.wintime - 1) * (1 - shrunkPortion) / 2, //drawx
                        ypos + tileWidth * max(0, this.wintime - 1) * (1 - shrunkPortion) / 2, // drawy
                        tileWidth * min(1, 1 * (2 - this.wintime) + ( this.wintime-1) * shrunkPortion), // drawWidth
                        tileHeight * min(1, 1 * (2 - this.wintime) + (this.wintime-1) * shrunkPortion), // draHeight
                        srcSlideWidth * (imgSlide % sidelen),
                        srcSlideHeight * Math.floor(imgSlide / sidelen),
                        srcSlideWidth,
                        srcSlideHeight
                    )
                } else { 
                    image(this.image,
                        xpos + tileWidth * (1 - shrunkPortion) / 2, //drawx
                        ypos + tileWidth * (1 - shrunkPortion) / 2, // drawy
                        tileWidth * shrunkPortion, // drawWidth
                        tileHeight * shrunkPortion, // draHeight
                        srcSlideWidth * (imgSlide % sidelen),
                        srcSlideHeight * Math.floor(imgSlide / sidelen),
                        srcSlideWidth,
                        srcSlideHeight
                    )
                }
            }
        }
        pop()
        super.Draw(x, y);
    }
}