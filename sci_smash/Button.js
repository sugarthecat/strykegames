export default class Button {
    constructor(x, y, w, h, text, activationFunction,) {
        this.x = x; // x coordinate
        this.y = y; // y coordinate
        this.w = w; // width
        this.h = h; // height
        this.text = text; // the button's display text
        this.activationFunction = activationFunction; // a function to be executed upon the button being clicked
    }
    /**
     * Checks if the button contains a certain point
     * @param {Number} x X position of the target
     * @param {Number} y Y position of the target
     * @returns {Boolean} whether given x,y corrdinates are within the button's area
     */
    containsPoint(x, y) {
        return (this.x < x && this.w + this.x > x && this.y < y && this.h + this.y > y)
    }
    /**
     * Activates the given activation function conditionally on the given position being contained in the button
     * @param {Number} x x position of the mouse click
     * @param {Number} y y position of the mouse click
     */
    clickedAt(x, y) {
        if (this.containsPoint(x, y)) {
            this.activationFunction();
        }
    }
    /**
     * Draws the button
     */
    draw() {
        push()
        fill(0)
        rect(this.x, this.y, this.w, this.h)
        fill(255)
        textAlign(CENTER)
        textSize(45)
        text(this.text, this.x + this.w / 2, this.y + this.h / 2 + 25)
        pop()
    }
    /**
     * Draws the button, in a highlighted state
     */
    drawHover() {
        push()
        fill(200)
        rect(this.x, this.y, this.w, this.h)
        fill(0)
        textAlign(CENTER)
        textSize(45)
        text(this.text, this.x + this.w / 2, this.y + this.h / 2 + 25)
        pop()
    }
}