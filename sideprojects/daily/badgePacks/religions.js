function addReligionBadges() {
    badges.push({
        //30%
        name: "Christian",
        description: "Believes Jesus is the son of God.",
        rarity: "common",
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
        emoji: "☯️",
        eval: function (person) {
            return person.religion == "Taoism"
        }
    })
}