class SafeCrackerScreen extends GUI {
    constructor() {
        super();
        this.elements = [
            new Button(30, 10, 60, 20, "Return Home", function () { screenOn = "title"; }),
        ]
        this.score = 0;
        this.setupGame()
        this.wintime = 0;
    }
    getSideLen() {
        return this.score + 2 + (this.wintime > 0 ? -1 : 0);
    }
    setupGame() {
        while (this.elements.length > 1) {
            this.elements.pop()
        }
        this.image = random(Assets.covers)
        this.slicePerm = []
        for (let i = 0; i < (this.getSideLen()) * (this.getSideLen()); i++) {
            this.slicePerm.push(i)
        }

        let h = 250;
        let w = 200;

        const globalShrink = 0.92

        let sidelen = this.getSideLen();
        let tileHeight = h / sidelen;
        let tileWidth = w / sidelen;

        //shuffle board

        for(let i = 0; i< sidelen * 2;i++){
            if(random() < 0.5){
                this.rotateCol(floor(random(sidelen)))
            }else{
                this.rotateRow(floor(random(sidelen)))
            }
        }

        for (let i = 0; i < this.getSideLen(); i++) {
            const n_whatever = i;
            const ref = this
            let rRowFunc = function () {
                ref.rotateRow(n_whatever)
                if(ref.isFinished()){
                    ref.finishLevel();
                }
            }
            let rColFunc = function () {
                ref.rotateCol(n_whatever)
                if(ref.isFinished()){
                    ref.finishLevel();
                }
            }
            let xpos = 300 - w / 2 + i * tileWidth;
            let ypos = 225 - h / 2 + i * tileHeight;
            let btnSize = max(tileHeight / 3, tileWidth / 3, 20)
            this.elements.push(new Button(xpos + tileWidth / 2 - btnSize / 2, 55, btnSize,btnSize, "↑", rColFunc))
            this.elements.push(new Button(150, ypos + tileHeight/ 2 - btnSize/ 2, btnSize,btnSize, "←", rRowFunc))
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

    rotateRow(rowN) {
        let sidelen = this.getSideLen();
        let firstIdx = rowN * sidelen;
        let firstItem = this.slicePerm[firstIdx];
        for (let i = 0; i + 1 < sidelen; i++) {
            this.slicePerm[firstIdx + i] = this.slicePerm[firstIdx + i + 1]
        }
        this.slicePerm[firstIdx + sidelen - 1] = firstItem;
    }
    rotateCol(colN) {
        let sidelen = this.getSideLen();
        let firstIdx = colN;
        let firstItem = this.slicePerm[firstIdx];
        for (let i = 0; i + 1 < sidelen; i++) {
            this.slicePerm[firstIdx + i * sidelen] = this.slicePerm[firstIdx + (i + 1) * sidelen]
        }
        this.slicePerm[firstIdx + sidelen * (sidelen - 1)] = firstItem;
    }

    HandleClick(x, y) {
        super.HandleClick(x, y);
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
        let h = 250;
        let w = 200;

        const globalShrink = 0.92

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

                rect(xpos, ypos, tileWidth, tileHeight)

                if (this.wintime > 0) {
                    image(this.image,
                        xpos + tileWidth * max(0, this.wintime - 1) * (1 - shrunkPortion) / 2, //drawx
                        ypos + tileWidth * max(0, this.wintime - 1) * (1 - shrunkPortion) / 2, // drawy
                        tileWidth * min(1, 1 * (2 - this.wintime) + (this.wintime - 1) * shrunkPortion), // drawWidth
                        tileHeight * min(1, 1 * (2 - this.wintime) + (this.wintime - 1) * shrunkPortion), // draHeight
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