function addReligionBadges() {
    badges.push({
        //30%
        name: "Christian",
        description: "Believes Jesus is the son of God.",
        rarity: "common",
        category: "religion",
        emoji: "✝️",
        eval: function (person) {
            return person.religion == "Christians"
        }
    })
    badges.push({
        //20%
        name: "Muslim",
        description: "Follows the prophet Muhammad.",
        rarity: "common",
        category: "religion",
        emoji: "☪️",
        eval: function (person) {
            return person.religion == "Muslims"
        }
    })
    badges.push({
        //0.2%
        name: "Jewish",
        description: "Follows the religion of Judaism.",
        rarity: "legendary",
        category: "religion",
        emoji: "✡️",
        eval: function (person) {
            return person.religion == "Jews"
        }
    })
    badges.push({
        //20%
        name: "Atheist",
        description: "Follows no religion.",
        rarity: "common",
        category: "religion",
        emoji: "⚛️",
        eval: function (person) {
            return person.religion == "Unaffiliated"
        }
    })
    badges.push({
        //20%
        name: "Hindu",
        description: "Follows the Hindu religion.",
        rarity: "common",
        category: "religion",
        emoji: "🕉️",
        eval: function (person) {
            return person.religion == "Hindus"
        }
    })
    badges.push({
        //7%
        name: "Buddhist",
        description: "Follows the Buddhist religion.",
        rarity: "uncommon",
        category: "religion",
        emoji: "☸️",
        eval: function (person) {
            return person.religion == "Buddhists"
        }
    })
    badges.push({
        //6%
        name: "Folk Spiritual",
        description: "Follows a decentralized folk religion.",
        rarity: "rare",
        category: "religion",
        emoji: "🛐",
        eval: function (person) {
            return person.religion == "Folk Religions"
        }
    })
    badges.push({
        //0.2%
        name: "Sikh",
        description: "Follows Sikhism.",
        rarity: "legendary",
        category: "religion",
        emoji: "🪯",
        eval: function (person) {
            return person.religion == "Sikh"
        }
    })
    badges.push({
        //0.03%
        name: "Jain",
        description: "Follows Jainism.",
        rarity: "ultra",
        category: "religion",
        emoji: "🛐",
        eval: function (person) {
            return person.religion == "Jain"
        }
    })
    badges.push({
        //0.15%
        name: "Taoist",
        description: "Follows Taoism.",
        rarity: "legendary",
        category: "religion",
        emoji: "☯️",
        eval: function (person) {
            return person.religion == "Taoism"
        }
    })
    badges.push({
        //0.29%
        name: "Shintoist",
        description: "Follows Shinto.",
        rarity: "legendary",
        category: "religion",
        emoji: "☯️",
        eval: function (person) {
            return person.religion == "Shinto"
        }
    })
    badges.push({
        // 0.002%
        name: "Rasta",
        description: "Follows Rastafari.",
        rarity: "ultra",
        category: "religion",
        emoji: "🇯🇲",
        eval: function (person) {
            return person.religion == "Rastafari"
        }
    })
    badges.push({
        // 0.01%
        name: "Baha'i",
        description: "Follows the Baha'i Faith.",
        rarity: "ultra",
        category: "religion",
        emoji: "🇮🇷",
        eval: function (person) {
            return person.religion == "Bahai"
        }
    })
    badges.push({
        // 0.025%
        name: "Juche",
        description: "Follows Juche, the North Korean state religion.",
        rarity: "ultra",
        category: "religion",
        emoji: "🇰🇵",
        eval: function (person) {
            return person.religion == "Juche"
        }
    })
    badges.push({
        // 0.01%
        name: "Wicca",
        description: "Follows Wicca, pre-christian English practice of witchcraft.",
        rarity: "ultra",
        category: "religion",
        emoji: "🕯️",
        eval: function (person) {
            return person.religion == "Wicca"
        }
    })
}