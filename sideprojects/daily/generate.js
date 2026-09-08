

function getRandomSurname(countryCode) {
    if (!(countryCode in surnames)) {
        return "Lastname"
    }
    const item = weightedProb(surnames[countryCode], (item) => { return parseInt(item.count) })
    return item.name;
}
const minorReligionSupport = ['IN', 'CN', 'TW', 'JP','JM']
function getRandomReligion(countryCode) {
    if (!(countryCode in religions)) {
        console.log(countryCode)
    }
    let religion = weightedProb(religions[countryCode], (item) => { return item.count }).name
    if (religion == "Other Religions") {
        if (countryCode == "IN") {
            if (Math.random() < 0.85) {
                religion = "Sikh";
            }
            else {
                religion = "Jain";
            }
        }
        if (countryCode == "CN" || countryCode == "TW") {
            religion = "Taoism"
        }
        if (countryCode == "JP") {
            religion = "Shinto"
        }
        if (countryCode == "JM") {
            religion = "Rastafari"
        }
    }
    return religion
}
function formalCountryName(country) {
    if (country == "Congo (Kinshasa)") {
        return "Republic of the Congo";
    }
    if (country == "Korea, South") {
        return "South Korea";
    }
    if (country == "Korea, North") {
        return "North Korea";
    }
    if (country == "Congo (Brazzaville)") {
        return "Democratic Republic of the Congo"
    }
    if (country.toLowerCase() == "virgin islands, british") {
        return "British Virgin Islands"
    }
    return country
}
function getRandomName(city) {
    const surname = getRandomSurname(city.iso2)
    const forename = getRandomForename(city.iso2)
    let gender = forename.gender;
    if (Math.random() < 0.01) {
        gender = "NB"
    }
    return { surname: surname, forename: forename.name, gender: gender }
}
function getRandomCity() {
    return weightedProb(cities, (city) => { return city.population })
}
function getRandomCity() {
    return weightedProb(cities, (city) => { return city.population })
}

function getRandomForename(countryCode) {
    if (!(countryCode in forenames) || forenames[countryCode].length == 0) {
        if (Math.random() < 0.5) {
            return { name: "Mr.", gender: "M" }
        } else {
            return { name: "Ms.", gender: "F" }
        }
    }
    const names = forenames[countryCode];
    const name = names[Math.floor(Math.random() * names.length)]
    return name

}


function getRandomPerson() {
    const city = getRandomCity();
    const name = getRandomName(city)
    const religion = getRandomReligion(city.iso2);
    return {
        city: city,
        name: name,
        religion: religion
    }
}

function weightedProb(list, getWeighting) {
    let total = 0;
    for (let i = 0; i < list.length; i++) {
        if (isNaN(getWeighting(list[i]))) {
            console.log(list[i], getWeighting(list[i]))
        }
        total += getWeighting(list[i]);
    }
    let myN = total * Math.random();
    for (let i = 0; i < list.length; i++) {
        if (getWeighting(list[i]) > myN) {
            return list[i]
        }
        myN -= getWeighting(list[i])
    }
}