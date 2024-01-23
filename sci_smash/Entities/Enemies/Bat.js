import Enemy from "../Enemy.js"
export default class Bat extends Enemy {
    constructor(x, y) {
        super(x, y)
        this.recoilDistance = 300;
        this.viewDistance = 30;
        this.damage = 1;
        this.moveSpeed = 350;
        this.disph = 75;
        this.dispw = 100;
        this.setHealth(4);
        this.phase = 0;
        this.movement = "batmove";
    }
}