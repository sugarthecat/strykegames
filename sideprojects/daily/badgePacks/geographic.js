function addGeoBadges() {
    badges.push(
        {
            //8%
            name: "EU Citizenship",
            rarity: "uncommon",
            category: "geographic",
            emoji: "🇪🇺",
            description: "Lives in the European Union.",
            eval: function (person) {
                const iso2 = person.city.iso2;
                const euMembers = ["AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE"]
                return euMembers.includes(iso2)
            }
        })
    badges.push(
        {
            //0.33%
            name: "Anticolonial",
            rarity: "legendary",
            category: "geographic",
            emoji: "⚔️",
            description: "Lives in an African country which has never been colonized.",
            eval: function (person) {
                const iso2 = person.city.iso2;
                return iso2 == "LI" || iso2 == "ET"
            }
        })
    badges.push(
        {
            //7.5%
            name: "Land Of The Free",
            emoji: "🦅",
            category: "geographic",
            rarity: "uncommon",
            description: "Lives in the USA.",
            eval: function (person) {
                const iso2 = person.city.iso2;
                return iso2 == "US";
            }
        })
    badges.push(
        {
            //2%
            name: "Under the Crown",
            rarity: "rare",
            category: "geographic",
            emoji: "👑",
            description: "Has the British monarch as their head of state.",
            eval: function (person) {
                const iso2 = person.city.iso2;
                const states = ["AG", "AU", "BS", "BZ", "CA", "GD", "JM", "NZ", "PG", "KN", "LC", "VC", "SB", "TV", "GB"]
                return states.includes(iso2)
            }
        })
    badges.push(
        {
            //8%
            name: "ASEAN",
            rarity: "uncommon",
            category: "geographic",
            emoji: "🌏",
            description: "Lives in an ASEAN member state.",
            eval: function (person) {
                const iso2 = person.city.iso2;
                const asean = ["BN", "KH", "ID", "LA", "MY", "MM", "PH", "SG", "TH", "VN"]
                return asean.includes(iso2)
            }
        })
    badges.push(
        {
            //1.2%
            name: "Fertile Crescent",
            rarity: "epic",
            category: "geographic",
            emoji: "🌍",
            description: "Lives in the \"Cradle of Civilization\".",
            eval: function (person) {
                const iso2 = person.city.iso2;
                const asean = ["IL", "IQ", 'SY', 'JO', "KW", "XW", "XG", 'LB']
                return asean.includes(iso2)
            }
        })
    badges.push(
        {
            //0.2%
            name: "Hermit Kingdom",
            rarity: "legendary",
            category: "geographic",
            emoji: "🇰🇵",
            description: "Lives in North Korea.",
            eval: function (person) {
                const iso2 = person.city.iso2;
                return iso2 == "KP"
            }
        })
    badges.push(
        {
            //0.05%
            name: "Pacific Islander",
            rarity: "ultra",
            category: "geographic",
            description: "Lives in a Pacific Island nation.",
            emoji: "🏝️",
            eval: function (person) {
                const iso2 = person.city.iso2;
                const pacificIslands = ['FJ', 'SB', 'VU', 'NC', 'PF', 'WS', 'AS', 'TO', 'KI',
                    'TV', 'NR', 'PW', 'FM', 'MH', 'CK', 'NU', 'WF',
                    'GU', 'MP', 'NF', 'PN', 'PG'];
                return pacificIslands.includes(iso2)
            }
        })
    badges.push(
        {
            //0.15%
            name: "Big Apple",
            rarity: "legendary",
            emoji: "🗽",
            description: "Lives in New York City.",
            eval: function (person) {
                return (["Manhattan", "Brooklyn", "Queens", "The Bronx", "Staten Island"].includes(person.city.city)) && person.city.admin_name == "New York"
            }
        })
}