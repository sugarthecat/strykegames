class Nation {
    constructor() {
        this.tiles = []
        this.color = color(random(0, 255), random(0, 255), random(0, 255))
    }
    AnnexTile(tile) {
        if (tile.nation == false) {
            tile.nation = this;
            this.tiles.push(tile)
        }
    }
    Update(){
        
    }
}