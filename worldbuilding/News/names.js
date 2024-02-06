let first_names = ["James", "Jane"]
let last_names = ["Slater"]


function getName() {
    return random(first_names) + " " + random(last_names)
}
let vowelSyllables = []
let consonantSyllables = []
function getCountry() {
    let countryName = ""
    for (let i = 0; i < 5; i++) {
        if (i % 2 == 0) {
            countryName += random(vowelSyllables)
        } else {
            countryName += random(consonantSyllables)
        }
    }
    if(countryName.length < 6){
        countryName += "land"
    }
    countryName = countryName[0].toUpperCase() + countryName.slice(1);
    return { name: countryName }
}

const letters = ["a", "b", "c", "d", "e", "f", "g", 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
function getPoliticalParty() {
    let party = ""
    for (let i = 0; i < 3; i++) {
        party += random(letters)
    }
    if (random() < 0.25) {
        party += random(letters)
    }
    party = party.toUpperCase()
    return party
}
const politicalLeanings = ["Left", "Right", "Center-Right", "Center-Left", "Center", "Far Right", "Far Left"]
function getPoliticalLeaning() {
    return random(politicalLeanings);
}