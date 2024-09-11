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
    push ()
    let closestCity = cities[0]
    for (let i = 0; i < cities.length; i++) {
        let city = cities[i];
        if (city.population > 1000000 || true) {
            if (dist(adjX(closestCity.lng), adjY(closestCity.lat), mouseX,mouseY) > dist(adjX(city.lng), adjY(city.lat), mouseX,mouseY)) {
                closestCity = city
            }
            circle(adjX(city.lng), adjY(city.lat), 5)
        }
    }
    circle(adjX(closestCity.lng),adjY(closestCity.lat),25)
    fill(0)
    textSize(height/20)
    textAlign(CENTER)
    text (`${closestCity.name} (${closestCity.population.toLocaleString()})`,width/2,100)
    pop ()
    
}
function adjX(x){
    return 18 * (x + 129.1)
}
function adjY(y){
    return -21 * (y - 56.3)
}
async function loadCityData() {
    cities = await (fetch("usCities.json").then(x => x.json()))
    cities = cities.cities
    console.log('loaded')
}