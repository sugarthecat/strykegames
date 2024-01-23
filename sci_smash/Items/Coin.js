import Assets from "../Assets.js";
import Item from "../Item.js"
export default class Coin extends Item {
    constructor(x,y) {
        super();
        this.x = x;
        this.y = y;
        this.text = "+1 coin"
        this.displayImage = Assets.spritesheets.coin;
    }
}