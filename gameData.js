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
//optional: reccomendationLevel, hidden
let games = [];
let tags = [];
let activeTags = [];
async function loadGames() {
    let json = await (fetch("gamelist.json").then(x => x.json()));
    games = json.games;
    //remove hidden games
    games = games.filter((val) =>val.hidden !== true)
    games.toSorted((a, b) => a - b)
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
        if (json.tags[tags[i].tag] == null) {
            tags[i].color = { "off": "#fff", "on": "#222" }
        } else {
            tags[i].color = json.tags[tags[i].tag]
        }
    }
    buildHTML()
}
loadGames();

function compareGames(a,b){
    if(a.reccommendationLevel != b.reccommendationLevel){
        return a.reccommendationLevel - b.reccommendationLevel
    }
    if(a.year != b.year){
        return a.year - b.year
    }
    return 0;
}

function validateGame(game){
    if(game.hidden){
        return false
    }
    if(!game.title){
        console.error("Game has no title")
        return false
    }
    if(!game.year){
        console.error("Game has no year")
        return false
    }
    return true
}