let cities = []
let mercator;
function preload() {
    mercator = loadImage("usa-mercator.png")
}
function setup() {
    createCanvas(1200, 800)
    loadCityData()
}
function draw() {
    background(255)
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
            circle(adjX(city.lng), adjY(city.lat), 10)
        }
    }
    circle(adjX(selectedCity.lng), adjY(selectedCity.lat), 25)
    let closestToSelected = cities[0]
    if (closestToSelected == selectedCity) {
        closestToSelected = cities[1]
    }
    for (let i = 0; i < cities.length; i++) {
        let city = cities[i];
        if (city == selectedCity) {
            continue;
        }
        if (adjDist(closestToSelected,selectedCity) > adjDist(city,selectedCity)) {
            closestToSelected = city
        }
    }
    let borderingCities = [closestToSelected]
    push ()
    stroke(255)
    line(adjX(closestToSelected.lng), adjY(closestToSelected.lat), adjX(selectedCity.lng), adjY(selectedCity.lat))
    pop ()
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
    cities = await (fetch("usCities.json").then(x => x.json()))
    cities = cities.cities
    console.log('loaded')
}
function adjDist(city1,city2){
    return dist(adjX(city1.lng), adjY(city1.lat), adjX(city2.lng), adjY(city2.lat))
}
