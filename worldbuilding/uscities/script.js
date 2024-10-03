let cities = []
let factions = []
let mercator;
function preload() {
    mercator = loadImage("usa-equidistant.png")
}
function setup() {
    createCanvas(1200, 800)
    loadCityData()
}
let selectedCity;
function draw() {
    background(0, 55, 128)
    if (cities.length == 0) {
        return
    }
    fill(0)
    rect(width * 0.05, height * 0.15, width * 0.9, height * 0.7)
    for (let i = 0; i < cities.length; i++) {
        cities[i].DrawTile();
    }
    image(mercator, width * 0.05, height * 0.15, width * 0.9, height * 0.7)
    //draw connections
    fill(255, 0, 0)
    noStroke()
    push()
    for (let i = 0; i < cities.length; i++) {
        cities[i].Draw();
    }
    if (selectedCity) {
        selectedCity.DrawSelected();
    }
    if (selectedCity) {
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
    }
    pop()
}
function adjX(x) {
    //console.log(mouseX)
    return 18.2 * (x + 128.5)
}
function adjY(y) {
    return -21.5 * (y - 55.4)
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

function adjDist(city1, city2) {
    return dist(adjX(city1.lng), adjY(city1.lat), adjX(city2.lng), adjY(city2.lat))
}

function mouseClicked() {
    selectedCity = cities[0]
    for (let i = 0; i < cities.length; i++) {
        if (dist(adjX(selectedCity.lng), adjY(selectedCity.lat), mouseX, mouseY)
            > dist(adjX(cities[i].lng), adjY(cities[i].lat), mouseX, mouseY)) {
            selectedCity = cities[i];
        }
    }
}