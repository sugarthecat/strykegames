import Entity from "../Entity.js";
import Assets from "../Assets.js";
export default class Enemy extends Entity {
    /**
     * If the Enemy has a decollide function
     * @type {Boolean}
     */
    hasDecollideFunction = true;
    /**
     * If the Enemy is a navigationEntity
     * @type {Boolean}
     */
    isNavigationEntity = true;
    /**
     * In relation to navigation, how many tiles the equivalent is to walking through an enemy
     * @type {Number}
     */
    navigateThroughEnemyCost = 5;
    /**
     * The amount of tiles of calculated distance the enemy will move towards a player within. Increasing this number very high can hurt performance.
     * @type {Number}
     */
    viewDistance = 25;
    /**
     * The amount of damage the enemy deals upon contact with the player
     * @type {Number}
     */
    damage = 1;
    /**
     * The amount of distance the enemy must move away from the player before dealing damage again
     * @type {Number}
     */
    recoilDistance = 100;
    /**
     * If the enemy is a boss.
     * @type {Boolean}
     */
    isBoss = false;
    constructor(x = 0, y = 0) {
        super();
        this.w = 80;
        this.h = 80;
        this.x = x;
        this.y = y;
        this.dirx = 0; // 1, 0, or -1, representing direction x
        this.diry = 0; // 1,0, or -1, representing direction y
        
    }
    /**
     * Draws the upright portion of the Enemy
     */
    draw() {
        this.phase += 0.3;
        this.phase = this.phase % Assets.spritesheets[this.movement].getLength();
        this.drawImage = Assets.spritesheets[this.movement].getSprite(floor(this.phase));
        super.draw();
    }
    /**
     * Draws the ground portion of the Enemy
     */
    drawGround() {
        noStroke();
        image(Assets.images.aura, this.x, this.y, this.w, this.h);
    }
    /**
     * Called to decollide with the player.
     * @param {Player} enemy The player
     */
    decollideWithEnemy(enemy) {
        enemy.takeDamage(this.damage)
        let xdiff = enemy.x - this.x;
        let ydiff = enemy.y - this.y;
        let diffDist = dist(0, 0, xdiff, ydiff);
        let desx = enemy.x - xdiff * this.recoilDistance / diffDist
        let desy = enemy.y - ydiff * this.recoilDistance / diffDist
        this.destination = { x: desx, y: desy }
    }
    /**
     * Sets the current destination
     * @param {level} level 
     * @param {{x,y}} position 
     */
    navTowardsPosition(level, position) {
        let tfArray = []; // board of true/false 
        if (dist(position.x, position.y, this.x, this.y) > 100) {
            // If further than a tile, navigate using algorithm
            let currentX = floor(this.x / 100);
            let currentY = floor(this.y / 100);
            tfArray = level.getCollisionTileArray();
            tfArray[floor(position.x / 100)][floor(position.y / 100)] = 0;
            let change = true;
            // While things are changing on the t/f board
            let openOptions = [
                { x: floor(position.x / 100) - 1, y: floor(position.y / 100) },
                { x: floor(position.x / 100) + 1, y: floor(position.y / 100) },
                { x: floor(position.x / 100), y: floor(position.y / 100) - 1 },
                { x: floor(position.x / 100), y: floor(position.y / 100) + 1 },]
            while (openOptions.length > 0) {
                change = false;
                // check every tile
                let x = openOptions[0].x
                let y = openOptions[0].y
                if (x >= 0 && y >= 0 && x < tfArray.length && y < tfArray[x].length && tfArray[x][y] !== false) {
                    // check if each can be navigated to from a neighboring tile, or navigated via a shorter path.
                    for (let x2 = x - 1; x2 < x + 2; x2++) {
                        for (let y2 = y - 1; y2 < y + 2; y2++) {
                            if ((x2 == x || y2 == y)
                                && x2 > 0
                                && y2 > 0
                                && x2 < tfArray.length
                                && y2 < tfArray[x2].length
                                && typeof tfArray[x2][y2] != "boolean"
                                && (tfArray[x][y] === true
                                    || sqrt(abs(x - x2) * abs(x - x2) + abs(y - y2) * abs(y - y2)) + level.sharedNavCollide(x2, y2, this) * this.navigateThroughEnemyCost + tfArray[x2][y2] < tfArray[x][y])
                                && sqrt(abs(x - x2) * abs(x - x2) + abs(y - y2) * abs(y - y2)) + level.sharedNavCollide(x2, y2, this) * this.navigateThroughEnemyCost + tfArray[x2][y2] < this.viewDistance
                            ) {
                                tfArray[x][y] = tfArray[x2][y2] + dist(x, y, x2, y2) + level.sharedNavCollide(x2, y2, this) * this.navigateThroughEnemyCost;
                                change = true;
                                openOptions.push({ x: x - 1, y: y })
                                openOptions.push({ x: x + 1, y: y })
                                openOptions.push({ x: x, y: y - 1 })
                                openOptions.push({ x: x, y: y + 1 })
                            }
                        }
                    }
                }
                openOptions.shift();
            }
            for (let x = 0; x < tfArray.length; x++) {
                for (let y = 0; y < tfArray[x].length; y++) {
                    if (tfArray[x][y] === true) {
                        tfArray[x][y] = false;
                    }
                }
            }
            this.dirx, this.diry = 0;
            let minDistance = tfArray[currentX][currentY];
            let possArray = [[currentX, currentY]];
            for (let x = max(0, currentX - 1); x < min(tfArray.length, currentX + 2); x++) {
                for (let y = max(0, currentY - 1); y < min(tfArray[x].length, currentY + 2); y++) {
                    if (tfArray[x][y] < minDistance && tfArray[x][y] !== false && ((y == currentY || x == currentX))) {
                        minDistance = tfArray[x][y];
                        possArray = [[x, y]];
                    } else if (tfArray[x][y] == minDistance && tfArray[x][y] !== false && ((y == currentY || x == currentX))) {
                        possArray.push([x, y]);
                    }
                }
            }
            let choice = random(possArray);
            this.destination = { x: choice[0] * 100 + 50 - this.w / 2, y: choice[1] * 100 + 50 - this.h / 2 };
            this.d2 = { x: choice[0] * 100 + 50 - this.w / 2, y: choice[1] * 100 + 50 - this.h / 2 }
            this.lastUpdate = new Date() / 1000;
            this.tfA = tfArray;

        } else {
            this.dirx = position.x - this.x;
            this.diry = position.y - this.y;
        }
    }
    /**
     * Runs a movetick, advancing timers, and moving the enemy.
     */
    runMoveTick(Level) {

        if (this.destination) {
            this.dirx = this.destination.x - this.x;
            this.diry = this.destination.y - this.y;
            if (dist(this.destination.x, this.destination.y, this.x, this.y) < this.moveSpeed * deltaTime / 1000) {
                this.x = this.destination.x;
                this.y = this.destination.y;
                this.dirx = 0;
                this.diry = 0;
                this.destination = undefined;
            }
        }
        let oldX = this.x
        let oldY = this.y
        super.runMoveTick(Level)
        //if less than 1% of possible movement has been acheived, recalculate destination
        if (dist(oldX, oldY, this.x, this.y) < this.moveSpeed * 0.01) {
            this.destination = undefined
        }
    }
}