const townPages = {
    home: "<h2>Home</h2>"
        + "<p>Welcome to the official Village of Skokie website! We have some helpful links below for any town-related business you need.</p>"
        + "<p>Featured: <a page=\"heritage\">Skokie's Heritage</a>.</p>"
        + "<p>Things to <a page=\"explore\">Explore in Skokie</a>.</p>"
        + "<p>View our <a page=\"library\">library hours</a>.</p>"
        + "<p>Pay <a page=\"parking\">parking ticket(s)</a>.</p>",
    parking: "<h2>Parking Tickets</h2>"
        + "<p> You have <b>3</b> parking tickets</p>"
        + "<table>"
        + "<tr><th>Date</th><th>Cause</th><th>Ticket</th></tr>"
        + "<tr><td>(12/22/2022)</td> <td>Parking in a designated parade area</td> <td><b>(PAID)</b></td> </tr>"
        + "<tr><td>(4/27/2023)</td> <td>Parking during street cleaning</td> <td><a page=\"ticket1\">DUE ASAP</a></td> </tr>"
        + "<tr><td>(5/22/2023)</td> <td>Overtime parking</td> <td><a page=\"ticket2\">DUE 6/22/2023</a></td> </tr>"
        + "</table>",
    ticket1: "<h3>Ticket T23834</h3>"
        + "<p><b>License plate</b>: 123 ABC</p>"
        + "<p><b>Car</b>: 2013 NISSAN ALTIMA</p>"
        + "<p><b>Description</b>: GRAY, DENT IN FRONT PASSENGER SIDE DOOR.</p>"
        + "<p><b>Owner</b>: FRED K. OLSEN</p>",
    ticket2: "<h3>Ticket T23956</h3>"
        + "<p><b>License plate</b>: 284 WJD</p>"
        + "<p><b>Car</b>: 2013 NISSAN ALTIMA</p>"
        + "<p><b>Description</b>: GRAY, DAMAGE ON FRONT RIGHT DOOR.</p>"
        + "<p><b>Owner</b>: FRED K. OLSEN</p>",
    library: "<h2>Library Hours</h2>"
        + "<p>ATTENTION! The library will be closed for Monday, June 19, in honor of Juneteenth. </p>"
        + "<p><b>Regular hours:</b></p>"
        + "<p>Mon-Thurs: <b>9AM - 7PM</b></p>"
        + "<p>Fri: <b>9AM - 10pm</b></p>"
        + "<p>Sat: <b>11AM - 5PM</b></p>"
        + "<p>Sun: <b>Closed</b></p>",
    explore: "<h2>Explore Skokie</h2>"
        + "<p>Welcome to Skokie! We have a vibrant arts scene, a myriad of historic sites and things to see!</p>"
        + "<h3>Local Arts</h3>"
        + "<p>Skokie is deeply intertwined with Chicago's art scene, with a monthly Jazz performer in our downtown Carnegie Park. The Skokie Performance Theater Company puts on productions of popular plays,"
        + " and we have a thriving indie rock scene.</p>"
        + "<h3>Events</h3>"
        + "<p>Skokie has a farmers market every week, with tons of local produce. Every year, we have parades and festivals to celebrate the diverse cultures of Skokie!"
    ,
    heritage: "<h2>Skokie Heritage</h2>"
    + "<p>Skokie was first incorporated in 1888, around 50 years after Chicago's incorporation. Originally, Skokie was founded as a German-Luxembourger farming community, supporting Chicago's food supply. Skokie was a major hub of Jewish immigation just before, during, and after World War II.</p>"
    + "<p>Since then, Skokie has been a bulwark against antisemitism. When the American Nazi Party wanted to host a rally in Skokie, the town prevented them from accessing the space, and fought all the way to the Supreme Court for Skokieans' right to feel safe in their own communities.</p>"
}
let currTownPage = 'home'
let townbody = null;
let townlinks = null;
function initTownSite() {
    townbody = document.createElement('div')
    townbody.className = "article"
    const webpage = document.getElementById("webpage");
    const topSection = document.createElement('div')
    topSection.innerHTML = "<h1>Village of Skokie</h1>"
    townlinks = document.createElement('p')
    const link1 = document.createElement('a')
    link1.onclick = function () {
        currTownPage = 'home';
        updateTownSite()
    }
    link1.innerText = "Return Home"
    townlinks.appendChild(link1)

    topSection.appendChild(townlinks)
    const rule1 = document.createElement('hr')
    topSection.appendChild(rule1)

    webpage.appendChild(topSection)
    webpage.appendChild(townbody)
    updateTownSite()
}

function updateTownSite() {
    townbody.innerHTML = townPages[currTownPage]

    townlinks.hidden = (currTownPage === 'home')


    let toSearch = []
    for (let i = 0; i < townbody.children.length; i++) {
        toSearch.push(townbody.children[i])
    }

    while (toSearch.length > 0) {
        let currItem = toSearch.pop()
        for (let i = 0; i < currItem.children.length; i++) {
            toSearch.push(currItem.children[i])
        }
        if (currItem.getAttribute('page') !== null) {
            const page = currItem.getAttribute('page')
            currItem.onclick = function () {
                currTownPage = page;
                updateTownSite();
            }
        }
    }
}