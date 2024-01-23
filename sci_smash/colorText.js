/**
 * Represents a segment of colored text
 */
export default class ColorText {
    /**
     * The color of the ColorText
     * @type {p5.Color}
     */
    color;
    /**
     * The text content of the ColorText
     * @type {String}
     */
    content;
    /**
     * If the ColorText has a space after the content
     * @type {Boolean}
     */
    hasAfterSpace = false;
    constructor(text, r, g, b) {
        this.color = color(r, g, b)
        this.content = text
    }
    /**
     * adds a space after the text
     */
    addAfterSpace() {
        this.hasAfterSpace = true;
    }
}