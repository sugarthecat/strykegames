import LandTile from "./LandTile.js";

//TODO make a function that gets all attacks from units (allows for custom units) then multiply that to tile attack

export default class Troop{
    troopCount = 0;

    toMove = true;
    hasMovedThisTurn = false;

    morale = 1;

    colony;
  

    constructor(troopCount, colony, attack, defense){
        this.troopCount = troopCount;
        this.attackFromPop = attack;
        this.DefenseFromPop = defense;
        this.colony = colony;
    }

    retreat(){

    }

    isDefeated(){
        return (this.morale < .2);
    }

    turnMoraleIncrease(){
        this.morale += .03;
    }

    decreaseMorale(amount){
        if (this.morale - amount < 0){
            this.morale = 0;
        }else{
            this.morale -= amount;
        }
    }

    decreaseTroopCount(amount){
        if (this.troopCount - amount < 0){
            this.troopCount = 0;
        }else{
            this.troopCount -= amount;
        }
    }

    moveAcrossFrontline(thisTile, board){
        if (thisTile.x -1 > 0 && thisTile.x + 1 < board[0].length && thisTile.y -1 > 0 && thisTile.y + 1 < board.length){

            const num = Math.floor(Math.random()*8)

            if (num == 0){
                this.moveTroopAcrossFrontLineWithCords(thisTile.x, thisTile.y -1, board);

            }else if (num == 1){
                this.moveTroopAcrossFrontLineWithCords(thisTile.x +1, thisTile.y, board);

            }else if (num == 2){
                this.moveTroopAcrossFrontLineWithCords(thisTile.x, thisTile.y +1, board);

            }else if (num == 3){
                this.moveTroopAcrossFrontLineWithCords(thisTile.x -1, thisTile.y, board);

            }

            else if (num == 4){
                this.moveTroopAcrossFrontLineWithCords(thisTile.x -1, thisTile.y -1, board);
            }
            else if (num == 5){
                this.moveTroopAcrossFrontLineWithCords(thisTile.x +1, thisTile.y -1, board);
            }
            else if (num == 6){
                this.moveTroopAcrossFrontLineWithCords(thisTile.x -1, thisTile.y +1, board);
            }
            else if (num == 7){
                this.moveTroopAcrossFrontLineWithCords(thisTile.x +1, thisTile.y +1, board);
            }
            
        }
    }


    moveTroopAcrossFrontLineWithCords(newX, newY, board){
        //console.log(board[newY][newX]);
        if ((board[newY][newX].isOccupiedLand)){   
            
  
            if ((board[newY][newX].tileType.population.colony.teamId === this.colony.teamId)){
                if (board[newY][newX].tileType.population.troopList.length < 1){
                    board[newY][newX].tileType.population.troopList.push(new Troop(10,this.colony, 1, 1));
                    //console.log("MOVING");
                }
            }
        }
    }
}