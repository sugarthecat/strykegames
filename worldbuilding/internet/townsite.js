const townPages = {
    home: "<h2>Home</h2>"
        + "<p>Welcome to the official Village of Skokie website! We have some helpful links below for any town-related business you need.</p>"
        + "<p>Featured: <a page=\"heritage\">Skokie's Heritage</a>.</p>"
        + "<p>Things to <a page=\"explore\">Explore in Skokie</a>.</p>"
        + "<p>View our <a page=\"library\">library hours</a>.</p>"
        + "<p>View <a page=\"parking\">parking ticket(s)</a>.</p>",
    your_parking: "<h2>Your Parking Tickets</h2>"
        + "<p> You have <b>2</b> parking tickets.</p>"
        + "<p> <a page=\"parking\">Return</a>.</p>"
        + "<table>"
        + "<tr><th>Status</th><th>Ticket ID</th></tr>"
        + "<tr><td>DUE ASAP</td>  <td>T23834</td> </tr>"
        + "<tr><td>DUE 6/12/2006</td><td>T23956</td> </tr>"
        + "</table>",
    parking: "<h2>Parking Tickets</h2>"
        + "<p> View <a page=\"your_parking\">Your Parket Tickets</a>.</p>"
        + "<table>"
        + "<tr><th>Date</th><th>Cause</th><th>Ticket ID</th></tr>"
        + "<tr><td>(4/22/2006)</td> <td>Overtime parking</td> <td><a page=\"T23821\">T23821</a></td> </tr>"
        + "<tr><td>(4/23/2006)</td> <td>Speeding in a school zone</td> <td><a page=\"T23833\">T23833</a></td> </tr>"
        + "<tr><td>(4/27/2006)</td> <td>Parking during street cleaning</td> <td><a page=\"T23834\">T23834</a></td> </tr>"
        + "<tr><td>(4/29/2006)</td> <td>Parking in front of a fire hydrant</td> <td><a page=\"T23843\">T23843</a></td> </tr>"
        + "<tr><td>(5/02/2006)</td> <td>Impeding traffic</td> <td><a page=\"T23875\">T23875</a></td> </tr>"
        + "<tr><td>(5/05/2006)</td> <td>Speeding in a school zone</td> <td><a page=\"T23917\">T23917</a></td> </tr>"
        + "<tr><td>(5/14/2006)</td> <td>Overtime parking</td> <td><a page=\"T23933\">T23933</a></td> </tr>"
        + "<tr><td>(5/22/2006)</td> <td>Overtime parking</td> <td><a page=\"T23956\">T23956</a></td> </tr>"
        + "<tr><td>(5/24/2006)</td> <td>Speeding</td> <td><a page=\"T23965\">T23965</a></td> </tr>"
        + "</table>",
    T23821: "<p><a page=\"parking\">Return</a></p><h3>Ticket T23821</h3>"
        + "<p><b>License plate</b>: 205 AWS</p>"
        + "<p><b>Car</b>: 2003 SHEENAN ALL-TIMER, SEDAN</p>"
        + "<p><b>Description</b>: YELLOW, NO DAMAGE.</p>"
        + "<p><b>Owner</b>: CHERRY S. DALE</p>",
    T23833: "<p><a page=\"parking\">Return</a></p><h3>Ticket T23833</h3>"
        + "<p><b>License plate</b>: 940 SWB</p>"
        + "<p><b>Car</b>: 2003 ACM PARKWAY, SUV</p>"
        + "<p><b>Description</b>: WHITE, NO DAMAGE.</p>"
        + "<p><b>Owner</b>: SAVANNAH O. DIRK</p>",
    T23834: "<p><a page=\"parking\">Return</a></p><h3>Ticket T23834</h3>"
        + "<p><b>License plate</b>: 284 WJD</p>"
        + "<p><b>Car</b>: 1996 SHEENAN ALL-TIMER, SEDAN</p>"
        + "<p><b>Description</b>: GRAY, DENT IN FRONT PASSENGER SIDE DOOR.</p>"
        + "<p><b>Owner</b>: FRED K. OLSEN</p>",
    T23843: "<p><a page=\"parking\">Return</a></p><h3>Ticket T23843</h3>"
        + "<p><b>License plate</b>: 305 MWW</p>"
        + "<p><b>Car</b>: 2006 GRAZI, LUXURY</p>"
        + "<p><b>Description</b>: PINK, NO DAMAGE.</p>"
        + "<p><b>Owner</b>: PETER T. BULLHORN</p>",
    T23875: "<p><a page=\"parking\">Return</a></p><h3>Ticket T23875</h3>"
        + "<p><b>License plate</b>: 829 OAD</p>"
        + "<p><b>Car</b>: 1977 SHEENAN CLASSIC, TRUCK</p>"
        + "<p><b>Description</b>: BEIGE, PAINT PEELING, MISSING RIGHT SIDE PASSENGER DOOR, OPEN TRUCK BED.</p>"
        + "<p><b>Owner</b>: BUCKLEY I. GERHARDT</p>",
    T23917: "<p><a page=\"parking\">Return</a></p><h3>Ticket T23917</h3>"
        + "<p><b>License plate</b>: 940 SWB</p>"
        + "<p><b>Car</b>: 2003 ACM PARKWAY, SUV</p>"
        + "<p><b>Description</b>: WHITE, NO DAMAGE.</p>"
        + "<p><b>Owner</b>: SAVANNAH O. DIRK</p>",
    T23933: "<p><a page=\"parking\">Return</a></p><h3>Ticket T23933</h3>"
        + "<p><b>License plate</b>: 734 EHS</p>"
        + "<p><b>Car</b>: 1987 ACM MONTERREY, PICKUP</p>"
        + "<p><b>Description</b>: RED-BROWN, PAINT PEELING.</p>"
        + "<p><b>Owner</b>: ALBERT M. HIGGINS</p>",
    T23956: "<p><a page=\"parking\">Return</a></p><h3>Ticket T23956</h3>"
        + "<p><b>License plate</b>: 284 WJD</p>"
        + "<p><b>Car</b>: 1996 SHEENAN ALL-TIMER, SEDAN</p>"
        + "<p><b>Description</b>: GRAY, DAMAGE ON FRONT RIGHT DOOR.</p>"
        + "<p><b>Owner</b>: FRED K. OLSEN</p>",
    T23965: "<p><a page=\"parking\">Return</a></p><h3>Ticket T23965</h3>"
        + "<p><b>License plate</b>: 194 APW</p>"
        + "<p><b>Car</b>: 2005 BONAPARTE SPEEDSTER, CONVERTIBLE</p>"
        + "<p><b>Description</b>: RED, NO DAMAGE.</p>"
        + "<p><b>Owner</b>: EVELYN L. HASKELL</p>",
    library: "<h2>Library Hours</h2>"
        + "<p>ATTENTION! The library will be closed for Monday, June 19, in honor of Juneteenth. </p>"
        + "<p><b>Regular hours:</b></p>"
        + "<p>Mon-Thurs: <b>9AM - 7PM</b></p>"
        + "<p>Fri: <b>9AM - 10PM</b></p>"
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
        + "<p>Skokie was first incorporated in 1888, around 50 years after Chicago's incorporation. Originally, Skokie was founded as a German-Luxembourger farming community, supporting Chicago's food supply. Skokie was a major hub of Jewish immigration just before, during, and after World War II.</p>"
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