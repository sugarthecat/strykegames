import Assets from "../Assets.js";
import Item from "../Item.js"
export default class Chest extends Item {
    constructor() {
        super();
        this.w = 50;
        this.h = 50;
        this.displayImage = Assets.spritesheets.chest;
    }
}