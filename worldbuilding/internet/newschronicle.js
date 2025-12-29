const newsPages = {
    home: {
        articles: [
            {
                title: "Evanston Mayoral Elections",
                description: "As the votes come in for Evanston's mayoral election, no clear winner has emerged yet.",
                id: "elections"
            },
            {
                title: "Live Weather Updates",
                description: "Temperatures continue to drop from this weekend's high, staying between the mid 50s and high 60s today.",
                id: "weather"
            },
            {
                title: "A New Venture in Glenview?",
                description: "Is Glenview the new site for Chicago's finance and tech scene?",
                id: "venture"
            },
            {
                title: "New Library Opens Its Doors",
                description: "The Park Ridge library has been closed for over 5 years, and the new library is set to open its doors",
                id: "library"
            }
        ]
    },
    weather: {
        body: "<h2>Live Weather Updates</h2>"
            + "<p>Last updated June 6th, 2006 at 4:07 PM</p>"
            + "<p>Precipitation is very unlikely, and it looks like we're headed into a dry summer."
            + " We have some clouds overhead, but it looks like this shade won't go on much longer.</p>"
            + "<p>Cities & neighborhoods are sorted from closest to furthest to your location. </p>"
            + "<table><tr><th>City</th> <th>High (F)</th><th>Low (F)</th><th>Precipitation Chance</th></tr>"
            + "<tr> <td>Skokie</td> <td>68</td> <td>54</td> <td>0%</td></tr>"
            + "<tr> <td>Morton Grove</td> <td>72</td> <td>57</td> <td>0%</td></tr>"
            + "<tr> <td>Niles</td> <td>71</td> <td>57</td> <td>0%</td></tr>"
            + "<tr> <td>Evanston</td> <td>70</td> <td>50</td> <td>2%</td></tr>"
            + "<tr> <td>Wilmette</td> <td>71</td> <td>55</td> <td>2%</td></tr>"
            + "<tr> <td>Chicago</td> <td>71</td> <td>54</td> <td>7%</td></tr>"
            + "<tr> <td>Kenilworth</td> <td>67</td> <td>56</td> <td>5%</td></tr>"
            + "<tr> <td>Glenview</td> <td>72</td> <td>53</td> <td>0%</td></tr>"
            + "</table>"

    },
    sevensides: {
        body: "<h2>Seven Sides of Skokie</h2>"
            + "<p><i>By <a page=\"fred_olsen\">Fred Olsen</a></i></p>"
            + "<p>Side one is some single family suburban slump.<br/>"
            + "Side two is indie bands, beers, baroque, and backstreet bashes.<br/>"
            + "Side three is a depreciating derelict dump.<br/>"
            + "Side four is fighting for freedom of faith.<br/>"
            + "Side five is ignorance, even if it is impractical.<br/>"
            + "Side six is a collection of commoners completing and co-operating to change course. <br/><br/>"
            + "Side seven is indefensibly humble hope that their home happens to teach your youth beachside beauty,"
            +" long-term love,<br/>"
            +" such so our one wonderful world mission might,<br/> on one decisive day,<br/> hopefully happen.</p>"

    },
    venture: {
        body: "<h2>A New Venture in Glenview?</h2>"
            + "<p>June 4th, 2006</p>"
            + "<p><i>By <a page=\"parker\">Parker Baker</a></i></p>"
            + "<p>Is Glenview the next spot for Chicago's finance and tech scene? It may seem unlikely, but just today, Jackson Boulevard, "
            + "a technology investment firm, announced its plans to establish a new headquarters in Glenview. This seems like it'll bring in "
            + "new investment into Glenview, as Jackson Boulevard has committed to sponsoring new train stations both near their office and "
            + "near local cultural spots. It's a hotly debated contest in the village, and people are sharply divided.</p>"
            + "<h3>Local Concerns</h3>"
            + "<p>Many locals are worried that these out-of-towners might disturb the local culture, or as many more are concerned, "
            + "that the influx of high-income earners might significantly disrupt the local economy, and push rent, grocery, and entertainment "
            + "prices much higher. </p>"
            + "<h3>Local Support</h3>"
            + "<p>One local, Cherry, a programmer who goes by \"circuit biter\" online, said that they were excited for this opportunity. According to Cherry, "
            + "\"It's not super common to have companies this close, and when they move their headquarters a bit closer, we always feel represented.\" <br/>"
            + " \"Plus, if I started a business, it would make it easier to get investment super close to here, and I wouldn't have to move to San Francisco or New York.\" Cherry added.</p>"
            + "<h3>In The End...</h3>"
            + "<p>As many locals are divided, one thing is sure: the fact that Jackson Boulevard finds Glenview to be an attractive place "
            + " signals a bright future for the village, no matter how this proposal ends.</p>"
    },
    library: {
        body: "<h2>New Library Opens Its Doors</h2>"
            + "<p>June 3rd, 2006</p>"
            + "<p><i>By <a page=\"james_carver\">James Carver</a></i></p>"
            + "<h3>Park Ridge's library woes</h3>"
            + "<p>Park Ridge has had library issues for a long time. 27 years after Park Ridge's Perry Library was built in 1972, Park Ridge was forced to close down the library"
            + " due to a rat infestation and water leakage. After a series of budget cuts to public services, the Perry library has only been open for 1547 days between the years of 1986-2004.</p>"
            + "<h3>The New Library</h3>"
            + "<p>Park Ridge's new library, the Andrew Jericho Community Library, is officially set to open within a week. This new library has a broad range of features that the Perry library lacked:"
            + " A myriad of community rooms for kids and elders, a media and game development studio, and a new city ordinance reference section for residents to help themselves comply with local regulations."
            + " Though this new library has drawn criticism for being too high-tech, a large crowd is forecasted to show up at the opening ceremony. It's still to be shown if people will like this new "
            + " tech-heavy facility, the community is ready to give it a chance.</p>"
    },
    james_carver: {
        body: "<h2>James Carver</h2>"
            + "<p>James Carver has been reporting for the North Chicago Chronicle for the past 2 years, since he graduated high school."
            + " James graduated from Niles North High School in Skokie, where he ran the local newspaper club. He's the newest hire in our economy division.</p>"
    },
    fred_olsen: {
        body: "<h2>Fred Olsen</h2>"
            + "<p>Fred Olsen is a University of Illinois - Naperville Student. He's currently a prolific writer at university, and the student "
            + "aide to the UIN written arts programme coordinator. </p>"
            + "<br/><br/> <p><i>Fred Olsen is not affiliated or directly employed with the North Chicago Chronicle.</i></p>"
    },
    parker: {
        body: "<h2>Parker Baker</h2>"
            + "<p>Parker Baker is the head of our economy division. Parker is a doctorate-level researcher in journalism ethics at the University of Illinois - Naperville"
            + ", and played a crucial role in the 1997 takedown and fraud investigation of Granson Corp. Parker Baker is suspended at the Chronicle pending a bribery investigation.</p>"
    },
    haskell: {
        body: "<h2>Evelyn Haskell</h2>"
            + "<p>Evelyn Haskell has been a veteran reporter in the Chronicle's political division, leading the division. She's had a variety of "
            + " major interviews, including hosting upwards of 15 mayoral debates in the region, and moderating the second 2003 Chicago mayoral debate.</p>"
    },
    elections: {
        body: "<h2>Evanston Mayoral Elections</h2>"
            + "<p>June 6th, 2006</p>"
            + "<p><i>By <a page=\"haskell\">Evelyn Haskell</a></i></p>"
            + "<p>The election date is today for Evanston's special mayoral election, and it's looking to be a tight race. Glen Porter seems to be polling at around +8 favorability"
            + ", but his opponent, Leigh Verne, is close behind him. Leigh Verne is polling higher, with her numbers looking +12 points favorable. On the other hand, exit polls seem to slightly favor Porter."
            + " Of course, some other candidates remain, but the race seems all but settled on one of these two tonight.</p>"
            + "<table><tr><th>Candidate</th> <th>Approves</th><th>Neutral</th><th>Disapproves</th><th>Net Approval</th></tr>"
            + "<tr> <td>G. Porter</td> <td>51</td> <td>4</td> <td>45</td> <td>+8</td></tr>"
            + "<tr> <td>L. Verne</td> <td>40</td> <td>32</td> <td>28</td> <td>+12</td></tr>"
            + "<tr> <td>A. Reagan</td> <td>37</td> <td>29</td> <td>34</td> <td>+3</td></tr>"
            + "<tr> <td>J. Juggard</td> <td>18</td> <td>33</td> <td>49</td> <td>-31</td></tr> </table>"
    }
}
let currNewsPage = 'home'
let newsbody = null;
function initNewsSite() {
    newsbody = document.createElement('div')
    const webpage = document.getElementById("webpage");
    const topSection = document.createElement('div')
    topSection.innerHTML = "<h1>The North Chicago Chronicle</h1>"
    topSection.innerHTML += "<a>Uncovering the truth.</a>"
    topSection.children[1].onclick = function () {
        currNewsPage = 'home'
        updateNewsSite();
    }
    const links = document.createElement('div')
    links.className = "links"

    const rule1 = document.createElement('hr')
    topSection.appendChild(rule1)

    webpage.appendChild(topSection)
    webpage.appendChild(newsbody)
    updateNewsSite()
}

function updateNewsSite() {
    if (newsPages[currNewsPage].body) {
        newsbody.innerHTML = newsPages[currNewsPage].body
        newsbody.className = "article"
    } else if (newsPages[currNewsPage].articles) {
        newsbody.innerHTML = "";
        newsbody.className = "browsing"
        const articles = newsPages[currNewsPage].articles
        for (let i = 0; i < articles.length; i++) {
            const article = articles[i]
            if (i > 0) {
                const rule = document.createElement('hr')
                rule.className = "short"
                newsbody.appendChild(rule)
            }
            const articlestub = document.createElement('div');
            articlestub.className = "articlestub"
            const title = document.createElement('h3');
            const description = document.createElement('p');
            if (articles[i].description.length > 60) {
                description.innerText = article.description.substring(0, 60) + "..."
            } else {
                description.innerText = article.description
            }
            title.innerText = article.title;
            articlestub.appendChild(title)
            articlestub.appendChild(description)
            articlestub.onclick = function () {
                currNewsPage = article.id;
                updateNewsSite()
            }
            newsbody.appendChild(articlestub)
        }
    }

    let toSearch = []
    for (let i = 0; i < newsbody.children.length; i++) {
        toSearch.push(newsbody.children[i])
    }

    while (toSearch.length > 0) {
        let currItem = toSearch.pop()
        for (let i = 0; i < currItem.children.length; i++) {
            toSearch.push(currItem.children[i])
        }
        if (currItem.getAttribute('page') !== null) {
            const page = currItem.getAttribute('page')
            currItem.onclick = function () {
                currNewsPage = page;
                updateNewsSite();
            }
        }
    }
}