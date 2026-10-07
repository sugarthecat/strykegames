const rarity = {
    common: { color: "#999", rank: 1, emoji: "⬜" }, // >15%
    uncommon: { color: "#0c0", rank: 2, emoji: "🟩" }, //7-15%
    rare: { color: "#00f", rank: 3, emoji: "🟦" }, // 3-7%
    epic: { color: "#c0c", rank: 4, emoji: "🟪" }, // 1-3%
    legendary: { color: "#ff0", rank: 5, emoji: "🟨" }, // 0.1-1%
    ultra: { color: "#000", rank: 6, emoji: "⬛" } // <0.1%
}
const badges = []

function setupBadges() {
    addGenderBadges();
    addReligionBadges();
    addNameBadges();
    addGeoBadges();
    addMiscBadges();
    addLanguageBadges();
}

function getBadges(person) {
    let applied = []
    for (let i = 0; i < badges.length; i++) {
        if (badges[i].eval(person)) {
            applied.push(badges[i])
        }
    }
    applied.sort((a, b) => rarity[a.rarity].rank - rarity[b.rarity].rank);
    return applied
}
