import Ability from "../Ability.js"
import Assets from "../Assets.js";
import MusicSystem from "../MusicSystem.js";
export default class Theology extends Ability {
    constructor() {
        super();
        this.cooldownLength = 12; // cooldown length
        this.attackLength = 4; // length of attack after triggering
        this.damage = 12; // damage dealt to enemies
        this.shape = "circle"; // shape of AOE
        this.text = "Theology"; // string of ability
        this.size = 400; // radius of circle AOE
        this.abilityId = 2;
    }
    draw() { // Draw projectile being thrown
        let currentProgress = 1 - (this.attackTime / this.attackLength);
        if (currentProgress > 1 && currentProgress < 1.5) {

            this.x = this.targetX;
            this.y = this.targetY;
            // adjust angle
            let dispDir = atan2(this.x, this.y) - 45;
            let dispDist = dist(0, 0, this.x, this.y);
            let disx = sin(dispDir) * dispDist;
            let disy = (1/ Math.sqrt(3)) * (cos(dispDir) * dispDist);
            // draw animation
            let xshift = (20 * Math.random() - 10)
            let yshift = (10 * Math.random() - 5)
            fill(255);
            image(Assets.images.laserbeambody, xshift + disx - 100, yshift + disy - 2000, 200, 1800);
            image(Assets.images.laserbeam, xshift + disx - 100, yshift + disy - 450, 200, 500);
        }
    }
    getActivationStatus() {
        if (this.finishedActivation) {
            this.finishedActivation = false;
            Assets.sound.theology.setVolume(MusicSystem.getVolume())
            Assets.sound.theology.play()
            return true;
        }
        return false;
    }
    drawGround() { // Draw attack area
        let currentProgress = 1 - (this.attackTime / this.attackLength);
        if (currentProgress < 1) {
            push()
            translate(this.targetX, this.targetY)
            rotate(currentProgress * 1080)
            image(Assets.images.holystar, -100 * currentProgress, -100 * currentProgress, 200 * currentProgress, 200 * currentProgress)
            pop()
        } else if (currentProgress < 1.5) {
            push()
            let d = new Date();
            let secondsSinceEpoch = d.getTime();
            for (let i = 5; i >= 0; i--) {

                let pos = (i - (1000 - (secondsSinceEpoch % 1000)) / 1000) / 5
                let clr = color(255, 255 - pos * 30, 255 - pos * 255)
                if (pos > 0.9) {
                    clr.setAlpha(255 - (pos - 0.9) / 0.1 * 255)
                }
                fill(clr)
                circle(this.targetX, this.targetY, (2-currentProgress) * this.size * 2 * pos)
            }
            pop()
        }
    }
}