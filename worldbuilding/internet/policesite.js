const policePages = {
    home: "<p>Welcome to Skokie Scanner. We're an organization and network that monitors local police radio and reports to the public on events as they happen."+
    " We're a nonprofit community-run website, with reports published anonymously for our privacy.</p>"
    + "<p>We are committed to keeping the police competent and holding police accountable, since the only way to have a safe community is to have those that keep it safe answer to the people.</p>"
    + "<p><i>Those who would trade liberty for security deserve neither.</i></p>"
    + "<div class=\"forum\">"
    + "<p><b class=\"admin\">Administrator Notice</b></p>"
    + "<p> A lot's happening today, guys, I know. No freak-out threads. I've deleted like 4 of them.</p>"
    + "</div>"
    + "<h2>Recent Updates</h2>"
    + "<hr/>"
    + "<div page=\"fire\" class=\"clickable\">"
    + "<h3>Police arrive to fire at Hingham Cemetery</h3>"
    + "<p>Updated 6 mins ago </p>"
    + "</div>"
    + "<hr/>"
    + "<div page=\"druggie\" class=\"clickable\">"
    + "<h3>Arrest near Church and Mill</h3>"
    + "<p>Updated 29 mins ago </p>"
    + "</div>"
    + "<hr/>"
    + "<div page=\"crash\" class=\"clickable\">"
    + "<h3>Car Crash on Dempster and North Crawford</h3>"
    + "<p>Updated 1 hour ago </p>"
    + "</div>"
    + "<hr/>"
    + "<div page=\"corruption\" class=\"clickable\">"
    + "<h3>Arrest in Chraston Park</h3>"
    + "<p>Updated 3 hours ago </p>"
    + "</div>",
    fire: "<p><a page=\"home\">Return</a>.</p>"
    + "<hr/>"
    + "<div class=\"forum\">"
    + "<p><b>Anomymous3</b></p>"
    + "<p>6 mins ago</p>"
    + "<p>I'm hearing some loud noises from the shed- hopefully everybody got out of there OK. Sounds like it's collapsing. No screaming, they probably got out safe.</p>"
    + "<hr/>"
    + "<p><b>Anomymous2</b></p>"
    + "<p>7 mins ago</p>"
    + "<p>Kid I stopped told me some guy he knew started this fire and locked himself in the shed. Supposedly the kid who started this, and locked himself in that shed, was the owner of that car that got wrecked. (not breaking rules, admin, right?) </p>"
    + "<hr/>"
    + "<p><b>Anomymous3</b></p>"
    + "<p>10 mins ago</p>"
    + "<p>There's some screaming. I'm gonna check it out. Seems to be from the shed</p>"
    + "<hr/>"
    + "<p><b>Anomymous1</b></p>"
    + "<p>12 mins ago</p>"
    + "<p>Yeah, I see both police and fire coming. The weather isn't fire-causing weather. </p>"
    + "<hr/>"
    + "<p><b>Anomymous2</b></p>"
    + "<p>13 mins ago</p>"
    + "<p>My theory's wrong - Kid escaping isn't a match for the wrecked car owner. He says the perp was a writer, he wrote that poem, \"Skokie's Seven Sides\"   </p>"
    + "<hr/>"
    + "<p><b>Anomymous2</b></p>"
    + "<p>21 mins ago</p>"
    + "<p>I'm gonna stop him and see what's up.</p>"
    + "<hr/>"
    + "<p><b>Anomymous2</b></p>"
    + "<p>22 mins ago</p>"
    + "<p>I saw some kid running around. Looks like he's trying to warn people? I don't trust him, keeping distance.</p>"
    + "<hr/>"
    + "<p><b>Anomymous1</b></p>"
    + "<p>24 mins ago</p>"
    + "<p>Looks like there's a fire in the old cemetery? Anybody have any updates?</p>"
    + "</div>",
    druggie: "<p><a page=\"home\">Return</a>.</p>"
    + "<hr/>"
    + "<div class=\"forum\">"
    + "<p><b class=\"admin\">Administrator</b></p>"
    + "<p>29 mins ago</p>"
    + "<p>Closing this thread. Keep it civil.</p>"
    + "<hr/>"
    + "<p><b>Anomymous3</b></p>"
    + "<p>38 mins ago</p>"
    + "<p>And what if you don't have someplace to shower? You'd get high too.</p>"
    + "<hr/>"
    + "<p><b>Anomymous2</b></p>"
    + "<p>40 mins ago</p>"
    + "<p>It's not that hard to stay sober? and get a job?</p>"
    + "<hr/>"
    + "<p><b>Anomymous3</b></p>"
    + "<p>45 mins ago</p>"
    + "<p>Please, be respectful. he's probably got it worse than a lot of us.</p>"
    + "<hr/>"
    + "<p><b>Anomymous2</b></p>"
    + "<p>48 mins ago</p>"
    + "<p>LOLOL that's the guy. Shame he couldn't get it together.</p>"
    + "<hr/>"
    + "<p><b>Anomymous1</b></p>"
    + "<p>53 mins ago</p>"
    + "<p>Black hair, green jacket, seems to be around 5 foot 8. Looks like if the guy who played John Danger had a tough turn in life.</p>"
    + "<hr/>"
    + "<p><b>Anomymous2</b></p>"
    + "<p>1 hour ago</p>"
    + "<p>I think that's one of the druggies, can I get a better description?</p>"
    + "<hr/>"
    + "<p><b>Anomymous1</b></p>"
    + "<p>1 hour ago</p>"
    + "<p>I can see somebody getting arrested near Church and Mill. Guy looks unkempt.</p>"
    + "</div>"
    ,
    crash: "<p><a page=\"home\">Return</a>.</p>"
    + "<hr/>"
    + "<div class=\"forum\">"
    + "<p><b class=\"admin\">Administrator</b></p>"
    + "<p>1 hour ago</p>"
    + "<p>Closing for now. If anything crazy happens, make another thread.</p>"
    + "<hr/>"
    + "<p><b>Anomymous1</b></p>"
    + "<p>1 hour ago</p>"
    + "<p>Police are here. Seems like that's all I can really document. Seems like the people who crashed it got out OK.</p>"
    + "<hr/>"
    + "<p><b>Anomymous1</b></p>"
    + "<p>2 hours ago</p>"
    + "<p>License plate 284 WJD. Look up the name for yourself.</p>"
    + "<hr/>"
    + "<p><b>Anomymous2</b></p>"
    + "<p>2 hours ago</p>"
    + "<p>Any identifiable info? These guys need a neighborly visit.</p>"
    + "<hr/>"
    + "<p><b>Anomymous2</b></p>"
    + "<p>2 hours ago</p>"
    + "<p>Absolutely crazy that somebody would do this. Probably a drunk.</p>"
    + "<hr/>"
    + "<p><b>Anomymous1</b></p>"
    + "<p>2 hours ago</p>"
    + "<p>Brutal car crash on Dempster and North Crawford. Nobody dead, a couple probably injured? Some guy drove a sedan (not a car guy, forgive me, I do not know which type) into the corner of a building. Thing is trashed. </p>"
    + "</div>",
    corruption: "<p><a page=\"home\">Return</a>.</p>"
    + "<hr/>"
    + "<div class=\"forum\">"
    + "<p><b class=\"admin\">Administrator</b></p>"
    + "<p>3 hours ago</p>"
    + "<p>Closing for inactivity.</p>"
    + "<hr/>"
    + "<p><b>Anomymous4</b></p>"
    + "<p>3 hours ago</p>"
    + "<p>Sorry about that.</p>"
    + "<hr/>"
    + "<p><b class=\"admin\">Administrator</b></p>"
    + "<p>3 hours ago</p>"
    + "<p>Do not state persons' names.</p>"
    + "<hr/>"
    + "<p><b>Anomymous4</b></p>"
    + "<p>3 hours ago</p>"
    + "<p>OH MY GOD THAT'S PARKER FROM THE CHRONICLE???</p>"
    + "<hr/>"
    + "<p><b>Anomymous2</b></p>"
    + "<p>3 hours ago</p>"
    + "<p>Yeah, but they werent doing much.</p>"
    + "<hr/>"
    + "<p><b>Anomymous4</b></p>"
    + "<p>3 hours ago</p>"
    + "<p>Wait, did he have a camera crew nearby?</p>"
    + "<hr/>"
    + "<p><b>Anomymous2</b></p>"
    + "<p>3 hours ago</p>"
    + "<p>Yeah, they wouldn't dress like that if they were in finance. I'm useless here.</p>"
    + "<hr/>"
    + "<p><b>Anomymous1</b></p>"
    + "<p>4 hours ago</p>"
    + "<p>Oh, also he's's wearing a charcoal suit with some purple and yellow tie.</p>"
    + "<hr/>"
    + "<p><b>Anomymous3</b></p>"
    + "<p>4 hours ago</p>"
    + "<p>Yeah, police scanner never actually tells us much, just where.</p>"
    + "<hr/>"
    + "<p><b>Anomymous2</b></p>"
    + "<p>4 hours ago</p>"
    + "<p>Still not sure. Police scanner isn't saying a name either.</p>"
    + "<hr/>"
    + "<p><b>Anomymous1</b></p>"
    + "<p>4 hours ago</p>"
    + "<p>Olive skin, wavy hair, red streak</p>"
    + "<hr/>"
    + "<p><b>Anomymous2</b></p>"
    + "<p>5 hours ago</p>"
    + "<p>I work in the finance space, can I get a better description?</p>"
    + "<hr/>"
    + "<p><b>Anomymous1</b></p>"
    + "<p>5 hours ago</p>"
    + "<p>Seems like somebody's getting arrested near Chraston park. He looks really professional, maybe some kind of investment banker?</p>"
    + "</div>",
}

// homepage
// about page
// police reports:
// car crash
// fire 
// drug bust
// corruption scandal with Evelyn Haskell


// 
// Died in a fire
// 

let currPolicePage = 'home'
let policebody = null;
function initPoliceSite() {
    policebody = document.createElement('div')
    const webpage = document.getElementById("webpage");
    const topSection = document.createElement('div')
    topSection.innerHTML = "<h1>Skokie Scanner</h1><p>Skokie's watchdog forum.</p>"
    const links = document.createElement('div')
    links.className = "links"

    const rule1 = document.createElement('hr')
    topSection.appendChild(rule1)

    webpage.appendChild(topSection)
    webpage.appendChild(policebody)
    updatePolicePage()
}

function updatePolicePage() {
    policebody.innerHTML = "";
    policebody.innerHTML = policePages[currPolicePage]
    policebody.className = "article"

    let toSearch = []
    for (let i = 0; i < policebody.children.length; i++) {
        toSearch.push(policebody.children[i])
    }

    while (toSearch.length > 0) {
        let currItem = toSearch.pop()
        for (let i = 0; i < currItem.children.length; i++) {
            toSearch.push(currItem.children[i])
        }
        if (currItem.getAttribute('page') !== null) {
            const page = currItem.getAttribute('page')
            currItem.onclick = function () {
                currPolicePage = page;
                updatePolicePage();
            }
        }
    }
}