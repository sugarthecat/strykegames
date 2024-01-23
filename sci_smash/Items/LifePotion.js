import Assets from "../Assets.js";
import Item from "../Item.js"
export default class LifePotion extends Item {
    constructor() {
        super();
        this.text = "+1 max health";
        this.displayImage = Assets.spritesheets.lifepotion;
    }
}