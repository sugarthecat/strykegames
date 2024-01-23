import Enemy from "../Enemy.js"
export default class EvilTree extends Enemy {
    constructor(x, y) {
        super(x, y)
        this.recoilDistance = 225;
        this.viewDistance = 20;
        this.damage = 1;
        this.moveSpeed = 225;
        this.disph = 100;
        this.dispw = 125;
        this.setHealth(6);
        this.phase = 0;
        this.movement = "eviltree";
    }
}