const wikiPages = {
    home: {
        title: 'Home',
        body: "<p>Welcome to InternetPedia, a hub for knowledge. We strive to contain as much human knowledge as possible. If you'd like to contribute, please <a page=\"account\">make an account</a>.</p>"
            + "<h3>Today's suggested pages:</h3><ul>"
            + "<li><a page=\"usa\">United States of America</a></li>"
            + "<li><a page=\"virginia_tech\">Virginia Tech</a></li>"
            + "<li><a page=\"christmas\">Christmas</a></li>"
            + "</ul>"
    },
    illinois: {
        title: 'Illinois',
        body: "<div class=\"wikibox-right\">"
            + "<p><b>Illinois</b></p>"
            + "<p>Founded: <b>December 3, 1818 (187 years ago)</b></p>"
            + "</div>"
            + "<p><b>Illinois</b> is a state in the <a page=\"usa\">United States of America</a>. Its largest city is <a page=\"chicago\">Chicago</a>.</p>"
    },
    chicago: {
        title: 'Chicago',
        body: "<div class=\"wikibox-right\">"
            + "<p><b>Chicago</b></p>"
            + "<p>Founded: <b>March 4th, 1837 (169 years ago)</b></p>"
            + "</div>"
            + "<p><b>Chicago</b> is the largest city in the state of <a page=\"illinois\">Illinois</a></p>"
    },
    colorado: {
        title: 'Colorado',
        body: "<div class=\"wikibox-right\">"
            + "<p><b>Colorado</b></p>"
            + "<p>Founded: <b>August 1, 1876 (129 years ago)</b></p>"
            + "</div>"
            + "<p><b>Colorado</b> is a state in the <a page=\"usa\">United States of America</a></p>"
    },
    virginia: {
        title: 'Virginia',
        body: "<div class=\"wikibox-right\">"
            + "<p><b>Virginia</b></p>"
            + "<p>Founded: <b>1607</b></p>"
            + "<p>Joined the United States: <b>June 25, 1788 (217 years ago)</b></p>"
            + "</div>"
            + "<p><b>Virginia</b> is a state in the <a page=\"usa\">United States of America</a>. It borders the state of <a page=\"west_virginia\">West Virginia</a> to the west.</p>"
    },
    west_virginia: {
        title: 'West Virginia',
        body:  "<div class=\"wikibox-right\">"
            + "<p><b>West Virginia</b></p>"
            + "<p>Founded: <b>June 20, 1863 (142 years ago)</b></p>"
            + "</div>"
            + "<p><b>West Virginia</b> is a state in the <a page=\"usa\">United States of America</a>. It borders the state of <a page=\"virginia\">Virginia</a> to the east.</p>"
    },

    nyc: {
        title: 'New York City',
        body: "<div class=\"wikibox-right\">"
            + "<p><b>New York City</b></p>"
            + "<p>Founded: <b>1654</b></p>"
            + "</div>"
            + "<p><b>New York City</b> is a city in the <a page=\"usa\">United States of America</a>, specifically within the state of <a page=\"nys\">New York</a>. It is the most populated city in the <a page=\"usa\">United States</a>.</p>"

    },
    nys: {
        title: 'New York (State)',
        body: "<div class=\"wikibox-right\">"
            + "<p><b>New York</b></p>"
            + "<p>Founded: <b>1624</b></p>"
            + "<p>Joined the United States: <b>February 6, 1788 (218 years ago)</b></p>"
            + "</div>"
            + "<p><b>New York</b> is a state in the <a page=\"usa\">United States of America</a>. It's largest city is <a page=\"nyc\">New York City</a></p>"
    },

    usa: {
        title: 'United States of America',
        body: "<p>the <b>United States Of America</b>, or the <b>United States</b> is the largest country in North America by land area and population.</p>"
            + "<h3>Geography</h3>"
            + "<p>The United States has many mountain ranges, including the Appalachian mountain range and the Rocky mountain range."
            + " The Appalachian mountain range stretches over the east of the United States. The Appalachian mountain range is centered around <a page=\"west_virginia\">West Virginia</a>."
            + " On the other hand, the Rocky mountain range stretches over a large portion of the west of the United States. The Rocky mountain range is centered around <a page=\"colorado\">Colorado</a>.</p>"
            + "<h3>Major cities</h3>"
            + "<p><a page=\"nyc\">New York City</a>, located on the eastern coast, is the largest city in the United States."
            + " One other major city is <a page=\"chicago\">Chicago</a>, a city more north-central to the United States.</p>"
         + "<h3>Culture</h3>"
             + "<p><a page=\"christmas\">Christmas</a> is considered to be one of the largest celebrations in United States culture,"
             +" along with Halloween. Also important to American culture is college football, with schools like <a page=\"virginia_tech\">Virginia Tech</a> being highly culturally relevant.</p>"
            
        },

    christmas: {
        title: 'Christmas',
        body: "<b>Christmas</b> is a celebration which typically occurs on December 25th. It is commonly celebrated in the <a page=\"usa\">United States</a> by giving gifts to family members. "
        + "Some other festivities include placing a pine tree in one's home, eating ham, decorating the pine tree with ornaments, and making gingerbread houses."
    },

    virginia_tech: {
        title: 'Virginia Tech',
        body: "<p><b>Virginia Tech</b> is a public land-grant research university located in Blacksburg, <a page=\"virginia\">Virginia</a>.</p>"
        + "<h3>Football Rivalry</h3><p>"
        + "Virginia Tech has a famous football rivalry with the <a page=\"uva\">University of Virginia</a>, where they currently have a 2-year win streak."
        + " Virginia Tech's head coach is Frank Beamer, who has a 11-2 record for the 2005 football season.</p>"
    },

    uva: {
        title: 'University of Virginia',
        body: "The <b>University of Virginia</b> is a public research university in Charlottesville, <a page=\"virginia\">Virginia</a>."
    },

    account: {
        title: 'Account',
        body: "<div class=\"wikibox-break\"><p>Your Account Name: <b>fnfo_evdy</b></p>"
            + "<p>Account created: <b>January 3rd, 2003 (3 years ago)</b></p>"
            + "<p>Account type: <b>User</b></p> </div>"
            + "<p>Please visit our <a page=\"help\">Help Page</a> to review the rules.</p>"
    },

    help: {
        title: 'Help',
        body: "<h3>Account Rules</h3>"
            + "<p>View your account information <a page=\"account\">here</a>.</p> "
            + "<ul><li>Choose a <b>respectful</b> account name.</li>"
            + "<li>Be respectful to other users.</li>"
            + "<li>Include all <b>relevant</b> links</li></ul>"
            + "<h3>Article Rules</h3>"
            + "<ul><li>Do not add unnessecary information.</li>"
            + "<li>Do not add any <b>false</b> information.</li>"
            + "<li>If an article is exceedingly long for its relevance, <b>shorten it.</b></li>"
            + "<li>Include all relevant links.</li></ul>"
    },
}
let currWikiPage = 'home'
let wikibody = null;
let wikititle = null
function initWikiSite() {
    wikibody = document.createElement('div')
    wikititle = document.createElement('h2')
    const webpage = document.getElementById("webpage");
    const topSection = document.createElement('div')
    topSection.innerHTML = "<h1><span>Internet</span>Pedia</h1>"
    topSection.innerHTML += "<p>Your free source for all knowledge.</p>"
    const links = document.createElement('div')
    links.className = "links"

    const homelink = document.createElement('a')
    homelink.innerText = "Home"
    homelink.onclick = function () {
        currWikiPage = 'home';
        switchWikiSite();
    }
    links.appendChild(homelink)

    const accountlink = document.createElement('a')
    accountlink.innerText = "Account"
    accountlink.onclick = function () {
        currWikiPage = 'account';
        switchWikiSite();
    }
    links.appendChild(accountlink)

    const helplink = document.createElement('a')
    helplink.innerText = "Help"
    helplink.onclick = function () {
        currWikiPage = 'help';
        switchWikiSite();
    }
    links.appendChild(helplink)

    const rule1 = document.createElement('hr')
    const rule2 = document.createElement('hr')
    topSection.appendChild(rule1)
    topSection.appendChild(links)
    topSection.appendChild(rule2)

    webpage.appendChild(topSection)
    webpage.appendChild(wikititle)
    webpage.appendChild(wikibody)
    wikibody.className = "wiki-article"
    switchWikiSite()
}

function switchWikiSite() {
    wikibody.innerHTML = wikiPages[currWikiPage].body
    wikititle.innerText = wikiPages[currWikiPage].title

    let toSearch = []
    for (let i = 0; i < wikibody.children.length; i++) {
        toSearch.push(wikibody.children[i])
    }

    while (toSearch.length > 0) {
        let currItem = toSearch.pop()
        for (let i = 0; i < currItem.children.length; i++) {
            toSearch.push(currItem.children[i])
        }
        if (currItem.getAttribute('page') !== null) {
            const page = currItem.getAttribute('page')
            currItem.onclick = function () {
                currWikiPage = page;
                switchWikiSite();
            }
        }
    }
}