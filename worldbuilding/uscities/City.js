class City {
    constructor(cityObj) {
        if (cityObj.faction !== undefined) {
            for (let i = 0; i < factions.length; i++) {
                if (factions[i].id == cityObj.faction) {
                    this.faction = factions[i];
                    break;
                }
            }
            console.log
        }
        this.connections = [];
        this.name = cityObj.name;
        this.lng = cityObj.lng;
        this.lat = cityObj.lat;
        this.research = cityObj.research;
        this.legitimacy = cityObj.legitimacy;
        this.industry = cityObj.industry;
        this.unitCap = cityObj.unitCap;
    }
    Draw() {

        push()
        fill(this.faction.color)
        if (this.legitimacy > 20) {
            circle(adjX(this.lng), adjY(this.lat), 16)
            fill(255)
            circle(adjX(this.lng), adjY(this.lat), 10)
            fill(0)
            circle(adjX(this.lng), adjY(this.lat), 6)
        } else {
            circle(adjX(this.lng), adjY(this.lat), 12)
        }
        pop()
    }
    DrawSelected() {

        push()
        fill(this.faction.color)
        if (this.legitimacy > 20) {
            circle(adjX(this.lng), adjY(this.lat), 30)
            fill(255)
            circle(adjX(this.lng), adjY(this.lat), 20)
            fill(0)
            circle(adjX(this.lng), adjY(this.lat), 12)
        } else {
            circle(adjX(this.lng), adjY(this.lat), 30)
        }
        pop()
    }
    DrawConnections() {
        push()
        noFill()
        stroke(255)
        strokeWeight(1.5)
        let conns = this.connections;
        for (let j = 0; j < conns.length; j++) {
            line(adjX(this.lng), adjY(this.lat), adjX(conns[j].lng), adjY(conns[j].lat))
        }
        pop()
    }
}