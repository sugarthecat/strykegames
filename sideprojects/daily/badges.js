const rarity = {
    common: { color: "#888", rank: 1 }, // >15%
    uncommon: { color: "#0f0", rank: 2 }, //8-15%
    rare: { color: "#00f", rank: 3 }, // 3-8%
    epic: { color: "#c0c", rank: 4 }, // 1-3%
    legendary: { color: "#ff0", rank: 5 }, // 0.3-1%
    ultra: { color: "#000", rank: 5 } // <0.3%
}
const badges = [
    {
        //8%
        name: "EU Citizenship",
        rarity: "uncommon",
        description: "Lives in the European Union.",
        eval: function (person) {
            const iso2 = person.city.iso2;
            const euMembers = ["AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE"]
            return euMembers.includes(iso2)
        }
    },
    {
        //0.2%
        name: "North Korean",
        rarity: "legendary",
        description: "Lives in North Korea.",
        eval: function (person) {
            const iso2 = person.city.iso2;
            return iso2 == "KP"
        }
    },
    {
        //0.15%
        name: "New Yorker",
        rarity: "legendary",
        description: "Lives in New York City.",
        eval: function (person) {
            return ( ["Manhattan","Brooklyn","Queens","The Bronx", "Staten Island"].includes(person.city.city)) && person.city.admin_name == "New York"
        }
    },
    {
        //0.05%
        name: "Pacific Islander",
        rarity: "ultra",
        description: "Lives in a Pacific Island nation.",
        eval: function (person) {
            const iso2 = person.city.iso2;
            const pacificIslands = ['FJ', 'SB', 'VU', 'NC', 'PF', 'WS', 'AS', 'TO', 'KI',
                        'TV', 'NR', 'PW', 'FM', 'MH', 'CK', 'NU', 'WF',
                        'GU', 'MP', 'NF', 'PN','PG'];
            return pacificIslands.includes(iso2)
        }
    },
    {
        //10%
        name: "Politician",
        description: "Lives in a national capital.",
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
        eval: function (person) {
            return person.city.population >= 1000000
        }
    },
    {
        // 8%
        name: "Townsfolk",
        description: "Lives in a town with a population between 2500 and 25000",
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
        eval: function (person) {
            return person.city.population < 2500
        }
    }
]

function getBadges(person) {
    let applied = []
    for (let i = 0; i < badges.length; i++) {
        if (badges[i].eval(person)) {
            applied.push(badges[i])
        }
    }
    return applied
}

const SAMPLE_SIZE = 1000000
function testBadge(badgeName) {
    let badge = null;
    for (let i = 0; i < badges.length; i++) {
        if (badges[i].name.toLowerCase() == badgeName) {
            badge = badges[i];
            break
        }
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