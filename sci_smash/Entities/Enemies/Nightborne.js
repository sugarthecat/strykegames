import Enemy from "../Enemy.js"
export default class Nightborne extends Enemy {
    constructor(x, y) {
        super(x, y)
        this.recoilDistance = 150;
        this.viewDistance = 20;
        this.damage = 2;
        this.moveSpeed = 300;
        this.disph = 100;
        this.dispw = 286;
        this.setHealth(5);
        this.phase = 0;
        this.movement = "nightborne";
    }
}