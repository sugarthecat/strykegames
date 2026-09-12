
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
const categories = ["geographic", "gender", 'religion', 'names', 'misc']
const categoryNames = ["Geographic", "Gender/Sexuality", "Religion", "Names", "Miscellanious"]
function displayBadgeHistory() {
    const myBadgeNames = getStoredBadges();
    document.getElementById('badge-history').innerHTML = "";
    
    badges.sort((a, b) => rarity[b.rarity].rank - rarity[a.rarity].rank );
    for (let j = 0; j < categories.length; j++) {
        const category = categories[j];
        const categoryElt = document.createElement('h3')
        document.getElementById('badge-history').appendChild(categoryElt)
        let count = 0;
        let countHas = 0;
        for (let i = 0; i < badges.length; i++) {
            const badge = badges[i]
            const badgeName = badge.name.toLowerCase();
            if (category != badge.category) {
                continue
            }
            count++;
            if (!myBadgeNames.includes(badgeName)) {
                continue
            }
            countHas++;
            const elt = document.createElement("p")
            elt.innerText = `${rarity[badge.rarity].emoji}${badge.emoji}${badge.name}`
            document.getElementById('badge-history').appendChild(elt);
        }
        categoryElt.innerText = `${categoryNames[j]}: ${countHas}/${count}`;
    }
}