const SHARE_URL = "https://strykegames.net/sideprojects/daily/"
const GENDER_EMOJI = { "F": "🧍‍♀️", "M": "🧍‍♂️", "NB": "🧍" }
const SURNAME_FIRST_ISO2 = ['CN', 'TW', 'KR', 'KP', 'VN']

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let person;

// ---- Rolling ----

async function dailyRoll() {
    document.getElementById("badges").innerHTML = ""
    document.getElementById("reroll").hidden = true;
    person = getRandomPerson();
    for (let i = 10; i < 500; i *= 1.4) {
        await sleep(i)
        displayPerson(getRandomPerson())
    }
    const prevBadges = getStoredBadges();
    person.badges = getBadges(person).map((badge) =>
        prevBadges.includes(badge.name.toLowerCase()) ? badge : { ...badge, new: true }
    )
    displayPersonFull(person)
    setJsonCookie("person", person, getNextMidnight())
    storeBadges(person)
}

function checkCookie() {
    const cookie = getJsonCookie("person");
    if (cookie == null) {
        document.getElementById("reroll").hidden = false;
    } else {
        person = cookie;
        displayPersonFull(person, 0)
        storeBadges(person);
    }
}

// ---- Display ----

function getPrintName(person) {
    if (SURNAME_FIRST_ISO2.includes(person.city.iso2)
        && !(['Mr.', 'Ms.'].includes(person.name.forename))) {
        return `${person.name.surname} ${person.name.forename}`
    }
    return `${person.name.forename} ${person.name.surname}`
}

function getLocation(person) {
    const region = person.city.admin_name.length >= 1 ? `${person.city.admin_name}, ` : ""
    return `${person.city.city}, ${region}${formalCountryName(person.city.country)}`
}

function displayPerson(person) {
    document.getElementById("person").innerHTML =
        `<h2>${getPrintName(person)}</h2><p>Of ${getLocation(person)}</p>`
}

function addBadge(badge) {
    const badgeDiv = document.createElement("div")
    badgeDiv.className = "badge " + badge.rarity
    badgeDiv.innerHTML = `
        <h3>${badge.emoji} ${badge.name} ${badge.emoji}</h3>
        ${badge.new ? `<p class="newbadge">NEW</p>` : ""}
        <p class="rarity">${badge.rarity.toUpperCase()}</p>
        <p>${badge.description}</p>`
    document.getElementById("badges").prepend(badgeDiv)
}

async function displayPersonFull(person, waitMult = 1) {
    document.getElementById("badges").innerHTML = ""
    displayPerson(person)
    await sleep(1000 * waitMult)
    for (const badge of person.badges) {
        await sleep(500 * waitMult);
        addBadge(badge);
    }
    await sleep(1000 * waitMult);
    document.getElementById("copy").hidden = false;
    startCountdown(getNextMidnight())
    displayBadgeHistory();
}

// ---- Countdown ----

function getNextMidnight() {
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    return midnight
}

function startCountdown(resetTime) {
    const tick = () => {
        const time = Math.ceil((resetTime - Date.now()) / 1000)
        if (time < 0) {
            window.location.reload()
            return
        }
        const seconds = time % 60
        const minutes = Math.floor(time / 60) % 60
        const hours = Math.floor(time / 60 / 60)
        document.getElementById("waiter").hidden = false;
        document.getElementById('waittime').innerText =
            `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    }
    tick()
    setInterval(tick, 1000)
}

// ---- Sharing ----

function copyStats() {
    const genderEmoji = GENDER_EMOJI[person.name.gender]
    const topBadges = [...person.badges].reverse()

    let outStr = `${genderEmoji} Random Person ${genderEmoji}\n ${SHARE_URL}\n`;
    outStr += topBadges.map((badge) => rarity[badge.rarity].emoji).join("")
    outStr += `\n${getPrintName(person)}`
    outStr += `\n of ${getLocation(person)}`
    for (const badge of topBadges.slice(0, 5)) {
        outStr += badge.emoji
            ? `\n${rarity[badge.rarity].emoji} ${badge.emoji} ${badge.name}`
            : `\n${badge.name}`
        if (badge.new) {
            outStr += ` (NEW)`
        }
    }
    if (topBadges.length > 5) {
        outStr += "\n..."
    }
    copyToClipboard(outStr)
}

async function copyToClipboard(text) {
    const status = document.getElementById("copystatus")
    try {
        await navigator.clipboard.writeText(text);
        status.innerText = "copied!"
        await sleep(5000)
        status.innerText = ""
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
}

// ---- Storage ----

function setJsonCookie(name, jsonObject, expires) {
    const encodedValue = encodeURIComponent(JSON.stringify(jsonObject));
    document.cookie = `${name}=${encodedValue}; expires=${expires.toUTCString()}; path=/; SameSite=Lax; Secure`;
}

function getJsonCookie(name) {
    for (const cookie of document.cookie.split('; ')) {
        const [key, value] = cookie.split('=');
        if (key === name) {
            try {
                return JSON.parse(decodeURIComponent(value));
            } catch (error) {
                console.error("Failed to parse cookie JSON", error);
                return null;
            }
        }
    }
    return null;
}
