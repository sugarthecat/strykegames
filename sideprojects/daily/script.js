function getPrintName(person) {
    if (['CN', 'TW', 'KR', 'KP', 'VN'].includes(person.city.iso2)
        && !(['Mr.', 'Ms.'].includes(person.name.forename))) {
        return `${person.name.surname} ${person.name.forename}`
    }
    return `${person.name.forename} ${person.name.surname}`
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let person;

let nextGameInterval;

async function dailyRoll() {
    document.getElementById("badges").innerHTML = ""
    document.getElementById("reroll").hidden = true;
    person = getRandomPerson();
    for (let i = 10; i < 500; i *= 1.4) {
        await sleep(i)
        displayPerson(getRandomPerson())
    }
    person.badges = getBadges(person)
    //sort badges
    displayPersonFull(person)
    setJsonCookie("person", person, 1)
    storeBadges(person)
    displayBadgeHistory();
}

function copyStats() {
    let genderDict = {
        "F": "🧍‍♀️", "M": "🧍‍♂️", "NB": "🧍"
    }
    let outStr = `${genderDict[person.name.gender]} Random Person ${genderDict[person.name.gender]}[][]\n`;
    for (let i = 0; i < person.badges.length; i++) {
        const badge = person.badges[person.badges.length - 1 - i]
        outStr += rarity[badge.rarity].emoji
    }
    outStr += `\n${getPrintName(person)}`
    outStr += `\n of ${getLocation(person)}`
    for (let i = 0; i < Math.min(5, person.badges.length); i++) {
        const badge = person.badges[person.badges.length - 1 - i]
        if (badge.emoji) {
            outStr += `\n${rarity[badge.rarity].emoji} ${badge.emoji} ${badge.name}`
        } else {
            outStr += `\n${badge.name}`
        }
    }
    if (person.badges.length > 5) {
        outStr += "\n..."
    }
    copyToClipboard(outStr)
}

function addBadge(badge) {
    let badgeDiv = document.createElement("div")
    badgeDiv.className = "badge " + badge.rarity
    badgeDiv.innerHTML = `<h3>${badge.emoji}${badge.name}${badge.emoji}</h3><p class=\"rarity\">${badge.rarity.toUpperCase()}</p><p>${badge.description}</p>`
    document.getElementById("badges").prepend(badgeDiv)
}

function displayPerson(person) {
    document.getElementById("person").innerHTML = `<h2>${getPrintName(person)}</h2>`
    document.getElementById("person").innerHTML += `<p>Of ${getLocation(person)}</h2>`
}
function getLocation(person) {
    return `${person.city.city}, ${person.city.admin_name.length >= 1 ? `${person.city.admin_name}, ` : ""}${formalCountryName(person.city.country)}`
}
function setJsonCookie(name, jsonObject, daysToExpire) {
    const jsonString = JSON.stringify(jsonObject);
    const encodedValue = encodeURIComponent(jsonString);

    let expires = "";
    if (daysToExpire) {
        const date = new Date();
        date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }

    // Secure and SameSite are recommended for modern security standards
    document.cookie = `${name}=${encodedValue}${expires}; path=/; SameSite=Lax; Secure`;
}

function getJsonCookie(name) {
    const cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
        const [key, value] = cookies[i].split('=');
        if (key === name) {
            try {
                const decodedValue = decodeURIComponent(value);
                return JSON.parse(decodedValue);
            } catch (error) {
                console.error("Failed to parse cookie JSON", error);
                return null;
            }
        }
    }
    return null;
}

async function displayPersonFull(person, waitMult = 1) {
    document.getElementById("badges").innerHTML = ""
    displayPerson(person)
    await sleep(1000 * waitMult)
    const badges = person.badges
    for (let i = 0; i < badges.length; i++) {
        await sleep(500 * waitMult);
        addBadge(badges[i]);
    }
    await sleep(1000 * waitMult);
    document.getElementById("copy").hidden = false;
    nextGameInterval = setInterval(displayTime, 1000)
}

function checkCookie() {
    let cookie = getJsonCookie("person");
    if (cookie == null) {
        document.getElementById("reroll").hidden = false;
    } else {
        person = cookie;
        displayPersonFull(person, 0)
        storeBadges(person);
    }
}

async function getTimeTillExpiry() {
    const cookies = await cookieStore.getAll();
    let myCookie = null;
    for (let i = 0; i < cookies.length; i++) {
        if (cookies[i].name == 'person') {
            myCookie = cookies[i];
        }
    }
    if (myCookie == null) {
        return 0;
    }
    let currTime = myCookie.expires - Date.now()
    return currTime
}

async function copyToClipboard(text) {
    const html = text.replace("Random Person", "<a href=\"agar.io\">Random Person</a>")
    try {
        await navigator.clipboard.write([
            new ClipboardItem({
                "text/html": new Blob([html.replace("[][]", "")], { type: "text/html" }),
                "text/plain": new Blob([text.replace("[][]", "\n https://strykegames.net/sideprojects/daily/")], { type: "text/plain" }),
            }),
        ]);
        document.getElementById("copystatus").innerText = "copied!"
        const items = await navigator.clipboard.read();
        console.log(items[0].types);
        await sleep(5000)
        document.getElementById("copystatus").innerText = ""

    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
}


async function displayTime() {
    let time = await getTimeTillExpiry() / 1000
    if (isNaN(time)) {
        return
    }
    time = Math.ceil(time)
    if (time < 0) {
        window.location.reload()
    }
    let seconds = Math.floor(time) % 60
    let minutes = Math.floor(time / 60) % 60
    let hours = Math.floor(time / 60 / 60)
    let waitStr = (`${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`)
    document.getElementById("waiter").hidden = false;
    document.getElementById('waittime').innerText = `${waitStr}`
}
