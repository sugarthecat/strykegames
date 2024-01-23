/**
 * a SpriteSheet object represents several phases of an animation, accessed by the sprites property
 */
export default class SpriteSheet {
    jsonLoaded = false; // whether the json is loaded
    /**
     * If the spritesheet image has loaded
     * @type {Boolean}
     */
    imageLoaded = false; 
    /**
     * The image from which to source the individual frames
     * @type {object.default.image}
     */
    image = null; 
    /**
     * The JSON object representing the image positions within the image
     * @type {Object}
     */
    json = null; 
    /**
     * An array of sprites
     * @type {Array}
     */
    sprites = []; // the array of individual sprites
    /**
     * Constructs the spritesheet
     * @param {String} address The location of the spritesheet
     * @param {Function} finishedLoad the function to be called upon the spritesheet loading
     */
    constructor(address, finishedLoad) {
        this.finishedLoadFunction = finishedLoad;
        let localReference = this;
        this.image = loadImage(address, function () { localReference.finishedLoadingImage() });
        let addressParts = address.split('.');
        addressParts.pop();
        let jsonAddress = addressParts.join('.') + '.json';
        this.json = loadJSON(jsonAddress, function () { localReference.finishedLoadingJSON() });
    }
    /**
     * called if JSON is finished loading. 
     */
    finishedLoadingJSON() {
        this.jsonLoaded = true;
        if (this.imageLoaded) {
            this.finishedLoadFunction();
            this.parseSprites();
        }
    }
    /**
     * called if Image is finished loading. 
     */
    finishedLoadingImage() {
        this.imageLoaded = true;
        if (this.jsonLoaded) {
            this.finishedLoadFunction();
            this.parseSprites();
        }
    }
    /**
     * Checks to see if the spritesheet is loaded
     * @returns {Boolean} If this spritesheet has loaded
     */
    isLoaded() {
        return this.jsonLoaded && this.imageLoaded;
    }
    /**
     * Assumes both JSON and Image is loaded.
     * Parses the sprites 
     */
    parseSprites() {
        this.sprites = this.json.frames;
        for (let i = 0; i < this.sprites.length; i++) {
            this.sprites[i] = this.image.get(
                this.sprites[i].frame.x,
                this.sprites[i].frame.y,
                this.sprites[i].frame.w,
                this.sprites[i].frame.h)
        }
    }
    /**
     * Gets a sprite from the spritesheet
     * @param {Number} index The index of which to get
     * @returns {p5.image} The sprite at that index
     */
    getSprite(index) {
        return this.sprites[index];
    }
    /**
     * Gets the sprite count
     * @returns {Number} The amount of sprites contained in this Spritesheet
     */
    getLength() {
        return this.sprites.length;
    }
}