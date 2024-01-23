/**
 * Represents an attack by the player
 */
export default class Ability {
    
    /**
     * In seconds, how long until the ability can be used again.
     * @type {Number}
     */
    cooldownLength = 0;
    /**
     * In seconds, how long until the attack finishes.
     * @type {Number}
     */
    attackLength = 0;
    /**
     * The amount of damage the attack will do
     * @type {Number}
     */
    damage = 0;
    /**
     * Shape of the area of attack.
     * @type {String}
     */
    shape = ""; 
    /**
     * Size, in pixels, of the area of attack
     * @type {Number}
     */
    size = 0; 
    /**
     * starts at attackLength, and once it reaches 0, the attack occurs. Decreases by 1 every second.
     * @type {Number}
     */
    attackTime = -20;
    /**
     * starts at cooldownLength, and once it reaches 0, the ability can be triggered again. Decreases by 1 every second.
     * @type {Number}
     */
    cooldownTime = 0;
    /**
     * The X position the ability attack is currently at
     * @type {Number}
     */
    x = 0;
    /**
     * The Y position the ability attack is currently at
     * @type {Number}
     */
    y = 0;
    /**
     * The width of the ability attack
     * @type {Number}
     */
    w = 0;
    /**
     * The X position of the ability's origin
     * @type {Number}
     */
    startX = 0;
    /**
     * The Y position of the ability's origin
     * @type {Number}
     */
    startY = 0;
    /**
     * The X position of the ability's target
     * @type {Number}
     */
    targetX = 0;
    /**
     * The Y position of the ability's target
     * @type {Number}
     */
    targetY = 0;
    /**
     * The angle at which the ability is triggered
     * @type {Number}
     */
    degree = 0;
    /**
     * If this ability is awaiting a damage point to be taken
     * @type {Boolean}
     */
    finishedActivation = false;
    /**
     * How much this health this ability will heal for
     * @type {Number}
     */
    healAmount = 0;
    /**
     * How many seconds this attack will stun for
     * @type {Number}
     */
    stunLength = 0;
    /**
     * The level of upgrade this ability is on
     * @type {Number}
     */
    upgradeLevel = 1;
    /**
     * Get the cooldown progress. Out of a scale from 0 to 1
     * @returns {Number} the progress amount
     */
    getCooldownProgress() {
        return min(this.cooldownTime / this.cooldownLength, 1)
    }
    /**
     * Progresses the cooldownTime and attackTime
     */
    timeTick() {
        let previouslyActive = this.isActive();
        this.cooldownTime -= deltaTime * 0.001;
        this.attackTime -= deltaTime * 0.001;
        if (!this.finishedActivation) {
            this.finishedActivation = (previouslyActive && !this.isActive());
        }
    }
    /**
     * Gets the activation status of the ability, and if is is active, plays the sound.
     * @returns {Boolean} If the ability has finished its activation
     */
    getActivationStatus() {
        if (this.finishedActivation) {
            this.finishedActivation = false;
            return true;
        }
        return false;
    }
    /**
     * Activates the ability.
     * @param {Number} startX the X position the attack begins at
     * @param {Number} startY the Y position the attack begins at
     * @param {Number} targetX the X position the attack begins at
     * @param {Number} targetY the Y position the attack begins at
     */
    activate(startX, startY, targetX, targetY) {
        if (!this.isActive() && this.canActivate()) {
            this.startX = startX;
            this.startY = startY;
            this.targetX = targetX;
            this.targetY = targetY;
            this.x = startX;
            this.y = startY;
            this.degree = atan2(this.targetY - this.startY, this.targetX - this.startX);
            this.attackTime = this.attackLength;
            this.cooldownTime = this.cooldownLength;
        }
    }
    /**
     * checks attack activity status
     * @returns {Boolean} If the attack has completed
     */
    isActive() {
        return this.attackTime > 0;
    }
    /**
     * checks attack cooldown status
     * @returns {Boolean} If the attack cooldown has completed
     */
    canActivate() {
        return this.cooldownTime < 0;
    }
    /**
     * sets the current upgrade level
     * @param {Number} newUpgradeLevel the upgrade level to be set to
     */
    setLevel(newUpgradeLevel) {
        this.upgradeLevel = newUpgradeLevel;
    }
    /**
     * Draws the ability's upright portion
     */
    draw() {

    }
    /**
     * Draws the ability's ground-based portion
     */
    drawGround() {

    }
}