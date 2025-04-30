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
let seconds = secondsAway();
function update() {
    seconds = secondsAway();
    setFormattedText("seconds", Math.floor(seconds))
    let minutes = seconds / 60;
    setFormattedText("minutes", Math.floor(minutes))
    let hours = minutes / 60;
    setFormattedText("hours", Math.floor(hours))
    let days = hours / 24;
    setFormattedText("days", Math.floor(hours / 24))
    setText("bezos", "$" + getFormattedText(Math.floor((373800000000 / seconds))));
    // rotation = 360 / days
    setText("rotation", getFormattedText(Math.floor(days * 360)) + "." + setNumberLength(Math.floor(days * 360 * 1000) % 1000, 3) + "°");
    setFormattedText("watchtimes", Math.floor(minutes / (3 * 50 * 8)))
    let invincibleTimeLeft = minutes % (3 * 50 * 8)
    let season = Math.floor(invincibleTimeLeft / (50 * 8))
    let episode = Math.floor(invincibleTimeLeft / 50) % 8
    setText("episode", `Season ${season + 1}, Episode ${episode + 1} \"${invincibleEpisodes[season][episode]}\"`)
    let invMinutes = invincibleTimeLeft % 50;
    let invSeconds = Math.floor((invMinutes * 60) % 60).toString();
    if (invSeconds.length == 1) {
        invSeconds = "0" + invSeconds
    }

    setText("episodewatchtime", `${Math.floor(invMinutes)}:${invSeconds}`)
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
