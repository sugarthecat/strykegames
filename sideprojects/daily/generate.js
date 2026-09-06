

function getRandomSurname(countryCode) {
    if (!(countryCode in surnames)) {
        return "Lastname"
    }
    let total = 0;
    for (let i = 0; i < surnames[countryCode].length; i++) {
        total += parseInt(surnames[countryCode][i].count);
    }
    let myN = total * Math.random();
    for (let i = 0; i < surnames[countryCode].length; i++) {
        if (surnames[countryCode][i].count > myN) {
            return surnames[countryCode][i].name
        }
        myN -= surnames[countryCode][i].count
    }
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
    let nPerson = Math.floor(Math.random() * totalPeople);
    let cityIdx = 0;
    while (nPerson > cities[cityIdx].population) {
        nPerson -= cities[cityIdx].population;
        cityIdx++;
    }
    return cities[cityIdx]
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
    return {
        city: city,
        name: name
    }
}