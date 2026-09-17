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
                    'GU', 'MP', 'NF', 'PN'];
                return pacificIslands.includes(iso2) || person.city.admin_name == "Hawaii"
            }
        })
    badges.push(
        {
            //0.15%
            name: "Big Apple",
            rarity: "legendary",
            category: "geographic",
            emoji: "🗽",
            description: "Lives in New York City.",
            eval: function (person) {
                return (["Manhattan", "Brooklyn", "Queens", "The Bronx", "Staten Island"].includes(person.city.city)) && person.city.admin_name == "New York"
            }
        })
    badges.push(
        {
            //0.0003%
            name: "Hokie",
            rarity: "ultra",
            category: "geographic",
            emoji: "🦃",
            description: "Lives in Blacksburg or Christiansburg, Virginia.",
            eval: function (person) {
                return (["Blacksburg", "Christiansburg"].includes(person.city.city)) && person.city.admin_name == "Virginia"
            }
        })
    badges.push(
        {
            //0.2%
            name: "Southern Slav",
            rarity: "legendary",
            category: "geographic",
            emoji: "🇪🇺",
            description: "Lives in a post-Yugoslav state.",
            eval: function (person) {
                return (["BA", "HR", 'XK', 'SI', "RS", "MK", "ME"].includes(person.city.iso2))
            }
        })
    badges.push(
        {
            //1.7%
            name: "West Coast",
            rarity: "epic",
            category: "geographic",
            emoji: "🏖️",
            description: "Lives on the North American west coast.",
            eval: function (person) {
                return (["California", "Oregon", "Washington", "Alaska", "British Columbia", "Baja California", "Baja California Sur"].includes(person.city.admin_name))
            }
        })
    badges.push(
        {
            //0.7%
            name: "Wonderful",
            rarity: "legendary",
            category: "geographic",
            emoji: "🏖️",
            description: "Lives nearby to one of the New 7 Wonders of the World.",
            eval: function (person) {
                //iso2, city
                const triplets = [
                    ["IN", "Agra"], //taj mahal
                    ["IT", "Rome"], // collesseum
                    ["JO", "Wadi Musa"], //petra (will never trigger)
                    ["PE", "Machupicchu"], // machu pichu (will never trigger)
                    ["BR", "Rio de Janeiro"], // christ the redeemer
                    ["MX", "Tinum"] //chichen itza (never triggers)
                    ["CN", "Beijing"], //great wall of china
                    ["CN", "Qinhuangdao"], //great wall of china
                    ["CN", "Jiayuguan"], //great wall of china
                    ["CN", "Tianjin"] //great wall of china
                ]

                for (const triplet of triplets) {
                    if(triplet === undefined || triplet.length == 0){
                        continue
                    }
                    if (triplet[0] != person.city.iso2) {
                        continue
                    }
                    if (triplet[1] != person.city.city_ascii) {
                        continue
                    }
                    return true
                }
                return false;
            }
        })
}