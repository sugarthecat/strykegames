
class UndergroundBunker extends Level {
    constructor(playDialogue=true) {
        super();
        this.song = Assets.music.fifty1
        this.spawnpointx = 2;
        this.spawnpointy = 1;

        let possibleSmallRooms = [];
        let smallRoomPositions = [
            { x: 1, floor: 1 },
        ]
        this.rooms = []
        for (let i = 0; i < smallRoomPositions.length; i++) {
            let roomTemplateIndex = floor(random(0,possibleSmallRooms.length))
            let pos = smallRoomPositions[i]
            this.rooms.push(new possibleSmallRooms[roomTemplateIndex](pos.x,pos.floor));
            possibleSmallRooms.splice(roomTemplateIndex, 1)
        }

        let possibleMediumRooms = [MediumMeetingRoom, MediumMeetingRoom];
        let mediumRoomPositions = [
            { x: 1, floor: 1 },
        ]
        for (let i = 0; i < mediumRoomPositions.length; i++){
            let roomTemplateIndex = floor(random(0,possibleMediumRooms.length))
            let pos = mediumRoomPositions[i]
            this.rooms.push(new possibleMediumRooms[roomTemplateIndex](pos.x,pos.floor));
            possibleMediumRooms.splice(roomTemplateIndex, 1)
        }

        let possibleLargeRooms = [MediumMeetingRoom, MediumMeetingRoom];
        let largeRoomPositions = [
            { x: 1, floor: 1 },
        ]
        for (let i = 0; i < largeRoomPositions.length; i++){
            let roomTemplateIndex = floor(random(0,possibleLargeRooms.length))
            let pos = largeRoomPositions[i]
            this.rooms.push(new possibleLargeRooms[roomTemplateIndex](pos.x,pos.floor));
            possibleLargeRooms.splice(roomTemplateIndex, 1)
        }

        let hallwayPositions = [
            { x: 0, floor: 1 },
        ]
        for (let i = 0; i < hallwayPositions.length; i++){
            let pos = hallwayPositions[i];
            this.rooms.push(new SmallHallway(pos.x, pos.floor));
        }

        this.rooms.push(new VentRoom(4, 2));
        this.rooms.push(new VentRoom(2, 3));
        let wallsPositions = [
            { x: 0, floor: 1 },
        ]
        for (let i = 0; i < wallsPositions.length; i++){
            let pos = wallsPositions[i];
            this.rooms.push(new Wall(pos.x, pos.floor));
        }

        let doorsPositions = [
            { x: 1, floor: 1 },
        ]
        for (let i = 0; i < doorsPositions.length; i++){
            let pos = doorsPositions[i];
            this.rooms.push(new Door(pos.x, pos.floor));
        }

        let floorsPositions = [
            { x: 0, floor: 0 },
        ]
        for (let i = 0; i < floorsPositions.length; i++){
            let pos = floorsPositions[i];
            this.rooms.push(new Floor(pos.x, pos.floor));
        }
        if(playDialogue){
            this.dialogue.SkipToEnd();
        }
    }
}
