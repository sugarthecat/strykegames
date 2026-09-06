function getRandomCity() {
    let nPerson = Math.floor(Math.random() * totalPeople);
    let cityIdx = 0;
    while (nPerson > cities[cityIdx].population) {
        nPerson -= cities[cityIdx].population;
        cityIdx++;
    }
    return cities[cityIdx]
}

function getSurname(countryCode) {
    if (!(countryCode in surnames)) {
        if (countryCode == "GS") {
            return getSurname("GB")
        }
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

function getRandomPerson() {
    const city = getRandomCity();
    const surname = getSurname(city.iso2)
    return {
        city: city,
        name: surname
    }
}
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function dailyRoll() {
    document.getElementById("reroll").hidden = true;
    let person = getRandomPerson();
    for (let i = 10; i < 500; i *=1.4) {
        await sleep(i)
        displayPerson(getRandomPerson())
    }
    displayPerson(person)
    await sleep (1000)
    let badges = getBadges(person)
    for (let i = 0; i < badges.length; i++) {
        await sleep(500);
        addBadge(badges[i]);
    }
}
function addBadge(badge) {
    let badgeDiv = document.createElement("div")
    badgeDiv.className = "badge "+badge.rarity
    badgeDiv.innerHTML = `<h3>${badge.name}</h3><p>${badge.description}</p>`
    document.getElementById("badges").appendChild(badgeDiv)
}
function displayPerson(person) {
    document.getElementById("person").innerHTML = `<h2>Mr. ${person.name}</h2>`
    document.getElementById("person").innerHTML += `<p>From ${person.city.city}, ${person.city.admin_name.length>=1 ? `${person.city.admin_name}, `: ""}${person.city.country}</h2>`

}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    let username = getCookie("username");
    if (username != "") {
        alert("Welcome again " + username);
    } else {
        username = prompt("Please enter your name:", "");
        if (username != "" && username != null) {
            setCookie("username", username, 365);
        }
    }
}