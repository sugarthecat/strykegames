const policePages = {
    home: "Police",
}
let currPolicePage = 'home'
let policebody = null;
function initPoliceSite() {
    policebody = document.createElement('div')
    const webpage = document.getElementById("webpage");
    const topSection = document.createElement('div')
    topSection.innerHTML = "<h1>Skokie Scanner</h1>"
    const links = document.createElement('div')
    links.className = "links"

    const rule1 = document.createElement('hr')
    topSection.appendChild(rule1)

    webpage.appendChild(topSection)
    webpage.appendChild(policebody)
    updatePolicePage()
}

function updatePolicePage() {
    policebody.innerHTML = policePages[currPolicePage]

    let toSearch = []
    for (let i = 0; i < policebody.children.length; i++) {
        toSearch.push(policebody.children[i])
    }

    while (toSearch.length > 0) {
        let currItem = toSearch.pop()
        for (let i = 0; i < currItem.children.length; i++) {
            toSearch.push(currItem.children[i])
        }
        if (currItem.getAttribute('page') !== null) {
            const page = currItem.getAttribute('page')
            currItem.onclick = function () {
                currPolicePage = page;
                updatePolicePage();
            }
        }
    }
}