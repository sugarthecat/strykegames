function getRandomPerson() {
    const city = getRandomCity();
    const name = getRandomName(city)
    const religion = getRandomReligion(city.iso2);
    const likesSame = Math.random() < 0.10;
    const likesOpp = Math.random() < (likesSame ? 0.5 : 0.98);
    const sexuality = {
        same: likesSame,
        opp: likesOpp,
    }
    return {
        city: city,
        name: name,
        religion: religion,
        sexuality:sexuality
    }
}

// Gendered surname suffixes as [male, female] pairs, most specific first (Ivanov / Ivanova).
const SLAVIC = [['ov', 'ova'], ['ev', 'eva'], ['ow', 'owa'], ['in', 'ina'], ['sky', 'skaya'], ['dzki', 'dzka'], ['cki', 'cka'], ['ski', 'ska']]
const CZECH = [['ek', 'ková'], ['ka', 'ková'], ['ý', 'á'], ['a', 'ová'], ['o', 'ová'], ['', 'ová']]
const LATVIAN = [['ons', 'one'], ['is', 'e'], ['s', 'a']]
const LITHUANIAN = [['ov', 'ova'], ['ius', 'ienė'], ['as', 'ienė'], ['us', 'ienė'], ['is', 'ienė'], ['ys', 'ienė']]

function genderSurname(surname, gender, iso2) {
    let rules = null
    if (['RU', 'BY', 'UA', 'BG', 'MK', 'KZ', 'KG', 'UZ', 'TJ', 'TM', 'AZ', 'PL'].includes(iso2)) rules = SLAVIC
    if (['CZ', 'SK'].includes(iso2)) rules = CZECH
    if (iso2 == 'LV') rules = LATVIAN
    if (iso2 == 'LT') rules = LITHUANIAN
    const isFemale = rules && rules.some(([m, f]) => surname.endsWith(f))
    if (!rules || !['M', 'F'].includes(gender) || (gender == 'F') == isFemale) return surname
    // Swap the first matching suffix. Female -> male is ambiguous in Czech (-ová can be
    // Novák, Svoboda or Procházka), so prefer a result that exists in the data.
    const [from, to] = gender == 'F' ? [0, 1] : [1, 0]
    const candidates = rules.filter(r => surname.endsWith(r[from])).map(r => surname.slice(0, surname.length - r[from].length) + r[to])
    return candidates.find(c => surnames[iso2].some(s => s.name == c)) ?? candidates.at(gender == 'F' ? 0 : -1) ?? surname
}

function getRandomSurname(countryCode, gender) {
    if (!(countryCode in surnames)) {
        return "Lastname"
    }
    const item = weightedProb(surnames[countryCode], (item) => { return parseInt(item.count) }).name
    return genderSurname(item, gender, countryCode);
}
const minorReligionSupport = ['IN', 'CN', 'TW', 'JP', 'JM', 'IR', 'VN', 'KE', 'KP', 'CA', 'GB']
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
        if (countryCode == 'CA') {
            religion = "Sikh"
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
        if (countryCode == "KP") {
            religion = "Juche"
        }
        if (countryCode == "GB") {
            religion = "Wicca"
        }
        if (countryCode == "IR" || countryCode == 'VN' || countryCode == 'KE') {
            religion = "Bahai"
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
    const forename = getRandomForename(city.iso2)
    const surname = getRandomSurname(city.iso2, forename.gender)
    let gender = forename.gender;
    if (Math.random() < 0.01) {
        gender = "NB"
    }
    return { surname: surname, forename: forename.name, gender: gender }
}
// PopBefore[i] holds the combined population of every city before index i, so
// a draw from [0, popBeforeTotal) can be resolved with a binary search instead
// of a linear scan over every city.
const PopBefore = []
let popBeforeTotal = 0;

function buildPopBefore() {
    PopBefore.length = 0;
    let total = 0;
    for (let i = 0; i < cities.length; i++) {
        PopBefore.push(total);
        total += cities[i].population;
    }
    popBeforeTotal = total;
}

function getRandomCity() {
    if (PopBefore.length != cities.length) {
        buildPopBefore();
    }
    const myN = popBeforeTotal * Math.random();
    // The last city whose preceding population does not exceed myN, which is
    // the city the old linear scan would have stopped on.
    let low = 0;
    let high = cities.length - 1;
    while (low < high) {
        const mid = Math.floor((low + high + 1) / 2);
        if (PopBefore[mid] <= myN) {
            low = mid;
        } else {
            high = mid - 1;
        }
    }
    return cities[low]
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

function weightedProb(list, getWeighting) {
    let total = 0;
    for (let i = 0; i < list.length; i++) {
        if (isNaN(getWeighting(list[i]))) {
            console.log(list[i], getWeighting(list[i]))
        }
        total += getWeighting(list[i]);
    }
    if (total == 0) {
        return list[0]
    }
    let myN = total * Math.random();
    for (let i = 0; i < list.length; i++) {
        if (getWeighting(list[i]) > myN) {
            return list[i]
        }
        myN -= getWeighting(list[i])
    }
}