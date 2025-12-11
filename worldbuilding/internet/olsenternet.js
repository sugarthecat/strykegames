const olsenPages = {
    home: "",
}
let currOlsenPage = 'home'
let olsenbody = null;
function initOlsen() {
    olsenbody = document.createElement('div')
    const webpage = document.getElementById("webpage");
    const topSection = document.createElement('div')
    topSection.innerHTML = "<h1>The Olsenternet</h1>"
    const links = document.createElement('div')
    links.className = "links"

    const rule1 = document.createElement('hr')
    topSection.appendChild(rule1)

    webpage.appendChild(topSection)
    webpage.appendChild(olsenbody)
    updateForum()
}

function updateOlsen() {
    olsenbody.innerHTML = olsenPages[currOlsenPage]

    let toSearch = []
    for (let i = 0; i < olsenbody.children.length; i++) {
        toSearch.push(olsenbody.children[i])
    }

    while (toSearch.length > 0) {
        let currItem = toSearch.pop()
        for (let i = 0; i < currItem.children.length; i++) {
            toSearch.push(currItem.children[i])
        }
        if (currItem.getAttribute('page') !== null) {
            const page = currItem.getAttribute('page')
            currItem.onclick = function () {
                currOlsenPage = page;
                updateOlsen();
            }
        }
    }
}