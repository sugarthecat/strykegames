class Nation {
    constructor() {
        this.tiles = []
        this.color = color(random(100, 255), random(100, 255), random(100, 255))
    }
    AnnexTile(tile) {
        if (tile.nation == false) {
            tile.nation = this;
            this.tiles.push(tile)
        }
    }
}