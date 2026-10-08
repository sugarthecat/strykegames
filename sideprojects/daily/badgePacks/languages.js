// "US" -> "🇺🇸" (each letter maps to a regional indicator symbol)
function iso2ToFlag(iso2) {
    return [...iso2.toUpperCase()]
        .map(c => String.fromCodePoint(0x1F1E6 + c.charCodeAt(0) - 65))
        .join("");
}

function addLanguageBadges() {
    const languageTotal = {}
    const langLargestiso2 = {}
    const langLargestPop = {}
    let worldTotal = 0;
    for (const iso2 of Object.keys(languages)) {
        for(let i = 0; i<languages[iso2].length; i++){
            const myLanguage = languages[iso2][i]
            const key = myLanguage.language
            worldTotal += myLanguage.speakers
            if(!(key in languageTotal)){
                languageTotal[key] = 0;
                langLargestiso2[key] = iso2;
                langLargestPop[key] = 0;
            }
            languageTotal[key] += myLanguage.speakers
            if(myLanguage.speakers > langLargestPop[key]){
                langLargestPop[key] = myLanguage.speakers;
                langLargestiso2[key] = iso2;
            }
        }
    }
    
    for (const language of Object.keys(languageTotal)) {
        const badge = {}
        badge.name = `${language}`
        badge.description = `Speaks ${language}.`
        badge.category = "languages"
        const evalFunc = function(person){
            return person.languages.includes(language)
        }
        badge.emoji = iso2ToFlag(langLargestiso2[language])
        badge.rarity = "common"
        if(languageTotal[language] < 200000000){
            //less than 200 mil, target 30%
            badge.rarity = "uncommon"
        }
        if(languageTotal[language] < 30000000){
            //less than 60 mil, target 10%
            badge.rarity = "rare"
        }
        if(languageTotal[language] < 4000000){
            //less than 40mil
            badge.rarity = "epic"
        }
        if(languageTotal[language] < 1000000){
            //less than 750k
            badge.rarity = "legendary"
        }
        if(languageTotal[language] < 150000){
            //less than 150k
            badge.rarity = "mythical"
        }
        badge.eval = evalFunc
        badges.push(badge)
    }

}