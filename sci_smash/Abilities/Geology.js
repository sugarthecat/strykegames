import Ability from "../Ability.js"
import Assets from "../Assets.js";
import MusicSystem from "../MusicSystem.js";
/**
 * An attack, summoning an earthquake
 */
export default class Geology extends Ability {
    constructor() {
        super();
        this.cooldownLength = 2; // cooldown length
        this.attackLength = 1; // length of attack after triggering
        this.damage = 5; // damage dealt to enemies
        this.shape = "cone"; // shape of AOE
        this.text = "Geology"; // string of ability
        this.size = 500; // pixel length of cone AOE
        this.abilityId = 3;
    }
    draw() {

    }
    drawGround() { // Draw attack area
        const width = 250
        let currentProgress = 1-(this.cooldownTime / this.cooldownLength);
        if (currentProgress > 0 && currentProgress < 0.5) {
            currentProgress*=2
            push();
            translate(this.startX, this.startY);
            rotate(this.degree-90);

            fill (255)
            scale (1,-1)
            translate(0,-this.size)
            //rect(-50,0,100,this.size);
            const spritesheet = Assets.spritesheets.earthquake
            image(spritesheet.getSprite(floor(currentProgress*spritesheet.getLength())),-width/2,0,width,this.size);
            pop();
        }else if (currentProgress > 0 && currentProgress < 1) {
            currentProgress-=0.5
            currentProgress*=2
            currentProgress = 1-currentProgress
            push();
            translate(this.startX, this.startY);
            rotate(this.degree-90);

            fill (255)
            scale (1,-1)
            translate(0,-this.size)
            //rect(-50,0,100,this.size);
            const spritesheet = Assets.spritesheets.earthquake
            image(spritesheet.getSprite(floor(currentProgress*spritesheet.getLength())),-width/2,0,width,this.size);
            pop();
        }
    }
    activate(startX, startY, targetX, targetY){
        if (!this.isActive() && this.canActivate()) {
            Assets.sound.geology.setVolume(MusicSystem.getVolume());
            Assets.sound.geology.play();
        }
        super.activate(startX, startY, targetX, targetY);
    }
}