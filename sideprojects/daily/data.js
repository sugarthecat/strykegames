

let totalPeople = 0;

const INVALID_ISO2 = [
    "RE", "CW", "GS", "PN", "MQ", "YT", "GF", "GP", "CX", "BQ"
]

const cities = []
const surnames = {}
const forenames = {}
const countryToIso2 = {
    'czech republic': 'CZ', 'burma (myanmar)': 'MM', 'ivory coast': 'CI', 'bosnia-herzegovina': 'BA',
    'bahamas': 'BS', 'cape verde': 'CV', 'channel islands': 'JE', 'faeroe islands': 'FO', 'falkland islands (malvinas)': 'FK',
    'french guiana': 'GF', 'gambia': 'GM', 'guadeloupe': 'GP', 'republic of macedonia': 'MK', 'martinique': 'MQ',
    'mayotte': 'YT', 'federated states of micronesia': 'FM', 'palestinian territories': 'PS', 'reunion': 'RE',
    'saint helena': 'SH', 'swaziland': 'SZ', 'tokelau': 'TK', 'u.s. virgin islands': 'VI', 'western sahara': 'EH',
    'curacao': 'CW', 'caribbean netherlands': 'BQ',
}
const religions = {}
const languages = {}

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
            countryToIso2[formalCountryName(city.country).toLowerCase()] = city.iso2
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
    //fill in
    forenames['KP'] = forenames['SK'] //  north korea = south korea
    forenames['XG'] = forenames['PS'] // gaza = palestine
    forenames['XW'] = forenames['PS'] // west bank = palestine
    forenames['VA'] = forenames['IT'] // vatican city = italy
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


    const religionData = (await (fetch("data/religion.csv").then(x => x.text()))).replaceAll("\r", "").split("\n");
    const religionLabels = religionData[0].split(",")
    religionData.shift()
    for (let i = 0; i < religionData.length; i++) {
        const parts = religionData[i].split(",")
        let country = parts[0]
        country = country.toLowerCase().replace("st.", "saint")
        if (!(country in countryToIso2)) {
            continue
        }
        const iso2 = countryToIso2[country]
        const religion = []
        for (let j = 1; j < religionLabels.length; j++) {
            if (!minorReligionSupport.includes(iso2) && religionLabels[j] == 'Other Religions') {
                continue
            }
            religion.push({
                name: religionLabels[j], count: parseInt(parts[j])
            })
        }
        religions[iso2] = religion
    }
    religions['XG'] = religions['PS']
    religions['XW'] = religions['PS']
    religions['GG'] = religions['GB']
    religions['BL'] = religions['FR']
    religions['MF'] = religions['FR']
    religions['NF'] = religions['AU']
    const languageData = (await (fetch("data/languages.csv").then(x => x.text()))).replaceAll("\r", "").split("\n");
    for (let i = 0; i < languageData.length; i++) {
        if (languageData[i].length < 4) {
            continue
        }
        const parts = languageData[i].split(",")

        let iso2 = parts[0]
        if (!(iso2 in languages)) {
            languages[iso2] = []
        }
        languages[iso2].push({ language: parts[1], speakers: parseInt(parts[2]), percent: parseInt(parts[3]) })
    }
    languages['XG'] = languages['PS']
    languages['XW'] = languages['PS']

}

async function setup() {
    await loadData();
    addCountryBadges();
    checkCookie();
    setupBadges();
    displayBadgeHistory();
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