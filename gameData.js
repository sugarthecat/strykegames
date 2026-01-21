/**
window.onload = function(){
    let content = document.getElementById("gamecontent").children;
    for(let i = 0; i<content.length; i++){
        content[i].style.gridRowStart = Math.max(i,1);
        content[i].style.gridRowEnd = i+2;
    }
}
     */

//each game:
//REQUIRED: year (num), title (string), tags, shortline
//optional: recommendationLevel, hidden

//recommendationLevel = 3 (huge display)
// 3 = big game,  more than 30-40 min of gameplay
//recommendationLevel = 2 (pretty big display)
// 2 = arcade game, about ~20 mins of gameplay
//recommendationLevel = 1 (display)
// 1 = pretty much a minigame, very little content. 5-10 mins gameplay
//
let games = [];
let tags = [];
async function loadGames() {
    let json = await (fetch("gamelist.json").then(x => x.json()));
    games = json.games;
    //remove hidden games
    games = games.filter((val) => val.hidden !== true)
    games.sort(compareGames)
    //build tags list 
    for (let i = 0; i < games.length; i++) {
        for (let j = 0; j < games[i].tags.length; j++) {
            if (!tags.includes(games[i].tags[j])) {
                tags.push(games[i].tags[j])
            }
        }
    }
    for (let i = 0; i < tags.length; i++) {
        tags[i] = { "tag": tags[i] }
        tags[i].color = { "off": "#fff", "on": "#222" }
    }
    buildHTML()
}
loadGames();

function compareGames(a, b) {
    if (a.recommendationLevel != b.recommendationLevel) {
        if (a.recommendationLevel === undefined) {
            a.recommendationLevel = 0
        }
        if (b.recommendationLevel === undefined) {
            b.recommendationLevel = 0
        }
        return b.recommendationLevel - a.recommendationLevel
    }
    if (a.year != b.year) {
        return b.year - a.year
    }
    return 0;
}

function validateGame(game) {
    if (game.hidden) {
        return false
    }
    if (!game.title) {
        console.error("Game has no title")
        return false
    }
    if (!game.year) {
        console.error("Game has no year")
        return false
    }
    return true
}