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

const SECRET_WORD = "intelligent"
let siteSetup = false;

async function setupSite() {
    await loadData()
    document.getElementById("game").hidden = false;
    siteSetup = true;
}

window.onload = function () {
    setupSite()
}

function rerollWord() {
    let word = words[Math.floor(Math.random() * words.length)]
    if (word == SECRET_WORD) {
        rerollWord()
        return
    }
    document.getElementById("word").innerText = word;
    getBadges(word)
}

const VOWELS = "aeiou"
const CONSONANTS = "bcdfghjklmnpqrstvwxyz"

function letterCountInList(word, letters) {
    let count = 0;
    for (let i = 0; i < word.length; i++) {
        if (letters.includes(word.charAt(i))) {
            count++;
        }
    }
    return count
}

function sameMultiset(word1, word2, list) {
    let word1str = ""
    let word2str = ""
    for (let char of word1) {
        if (list.includes(char)) {
            word1str += char
        }
    }
    for (let char of word2) {
        if (list.includes(char)) {
            word2str += char
        }
    }
    return word1str.split('').sort().join('') == word2str.split('').sort().join('')
}

function sameSequence(word1, word2, list) {
    let word1str = ""
    let word2str = ""
    for (let char of word1) {
        if (list.includes(char)) {
            word1str += char
        }
    }
    for (let char of word2) {
        if (list.includes(char)) {
            word2str += char
        }
    }
    return word1str == word2str
}


const badges = [
    {
        criteria: function (word) {
            return word.length == SECRET_WORD.length
        },
        title: "Measured",
        content: "Has the same length as the secret word."
    },
    {
        criteria: function (word) {
            return word.charAt(0) == SECRET_WORD.charAt(0)
        },
        title: "Engine",
        content: "Has the same first letter as the target word."
    },
    {
        criteria: function (word) {
            return (word.charAt(0) == SECRET_WORD.charAt(0)
                && word.charAt(1) == SECRET_WORD.charAt(1))
        },
        title: "Super Engine",
        content: "Has the same first two letters as the target word."
    },
    {
        criteria: function (word) {
            return (word.charAt(0) == SECRET_WORD.charAt(0)
                && word.charAt(1) == SECRET_WORD.charAt(1)
                && word.charAt(2) == SECRET_WORD.charAt(2))
        },
        title: "Ultre Engine",
        content: "Has the same first three letters as the target word."
    },

    {
        criteria: function (word) {
            return word.charAt(word.length - 1) == SECRET_WORD.charAt(SECRET_WORD.length - 1)
        },
        title: "Caboose",
        content: "Has the same last letter as the target word."
    },
    {
        criteria: function (word) {
            return (word.charAt(word.length - 1) == SECRET_WORD.charAt(SECRET_WORD.length - 1)
                && word.charAt(word.length - 2) == SECRET_WORD.charAt(SECRET_WORD.length - 2))
        },
        title: "Super Caboose",
        content: "Has the same last 2 letters as the target word."
    },
    {
        criteria: function (word) {
            return (word.charAt(word.length - 1) == SECRET_WORD.charAt(SECRET_WORD.length - 1)
                && word.charAt(word.length - 2) == SECRET_WORD.charAt(SECRET_WORD.length - 2)
                && word.charAt(word.length - 3) == SECRET_WORD.charAt(SECRET_WORD.length - 3))
        },
        title: "Ultra Caboose",
        content: "Has the same last 3 letters as the target word."
    },

    {
        criteria: function (word) {
            return letterCountInList(word, VOWELS) == letterCountInList(SECRET_WORD, VOWELS)
        },
        title: "Melodic",
        content: "Has the same number of vowels (excluding Y) as the target word."
    },
    {
        criteria: function (word) {
            return letterCountInList(word, CONSONANTS) == letterCountInList(SECRET_WORD, CONSONANTS)
        },
        title: "Rythmic",
        content: "Has the same number of consonants (including Y) as the target word."
    },

    {
        criteria: function (word) {
            return sameMultiset(word,SECRET_WORD,VOWELS)
        },
        title: "Supermelodic",
        content: "Has the same vowels, in some order."
    },
    {
        criteria: function (word) {
            return sameMultiset(word,SECRET_WORD,CONSONANTS)
        },
        title: "Superrythmic",
        content: "Has the same consonants, in some order."
    },
    {
        criteria: function (word) {
            return sameSequence(word,SECRET_WORD,VOWELS)
        },
        title: "Ultramelodic",
        content: "Has the same vowels, in the same order."
    },
    {
        criteria: function (word) {
            return sameSequence(word,SECRET_WORD,CONSONANTS)
        },
        title: "Ultrarythmic",
        content: "Has the same consonants, in the same order."
    },

    {
        criteria: function (word) {
            for (let i = 0; i < Math.min(word.length,SECRET_WORD.length); i++) {
                if (SECRET_WORD.charAt(i) == word.charAt(i)) {
                    return false
                }
            }
            return true
        },
        title: "Distant",
        content: "Shares no letters in the same place as the target word."
    },
    {
        criteria: function (word) {
            for (let i = 0; i < word.length; i++) {
                if (SECRET_WORD.includes(word.charAt(i))) {
                    return false
                }
            }
            return true
        },
        title: "Super Distant",
        content: "Shares no letters, in any place, with the target word."
    },

    {
        criteria: function (word) {
            let sharedOver = 0
            let ltrCount = {}
            for (let i = 0; i < SECRET_WORD.length; i++) {
                const char = SECRET_WORD.charAt(i)
                if (!(char in ltrCount)) {
                    ltrCount[char] = 0
                }
                ltrCount[char] += 1
            }
            for (let i = 0; i < word.length; i++) {
                const char = word.charAt(i)
                if ((char in ltrCount) && (ltrCount[char] > 0)) {
                    sharedOver++
                    ltrCount[char]--;
                }
            }
            return sharedOver == word.length && sharedOver == SECRET_WORD.length
        },
        title: "Jumbled",
        content: "Has the exact same letters as the secret word, in some order."
    }
]


function getBadges(word) {
    const badgesDiv = document.getElementById('badges')
    badgesDiv.innerHTML = "";
    let badgesCount = 0;
    for (let i = 0; i < badges.length; i++) {
        const badge = badges[i]
        if (badge.criteria(word)) {
            let badgeDiv = document.createElement("div")
            badgeDiv.className = "badge"
            badgeDiv.innerHTML = `<h3>${badge.title}</h3> <p>${badge.content}</p>`
            badgesDiv.appendChild(badgeDiv)
            badgesCount++;
        }
    }

}