
class Nation {
    static takenTileNames = [];
    constructor() {
        this.culture = new Culture();
        this.tiles = []
        let colors = [random(255), random(255), random(255)]
        while(dist1(colors[0], 20) + dist1(colors[1], 50) + dist1(colors[2], 200)/2 < 100){
            colors = [random(255), random(255), random(255)]
        }
        this.color = color(...colors)
    }
    AnnexTile(tile) {
        if (tile.nation) {
            tile.nation.LoseTile(tile)
        }
        tile.nation = this;
        this.tiles.push(tile)
        tile.takenThisTurn = true;
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