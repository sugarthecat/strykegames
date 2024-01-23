import TextBox from "./TextBox.js";
import Assets from "./Assets.js";
import Level from "./Level.js";
import GameMenu from "./GameMenu.js";
/**
 * Class representing the tutorial and performing neccessary checks
 * 
 * Static class, do not instantiate
 */
export default class Tutorial {

    static textBoxes = [];
    static textbox;
    static phase = 0;

    static initialize() {
        this.textBoxes = [];
        // Create array of text boxes based on the constructor input.
        let blurbs = Assets.tutorialText.split('\n');
        for (let i = 0; i < blurbs.length; i++) {
            this.textBoxes.push(new TextBox(blurbs[i], 15));
        }
        this.textbox = this.textBoxes[0];
        this.phase = 0;

    }
    // return boolean of tutorial completion status
    static isComplete() {
        return this.phase == this.textBoxes.length;
    }
    // advance the text of the tutorial text box
    static advanceText() {
        this.textbox.advanceText();
    }
    // draw the tutorial text box
    static draw() {
        this.textbox.draw();
    }
    // called to complete the tutorial
    static complete() {
        this.phase = this.textBoxes.length;
    }
    // called to complete tutorial phases which require keyboard input
    // ex: space to continue
    static takeInput(key) {
        if (key == 32) {
            if (this.textbox.isComplete() &&
                (this.phase <= 2
                    || (this.phase >= 9 && this.phase <= 10)
                    || (this.phase >= 12 && this.phase <= 16)
                    || (this.phase == 18))) {
                this.advancePhase();
            } else {
                this.textbox.advanceText(true);
            }
        }
    }
    // test for conditions required to be met in order to advance certain tutorial phases
    static testLevel() {
        if (this.textbox.isComplete()) {
            if (this.phase == 3 && Level.player.isMovingDown()) {
                this.advancePhase();
            }
            else if (this.phase == 4 && Level.player.isMovingUp()) {
                this.advancePhase();
            }
            else if (this.phase == 5 && Level.player.isMovingLeft()) {
                this.advancePhase();
            }
            else if (this.phase == 6 && Level.player.isMovingRight()) {
                this.advancePhase();
            }
            else if (this.phase == 7 && Level.player.dashTimer > 0) {
                this.advancePhase();
            }
            else if (this.phase == 17 && Level.entities.length == 0) {
                this.advancePhase();
            }
            else if (this.phase == 19 && GameMenu.isActive()) {
                this.advancePhase();
            }
        }
    }
    // advance the tutorial phase
    static advancePhase() {
        if (this.phase < this.textBoxes.length) {
            this.phase++;
            this.textbox = this.textBoxes[this.phase];
            if (this.phase == 17) {
                Level.spawnTutorialEnemy();
            }
            if (this.phase == 20) {
                Level.openTutorialCorridor();
            }
        }
    }
}