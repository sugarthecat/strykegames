function GetStory() {
    let stories = [GetElectionStory()]
    return random (stories)
}

function GetElectionStory() {
    return { title: "Good News!", content: "No news today." }
}