import Entity from "../Entity.js";
import BasicAttack from "../Abilities/BasicAttack.js";
import Assets from "../Assets.js";
import Chemistry from "../Abilities/Chemistry.js";
export default class Player extends Entity {
    // position inherited
    // movement and animation inherited
    /**
     * Speed of the player's normal movement
     * @type {Number}
     */
    normalMoveSpeed = 500;
    /**
     * Speed of player's dash ability
     * @type {Number}
     */
    dashSpeed = 1500;
    /**
     * Time left on the player's dash ability
     * @type {Number}
     */
    dashTimer = 0;
    /**
     * Current animation phase of movement
     * @type {Number}
     */
    phase = 0;
    /**
     * If the player is currently facing left.
     * @type {Boolean}
     */
    facingLeft = false;
    /**
     * The player's current base/left-click ability
     * @type {Ability}
     */
    baseAbility = new BasicAttack();
    /**
     * The player's current special/right-click ability
     * @type {Ability}
     */
    specialAbility = new Chemistry();
    //items
    /**
     * The amount of keys the player currently has
     * @type {Number}
     */
    keys = 0;
    /**
     * The amount of coins the player currently has
     * @type {Number}
     */
    coins = 0;
    baseAbilityArr = []
    constructor() {
        super();
        // hitbox size
        this.w = 80;
        this.h = 80;
        // direction facing
        this.dirx = 0; // 1, 0, or -1, representing direction x
        this.diry = 0; // 1,0, or -1, representing direction y
        // display size
        this.dispw = 70;
        this.disph = 90;
        this.setHealth(15);
    }
    /**
     * To be called if a player obtains a key, adds this key to the player's inventory.
     */
    foundKey() {
        this.keys++;
    }
    /**
     * 
     * @returns {Number} Current count of keys
     */
    getKeys() {
        return this.keys;
    }
    /**
     * To be called if a player uses a key, removes this key to the player's inventory.
     */
    useKey() {
        this.keys--;
    }
    /**
     * Gets the current amount of coins the player has
     * @returns {Number} The player's current coins.
     */
    getCoins() {
        return this.coins;
    }
    /**
     * Gives the player a coin
     */
    foundCoin() {
        this.coins++;
    }
    /**
     * Increases both the normal move speed, and the dash speed of the player.
     */
    incrementMoveSpeed() {
        this.normalMoveSpeed += 20;
        this.dashSpeed += 40;
    }
    /**
     * Draws the "ground" segment of the player, and the "ground" section fo the player's ability actions.
     */
    drawGround() {
        for (let i = 0; i < this.baseAbilityArr.length; i++) {

        }
        this.baseAbility.drawGround();
        this.specialAbility.drawGround();
        noStroke();
        image(Assets.images.aura, this.x, this.y, this.w, this.h);
    }
    /**
     * Checks if the player is moving up. 
     * @returns {Boolean} If the player is moving upwards.
     */
    isMovingUp() {
        return this.dirx + this.diry < 0;
    }
    /**
     * Checks if the player is moving down. 
     * @returns {Boolean} If the player is moving downwards.
     */
    isMovingDown() {
        return this.dirx + this.diry > 0;
    }
    /**
     * Checks if the player is moving right. 
     * @returns {Boolean} If the player is moving rightwards.
     */
    isMovingRight() {
        return this.dirx - this.diry > 0;
    }
    /**
     * Checks if the player is moving left. 
     * @returns {Boolean} If the player is moving leftwards.
     */
    isMovingLeft() {
        return this.dirx - this.diry < 0;

    }
    /**
     * Activates the base ability, targeting a position in the world.
     * @param {Number} attackTargetX The X position of the attack destination
     * @param {Number} attackTargetY the Y position of the attack destination
     */
    activateBaseAbility(attackTargetX, attackTargetY) {
        if (this.baseAbilityArr.length < 2) {
            let newAttack = new BasicAttack();
            newAttack.activate(
                this.x + this.w / 2,
                this.y + this.h / 2,
                attackTargetX,
                attackTargetY);
            this.baseAbilityArr.push(newAttack);
        }
    }
    /**
     * Activates the special ability, targeting a position in the world.
     * @param {Number} attackTargetX The X position of the attack destination
     * @param {Number} attackTargetY the Y position of the attack destination
     */
    activateSpecialAbility(attackTargetX, attackTargetY) {
        this.specialAbility.activate(
            this.x + this.w / 2,
            this.y + this.h / 2,
            attackTargetX,
            attackTargetY);
    }
    /**
     * Ensures that the player is headed in the correct direction based on the keyboard
     */
    fixDirections() {
        // Checks for movement key activations.
        let right = keyIsDown(68); // D key
        let left = keyIsDown(65); // A key
        let up = keyIsDown(87); // W key
        let down = keyIsDown(83); // S key
        // Resolves key conflicts to ensure that if two opposite directions are attempted at the same time, nothing happens.
        if (this.dashTimer <= 0) {
            this.moveSpeed = this.normalMoveSpeed;
            this.dirx = 0;
            this.diry = 0;
            if (right && !left) {
                this.dirx = 1;
                this.diry = -1;
                // moving right and not left, convert to actual grid.
            } else if (left && !right) {
                this.dirx = -1;
                this.diry = 1;
                // moving left and not right, convert to actual grid.
            }
            if (down && !up) {
                this.diry += 1;
                this.dirx += 1;
                // moving down and not up, convert to actual grid.
            } else if (up && !down) {
                this.diry += -1;
                this.dirx += -1;
                // moving up and not down, convert to actual grid.
            }
            if (this.facingLeft && right && !left) {
                this.facingLeft = false;
            } else if (!this.facingLeft && !right && left) {
                this.facingLeft = true;
            }
        } else {
            this.moveSpeed = this.dashSpeed;
        }
    }
    /**
     * Draws an upright display of the player
     */
    draw() {
        this.phase += 0.3;
        if (this.dirx == 0 && this.diry == 0) {
            this.drawImage = Assets.images.player.idle
        } else {
            this.phase = this.phase % Assets.spritesheets.player.run.getLength();
            this.drawImage = Assets.spritesheets.player.run.getSprite(floor(this.phase));
        }
        super.draw();
    }
    /**
     * Activates the player's dash ability
     */
    activateDash() {
        if (this.dashTimer <= 0 && (this.dirx != 0 || this.diry != 0)) {
            this.dashTimer = 0.2;
        }
    }
    /**
     * Runs a movement tick, including timers related to the player and increments/decrements positional values.
     */
    runMoveTick(Level) {
        if (this.dashTimer && this.dashTimer >= 0) {
            this.dashTimer -= deltaTime / 1000;
        }
        this.baseAbility.timeTick();
        for (let i = 0; i < this.baseAbilityArr.length; i++) {
            this.baseAbilityArr[i].timeTick()
        }
        this.specialAbility.timeTick();
        super.runMoveTick(Level);
        this.fixDirections();
    }
    /**
     * Gets the current active ability objects. Will finish the activation of these when called.
     * @returns {Array<Ability>} The player's current ability objects
     */
    getAttacks() {
        let attacks = [];
        if (this.baseAbility.getActivationStatus()) {
            attacks.push(this.baseAbility);
        }
        if (this.specialAbility.getActivationStatus()) {
            attacks.push(this.specialAbility);
        }
        for (let i = 0; i < this.baseAbilityArr.length; i++) {
            if (this.baseAbilityArr[i].getActivationStatus()) {
                attacks.push(this.baseAbilityArr[i]);
                this.baseAbilityArr.splice(i, 1)
                i--;
            }
        }
        return attacks;
    }
    /**
     * Gets the current ability objects
     * @returns {Array<Ability>} The player's current ability objects
     */
    getAbilityProjectiles() {
        let projectiles = [this.baseAbility, this.specialAbility]
        for (let i = 0; i < this.baseAbilityArr.length; i++) {
            projectiles.push(this.baseAbilityArr[i])
        }
        return projectiles;
    }
}