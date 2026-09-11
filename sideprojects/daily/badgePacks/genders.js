function addGenderBadges() {
    badges.push(
        {
            //49.5%
            name: "Man",
            emoji: "🧍‍♂️",
            rarity: "common",
            category: "gender",
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
            category: "gender",
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
            category: "gender",
            rarity: "epic",
            emoji: "🏳️‍🌈",
            description: "Neither male nor female.",
            eval: function (person) {
                return person.name.gender == "NB"
            }
        })

        //
    badges.push(
        {
            //2.5%
            name: "Gay",
            category: "gender",
            rarity: "epic",
            emoji: "👨‍❤️‍👨",
            description: "A man attracted exclusively to other men.",
            eval: function (person) {
                return person.name.gender == "M" && person.sexuality.same && !person.sexuality.opp;
            }
        })
    badges.push(
        {
            //2.5%
            name: "Lesbian",
            category: "gender",
            rarity: "epic",
            emoji: "👩‍❤️‍👩",
            description: "A woman attracted excluslive to other women.",
            eval: function (person) {
                return person.name.gender == "F" && person.sexuality.same && !person.sexuality.opp;
            }
        })
    badges.push(
        {
            //5%
            name: "Bisexual",
            category: "gender",
            rarity: "rare",
            emoji: "🏳️‍🌈",
            description: "Attracted to all genders.",
            eval: function (person) {
                return person.sexuality.same && person.sexuality.opp;
            }
        })
    badges.push(
        {
            //5%
            name: "Straight",
            category: "gender",
            rarity: "common",
            emoji: "👩‍❤️‍👨",
            description: "Attracted to exclusively the opposite gender.",
            eval: function (person) {
                return (!person.sexuality.same) && person.sexuality.opp && person.name.gender != "NB";
            }
        })
    badges.push(
        {
            //1%
            name: "Asexual",
            category: "gender",
            rarity: "epic",
            emoji: "🏳️‍🌈",
            description: "Not attracted to anyone.",
            eval: function (person) {
                return !person.sexuality.same && !person.sexuality.opp;
            }
        })
}