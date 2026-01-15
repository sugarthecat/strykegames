class SpinnerScreen extends GUI {
    constructor() {
        super();
        this.elements = [
            new Button(30, 10, 60, 20, "Return Home", function () { screenOn = "title"; }),
        ]
        this.score = 0;
        this.wintime = 0;
        this.wintimer = 0;
        this.setupGame()
    }
    getSideLen() {
        return this.score + 2 + (this.wintime !== 0 ? -1 : 0);
    }
    setupGame() {
        this.image = random(Assets.abstract)
        this.rotation = []
        for (let i = 0; i < (this.getSideLen()) * (this.getSideLen()); i++) {
            this.rotation.push(random([0, 1, 2, 3]))
        }
        this.rotation[0] = random([1, 2, 3])
    }
    isFinished() {
        for (let i = 0; i < this.rotation.length; i++) {
            if (0 !== this.rotation[i]) {
                return false;
            }
        }
        return true
    }
    finishLevel() {
        this.score++;
        this.wintime = this.score + 1;
        this.wintimer = 0;
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

                let xpos = 300 - w / 2 + i * tileWidth;
                let ypos = 225 - h / 2 + j * tileHeight;
                if (x > xpos && y > ypos && x < xpos + tileWidth && y < ypos + tileHeight) {
                    //swap code
                    this.rotation[n] = (1 + this.rotation[n]) % 4
                        if (this.isFinished()) {
                            this.finishLevel()
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

        const globalShrink = 0.92

        let sidelen = this.getSideLen();
        let tileHeight = h / sidelen;
        let tileWidth = w / sidelen;
        let srcSlideWidth = this.image.width / sidelen
        let srcSlideHeight = this.image.height / sidelen

        for (let i = 0; i < sidelen; i++) {
            for (let j = 0; j < sidelen; j++) {

                let n = j * (sidelen) + i;
                let xpos = 300 - w / 2 + i * tileWidth;
                let ypos = 225 - h / 2 + j * tileHeight;
                let shrunkPortion = globalShrink
                fill(0)
                if (this.wintime > 0) {
                    //pass
                } else if (x > xpos && y > ypos && x < xpos + tileWidth && y < ypos + tileHeight) {
                    fill(100)
                    shrunkPortion = 0.85
                }

                rect(xpos, ypos, tileWidth, tileHeight)
                push()
                if (this.wintime > 0) {
                    translate(xpos + tileWidth / 2,  //drawx
                        ypos + tileHeight / 2)
                    imageMode(CENTER)
                    rotate(this.rotation[n] * PI / 2)

                    let renderW = tileWidth * min(1, 1 * (2 - this.wintime) + (this.wintime - 1) * shrunkPortion)
                    let renderH = tileHeight * min(1, 1 * (2 - this.wintime) + (this.wintime - 1) * shrunkPortion)

                    image(this.image,
                        0, //drawx
                        0, // drawy
                        (this.rotation[n] % 2 == 0 ? renderW : renderH), // drawWidth
                        (this.rotation[n] % 2 == 0 ? renderH : renderW), // draHeight
                        srcSlideWidth * i,
                        srcSlideHeight * j,
                        srcSlideWidth,
                        srcSlideHeight
                    )
                } else {
                    translate(xpos + tileWidth / 2,  //drawx
                        ypos + tileHeight / 2)
                    imageMode(CENTER)
                    rotate(this.rotation[n] * PI / 2)
                    image(this.image,
                        0, //drawx
                        0, // drawy
                        (this.rotation[n] % 2 == 0 ? tileWidth : tileHeight) * shrunkPortion, // drawWidth
                        (this.rotation[n] % 2 == 0 ? tileHeight : tileWidth) * shrunkPortion, // draHeight
                        srcSlideWidth * i,
                        srcSlideHeight * j,
                        srcSlideWidth,
                        srcSlideHeight
                    )
                }
                pop()
            }
        }
        pop()
        super.Draw(x, y);
    }
}