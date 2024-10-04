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
        if (this.legitimacy > 10) {
            circle(adjX(this.lng), adjY(this.lat), 16)
            fill(255)
            circle(adjX(this.lng), adjY(this.lat), 10)
            fill(0)
            circle(adjX(this.lng), adjY(this.lat), 6)
        }else{
            
            fill(0)
            circle(adjX(this.lng), adjY(this.lat), 8)
            fill(255)
            circle(adjX(this.lng), adjY(this.lat), 4)
        }
        pop()
    }
    DrawSelected() {

        push()
        fill(this.faction.color)
        if (this.legitimacy > 10) {
            circle(adjX(this.lng), adjY(this.lat), 30)
            fill(255)
            circle(adjX(this.lng), adjY(this.lat), 20)
            fill(0)
            circle(adjX(this.lng), adjY(this.lat), 12)
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
    Connect(other) {
        if (!this.connections.includes(other)) {
            this.connections.push(other);
            other.connections.push(this);
        }
    }
    DrawTile() {
        push()
        noStroke()
        fill(this.faction.color)
        if (this == selectedCity) {
            fill(100)
        }
        beginShape()
        stroke(200)
        strokeWeight(4)
        let conns = this.connPoints;
        for (let i = 0; i < conns.length; i++) {
            vertex(adjX(conns[i].lng), adjY(conns[i].lat))
        }
        endShape(CLOSE)
        fill(255)
        pop()
    }
    LoadConnectionPoints() {
        this.connPoints = []
        let connCount = []
        let conns = this.connections
        for (let i = 0; i < conns.length; i++) {
            this.connPoints.push({ lat: (conns[i].lat + this.lat) / 2, lng: (conns[i].lng + this.lng) / 2 })
            connCount.push(0)
        }

        for (let i = 0; i < conns.length; i++) {
            for (let j = i + 1; j < conns.length; j++) {
                if (conns[i].connections.includes(conns[j])) {
                    connCount[i]++;
                    connCount[j]++;
                    this.connPoints.push({
                        lng: (conns[i].lng + conns[j].lng + this.lng) / 3,
                        lat: (conns[i].lat + conns[j].lat + this.lat) / 3
                    })
                }
            }
        }
        let hasNW = false;
        let hasNE = false;
        let hasSW = false;
        let hasSE = false;
        let avgLat = 0;
        let avgLng = 0;
        for (let i = 0; i < this.connPoints.length; i++) {
            if (this.connPoints[i].lat > this.lat) {
                if (this.connPoints[i].lng > this.lng) {
                    hasSE = true
                } else {
                    hasSW = true
                }
            } else {
                if (this.connPoints[i].lng > this.lng) {
                    hasNE = true
                } else {
                    hasNW = true
                }
            }
            avgLat += this.connPoints[i].lat;
            avgLng += this.connPoints[i].lng;
        }

        avgLat /= this.connPoints.length;
        avgLng /= this.connPoints.length;

        for (let i = 0; i < connCount.length; i++) {
            if (connCount[i] == 2) {
                connCount.splice(i, 1)
                this.connPoints.splice(i, 1)
                i--;
            } else {
                console.error(this.name)
            }
        }



        function compare(a, b) {
            return atan2(a.lat - avgLat, a.lng - avgLng) - atan2(b.lat - avgLat, b.lng - avgLng);
        }

        this.connPoints.sort(compare);
    }
}