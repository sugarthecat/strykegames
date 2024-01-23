export default class Item {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.w = 75;
        this.h = 75;
        this.disx;
        this.disy;
        this.displayImage;
        this.phase = 0;
        this.text = "";
        this.pickupProgress = 0;
        this.onGround = true;
    }
    /**
     * Checks if these 2 objects collide
     * @param {{x: Number, y: Number, w: Number, h: Number}} other The other object
     * @returns {Boolean} If these obejcts collide
     */
    collides(other) {
        return (this.x + this.w > other.x && other.x + other.w > this.x && this.y + this.h > other.y && other.y + other.h > this.y);
    }
    /**
     * Sets the current position
     * @param {Number} x the X position to be at
     * @param {Number} y the Y position to be at
     */
    setPosition(x, y) {
        this.x = x
        this.y = y;
    }
    /**
     * Draws the item
     */
    draw() {
        if (this.onGround) {
            this.phase += 0.25;
            this.phase = this.phase % this.displayImage.getLength();
            push();
            let dispDir = atan2(this.x + this.w / 2, this.y + this.w / 2) - 45;
            let dispDist = dist(0, 0, this.x + this.w / 2, this.y + this.w / 2);
            this.disx = sin(dispDir) * dispDist - this.w / 2;
            this.disy = (1/ Math.sqrt(3)) * (cos(dispDir) * dispDist) - this.h;
            let img = this.displayImage.getSprite(floor(this.phase));
            image(img, this.disx, this.disy, this.w, this.h);
            pop();
        }
        else {
            this.pickupProgress += deltaTime / 1000
            push();
            noStroke();
            textSize(min(width * 0.03, height * 0.04))
            textStyle(BOLD)
            textFont('Courier New');
            textAlign(CENTER)
            let size = textWidth(this.text) + 10
            let white = color(255)
            white.setAlpha((1 - this.pickupProgress) * 255)
            fill(white)
            rect(this.disx - size / 2, this.disy - textSize() - this.pickupProgress * 100, size, textSize() + 10)
            let black = color(0)
            black.setAlpha((1 - this.pickupProgress) * 255)
            fill(black)
            text(this.text, this.disx, this.disy - this.pickupProgress * 100,);
            pop();
        }
    }
    /**
     * Draws the ground portion of the item
     */
    drawGround() {
        noStroke();
        image(Assets.images.aura, this.x, this.y, this.w, this.h);
    }
    /**
     * Checks if the item can be picked up
     * @returns {Boolean} if the item can be picked up
     */
    canPickUp() {
        return this.onGround
    }
    /**
     * 
     */
    pickedUp() {
        this.onGround = false;
    }
    /**
     * 
     * @returns {Boolean} If the pickup animation has been compelted
     */
    completed() {
        return (this.pickupProgress > 1)
    }
}