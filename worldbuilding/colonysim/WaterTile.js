import { default as Population } from "./Population.js";
import { default as Ship } from "./Ship.js";
import Troop from "./Troop.js";

export default class WaterTile{


    terrain;
    ship;

    

    constructor(terrain){
        this.terrain = terrain;
        
    }

    createNewShipWithLandTile(thisWaterTile, oldLandTile){
        var oldPop = oldLandTile.tileType.population;

        const oldLandTroops = oldPop.getMilitia(); 

        // make sure old land tile has enough pop and there is a ship to set sail
        //console.log(oldLandTile.population - oldLandTile.population.getTroops());
        if (oldLandTroops > 1 && oldPop.colony.currentShipBuild > oldPop.colony.shipProductionCost){

            var newPop = new Population(oldLandTroops, oldPop.colony) 
            newPop.setCultureValuesFromAnotherPop(oldPop);

            // decrease old tiles pop b/c of troops taken
            oldLandTile.tileType.population.decreasePop(oldLandTroops);

            // create new ship and add it to this water tile
            let options = ['l','r','u','d','l','r','u','d','lu','ld','ru','rd']
            this.ship = new Ship(newPop,options[Math.floor(Math.random()*options.length)]);
            this.ship.population.troop.troopCount = oldPop.getFractionOfReserveTroops();

            //TODO need to set this up with colonies
            this.ship.setShipValuesFromColony();

            thisWaterTile.toDraw = true;
            thisWaterTile.isEmpty = false;
            thisWaterTile.isNew = true;

            // increase colonies current naval and decrease naval ship build (by production cost of ship)
            oldPop.colony.currentActiveShips ++;
            oldPop.colony.currentShipBuild -= oldPop.colony.shipProductionCost;

        }
        
    }


    landOnFriendlyTileFromWater(thisTile, landTile){
        landTile.tileType.population.pop += thisTile.tileType.ship.population.pop;
        
        landTile.tileType.population.troop.troopCount += this.ship.population.troop.troopCount;
    
        this.ship.population.colony.currentShipBuild += this.ship.population.colony.shipProductionCost;
        this.emptyTileDecreaseActiveShips(thisTile);
    }  

    moveShipToEmptyWaterTile(thisTile,newWaterTile){

        newWaterTile.tileType.ship = this.ship;
        this.ship = null;

        thisTile.toDraw = true;
        thisTile.isEmpty = true;
        thisTile.isNew = true;


        newWaterTile.toDraw = true;
        newWaterTile.isEmpty = false;
        newWaterTile.isNew = true;

    }

    moveShipToEmptyLandAndSettle(thisTile, newLandTile){
        //console.log(this.ship.population);
        // create new Population
        var newLandPop = newLandTile.tileType.population;
        newLandPop.colony = this.ship.population.colony;
        newLandPop.pop = this.ship.population.pop;

        //sets new cultures from ship
        newLandPop.setCultureValuesFromAnotherPop(this.ship.population);
        


        thisTile.toDraw = true;
        thisTile.isEmpty = true;
        thisTile.isNew = true;


        newLandTile.toDraw = true;
        newLandTile.isEmpty = false;
        newLandTile.isNew = true;
        newLandTile.isOccupiedLand = true;


    }


    getCombinedShipSiegeAttack(){
        //TODO make a more specific siege attack
        var thisPop = this.ship.population;

        return (thisPop.colony.milStrength + thisPop.cultureAttack + thisPop.colony.attack) * this.terrain.geoAttack;
    }

    siegeLandTileFromWater(thisTile, defenderTile){

        var thisPop = this.ship.population;
        var defPop = defenderTile.tileType.population;


        // rate of Killing (controls realistic battle deaths)
        const rok = .012;
        const troopMiltiaRatio = 3;


        // console.log("=======");
        // console.log(this.ship.population.troop.troopCount);
        
        const tA = thisPop.troop.troopCount;
        const mA = thisPop.pop;

        const tD = defPop.troop.troopCount;
        const mD = defPop.getMilitia();

        // console.log(`${thisPop.colony.teamId} | A: ${thisTile.getCombinedShipSiegeAttack()} | D: ${thisTile.getCombinedDefense()}`)
        // console.log(`${defPop.colony.teamId} | A: ${defenderTile.getCombinedAttack()} | D: ${defenderTile.getCombinedDefense()}`)

        // console.log(`${thisPop.colony.teamId} | TA: ${tA} | MA: ${mA}`)
        // console.log(`${defPop.colony.teamId} | TD: ${tD} | MD: ${mD}`);

        const combAttack = this.getCombinedShipSiegeAttack();
        const combDefense = defenderTile.getCombinedDefense();

        const tAPower = tA * combAttack;
        const mAPower = Math.floor(mA * combAttack / troopMiltiaRatio);
        const tDPower = tD * combDefense;
        const mDPower = Math.floor(mD * combDefense / troopMiltiaRatio);

        var killedAttackTroops = 0;
        var killedAttackMilitia = 0;
        var killedDefenseTroops = 0;
        var killedDefenseMilitia = 0;

        const tADice = Math.floor(Math.random() * (6 - 1) + 1);
        const mADice = Math.floor(Math.random() * (6 - 1) + 1);
        const tDDice = Math.floor(Math.random() * (6 - 1) + 1);
        const mDDice = Math.floor(Math.random() * (6 - 1) + 1);

        //May be uneeded
        var attackMoraleChange = 0;


        // tA vs tD
        killedDefenseTroops += Math.floor(tAPower * rok * tADice / combDefense);
        killedAttackTroops += Math.floor(tDPower * rok * tDDice / combAttack);
        
        // ta vs mD
        killedDefenseMilitia += Math.floor(tAPower * rok * tADice / combDefense);
        killedAttackTroops += Math.floor(mDPower * rok * mDDice / combAttack);

        // mA vs tD
        killedDefenseTroops +=Math.floor(mAPower * rok * mADice / combDefense);
        killedAttackMilitia += Math.floor(tDPower * rok * tDDice / combAttack);

        //mA vs mD
        killedDefenseMilitia += Math.floor(mAPower * rok * mADice / combDefense);
        killedAttackMilitia += Math.floor(mDPower * rok * mDDice / combAttack);


        if (killedAttackMilitia > thisPop.pop){
            killedAttackMilitia = thisPop.pop;
        }
        if (killedDefenseMilitia > defPop.getMilitia()){
            killedDefenseMilitia = defPop.getMilitia();
        }
        if (killedAttackTroops > thisPop.getTroops()){
            killedAttackTroops = thisPop.getTroops();
        }
        if (killedDefenseTroops > defPop.getTroops()){
            killedDefenseTroops = defPop.getTroops();
        }


        thisPop.decreasePop(killedAttackMilitia);
        defPop.decreasePop(killedDefenseMilitia);

        thisPop.troop.decreaseTroopCount(killedAttackTroops);
        defPop.troop.decreaseTroopCount(killedDefenseTroops);


        // console.log(`KTA: ${killedAttackTroops} | KMA: ${killedAttackMilitia}`);
        // console.log(`KTD: ${killedDefenseTroops} | KMD: ${killedDefenseMilitia}`);

        if (thisPop.getTroops() + thisPop.pop> 0){
            thisPop.troop.decreaseMorale((killedAttackMilitia+killedAttackTroops)/(thisPop.getTroops() + thisPop.pop));
        }



        if (defPop.getTroops() + defPop.getMilitia() > 0){
            defPop.troop.decreaseMorale((killedDefenseMilitia+killedDefenseTroops)/(defPop.getTroops() + defPop.getMilitia()));
            const defeated = defPop.troop.isDefeated();
            if (defeated){
                this.emptyTileDecreaseActiveShips(thisTile);
            }

            return !defeated
        }else{
            this.emptyTileDecreaseActiveShips(thisTile);
            return true
        }

    } 

    takeOverLandTileAfterSiege(thisTile, landTile){
        // console.log(this.ship.population);
        

        //TODO Pop Null Error found here, rare/not very frequent
        if (this.ship != null){
            landTile.tileType.population.tranferStatsFromAttackerTile(landTile, this.ship.population)
            landTile.tileType.population.pop += this.ship.population.pop;
            landTile.tileType.population.troop.troopCount += this.ship.population.troop.troopCount;

            landTile.toDraw = true;
            landTile.isNew = true;
            //console.log(this);
            this.emptyTileDecreaseActiveShips(thisTile);
            
            //TODO does not remove ship, just makes it not active (dont have to rebuild) - might already be doing that -
        }
    }

    emptyTile(thisTile){
        //console.log(thisTile);

        thisTile.isEmpty = true;
        thisTile.toDraw = true;
        thisTile.isNew = true;
        this.ship = null;
    }

    emptyTileDecreaseActiveShips(thisTile){
        //console.log(thisTile);

        thisTile.isEmpty = true;
        thisTile.toDraw = true;
        thisTile.isNew = true;
        this.ship.population.colony.currentActiveShips -= 1;
        thisTile.tileType.ship = null;

        //console.log("Making:" ,thisTile.x, thisTile.y , " Ship null")

    }

    attackEnemyNavalShip(thisTile, enemyTile){
        var outcome = this.ship.strength - enemyTile.tileType.ship.strength;

        if (outcome > 0){
            // this ship won
            this.ship.health - outcome;
            enemyTile.tileType.emptyTileDecreaseActiveShips(thisTile);
            if (this.ship.checkIfSunk()){
                this.emptyTileDecreaseActiveShips(thisTile);
            }

        }else{
            //enemy ship won

            outcome *= -1;
            enemyTile.tileType.ship.health - outcome;

            if (enemyTile.tileType.ship.checkIfSunk()){
                enemyTile.tileType.emptyTileDecreaseActiveShips(enemyTile);
            }
        }
    }

 

}