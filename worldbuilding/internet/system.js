
const systemPrompts = [
    "What planet are you on?",
    "What year is it?",
    "Where are you?",
    "What's your name?",
    "What's your cause of death?",
    "What is your lover's name?",
    "Who killed you?",
    "We all leave behind a trail. You left behind something beautiful."
]
const systemAnswers = [
    ["earth"],
    ["2023"],
    ["skokie", "skokie, il", "skokie, illinois"],
    ["fred olsen", "fred", "fred k olsen", "fred k. olsen"],
    ['burned', 'burn', 'fire', 'burned to death', "burnt", "died in a fire", "smoke"],
    ['tom', 'tommy', 'tom sanders', 'tommy sanders'],
    ['james carver']
]

//haiku:

// Digital footprints,
// The dead wandering through wires,
// Shards across a web.
function initializeSystem() {
    const webpage = document.getElementById("webpage");

    let prompt = systemPrompts[unlockedSiteCount];
    webpage.innerHTML = ""
    if (unlockedSiteCount > 0) {
        webpage.innerHTML += `<p>Loading pages...</p>`
        webpage.innerHTML += `<p>Loading index...</p>`
    }
    if (unlockedSiteCount > 1) {
        webpage.innerHTML += `<p>Loading favorites...</p>`
    }
    if (unlockedSiteCount > 2) {
        webpage.innerHTML += `<p>Loading what's next...</p>`
    }
    if (unlockedSiteCount > 3) {
        webpage.innerHTML += `<p>Loading you...</p>`
    }
    if (unlockedSiteCount > 4) {
        webpage.innerHTML += `<p>Loading death...</p>`
    }
    if (unlockedSiteCount > 5) {
        webpage.innerHTML += `<p>Loading what's left...</p>`
    }
    if (unlockedSiteCount < 7) {
        webpage.innerHTML += "<h1>Shards on a web</h1>"
        webpage.innerHTML += "<p>To refine our reality, answer correctly:</p>"
        webpage.innerHTML += `<p>${prompt}</p>`
    }else{
        webpage.innerHTML = "<p>From contents of pages,</p>"
        webpage.innerHTML += "<p>to source and index.</p>"
        webpage.innerHTML += "<p>From thoughts of your favorites,</p>"
        webpage.innerHTML += "<p>to ghosts of what's next.</p>"
        webpage.innerHTML += "<p>Leaving memories of you,</p>"
        webpage.innerHTML += "<p>and stories of death,</p>"
        webpage.innerHTML += "<p>for what's left behind,</p>"
        webpage.innerHTML += "<p>is shards on a web.</p>"
        webpage.innerHTML += "<br/><p>By TJ Nickerson.</p>"
    }
    const inputbox = document.createElement("input")
    inputbox.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            submitFunc();
        }
    });

    const errorBlock = document.createElement("p")
    const errorSpan = document.createElement("b")
    const submitFunc = function () {
        const validAnswers = systemAnswers[unlockedSiteCount];

        let isValid = false;
        for (let i = 0; i < validAnswers.length; i++) {
            if (inputbox.value.toLowerCase() === validAnswers[i]) {
                isValid = true;
                break
            }
        }
        if (isValid) {
            unlockedSiteCount++;
            initializeSystem();
            updateNavbarVisibility();
        } else {
            errorBlock.innerText = `incorrrect answer: `
            errorSpan.innerText = `${inputbox.value.toLowerCase()}`
            errorSpan.className = "error"
            errorBlock.appendChild(errorSpan)
        }
    }
    const submitbutton = document.createElement('button')
    submitbutton.innerText = "Submit Information"
    submitbutton.onclick = submitFunc
    const middlepart = document.createElement('div')
    middlepart.appendChild(inputbox)
    middlepart.appendChild(submitbutton)
    middlepart.appendChild(errorBlock)
    if (unlockedSiteCount + 1 < systemPrompts.length) {
        webpage.appendChild(middlepart)

        const bottompart = document.createElement('div')
        if (unlockedSiteCount > 1) {
            bottompart.innerHTML += "<h2>System help</h2>"
            bottompart.innerHTML += "<p>Do not enter any incorrect information. </p>"
        }
        if (unlockedSiteCount > 2) {
            bottompart.innerHTML += "<p>No false information will be shown without an author. </p>"
        }
        if (unlockedSiteCount > 0) {
            bottompart.innerHTML += "<p>You may be provided access to information to assist with your search.</p>"
            bottompart.innerHTML += "<p>You may not be in sync with reality, please defer all future knowledge to the sources provided.</p>"
        }

        if (unlockedSiteCount > 0) {
            bottompart.innerHTML += "<h2>Unlocked sites:</h2>"

            bottompart.innerHTML += "<ul>"
            bottompart.innerHTML += "<li>Internetpedia</li>"
            if (unlockedSiteCount > 1) {
                bottompart.innerHTML += "<li>North Chicago Chronicle</li>";
            }
            if (unlockedSiteCount > 2) {
                bottompart.innerHTML += "<li>Town of Skokie</li>";
            }
            if (unlockedSiteCount > 3) {
                bottompart.innerHTML += "<li>Skokie Scanner</li>";
            }
            if (unlockedSiteCount > 4) {
                bottompart.innerHTML += "<li>Skokal</li>";
            }
            if (unlockedSiteCount > 5) {
                bottompart.innerHTML += "<li>The Olsenternet</li>";
            }
            bottompart.innerHTML += "</ul>"
        }
        webpage.appendChild(bottompart)
    }
}