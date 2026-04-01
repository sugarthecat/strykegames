import DemocraticFlag from "./flagTypes/democraticFlag.js";
import FascistFlag from "./flagTypes/fascistFlag.js";
import CommunistFlag from "./flagTypes/communistFlag.js";
import Alliance from "./Alliance.js";
import Politics from "./Politics.js";
import gameruleInterFace from "./gameruleInterface.js";

export default class colony {

    totalPop = 0;
    totalAttack = 0;
    totalTiles = 0;
    totalDefense = 0;
    totalTroops = 0;
    totalInCombatTiles = 0;
    totalManpower = 0;

    maxTotalPop = 0;

    newTiles = 0; // TODO implement new tile to check if colony is dead still need to delete ships (maybe not)

    maxPop = 0;
    maxAttack = 0;
    maxDefense = 0;
    maxStength = 0;

    prevMaxPop = 0;

    prevMaxAttack = 0;
    prevMaxDefense = 0;
    prevTotalTiles = 0;
    prevInCombatTiles = 0;

    awaitingStrengthBoost = 0; //strength gained in this round;

    tileCapacity = 900;
    //troops
    reserveTroops = 0;
    milStrength;
    SELECTOR;

    // naval
    activeNavalCap = 20; // 50
    currentActiveShips = 0;
    currentShipBuild = 0;
    shipProductionCost = 1000; //1000

    // locally saved data (for graphs)
    savedPopulationHistory = [] // history of population
    savedMilStrengthHistory = [] // history of military strengh
    savedActiveTroopsHistory = [] // history of active troops    
    savedActiveShipsHistory = [] // history of active ships


    UPDATE_COLONY_DATA_TICKER_MAX = 20;
    updateColonyDataTicker = 0;
    MAX_COLONY_DATA_STORAGE = 150; // amount of data to keep in history arrays


    cultureNameDict = {}


    // HTML
    overlayButton;

    //reserve
    isDead = false;

    constructor(teamId, color, selector, flag) {

        //String id
        this.teamId = teamId;
        this.needsRedraw = false
        //String Hexadecimal color
        this.color = color;
        this.SELECTOR = selector;
        this.enemies = []
        this.traits = {
            neutral: false,
            landlocked: false,
            noalliance: false,
            warmonger: false,
            stagnant: false,
            defender: false,
            demilitarized: false,
            unpopular: false,
        }
        
        this.alliance = false
        this.politics = new Politics()
        
        if(flag === undefined){
            this.flag = new DemocraticFlag();
            if(this.politics.ideoProgress < 0.3){
                //this.flag = new FascistFlag();                
            }else if(this.politics.ideoProgress > 0.7){
                //this.flag = new CommunistFlag();
            }
        }else{
            this.flag = flag
        }
        //console.log(this.SELECTOR);
    }
    setTraitString(traits) {
        this.traits = {
            neutral: false,
            landlocked: false,
            noalliance: false,
            warmonger: false,
            stagnant: false,
            defender: false,
            demilitarized: false,
            unpopular: false,
        }
        if (traits.includes('s')) {
            this.traits.noalliance = true
        }
        if (traits.includes('l')) {
            this.traits.landlocked = true
        }
        if (traits.includes('n')) {
            this.traits.neutral = true
        }
        if (traits.includes('p')) {
            this.traits.stagnant = true
        }
        if (traits.includes('w')) {
            this.traits.warmonger = true
        }
        if (traits.includes('d')) {
            this.traits.defender = true
        }
        if (traits.includes('z')) {
            this.traits.demilitarized = true
        }
        if (traits.includes('u')) {
            this.traits.unpopular = true
        }
        //console.log(this.traits)
    }
    getTraitString() {
        let outstring = ""
        if (this.traits.neutral) {
            outstring += 'n'
        }
        if (this.traits.landlocked) {
            outstring += 'l'
        }
        if (this.traits.noalliance) {
            outstring += 's'
        }
        if (this.traits.warmonger) {
            outstring += 'w'
        }
        if (this.traits.stagnant) {
            outstring += 'p'
        }
        if (this.traits.defender) {
            outstring += 'd'
        }
        if (this.traits.demilitarized) {
            outstring += 'z'
        }
        if (this.traits.unpopular) {
            outstring += 'u'
        }
        return outstring
    }
    newideology() {
        this.politics = new Politics()
    }
    /**
     * 
     * @param {double} attack 
     * @param {double} defense 
     * @param {int} expandRate 
     * @param {double} recruitPerc 
     * @param {double} popGrowth 
     */
    setColonyStats(attack, defense, recruitPerc, popGrowth, expandRate, milStrength) {
        this.attack = attack;
        this.defense = defense;
        this.expandRate = expandRate;
        this.colonyRecruitPerc = recruitPerc;
        this.popGrowth = popGrowth;
        this.milStrength = milStrength;
    }
    willDoWar(colony) {
        if (this.traits.neutral) {
            return false;
        }
        if (this.alliance == colony.alliance && this.alliance) {
            return false
        }
        if (this.traits.warmonger) {
            return true;
        }
        if (Math.random() * 1.5 < (this.politics.getPoliticalDistance(colony.politics) + 0.05)) {
            return false
        }
        if (colony.getTotalPop() * colony.milStrength < this.milStrength * this.getTotalPop() / 50) {
            return true
        }
        if (colony.getTotalPop() * colony.milStrength > this.getTotalPop() * 3 * this.milStrength) {
            return false
        }
        let totalEnemyPop = 0
        for (let i = 0; i < this.enemies.length; i++) {
            totalEnemyPop += this.enemies[i].milStrength * this.enemies[i].totalPop;
        }
        return totalEnemyPop + colony.getTotalPop() * colony.milStrength < this.getTotalPop() * 1.2 * this.milStrength
    }
    checkAlliance() {
        this.alliance.removeDeadMembers()
        if (this.alliance.members.length == 1) {
            //console.log(this.alliance.name + ' dissolves.')
            this.alliance = false
            this.createNewAllianceStub()
            this.needsRedraw = true
        }
    }
    declareWar(team) {
        if (this.alliance) {
            this.checkAlliance()
        }
        if (!(this.isAtWar(team) || team == this || (team.alliance == this.alliance && (this.alliance || team.alliance)))) {
            //console.log(this.teamId + ' declares naval war on ' + team.teamId)
            this.enemies.push(team);
            //console.log(this.teamId + ' Declares war on ' + team.teamId)
            //console.log(team)
            team.declareWar(this)
            if (this.alliance) {
                for (let i = 0; i < team.enemies.length; i++) {
                    if (team.enemies[i] != this && team.enemies[i].alliance == false) {
                        if (team.enemies[i].wouldAlly(this) && this.wouldAlly(team.enemies[i])) {
                            this.alliance.addMember(team.enemies[i])
                        }
                    }
                }
                for (let i = 0; i < team.enemies.length; i++) {
                    if (team.enemies[i] != this && team.enemies[i].alliance) {
                        //merge alliances?
                    }
                }
            } else {
                for (let i = 0; i < team.enemies.length; i++) {
                    if (team.enemies[i] != this && team.enemies[i].alliance && this.alliance == false) {
                        if (team.enemies[i].wouldAlly(this) && this.wouldAlly(team.enemies[i]) && gameruleInterFace.alliances()) {
                            team.enemies[i].alliance.addMember(this)
                        }
                    }
                }
                for (let i = 0; i < team.enemies.length; i++) {
                    if (team.enemies[i] != this && team.enemies[i].alliance == false && this.alliance == false) {
                        if (team.enemies[i].wouldAlly(this) && this.wouldAlly(team.enemies[i]) && gameruleInterFace.alliances()) {
                            this.alliance = new Alliance(this, team.enemies[i])
                        }
                    }
                }
            }
            if (this.alliance) {
                this.alliance.callAllies(team)
            }
        }
    }
    wouldAlly(prospect) {
        if (this.traits.noalliance) {
            return false
        }
        if (this.politics.getPoliticalDistance(prospect.politics) > 0.3) {
            return false
        }
        if (prospect.politics.alliance && prospect.politics.alliance.wouldAccept(this)) {
            return false
        }
        if (this.isAtWar(prospect)) {
            return false
        }
        if (prospect.alliance) {
            for (let i = 0; i < prospect.alliance.members.length; i++) {
                if (this.isAtWar(prospect.alliance.members[i])) {
                    return false
                }
            }
        }
        return true
    }
    getideology() {
        return `${this.politics.getIdeologyName()}`
    }
    isAtWar(enemy) {
        for (let i = 0; i < this.enemies.length; i++) {
            if (this.enemies[i] == enemy) {
                return true
            }
        }
        return false
    }
    updateMaxTotalPop() {
        if (this.totalPop > this.maxTotalPop) {
            this.maxTotalPop = this.totalPop
        }
    }
    wouldDie() {
        return (this.totalPop * 10 < this.maxTotalPop) || this.totalTiles == 0
    }
    resetTotalDisplayStats() {
        this.totalPop = 0;
        this.totalAttack = 0;
        this.totalDefense = 0;
        this.totalTiles = 0;
        this.totalTroops = 0;
        this.totalInCombatTiles = 0;
        this.totalManpower = 0;
        this.maxPop = 0;
        this.newTiles = 0
    }

    // resets stats used for displaying map mode colors
    resetMaxStats() {
        this.maxAttack = 0;
        this.maxDefense = 0;
        this.maxPop = 0;
    }

    returnStatsToString() {
        const troopText = this.getTroopText();
        const reservetext = this.getReserveText();
        const manpowerText = this.getManpowerText();
        const popText = this.getPopText();
        //return (this.teamId + " | Tiles: " + this.totalTiles + " | Pop: " + this.totalPop + " | Avg Attack: " + Math.ceil(this.totalAttack/this.totalTiles) + " | Avg Defense: " + Math.ceil(this.totalDefense/this.totalTiles) + " | maxPop: " + this.maxPop + " | ") + this.tileCapacity;  
        return `${this.politics.getIdeologyName()} <br/> Alliance: ${this.getAllianceName()} <br/> Tiles: ${this.totalTiles} <br/> Pop: ${popText}  <br/>  Avg Strength: ${Math.ceil(this.milStrength)} 
        <br/> Total Troops: ${troopText}  <br/> Reserve/ManPower: ${reservetext}/${manpowerText}  <br/> Ships: ${this.currentActiveShips}`;
    }

    getAllianceName() {
        if (this.alliance) {
            return this.alliance.name
        } else {
            return 'None'
        }
    }
    getPopText() {
        const totalCombPop = this.totalPop + this.totalTroops + this.reserveTroops;
        if (totalCombPop > 1_000_000) {
            return (Math.trunc(totalCombPop / 100_000) / 10) + "M"
        } else if (totalCombPop > 10_000) {
            return Math.trunc(totalCombPop / 10_000) + "K"
        }
        else {
            return Math.trunc(totalCombPop);
        }
    }

    strengthBoost(){
        this.milStrength += this.awaitingStrengthBoost;
        this.awaitingStrengthBoost = 0;
    }

    getTroopText() {

        var troopText;
        if (this.totalTroops > 5000) {
            troopText = Math.trunc(this.totalTroops / 1000) + "K"
        } else {
            troopText = Math.trunc(this.totalTroops);
        }
        return troopText;
    }

    getReserveText() {
        var reserveText;
        if (this.reserveTroops > 5000) {
            reserveText = Math.trunc(this.reserveTroops / 1000) + "K"
        } else {
            reserveText = Math.trunc(this.reserveTroops);
        }
        return reserveText;
    }

    getManpowerText() {
        var manpowerText;
        if (this.totalManpower > 5000) {
            manpowerText = Math.trunc(this.totalManpower / 1000) + "K"
        } else {
            manpowerText = Math.trunc(this.totalManpower);
        }
        return manpowerText;
    }



    getActiveShips() {
        return this.currentActiveShips;
    }


    getActiveTroops() {
        return this.totalTroops;
    }

    /**
     * 
     * Editor
     * 
     */


    changeReserveTroopsAmount(amountToChange) {
        //console.log(`Current Troop amount = ${this.reserveTroops}`)

        // console.log(`Change Troops by = ${amountToChange}`)
        // TODO find out troops arent being added proper;y
        if (this.reserveTroops + amountToChange <= 0) {
            this.reserveTroops = 0;
        } else {
            this.reserveTroops += amountToChange;
            // console.log(`${this.reserveTroops} + ${amountToChange} = ${this.reserveTroops + this.amountToChange}`)

        }
        // console.log(`New Troop amount = ${this.reserveTroops}`)
    }

    addShipsByAmount(amount) {
        if (amount > 0) {
            this.activeNavalCap += amount;
            this.currentShipBuild += amount * this.shipProductionCost;
        }
    }


    changeMilStrengthAmount(amount) {
        if (this.milStrength + amount <= 0) {
            this.milStrength = 0;
        } else {
            this.milStrength += amount;
        }
    }

    /**
     * Saving local data for graphs
     */

    saveLocalColonyData() {
        if (this.updateColonyDataTicker >= this.UPDATE_COLONY_DATA_TICKER_MAX) {
            this.addCurrentPopToPopHistory();
            this.addCurrentMilStrengthToHistory();
            this.addCurrentActiveTroopsToHistory();
            this.addCurrentActiveShipsToHistory();

            this.updateColonyDataTicker = 0;
        } else {
            this.updateColonyDataTicker++;
        }
    }

    addCurrentMilStrengthToHistory() {
        if (this.savedMilStrengthHistory.length > this.MAX_COLONY_DATA_STORAGE) {
            this.savedMilStrengthHistory.shift();
        }
        this.savedMilStrengthHistory.push(this.milStrength);
    }

    addCurrentActiveTroopsToHistory() {
        if (this.savedActiveTroopsHistory.length > this.MAX_COLONY_DATA_STORAGE) {
            this.savedActiveTroopsHistory.shift();
        }
        this.savedActiveTroopsHistory.push(this.getActiveTroops());
    }

    addCurrentPopToPopHistory() {
        if (this.savedPopulationHistory.length > this.MAX_COLONY_DATA_STORAGE) {
            this.savedPopulationHistory.shift();
        }
        this.savedPopulationHistory.push(this.totalPop);
    }

    addCurrentActiveShipsToHistory() {
        if (this.savedActiveShipsHistory.length > this.MAX_COLONY_DATA_STORAGE) {
            this.savedActiveShipsHistory.shift();
        }
        this.savedActiveShipsHistory.push(this.getActiveShips());
    }


    getSavedMilStrengthHistory() {
        return this.savedMilStrengthHistory;
    }
    getSavedActiveTroopsHistory() {
        return this.savedActiveTroopsHistory;
    }
    getSavedPopulationHistory() {
        return this.savedPopulationHistory;
    }
    getSavedActiveShipsHistory() {
        return this.savedActiveShipsHistory;
    }
    clearEnemies(){
        this.enemies = []
    }
    isAtPeace() {
        return this.enemies.length == 0
    }
    leaveAlliance() {
        if (this.alliance != false) {
            this.alliance.removeMember(this)
            this.alliance = false;
            this.needsRedraw = true;
            this.createNewAllianceStub();
        }
    }

    increaseNewTilesByOne() {
        this.newTiles++;
    }


    setCurrentMaxToPrevMax() {
        this.prevMaxAttack = this.maxAttack;
        this.prevMaxDefense = this.maxDefense;
        this.prevMaxPop = this.maxPop;
        this.prevTotalTiles = this.totalTiles;
        this.prevInCombatTiles = this.totalInCombatTiles;
    }
    clearAllianceStub() {
        if (this.allianceStub) {
            this.allianceStub.remove()
        }
        this.allianceStub = false
        this.allianceCheckbox = false
    }
    createNewAllianceStub() {
        this.clearAllianceStub()
        this.allianceStub = document.createElement('div')
        this.allianceStub.className = "alliance_stub"
        this.allianceStub.innerHTML = this.teamId
        this.allianceCheckbox = document.createElement('input')
        this.allianceCheckbox.type = 'checkbox'
        this.allianceCheckbox.className = 'alliance_checkbox'
        this.allianceStub.appendChild(this.allianceCheckbox)
        let allianceStubPlace = document.getElementById('alliance_members_editor')
        allianceStubPlace.insertBefore(this.allianceStub, allianceStubPlace.children[allianceStubPlace.children.length - 1])
    }
    createNewStatDisplay() {
        this.display = document.createElement('div');
        this.flagCanvas = document.createElement('canvas');
        this.flagCanvas.width = 600;
        this.flagCanvas.height = 400;
        this.flagCanvas.className = "flag_canvas"
        this.colonyName = document.createElement('h3');
        this.colonyName.className = 'colony_name'
        this.statspan = document.createElement("span");
        this.statspan.className = 'colony_stats'
        this.nameFlagDisplay = document.createElement('div')
        this.nameFlagDisplay.appendChild(this.flagCanvas)
        this.nameFlagDisplay.appendChild(this.colonyName)
        this.display.appendChild(this.nameFlagDisplay)
        this.colonyName.innerText = this.teamId
        this.flag.displayInCanvas(this.flagCanvas)
        this.display.appendChild(this.statspan)
        this.statspan.innerHTML = this.returnStatsToString();
        this.element = document.getElementById("stat_holder")
        this.element.appendChild(this.display);
    }
    getEnemyArray(COLONY_ARRAY) {
        let outArray = []
        for (let i = 0; i < this.enemies.length; i++) {
            if (COLONY_ARRAY.indexOf(this.enemies[i]) != -1) {
                outArray.push(COLONY_ARRAY.indexOf(this.enemies[i]))
            }
        }
        return outArray.join('║')
    }

    updateCultureNameDictWithCulture(cultureName, pop) {
        this.cultureNameDict[cultureName] = (this.cultureNameDict[cultureName] || pop) + pop;
    }

    getCultureNameDict() {
        return this.cultureNameDict;
    }

    clearCultureNameDict() {
        this.cultureNameDict = {};
    }

    removeOldStatDisplay() {
        document.getElementById(this.teamId).remove();
    }

    displayStats() {
        //console.log("TOTAL TILES:", this.totalTiles);
        if (this.isDead) {
            //this.element.parentNode.removeChild(this.element);
        } else {
            this.statspan.innerHTML = this.returnStatsToString().replace(/'|'/g, '<br/>');
            this.flag.displayInCanvas(this.flagCanvas)
        }
    }



    checkDead() {
        if (this.totalTiles <= 0) {
            this.isDead = true;
            //console.log(this.teamId,"IsDead");
            return true;
        } else {
            return false;
        }
    }

    createNewOverlayButton() {
        this.overlayButton = document.createElement("Button")
        document.getElementById("overlay_buttons").appendChild(this.overlayButton);
        this.overlayButton.innerText = this.teamId;
        //console.log(this.SELECTOR);
        this.overlayButton.onclick = () => {
            this.SELECTOR.selectorType = "draw_colony";
            this.SELECTOR.selectedColony = this;
        }


        // TODO set selector colony to this colony when clicked
    }

    hasTiles() {
        return (this.totalTiles > 0);
    }


    getTotalPop() {
        return this.totalPop;
    }

    getCondensedAttack() {
        return this.round(this.attack, 3);
    }
    getCondensedDefense() {
        return this.round(this.defense, 3);
    }
    getCondensedMilStrength() {
        return this.round(this.milStrength, 3);
    }

    getEnemiesString() {
        var enemyString = ""
        for (let i = 0; i < this.enemies.length; i++) {
            if (this.enemies[i].isDead) {
                this.enemies.splice(i, 1)
                i--;
            } else {
                enemyString += `${this.enemies[i].teamId}| `

            }
        }

        return enemyString.substring(0, enemyString.length - 2);
    }

    round(num, places) {
        var multiplier = Math.pow(10, places);
        return Math.round(num * multiplier) / multiplier;
    }


}