let cities = []
let factions = []
let mercator;
function preload() {
    mercator = loadImage("usa-mercator.png")
}
function setup() {
    createCanvas(1200, 800)
    loadCityData()
}
function draw() {
    background(150)
    if (cities.length == 0) {
        return
    }
    image(mercator, 0, 0, width, height)
    //draw connections
    fill(255, 0, 0)
    noStroke()
    push()
    push()
    noFill()
    stroke(255)
    strokeWeight(1.5)
    for (let i = 0; i < cities.length; i++) {
        let city = cities[i]
        let conns = city.connections;
        for (let j = 0; j < conns.length; j++) {
            console.log(conns[j].name)
            line(adjX(city.lng), adjY(city.lat), adjX(conns[j].lng), adjY(conns[j].lat))
        }
    }
    pop()
    let selectedCity = cities[0]
    for (let i = 0; i < cities.length; i++) {
        let city = cities[i];
        push()
        if (dist(adjX(selectedCity.lng), adjY(selectedCity.lat), mouseX, mouseY)
            > dist(adjX(city.lng), adjY(city.lat), mouseX, mouseY)) {
            selectedCity = city
        }
        if (city.legitimacy > 20) {
            fill(city.faction.color)
            circle(adjX(city.lng), adjY(city.lat), 16)
            fill(255)
            circle(adjX(city.lng), adjY(city.lat), 10)
            fill(0)
            circle(adjX(city.lng), adjY(city.lat), 6)
        } else {
            fill(city.faction.color)
            circle(adjX(city.lng), adjY(city.lat), 8)
        }

        pop()
    }
    fill(255)
    if (selectedCity.faction) {
        fill(selectedCity.faction.color)
    }
    circle(adjX(selectedCity.lng), adjY(selectedCity.lat), 25)
    fill(0)
    textSize(height / 20)
    textAlign(CENTER)
    text(selectedCity.name, width / 2, 75)
    textAlign(LEFT)
    textSize(height / 30)
    text(`${selectedCity.research} Research`, width / 5, 125)
    text(`${selectedCity.industry} Industry`, 2 * width / 5, 125)
    text(`${selectedCity.legitimacy} Legitimacy`, 3 * width / 5, 125)
    text(`${selectedCity.unitCap} Units`, 4 * width / 5, 125)
    updateFactionStats()
    if (selectedCity.faction) {
        let selectedFaction = selectedCity.faction;
        push()
        stroke(0)
        strokeWeight(5)
        fill(selectedFaction.color)
        rect(10, 575, 30, 30)
        pop()
        text(`${selectedFaction.name}`, 50, 600)
        text(`${selectedFaction.research} Research`, 20, 650)
        text(`${selectedFaction.industry} Industry`, 20, 700)
        text(`${selectedFaction.legitimacy} Legitimacy`, 20, 750)
    }
    pop()
}
function adjX(x) {
    return 18 * (x + 129.1)
}
function adjY(y) {
    return -21 * (y - 56.3)
}
function updateFactionStats() {
    for (let i = 0; i < factions.length; i++) {
        factions[i].legitimacy = 0;
        factions[i].research = 0;
        factions[i].industry = 0;
    }
    for (let i = 0; i < cities.length; i++) {
        let city = cities[i];
        let faction = city.faction;
        faction.legitimacy += city.legitimacy;
        faction.research += city.research;
        faction.industry += city.industry;
    }
}

async function loadCityData() {
    let data = await (fetch("usCities.json").then(x => x.json()))
    factions = data.factions
    for (let i = 0; i < factions.length; i++) {
        factions[i].color = color(factions[i].color.r, factions[i].color.g, factions[i].color.b)
    }
    cities = data.cities
    for (let i = 0; i < cities.length; i++) {
        cities[i].connections = []
        if (cities[i].faction !== undefined) {
            for (let j = 0; j < factions.length; j++) {
                if (factions[j].id == cities[i].faction) {
                    cities[i].faction = factions[j];
                    break;
                }
            }
        }
    }
    //connect citieslet borderingCities = []
    for (let i = 0; i < cities.length; i++) {
        let selectedCity = cities[i]
        let borderingCities = []
        let allCities = cities.slice()
        allCities.splice(i, 1);
        while (allCities.length > 0) {
            //find close city
            let closestCity = allCities[0]
            for (let i = 0; i < allCities.length; i++) {
                if (adjDist(allCities[i], selectedCity) < adjDist(closestCity, selectedCity)) {
                    closestCity = allCities[i]
                }
            }
            borderingCities.push(closestCity)
            let deltaLng = closestCity.lng - selectedCity.lng;
            let deltaLat = closestCity.lat - selectedCity.lat;
            let newCity = { lng: closestCity.lng + deltaLng, lat: closestCity.lat + deltaLat }
            allCities.splice(allCities.indexOf(closestCity), 1)
            for (let i = 0; i < allCities.length; i++) {
                //console.log(newCity.lng, closestCity.lat, selectedCity.lat)
                //console.log(adjDist(newCity,allCities[i]) - adjDist(selectedCity,allCities[i]))
                if (adjDist(newCity, allCities[i]) < adjDist(selectedCity, allCities[i])) {
                    //console.log('splice')
                    allCities.splice(i, 1)
                    i--;
                }
            }
        }
        for (let i = 0; i < borderingCities.length; i++) {
            let borderCity = borderingCities[i]
            if (selectedCity.connections.includes(borderCity)) {
                continue;
            }
            selectedCity.connections.push(borderCity)
            borderCity.connections.push(selectedCity)
        }
    }
    console.log('loaded')
}
function adjDist(city1, city2) {
    return dist(adjX(city1.lng), adjY(city1.lat), adjX(city2.lng), adjY(city2.lat))
}
