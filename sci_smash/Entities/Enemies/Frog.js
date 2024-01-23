import Enemy from "../Enemy.js"
export default class Frog extends Enemy {
    constructor(x, y) {
        super(x, y)
        this.recoilDistance = 200;
        this.viewDistance = 25;
        this.damage = 0.75;
        this.moveSpeed = 300;
        this.disph = 100;
        this.dispw = 100;
        this.setHealth(6);
        this.phase = 0;
        this.movement = "froghop";
    }
}