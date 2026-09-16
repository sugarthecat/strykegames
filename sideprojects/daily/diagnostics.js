// Console-only diagnostics; nothing here is called by the app.

const SAMPLE_SIZE = 100000
function getBadgeWithName(badgeName) {
    let badge = null;
    for (let i = 0; i < badges.length; i++) {
        if (badges[i].name.toLowerCase() == badgeName) {
            badge = badges[i];
            break
        }
    }
    return badge
}
function testBadge(badgeName) {
    const badge = getBadgeWithName(badgeName);
    if (badge == null) {
        console.log("no badge found")
        return
    }
    let hits = 0;
    for (let i = 0; i < SAMPLE_SIZE; i++) {
        const person = getRandomPerson()
        if (badge.eval(person)) {
            hits++;
        }
    }
    console.log(`${badgeName} has a ${hits / SAMPLE_SIZE * 100}% hit rate`)
}
function testBadgeProfiles(topN = 1) {
    const rates = {}
    for (let i = 0; i < SAMPLE_SIZE; i++) {
        const person = getRandomPerson();
        let badges = getBadges(person);
        let profile = ""
        for (let i = 0; i < Math.min(topN, badges.length); i++) {
            profile += rarity[badges[badges.length - 1 - i].rarity].emoji;
        }
        if (!(profile in rates)) {
            rates[profile] = 0
        }
        rates[profile]++;
    }
    const states = []
    for (const key in rates) {
        states.push({ state: key, pct: rates[key] / SAMPLE_SIZE * 100 })
    }
    states.sort((a, b) => { return (a.pct - b.pct) })
    for (const state of states) {
        console.log(state)
    }
}

function checkCoverage(dict) {

    let missingPopulation = 0
    const missingData = []
    const loss = {}
    const name = {}
    for (let i = 0; i < cities.length; i++) {
        const city = cities[i]
        if (!(city.iso2 in dict) || dict[city.iso2].length == 0) {
            if (!(city.iso2 in dict || city.iso2 in loss)) {
                missingData.push(city.iso2)
                loss[city.iso2]=0
                name[city.iso2] = city.country
            }
            loss[city.iso2] += city.population
            missingPopulation += city.population
        }
    }
    missingData.sort((a,b) => {loss[a]-loss[b]})
    for(let i = 0; i<missingData.length; i++){
        console.log(`Missing ${name[missingData[i]]} - ${missingData[i]} (${loss[missingData[i]] / totalPeople * 100}%)`)
    }
    console.log(`Missing ${missingPopulation / totalPeople * 100}% of population`)
}
