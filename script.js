/**
window.onload = function(){
    let content = document.getElementById("gamecontent").children;
    for(let i = 0; i<content.length; i++){
        content[i].style.gridRowStart = Math.max(i,1);
        content[i].style.gridRowEnd = i+2;
    }
}
     */
async function buildHTML() {
    //add games to list
    let gameslist = document.getElementById("gamegrid");
    for (let i = 0; i < games.length; i++) {
        games[i].div = getGameDiv(games[i]);
        gameslist.appendChild(games[i].div)
    }
}

    let vert = false;
function getGameDiv(game) {
    let newDiv = document.createElement("div");

    let link = document.createElement("a");
    link.innerText = `${game.title} (${game.year})`
    link.target = "_blank";
    link.href = game.link;
    link.style.color = game.textColor

    let title = document.createElement("h3");
    title.appendChild(link);
    newDiv.appendChild(title);


    if (game.shortline) {
        let blurb = document.createElement('p')
        blurb.style.color = game.textColor
        blurb.innerText = game.shortline
        newDiv.append(blurb)
    }

    newDiv.style.backgroundColor = game.bgColor;
    newDiv.classList.add("game")
    console.log(game.title, game.date, game.recommendationLevel)
    if (game.recommendationLevel >= 3) {
        newDiv.classList.add('huge')
    } else if (game.recommendationLevel >= 2) {
        
        vert = Math.random() < 0.5;
        newDiv.classList.add('big' + (vert ? "c" : "r"));
    }
    return newDiv;
}
