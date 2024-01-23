import Tile from "../Tile.js";
export default class CollisionTile extends Tile {
    constructor(img, roofImg) {
        super(img);
        this.roofImg = roofImg;
        this.x = 0;
        this.y = 0;
        this.w = 100;
        this.h = 100;
        this.hasLeft = true; // true if wall to the bottom-left of it will display
        this.hasRight = true; // true if wall to the bottom-right of it will display
        this.hasGround = false; // true if bottom of tile will display
        this.isCollisionTile = true;
    }
    //different collision function for collisiontile subclass than default tile superclass
    collides(other) {
        return (this.x + this.w > other.x && other.x + other.w > this.x && this.y + this.h > other.y && other.y + other.h > this.y);
    }
    // Despite name, this method displays the roof since "ground" is shifted up by walls
    drawGround() {
        fill(255, 0, 0);
        image(this.roofImg, this.x - 100, this.y - 100, this.w, this.h);
    }
}  