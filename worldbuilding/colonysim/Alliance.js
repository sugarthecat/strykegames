import demAllianceFlag from "./flagTypes/demAllianceFlag.js"
export default class Alliance{
    constructor(formingMember1,formingMember2){
        this.traits = {}
        this.flagCanvas = document.createElement('canvas')
        this.flagCanvas.width = 600
        this.flagCanvas.height = 400
        this.setFlag(new demAllianceFlag())
        if(formingMember1 && formingMember2){
            // in game creation
            this.members = []
            this.name = formingMember1.politics.makeAllianceName()
            this.addMember(formingMember1)
            this.addMember(formingMember2)
            this.color = Math.floor(Math.random()*16777215).toString(16);
            while(this.color.length < 6){
                this.color = '0'+this.color
            }
            this.color = '#' + this.color
        }else{
            this.members = []
            //player creation
        }
        //console.log(this.name + ' formed between ' + formingMember1.teamId + ' and ' +formingMember2.teamId)
    }
    getTraitString(){
        let outstring = ""
        if(this.traits.locked){
            outstring += "l"
        }
        if(this.traits.loyal){
            outstring += "y"
        }
        return outstring
    }
    getTotalPop(){
        let totalPop = 0
        for(let i = 0; i<this.members.length; i++){
            totalPop += this.members.getTotalPop()
        }
        return totalPop
    }
    collectiveStrengthBoost(){
        let maxStrength = 0;
        let strengthBoost = 0;
        for(let i = 0; i<this.members.length; i++){
            if(this.members[i].milStrength > maxStrength){
                maxStrength = this.members[i].milStrength
            }
            strengthBoost += this.members[i].awaitingStrengthBoost;
            this.members[i].awaitingStrengthBoost = 0;
        }
        for(let i = 0; i<this.members.length; i++){
            if(!this.members[i].traits.stagnant){
                this.members[i].milStrength += strengthBoost;
            }
        }
    }
    setFlag(flag){
        this.flag = flag
        this.flag.displayInCanvas(this.flagCanvas)
    }
    wouldAccept(applicant){
        for(let i =0; i<this.members.length; i++){
            if(this.members[i].politics.getPoliticalDistance(applicant.politics) > 0.3){
                return false;
            }
        }
        return true;
    }
    
    addMember(member){
        this.members.push(member)
        member.clearAllianceStub()
        member.needsRedraw = true
        member.alliance = this
        //console.log(member.teamId + " joins "+this.name)
        for(let i = 0; i<member.enemies.length; i++){
            this.callAllies(member.enemies[i])
        }
        if(this.members.length > 0){
            for(let i = 0; i<this.members[0].enemies.length; i++){
                this.callAllies(this.members[0].enemies[i])
            }
        }
        this.removeDeadMembers()
    }
    callAllies(enemy){
        for(let i = 0; i<this.members.length; i++){
            this.members[i].declareWar(enemy)
        }
    }
    removeMember(member){
        for(let i = 0; i<this.members.length; i++){
            if(this.members[i] == member){
                this.members[i].clearAllianceStub();
                this.members[i].alliance = false
                this.members.splice(i,1)
                i--;
            }
        }
    }
    removeDeadMembers(){
        for(let i = 0; i<this.members.length; i++){
            if(this.members[i].isDead){
                this.members[i].clearAllianceStub();
                this.members.splice(i,1)
                i--;
            }
        }
    }
    getMemberCount(){
        return this.members.length;
    }
    getSaveString(colonyArray){
        return `${this.name},${this.color},${this.getColonyList(colonyArray)},${this.flag.getExportCode()}`
    }
    getColonyList(colonyArray){
        this.removeDeadMembers()
        let colList = []
        for(let i = 0; i<colonyArray.length; i++){
            if(this.members.includes(colonyArray[i])){
                colList.push(i)
            }
        }
        return colList.join('-')
    }
}