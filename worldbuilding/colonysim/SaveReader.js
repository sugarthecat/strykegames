import Colony from "./Colony.js";
import BaseStats from "./BaseStats.js";
import Tile from "./Tile.js";
import LandTile from "./LandTile.js";
import Water from "./terrainTiles/Water.js";
import PlainTile from "./terrainTiles/PlainTile.js";
import ForestTile from "./terrainTiles/ForestTile.js";
import MountainTile from "./terrainTiles/MountainTile.js";
import RiverTile from "./terrainTiles/RiverTile.js";
import Population from "./Population.js";
import WaterTile from "./WaterTile.js";
import Ship from "./Ship.js";
import DesertTile from "./terrainTiles/DesertTile.js";
import TundraTile from "./terrainTiles/TundraTile.js";
import Flag from "./Flag.js";
import Alliance from "./Alliance.js";

export default class Save{

    WATER = new Water();
    PLAIN = new PlainTile();
    FOREST = new ForestTile();
    MOUNTAIN = new MountainTile();
    RIVER = new RiverTile();
    DESERT = new DesertTile();
    TUNDRA = new TundraTile();

    gameBoardWidth;
    gameBoardHeight;

    tileSize;
    boardWidth;
    boardHeight;

    SELECTOR;

    isOutdated;
    colonyArray = [];
    colonyDict = {};
    gameBoard = []

    initialSaveStr;
    colonySaveStr;
    tilesSaveStr;
 
    BASE_STATS = new BaseStats();

    currentVersion;

    constructor(currentVersion, selector){
        this.currentVersion = currentVersion;
        this.SELECTOR = selector
    }

    convertSaveTextFileMain(str){
        // console.log("=== SAVE READER ===");
        const mainSplit = str.split("<>");
        this.initialSaveStr = mainSplit[0];
        this.colonySaveStr = mainSplit[1];
        this.tilesSaveStr = mainSplit[2];
        this.allianceSaveStr = mainSplit[3];

        this.initialSaveStr = this.initialSaveStr.split(",")
        const version = this.initialSaveStr[0];
        

        if (version != this.currentVersion){
            //outdated
            // console.log("outdated");

            this.isOutdated = true;
            this.convertInitalData(this.initialSaveStr)
            this.colonyArray = this.createOutdatedColonyArray();
            this.gameBoard = this.createOutdatedGameBoard();


        }else{
            // console.log("not outdated");
            //not outdated
            this.isOutdated = false
            this.convertInitalData(this.initialSaveStr)
            this.colonyArray = this.createCurrentColonyArray();
            this.gameBoard = this.createCurrentGameBoard();
            // console.log(this.colonyArray);
            if(this.allianceSaveStr){
                this.createAlliances()
            }
        }
    }

    createAlliances(){
        const allArray = this.allianceSaveStr.split('/')
        for(let i = 0; i<allArray.length-1; i++){
            let members = allArray[i].split(',')[2].split('-')
            if(members.length > 1){
                let alliance = new Alliance(this.colonyArray[members[0]],this.colonyArray[members[1]]);
                for(let j = 0; j<members.length; j++){
                    alliance.addMember(this.colonyArray[members[j]])
                }
                alliance.name = allArray[i].split(',')[0]
                alliance.color = allArray[i].split(',')[1]
                alliance.flag = new Flag(allArray[i].split(',')[3].split('x'))
            }
        }
    }

    createCurrentGameBoard(){

        const tileStrArray = this.tilesSaveStr.split("|")
        var singleTileArray;
        var b; // basic -> for outdated and current
        var btt; // basic tile type -> for outdated and current
        var nb // not basic -> only for current

        var newGameBoard = this.createEmptyGameBoard();
        var tempTile;
        var type;
        

        for(let i=1; i< tileStrArray.length; i++){
            // console.log(tileStrArray[i]);

            singleTileArray = tileStrArray[i].split("#");
            b = singleTileArray[0].split(",");
            btt = singleTileArray[1].split(",");
            nb = singleTileArray[2].split(",");

            // console.log(newGameBoard);
            // console.log(`${b[1]},${b[0]}`);
            tempTile = newGameBoard[b[1]][b[0]];

            // console.log(tempTile);
            //basic
            this.readBasicTileData(b,tempTile);


            type = btt[0] // empty land, occupied land, empty water, occupied water

            if (type === "BEL"){
                this.readEmptyLandTile(btt,nb,tempTile);
            }else if (type === "BOL"){
                this.readOccupiedLandTile(btt, nb, tempTile);
            }else if(type === "BEW"){
                this.readEmptyWaterTile(btt, nb, tempTile);
            }else if(type === "BOW"){
                this.readOccupiedWaterTile(b,nb,tempTile);
            }else{
                console.log("Neither BEl, BOL, BEW, BOW");
            }
            // console.log(tempTile);
        }
        // console.log("new Game Board");
        // console.log(newGameBoard);
        return newGameBoard;

    }

    readBasicTileData(b, tile){
        // console.log(tile);
        tile.isEmpty =this.binToBool(b[2]);
        tile.isNew =this.binToBool(b[3]);
        tile.isOccupiedLand = this.binToBool(b[4]);
    }

    //current
    readEmptyLandTile(btt, nb, tile){
        tile.tileType = new LandTile(this.getTerrainFromInitial(btt[1]))

        tile.tileType.inCombat = this.binToBool(btt[2]);
        tile.tileType.population = new Population(parseFloat(btt[3]), null);
        //console.log(tile);
    }

    readOccupiedLandTile(btt, nb, tile){
        
        tile.tileType = new LandTile(this.getTerrainFromInitial(btt[5]))
        tile.tileType.population = new Population(parseFloat(btt[2]), this.getColonyFromTeamId(btt[1]));
        // console.log(tile);
        var tilePop = tile.tileType.population;

        //Basic
        tilePop.cultureAttack = parseFloat(btt[3]);
        tilePop.cultureDefense = parseFloat(btt[4]);

        //nonBasic
        tilePop.colonyControl = parseFloat(nb[1]);
        tilePop.culturePopGrowth = parseFloat(nb[2]);
        tilePop.cultureExpandRate = parseFloat(nb[3]);
        tilePop.cultureName = nb[4];
        tilePop.storage.supply.supplyCount = parseInt(nb[5]);
        tilePop.troop.troopCount = parseInt(nb[6])
        tilePop.troop.morale = parseFloat(nb[7]);
    }

    getColonyFromTeamId(teamId){
        // console.log(this.colonyDict[teamId]);
        return this.colonyDict[teamId];
    }

    readOccupiedLandTileOutdated(btt, tile,nb){

    //TODO fix bug with troops millions of troops
        tile.tileType = new LandTile(this.getTerrainFromInitial(btt[5]))
        tile.tileType.population = new Population(parseFloat(btt[2]), this.getColonyFromTeamId(btt[1]));
        // console.log(tile);
        var tilePop = tile.tileType.population;

        //Basic
        tilePop = tile.tileType.population;

        tilePop.cultureAttack = parseFloat(btt[3]);
        tilePop.cultureDefense = parseFloat(btt[4]);

        tilePop.colonyControl = 1;

        tilePop.culturePopGrowth = this.BASE_STATS.TILE_POP_GROWTH;
        tilePop.cultureExpandRate = this.BASE_STATS.TILE_EXPAND_RATE;
        tilePop.cultureName = tilePop.colony.teamId;

    }

    readEmptyWaterTile(btt, nb, tile){
        tile.tileType = new WaterTile(this.getTerrainFromInitial(btt[1]))
    }

    readOccupiedWaterTile(b, nb, tile){
        tile.tileType = new WaterTile(this.getTerrainFromInitial(b[5]))

        let options = ['l','r','u','d','l','r','u','d','lu','ld','ru','rd']
        tile.tileType.ship = new Ship(new Population(parseFloat(nb[3]),this.getColonyFromTeamId(nb[4])),options[Math.floor(options.length*Math.random())])
        tile.tileType.ship.health = nb[1]
        tile.tileType.ship.strength = nb[2]

        // console.log(`nb: ${nb}`);
        const tilePop = tile.tileType.ship.population
        tilePop.cultureName = nb[5];
        tilePop.cultureAttack = parseFloat(nb[6]);
        tilePop.cultureDefense = parseFloat(nb[7]);
        tilePop.culturePopGrowth = parseFloat(nb[8]);
        tilePop.cultureExpandRate = parseInt(nb[9]);
        tilePop.troop.troopCount = parseInt(nb[10]);
        tilePop.troop.morale = parseFloat(nb[11]);

        // console.log(`Culture Name: ${tilePop.cultureName}`);
    }

    getTerrainFromInitial(str){
        switch(str){
            case "w": return this.WATER;
            case "p": return this.PLAIN;
            case "f": return this.FOREST;
            case "m": return this.MOUNTAIN;
            case "r": return this.RIVER;
            case "d": return this.DESERT;
            case "t": return this.TUNDRA;

        }
    }

    //outdated
    createOutdatedGameBoard(){
        const tileStrArray = this.tilesSaveStr.split("|")
        var singleTileArray;
        var b; // basic -> for outdated
        var btt; // basic tile type -> for outdated
        var nb // not basic -> only for current

        var newGameBoard = this.createEmptyGameBoard();
        var tempTile;
        var type;
        

        for(let i=1; i< tileStrArray.length; i++){
            // console.log(tileStrArray[i]);

            singleTileArray = tileStrArray[i].split("#");
            b = singleTileArray[0].split(",");
            btt = singleTileArray[1].split(",");
            nb = singleTileArray[2].split(",");

            tempTile = newGameBoard[b[1]][b[0]];

            this.readBasicTileData(b,tempTile);


            type = btt[0] // empty land, occupied land, empty water, occupied water
            if (type === "BEL"){
                this.readEmptyLandTile(btt,nb,tempTile);
            }else if (type === "BOL"){
                this.readOccupiedLandTileOutdated(btt, tempTile);
            }else if(type === "BEW"){
                this.readEmptyWaterTile(btt, nb, tempTile);
            }else if(type === "BOW"){
                this.readOccupiedWaterTileOutdated(b, tempTile)
            }else{
                console.log("Neither BEl, BOL, BEW, BOW");
            }

        }
        // console.log("new Game Board");
        // console.log(newGameBoard);
        return newGameBoard;

    }


    readOccupiedWaterTileOutdated(b, tile){
        // console.log(b)
        tile.tileType = new WaterTile(this.getTerrainFromInitial(b[5]))

        tile.isEmpty = true;
        tile.toDraw = true;
        tile.isNew = true;

        tile.tileType.ship = null;
    
    }

    createEmptyGameBoard(){
        var tempTile;
        var gameBoard = [];
        var tempRow = [];
        // console.log(this.boardHeight + ", " + this.boardWidth);
        for (let row = 0; row < this.boardHeight; row+=1){
            tempRow = [];
            for(let col = 0; col<this.boardWidth; col+=1){
                tempTile = new Tile(col, row, this.tileSize);
                tempRow.push(tempTile)
            }
            // console.log(tempRow);
            gameBoard.push(tempRow);
        }
        // console.log(gameBoard);
        return gameBoard
    }


    createOutdatedColonyArray(){
        const listOfColoniesStr = this.colonySaveStr.split("|");
        var colComp; // colony component
        var newColony;
        var colArray = [];

        for(let i=1; i<listOfColoniesStr.length; i++){


            colComp = listOfColoniesStr[i].split("$");
            // console.log(`ColComp: ${colComp}`);

            const baseCol = colComp[0].split(",");
            const dataCol = colComp[1].split(",");
            newColony = new Colony(baseCol[1],baseCol[2], this.SELECTOR);

            // console.log("B " + baseCol);
            // console.log("D " +dataCol);

            //TODO convert text to numbers


            newColony.setColonyStats(parseFloat(baseCol[4]), parseFloat(baseCol[5]),this.BASE_STATS.BASE_COLONY_REC_PERC,this.BASE_STATS.BASE_COLONY_POP_GROWTH,this.BASE_STATS.BASE_COLONY_EXPAND_RATE,parseFloat(baseCol[6]));

            newColony.isDead = this.binToBool(baseCol[3]);
            newColony.reserveTroops = parseInt(baseCol[7]);
            
            if(baseCol[8]){
                newColony.flag = new Flag(baseCol[8].split('x'))
            }
            if(baseCol[9]){
                newColony.politics.ideoAuthority = parseFloat(baseCol[9])
            }
            if(baseCol[10]){
                newColony.politics.ideoRadicalism = parseFloat(baseCol[10])
            }
            if(baseCol[11]){
                newColony.politics.ideoProgress = parseFloat( baseCol[11])
            }
            if(baseCol[12]){
                newColony.setTraitString(baseCol[12])
            }
            
            //datacol 7 removed as seperation between land & sea wars was removed
            if(dataCol[8]){
                for(let j = 0; j<dataCol[8].split('║').length; j++){
                    console.log(this.colonyArray.indexOf(newColony)+ ' at war with #' + dataCol[8].split('║')[j])
                    if(parseInt(dataCol[8].split('║')[j]) < this.colonyArray.length){
                        newColony.declareWar(this.colonyArray[parseInt(dataCol[8].split('║')[j])])
                        console.log('done')
                    }
                }
            }
            this.colonyDict[newColony.teamId] = newColony

            // console.log(newColony);

            colArray.push(newColony);


        }

        return colArray

    }

    createCurrentColonyArray(){
        // console.log(`listCol: ${this.colonySaveStr}`);

        const listOfColoniesStr = this.colonySaveStr.split("|");
        var colComp; // colony component
        var newColony;


        // console.log(`listCol: ${listOfColoniesStr.length}`);

        for(let i=1; i<listOfColoniesStr.length; i++){

            colComp = listOfColoniesStr[i].split("$");
            // console.log(`ColComp: ${colComp}`);

            const baseCol = colComp[0].split(",");
            const dataCol = colComp[1].split(",");
            newColony = new Colony(baseCol[1],baseCol[2], this.SELECTOR);

            // console.log("B " + baseCol);
            // console.log("D " +dataCol);

            //TODO convert text to numbers


            newColony.setColonyStats(parseFloat(baseCol[4]), parseFloat(baseCol[5]),parseFloat(dataCol[1]),parseFloat(dataCol[2]),this.BASE_STATS.BASE_COLONY_EXPAND_RATE,parseFloat(baseCol[6]));

            newColony.isDead = this.binToBool(baseCol[3]);
            newColony.reserveTroops = parseInt(baseCol[7]);
            if(baseCol[8]){
                newColony.flag = new Flag(baseCol[8].split('x'))
            }
            if(baseCol[9]){
                newColony.politics.ideoAuthority = parseFloat(baseCol[9])
            }
            if(baseCol[10]){
                newColony.politics.ideoRadicalism = parseFloat(baseCol[10])
            }
            if(baseCol[11]){
                newColony.politics.ideoProgress = parseFloat(baseCol[11])
            }
            if(baseCol[12]){
                newColony.setTraitString(baseCol[12])
            }
            newColony.activeNavalCap = parseInt(dataCol[3]);
            newColony.currentActiveShips =parseInt(dataCol[4]);
            newColony.currentShipBuild = parseInt(dataCol[5]);
            newColony.shipProductionCost = parseInt(dataCol[6]);

            this.colonyDict[newColony.teamId] = newColony
            // console.log(newColony);
            this.colonyArray.push(newColony)
            console.log(this.colonyArray)
            console.log(dataCol[8].split('║'))
            //datacol 7 removed as seperation between land & sea wars was removed
            if(dataCol[8]){
                for(let j = 0; j<dataCol[8].split('║').length; j++){
                    console.log(this.colonyArray.indexOf(newColony)+ ' at war with #' + dataCol[8].split('║')[j])
                    if(parseInt(dataCol[8].split('║')[j]) < this.colonyArray.length){
                        newColony.declareWar(this.colonyArray[parseInt(dataCol[8].split('║')[j])])
                        console.log('done')
                    }
                }
            }
        }
        return this.colonyArray;
        
    }

    binToBool(bin){
        return bin=="1";
    }

    convertInitalData(str){
        this.tileSize = parseInt(str[1]);
        this.boardHeight = parseInt(str[2]);
        this.boardWidth = parseInt(str[3]);
    }




}