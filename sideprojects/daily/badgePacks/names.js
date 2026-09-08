function addNameBadges() {
    badges.push(
        {
            //8%
            name: "Short Name",
            description: "Has a name of at most 7 characters.",
            rarity: "uncommon",
            emoji: "⏪",
            eval: function (person) {
                if (person.forename == "Mr." || person.forename == "Ms.") {
                    return false;
                }
                let nameNoSpaces = getPrintName(person)
                while (nameNoSpaces != nameNoSpaces.replaceAll(" ", "")) {
                    nameNoSpaces = nameNoSpaces.replaceAll(" ", "")
                }
                return nameNoSpaces.length <= 7
            }
        })
    badges.push(
        {
            //10%
            name: "Long Name",
            description: "Has a name of at least 15 characters.",
            rarity: "uncommon",
            emoji: "⏩",
            eval: function (person) {
                if (person.forename == "Mr." || person.forename == "Ms.") {
                    return false;
                }
                let nameNoSpaces = getPrintName(person)
                while (nameNoSpaces != nameNoSpaces.replaceAll(" ", "")) {
                    nameNoSpaces = nameNoSpaces.replaceAll(" ", "")
                }
                return nameNoSpaces.length >= 15
            }
        })
    badges.push(
        {
            //0.5%
            name: "Ultra Long Name",
            description: "Has a name of at least 20 characters.",
            rarity: "legendary",
            emoji: "🗒",
            eval: function (person) {
                if (person.forename == "Mr." || person.forename == "Ms.") {
                    return false;
                }
                let nameNoSpaces = getPrintName(person)
                while (nameNoSpaces != nameNoSpaces.replaceAll(" ", "")) {
                    nameNoSpaces = nameNoSpaces.replaceAll(" ", "")
                }
                return nameNoSpaces.length >= 20
            }
        })
    badges.push(
        {
            //4%
            name: "Triple Word",
            description: "Has a name composed of three words.",
            rarity: "rare",
            emoji: "3️⃣",
            eval: function (person) {
                if (person.forename == "Mr." || person.forename == "Ms.") {
                    return false;
                }
                let personName = getPrintName(person)
                return personName.split(' ').length == 3
            }
        })
    badges.push(
        {
            //0.04%
            name: "Quad Word",
            description: "Has a name composed of four words.",
            rarity: "utlra",
            emoji: "4️⃣",
            eval: function (person) {
                if (person.forename == "Mr." || person.forename == "Ms.") {
                    return false;
                }
                let personName = getPrintName(person)
                return personName.split(' ').length == 4
            }
        })
    badges.push(
        {
            //0.15%
            name: "Double Name",
            description: "Has the same first and last name",
            rarity: "legendary",
            emoji: "🪞",
            eval: function (person) {
                return person.name.surname == person.name.forename
            }
        })
    badges.push(
        {
            //0.5%
            name: "Scunthorpe Name",
            description: "Has a name which may get blockde by automatic censors.",
            rarity: "legendary",
            emoji: "🤬",
            eval: function (person) {
                const badWords = ['cunt', 'fuck', 'shit', 'damn', 'dick', 'ass', 'bitch','cock',]
                let personName = getPrintName(person)
                for (let i = 0; i < badWords.length; i++) {
                    if (personName.includes(badWords[i])) {
                        return true;
                    }
                }
                return false;
            }
        })
}