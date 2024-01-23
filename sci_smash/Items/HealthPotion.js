import Assets from "../Assets.js";
import Item from "../Item.js"
export default class HealthPotion extends Item {
    constructor() {
        super();
        this.text = "+1 health"
        this.displayImage = Assets.spritesheets.healthpotion;
    }
}