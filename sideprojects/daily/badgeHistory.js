
function storeBadges(person) {
    const badges = getStoredBadges();
    for (let i = 0; i < person.badges.length; i++) {
        const name = person.badges[i].name.toLowerCase();
        if (!badges.includes(name)) {
            badges.push(name)
        }
    }
    localStorage.setItem('dailybadges', (badges.join("/")))
}

function getStoredBadges() {
    const stored = localStorage.getItem("dailybadges")
    if (stored === null) {
        localStorage.setItem('dailybadges', "")
        return []
    }
    if (stored.length == 0) {
        return []
    }
    return stored.split("/");
}
const categories = ["gender","geography",'religion','names']
function displayBadgeHistory() {
    const myBadgeNames = getStoredBadges();
    document.getElementById('badge-history').innerHTML = "";
    const myBadges = []
    for (let i = 0; i < badges.length; i++) {
        const badgeName = badges[i].name.toLowerCase();
        if (myBadgeNames.includes(badgeName)) {
            myBadges.push(badges[i]);
        }
    }
    for (let i = 0; i < myBadges.length; i++) {
        const badge= myBadges[i]
        const elt = document.createElement("p")
        elt.innerText = badge.name
        //document.getElementById('badge-history').appendChild(elt);
    }
}