import Assets from "../Assets.js";
import Item from "../Item.js"
export default class Key extends Item {
    constructor() {
        super();
        this.text = "+1 key"
        this.displayImage = Assets.spritesheets.key;
    }
}