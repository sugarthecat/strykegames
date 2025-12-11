const forumPages = {
    home: "",
}
let currForumPage = 'home'
let forumbody = null;
function initForum() {
    forumbody = document.createElement('div')
    const webpage = document.getElementById("webpage");
    const topSection = document.createElement('div')
    topSection.innerHTML = "<h1>Skokal</h1>"
    const links = document.createElement('div')
    links.className = "links"

    const rule1 = document.createElement('hr')
    topSection.appendChild(rule1)

    webpage.appendChild(topSection)
    webpage.appendChild(forumbody)
    updateForum()
}

function updateForum() {
    forumbody.innerHTML = forumPages[currForumPage]

    let toSearch = []
    for (let i = 0; i < forumbody.children.length; i++) {
        toSearch.push(forumbody.children[i])
    }

    while (toSearch.length > 0) {
        let currItem = toSearch.pop()
        for (let i = 0; i < currItem.children.length; i++) {
            toSearch.push(currItem.children[i])
        }
        if (currItem.getAttribute('page') !== null) {
            const page = currItem.getAttribute('page')
            currItem.onclick = function () {
                currForumPage = page;
                updateForum();
            }
        }
    }
}