const rarity = {
    common: { color: "#888", rank: 1, emoji: "⬜" }, // >15%
    uncommon: { color: "#0f0", rank: 2, emoji: "🟩" }, //8-15%
    rare: { color: "#00f", rank: 3, emoji: "🟦" }, // 3-8%
    epic: { color: "#c0c", rank: 4, emoji: "🟪" }, // 1-3%
    legendary: { color: "#ff0", rank: 5, emoji: "🟨" }, // 0.1-1%
    ultra: { color: "#000", rank: 5, emoji: "⬛" } // <0.1%
}
const badges = [
    {
        //0.15%
        name: "Big Apple",
        rarity: "legendary",
        emoji: "🗽",
        description: "Lives in New York City.",
        eval: function (person) {
            return (["Manhattan", "Brooklyn", "Queens", "The Bronx", "Staten Island"].includes(person.city.city)) && person.city.admin_name == "New York"
        }
    },
    {
        //10%
        name: "Governmental",
        description: "Lives in a national capital.",
        emoji: "🏛️",
        rarity: "uncommon",
        eval: function (person) {
            return person.city.capital == "primary"
        }
    },
    {
        //10%
        name: "Locale",
        description: "Lives in a city which shares a name with its region.",
        emoji: "🏛️",
        rarity: "uncommon",
        eval: function (person) {
            return person.city.admin_name == person.city.city
        }
    },
    {
        // #23%
        name: "Urbanist",
        description: "Lives in a city with a population from 1-5 million.",
        rarity: "common",
        emoji: '🏢',
        eval: function (person) {
            return person.city.population >= 1000000 && person.city.population < 5000000
        }
    },
    {
        // #25%
        name: "City Slicker",
        description: "Lives in a city with a population of at least 5 million.",
        rarity: "common",
        emoji: '🏙️',
        eval: function (person) {
            return person.city.population >= 5000000
        }
    },
    {
        // 8%
        name: "Townsfolk",
        description: "Lives in a town with a population between 2500 and 25000.",
        emoji: "🏘️",
        rarity: "uncommon",
        eval: function (person) {
            return person.city.population >= 2500 && person.city.population <= 25000
        }
    },
    {
        //0.1%
        name: "Villager",
        description: "Lives in a village with a population less than 2500.",
        rarity: "legendary",
        emoji: "🛖",
        eval: function (person) {
            return person.city.population < 2500
        }
    },
]

function setupBadges(){
    addGenderBadges();
    addReligionBadges();
    addNameBadges();
    addGeoBadges();
}

function getBadges(person) {
    let applied = []
    for (let i = 0; i < badges.length; i++) {
        if (badges[i].eval(person)) {
            applied.push(badges[i])
        }
    }
    return applied
}

const SAMPLE_SIZE = 10000
function testBadge(badgeName) {
    let badge = null;
    for (let i = 0; i < badges.length; i++) {
        if (badges[i].name.toLowerCase() == badgeName) {
            badge = badges[i];
            break
        }
    }
    if(badge == null){
        console.log("no badge found")
        return
    }
    let hits = 0;
    for (let i = 0; i < SAMPLE_SIZE; i++) {
        const person = getRandomPerson()
        if (badge.eval(person)) {
            hits++;
        }
    }
    console.log(`${badgeName} has a ${hits / SAMPLE_SIZE * 100}% hit rate`)
}