const rarity = {
    common: { color: "#888", rank: 1, emoji: "⬜" }, // >15%
    uncommon: { color: "#0f0", rank: 2, emoji: "🟩" }, //8-15%
    rare: { color: "#00f", rank: 3, emoji: "🟦" }, // 3-8%
    epic: { color: "#c0c", rank: 4, emoji: "🟪" }, // 1-3%
    legendary: { color: "#ff0", rank: 5, emoji: "🟨" }, // 0.3-1%
    ultra: { color: "#000", rank: 5, emoji: "⬛" } // <0.3%
}
const badges = [
    {
        //8%
        name: "EU Citizenship",
        rarity: "uncommon",
        emoji: "🇪🇺",
        description: "Lives in the European Union.",
        eval: function (person) {
            const iso2 = person.city.iso2;
            const euMembers = ["AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE"]
            return euMembers.includes(iso2)
        }
    },
    {
        //7.5%
        name: "Land Of The Free",
        emoji: "🦅",
        rarity: "uncommon",
        description: "Lives in the USA.",
        eval: function (person) {
            const iso2 = person.city.iso2;
            return iso2 == "US";
        }
    },
    {
        //2%
        name: "Under the Crown",
        rarity: "rare",
        emoji: "👑",
        description: "Has the British monarch as their head of state.",
        eval: function (person) {
            const iso2 = person.city.iso2;
            const states = ["AG", "AU", "BS", "BZ", "CA", "GD", "JM", "NZ", "PG", "KN", "LC", "VC", "SB", "TV", "GB"]
            return states.includes(iso2)
        }
    },
    {
        //8%
        name: "ASEAN",
        rarity: "uncommon",
        emoji: "🌏",
        description: "Lives in an ASEAN member state.",
        eval: function (person) {
            const iso2 = person.city.iso2;
            const asean = ["BN", "KH", "ID", "LA", "MY", "MM", "PH", "SG", "TH", "VN"]
            return asean.includes(iso2)
        }
    },
    {
        //1.2%
        name: "Fertile Crescent",
        rarity: "epic",
        emoji: "🌍",
        description: "Lives in the \"Cradle of Civilization\".",
        eval: function (person) {
            const iso2 = person.city.iso2;
            const asean = ["IL","IQ",'SY','JO',"KW","XW","XG",'LB']
            return asean.includes(iso2)
        }
    },
    {
        //0.2%
        name: "Hermit Kingdom",
        rarity: "legendary",
        emoji: "🇰🇵",
        description: "Lives in North Korea.",
        eval: function (person) {
            const iso2 = person.city.iso2;
            return iso2 == "KP"
        }
    },
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
        //0.05%
        name: "Pacific Islander",
        rarity: "ultra",
        description: "Lives in a Pacific Island nation.",
        emoji: "🏝️",
        eval: function (person) {
            const iso2 = person.city.iso2;
            const pacificIslands = ['FJ', 'SB', 'VU', 'NC', 'PF', 'WS', 'AS', 'TO', 'KI',
                'TV', 'NR', 'PW', 'FM', 'MH', 'CK', 'NU', 'WF',
                'GU', 'MP', 'NF', 'PN', 'PG'];
            return pacificIslands.includes(iso2)
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
        // #48%
        name: "City Slicker",
        description: "Lives in a city with a population at least 1 million.",
        rarity: "common",
        emoji: '🏙️',
        eval: function (person) {
            return person.city.population >= 1000000
        }
    },
    {
        // 8%
        name: "Townsfolk",
        description: "Lives in a town with a population between 2500 and 25000",
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

const SAMPLE_SIZE = 20000
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