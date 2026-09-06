

let totalPeople = 0;

const INVALID_ISO2 = [
    "RE", "CW", "GS", "PN", "MQ", "YT", "GF", "GP", "CX", "BQ"
]

const cities = []
const surnames = {}
const forenames = {}
const countryToIso2 = {}

async function loadData() {
    const cityTxt = await (await fetch("data/worldcities.csv")).text();
    const lines = cityTxt.split("\n");
    const labels = lines.shift().split(",");
    for (let i = 0; i < labels.length; i++) {
        labels[i] = labels[i].replaceAll("\"", "")
    }
    for (const line of lines) {
        const parts = line.split("\",\"")
        if (parts.length != labels.length) {
            continue;
        }
        const city = {}
        parts[0] = parts[0].replace("\"", "");
        parts[parts.length - 1] = parts[parts.length - 1].replace("\"", "");
        for (let i = 0; i < labels.length; i++) {
            city[labels[i]] = parts[i];
        }
        if (isNaN(parseInt(city.population)) || INVALID_ISO2.includes(city.iso2)) {
            //console.log(city)
            //no people data so no people, fine to skip
        } else {
            city.population = parseInt(city.population)

            totalPeople += city.population;
            cities.push(city)
            countryToIso2[formalCountryName(city.country.toLowerCase())] = city.iso2
        }
    }
    const forenameData = (await (fetch("data/forenames.csv").then(x => x.text()))).replaceAll("\r", "").split("\n");
    const surnameData = (await (fetch("data/surnames.csv").then(x => x.text()))).replaceAll("\r", "").split("\n");
    let forenameLabels;
    let surnameLabels;
    for (let i = 0; i < forenameData.length; i++) {
        const parts = forenameData[i] = forenameData[i].split(',')
        if (i == 0) {
            forenameLabels = parts;
            continue;
        }
        const forename = {}
        for (let j = 0; j < parts.length; j++) {
            forename[forenameLabels[j]] = parts[j];
        }
        if (!(forename.country in forenames)) {
            forenames[forename.country] = []
        }
        forenames[forename.country].push(forename)
    }
    for (let i = 0; i < surnameData.length; i++) {
        const parts = surnameData[i].split(',')
        if (i == 0) {
            surnameLabels = parts;
            continue;
        }
        const surname = {}
        for (let j = 0; j < parts.length; j++) {
            surname[surnameLabels[j]] = parts[j];
        }
        if (!(surname.country in surnames)) {
            surnames[surname.country] = []
        }
        surnames[surname.country].push(surname)
    }

    let missingPopulation = 0
    for (let i = 0; i < cities.length; i++) {
        const city = cities[i]
        if (!(city.iso2 in forenames) || forenames[city.iso2].length == 0) {
            if (!(city.iso2 in forenames)) {
                console.error(`Missing forenames for ${city.country} (${city.iso2})`)
            }
            forenames[city.iso2] = []
            missingPopulation += city.population
        }
        if (!(city.iso2 in surnames) || surnames[city.iso2].length == 0) {
            if (!(city.iso2 in surnames)) {
                console.log(`Missing surnames for ${city.country} (${city.iso2})`)
            }
            surnames[city.iso2] = []
        }
    }
    console.log(`Missing ${missingPopulation / totalPeople * 100}% of population's names`)
}

async function setup() {
    await loadData();
    addCountryBadges();
    checkCookie();

}

function addCountryBadges() {
    let populations = {}
    for (let i = 0; i < cities.length; i++) {
        let iso2 = cities[i].iso2
        if (!(iso2 in populations)) {
            populations[iso2] = 0
        }
        populations[iso2] += cities[i].population
    }
}

window.onload = setup;