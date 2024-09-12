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
    background(200)
    image(mercator, 0, 0, width, height)
    fill(255, 0, 0)
    noStroke()
    push()
    let selectedCity = cities[0]
    for (let i = 0; i < cities.length; i++) {
        let city = cities[i];
        if (city.population > 1000000 || true) {
            if (dist(adjX(selectedCity.lng), adjY(selectedCity.lat), mouseX, mouseY)
                > dist(adjX(city.lng), adjY(city.lat), mouseX, mouseY)) {
                selectedCity = city
            }
            if (city.faction === undefined) {
                fill(255)
            } else {
                fill(city.faction.color)
            }
            circle(adjX(city.lng), adjY(city.lat), 10)
        }
    }
    let allCities = cities.slice()
    allCities.splice(allCities.indexOf(selectedCity), 1)
    let borderingCities = []
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
    push()
    stroke(255)
    for (let i = 0; i < borderingCities.length; i++) {
        let borderCity = borderingCities[i]
        line(adjX(borderCity.lng), adjY(borderCity.lat), adjX(selectedCity.lng), adjY(selectedCity.lat))
    }
    pop()
    fill(255)
    if(selectedCity.faction){
        fill(selectedCity.faction.color)
    }
    circle(adjX(selectedCity.lng), adjY(selectedCity.lat), 25)
    fill(0)
    textSize(height / 20)
    textAlign(CENTER)
    text(`${selectedCity.name} (${selectedCity.population.toLocaleString()})`, width / 2, 100)
    pop()
}
function adjX(x) {
    return 18 * (x + 129.1)
}
function adjY(y) {
    return -21 * (y - 56.3)
}
async function loadCityData() {
    let data = await (fetch("usCities.json").then(x => x.json()))
    factions = data.factions
    for(let i = 0; i<factions.length; i++){
        factions[i].color = color(factions[i].color.r,factions[i].color.g,factions[i].color.b)
    }
    cities = data.cities
    for (let i = 0; i < cities.length; i++) {
        if (cities[i].faction !== undefined) {
            for (let j = 0; j < factions.length; j++) {
                if (factions[j].id == cities[i].faction) {
                    cities[i].faction = factions[j];
                    break;
                }
            }
        }
    }
    console.log('loaded')
}
function adjDist(city1, city2) {
    return dist(adjX(city1.lng), adjY(city1.lat), adjX(city2.lng), adjY(city2.lat))
}