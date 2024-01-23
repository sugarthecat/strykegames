import SpriteSheet from "./Spritesheet.js";
export default class Entity {
    /**
     * The maximum health of the Entity
     */
    maxHealth = 1;
    /**
     * The current health of the Entity
     */
    health = 1;
    /**
     * The x position of the Entity
     */
    x = 0;
    /**
     * The y position of the Entity
     */
    y = 0;
    /**
     * The ground width of the Entity
     */
    w = 100;
    /**
     * The ground height, or the bottom-left dimensionality of the Entity
     */
    h = 100;
    /**
     * The x direction
     */
    dirx = 50; 
    /**
     * The y direction
     */
    diry = 50; 
    /**
     * The upright display width
     */
    dispw = 50; 
    /**
     * The upright display height
     */
    disph = 100;
    
    /**
     * move speed
     */
    moveSpeed = 250;
    constructor() {
        
    }
    //Given the level object, returns true if this player is colliding with any objects.
    //returns if it collides with another object
    /**
     * Sets the health of the entity 
     * @param {Number} health the health to set it to
     */
    setHealth(health) {
        this.health = health
        if (this.maxHealth < health) {
            this.maxHealth = health;
        }
    }
    /**
     * Sets the movement speed of the entity
     * @param {Number} speed The movement speed to be set
     */
    setMovementSpeed(speed) {
        this.moveSpeed = speed;
    }
    /**
     * gets the current entity movement speed
     * @returns {Number} Current movement speed
     */
    getMovementSpeed() {
        return this.moveSpeed;
    }
    /**
     * gets the current entity health
     * @returns {Number} current entity health
     */
    getHealth() {
        return this.health;
    }
    /**
     * gets the current maximum health
     * @returns {Number} current maximum health
     */
    getMaxHealth() {
        return this.maxHealth;
    }
    /**
     * 
     * @param {Number} maxhealth The maximum health to set to
     */
    setMaxHealth(maxhealth) {
        this.maxHealth = maxhealth;
    }
    /**
     * gets the damage attribute
     * @returns {Number} damage attribute
     */
    getDamage() {
        return this.damage;
    }
    /**
     * Sets the current damage to be dealt by this entity's attacks
     * @param {Number} dmg The amount of damage
     */
    setDamage(dmg) {
        this.damage = dmg;
    }
    /**
     * 
     * @param {Number} amount The amount of points to heal
     */
    heal(amount) {
        this.health += amount;
        if (this.health > this.maxHealth) {
            this.health = this.maxHealth;
        }
    }
    /**
     * Takes a certain amount of damage
     * @param {Number} damage The amount of damage to take
     */
    takeDamage(damage) {
        this.health -= damage;
    }
    /**
     * Checks to see if another object is colliding with this entity
     * @param {{x,y,w,h}} other 
     * @returns {Boolean} If these two entities/objects are colliding
     */
    collides(other) {
        return (this.x + this.w > other.x && other.x + other.w > this.x && this.y + this.h > other.y && other.y + other.h > this.y);
    }
    /**
     * 
     * @param {{x,w,y,h}} other 
     * @param {*} degrees 
     * @returns 
     */
    degreeCollides(other, degrees) {
        let otherTarget1 = other.degree - degrees / 2;
        let otherTarget2 = other.degree + degrees / 2;
        let thisDeg = atan2(this.y + this.h / 2 - other.startY, this.x + this.w / 2 - other.startX);
        return ((dist(this.x + this.w / 2, this.y + this.h / 2, other.x, other.y) < other.size) && (thisDeg > otherTarget1) && (thisDeg < otherTarget2));
    }
    /**
     * Sets the current position to a certain position
     * @param {Number} x the X position to move to
     * @param {Number} y the Y position to move to
     */
    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }
    /**
     * Updates the entity's x and y positions.
     */
    runMoveTick(Level) {
        let oldX = this.x;
        let oldY = this.y;
        let directionDistance = sqrt(this.dirx * this.dirx + this.diry * this.diry); //Distance of dirx and diry, used to get directions
        if (directionDistance != 0) {
            this.x += this.dirx * this.moveSpeed / directionDistance * min(deltaTime / 1000, 0.5);
            this.y += this.diry * this.moveSpeed / directionDistance * min(deltaTime / 1000, 0.5); //Framerate speed limited to 2 FPS to block phasing through walls
            // Accounts for distance via pythagorean theorem if there is movement.
        }
        if (Level.collides(this)) {
            // decollide
            let newX = this.x;
            let newY = this.y;
            this.x = oldX;
            this.y = oldY;
            let increment = 2;
            for (let i = 0; i < 6; i++) {
                // increments closer, seperated X and Y in smaller and smaller measurements
                this.x += (newX - oldX) / increment;
                if (Level.collides(this)) {
                    this.x -= (newX - oldX) / increment;
                }
                this.y += (newY - oldY) / increment;
                if (Level.collides(this)) {
                    this.y -= (newY - oldY) / increment;
                }
                increment *= 2;
            }
        }
    }
    /**
     * Draws the ground segment of the entity
     */
    drawGround() {
        noStroke();
        fill(50, 200, 100);
        if (this.groundImage) {
            image(this.groundImage, this.x, this.y, this.w, this.h);
        } else {
            rect(this.x, this.y, this.w, this.h);
        }
    }
    /**
     * Draws the health bar 
     * @param {Number} disx the X position to display at
     * @param {Number} disy the Y position to display at
     */
    drawHealthBar(disx, disy) {
        fill(0, 255, 0);
        rect(disx - 5, disy - 15, (this.dispw + 10) * this.health / this.maxHealth, 10);
        fill(255, 0, 0);
        rect(disx - 5 + (this.dispw + 10) * this.health / this.maxHealth, disy - 15, (this.dispw + 10) * (1 - this.health / this.maxHealth), 10);
    }
    /**
     * Draws the upright portion of the entity
     */
    draw() {
        //display after adjusting for isometric angle
        let dispDir = atan2(this.x + this.w / 2, this.y + this.w / 2);
        dispDir -= 45;
        let dispDist = dist(0, 0, this.x + this.w / 2, this.y + this.w / 2);
        let disx = sin(dispDir) * dispDist - this.dispw / 2;
        let disy = (1/ Math.sqrt(3)) * (cos(dispDir) * dispDist) - this.disph;
        push();
        if (this.destination) {
            if (this.x - this.y + this.destination.y - this.destination.x < 0) {
                this.facingLeft = true
            } else {
                this.facingLeft = false
            }
        }
        if (this.facingLeft) {
            scale(-1, 1);
            disx *= -1;
            disx -= this.dispw;
        }
        if (this.drawImage && !(this.drawImage instanceof SpriteSheet)) {
            image(this.drawImage, disx, disy, this.dispw, this.disph);
        } else {
            image(this.drawImage.getSprite(0), disx, disy, this.dispw, this.disph);
        }
        if (this.facingLeft) {
            disx += this.dispw;
            disx *= -1;
        }
        pop();
        this.drawHealthBar(disx, disy);
    }
}