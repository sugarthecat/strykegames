import LandTile from "./LandTile.js";

export default class InterfaceRecorder{



    constructor(){

    }


    showMapModes = false;
    showEditTerrain = false;
    showAddCustomColony = false;
    showEditStats = false
    showPopulationEditor = false;
    showAllianceEditor = false;
    showSorts = false;
    showPopulationEditor = false;
    showCommands = false;


    recordedMaxPop;

    recordMaxPopFromAllTiles(GAME_BOARD){

        var maxPop = 0;
        for (let row = 0; row < GAME_BOARD.length; row+=1){
            for(let col = 0; col<GAME_BOARD[0].length ; col+=1){
                if ( GAME_BOARD[row][col].tileType instanceof LandTile){
                    if (GAME_BOARD[row][col].tileType.population.pop > maxPop){
                        maxPop = GAME_BOARD[row][col].tileType.population.pop;
                    }
                
                }
            }
        }
        this.recordedMaxPop = maxPop;

    }



    toggleMapModes(){
        if(this.showMapModes){
            this.showMapModes = false;
            return false;
        }
        this.showMapModes = true;
        return true;
    }

    toggleEditTerrain(){
        if(this.showEditTerrain){
            this.showEditTerrain = false;
            return false;
        }
        this.showEditTerrain = true;
        return true;
    }

    toggleAddCustomColony(){
        if(this.showAddCustomColony){
            this.showAddCustomColony = false;
            return false;
        }
        this.showAddCustomColony = true;
        return true;
    }
    toggleAddCustomAlliance(){
        if(this.showCustomAlliance){
            this.showCustomAlliance = false;
            return false;
        }
        this.showCustomAlliance = true;
        return true;
    }

    toggleCustomStats(){
        if(this.showEditStats){
            this.showEditStats = false;
            return false;
        }
        this.showEditStats = true;
        return true;
    }
    toggleSorts(){
        if(this.showSorts){
            this.showSorts = false;
            return false;
        }
        this.showSorts = true;
        return true;
    }
    toggleCommands(){
        if(this.showCommands){
            this.showCommands = false;
            return false;
        }
        this.showCommands = true;
        return true;
    }


    togglePopulationEditor(){
        if(this.showPopulationEditor){
            this.showPopulationEditor = false;
            return false;
        }
        this.showPopulationEditor = true;
        return true;
    }

}