const CATEGORIES = [
    { id: "geographic", name: "Geographic" },
    { id: "gender", name: "Gender/Sexuality" },
    { id: "religion", name: "Religion" },
    { id: "names", name: "Names" },
    { id: "misc", name: "Miscellaneous" },
    { id: "languages", name: "Languages" },
]

function storeBadges(person) {
    const stored = getStoredBadges();
    for (const badge of person.badges) {
        const name = badge.name.toLowerCase();
        if (!stored.includes(name)) {
            stored.push(name)
        }
    }
    localStorage.setItem('dailybadges', stored.join("/"))
}

function getStoredBadges() {
    const stored = localStorage.getItem("dailybadges")
    if (!stored) {
        return []
    }
    return stored.split("/");
}

function displayBadgeHistory() {
    const myBadgeNames = getStoredBadges();
    const container = document.getElementById('past-badges')
    container.innerHTML = "";

    const sorted = [...badges].sort((a, b) => rarity[b.rarity].rank - rarity[a.rarity].rank);
    for (const category of CATEGORIES) {
        const inCategory = sorted.filter((badge) => badge.category == category.id)
        const owned = inCategory.filter((badge) => myBadgeNames.includes(badge.name.toLowerCase()))

        const header = document.createElement('h3')
        header.innerText = `${category.name}: ${owned.length}/${inCategory.length}`
        container.appendChild(header)
        const list = document.createElement("div")
        list.className = "badge-list"
        for (const badge of owned) {
            const elt = document.createElement("span")
            elt.className = "chip " + badge.rarity
            elt.innerText = `${badge.emoji} ${badge.name}`
            list.appendChild(elt);
        }
        container.appendChild(list)
    }
}
