import Enemy from "../Enemy.js"
export default class Reaper extends Enemy {
    constructor(x, y) {
        super(x, y)
        this.recoilDistance = 100;
        this.viewDistance = 20;
        this.damage = 3;
        this.moveSpeed = 275;
        this.disph = 100;
        this.dispw = 100;
        this.setHealth(4);
        this.phase = 0;
        this.movement = "reaperfloat";
    }
}