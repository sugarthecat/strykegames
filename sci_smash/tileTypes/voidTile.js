import Tile from "../Tile.js";
export default class VoidTile extends Tile {
    constructor() {
        super(undefined)
    }
    drawGround() {
    }
    drawRight() {
    }
    drawLeft() {
    }
    collides(other) {
        return false;
    }
}