// abilities
import Chemistry from "./Abilities/Chemistry.js";
import Theology from "./Abilities/Theology.js";
import Geology from "./Abilities/Geology.js";

//game systems
import Tutorial from "./Tutorial.js";
import Camera from "./Camera.js";
import Assets from "./Assets.js";
import MusicSystem from "./MusicSystem.js";
import SaveManager from "./SaveManager.js";

//Tiles
import VoidTile from "./tileTypes/voidTile.js";
import Tile from "./Tile.js";
import CollisionTile from "./tileTypes/CollisionTile.js";

// enemies
import Frog from "./Entities/Enemies/Frog.js";
import Bat from "./Entities/Enemies/Bat.js";
import EvilTree from "./Entities/Enemies/EvilTree.js";
import Nightborne from "./Entities/Enemies/Nightborne.js";
import Skeleton from "./Entities/Enemies/Skeleton.js";
import Reaper from "./Entities/Enemies/Reaper.js";

// items
import Chest from "./Items/Chest.js";
import Key from "./Items/Key.js";
import HealthPotion from "./Items/HealthPotion.js";
import Coin from "./Items/Coin.js";
import LifePotion from "./Items/LifePotion.js";

// misc
import Player from "./Entities/Player.js";
import TextBox from "./TextBox.js";
import Room from "./Room.js";

/**
 * Represents the game portion of ScienceSmash, with segments to run everything needed.
 * 
 * Static class, do not instantiate
 */
export default class Level {
    static tiles = [[]]; // 2D array of all the tiles displayed in a level
    static lvl = 0; // integer representation of what level the player is on
    static targetRotation = 0; // rotation amount for spinning target
    static spawn; // the players spawn location
    static player = new Player(); // initialize the player
    static entities = []; // array of all the entities in a level
    static items = []; // array of all the items in a level
    static background = 0; // background image to be displayed behind the level ('0' for black until the tutorial is completed)
    static theme = Math.floor(Math.random() * 6); // int 0 1 or 2 of what theme the tiles will be
    static portalTile; // x,y,w,h,boss(boolean of whether a boss enemy is spawned in the level),activated(boolean of whether the portal is displayed),phase(of animation)
    static enemiesKilled = 0; // amount of enemies killed
    static totalEnemyCount = 0; // amount of total enemies within the level
    static newAbility = new Chemistry(); // a new ability to be offered to the player on levels divisible by 5
    static warningTextBox = false; // text box displayed at beginning of every level displaying level and amount of rooms
    static finished = false; // boolean of whether the level is finished
    /**
     * restarts the game at level 1
     */
    static restartGame() {
        this.lvl = 0;
        this.player = new Player();
        this.finishLevel();
        SaveManager.saveGame();
    }
    /**
     * Resets the theme of the level randomly
     */
    static generateTheme() {
        this.theme = Math.floor(Math.random() * 6);
    }
    /**
     * Randomly selects a background
     */
    static generateBackground() {
        this.background = Assets.backgrounds[Math.floor(Math.random() * Assets.backgrounds.length)];
    }
    /**
     * scales enemies strength based on the level
     */
    static scaleEnemyStrength() {
        let scaleAmount = this.lvl * .05;
        for (let i = 0; i < this.entities.length; i++) {
            this.entities[i].setMaxHealth(this.entities[i].getMaxHealth() + min(scaleAmount, 20));
            this.entities[i].setDamage(this.entities[i].getDamage() + min(scaleAmount / 2, 15));
            this.entities[i].setMovementSpeed(this.entities[i].getMovementSpeed() + min(scaleAmount * 3, 700));
            if (this.entities[i].isBoss) { // boss enemies are scaled to be much stronger than other enemies
                this.entities[i].setMaxHealth(this.entities[i].getMaxHealth() + min(scaleAmount, 100));
                this.entities[i].setDamage(this.entities[i].getDamage() + scaleAmount);
            }
            this.entities[i].setHealth(this.entities[i].getMaxHealth());
        }
    }
    /**
     * spawns enemies and items into the level
     */
    static spawnEnemiesAndItems() {
        //enemies
        this.totalEnemyCount = min((this.lvl * 2), 30);
        let validSpawnLocations = [];
        let enemiesToSpawn = [];
        for (let x = 0; x < this.tiles.length; x++) {
            for (let y = 0; y < this.tiles[x].length; y++) {
                if (dist(x * 100, y * 100, this.player.x, this.player.y) > 1000 && !(this.tiles[x][y] instanceof CollisionTile || this.tiles[x][y] instanceof VoidTile)) {
                    validSpawnLocations.push(this.tiles[x][y]);
                }
            }
        }
        if (this.portalTile.boss) { this.totalEnemyCount++; }
        for (let i = 0; i < this.totalEnemyCount; i++) {
            let ran = Math.floor(Math.random() * 6);
            switch (ran) {
                case 0:
                    enemiesToSpawn.push(new Frog());
                    break;
                case 1:
                    enemiesToSpawn.push(new Bat());
                    break;
                case 2:
                    enemiesToSpawn.push(new Skeleton());
                    break;
                case 3:
                    enemiesToSpawn.push(new Reaper());
                    break;
                case 4:
                    enemiesToSpawn.push(new Nightborne());
                    break;
                case 5:
                    enemiesToSpawn.push(new EvilTree());
                    break;
            }
        }
        if (this.portalTile.boss) { enemiesToSpawn[enemiesToSpawn.length - 1].isBoss = true; }
        while (enemiesToSpawn.length > 0 && validSpawnLocations.length > 0) {
            let newLoc = validSpawnLocations.splice(Math.floor(validSpawnLocations.length * Math.random()), 1)[0];
            let newEnemy = enemiesToSpawn.pop();
            newEnemy.setPosition(newLoc.x, newLoc.y);
            this.entities.push(newEnemy);
            this.scaleEnemyStrength();
        }
        //items
        let itemsToSpawn = [];
        for (let i = 0; i < this.items.length; i++) {
            itemsToSpawn.push(this.items[i]);
        }
        while (itemsToSpawn.length > 0 && validSpawnLocations.length > 0) {
            let newLoc = validSpawnLocations.splice(Math.floor(validSpawnLocations.length * Math.random()), 1)[0];
            let newItem = itemsToSpawn.pop();
            newItem.setPosition(newLoc.x, newLoc.y);
        }
    }
    /**
     * generates the level's item array to later be spawned into the room
     */
    static generateItems() {
        let itemTypes = [1, 2, 3]; // 33% chance for health potion, 33% chance for key, 33% chance for chest
        let amountOfItems = (Math.ceil(this.lvl)) + (Math.floor(Math.random() * 10));
        let previousItem = 0;
        for (let i = 0; i < amountOfItems; i++) {
            let item = itemTypes[Math.floor(Math.random() * 3)];
            if (item == previousItem) {
                i--;
            } else {
                previousItem = item;
                this.items.push(item);
            }
        }
        if (this.lvl % 5 == 0) { // If its a fifth level (boss level), push an additional 2 items
            this.items.push(itemTypes[Math.floor(Math.random() * 3)], itemTypes[Math.floor(Math.random() * 3)]);
        }
        for (let i = 0; i < this.items.length; i++) {
            switch (this.items[i]) {
                case 1:
                    this.items[i] = new HealthPotion();
                    break;
                case 2:
                    this.items[i] = new Key();
                    break;
                case 3:
                    this.items[i] = new Chest();
                    break;
            }
        }
    }
    /**
     * Gets current player score
     * @returns {Number} Player score
     */
    static getScore() {
        return ((this.lvl * 10) + (this.player.coins * 5) + (this.enemiesKilled * 3))
    }
    /**
     * Interacts with items 
     */
    static interactItems() {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].collides(this.player) && this.items[i].canPickUp()) {
                if (this.items[i] instanceof LifePotion) {
                    this.player.setMaxHealth(this.player.getMaxHealth() + 1);
                    this.player.heal(1);
                    this.items[i].pickedUp();
                } else if (this.items[i] instanceof Key) {
                    this.player.foundKey();
                    this.items[i].pickedUp();
                } else if (this.items[i] instanceof Coin) {
                    this.player.foundCoin();
                    this.items[i].pickedUp();
                }
                if (this.items[i] instanceof Chest) {
                    if (this.player.getKeys() > 0) {
                        let itemTypes = [new LifePotion(), new HealthPotion(), new Coin()];
                        let newItem = itemTypes[Math.floor(Math.random() * 3)]
                        newItem.setPosition(this.items[i].x - 10, this.items[i].y - 10)
                        this.items[i] = newItem;
                        this.player.useKey();
                    }
                } else if (this.items[i] instanceof HealthPotion) {
                    if (this.player.getHealth() != this.player.getMaxHealth()) {
                        this.player.heal(1);
                        this.items[i].pickedUp();
                    }
                }
            }
            if (this.items[i].completed()) {
                this.items.splice(i, 1)
                i--;
            }
        }
    }
    /**
     * Draws system display textbox, which shows level number at start of levels
     */
    static drawWarning() {
        if (this.warningTextBox instanceof TextBox) {
            this.warningTextBox.draw();
        }
    }
    /**
     * Increments the current level variable
     */
    static incrementLvl() {
        this.lvl++;
    }
    // loads the tutorial room
    static loadTutorialRoom() {
        let tileTable = []
        for (let i = 0; i < Assets.rooms.tutorial.rows.length; i++) {
            tileTable.push([]);
            for (let j = 0; j < Assets.rooms.tutorial.rows[i].arr.length; j++) {
                tileTable[i].push(Assets.rooms.tutorial.rows[i].arr[j]);
            }
        }
        for (var x = 0; x < tileTable.length; x++) {
            for (var y = 0; y < tileTable[x].length; y++) {
                switch (tileTable[x][y]) {
                    case "w": // Wall
                        this.addTile(new CollisionTile(Assets.images.walls["theme" + this.theme][Math.floor(Math.random() * 2)], Assets.images.roofs["theme" + this.theme][Math.floor(Math.random() * 2)]), x, y);
                        break;
                    case "p": // Portal
                        this.portalTile = { x: x * 100, y: y * 100, w: 100, h: 100, boss: (tileTable[x][y] == "b"), activated: false, phase: 0 };
                    case "g": // Ground 
                        this.addTile(new Tile(Assets.images.floors["theme" + this.theme][Math.floor(Math.random() * 4)]), x, y);
                        break;
                }
            }
        }
        this.player.setPosition(1200, 1200);
    }
    /**
     * Procedurally generates the level's tile map
     */
    static generateLevel() {
        // layout of the level in regard to the rooms
        // First array = x-axis/horizontal position
        // Second array = y-axis/vertical position
        let layout = [[new Room(0)]];

        let tileTable = [];
        let LP = [[0, 0]]; // an array of all the rooms' x and y positions in the layout
        let rooms = []; // an array of all the rooms to be generated in the layout (starts with initial room at 0,0)
        this.roomCount = min(floor(this.lvl * .25), 5);
        for (let i = 0; i < this.roomCount; i++) {
            rooms.push(new Room(1)); // Randomly push one of the main room types
        }
        if (this.lvl % 5 == 0) { // If its a fifth level, push a boss room
            rooms.push(new Room(3));
        } else { // Otherwise, push a normal progression room
            rooms.push(new Room(2));
        }
        for (let i = 0; i < rooms.length; i++) {
            let dir = Math.floor(Math.random() * 4); // 0N 1E 2S 3W
            let b = Math.floor(Math.random() * LP.length);
            let branchx = LP[b][0]; // A randomly selected already placed room's x axis in the layout array
            let branchy = LP[b][1]; // A randomly selected already placed room's y axis in the layout array
            switch (dir) {
                case 0: // North
                    if (branchy == 0) {
                        for (let j = 0; j < layout.length; j++) { layout[j].unshift(undefined); }
                        for (let j = 0; j < LP.length; j++) { LP[j][1]++; } // Update the branch's layout array position in the LP array 
                        branchy++;
                    }
                    if (layout[branchx][branchy - 1] === undefined) {
                        layout[branchx][branchy - 1] = rooms[i];
                        LP.push([branchx, branchy - 1]);
                    } else {
                        i--;
                        continue;
                    }
                    break;
                case 1: // East
                    if (branchx + 1 == layout.length) { layout.push(new Array(layout[0].length).fill(undefined)); }
                    if (layout[branchx + 1][branchy] === undefined) {
                        layout[branchx + 1][branchy] = rooms[i];
                        LP.push([branchx + 1, branchy]);
                    } else {
                        i--;
                        continue;
                    }
                    break;
                case 2: // South
                    if (branchy + 1 == layout[0].length) {
                        for (let j = 0; j < layout.length; j++) { layout[j].push(undefined); }
                    }
                    if (layout[branchx][branchy + 1] === undefined) {
                        layout[branchx][branchy + 1] = rooms[i];
                        LP.push([branchx, branchy + 1]);
                    } else {
                        i--;
                        continue;
                    }
                    break;
                case 3: // West
                    if (branchx == 0) {
                        layout.unshift(new Array(layout[0].length).fill(undefined));
                        for (let j = 0; j < LP.length; j++) { LP[j][0]++; }
                        branchx++;
                    }
                    if (layout[branchx - 1][branchy] === undefined) {
                        layout[branchx - 1][branchy] = rooms[i];
                        LP.push([branchx - 1, branchy]);
                    } else {
                        i--;
                        continue;
                    }
                    break;
            }
        }
        // Close the holes in the level
        for (let i = 0; i < layout.length; i++) { // position on the y axis of layout array
            for (let j = 0; j < layout[i].length; j++) { // position on the x axis of layout array
                if (layout[i][j] instanceof Room) {
                    if (i == 0 || !(layout[i - 1][j] instanceof Room)) { // top
                        for (let k = 11; k < 14; k++) { layout[i][j].tileTable[k][0] = "w"; } // seal north wall
                    }
                    if (j == layout[i].length - 1 || !(layout[i][j + 1] instanceof Room)) { // right
                        for (let k = 11; k < 14; k++) { layout[i][j].tileTable[24][k] = "w"; } // seal east wall
                    }
                    if (i == layout.length - 1 || !(layout[i + 1][j] instanceof Room)) { // bottom
                        for (let k = 11; k < 14; k++) { layout[i][j].tileTable[k][24] = "w"; } // seal south wall
                    }
                    if (j == 0 || !(layout[i][j - 1] instanceof Room)) { // left
                        for (let k = 11; k < 14; k++) { layout[i][j].tileTable[0][k] = "w"; } // seal west wall
                    }
                }
            }
        }
        // Build the tileTable
        for (let i = 0; i < layout[0].length; i++) { // position on the y axis of layout array
            for (let r = 0; r < 25; r++) { // position on the y axis of the csv array
                let row = [];
                for (let j = 0; j < layout.length; j++) { // position on the x axis of the layout array
                    for (let c = 0; c < 25; c++) { // position on the x axis of the csv array
                        if (layout[j][i] !== undefined) {
                            row.push(layout[j][i].tileTable[r][c]);
                        } else {
                            row.push("v");
                        }
                    }
                }
                tileTable.push(row);
            }
        }
        // Set the player's starting position to the middle of the initial room
        for (let x = 0; x < layout.length; x++) {
            for (let y = 0; y < layout[x].length; y++) {
                if (layout[x][y] !== undefined && layout[x][y].type == 0) {
                    this.spawn = [y * 2500 + 1250, x * 2500 + 1250];
                    this.player.setPosition(this.spawn[0], this.spawn[1]);
                }
            }
        }
        // generate full tile table
        for (var x = 0; x < tileTable.length; x++) {
            for (var y = 0; y < tileTable[x].length; y++) {
                switch (tileTable[x][y]) {
                    case "w": // Wall
                        this.addTile(new CollisionTile(Assets.images.walls["theme" + this.theme][Math.floor(Math.random() * 2)], Assets.images.roofs["theme" + this.theme][Math.floor(Math.random() * 2)]), x, y);
                        break;
                    case "b": // Boss
                    case "p": // Portal
                        this.portalTile = { x: x * 100, y: y * 100, w: 100, h: 100, boss: (tileTable[x][y] == "b"), activated: false, phase: 0 };
                    case "g": // Ground 
                        this.addTile(new Tile(Assets.images.floors["theme" + this.theme][Math.floor(Math.random() * 4)]), x, y);
                        break;
                    case "v": // Void 
                        this.addTile(new VoidTile(), x, y);
                        break;
                    default: // unkown tile type
                        console.error("Unkown tile type found at: tileTable[" + x + "][" + y + "]");
                        break;
                }
            }
        }
        // spawn the enemies and items
        this.spawnEnemiesAndItems();
    }
    // returns a random ability
    static getRandomAbility() {
        let ability;
        switch (Math.floor(Math.random() * 3)) {
            case 0:
                ability = new Chemistry();
                break;
            case 1:
                ability = new Theology();
                break;
            case 2:
                ability = new Geology();
                break;
        }
        if (ability.constructor === this.player.specialAbility.constructor) {
            ability = this.getRandomAbility();
        }
        return ability;
    }
    // finishes the level, and sets up the next one. called when the player goes through a portal.
    static finishLevel() {
        if (Tutorial.isComplete()) { this.finished = true; }
        if (!Tutorial.isComplete()) {
            Tutorial.complete();
            MusicSystem.switchAudio('game');
        }
        this.entities = [];
        this.items = [];
        Assets.sound.gothroughportal.setVolume(MusicSystem.getVolume())
        Assets.sound.gothroughportal.play();
        this.incrementLvl();
        this.generateBackground();
        this.generateTheme();
        this.generateItems()
        this.tiles = [[]];
        this.generateLevel();
        Camera.setPositionAs(this.player);
        this.warningTextBox = new TextBox("{255,255,255}Level " + this.lvl + "\\(" + (this.roomCount + 2) + " rooms)", 10);
        this.warningTextBox.textSize = 0.5;
    }
    // tests for whether the level is completed. if it is, the finishLevel method is called, and the game is saved to the database
    static testLevelCompletion() {
        if (this.entities.length < this.totalEnemyCount / 4) {
            if (!this.portalTile.boss) {
                if (!this.portalTile.activated) {
                    Assets.sound.portalopen.setVolume(MusicSystem.getVolume())
                    Assets.sound.portalopen.play();
                }
                this.portalTile.activated = true;
                this.drawPortal();
            }
        }
        if (this.player.collides(this.portalTile) && this.portalTile.activated) {
            this.finishLevel();
            SaveManager.saveGame();
        }
    }
    // draws the portal
    static drawPortal() {
        this.portalTile.phase += 0.1;
        this.portalTile.phase = this.portalTile.phase % Assets.spritesheets.portal.getLength();
        push();
        let dispDir = atan2(this.portalTile.x + this.portalTile.w / 2, this.portalTile.y + this.portalTile.w / 2) - 45;
        let dispDist = dist(0, 0, this.portalTile.x + this.portalTile.w / 2, this.portalTile.y + this.portalTile.w / 2);
        let disx = sin(dispDir) * dispDist - this.portalTile.w / 2;
        let disy = (1 / Math.sqrt(3)) * (cos(dispDir) * dispDist) - this.portalTile.h;
        image(Assets.spritesheets.portal.getSprite(floor(this.portalTile.phase)), disx, disy, this.portalTile.w, this.portalTile.h);
        pop();
    }
    // spawns the tutorial enemy
    static spawnTutorialEnemy() {
        if (this.player.x + this.player.w / 2 > 1250) {
            this.entities.push(new Frog(100, 1200));
        } else {
            this.entities.push(new Frog(2300, 1200));
        }
        this.entities[0].setDamage(0);
        this.totalEnemyCount = 1;
    }
    // opens the tutorial's corridor after the player learns the controls
    static openTutorialCorridor() {
        for (let x = 9; x < 16; x++) { for (let y = 24; y < 42; y++) { this.addTile(new Tile(Assets.images.floors["theme" + this.theme][Math.floor(Math.random() * Assets.images.floors["theme" + this.theme].length)]), x, y); } }
        for (let y = 24; y < 41; y++) { this.tiles[8][y].hasLeft = true; }
    }
    // returns an array of all the collision tiles
    static getCollisionTileArray() {
        let outArray = [];
        for (let i = 0; i < this.tiles.length; i++) {
            outArray.push([]);
            for (let j = 0; j < this.tiles[i].length; j++) {
                outArray[i].push(!(this.tiles[i][j].isCollisionTile));
            }
        }
        return outArray;
    }
    // draws the heads up display
    static drawHUD() {
        if (this.portalTile.activated) {
            this.drawPortalArrow()
        }
        this.drawPlayerReloadTimer();
        this.drawWarning();
        this.drawStats();
    }
    static drawPortalArrow() {
        push()
        noFill()
        strokeWeight(25)
        let dispDir = atan2(this.portalTile.x + this.portalTile.w / 2, this.portalTile.y + this.portalTile.w / 2) - 45;
        let dispDist = dist(0, 0, this.portalTile.x + this.portalTile.w / 2, this.portalTile.y + this.portalTile.w / 2);
        let end = {
            x: sin(dispDir) * dispDist - this.portalTile.w / 2,
            y: (1 / Math.sqrt(3)) * (cos(dispDir) * dispDist) - this.portalTile.h
        }
        end.x -= Camera.x
        end.y -= Camera.y
        end.x *= Camera.worldScale
        end.y *= Camera.worldScale
        end.x += this.portalTile.w / 2
        end.y += this.portalTile.h / 2
        let start = {
            x: width / 2,
            y: height / 2
        }
        let portalPos = {
            x: end.x,
            y: end.y,
        }
        let c = color(255, 206, 92)
        c.setAlpha(150)
        stroke(c)
        let arrowDir = atan2((end.y - start.y) / height, (end.x - start.x) / width)
        end.x = cos(arrowDir) * width / 2 + width / 2
        end.y = sin(arrowDir) * height / 2 + height / 2
        start.x = cos(arrowDir) * width / 3 + width / 2
        start.y = sin(arrowDir) * height / 3 + height / 2
        let startEndDistance = dist(start.x,start.y,end.x,end.y)
        let startDistance = dist(start.x,start.y,width/2,height/2)
        let arrowSize = min(width/20,height/10)
        if (dist(start.x, start.y, portalPos.x, portalPos.y) < dist(start.x, start.y, end.x, end.y)) {
            end.x = portalPos.x
            end.y = portalPos.y
            arrowSize *= dist(start.x,start.y,end.x,end.y)/startEndDistance
            startEndDistance = dist(start.x,start.y,end.x,end.y)
        }
        if (dist(start.x, start.y, width / 2, height / 2) < dist(width / 2, height / 2, end.x, end.y) &&
            dist(end.x, end.y, portalPos.x, portalPos.y) < dist(portalPos.x, portalPos.y, start.x, start.y)
        ) {
            translate(width/2,height/2)
            rotate( atan2((height/2 - portalPos.y) , (width/2 - portalPos.x) ) + 90)
            
            image(Assets.images.arrow,-arrowSize/2,startDistance,arrowSize,startEndDistance)
        }
        pop()
    }
    // draws the player's stats in the bottom right of the screen
    static drawStats() {
        let squareSize = min(width * 0.1, height * 0.1);
        push();
        fill(150, 150, 150, 100);
        rect(width - 5 - squareSize * 3, height - squareSize - 10, squareSize * 2 - 5, squareSize);
        textSize(squareSize * 0.25);
        fill(25);
        //health
        image(Assets.spritesheets.healthpotion.getSprite(0), width - squareSize * 3, height - squareSize,squareSize*0.2,squareSize*0.2)
        text(floor(this.player.getHealth()) + "/" + floor(this.player.getMaxHealth()), width - squareSize * 2.7, height - squareSize * 0.80);
        //coins
        image(Assets.spritesheets.coin.getSprite(0), width - squareSize * 3, height - squareSize * 0.75,squareSize*0.2,squareSize*0.2)
        text(this.player.getCoins(), width - squareSize * 2.7, height - squareSize * 0.55);
        //keys
        image(Assets.spritesheets.key.getSprite(0), width - squareSize * 3, height - squareSize * 0.50,squareSize*0.2,squareSize*0.2)
        text(this.player.getKeys(), width - squareSize * 2.7, height - squareSize * 0.30);
        pop();
    }
    // draws the player's ability cooldown timer in the bottom right of the screen
    static drawPlayerReloadTimer() {
        let squareSize = min(width * 0.1, height * 0.1);
        image(Assets.images[this.player.specialAbility.text + "Icon"], width - 10 - squareSize, height - squareSize - 10, squareSize, squareSize)
        if (!this.player.specialAbility.canActivate()) {
            push()
            fill(150, 150, 150, 150)
            rect(width - 10 - squareSize, height - squareSize - 10, squareSize, squareSize)
            pop()
            fill(255);
            arc(
                width - 10 - squareSize / 2,
                height - 10 - squareSize / 2,
                squareSize - 10,
                squareSize - 10,
                -90,
                -90 + 360 * this.player.specialAbility.getCooldownProgress()
            );
        }
    }
    // This method is used in entity navigation
    static generateNavCollideArray() {
        this.navigationTiles = [];
        for (let x = 0; x < this.tiles.length; x++) {
            this.navigationTiles.push([]);
            for (let y = 0; y < this.tiles[x].length; y++) {
                this.navigationTiles[x].push([]);
            }
        }
        for (let i = 0; i < this.entities.length; i++) {
            for (let x = floor(this.entities[i].x / 100); x < (this.entities[i].x + this.entities[i].w) / 100; x++) {
                for (let y = floor(this.entities[i].y / 100); y < (this.entities[i].y + this.entities[i].h) / 100; y++) {
                    this.navigationTiles[x][y].push(this.entities[i]);
                }
            }
        }
    }
    // This method is used in entity navigation
    static sharedNavCollide(x, y, entity) {
        if (this.navigationTiles[x][y].length > 0) {
            return !(this.navigationTiles[x][y][0] == entity && this.navigationTiles[x][y].length == 1);
        }
        return false;
    }
    //run everything the player needs to run during a tick
    static runPlayerMovement() {
        this.player.runMoveTick(this);
        if (this.warningTextBox instanceof TextBox) {
            if (this.warningTextBox.totalShown > 100) {
                this.warningTextBox = undefined
            } else {
                this.warningTextBox.advanceText();
            }
        }
    }
    // runs the dealDamage(function) for all of the player's active attacks
    static runDamage() {
        let attacks = this.player.getAttacks();
        for (let i = 0; i < attacks.length; i++) {
            this.dealDamage(attacks[i]);
        }
    }
    // adds a tile to the tile array
    static addTile(t, x, y) {
        if (x < 0 || y < 0) {
            console.error('error: attempt to add tile out of bounds')
        }
        let tile = t;
        tile.x = x * 100;
        tile.y = y * 100;
        while (x >= this.tiles.length) {
            this.tiles.push([]);
        }
        while (y >= this.tiles[x].length) {
            this.tiles[x].push(null);
        }
        this.tiles[x][y] = tile;
    }
    // returns an array of the level's tiles
    static getTiles() {
        return this.tiles;
    }
    // for performance reasons, walls behind other walls are removed since aren't in view and don't play a part in the game
    static removeFalseWalls() {
        for (let x = 0; x < this.tiles.length - 1; x++) {
            for (let y = 0; y < this.tiles[x].length - 1; y++) {
                if (this.tiles[x][y].hasLeft && this.tiles[x + 1][y].hasLeft) {
                    this.tiles[x][y].hasLeft = false;
                }
                if (this.tiles[x][y].hasRight && this.tiles[x][y + 1].hasRight) {
                    this.tiles[x][y].hasRight = false;
                }
            }
        }
    }
    // draws the floor
    static drawFloor() {
        push();
        // Vertically scale and rotate tiles in order to make isometric viewpoint
        scale(1, (1 / Math.sqrt(3)));
        rotate(45);
        // call function "displayGround" for all items in 2d array tiles where hasGround is true
        for (let x = 0; x < this.tiles.length; x++) {
            for (let y = 0; y < this.tiles[x].length; y++) {
                if (this.tiles[x][y].hasGround && dist(this.tiles[x][y].x, this.tiles[x][y].y, this.player.x, this.player.y) < max(width * 1.5, height * 1.5)) {
                    this.tiles[x][y].drawGround();
                }
            }
        }
        this.player.drawGround();
        this.drawTarget();
        for (let i = 0; i < this.entities.length; i++) {
            this.entities[i].drawGround();
        }
        pop();
    }
    // returns an object of all objects that need to be drawn in the level
    static getObjectsToDraw() {
        let objectsToDraw = []
        objectsToDraw.push(this.player)
        let projectiles = this.player.getAbilityProjectiles()
        for (let i = 0; i < projectiles.length; i++) {
            objectsToDraw.push(projectiles[i])
        }
        for (let i = 0; i < this.entities.length; i++) {
            objectsToDraw.push(this.entities[i])
        }
        for (let i = 0; i < this.items.length; i++) {
            objectsToDraw.push(this.items[i])
        }
        objectsToDraw.sort(function (a, b) { return (a.x + a.y - b.x - b.y) })
        return objectsToDraw
    }
    // draws the walls
    static drawWalls() {
        let objectsToDraw = this.getObjectsToDraw();
        objectsToDraw.sort((o1, o2) => (o1.x + o1.y + o1.w) - (o2.x + o2.y + o2.w))
        for (let d = 0; d < this.tiles.length + this.tiles[0].length; d++) {
            for (let p = 0; p <= d; p++) {
                let x = d - p;
                let y = p;
                while ( objectsToDraw.length > 0 && (x + y + 1) * 100 > objectsToDraw[0].x + objectsToDraw[0].w + objectsToDraw[0].y) {
                    objectsToDraw[0].draw();
                    objectsToDraw.shift()
                }
                if (x < this.tiles.length && y < this.tiles[x].length) {
                    if (this.tiles[x][y] instanceof CollisionTile && dist(this.tiles[x][y].x, this.tiles[x][y].y, this.player.x, this.player.y) < max(width * 1.5, height * 1.5)) {
                        push();
                        scale(1, (1 / Math.sqrt(3)));
                        rotate(45);
                        this.tiles[x][y].drawGround();
                        pop();
                    }
                    if (this.tiles[x][y].hasLeft && dist(this.tiles[x][y].x, this.tiles[x][y].y, this.player.x, this.player.y) < max(width * 1.5, height * 1.5)) {
                        push();
                        this.tiles[x][y].drawLeft()
                        pop();
                    }
                    if (this.tiles[x][y].hasRight && dist(this.tiles[x][y].x, this.tiles[x][y].y, this.player.x, this.player.y) < max(width * 1.5, height * 1.5)) {
                        push();
                        this.tiles[x][y].drawRight();
                        pop();
                    }
                }
            }
        }

    }
    // makes all the level's enemies move
    static runEntityMovement() {
        this.generateNavCollideArray()
        for (let i = 0; i < this.entities.length; i++) {
            if (this.entities[i].isNavigationEntity && this.entities[i].destination === undefined) {
                this.entities[i].navTowardsPosition(this, this.player)
            }
            this.entities[i].runMoveTick(this);
            if (this.entities[i].collides(this.player) && this.entities[i].hasDecollideFunction) {
                this.entities[i].decollideWithEnemy(this.player)
            }
        }
    }
    // Returns whether an object collides with anything on the level, given it has an x, y, w, and h property
    static collides(other, ignore = "default") {
        // If improper object properties, pass an error.
        if (typeof other.x != "number" || typeof other.y != "number" || typeof other.w != "number" || typeof other.h != "number") {
            console.error("Other object inserted into collides function of level must have type number attributes for x, y, w, and h");
        }
        if (other.x < 0 || other.y < 0 || other.x + other.w > this.tiles.length * 100 || other.h + other.y > this.tiles[0].length * 100) {
            return true
        }
        // If colliding with any tiles, return true
        for (let x = floor(other.x / 100); x <= min(floor((other.x + other.w) / 100), this.tiles.length - 1); x++) {
            for (let y = floor(other.y / 100); y <= min(floor((other.y + other.h) / 100), this.tiles[x].length - 1); y++) {
                if (this.tiles[x][y].isCollisionTile && this.tiles[x][y].collides(other)) {
                    return true;
                }
            }
        }
        // If colliding with any entities, return ture
        for (let i = 0; i < this.entities.length; i++) {
            if (this.entities[i] != other && this.entities[i] != ignore && this.entities[i].collides(other)) {
                return true;
            }
        }
        return false;
    }
    // returns the projected x and y values of the mouse
    static getProjectedMouseXY() {
        let disx = (mouseX / Camera.worldScale + Camera.x)
        let disy = (mouseY / Camera.worldScale + Camera.y)
        disy /= (1 / Math.sqrt(3))
        let xydist = dist(disx, disy, 0, 0)
        let targetAngle = atan2(disx, disy) + 45
        disx = sin(targetAngle) * xydist
        disy = cos(targetAngle) * xydist
        let currentDist = min(dist(disx, disy, this.player.x, this.player.y), 750)
        let currentAngle = atan2(disx - this.player.x, disy - this.player.y)

        disx = sin(currentAngle) * currentDist + this.player.x
        disy = cos(currentAngle) * currentDist + this.player.y
        return [disx, disy];
    }
    // updates the position of the player's attack target
    static updateTargetPosition() {
        this.targetRotation += 1.5
        let [dx, dy] = this.getProjectedMouseXY();
        this.targetx = dx
        this.targety = dy
    }
    // draws the target
    static drawTarget() {
        push()
        translate(this.targetx, this.targety)
        rotate(this.targetRotation)
        image(Assets.images.target, -100, -100, 200, 200)
        pop()
    }
    // activates the player's basic attack
    static activateBasicAttack() {
        let [disx, disy] = this.getProjectedMouseXY();
        this.player.activateBaseAbility(disx, disy);
    }
    // activates the player's special attack
    static activateSpecialAttack() {
        let [disx, disy] = this.getProjectedMouseXY();
        this.player.activateSpecialAbility(disx, disy);
    }
    //accepts shapes: cone, square, circle, halfcircle, and "" (for if the ability does no damage)
    //x, y represent middle of shape.
    static dealDamage(attack) { // x,y,size,shape="point",damage
        let doesDamagefunction;
        switch (attack.shape) {
            case "square":
                doesDamagefunction = function (enemy) { return enemy.collides({ x: attack.x, y: attack.y, w: attack.size, h: attack.size }); }
                break;
            case "cone":
                doesDamagefunction = function (enemy) { return enemy.degreeCollides(attack, 30); }
                break;
            case "circle":
                doesDamagefunction = function (enemy) { return dist(enemy.x + enemy.w / 2, enemy.y + enemy.h / 2, attack.x, attack.y) < attack.size; }
                break;
            case "halfcircle":
                doesDamagefunction = function (enemy) { return enemy.degreeCollides(attack, 180); }
                break;
            case "":
                doesDamagefunction = function (enemy) { return false; }
                break;
        }
        // if any entities within the level are colliding with the ability's attack area, they take damage
        for (let i = 0; i < this.entities.length; i++) {
            if (doesDamagefunction(this.entities[i])) {
                this.entities[i].takeDamage(attack.damage);
                if (this.entities[i].health <= 0) { // if the enemy's health reaches 0, they die
                    if (Math.random() * 1 < 0.3) { this.items.push(new Coin(this.entities[i].x, this.entities[i].y)); }
                    if (this.entities[i].isBoss) {
                        for (let j = 0; j < 10; j++) { this.items.push(new Coin(this.entities[i].x, this.entities[i].y)); }
                        this.portalTile.boss = false;
                    }
                    this.entities.splice(i, 1);
                    i--;
                    this.enemiesKilled++;
                }
            }
        }
    }
}