import LandTile from "./LandTile.js";
import WaterTile from "./WaterTile.js";

export default class Save{

    saveString = "";

    constructor(){

    }

    addInitialSimData(version, size, height, width){
        const initStr = `${version},${size},${height},${width}`;
        this.addToSaveString(initStr);
    }

    addColonyData(colonyArray){
        // console.log(colonyArray);
        var colonyStr = `<>`
        var colony;
        for(let i=0; i<colonyArray.length; i++){
            colony = colonyArray[i];
            colonyStr += `|B,${colony.teamId},${colony.color},${this.getBinary(colony.isDead)},${colony.getCondensedAttack()},${colony.getCondensedDefense()},${colony.getCondensedMilStrength()},${colony.reserveTroops},${colony.flag.getExportCode()},${colony.politics.ideoAuthority},${colony.politics.ideoRadicalism},${colony.politics.ideoProgress},${colony.getTraitString()}`;
            colonyStr += `$D,${colony.colonyRecruitPerc},${colony.popGrowth},${colony.activeNavalCap},${colony.currentActiveShips},${colony.currentShipBuild},${colony.shipProductionCost},${'Removed'},${colony.getEnemyArray(colonyArray)}`  
        }
        this.addToSaveString(colonyStr);
    }
    addAllianceArray(colonyArray){
        let alliances = []
        let allstr = "<>"
        for(let i = 0; i<colonyArray.length; i++){
            if(colonyArray[i].alliance){
                if(!alliances.includes(colonyArray[i].alliance)){
                    alliances.push(colonyArray[i].alliance)
                }
            }
        }
        for(let i = 0; i<alliances.length; i++){
            allstr += alliances[i].getSaveString(colonyArray) + '/'
        }
        this.addToSaveString(allstr)
    }

    addTileData(gameBoard){

        var tilesSaveStr = "<>";
        var tile;
        for (let row = 0; row < gameBoard.length; row+=1){
            for(let col = 0; col<gameBoard[0].length ; col+=1){
                tile = gameBoard[row][col];

                if (tile.tileType instanceof LandTile){
                    if (tile.isOccupiedLand){
                        tilesSaveStr += this.addOccupiedLand(tile);
                    }else{
                        tilesSaveStr += this.addEmptyLand(tile);
                    }
                }else if (tile.tileType instanceof WaterTile){
                    if (tile.isEmpty){
                        tilesSaveStr += this.addEmptyWater(tile);
                    }else{
                        tilesSaveStr += this.addOccupiedWater(tile);
                    }
                }

            }
        }
        this.addToSaveString(tilesSaveStr);
    }

    addEmptyLand(tile){
        var emptyLandStr = `|${tile.x},${tile.y},${this.getBinary(tile.isEmpty)},${this.getBinary(tile.isNew)},${this.getBinary(tile.isOccupiedLand)}`;
        emptyLandStr += `#BEL,${this.getTerrainInital(tile.tileType.terrain.name)},${this.getBinary(tile.tileType.inCombat)},${tile.tileType.population.getCondensedPop()}`;
        emptyLandStr += `#EL`;

        return emptyLandStr;
    }

    round(num, places) {
        var multiplier = Math.pow(10, places);
        return Math.round(num * multiplier) / multiplier;
    }

    addOccupiedLand(tile){
        
        var tilePop = tile.tileType.population;
        var occupiedLandStr = `|${tile.x},${tile.y},${this.getBinary(tile.isEmpty)},${this.getBinary(tile.isNew)},${this.getBinary(tile.isOccupiedLand)}`;
        occupiedLandStr += `#BOL,${tilePop.colony.teamId},${tilePop.getCondensedPop()},${tilePop.getCondensedCultureAttack()},${tilePop.getCondensedCultureDefense()},${this.getTerrainInital(tile.tileType.terrain.name)}`;
        occupiedLandStr += `#OL,${tilePop.colonyControl},${tilePop.culturePopGrowth},${tilePop.cultureExpandRate},${tilePop.cultureName},${tilePop.storage.supply.supplyCount},${tilePop.troop.troopCount},${tilePop.troop.morale}`

        return occupiedLandStr;
    }

    addEmptyWater(tile){
        var emptyWaterStr = `|${tile.x},${tile.y},${this.getBinary(tile.isEmpty)},${this.getBinary(tile.isNew)},${this.getBinary(tile.isOccupiedLand)}`;
        emptyWaterStr += `#BEW,${this.getTerrainInital(tile.tileType.terrain.name)}`
        emptyWaterStr += `#EW`
        return emptyWaterStr;
    }

    addOccupiedWater(tile){
        var ship = tile.tileType.ship;
        var shipPop = ship.population
        var occupiedWaterStr = `|${tile.x},${tile.y},${this.getBinary(tile.isEmpty)},${this.getBinary(tile.isNew)},${this.getBinary(tile.isOccupiedLand)},${this.getTerrainInital(tile.tileType.terrain.name)}`;
        occupiedWaterStr += `#BOW`;
        occupiedWaterStr += `#OW,${ship.health},${ship.strength},${shipPop.getCondensedPop()},${shipPop.colony.teamId},${shipPop.cultureName},${shipPop.getCondensedCultureAttack()},${shipPop.getCondensedCultureDefense()},${shipPop.culturePopGrowth},${shipPop.cultureExpandRate},${shipPop.troop.troopCount},${shipPop.troop.morale}`;

        return occupiedWaterStr;
    }

    getTerrainInital(str){
        switch(str){
            case "water": return "w";
            case "plain": return "p";
            case "forest": return "f";
            case "mountain": return "m";
            case "river": return "r";
            case "desert": return "d";
            case "tundra": return "t";
        }
    }


    getBinary(bool){
        if(bool){
            return 1
        }else{
            return 0
        }
    }

    addToSaveString(str){
        this.saveString += str;
    }

    getSaveString(){
        return this.saveString;
    }
}