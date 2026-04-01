import LandTile from "./LandTile.js";
import Troop from "./Troop.js";
import TroopBarrack from "./TroopBarrack.js";
import Storage from "./Storage.js"
import FactoryDistrict from "./FactoryDistrict.js";


export default class Population{


    // values:

    NUM_TO_POP_GROWTH = 1; // number needed to reach in order to increase pop
    POP_NEEDED_TO_EXPAND = 3; // 10
    POP_NEEDED_TO_MIGRATE = 20; // 50 
    MIGRATION_DIVIDER = 5; // 50

    POP_GROWTH_DIVIDER = 1; // 1000
    TROOP_DIVIDER = 100; //100 Percentage, keep 100
    POP_GROWTH_LIMIT = 30; // 10 (unkown if needed)

    INCREASE_ATTACK_DEFENSE_MUTATE = 1;

    INCREASE_DEFENSE_AFTER_VICTORY = .05;
    INCREASE_ATTACK_AFTER_VICTORY = .01;
    DECREASE_ATTACK_AFTER_LOSS = .01;
    DECREASE_DEFENSE_AFTER_LOSS = .01;

    POP_GROWTH_CONSTANT = .002; //.1 norm
    MIN_ATTACK_AND_DEFENSE = .1;

    tilePopCap = Math.random()*2000;

    troop;
    storage;
    factoryDistrict;

    troopBarrack;
    tile;



    cultureName;

    colonyControl = 1; // colonial control over a population 1c == full control

    constructor(pop, colony){
        this.pop = pop;
        this.colony = colony;
        this.tilePopCap = pop;


        this.troopBarrack = new TroopBarrack();
        this.troop = new Troop(0,this.colony, 1,1);
        this.storage = new Storage();
        this.factoryDistrict = new FactoryDistrict();
        this.factoryDistrict.createSetSupplyFactory(this.storage);
    }

    /// transfering ///

    setCultureValues(attack, defense, recruitPerc, popGrowth, expandRate){
        // console.log(attack);
        // console.log(defense);
        // console.log(recruitPerc);
        // console.log(popGrowth);
        // console.log(expandRate);



        this.cultureAttack = attack;
        this.cultureDefense = defense;
        this.culturePopGrowth = popGrowth;
        this.cultureRecruitPerc = recruitPerc;
        this.cultureExpandRate = expandRate;
    }

    setCultureValuesFromAnotherPop(anotherPop){
        // console.log(anotherPop);
        // console.log(anotherPop.cultureAttack);
        // console.log(anotherPop.cultureDefense);
        // console.log(anotherPop.cultureRecruitPerc);
        // console.log(anotherPop.culturePopGrowth);
        // console.log(anotherPop.cultureExpandRate);
        this.cultureName = anotherPop.cultureName;

        this.setCultureValues(anotherPop.cultureAttack, anotherPop.cultureDefense, anotherPop.cultureRecruitPerc, anotherPop.culturePopGrowth, anotherPop.cultureExpandRate);
    }

    setTransferStatsFromOldTileToEmptyTile(thisTile, oldTile, migrateDivider=3){
        // make sure old tile has enough pop to donate
        // maybe make it so old tile doesnt donate pop if newtile has more
        if (oldTile.tileType.population.pop > 2){

            const donatedPop = Math.ceil(oldTile.tileType.population.pop/migrateDivider);
            this.pop += donatedPop;
            oldTile.tileType.population.pop -= donatedPop; 
            
            this.colony = oldTile.tileType.population.colony;


            this.setCultureValuesFromAnotherPop(oldTile.tileType.population);
            
            this.cultureAttack = oldTile.tileType.population.cultureAttack;
            this.cultureDefense = oldTile.tileType.population.cultureDefense;

            thisTile.toDraw = true;
            thisTile.isEmpty = false;
            thisTile.isNew = true;
            thisTile.isOccupiedLand = true;

            //TODO fix how tiles are calculated

            //increase colony tile stat
            //this.colony.totalTiles ++;


            //console.log(oldTile)
            //console.log(thisTile)


            //increase colony new tiles
            this.colony.increaseNewTilesByOne();
        }else{
            console.log("LOWER THAN 2 " + oldTile.x, oldTile.y , oldTile.pop);
        }
    }

    setStatsForInitialPlacement(thisTile, colony, pop){

        this.setCultureValues(colony.attack, colony.defense, colony.recruitPerc, colony.popGrowth, colony.expandRate);
        this.colony = colony;
        this.colony.totalTiles ++;
        this.pop = pop;
        this.cultureName = colony.teamId;

        thisTile.isEmpty = false;
        thisTile.isNew = false
        thisTile.toDraw = true;
        thisTile.isOccupiedLand = true;
    } 

    trainTroop(thisTile){
        //TODO cost supply to create troop?? or time??
        this.troopBarrack.trainTroops(this);
    }

    getCondensedPop(){
        // console.log(this.round(this.pop,3));
        return this.round(this.pop,3);
    }

    getCultureName(){
        return this.cultureName;
    }

    getCondensedCultureAttack(){
        return this.round(this.cultureAttack,3);
    }
    getCondensedCultureDefense(){
        return this.round(this.cultureDefense,3);
    }

    getPopWholeNumber(){
        return Math.floor(this.pop);
    }


    round(num, places) {
        var multiplier = Math.pow(10, places);
        return Math.round(num * multiplier) / multiplier;
    }

    // randomly sees if tile should expand
    attemptToExpand(){
     //TODO find out why this is false
     //TODO culture names are numbers??   
        if (this.pop > this.POP_NEEDED_TO_EXPAND){
           //console.log("Pop Is big enough");

            const expandNumber = Math.floor(Math.random()*100);
            //console.log("ExpandNum:", expandNumber < (this.cultureExpandRate + this.colony.expandRate))
        
            //console.log(this.cultureExpandRate, this.colony.expandRate);
            if(expandNumber < (this.cultureExpandRate + this.colony.expandRate)){
                //console.log("TRUE");
                return true;
            }else{
                console.log(this);
                console.log("false!");
                return false;
            }
        }else{
            return false;
        }
    }


    reinforceTroops(){
        if (this.colony.reserveTroops > 1 && this.colony.prevInCombatTiles > 0 && !this.colony.traits.demilitarized){
            //console.log(`${this.colony.} || ${Math.ceil(this.colony.reserveTroops/this.colony.totalTiles)} `);
            // console.log(`Total Tiles: ${this.colony.prevTotalTiles}`);
            // console.log(`${this.colony.reserveTroops} - ${Math.ceil(this.colony.reserveTroops/this.colony.prevTotalTiles)} ||  ${this.troop.troopCount} + ${Math.ceil(this.colony.reserveTroops/this.colony.prevTotalTiles)}`);
            this.troop.troopCount += Math.ceil(this.colony.reserveTroops/this.colony.prevInCombatTiles);
            this.colony.reserveTroops -= Math.ceil(this.colony.reserveTroops/this.colony.prevInCombatTiles);
            // console.log(this.colony.reserveTroops, this.troop.troopCount);
        }
    }
    
    getFractionOfReserveTroops(){
        if (this.colony.reserveTroops > 1){
            if(this.colony.prevInCombatTiles > 0){
                const troopNum = Math.ceil(this.colony.reserveTroops/(5*this.colony.prevInCombatTiles));
                this.colony.reserveTroops -= troopNum;

                return troopNum;
            }else{
                const troopNum = Math.ceil(this.colony.reserveTroops/10);
                this.colony.reserveTroops -= troopNum;
                return troopNum;
            }
        }

        return 0;
    }
    popTurnDuties(thisTile, gameBoard){
        const birthNum = Math.floor(Math.random() * 1000);
        //checks if tile can grow pop (by random and tile capacity)
        if (birthNum > this.NUM_TO_POP_GROWTH && this.pop < this.tilePopCap){
            this.increasePopWithGrowth(thisTile);
        }
        if (thisTile.tileType.inCombat){this.colony.totalInCombatTiles += 1;}
        
        //this.troopBarrack.sendManpowerToColony(this);
        this.trainTroop(thisTile);
        this.colony.currentShipBuild += .1;
        this.factoryDistrictDutiesMain(thisTile, gameBoard);

        this.colony.updateCultureNameDictWithCulture(this.getCultureName(), this.getPopWholeNumber());

        if (this.colonyControl < 1){
            this.colonyControl += .0002
        }
    }

    moveTroops(thisTile,gameBoard){
        //check if in combat
        var notMovingTroops = []
        if (thisTile.tileType.inCombat == false){
            //not in combat, so move
            var i = 0, len = this.troopList.length;
            //console.log("-=-=-=-");
            while (i < len) {
                var notMoveTroop = this.troopList[i].moveWithMovement(thisTile, gameBoard);
                if (notMoveTroop != null){
                    notMovingTroops.push(notMoveTroop);
                }
                i++
            }
            //empty troop array
            this.troopList = [...notMovingTroops];
        }else{
            if (this.troopList.length > 0){
                this.combineTroops();
                this.troopList[0].moveAcrossFrontline(thisTile, gameBoard)
            }            
        }
    }

    factoryDistrictDutiesMain(thisTile, gameBoard){
        this.factoryDistrict.supplyFactory.createNewSupply(this);
        var otherTile = this.storage.attemptFindRandomColonyTile(thisTile, gameBoard);
        if (otherTile != null || thisTile.inCombat){
            if (otherTile.inCombat){
                otherTile.tileType.population.storage.supply.increaseSupply(this.storage.supply.getSupplyCount());
            }else{
            this.storage.equalizeSupplyWithTile(this, otherTile.tileType.population);
           }
        }
    }

    combineTroops(){
        var i = 0, len = this.troopList.length;
        if (this.troopList.length > 0){
            const firstTroop = this.troopList[0];
            var totalTroopCount = 0;
            while (i < len) {
                totalTroopCount += this.troopList[i].troopCount;
                i++
            }
            this.troopList = [];
            firstTroop.troopCount = totalTroopCount;
            this.troopList.push(firstTroop)
            
        }
    }

    /**
     * 
     * Conflict
     * 
     *  */ 

    attackEnemyTile(thisTile, defenderTile){
        var defPop = defenderTile.tileType.population;

        // var attackSupply = this.storage.supply.getSupplyCount()
        // var defendSupply = defPop.storage.supply.getSupplyCount();

       


        // rate of Killing (controls realistic battle deaths)
        const rok = .012;//norm .012
        const troopMiltiaRatio = 3;


        // console.log("=== BATLLE ===");


        // console.log(`A Supply: ${this.storage.supply.getSupplyCount()}}`);
        // console.log(`D Supply: ${defPop.storage.supply.getSupplyCount()}`);
        
        const tA = this.troop.troopCount;
        const mA = this.getMilitia();

        const tD = defPop.troop.troopCount;
        const mD = defPop.getMilitia();


        // <** Supply **> //

        var attackSupplyModifier = 1
        var defenseSupplyModifier = 1
        // console.log(`Before ${this.storage.supply.getSupplyCount()}`);

        // console.log(`${tA} | ${mA} | ${tD} | ${mD}`);

        if (tA+mA >0){
            // console.log(`Get ASM: ${this.storage.supply.getSupplyCount()} / ${ tA + mA} = ${this.storage.supply.getSupplyCount() / (tA + mA)}`);
            attackSupplyModifier = this.storage.supply.getSupplyCount() / (tA + mA);
        }
        if (tD+mD>0){
            // console.log(`Get DSM: ${defPop.storage.supply.getSupplyCount()} / ${ tD + mD} = ${defPop.storage.supply.getSupplyCount() / (tD + mD)}`);
            defenseSupplyModifier = defPop.storage.supply.getSupplyCount() / (tD + mD);
        }
        // console.log(`ASM: ${attackSupplyModifier}`);
        // console.log(`DSM:${defenseSupplyModifier}`);


        if (attackSupplyModifier > 1){
            attackSupplyModifier = 1;
        }else if (attackSupplyModifier < .01){
            attackSupplyModifier = .01; // default
        }
        if (defenseSupplyModifier > 1){
            defenseSupplyModifier = 1;
        }else if (defenseSupplyModifier < .01){
            // console.log(`DSM Less Than = ${defenseSupplyModifier}`);
            defenseSupplyModifier = .01; // default
        }


        this.storage.supply.decreaseSupply(tA+mA)
        defPop.storage.supply.decreaseSupply(tD+mD)
        // console.log(`After ${this.storage.supply.getSupplyCount()}`);




        // console.log(`${this.colony.teamId} | A: ${thisTile.getCombinedAttack()} | D: ${thisTile.getCombinedDefense()}`)
        // console.log(`${defPop.colony.teamId} | A: ${defenderTile.getCombinedAttack()} | D: ${defenderTile.getCombinedDefense()}`)

        // console.log(`${this.colony.teamId} | TA: ${tA} | MA: ${mA}`)
        // console.log(`${defPop.colony.teamId} | TD: ${tD} | MD: ${mD}`);


        // console.log(`ASM: ${attackSupplyModifier} | DSM: ${defenseSupplyModifier}`);
        const combAttack = thisTile.getCombinedAttack() * attackSupplyModifier;
        const combDefense = defenderTile.getCombinedDefense() * defenseSupplyModifier;

        // console.log(`Attack: ${combAttack} | Defense: ${combDefense}`);

        const tAPower = tA * combAttack;
        const mAPower = Math.floor(mA * combAttack / troopMiltiaRatio);
        const tDPower = tD * combDefense;
        const mDPower = Math.floor(mD * combDefense / troopMiltiaRatio);

        var killedAttackTroops = 0;
        var killedAttackMilitia = 0;
        var killedDefenseTroops = 0;
        var killedDefenseMilitia = 0;

        const tADice = Math.floor(Math.random() * (3 - 1) + 1);
        const mADice = Math.floor(Math.random() * (3 - 1) + 1);
        const tDDice = Math.floor(Math.random() * (3 - 1) + 1);
        const mDDice = Math.floor(Math.random() * (3 - 1) + 1);

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


        if (killedAttackMilitia > this.getMilitia()){
            killedAttackMilitia = this.getMilitia();
        }
        if (killedDefenseMilitia > defPop.getMilitia()){
            killedDefenseMilitia = defPop.getMilitia();
        }
        if (killedAttackTroops > this.getTroops()){
            killedAttackTroops = this.getTroops();
        }
        if (killedDefenseTroops > defPop.getTroops()){
            killedDefenseTroops = defPop.getTroops();
        }


        // console.log(`Killed tA: ${killedAttackTroops} | mA: ${killedAttackMilitia}`);
        // console.log(`Killed tD: ${killedDefenseTroops} | mD: ${killedDefenseMilitia}`);

        this.decreasePop(killedAttackMilitia);
        defPop.decreasePop(killedDefenseMilitia);


        this.troop.decreaseTroopCount(killedAttackTroops);
        defPop.troop.decreaseTroopCount(killedDefenseTroops);


        // console.log(`attack pop: ${this.pop}`);
        // console.log(`defense pop: ${defPop.pop}`);

        // console.log(`KTA: ${killedAttackTroops} | KMA: ${killedAttackMilitia}`);
        // console.log(`KTD: ${killedDefenseTroops} | KMD: ${killedDefenseMilitia}`);

        if (this.getTroops() + this.getMilitia() > 0){
            this.troop.decreaseMorale(.03+(killedAttackMilitia+killedAttackTroops)/(this.getTroops() + this.getMilitia()));
        }

        if (defPop.getTroops() + defPop.getMilitia() > 0){
            defPop.troop.decreaseMorale(.03+(killedDefenseMilitia+killedDefenseTroops)/(defPop.getTroops() + defPop.getMilitia()));
            return defPop.troop.isDefeated();
        }else{return true}

    } 


    retreat(thisTile){
        thisTile.tileType.checkIfInCombat()
    }

    migrateSomePopToTile(toTile){
        if (this.pop > this.POP_NEEDED_TO_MIGRATE){
            const popDonation = Math.floor(this.pop/this.MIGRATION_DIVIDER);
            toTile.tileType.population.pop += popDonation;
            this.pop -= popDonation;
        }
    }

    tranferStatsFromAttackerTile(thisTile, oldPop){
        //TODO mixing of culture values,, use this function for now
    
        //  create a new troop with troops from old tile 
        this.troop = new Troop(Math.floor(oldPop.troop.troopCount/2), oldPop.colony, oldPop.troop.attack, oldPop.troop.defense);
        oldPop.troop.troopCount -= Math.floor(oldPop.troop.troopCount/2);

        if (this.pop < 2 && oldPop.pop > 2){
            const donatedPop = Math.ceil(oldPop.pop/this.MIGRATION_DIVIDER);
            this.pop += donatedPop;
            oldPop.pop -= donatedPop; 
        }
        this.colony = oldPop.colony;
        thisTile.toDraw = true;
        thisTile.isEmpty = false;
        thisTile.isNew = true;

        //check if same culture
        if (this.cultureName === oldPop.colony.teamId){
            this.colonyControl = 1;
        }else{
            this.colonyControl = .01;
        }

        this.colony.increaseNewTilesByOne();
    }

    setLandTilesToBeInCombat(thisTile, otherTile){
        thisTile.tileType.inCombat = true;
        otherTile.tileType.inCombat = true;
    }

    attemptMutateCulture(thisTile){
        //TODO fix attack mutation
        // TODO smaybe share with friendly nieghbhor (like migration)

        var rand = Math.random()*1000
        if (rand < 2){ // 2/10000
            this.cultureAttack+= .001;//this.INCREASE_ATTACK_DEFENSE_MUTATE;
        }else if (rand<7){ // 7/10000
            this.cultureDefense += .001;//this.INCREASE_ATTACK_DEFENSE_MUTATE;
        }else if (rand <7){ // 10
            if (this.culturePopGrowth<this.POP_GROWTH_LIMIT){
                this.culturePopGrowth += 0;
            }
        }else if (rand < 14){ // 10
            this.tilePopCap +=5 * thisTile.tileType.terrain.geoPopGrowth;
        }else if (rand  < 15){
            this.colony.attack+=.0005;
        }else if (rand  < 16){
            this.colony.defense+=0.0005;
        }else if (rand < 17){
            this.colony.activeNavalCap +=.001;
        }else if (rand < 22){
            if(!this.colony.traits.stagnant){
                this.colony.awaitingStrengthBoost += .000001 * this.colonyControl * this.pop;
            }
        }
    }

    /// Stats ///
    getMilitia(){
        //TODO make control affect population
        if(this.colony.traits.unpopular){
            return 0
        }
        return Math.floor(.08 * this.pop * this.colonyControl);
    }

    getTroops(){
        return this.troop.troopCount;
    }

    getCombinedRecruitPerc(){
        const recruitPerc = this.cultureRecruitPerc + this.colony.recruitPerc;
        if (recruitPerc > 90){
            return 90
        }else {
            return recruitPerc;
        }
    }

    lostBattleAsAttacker(){
        if (this.cultureAttack - this.DECREASE_ATTACK_AFTER_LOSS > this.MIN_ATTACK_AND_DEFENSE){
            this.cultureAttack -= this.DECREASE_ATTACK_AFTER_LOSS;
        }
    }
    lostBattleAsDefender(){
        if (this.cultureDefense - this.DECREASE_DEFENSE_AFTER_LOSS > this.MIN_ATTACK_AND_DEFENSE){
            this.cultureDefense -= this.DECREASE_DEFENSE_AFTER_LOSS;
        }
        if (this.tilePopCap-10 > 1){
            this.tilePopCap -= 1;
        }
    }

    wonBattleAsDefender(){
        this.cultureDefense += this.INCREASE_DEFENSE_AFTER_VICTORY;
    }

    wonBattleAsAttacker(){
        this.cultureAttack += this.INCREASE_ATTACK_AFTER_VICTORY;

    }

    increasePopWithGrowth(thisTile){ 
        //Logistic Way:
        this.pop += (this.POP_GROWTH_CONSTANT * thisTile.tileType.terrain.geoPopGrowth *  (1 - this.pop / this.tilePopCap) * this.pop);
    }

    checkIfStatsAreNewColonyMax(thisTile){
        if (this.pop > this.colony.maxPop){
            this.colony.maxPop = this.pop;
        }
        if (thisTile.getCombinedAttack() > this.colony.maxAttack){
            this.colony.maxAttack = thisTile.getCombinedAttack();
        }  
        if(thisTile.getCombinedDefense() > this.colony.maxDefense){
            this.colony.maxDefense = thisTile.getCombinedDefense();
        }
        
    }

    updateColonyDisplayStats(thisTile){
        // this.colony.totalAttack += this.cultureAttack + this.colony.attack;
        // this.colony.totalDefense += this.cultureDefense + this.colony.defense;
        this.colony.totalAttack += thisTile.getCombinedAttack();
        this.colony.totalDefense += thisTile.getCombinedDefense();
        this.colony.totalManpower += this.getManpower();

        this.colony.totalTiles ++;
        this.colony.totalPop += this.pop;
        this.colony.totalTroops += this.troop.troopCount;
    }

    decreasePop(amountToDecreaseBy){
        
        if (this.pop - amountToDecreaseBy < 0){
            this.pop = 0;
        }else{
            this.pop -= amountToDecreaseBy;
        }
    }

    increasePop(amount){
        this.pop += amount;
    }
    
    changePop(amount){
        this.pop += amount;
        if (this.pop < 0){
            this.pop = 0;
        }
        // console.log(`Amount: ${amount}`);
        // console.log(this.pop);
    }

    setPop(pop){
        this.pop = pop;
    }

    getCombinedPopulationAttack(){
        return (this.colony.milStrength + this.cultureAttack + this.colony.attack)
    }


    emptyTile(thisTile){
        //console.log(thisTile);

        thisTile.isEmpty = true;
        thisTile.toDraw = true;
        thisTile.isNew = true;
        thisTile.isOccupiedLand = false;
        this.pop = 0;
        

        //console.log("Making:" ,thisTile.x, thisTile.y , " Ship null")

    }
    emptyTileAfterColonySurrender(thisTile){
        //console.log(thisTile);

        thisTile.isEmpty = true;
        thisTile.toDraw = true;
        thisTile.isNew = true;
        thisTile.isOccupiedLand = false;

        //console.log("Making:" ,thisTile.x, thisTile.y , " Ship null")

    }

    pickARandomNESWTile(x, y, GAME_BOARD){
        const direction = Math.floor(Math.random()*4);
            
        //TODO check for wrap around
        if(x-1 >= 0 && x+1 < GAME_BOARD[0].length && y-1 >= 0 && y+1 < GAME_BOARD.length){
            if (direction == 0){
                //N
                return GAME_BOARD[y-1][x]
            }else if(direction == 1){
                //E
                return GAME_BOARD[y][x+1]
            }else if(direction == 2){
                //S
                return GAME_BOARD[y+1][x]
            }else if(direction == 3){
                //W
                return GAME_BOARD[y][x-1]
            }
            else{return null}
        }
    }
    // requests
    combatTroopRequestsMain(thisTile, GAME_BOARD){
        
        //check if this has a request to tile
        if (this.requestedTroopsTo == null){
            var newReqTroopsTo = this.pickARandomNESWTile(thisTile.x, thisTile.y, GAME_BOARD);
            if (newReqTroopsTo == null){
                return;
            }
            if (newReqTroopsTo.tileType instanceof LandTile && newReqTroopsTo.isEmpty == false){

                if (newReqTroopsTo.tileType.population.colony.teamId === this.colony.teamId && newReqTroopsTo.tileType.population.newReqTroopsFrom != null){
                    if (this.distanceFromCombat < newReqTroopsTo.tileType.population.distanceFromCombat){
                        //newReqTroopsTo.tileType.population.newReqTroopsFrom.toDraw = true;
                        newReqTroopsTo.tileType.population.newReqTroopsFrom = null;
                        this.requestedTroopsTo = newReqTroopsTo;
                        //thisTile.toDraw = true;
                        newReqTroopsTo.toDraw = true;
                    }
                }else{
                    this.requestedTroopsTo = newReqTroopsTo;
                    //thisTile.toDraw = true;
                    newReqTroopsTo.toDraw = true;

                }
            }

        }// else do nothing
    }


    getManpower(){
        //console.log(this.colony.colonyRecruitPerc * this.pop * this.colonyControl);
        // console.log(`Pop: ${this.pop} | Rec: ${this.colony.colonyRecruitPerc} | CC: ${this.colonyControl} = ${Math.floor(this.colony.colonyRecruitPerc * this.pop * this.colonyControl)}`);

        return Math.floor(this.colony.colonyRecruitPerc * this.pop * this.colonyControl);
    }
    
    createNewTroop(amount){
        if (this.getManpower() > amount){
            // console.log(`Amount: ${amount}, Reserve troops${this.colony.reserveTroops}`);

            this.colony.reserveTroops += amount;
            this.pop -= amount
            // this.storage.supply.decreaseSupply(amount)
        }
    }


}