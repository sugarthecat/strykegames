import Assets from "./Assets.js";
export default class Room {
    constructor(typeInt) {
        this.type = typeInt; // the type of room it is
        // initialize an empty 25x25 2D array
        this.tileTable = new Array(25).fill(undefined).map(() => new Array(25).fill(undefined));
        // choose a room type based on the passed in integer representation of the room type
        let chosenTable;
        switch (this.type) {
            case 0:
                chosenTable = Assets.rooms.initial;
                break;
            case 1:
                chosenTable = Assets.rooms.standard;
                break;
            case 2:
                chosenTable = Assets.rooms.progression;
                break;
            case 3:
                chosenTable = Assets.rooms.boss;
                break;
        }
        // choose a random index of the chosen room type
        let chosenIndex = Math.floor(Math.random() * chosenTable.length);
        // fill the empty 25x25 2D array with the tiles corresponding to the loaded csv
        for (let i = 0; i < 25; i++) {
            for (let j = 0; j < 25; j++) {
                this.tileTable[i][j] = chosenTable[chosenIndex].rows[i].arr[j];
            }
        }
    }
}