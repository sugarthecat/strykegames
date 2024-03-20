
class Nation {
    static takenTileNames = [];
    constructor() {
        this.name = getCountry()
        this.culture = new Culture();
        this.tiles = []
        let colors = [random(255), random(255), random(255)]
        while (dist1(colors[0], 20) + dist1(colors[1], 50) + dist1(colors[2], 200) / 2 < 100) {
            colors = [random(255), random(255), random(255)]
        }
        this.color = color(...colors)
        this.recruits=0
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
        if (this.tiles.length == 0) {
            return
        }
        this.population = 0;
        this.troops = 0;
        let frontlineTiles = [];
        let largestCity = this.tiles[0]
        for (let i = 0; i < this.tiles.length; i++) {
            this.population += this.tiles[i].population
            this.troops += this.tiles[i].troops
            this.recruits += this.tiles[i].recruits
            if (this.tiles[i].population > largestCity.population) {
                largestCity = this.tiles[i]
            }
        }


        let tilesToSearch = [largestCity]
        let searchedTiles = [largestCity]

        while (tilesToSearch.length > 0) {
            let currTile = tilesToSearch[0]
            for (let i = 0; i < currTile.connections.length; i++) {
                let newTile = currTile.connections[i]
                if (newTile.nation == this && !searchedTiles.includes(newTile)) {
                    searchedTiles.push(newTile)
                    tilesToSearch.push(newTile)
                }
            }
            if (currTile.isFrontline) {
                frontlineTiles.push(currTile)
            }
            tilesToSearch.shift()
        }

        let mobilizedTroops = this.recruits;
        for (let i = 0; i < frontlineTiles.length; i++) {
            console.log(mobilizedTroops)
            frontlineTiles[i].troops += floor(mobilizedTroops / frontlineTiles.length)
            this.recruits -= floor(mobilizedTroops / frontlineTiles.length)
            if (frontlineTiles[i].troops > 1000000) {
                this.recruits += frontlineTiles[i].troops - 1000000
                frontlineTiles[i].troops = 1000000
            }
        }
        this.recruits = floor ( this.recruits)
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

const vowelSyllables = ["a", "ea", "e", "a", "e", "o", "u", "i"]
const consonantSyllables = ["b", "c", "d", "f", "h", "j", "k", "l", "m", "n", "p", "r", "s", "t", "g", "v", "z", "x", "g", "gr", "m", "n", "t", "t", "s", "sp", "th", "sh", "wr", "b", "b", "b", "c", "c", "c", "c", "n", "n", "n", "n", "n", "n", "m", "m", "m", "m", "m", "t", "t", "q", "d", "d", "d", "t"]
function getCountry() {
    let countryName = ""
    for (let i = 0; i < 5; i++) {
        if (i % 2 == 0) {
            countryName += random(vowelSyllables)
        } else {
            countryName += random(consonantSyllables)
        }
    }
    if (countryName.length < 6) {
        countryName += "land"
    }
    countryName = countryName[0].toUpperCase() + countryName.slice(1);
    return { name: countryName }
}