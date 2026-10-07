function addMiscBadges() {
    badges.push(
        {
            //10%
            name: "Governmental",
            description: "Lives in a national capital.",
            emoji: "🏛️",
            category: "misc",
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
            category: "misc",
            rarity: "uncommon",
            eval: function (person) {
                return person.city.admin_name == person.city.city
            }
        },
        {
            //20%
            name: "Bilingual",
            description: "Speaks two languages",
            emoji: "🏛️",
            category: "misc",
            rarity: "common",
            eval: function (person) {
                return person.languages.length == 2
            }
        },
        {
            //20%
            name: "Trilingual",
            description: "Speaks three languages",
            emoji: "🌐",
            category: "misc",
            rarity: "rare",
            eval: function (person) {
                return person.languages.length == 3
            }
        },
        {
            //20%
            name: "Polyglot",
            description: "Speaks at least 4 languages",
            emoji: "🌐",
            category: "misc",
            rarity: "ultra",
            eval: function (person) {
                return person.languages.length >= 4
            }
        },
        {
            // #23%
            name: "Urbanist",
            description: "Lives in a city with a population from 1-5 million.",
            rarity: "common",
            category: "misc",
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
            category: "misc",
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
            category: "misc",
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
            category: "misc",
            emoji: "🛖",
            eval: function (person) {
                return person.city.population < 2500
            }
        },
        {
            //0.6%
            name: "Scunthorpe City",
            description: "Lives in a city which may have its name automatically censored.",
            rarity: "legendary",
            category: "misc",
            emoji: "🤬",
            eval: function (person) {

                const badWords = ['cunt', 'fuck', 'shit', 'damn', 'dick', 'ass', 'bitch', 'cock',]
                let locName = getLocation(person)
                for (let i = 0; i < badWords.length; i++) {
                    if (locName.includes(badWords[i])) {
                        return true;
                    }
                }
                return false;
            }
        }
    )
}
