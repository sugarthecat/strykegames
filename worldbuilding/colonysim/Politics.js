export default class Politics {

    ideoAuthority;
    ideoRadicalism;
    ideoProgress;


    constructor() {
        this.ideoAuthority = Math.random();
        this.ideoRadicalism = Math.random();
        this.ideoProgress = Math.random();
    }

    getIdeologyName(){
        let authAdj = 
        [
            "Anarcho-",
            "Minarchist ",
            "Libertarian ",
            "",
            "State ",
            "Authoritarian ",
            "Totalitarian "
        ]
        let progAdj = [
            "Right-Populism",
            "Paleoconservatism",
            "Traditionalism",
            "Conservativism",
            "Centrism",
            "Liberalism",
            "Progressivism",
            "Leftism",
            "Hyperprogressivism",
        ]
        let radAdj = [
            "Uncaring ",
            "Complacent ",
            "Aristocratic ",
            "Entrenched ",
            "Unreactive ",
            "Mild ",
            "Moderate ",
            "Hardline ",
            "Intense ",
            "Extreme ",
            "Revanchist ",
            "Radical ",
            "Revolutionary ",
        ]
        return (radAdj[Math.floor(this.ideoRadicalism*radAdj.length)] +  authAdj[Math.floor(this.ideoAuthority*authAdj.length)] + progAdj[Math.floor(this.ideoProgress*progAdj.length)])
    }
    getPoliticalDistance(pol){
        let authdist = Math.abs(pol.ideoAuthority-this.ideoAuthority)
        let progdist = Math.abs(pol.ideoProgress-this.ideoProgress)
        let raddist = Math.abs(pol.ideoRadicalism-this.ideoRadicalism)
        return Math.sqrt(authdist * authdist + progdist * progdist + raddist * raddist)
    }
    getColor(){
        return `hsl(${this.ideoProgress*360},${this.ideoRadicalism*100}%,${(1-this.ideoAuthority)*100}%)`
    }
    makeAllianceName(){
        
        let adj = [
            {name:"Global",x:0.3,y:0.6,z:0.7},
            {name:"United",x:0.4,y:0.5,z:0.6},
            {name:"Strategic",x:0.5,y:0.1,z:0.5},
            {name:"International",x:0.3,y:0.7,z:0.9},
            {name:"World",x:0.4,y:0.5,z:0.8},
            {name:"National",x:0.6,y:0.6,z:0.2},
            {name:"Greater",x:0.7,y:0.8,z:0.1},
            {name:"Multinational",x:0.4,y:0.4,z:0.3},
            {name:"Military",x:0.6,y:0.6,z:0.2},
            {name:"Grand",x:0.7,y:0.8,z:0},
            {name:"Supreme",x:0.9,y:0.9,z:0.3},
            {name:"Holy",x:0.9,y:1,z:0},
            {name:"Prolaterian",x:0.8,y:0.8,z:0.7},
            {name:"Workers",x:0.6,y:0.8,z:0.6},
            {name:"Peoples",x:0.7,y:0.8,z:0.8},
            {name:"Socialist",x:0.4,y:0.9,z:0.8},
            {name:"Communist",x:0.9,y:0.8,z:0.9},
            {name:"Total",x:1,y:0.8,z:0.5},
            {name:"Native",x:0.4,y:0.6,z:0.2},
            {name:"Original",x:0,y:0,z:1},
            {name:"Protective",x:0.5,y:0.3,z:0.6},
            {name:"Truthful",x:0.6,y:0.6,z:0.1},
            {name:"Princely",x:0.1,y:0.2,z:0},
            {name:"Crowns",x:0.8,y:0,z:0.1},
            {name:"Party",x:1,y:0.2,z:1},
        ]
        // auth rad prog
        let goal = [
            {name:"Defense",x:0.5,y:0.5,z:0.5},
            {name:"Holiness",x:1,y:1,z:1},
            {name:"Purity",x:0.7,y:0.8,z:0},
            {name:"Prosperity",x:0.2,y:0.4,z:0.5},
            {name:"Victory",x:0.7,y:0.4,z:0.4},
            {name:"Unity",x:1,y:0.6,z:0.6},
            {name:"Security",x:0.5,y:0.3,z:0.4},
            {name:"Liberation",x:0.3,y:0.7,z:0.7},]
        let org = [
            {name:"Alliance",x:0.5,y:0.5,z:0.5},
            {name:"Powers",x:0.7,y:0.7,z:0.3},
            {name:"Entente",x:0.4,y:0.2,z:0.5},
            {name:"Council",x:0.8,y:0.2,z:0.3},
            {name:"Order",x:0.9,y:0.2,z:0.1},
            {name:"Pact",x:0.6,y:0.6,z:0.4},
            {name:"Organization",x:0.3,y:0.5,z:0.5},
            {name:"Internationale",x:0.7,y:0.8,z:1},]
        let bad = [
            {name:"Imperialism",x:0.8,y:1,z:0.4},
            {name:"Colonialism",x:0.3,y:0.8,z:0.8},
            {name:"Fascism",x:0.5,y:0.5,z:0.3},
            {name:"Tyrrany",x:0,y:1,z:0.5},
            {name:"Liberialism",x:0.7,y:0.7,z:0.8},
            {name:"Communism",x:0.1,y:0.4,z:0.1},
            {name:"Progress",x:1,y:0.5,z:1},
            {name:"Rightist",x:0.8,y:0,z:0.6},
        ]
        for(let i = 0; i<bad.length; i++){
            if(
                Math.abs(bad[i].x - this.ideoAuthority) + 
                Math.abs(bad[i].y - this.ideoRadicalism) + 
                Math.abs(bad[i].z - this.ideoProgress) > 1
            ){
                bad.splice(i,1)
                i--;
            }
        }
        for(let i = 0; i<goal.length; i++){
            if(
                Math.abs(goal[i].x - this.ideoAuthority) + 
                Math.abs(goal[i].y - this.ideoRadicalism) + 
                Math.abs(goal[i].z - this.ideoProgress) > 1
            ){
                goal.splice(i,1)
                i--;
            }
        }
        for(let i = 0; i<adj.length; i++){
            if(
                Math.abs(adj[i].x - this.ideoAuthority) + 
                Math.abs(adj[i].y - this.ideoRadicalism) + 
                Math.abs(adj[i].z - this.ideoProgress) > 0.7
            ){
                adj.splice(i,1)
                i--;
            }
        }
        for(let i = 0; i<org.length; i++){
            if(
                Math.abs(org[i].x - this.ideoAuthority) + 
                Math.abs(org[i].y - this.ideoRadicalism) + 
                Math.abs(org[i].z - this.ideoProgress) > 1 
            ){
                org.splice(i,1)
                i--;
            }
        }
        if(org.length == 0){org = [{name: "Treaty"}]}
        if(bad.length == 0){bad = [{name: "Evil"}]}
        if(goal.length == 0){goal = [{name: "Protection"}]}
        if(adj.length == 0){adj = [{name: "Mutual"}]}
        let format = ['3 for 1 2', '1 2 3', '1 Anti-4 3','1 3 Against 4', '1 3 For 2 Against 4','1 2 Anti-4 3']
        let name = format[Math.floor(Math.random()*format.length)]
        name = name.replace('1',adj[Math.floor(Math.random()*adj.length)].name)
        name = name.replace('2',goal[Math.floor(Math.random()*goal.length)].name)
        name = name.replace('3',org[Math.floor(Math.random()*org.length)].name)
        name = name.replace('4',bad[Math.floor(Math.random()*bad.length)].name)
        return name
    }
}