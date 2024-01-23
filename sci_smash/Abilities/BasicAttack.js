import Ability from "../Ability.js"
import Assets from "../Assets.js";
import MusicSystem from "../MusicSystem.js";
/**
 * An attack where a book is thrown
 */
export default class BasicAttack extends Ability {
    constructor() {
        super();
        this.cooldownLength = .5; // cooldown length
        this.attackLength = .2; // length of attack after triggering
        this.damage = 1; // damage dealt to enemies
        this.shape = "square"; // shape of AOE
        this.size = 75; // affects a single target
        this.cooldownTime = -1;
    }
    draw() { // Draw projectile being thrown
        if (this.isActive()) {
            let currentProgress = 1 - (this.attackTime / this.attackLength);
            let heightBoost = (100 * Math.sin(currentProgress * Math.PI)) + (60 * (1 - currentProgress));
            this.x = this.targetX * currentProgress + this.startX * (1 - currentProgress);
            this.y = this.targetY * currentProgress + this.startY * (1 - currentProgress);
            // adjust angle
            let dispDir = atan2(this.x, this.y) - 45;
            let dispDist = dist(0, 0, this.x, this.y);
            let disx = sin(dispDir) * dispDist;
            let disy = (1/ Math.sqrt(3)) * (cos(dispDir) * dispDist);
            // draw animation
            push();
            translate(disx, disy - heightBoost);
            rotate(currentProgress * 360)
            image(Assets.images.book, -25,-25,50, 50);
            pop();
        }
    }
    increaseDamage() {
        this.damage += 1 / this.damage;
    }
    activate(startX, startY, targetX, targetY) {
        if (!this.isActive() && this.canActivate()) {
            Assets.sound.bookthrow.setVolume(MusicSystem.getVolume())
            Assets.sound.bookthrow.play();
        }
        super.activate(startX, startY, targetX, targetY);
    }
}