import Button from "./Button.js"
import MusicSystem from "./MusicSystem.js";
import Tutorial from "./Tutorial.js";
import Level from "./Level.js";
import Assets from "./Assets.js";
import TitleScreen from "./TitleScreen.js";
export default class GameMenu {
    /**
     * Status of the gamemenu being active
     * @type {Boolean}
     */
    static active = false;
    /**
     * The dictionary for an array of buttons on each page
     */
    static buttonDict = {};
    static menuPage = "main";
    static locked = false;
    static deathScreenTyped = "";
    static highscores = [];
    static initalize() {
        let reference = this;
        this.buttonDict = {
            "main": [
                new Button(10, 10, 380, 90, "Resume Game", function () { reference.invertActive() }),
                new Button(10, 110, 380, 90, "Sound", function () { reference.goToMenu('sound') }),
                new Button(10, 210, 380, 90, "Controls", function () { reference.goToMenu('controls') }),
                new Button(10, 310, 380, 90, "Game", function () { reference.goToMenu('game') }),
                new Button(10, 410, 380, 90, "Objectives", function () { reference.goToMenu('objectives') }),
                new Button(10, 510, 380, 90, "Return to Title", function () { TitleScreen.activate() })
            ],
            "sound": [
                new Button(10, 10, 380, 90, "Back", function () { reference.goToMenu('main') }),
                new Button(10, 110, 380, 90, "Mute Audio", function () { MusicSystem.toggleMute() }),
                new Button(10, 310, 50, 50, "-", function () { MusicSystem.decrementVolume() }),
                new Button(340, 310, 50, 50, "+", function () { MusicSystem.incrementVolume() })
            ],
            "game": [
                new Button(10, 10, 380, 90, "Back", function () { reference.goToMenu('main') }),
                new Button(10, 110, 380, 90, "Skip Tutorial", function () { if (Level.lvl == 0) { Level.finishLevel(); reference.active = false; } }),
                new Button(10, 210, 380, 90, "Restart Game", function () { Level.restartGame() }),
                new Button(10, 310, 380, 90, "View Highscores", function () {
                    reference.loadHighscores();
                    reference.goToMenu('highscores');
                })
            ],
            "controls": [
                new Button(10, 10, 380, 90, "Back", function () { reference.goToMenu('main') })
            ],
            "objectives": [
                new Button(10, 10, 380, 90, "Back", function () { reference.goToMenu('main') })
            ],
            "highscores": [
                new Button(10, 10, 380, 90, "Back", function () { reference.goToMenu('main') })
            ],
            "death_screen": [
                new Button(10, 490, 380, 100, "Submit", function () {
                    if (reference.deathScreenTyped.length != 0) {
                        //send score to server
                        fetch('https://ktprog.com/sci_smash/server/addScore.php?user=' + reference.deathScreenTyped + "&score=" + Level.getScore());
                        reference.unlockScreen();
                        reference.goToMenu('main');
                        Level.restartGame();
                    }
                }),
            ],"ability_upgrade": [
                new Button( -50, 225, 200, 200, "", function () {
                    Level.finished = false;
                    reference.goToMenu('main')
                    reference.unlockScreen();
                    reference.deactivate();
                }),
                new Button( 250, 225, 200, 200, "", function () {
                    Level.finished = false;
                    reference.goToMenu('main');
                    Level.player.specialAbility = Level.newAbility;
                    reference.unlockScreen();
                    reference.deactivate();
                    saveGame()
                })
            ]
        }
    }
    static switchToPlayerDeathScreen() {
        this.menuPage = "death_screen";
        this.deathScreenTyped = "";
        this.lockScreen();
        this.activate();
    }
    static switchToAbilityUpgradeScreen() {
        this.menuPage = "ability_upgrade";
        this.lockScreen();
        this.activate();
    }
    static addInitialLetter(letterCode) {
        if (letterCode >= 65 && letterCode <= 90 && this.deathScreenTyped.length <= 2) {
            let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            this.deathScreenTyped += letters.substring(letterCode - 65, letterCode - 64);
        } else if (letterCode == 8 && this.deathScreenTyped.length > 0) {
            this.deathScreenTyped = this.deathScreenTyped.substring(0, this.deathScreenTyped.length - 1);
        }
    }
    static unlockScreen() {
        this.locked = false;
    }
    static lockScreen() {
        this.locked = true;
    }
    static loadHighscores() {
        try {
            fetch('https://ktprog.com/sci_smash/server/getScore.php')
                .then(x => x.json())
                .then(x => this.setHighscores(x.scores));
        } catch {
            console.error('error reading getScore.php');
        }
    }
    static activate() {
        this.active = true;
        MusicSystem.switchAudio('pausemenu');
    }
    static deactivate() {
        if (!this.locked) {
            this.active = false;
            if (Tutorial.isComplete()) {
                MusicSystem.switchAudio('game');
            } else {
                MusicSystem.switchAudio('tutorial');
            }
        }
    }
    static setHighscores(highscores) {
        this.highscores = highscores;
    }
    static goToMenu(menu) {
        this.menuPage = menu;
    }
    static invertActive() {
        if (this.active) {
            this.deactivate();
        } else {
            this.activate();
        }
    }
    static getScaleFactors() {

        // 6 wide: 4 tall ratio, with 20px padding on any side
        let adjh = height; // adjusted height for calculations
        let adjw = width; // adjusted height for calculations
        let xoff = 20;
        let yoff = 20;
        if (adjw / 400 > adjh / 600) {
            adjw = adjh * 400 / 600;
            xoff = (width - adjw) / 2 + 20;
        } else {
            adjh = adjw / 400 * 600;
            yoff = (height - adjh) / 2 + 20;
        }
        adjw -= 40;
        adjh -= 40;
        return {
            adjw: adjw,
            adjh: adjh,
            yoff: yoff,
            xoff: xoff
        }
    }
    static draw() {
        if (this.active) {
            let scaleFactors = this.getScaleFactors();
            let menubackgroundColor = color(0);
            menubackgroundColor.setAlpha(200);
            fill(menubackgroundColor);
            rect(0, 0, width, height);
            push();
            noStroke();
            textAlign(CENTER);
            translate(scaleFactors.xoff, scaleFactors.yoff);
            scale(scaleFactors.adjw / 400, scaleFactors.adjh / 600);
            let menuButtons = this.buttonDict[this.menuPage];
            for (let i = 0; i < menuButtons.length; i++) {
                if (this.mousePosInRange(
                    menuButtons[i].x,
                    menuButtons[i].y,
                    menuButtons[i].x + menuButtons[i].w,
                    menuButtons[i].y + menuButtons[i].h,)) {
                    menuButtons[i].drawHover();
                } else {
                    menuButtons[i].draw();
                }
            }
            //unique menu types
            fill(255);
            if (this.menuPage == "controls") {
                textSize(25);
                image(Assets.images.wasd, 110, 100, 180, 120);
                text("Left-click to use Light Attack", 200, 250);
                text("Right-click to use Heavy Attack", 200, 300);
                text("Shift while moving to Dash", 200, 350);
                text("Esc to toggle menu", 200, 400);
                text("Scroll to zoom in/out", 200, 450);
            } else if (this.menuPage == "objectives") {
                textSize(25);
                text("Enter portals to advance through levels", 0, 120, 400);
                text("Eliminate Monsters before moving through portals", 0, 220, 400);
                text("Upgrade your degree at the end of some levels", 0, 320, 400);
                text("Collect coins to ease your student debt", 0, 420, 400);
                text("Show the world that science rocks!", 0, 520, 400);
            } else if (this.menuPage == "highscores") {
                textSize(50)
                if (this.highscores.length >= 0) {
                    for (let i = 0; i < this.highscores.length; i++) {
                        text(this.highscores[i].name + " - " + this.highscores[i].score, 200, i * 75 + 200);
                    }
                } else {
                    text('Loading scores...', 200, 300);
                }
            } else if (this.menuPage == "sound") {
                textSize(50);
                text("Volume", 200, 250);
                text(MusicSystem.getVolumePercentString(), 200, 350);
            } else if (this.menuPage == "death_screen") {
                textSize(50)
                text("Score: " + Level.getScore(), 200, 300);
                text("Enter your tag to submit score", 0, 50, 400, 200);
                text(this.deathScreenTyped, 200, 400)
            } else if (this.menuPage == "ability_upgrade") {
                textSize(50);
                text("Choose Ability:", 200, 125);
                image(Assets.images[Level.player.specialAbility.text + "Icon"], -50, 225, 200, 200);
                image(Assets.images[Level.newAbility.text + "Icon"], 250, 225, 200, 200);
                text(Level.player.specialAbility.text, 50, 550);
                text(Level.newAbility.text, 350, 550);
            }
            pop();
        }
    }
    static mousePosInRange(minx, miny, maxx, maxy) {
        let mousepos = this.getProjectedMousePosition();
        return (mousepos.x >= minx && mousepos.x <= maxx && mousepos.y >= miny && mousepos.y <= maxy);
    }
    static isLocked() {
        return this.locked;
    }
    static isActive() {
        return this.active;
    }
    static mouseClicked() {
        let menuButtons = this.buttonDict[this.menuPage];
        let mousepos = this.getProjectedMousePosition();
        for (let i = 0; i < menuButtons.length; i++) {
            menuButtons[i].clickedAt(mousepos.x, mousepos.y);
        }
    }
    static getProjectedMousePosition() {
        let scaleFactors = this.getScaleFactors();
        let tempMouseX = mouseX;
        let tempMouseY = mouseY;
        tempMouseX -= scaleFactors.xoff;
        tempMouseY -= scaleFactors.yoff;
        tempMouseX /= scaleFactors.adjw / 400;
        tempMouseY /= scaleFactors.adjh / 600;
        return {
            x: tempMouseX,
            y: tempMouseY
        }
    }
}