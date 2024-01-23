import Enemy from "../Enemy.js"
export default class Skeleton extends Enemy {
    constructor(x, y) {
        super(x, y)
        this.recoilDistance = 250;
        this.viewDistance = 25;
        this.damage = 2;
        this.moveSpeed = 300;
        this.disph = 99;
        this.dispw = 66;
        this.setHealth(5);
        this.phase = 0;
        this.movement = "skeletonwalk";
    }
}