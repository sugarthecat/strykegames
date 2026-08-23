let words;
async function loadData() {
    let fileTxt = await (await fetch("./words.txt")).text()
    let lines = fileTxt.split("\n")
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].length < 4) {
            lines.splice(i, 1)
            i--;
        }
    }
    words = lines
}

let SECRET_WORD = "table"
let siteSetup = false;
let animationHappening = false;

async function setupSite() {
    await loadData()
    document.getElementById("game").hidden = false;
    siteSetup = true;
}

window.onload = async function () {
    await setupSite();
    for (let i = 0; i < badges.length; i++) {
        badges[i].appearances = 0;
    }
    for (let i = 0; i < badges.length; i++) {
        for (let j = 0; j < words.length; j++) {
            if (badges[i].criteria(words[j])) {
                badges[i].appearances++;
            }
        }
    }
    for (let i = 0; i < badges.length; i++) {
        console.log(`${badges[i].title}:  ${(badges[i].appearances / words.length * 100).toFixed(2)}%`)
    }
}

function getRandomWord() {
    let word = words[Math.floor(Math.random() * words.length)]
    if (word == SECRET_WORD) {
        return getRandomWord()
    }
    return word
}

function displayWord(word) {
    document.getElementById("word").innerText = word
}

async function rerollWord() {
    if (animationHappening) {
        return;
    }
    document.getElementById("badges").innerHTML = ""
    animationHappening = true;
    document.getElementById('rerollButton').disabled = true;
    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    for(let i = 10; i < 500; i*= 1.3){
        displayWord(getRandomWord())
        await wait(i)
    }
    let word = getRandomWord()
    displayWord(word)
    const wordBadges = getBadges(word)
    for(let i = 0; i<wordBadges.length; i++){
        await wait (500)
        appendBadge(wordBadges[i])
    }
    await wait(500)
    document.getElementById('rerollButton').disabled = false;
    animationHappening = false;
}

function appendBadge(badge) {
    const badgesDiv = document.getElementById('badges')
    let badgeDiv = document.createElement("div")
    badgeDiv.className = "badge"
    badgeDiv.innerHTML = `<h3>${badge.title}</h3> <p>${badge.content}</p>`
    badgesDiv.appendChild(badgeDiv)
}

function getBadges(word) {
    const badgesOut = []
    for (let i = 0; i < badges.length; i++) {
        const badge = badges[i]
        if (badge.criteria(word)) {
            badgesOut.push(badge)
        }
    }
    return badgesOut
}