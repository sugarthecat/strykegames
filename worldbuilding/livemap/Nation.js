
class Nation {
    static takenTileNames = [];
    constructor() {
        this.culture = new Culture();
        this.tiles = []
        this.color = color(random(0, 255), random(0, 255), random(0, 255))
    }
    AnnexTile(tile) {
        if (tile.nation) {
            tile.nation.LoseTile(tile)
        }
        tile.nation = this;
        this.tiles.push(tile)
    }
    Update() {
        this.population = 0;
        for (let i = 0; i < this.tiles.length; i++) {
            this.population += this.tiles[i].population
        }
    }
    LoseTile(tile) {
        this.tiles.splice(this.tiles.indexOf(tile), 1)
    }
    NameTiles() {
        this.culture.NameTiles(this.tiles);
        for (let i = 0; i < this.tiles.length; i++) {
            this.tiles[i].originalNation = this;
        }
    }
}