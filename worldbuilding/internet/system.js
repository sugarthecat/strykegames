
const systemPrompts = [
    "What planet are you on?",
    "What year is it?",
    "Where are you?",
    "What's your name?",
    "What happened to you?",
    "Who do you love?",
    "What killed you?",
    "We all leave behind a trail. You left behind something beautiful."
]
const systemAnswers = [
    ["earth"],
    ["2023"],
    ["skokie", "skokie, il", "skokie, illinois"],
    ["fred olsen", "fred"],
    ['died', 'dead'],
    ['jenny', 'jenny sanders', 'jennifer sanders'],
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
        webpage.innerHTML += "<p>Loading contents of pages...</p>"
    }
    if (unlockedSiteCount > 1) {
        webpage.innerHTML += "<p>Loading source and index...</p>"
    }
    if (unlockedSiteCount > 2) {
        webpage.innerHTML += "<p>Loading thoughts of your favorites...</p>"
    }
    if (unlockedSiteCount > 3) {
        webpage.innerHTML += "<p>Loading ghosts of what's next...</p>"
    }
    if (unlockedSiteCount > 4) {
        webpage.innerHTML += "<p>Loading memories of you...</p>"
        webpage.innerHTML += "<p>Loading stories of death...</p>"
    }
    if (unlockedSiteCount > 5) {
        webpage.innerHTML += "<p>Loading what's left to do...</p>"
        webpage.innerHTML += "<p>Loading shards on a web...</p>"
    }

    webpage.innerHTML += "<h1>System</h1>"
    webpage.innerHTML += "<p>To refine our reality, answer correctly:</p>"
    webpage.innerHTML += `<p>${prompt}</p>`

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