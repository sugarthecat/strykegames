import Supply from "./Supply.js";

export default class Storage{

    supply;
    

    constructor(){
        this.supply = new Supply()
    }   


    equalizeSupplyWithTile(thisPop, otherPop){

        const equalSupply = Math.floor((thisPop.storage.supply.supplyCount + otherPop.storage.supply.supplyCount)/2)
       
        thisPop.storage.supply.supplyCount = equalSupply;
        otherPop.storage.supply.supplyCount = equalSupply 

        // odd extra supply goes to other tile
        if (equalSupply%2 == 1){
            otherPop.storage.supply.supplyCount +=1; 
        }
        
    }



    attemptFindRandomColonyTile(thisTile, gameBoard){
        var thisPop = thisTile.tileType.population;
        var newX = this.randomIntFromRange(-1,1) + thisTile.x
        var newY = this.randomIntFromRange(-1,1) + thisTile.y

        if (!(newX >= 0 && newX < gameBoard[0].length && newY >= 0 && newY < gameBoard.length)){
            return null;
        }
        if(gameBoard[newY][newX].isOccupiedLand){
            if (gameBoard[newY][newX].tileType.population.colony.teamId === thisPop.colony.teamId ||(thisPop.colony.alliance && gameBoard[newY][newX].tileType.population.colony.alliance && thisPop.colony.alliance == gameBoard[newY][newX].tileType.population.colony.alliance )){
                //this.equalizeSupplyWithTile(thisPop,gameBoard[newY][newX].tileType.population);
                return gameBoard[newY][newX];
            }
        }else{
            return null;
        }

    }


    randomIntFromRange(min, max) { 
        return Math.floor(Math.random() * (max - min + 1) + min)
      }
}