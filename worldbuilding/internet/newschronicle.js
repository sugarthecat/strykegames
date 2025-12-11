const newsPages = {
    home: {
        articles: [
            {
                title: "Live Weather Updates",
                description: "Temperatures continue to drop from this weekend's high, staying between the mid 50s and high 60s today.",
                id: "weather"
            },
            {
                title: "Evanston Mayoral Elections",
                description: "As the votes come in for Evanston's mayoral election, no clear winner has emerged yet.",
                id: "elections"
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
            + "<p>Last updated June 6th, 2023 at 4:07 PM</p>"
            + "<p>Precipitation is very unlikely, and it looks like we're headed into a dry summer.</p>"
            + "<p>Cities & Neighborhoods are sorted from closest to furthest to your location. </p>"
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
    library: {
        body: "<h2>New Library Opens Its Doors</h2>"
            + "<p>June 3rd, 2023</p>"
            + "<p><i>By <a page=\"james_carver\">James Carver</a></i></p>"
            + "<h3>Park Ridge's library woes</h3>"
            + "<p>Park Ridge has had library issues for a long time. 27 years after Park Ridge's Perry Library was built in 1972, Park Ridge was forced to close down the library"
            + "due to a rat infestation and water leakage. After a series of budget cuts to pubilc services, the Perry library has only been open for 1547 days between the years of 1999-2015.</p>"
            + "<h3>The New Library</h3>"
            + "<p>Park Ridge's new library, the Andrew Jericho Community Library, is officially set to open within a week. This new library has a broad range of features that the Perry library lacked:"
            + " A myriad of community rooms for kids and elders, a media and game development studio, and a new city ordinance reference section for residents to help themselves comply with local regulations."
            + " Though this new library has drawn criticism for being too-high tech, a large crowd is forecasted to show up at the opening ceremony. It's still to be shown if people will like this new "
            + "tech-heavy facility, the community is ready to give it a chance.</p>"
    },
    james_carver: {
        body: "<h2>Jamie Carver</h2>"
            + "<p>Jamie Carver has been reporting for the North Chicago Chronicle for the past 2 years, since he graduated high school."
            + " James graduated from Niles North High School in Skokie, where he ran the local newspaper club. He's the newest hire in our local economic news department.</p>"
    },
    haskell: {
        body: "<h2>Evelyn Haskell</h2>"
            + "<p>Evelyn Haskell has been a veteran reporter in the Chronicle's political division, leading the division. She's had a variety of "
            + "major interviews, including hosting upwards of 15 mayoral debates in the region, and moderating the second 2015 Chicago mayoral debate.</p>"
    },
    elections: {
        body: "<h2>Evanston Mayoral Elections</h2>"
            + "<p>June 6th, 2023</p>"
            + "<p><i>By <a page=\"haskell\">Evelyn Haskell</a></i></p>"
            + "<p>The election date is today for Evanston's special mayoral election, and it's looking to be a tight race. Glen Porter seems to be polling at around +8 favorability"
            + ", but his opponent, Leigh Verne, is close being him. Leigh verne is polling higher, with her numbers looking +12 points favorable. On the other hand, exit polls seem to slightly favor Porter."
            + "Of course, some other candidates remain, but the race seems all but settled on one of these two tonight.</p>"
            + "<table><tr><th>Candidate</th> <th>Approves</th><th>Neutral</th><th>Disapproves</th><th>Net Approval</th></tr>"
            + "<tr> <td>G. Porter</td> <td>51</td> <td>4</td> <td>45</td> <td>+8</td></tr>"
            + "<tr> <td>L. Verne</td> <td>40</td> <td>32</td> <td>28</td> <td>+12</td></tr>"
            + "<tr> <td>A. Reagan</td> <td>43</td> <td>17</td> <td>40</td> <td>+3</td></tr>"
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