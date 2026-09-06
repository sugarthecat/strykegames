function addGenderBadges() {
    badges.push(
        {
            //49.5%
            name: "Man",
            emoji: "🧍‍♂️",
            rarity: "common",
            description: "Of the male gender.",
            eval: function (person) {
                return person.name.gender == "M"
            }
        })
    badges.push(
        {
            //49.5%
            name: "Woman",
            emoji: "🧍‍♀️",
            rarity: "common",
            description: "Of the female gender.",
            eval: function (person) {
                return person.name.gender == "F"
            }
        });
    badges.push(
        {
            //1%
            name: "Non-Binary",
            rarity: "rare",
            emoji: "🏳️‍🌈",
            description: "Neither male nor female.",
            eval: function (person) {
                return person.name.gender == "NB"
            }
        })
}