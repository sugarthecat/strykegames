const olsenPages = {
    home: "<p>I won't tell you how to get around here. It's my corner of the internet,"
        + " and you're just a guest. I won't make "
        + " links obvious to you, and sometimes I won't have the thing happen where hovering over it makes it obvious. "
        + "It's easy to get lost here. </p>"
        + "<p>When I want it to be:</p>"
        + "<ul><li>Obvious, links look like this: <a page=\"link\" class=\"obvious\">(link)</a></li>"
        + "<li>Subtle, links look like this: <a page=\"secret_link\" class=\"subtle\">(link)</a></li></ul>"
        + "<p> You'll see way more subtle links. They don't follow any rule or pattern.</p>",

    lost: "<h2>Lost</h2><p><i>A Signpost.</i></p><p>Looks like you're lost. I'm sorry you ended up here. If you're really struggling, "
        + "I can help you get back to the start."
        + " <a class=\"obvious\" page=\"home\">Here's a link back to the start.</a>"
        + " Just because you got here doesn't mean you were at a dead end.</p>",

    my_corner: "<h2>My Corner</h2><p>This is a corner of the internet, where I don't follow any rules. " +
        "<br/>Structures melt and sink into the sand. I won't always give you a way back to where you were." +
        "<br/>You'll find poetry, and you'll find art, and you'll find my love for this world. </p>",
    dead: "<h2>Dead</h2><p>I've lost my chance to tell the world. Locked in a shed, surrounded by death, framed by a friend I thought I could trust. "
        + "I don't really have time to rhyme, I can feel the heat getting closer, and I think the smoke's getting to my head. I didn't want "
        + "to publish this site for a while, it's just not done. But I'm going to turn it on from my laptop in this shed that's going to collapse soon.</p>",
    died: "<h2>Died</h2><p><i>An Attempt at Writing like Chuck Palahniuk</i></p><p>Something interesting happens when you die. It's like when everything you've built becomes some limited, collector's edition item that a fifty-year-old man keeps in his basement. "
        + "Everything you've done becomes more valuable, now that you're a rare commodity, because, you know, you're dead. Now, everybody loves you, and was super involved in your life.</p>",
    guest: "<h2>Guest</h2><p><i>An Introduction.</i></p><p>Welcome, my guest, my humble interested visitor, my explorer of corners of the internet. Maybe you're somebody I know. Maybe you're somebody I don't. Maybe you're me. Maybe you're my ghost, trying to remember how you died. "
        + "In any case, I hope you feel welcome. This place rules, and I'd absolutely hate if you didn't enjoy your time here.",
    rules: "<h2>Rules</h2><p><i>A Governing Document.</i></p><p>Welcome to my corner of the internet. I lied. We have very strict rules.</p>"
        + "<ol><li>Secret links will have strict rules applied to them. For every two secret links, if their text is the same, their destination is the same.</li>"
        + "<li>There's always a way back home.</li></ol>",
    way_back: "<h2>A Way Back</h2>"
        + "<p><i>A dialogue with the man who tried to kill me.</i></p>"
        + "<p>There's always a way back, that's what I hear. Let me share a conversation that makes me doubt that truth.</p>"
        + "<p>Two friends step into a car.</p>"
        + "<p><b>Disco:</b> It's great to see you again! I'm glad to be back home for the summer.<br/>"
        + "<b>Other:</b> Yeah, dude! Great to see you.<br/>"
        + "<b>Disco:</b> So how's your job been? That's a nice gig.<br/>"
        + "<b>Other:</b> I just feel like so much time has been lost. It's a dead end, unless my boss kicks the bucket.<br/>"
        + "<b>Disco:</b> That really sucks. Maybe you should look for greener pastures. Maybe some fancy big-time company in the same industry?<br/>"
        + "<b>Other:</b> I mean, I don't really need that. I have everything ready.<br/>"
        + "<b>Disco:</b> Everything ready for what? How?<br/>"
        + "<b>Other:</b> I planted what looks like a bribe my boss would be taking. Not only do I get his job, I get a hell of a story to tell.<br/>"
        + "<b>Disco:</b> That's like, super illegal. He didn't do anything wrong.<br/>"
        + "<b>Other:</b> I mean, you can keep this a secret?<br/>"
        + "<b>Disco:</b> Dude, no. I'm going to tell someone.<br/>"
        + "<p>Then, Other grabs Disco's steering wheel, and pulls it to the right, bringing the car smashing into a building. The car goes up in smoke, and Disco runs away, with Other following close behind.</p>",
    secret_link: "<h2>Secret Link</h2><p><i>A Riddle Poem</i></p><p>Link, link, on the site;<br/>Who was the face on TV, live?</p>"
        + "<p>Link, link, on the page;<br/>Who's the reporter who once got framed?</p>"
        + "<p>Link, link, that has died;<br/>Who would target one so wise?</p>"
        + "<p>Link, link, in the browser;<br/>Who would benefit from a world without her?</p>",
    link: "<h2>Link</h2><p><i>A metaphor about links</i></p><p>Links are tunnels through time and space. I find it so easy to get lost.</p>",
    life: "<h2>Life</h2><p><p><i>A Twenty-Year-Old's Attempt at Life Advice</i></p>Life is horribly temporary. There's some shame in the fact that it doesn't last forever.<br/> "
        + "You get the privilege of experiencing rainbows and dandelions and as many books as you have time for.<br/>"
        + "You're given a little sliver of all that's great, and a couple friends to keep you company.<br/>"
        + "There's a couple decades, and it forces you to pick your favorites. It's a couple decades to find the best stuff out there.<br/>"
        + "So, go out, and find some cool stuff. Don't get lost in the repetitive or boring parts. </p>",
    love: "<h2>Love</h2><p><i>An Ode to my boyfriend.</i></p><p>He's like if Orpheus never picked up the lyre, and found his way to a chisel. <br/> Each freckle on his face is placed just perfectly, like a reflection of the stars above,"
        + "<br/>with garnet brown eyes I can see my soul's reflection in.<br/> It's like we're in a dance of artists, each making the other the muse, <br/> and each trying to be the artist. <br/> Like two statues sculpting each other, we bring each other to life.</p>",
    friends: "<h2>Friends</h2><p><i>A list of people.</i></p><p>Everybody calls everybody their friend, and I think I should make my list short and meaningful. No, just because we're friends on Skokal doesn't mean we're friends here. So here, all my friends (if they're on Skokal) are listed—either by their Skokal username. Just because you aren't on here doesn't mean I don't like you. You know, you're cool, maybe we're just not close. </p>"
        + "<ul>"
        + "<li>australia_isnt_real</li>"
        + "<li>crunchy_kiwifruit</li>"
        + "<li>cronk</li>"
        + "<li>italiansadnwich</li>"
        + "<li>circuitbiter</li>"
        + "<li>treelover</li>"
        + "</ul>",
    feel: "<h2>Feel</h2><p><i>A Monologue about running for your life.</i></p><p>As I ran from the wrecked car, I feel so many things. Betrayed. I feel lost. I feel like I just need to survive today to tell my friends."
        + " It's surreal to have everything switch up so fast. I had to think quickly, so I snuck into that old shed in the cemetery whose key I had stolen. He won't find me in here, "
        + " and I can just wait this out. I'm such an idiot for helping him to write that. It's cold and damp in here, and I feel like I'm losing heat, but it's just until he's lost me.</p>",
    story: "<h2>Story</h2><p><i>A Quote from a guy who's about to kill me.</i></p><p>He said, when he figured out I was inside the shed:<br/>"
        + "\"It's what we all are. Tragic stories that might make national news, just waiting to happen. It's all for attention, isn't it? "
        + " It's a deal we negotiate. You're dead, and the most famous person around. I helped it happen, so I get to be just a little famous too. "
        + " I'm not greedy. I was ok with the smaller story, the one with the bribery scandal. I hate covering my tracks like this, but a writer going "
        + " insane is a story that I just have to tell. You didn't really give me a choice.\""
        + " </p>", // shed, dead
    just: "<h2>Just</h2><p><i>A Haiku about my friends's lack of morality.</i></p>"
        + "<p>A boy's dead end job,<br/>"
        + "An expert is framed by him,<br/>"
        + "The boy takes his place.</p>",

    heat: "<h2>Heat</h2><p><i>A Limerick about realizing your fate.</i></p>"
        + "<p>There once was shed I was locked in,<br/>"
        + "to escape a madman I'd begotten.<br/>"
        + "But he found me tonight,<br/>"
        + "set this place alight.<br/>"
        + "Now this small shed is my coffin</p>",
    shed: "<h2>Shed</h2><p><i>Ginnsberg sentences about my hiding space</i></p>"
        + "<p>Hiding from a man I once considered a friend.</p>"
        + "<p>My life now upside down in a cemetery.</p>"
        + "<p>Feeling my life fade like these rotten wooden walls.</p>"
        + "<p>Writing poetry on my laptop, killing time.</p>",
    cemetery: "<h2>Cemetery</h2><p><i>A Villainelle about Hingham Cemetery</i></p>"
        + "<p>At the cemetery on a hill,<br/>"
        + "You wouldn't go there if you had a choice<br/>"
        + "But you it isn't your will.</p>"

        + "<p>You'll be frozen still,<br/>"
        + "you'll lose your poise,<br/>"
        + "at the cemetery on a hill. </p>"

        + "<p>Covered with an omen chill,<br/>"
        + "the dewdrops still moist,<br/>"
        + "but you it isn't your will </p>"

        + "<p>Near the derelict mill,<br/>"
        + "a gaggle of unknowing boys,<br/>"
        + "at the cemetery on a hill.</p>"

        + "<p>The smell of fresh kill,<br/>"
        + "you shouldn't make a noise,<br/>"
        + "But you it isn't your will. </p>"

        + "<p>The taste of a pill,<br/>"
        + "and a legal contract deploys.<br/>"
        + "A guest who rests on the hill,<br/>"
        + "always will. </p>"

}
const olsenLinks = {
    lost: 'lost',
    my_corner: 'my corner',
    rules: 'rules',
    way_back: 'a way back',
    dead: 'dead',
    died: 'died',
    guest: 'guest',
    friends: 'friends',
    love: 'love',
    life: 'life',
    feel: 'feel',
    just: 'just',
    story: 'story',
    heat: 'heat',
    shed: 'shed',
    cemetery: 'cemetery'

}
let currOlsenPage = 'home'
let olsenbody = null;
function initOlsen() {
    olsenbody = document.createElement('div')
    olsenbody.className = "article"
    const webpage = document.getElementById("webpage");
    const topSection = document.createElement('div')
    topSection.innerHTML = "<h1>The Olsenternet</h1>"

    const rule1 = document.createElement('hr')
    topSection.appendChild(rule1)

    webpage.appendChild(topSection)
    webpage.appendChild(olsenbody)
    updateOlsen()
}

function updateOlsen() {
    let text = olsenPages[currOlsenPage]
    for (const page in olsenLinks) {
        let endparts = ['.', ',', '?', ';', ':', '!']
        text = text.replaceAll(`.${olsenLinks[page]} `, `.<a page=\"${page}\" class=\"subtle\">${olsenLinks[page]}</a> `)
        text = text.replaceAll(` ${olsenLinks[page]} `, ` <a page=\"${page}\" class=\"subtle\">${olsenLinks[page]}</a> `)
        for (let i = 0; i < endparts.length; i++) {
            const endpart = endparts[i]
            text = text.replaceAll(` ${olsenLinks[page]}${endpart}`, ` <a page=\"${page}\" class=\"subtle\">${olsenLinks[page]}</a>${endpart}`)
        }
    }
    olsenbody.innerHTML = text
    let toSearch = []
    for (let i = 0; i < olsenbody.children.length; i++) {
        toSearch.push(olsenbody.children[i])
    }

    while (toSearch.length > 0) {
        let currItem = toSearch.pop()
        for (let i = 0; i < currItem.children.length; i++) {
            toSearch.push(currItem.children[i])
        }
        if (currItem.getAttribute('page') !== null) {
            const page = currItem.getAttribute('page')
            currItem.onclick = function () {
                currOlsenPage = page;
                updateOlsen();
            }
        }
    }
}