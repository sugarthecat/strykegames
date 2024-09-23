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
    for (let i = 0; i < cities.length; i++) {
        cities[i].DrawConnections()
    }
    let selectedCity = cities[0]
    for (let i = 0; i < cities.length; i++) {
        if (dist(adjX(selectedCity.lng), adjY(selectedCity.lat), mouseX, mouseY)
            > dist(adjX(cities[i].lng), adjY(cities[i].lat), mouseX, mouseY)) {
            selectedCity = cities[i];
        }
        cities[i].Draw();
    }
    selectedCity.DrawSelected();
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

function adjDist(city1, city2) {
    return dist(adjX(city1.lng), adjY(city1.lat), adjX(city2.lng), adjY(city2.lat))
}
