
function GetElectionStory() {
    let country = getCountry()
    let titles = [
        `Elections in ${country.name}`,
        `${country.name} elections`
    ]
    let pollingResults = []
    let percentLeft = 100;

    let content = random([`New polls in ${country.name} :\n`,`Polling in ${country.name} reveals new trends :\n`,`Elections results released in ${country.name} :\n`])
    for (let i = 0; i < random(4, 7); i++) {
        let percentageTake = random(percentLeft / 2) + random(percentLeft / 2)
        percentageTake = floor(percentageTake * 100) / 100
        percentLeft -= percentageTake;
        content += `\n${getPoliticalParty()} (${getPoliticalLeaning()}): ${percentageTake}%`
    }
    content += `\n Other: ${floor(percentLeft*100)/100}%`
    return { title: random(titles), content: content }
}