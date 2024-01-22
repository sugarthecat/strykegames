let badComputer = true;
class SettingsScreen {
    static Draw() {
        background(0);
        fill(50, 0, 0)
        noStroke();
        rect(0, 0, 600, 400)
        textAlign(CENTER);
        stroke(200, 0, 0)
        fill(150, 0, 0)
        textSize(100)
        text("Settings", 300, 150)

        textSize(40)
        stroke(200, 0, 0)
        if (mouseInRange(240, 340, 120, 50)) {
            fill(10, 0, 0)
        } else {
            fill(80, 0, 0)
        }
        rect(240, 340, 120, 50)
        fill(150, 0, 0)
        text("Return", 300, 380)

        textSize(40)
        stroke(200, 0, 0)
        if (mouseInRange(80, 200, 40, 50)) {
            fill(10, 0, 0)
        } else {
            fill(80, 0, 0)
        }
        rect(80, 200, 40, 50)
        fill(150, 0, 0)
        text(badComputer ? "X" : "", 100, 240)
        text("Performance Mode", 300, 240)

        text("Volume",300,300)
        fill(80, 0, 0)
        rect(200, 300, 200, 20)
        fill(150, 0, 0)
        rect(195 + 200 * volume, 280, 10, 60)
        if (mouseInRange(200, 290, 200, 45) && mouseIsPressed) {
            let mousepos = getMousePosition();
            volume = (mousepos.x - 200) / 200
            if(isLocalStorageAvailable()){
                localStorage.unholyvolume = volume;
            }
            Assets.setVolume(volume)
        }
    }
    static HandleClick() {
        if (mouseInRange(240, 340, 120, 50)) {
            screenOn = "title"
        }
        if (mouseInRange(80, 200, 40, 50)) {
            badComputer = !badComputer
            if(isLocalStorageAvailable()){
                localStorage.unholybadpc = badComputer;
            }
        }
    }
}
function isLocalStorageAvailable() {
    const test = 'test';
    try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch (e) {
        return false;
    }
}