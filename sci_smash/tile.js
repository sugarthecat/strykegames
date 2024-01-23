export default class Tile {
    constructor(img) {
        this.img = img;
        this.x = 0;
        this.y = 0;
        this.w = 100; // constant
        this.h = 100; // constant
        this.hasLeft = false; // true if wall to the bottom-left of it will display
        this.hasRight = false; // true if wall to the bottom-right of it will display
        this.hasGround = true; // true if bottom of tile will display
        this.hasRoof = false; // true if top of tile will display
        this.isCollisionTile = false; // returns whether the tile is a wall
    }
    // draws the floor of floor tiles
    drawGround() {
        image(this.img, this.x, this.y, this.w, this.h);
    }
    // returns false for collision inquiries
    collides(other) {
        return false;
    }
    // draws the right side of wall tiles
    drawRight() {
        push();
        rotate(60);
        scale(1, (1/ Math.sqrt(3)));
        rotate(-45);
        image(this.img, this.x - this.y - this.w, this.y, this.w, this.h);
        pop();
    }
    // draws the left side of wall tiles
    drawLeft() {
        push();
        rotate(-60);
        scale(1, (1/ Math.sqrt(3)));
        rotate(45);
        image(this.img, this.x - this.y, this.x, this.w, this.h);
        pop();
    }
}