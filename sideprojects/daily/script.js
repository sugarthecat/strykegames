

function getPrintName(person) {
    if (['CN', 'TW', 'KR', 'KP', 'VN'].includes(person.city.iso2)) {
        return `${person.name.surname} ${person.name.forename}`
    }
    return `${person.name.forename} ${person.name.surname}`
}
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let person;

async function dailyRoll() {
    document.getElementById("reroll").hidden = true;
    person = getRandomPerson();
    for (let i = 10; i < 500; i *= 1.4) {
        await sleep(i)
        displayPerson(getRandomPerson())
    }
    displayPerson(person)
    await sleep(1000)
    person.badges = getBadges(person)
    const badges = person.badges
    //sort badges
    badges.sort((a, b) => rarity[a.rarity].rank - rarity[b.rarity].rank);
    for (let i = 0; i < badges.length; i++) {
        await sleep(500);
        addBadge(badges[i]);
    }
    await sleep(1000);
    document.getElementById("copy").hidden = false;
}

function copyStats() {
    let genderDict = {
        "F": "🧍‍♀️", "M": "🧍‍♂️", "NB": "🧍"
    }
    let outStr = `${genderDict[person.name.gender]} Random Person ${genderDict[person.name.gender]}`;
    outStr += `\n${getPrintName(person)}`
    outStr += `\n of ${getLocation(person)}`
    for (let i = 0; i < Math.min(5, person.badges.length); i++) {
        const badge = person.badges[person.badges.length - 1 - i]
        if (badge.emoji) {
            outStr += `\n${badge.emoji} ${badge.name}`
        } else {
            outStr += `\n${badge.name}`
        }
    }
    if(person.badges.length > 5){
        outStr += "\n..."
    }
    copyToClipboard(outStr)
}

function addBadge(badge) {
    let badgeDiv = document.createElement("div")
    badgeDiv.className = "badge " + badge.rarity
    badgeDiv.innerHTML = `<h3>${badge.name}</h3><p>${badge.description}</p>`
    document.getElementById("badges").prepend(badgeDiv)
}

function displayPerson(person) {
    document.getElementById("person").innerHTML = `<h2>${getPrintName(person)}</h2>`
    document.getElementById("person").innerHTML += `<p>From ${getLocation(person)}</h2>`
}
function getLocation(person) {
    return `${person.city.city}, ${person.city.admin_name.length >= 1 ? `${person.city.admin_name}, ` : ""}${formalCountryName(person.city.country)}`
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
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        document.getElementById("copystatus").innerText = "copied!"
        await sleep(5000)
        document.getElementById("copystatus").innerText = ""

    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
}
