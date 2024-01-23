import Assets from "./Assets.js";
import SaveManager from "./SaveManager.js";
import Tutorial from "./Tutorial.js";
import Level from "./Level.js";
import MusicSystem from "./MusicSystem.js";
import GameMenu from "./GameMenu.js";
/**
 * Title screen representation.
 * 
 * Static class, do not instantiate.
 */
export default class TitleScreen {
    /**
     * whether the titlescreen is active or not
     * @type {Boolean}
     */
    static active = true;
    /**
     * if the key has been pressed to continue
     * @type {Boolean}
     */
    static continue = true;
    /**
     * whether the menu is asking the player to decide to do the tutorial or not
     * @type {Boolean}
     */
    static continue = false;
    /**
     * time passed since key has been pressed to continue
     * impacted by exponential speedup after event
     * @type {Number}
     */
    static continueTime = 0;
    /**
     * whether the player wants to do the tutorial or not
     * @type {Boolean}
     */
    static tutorialAlreadyConfirmed = false;
    /**
     * Gets the activity status of the titlescreen
     * @returns {Boolean} If the 
     */
    static isActive() {
        return this.active
    }
    // switches the confirmingtutorial boolean
    static switchToConfirmTutorial() {
        this.confirmingTutorial = true;
    }
    /**
     * Starts the continue animation
     */
    static continueStarted() {
        if (!this.continue) {
            this.continue = true;
            this.continueTime = 0;
        }
    }
    /**
     * Activates the title screen
     */
    static activate() {
        this.active = true;
        this.continue = false;
        MusicSystem.switchAudio('titlescreen')
        if (this.tutorialAlreadyConfirmed) {
            this.confirmingTutorial = false;
        }
    }
    /**
     * Deactivates the title screen
     */
    static deactivate() {
        this.active = false;
        if (Tutorial.isComplete()) {
            MusicSystem.switchAudio('game')
        } else {
            MusicSystem.switchAudio('tutorial')
            MusicSystem.initializeGameMusic();
        }
        GameMenu.deactivate();
    }
    /**
     * Draws the title screen.
     */
    static draw() {
        if (this.continue) { // increment continue time exponentially
            this.continueTime += deltaTime / 1000 * max(1, this.continueTime);
        }
        push();
        textAlign(CENTER);
        noStroke();
        textSize(min(width * 0.04, height * 0.05))
        textStyle(BOLD)
        textFont('Courier New');
        let partWidth = height / 324 * 576;
        let widthsTaken = width / partWidth;
        // seconds since epoch
        let secondsSinceEpoch = (new Date() / 1000 + this.continueTime);
        if (this.confirmingTutorial) {
            secondsSinceEpoch = 0;
        }
        let rotationTimes = [
            5, 30, 10, 8
        ];
        image(Assets.images.clouds[0], 0, 0, width, height);
        for (let j = 1; j < rotationTimes.length; j++) {
            let offset = (secondsSinceEpoch % rotationTimes[j]) / rotationTimes[j] * partWidth;
            if (j % 2 == 0) {
                offset = partWidth - offset;
            }
            if (j == 3) {
                image(Assets.images.title, width / 2 - min((partWidth * 0.8), width) / 2, height * 0.1, min(partWidth * 0.8, width), height * 0.2)
            }
            if (j == 2) {
                fill(0)
                text("Enter the Labs!", width / 2, height * 0.4);
            }
            for (let i = -1; i < widthsTaken; i++) {
                image(Assets.images.clouds[j], offset + partWidth * i, 0, partWidth, height);
            }
        }
        fill(255);
        text("Press any key to continue", width / 2, height * 0.95);
        pop();
        if (this.continue && this.continueTime > 20) {
            this.continue = false;
            this.continueTime = 0;
            if (SaveManager.previousSave) {
                this.deactivate();
                SaveManager.finishLoadSave(SaveManager.previousSave);
            } else if (this.tutorialAlreadyConfirmed) {
                this.deactivate();
            } else {
                this.switchToConfirmTutorial();
            }
        }

        if (this.confirmingTutorial) {
            let xoff = 0;
            let yoff = 0;
            if (height > width) {
                yoff = (height - width) / 2;
            } else {
                xoff = (width - height) / 2;
            }
            let squareSize = min(height, width);
            let pauseColor = color(0, 0, 0);
            pauseColor.setAlpha(180);
            push();
            fill(pauseColor);
            rect(0, 0, width, height);
            image(Assets.images.playbutton, xoff + squareSize * 0.25, yoff + squareSize * 0.6, squareSize * 0.2, squareSize * 0.1);
            image(Assets.images.skipbutton, xoff + squareSize * 0.55, yoff + squareSize * 0.6, squareSize * 0.2, squareSize * 0.1);
            fill(255);
            textAlign(CENTER);
            textSize(squareSize * 0.05);
            textFont('Courier new');
            textStyle(BOLD);
            text("Play Tutorial?", width / 2, yoff + squareSize * 0.5);
            fill(0);
            pop();
        }
    }
    /**
     * Call when mouse is clicked.
     */
    static mouseClicked() {
        if (this.confirmingTutorial) {
            let xoff = 0;
            let yoff = 0;
            if (height > width) {
                yoff = (height - width) / 2;
            } else {
                xoff = (width - height) / 2;
            }
            let squareSize = min(height, width);
            if (mouseX > xoff + squareSize * 0.25 && mouseX < xoff + squareSize * 0.45
                && mouseY > yoff + squareSize * 0.6 && mouseY < yoff + squareSize * 0.7) {
                //play tutorial
                this.tutorialAlreadyConfirmed = true;
                this.deactivate();
            }
            if (mouseX > xoff + squareSize * 0.55 && mouseX < xoff + squareSize * 0.75
                && mouseY > yoff + squareSize * 0.6 && mouseY < yoff + squareSize * 0.7) {
                //skip tutorial
                this.tutorialAlreadyConfirmed = true;
                Level.finishLevel();
                this.deactivate();

            }

        }
    }
}