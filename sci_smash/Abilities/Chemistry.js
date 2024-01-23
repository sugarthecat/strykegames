import Ability from "../Ability.js";
import Assets from "../Assets.js";
import MusicSystem from "../MusicSystem.js";
/**
 * An attack, throwing a chemical vial.
 */
export default class Chemistry extends Ability {
    constructor() {
        super();
        this.cooldownLength = 4; // cooldown length
        this.attackLength = 1; // length of attack after triggering
        this.damage = 5; // damage dealt to enemies
        this.shape = "circle"; // shape of AOE
        this.text = "Chemistry"; // string of ability
        this.size = 300; // pixel radius of circle AOE
        this.abilityId = 1;
    }
    draw() { // Draw projectile being thrown
        let currentProgress = 1 - (this.attackTime / this.attackLength);
        if (currentProgress < 0.8) {
            currentProgress /= 0.8;
            let heightBoost = (100 * Math.sin(currentProgress * Math.PI)) + (60 * (1 - currentProgress));
            this.x = this.targetX * currentProgress + this.startX * (1 - currentProgress);
            this.y = this.targetY * currentProgress + this.startY * (1 - currentProgress);
            // adjust angle
            let dispDir = atan2(this.x, this.y) - 45;
            let dispDist = dist(0, 0, this.x, this.y);
            let disx = sin(dispDir) * dispDist;
            let disy = (1/ Math.sqrt(3)) * (cos(dispDir) * dispDist);
            // draw animation
            push()
            translate(disx, disy - heightBoost)
            rotate(currentProgress * 360)
            image(Assets.images.chemicalvial,-25,-25, 50, 50);
            pop ()
        }
    }
    drawGround() { // Draw attack area
        let currentProgress = 1 - (this.attackTime / this.attackLength);
        if (currentProgress > 0.8 && currentProgress < 1) {
            fill(50, 150, 75)
            circle(this.targetX, this.targetY, min((currentProgress - 0.8) * 1000, this.size * 2 - (currentProgress - 0.8) * 1000));
        }
    }
    activate(startX, startY, targetX, targetY){
        if (!this.isActive() && this.canActivate()) {
            Assets.sound.chemistry.setVolume(MusicSystem.getVolume())
            Assets.sound.chemistry.play();
        }
        super.activate(startX, startY, targetX, targetY);
    }
}