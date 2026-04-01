
export default class Tile{

    mutateChance = 1; // 1/1000 of a chance
    size = 1;
    
    population;

    toDraw = true;
    isEmpty = true; 
    isNew = true; // if newly placed, dont take turn
    pop = 0;

    constructor(x,y, size){
        this.x = x;
        this.y = y;
        this.size = size;
    }

    NUM_TO_POP_GROWTH = 1; // number needed to reach in order to increase pop
    POP_NEEDED_TO_EXPAND = 2; // 10
    POP_NEEDED_TO_MIGRATE = 2; // 50 
    MIGRATION_DIVIDER = 50; // 50

    POP_GROWTH_DIVIDER = 1; // 1000
    TROOP_DIVIDER = 100; //100 Percentage, keep 100
    POP_GROWTH_LIMIT = 30; // 10

    INCREASE_ATTACK_DEFENSE_MUTATE = 1;

    INCREASE_DEFENSE_AFTER_VICTORY = .05;
    INCREASE_ATTACK_AFTER_VICTORY = .1;
    DECREASE_ATTACK_AFTER_LOSS = .1;
    DECREASE_DEFENSE_AFTER_LOSS = .1;

    MIN_ATTACK_AND_DEFENSE = .1;

    tilePopCap = 1000; // maximum pop allowed in tile

    // CULTURE_MIX_NOM = 2;
    // CULTURE_MIX_DEN = 1;


    /**
     * 
     * @param {object} colony 
     */
    setPoliticalValues(colony){
        this.colony = colony;
    }

    /**
     * 
     * @param {object} tileType 
     */
    setGeoValues(tileType){
        this.tileType = tileType; // object containing geo values
    }

    setPop(pop){
        this.pop = pop
    }
    
    /**
     * 
     * @param {double} attack 
     * @param {double} defense 
     * @param {double} popGrowth 
     * @param {double} recruitPerc 
     * @param {int} expandRate 
     */
    setCultureValues(attack, defense, recruitPerc, popGrowth, expandRate){
        this.cultureAttack = attack;
        this.cultureDefense = defense;
        this.culturePopGrowth = popGrowth;
        this.cultureRecruitPerc = recruitPerc;
        this.cultureExpandRate = expandRate;
    }
    
    getCombinedAttack(){
        return this.cultureAttack + this.colony.attack;
    }

    getCombinedDefense(){
        return this.cultureDefense + this.colony.defense;
    }
    
    setTransferStatsFromOldTileToEmptyTile(oldTile, migrateDivider=3){
        // make sure old tile has enough pop to donate
        // maybe make it so old tile doesnt donate pop if newtile has more
        if (oldTile.pop > 2){

            const donatedPop = Math.ceil(oldTile.pop/migrateDivider);
            this.pop += donatedPop;
            oldTile.pop -= donatedPop; 
            
            this.colony = oldTile.colony;
            this.toDraw = true;
            this.isEmpty = false;
            this.isNew = true;

            this.setCultureValues(oldTile.cultureAttack, oldTile.cultureDefense, oldTile.cultureRecruitPerc, oldTile.culturePopGrowth, oldTile.cultureExpandRate);
        }else{
            console.log("LOWER THAN 2 " + oldTile.x, oldTile.y , oldTile.pop);
        }
    }

    setStatsForInitialPlacement(colony, pop){
        this.setCultureValues(colony.attack, colony.defense, colony.recruitPerc, colony.popGrowth, colony.expandRate);
        this.colony = colony;
        this.colony.totalTiles++;
        this.pop = pop;
        this.isEmpty = false;
        this.isNew = false
    }

    // x value of where to draw tile
    getDrawX(){
        return this.x * this.size;
    }
    
    // y value of where to draw tile
    getDrawY(){
        return this.y * this.size;
    }
    
    // randomly sees if tile should expand
    attemptToExpand(){
        if (this.pop > this.POP_NEEDED_TO_EXPAND){
            const expandNumber = Math.floor(Math.random()*100);
            //console.log("ExpandNum:", expandNumber < (this.cultureExpandRate + this.colony.expandRate))
        
            if(expandNumber < (this.cultureExpandRate + this.colony.expandRate)){
                //console.log("TRUE");
                return true;
            }else{
                return false;
            }
        }
    }
    
    print() {
        console.log("(" + this.x +", " +this.y + ")");
    }


    turnDuties(){
        const birthNum = Math.floor(Math.random() * 1000);
        //checks if tile can grow pop (by random and tile capacity)
        if (birthNum > this.NUM_TO_POP_GROWTH && this.pop < this.tilePopCap){
            this.increasePopWithGrowth();
        }
        
    }

    attackEnemyTile(enemyTile){
        //TODO add a little random to fighting

        var outcome = Math.floor((this.getTroops() * this.getCombinedAttack()) - (enemyTile.getTroops() * enemyTile.getCombinedDefense()));
        if (outcome >0){
            // Attackers won

            const remainingTroops = Math.ceil(outcome/this.getCombinedAttack());
            const lostTroops = this.getTroops() - remainingTroops;
            this.pop = this.pop - lostTroops;

            enemyTile.pop -= enemyTile.getTroops();
            this.wonBattleAsAttacker();
            enemyTile.lostBattleAsDefender();

            return true;
        }else if (outcome == 0){
            //both die
            this.pop -= this.getTroops();
            enemyTile.pop -= enemyTile.getTroops();


            return false;
        }else{
            // Defenders/enemies Won 

            // make outcome positive
            outcome *= -1;
            const remainingTroops = Math.ceil(outcome/enemyTile.getCombinedDefense());
            const lostTroops = enemyTile.getTroops() - remainingTroops;
            enemyTile.pop -= lostTroops;
            this.pop -= this.getTroops();

            enemyTile.cultureDefense -= .1;
            //enemyTile.wonBattleAsDefender();
            //this.lostBattleAsAttacker()
 
            return false;
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
    }

    wonBattleAsDefender(){
        this.cultureDefense += this.INCREASE_DEFENSE_AFTER_VICTORY;
    }

    wonBattleAsAttacker(){
        this.cultureAttack += this.INCREASE_ATTACK_AFTER_VICTORY;

    }

    // pop migration
    migrateSomePopToTile(toTile){
        if (this.pop > this.POP_NEEDED_TO_MIGRATE){
            const popDonation = Math.floor(this.pop/this.MIGRATION_DIVIDER);
            toTile.pop +=popDonation;
            this.pop -= popDonation;
        }
    }

    tranferStatsFromAttackerTile(oldTile){
        //TODO mixing of culture values,, use this function for now
        // make sure old tile has enough pop to donate
        // maybe make it so old tile doesnt donate pop if newtile has more
        if (this.pop < 2 && oldTile.pop > 2){

            const donatedPop = Math.ceil(oldTile.pop/this.MIGRATION_DIVIDER);
            this.pop += donatedPop;
            oldTile.pop -= donatedPop; 
        }
        this.colony = oldTile.colony;
        this.toDraw = true;
        this.isEmpty = false;
        this.isNew = true;
            //TODO why is attacker tranfering culture stats?

            //this.setCultureValues(oldTile.cultureAttack, oldTile.cultureDefense, oldTile.cultureRecruitPerc, oldTile.culturePopGrowth, oldTile.cultureExpandRate);

            //this.setCultureValues(this.CULTURE_MIX_NOM*oldTile.cultureAttack/this.CULTURE_MIX_DEN + this.cultureAttack/this.CULTURE_MIX_DEN, this.CULTURE_MIX_NOM*oldTile.cultureDefense/this.CULTURE_MIX_DEN + this.cultureDefense/this.CULTURE_MIX_DEN, this.CULTURE_MIX_NOM*oldTile.cultureRecruitPerc/this.CULTURE_MIX_DEN + this.cultureRecruitPerc/this.CULTURE_MIX_DEN, this.CULTURE_MIX_NOM*oldTile.culturePopGrowth/this.CULTURE_MIX_DEN + this.culturePopGrowth/this.CULTURE_MIX_DEN, this.CULTURE_MIX_NOM*oldTile.cultureExpandRate/this.CULTURE_MIX_DEN + this.cultureExpandRate/this.CULTURE_MIX_DEN);
    }

    getTroops(){
        //TODO is this redundant?
        if (this.pop > 1){
            //console.log(`Pop: ${this.pop} | Troops: ${Math.ceil((this.pop*this.getCombinedRecruitPerc())/this.TROOP_DIVIDER)}`)
            return Math.floor((this.pop*this.getCombinedRecruitPerc())/this.TROOP_DIVIDER);
        }else{
            return 0;
        }
    }

    getCombinedDefense(){
        return (this.cultureDefense + this.colony.defense) * this.tileType.geoDefense;
    }

    getCombinedRecruitPerc(){
        const recruitPerc = this.cultureRecruitPerc + this.colony.recruitPerc;
        if (recruitPerc > 90){
            return 90
        }else {
            return recruitPerc;
        }
    }

    getCombinedPopGrowth(){
        return (this.culturePopGrowth + this.colony.popGrowth) * this.tileType.terrain.geoPopGrowth;
    }

    getCombinedAttack(){
        return (this.cultureAttack + this.colony.attack) * this.tileType.geoAttack;
    }

    increasePopWithGrowth(){        
        //console.log("Increasing Pop By: ", Math.ceil(this.pop * (this.getCombinedPopGrowth())/this.POP_GROWTH_DIVIDER)+1);
    //OLD WAY:    //this.pop += Math.ceil(this.pop * (this.getCombinedPopGrowth())/this.POP_GROWTH_DIVIDER);
    //Logistic Way:
    this.pop += (.1 * (1 - this.pop / this.tilePopCap) * this.pop) * this.tileType.terrain.geoPopGrowth;
    
    }

    updateColonyDisplayStats(){
        this.colony.totalAttack += this.cultureAttack + this.colony.attack;
        this.colony.totalDefense += this.cultureDefense + this.colony.defense;
        this.colony.totalTiles ++;
        this.colony.totalPop += this.pop;
    }

    checkEmpty(){
        //if (this.pop < 0)
    }

    attemptMutateCulture(){
        //TODO fix attack mutation
        // TODO smaybe share with friendly nieghbhor (like migration)

        var rand = Math.random()*1000
        if (rand < 2){ // 2/10000
            this.cultureAttack+= this.INCREASE_ATTACK_DEFENSE_MUTATE;
        }else if (rand<7){ // 7/10000
            this.cultureDefense += this.INCREASE_ATTACK_DEFENSE_MUTATE;
        }else if (rand <7){ // 10
            if (this.culturePopGrowth<this.POP_GROWTH_LIMIT){
                this.culturePopGrowth += 0;
            }
        }else if (rand < 14){ // 10
            this.tilePopCap +=20 * this.tileType.terrain.geoPopGrowth;
        }else if (rand  < 15){
            this.colony.attack+=.0001;
        }else if (rand  < 16){
            this.colony.defense+=0.0001;
        }

    }

    checkIfStatsAreNewColonyMax(){
        if (this.pop > this.colony.maxPop){
            this.colony.maxPop = this.pop;
        }
        if (this.getCombinedAttack() > this.colony.maxAttack){
            this.colony.maxAttack = this.getCombinedAttack();
        }  
        if(this.getCombinedDefense() > this.colony.maxDefense){
            this.colony.maxDefense = this.getCombinedDefense();
        }
    }


    setTransferStatsFromOldWaterToEmptyLand(oldWaterTile){
        // moves "ship" to a new water tile

        this.pop = oldWaterTile.pop;
        this.colony = oldWaterTile.colony;
        this.setCultureValues(oldWaterTile.cultureAttack, oldWaterTile.cultureDefense, oldWaterTile.cultureRecruitPerc, oldWaterTile.culturePopGrowth, oldWaterTile.cultureExpandRate);


        //update this
        this.isEmpty = false;
        this.isNew = true;
        this.toDraw = true;

        // update old Tile
        oldWaterTile.isEmpty = true;
        oldWaterTile.toDraw = true;
        oldWaterTile.colony = null;
        oldWaterTile.pop = 0;
        oldWaterTile.isNew = true;

        // decrease current navy
        this.colony.currentActiveShips --;

    }
    navalBattleAnotherWaterTile(enemyTile){
        //TODO implement function
    
    }

    tranferStatsFromOldWaterToNewWaterTile(oldWaterTile){
       
        // moves "ship" to a new water tile

        this.pop = oldWaterTile.pop;
        this.colony = oldWaterTile.colony;
        this.setCultureValues(oldWaterTile.cultureAttack, oldWaterTile.cultureDefense, oldWaterTile.cultureRecruitPerc, oldWaterTile.culturePopGrowth, oldWaterTile.cultureExpandRate);
       

        //update this
        this.isEmpty = false;
        this.isNew = true;
        this.toDraw = true;

        // update old Tile
        oldWaterTile.isEmpty = true;
        oldWaterTile.toDraw = true;
        oldWaterTile.colony = null;
        oldWaterTile.pop = 0;
        oldWaterTile.isNew = true;
        
    }

    tranferStatsFromLandToNewWaterTile(oldWaterTile){
               
        // moves "ship" to a new water tile

        this.pop = oldWaterTile.pop;
        this.colony = oldWaterTile.colony;
        this.setCultureValues(oldWaterTile.cultureAttack, oldWaterTile.cultureDefense, oldWaterTile.cultureRecruitPerc, oldWaterTile.culturePopGrowth, oldWaterTile.cultureExpandRate);
       
        // update isEmpty
        this.isEmpty = false;
        oldWaterTile.isEmpty = true;

        this.isNew = true;
        this.toDraw = true;

        //console.log("NEW SHIP PLACED");

    }

    checkIfAtPopCap(){
        return this.pop >= this.tilePopCap;
    }
    getDrawSize(){
        return this.size;
    }

}


 
