let before = true;
function secondsAway() {
    const currentDate = new Date();
    const eventDate = new Date(document.getElementById("endDate").value);
    const timeDiff = eventDate.getTime() - currentDate.getTime();
    if (timeDiff < 0) {
        before = false;
        return -timeDiff / 1000;
    }
    before = true;
    return (timeDiff / 1000);
}
function getCurDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c; // in metres

    return d
}
fetch("uscities.csv").then(x => x.text()).then(x => processCities(x))
let seconds = secondsAway();
let distances = [{ name: "Tokyo", distance: 100000000000000 }];
let cityOnBike = 0;
let cityOnWalk = 0;
function processCities(cities) {
    console.log("Processing city list.")
    let citylist = cities.split("\n");
    for (let i = 1; i < citylist.length; i++) {
        let args = citylist[i].split(",")
        //name = 0
        //state = 2
        //lat = 6
        //long = 7
        //population = 8;
        if (args.length < 9) {
            continue;
        }
        if (parseInt(args[8].replaceAll("\"", "")) < 100000 && args[2] != "MA") {
            continue;
        }
        distances.push(
            {
                name: args[0].replaceAll("\"", "") + ", " + args[2].replaceAll("\"", ""),
                distance: getCurDistance(42.3601, -71.0942, parseFloat(args[6].replaceAll("\"", "")), parseFloat(args[7].replaceAll("\"", "")))
            }
        )
        //42.3601° N, 71.0589° W
    }

    distances.sort(function (a, b) {
        return a.distance - b.distance;
    })
    cityOnBike = distances.length - 1;
    cityOnWalk = distances.length - 1;
}
function update() {
    seconds = secondsAway();
    setFormattedText("seconds", Math.floor(seconds))
    setFormattedText("minutes", Math.floor(seconds / 60))
    setFormattedText("hours", Math.floor(seconds / 60 / 60))
    let hotdogs = Math.floor(seconds / 60 * (72 / 10))
    setFormattedText("hotdogs", hotdogs)
    let costcoCost = getFormattedText(hotdogs * 1.5)
    if(hotdogs % 2 == 0){
        costcoCost += ".0"
    }
    setText('costco', "$" + costcoCost + "0")
    let lbsbeef = Math.floor(hotdogs * 2)/10
    setText("lbsbeef",lbsbeef)
    //assuming a processed cow yields 500lbs beef
    let cows = Math.ceil(lbsbeef/500)
    setText("cows",cows)
    setFormattedText("shrek", Math.floor(seconds / 60 * 250 / 9574));
    setText("bezos", "$" + getFormattedText(Math.floor((168000000000 / seconds))));
    //cell count = 2^h
    // rotation = 360 / days
    setText("rotation", getFormattedText(Math.floor(seconds / 60 / 60 / 24 * 360)) + "." + setNumberLength(Math.floor(seconds / 60 / 60 / 24 * 360 * 1000) % 1000, 3) + "°");
    while (distances[cityOnWalk].distance > 5000 * seconds / 60 / 60 && cityOnWalk > 0) {
        cityOnWalk--;
    }
    while (distances[cityOnWalk + 1].distance < 5000 * seconds / 60 / 60 && cityOnWalk + 1 < distances.length) {
        cityOnWalk++;
    }
    setText('walkcity', distances[cityOnWalk].name)
    let beforeWords = document.getElementsByClassName("before")
    let afterWords = document.getElementsByClassName("after")
    if (before) {
        for (let i = 0; i < beforeWords.length; i++) {
            beforeWords[i].style.display = "inline";
        }
        for (let i = 0; i < afterWords.length; i++) {
            afterWords[i].style.display = "none";
        }
    } else {
        for (let i = 0; i < beforeWords.length; i++) {
            beforeWords[i].style.display = "none";
        }
        for (let i = 0; i < afterWords.length; i++) {
            afterWords[i].style.display = "inline";
        }

    }
}
let interval = setInterval(update, 10);
function setFormattedText(id, num) {
    setText(id, getFormattedText(num))
}
function getFormattedText(num) {
    return (getNumber(num) + "").replace(/(.)(?=(\d{3})+$)/g, '$1,');
}
function getNumber(num) {
    if (num < 1) {
        return "";
    }
    try {
        return getNumber(Math.floor(num / 10)) + "" + num % 10
    }
    catch {
        console.error(num);
    }
}
function setText(id, text) {
    document.getElementById(id).innerHTML = text
}
function setNumberLength(num, length) {
    if (length > (num + "").length) {
        return setNumberLength("0" + num, length)
    } else {
        return num;
    }
}
