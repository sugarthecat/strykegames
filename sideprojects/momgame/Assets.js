class Assets {

    static loadAssets() {
        this.covers = []
        for (let i = 1345; i <= 1356; i++) {
            this.covers.push(loadImage(`./assets/IMG_${i}.png`))
        }

        this.abstract = []
        for (let i = 1357; i <= 1363; i++) {
            this.abstract.push(loadImage(`./assets/IMG_${i}.png`))
        }
        for (let i = 1365; i <= 1367; i++) {
            this.abstract.push(loadImage(`./assets/IMG_${i}.png`))
        }
        this.abstract.push(loadImage(`./assets/IMG_${1364}.png`))
    }
    static setVolume(volume) {
    }
}