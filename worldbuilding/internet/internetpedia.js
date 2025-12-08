
//special characters: {a/b} = link (text = a, to = b)
//
const wikiPages = {
    home:"This is the wiki home page!",
    account:"This is the wiki account page!",
    help:"This is the wiki help page!",
}
let currWikiPage = 'home'
function initWikiSite() {
    const body = document.createElement('div')
    const webpage = document.getElementById("webpage");
    const topSection = document.createElement('div')
    topSection.innerHTML = "<h1><span>Internet</span>Pedia</h1>"
    topSection.innerHTML += "<p>Your free source for all knowledge.</p>"
    const links = document.createElement('div')
    links.className = "links"

    const homelink = document.createElement('a')
    homelink.innerText = "Home"
    homelink.onclick = function(){
        currWikiPage = 'home';
        switchWikiSite(body);
    }
    links.appendChild(homelink)

    const accountlink = document.createElement('a')
    accountlink.innerText = "Account"
    accountlink.onclick = function(){
        currWikiPage = 'account';
        switchWikiSite(body);
    }
    links.appendChild(accountlink)

    const helplink = document.createElement('a')
    helplink.innerText = "Help"
    helplink.onclick = function(){
        currWikiPage = 'help';
        switchWikiSite(body);
    }
    links.appendChild(helplink)

    const rule = document.createElement('hr')
    topSection.appendChild(rule)
    topSection.appendChild(links)
    topSection.appendChild(rule)

    webpage.appendChild(topSection)
    webpage.appendChild(body)
    switchWikiSite(body);
}

function switchWikiSite(body){
    body.innerHTML = wikiPages[currWikiPage]


}