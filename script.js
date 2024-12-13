/**
window.onload = function(){
    let content = document.getElementById("gamecontent").children;
    for(let i = 0; i<content.length; i++){
        content[i].style.gridRowStart = Math.max(i,1);
        content[i].style.gridRowEnd = i+2;
    }
}
     */

let games = [];
let tags = [];
let activeTags = [];
async function loadGames(){
    let json = await (fetch("gamelist.json").then(x => x.json()));
    games = json.games;
    //build tags list 
    for(let i = 0; i<games.length; i++){
        for(let j = 0; j<games[i].tags.length; j++){
            if(!tags.includes(games[i].tags[j])){
                tags.push(games[i].tags[j])
            }
        }
    }
    for(let i = 0; i<tags.length; i++){
        tags[i] = {"tag": tags[i]}
        if(json.tags[tags[i].tag] == null){
            tags[i].color = {"off":"#fff","on":"#222"}
        }else{
            tags[i].color = json.tags[tags[i].tag]
        }
    }
    //add games to list
    let gameslist = document.getElementById("gamelist");
    for(let i = 0; i<games.length; i++){
        games[i].div = getGameDiv(games[i]);
        gameslist.appendChild(games[i].div)
    }
    let tagslist = document.getElementById("taglist");
    for(let i = 0; i<tags.length; i++){
        tags[i].button = getTagButton(tags[i]);
    }
    getBaseTagCounts();
    tags.sort( (a,b) => b.count - a.count)

    for(let i = 0; i<tags.length; i++){
        tagslist.appendChild(tags[i].button);
    }
    update();
}
loadGames();



function getGameDiv(game){
    let newDiv = document.createElement("div");
    let title = document.createElement("h3");
    let link = document.createElement("a");
    link.innerText = `${game.title} (${game.year})` 
    title.appendChild(link);
    link.target="_blank";
    link.href = game.link;
    link.style.color = game.textColor
    let tagsList = document.createElement("div");
    for(let i = 0; i<game.tags.length; i++){
        let newTag = document.createElement("span");
        newTag.innerText = game.tags[i];
        newTag.classList.add("game-tag")
        newTag.classList.add(`tag-${game.tags[i]}`)
        for(let j = 0; j<tags.length; j++){
            if(tags[j].tag == game.tags[i]){
                newTag.style.backgroundColor = tags[j].color.off
            }
        }
        tagsList.appendChild(newTag);
    }
    newDiv.style.backgroundColor = game.bgColor;
    newDiv.appendChild(title);
    newDiv.appendChild(tagsList);
    newDiv.classList.add("game")
    return newDiv;
}

function getTagButton(tag){
    let button = document.createElement("button");
    button.innerText = tag.tag;
    button.classList.add("menu-tag");
    button.classList.add(`tag-${tag.tag}`);
    let newTag = tag;
    button.style.backgroundColor = tag.color.off
    button.onclick = function(evt){
        toggleTag(newTag);
        update();
    }
    return button;
}

function update(){
    updateGames();
    updateTagNames();
}
function updateGames(){
    for(let i = 0; i<games.length; i++){
        let show = true;
        for(let j = 0; j<activeTags.length; j++){
            if(!games[i].tags.includes(activeTags[j])){
                show = false; 
                break;
            }
        }
        if(show){
            games[i].div.style.display = "block";
        }else{
            games[i].div.style.display  = "none";
        }
    }
}
function getBaseTagCounts(){
    for(let i = 0; i<tags.length; i++){
        let count = 0;
        for(let j = 0; j<games.length; j++){
            if(games[j].tags.includes(tags[i].tag)){
                count++;
            }
        }
        tags[i].count = count;
    }
}
function updateTagCounts(){
    for(let i = 0; i<tags.length; i++){
        let count = 0;
        for(let j = 0; j<games.length; j++){
            if(games[j].div.style.display == "block" && games[j].tags.includes(tags[i].tag)){
                count++;
            }
        }
        tags[i].count = count;
    }
}
function updateTagNames(){
    updateTagCounts();
    for(let i = 0; i<tags.length; i++){
        tags[i].button.innerText = `${tags[i].tag} (${tags[i].count})`
        if(tags[i].count == 0){
            tags[i].button.style.display = "none";
        }else{
            tags[i].button.style.display = "inline";
        }
    }
}

function toggleTag(tag){
    
    let elements = document.getElementsByClassName(`tag-${tag.tag}`)
    let tagActive = activeTags.includes(tag.tag)
    for(let i = 0; i<elements.length; i++){
        if(tagActive){
            elements[i].classList.remove("on")
            elements[i].style.backgroundColor = tag.color.off
        }else{
            elements[i].classList.add("on")
            elements[i].style.backgroundColor = tag.color.on
        }
    }
    if(activeTags.includes(tag.tag)){
        activeTags.splice(activeTags.indexOf(tag.tag),1);
    }else{
        activeTags.push(tag.tag)
    }
}