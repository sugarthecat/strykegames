

class Skyscraper extends Level {
    constructor(playDialogue=true) {
        super(Assets.music.entergoo, new SkyscraperDialogue());
        this.rooms = []

        this.rooms.push(new MediumHelipad(1, 8));
        this.rooms.push(new EscapeRoom(4,8));

        let possibleSmallRooms = [SmallCafeteria, SmallOffice, SmallOffice, SmallOffice];

        this.spawnpointx = 2;
        this.spawnpointy = 7;
        this.guards = [ new RangedPolice(3, 4, 5, 20),
                        new RangedPolice(2, 3, 1, 50),
                        new RangedPolice(3, 4, 1, 50),
                        new MeleeGradStudent(3, 4, 3, 80),
                        new MeleePolice(3, 4, 2, 80),
                        new RangedPolice(3, 4, 4, 40),
                        new MeleeScientist(3, 4, 3, 100),
                        new MeleeGradStudent(1, 2, 7, 60), 
                       new MeleeGradStudent(3, 4, 7, 100), 
                       new MeleePolice(5, 6, 6, 160)]

        let smallRoomPositions = [
            { x: 3, floor: 3 },
            { x: 3, floor: 4 },
            { x: 1, floor: 6 },
            { x: 4, floor: 7 },
        ]
        for (let i = 0; i < smallRoomPositions.length; i++) {
            let roomTemplateIndex = floor(random(0,possibleSmallRooms.length))
            let pos = smallRoomPositions[i]
            this.rooms.push(new possibleSmallRooms[roomTemplateIndex](pos.x,pos.floor));
            possibleSmallRooms.splice(roomTemplateIndex, 1)
        }

        let possibleMediumRooms = [MediumAbandonedLibrary, MediumGreenhouse, MediumMeetingRoom, MediumMeetingRoom, MediumMeetingRoom, MediumMeetingRoom,];
        let mediumRoomPositions = [
            { x: 2, floor: 1 },
            { x: 0, floor: 2 },
            { x: 3, floor: 2 },
            { x: 4, floor: 5 },
            { x: 3, floor: 6 },
            { x: 1, floor: 7 },
        ]
        for (let i = 0; i < mediumRoomPositions.length; i++){
            let roomTemplateIndex = floor(random(0,possibleMediumRooms.length))
            let pos = mediumRoomPositions[i]
            this.rooms.push(new possibleMediumRooms[roomTemplateIndex](pos.x,pos.floor));
            possibleMediumRooms.splice(roomTemplateIndex, 1)
        }

        let hallwayPositions = [
            { x: 4, floor: 1 },
            { x: 3, floor: 5 },
        ]
        for (let i = 0; i < hallwayPositions.length; i++){
            let pos = hallwayPositions[i];
            this.rooms.push(new SmallHallway(pos.x, pos.floor));
        }

        let ventPositions = [
            { x: 5, floor: 2 },
            { x: 2, floor: 3 },
            { x: 1, floor: 4 },
            { x: 4, floor: 4 },
            { x: 2, floor: 5 },
            { x: 6, floor: 6 },
            { x: 0, floor: 7 },
            { x: 5, floor: 7 },
            { x: 3, floor: 8 },
        ]
        for (let i = 0; i < ventPositions.length; i++){
            let pos = ventPositions[i];
            this.rooms.push(new VentRoom(pos.x, pos.floor));
        }

        let wallsPositions = [
            { x: 2, floor: 1 },
            { x: 6, floor: 1 },
            { x: 0, floor: 2 },
            { x: 1, floor: 3 },
            { x: 5, floor: 3 },
            { x: 1, floor: 4 },
            { x: 5, floor: 4 },
            { x: 2, floor: 5 },
            { x: 7, floor: 5 },
            { x: 0, floor: 6 },
            { x: 2, floor: 6 },
            { x: 3, floor: 6 },
            { x: 7, floor: 6 },
            { x: 0, floor: 7 },
            { x: 6, floor: 7 },
            { x: 5, floor: 8 },
            { x: 1, floor: 8 },
        ]
        for (let i = 0; i < wallsPositions.length; i++){
            let pos = wallsPositions[i];
            this.rooms.push(new Wall(pos.x, pos.floor));
        }

        let doorsPositions = [
            { x: 4, floor: 1 },
            { x: 5, floor: 1 },
            { x: 5, floor: 2 },
            { x: 2, floor: 2 },
            { x: 3, floor: 2 },
            { x: 5, floor: 2 },
            { x: 2, floor: 3 },
            { x: 3, floor: 3 },
            { x: 4, floor: 3 },
            { x: 2, floor: 4 },
            { x: 3, floor: 4 },
            { x: 4, floor: 4 },
            { x: 3, floor: 5 },
            { x: 4, floor: 5 },
            { x: 6, floor: 5 },
            { x: 1, floor: 6 },
            { x: 5, floor: 6 },
            { x: 6, floor: 6 },
            { x: 1, floor: 7 },
            { x: 3, floor: 7 },
            { x: 4, floor: 7 },
            { x: 5, floor: 7 },
            { x: 3, floor: 8 },
            { x: 4, floor: 8 },
        ]
        for (let i = 0; i < doorsPositions.length; i++){
            let pos = doorsPositions[i];
            this.rooms.push(new Door(pos.x, pos.floor));
        }

        let floorsPositions = [
            { x: 2, floor: 0 },
            { x: 3, floor: 0 },
            { x: 4, floor: 0 },
            { x: 5, floor: 0 },

            { x: 0, floor: 1 },
            { x: 1, floor: 1 },
            { x: 2, floor: 1 },
            { x: 3, floor: 1 },
            { x: 4, floor: 1 },

            { x: 1, floor: 2 },
            { x: 3, floor: 2 },
            { x: 4, floor: 2 },

            { x: 2, floor: 3 },
            { x: 3, floor: 3 },

            { x: 1, floor: 4 },
            { x: 3, floor: 4 },
            { x: 4, floor: 4 },
            { x: 5, floor: 4 },
            { x: 6, floor: 4 },

            { x: 0, floor: 5 },
            { x: 2, floor: 5 },
            { x: 3, floor: 5 },
            { x: 4, floor: 5 },
            { x: 5, floor: 5 },

            { x: 1, floor: 6 },
            { x: 2, floor: 6 },
            { x: 3, floor: 6 },
            { x: 4, floor: 6 },
            { x: 6, floor: 6 },

            { x: 0, floor: 7 },
            { x: 1, floor: 7 },
            { x: 2, floor: 7 },
            { x: 4, floor: 7 },
            { x: 5, floor: 7 },

            { x: 1, floor: 8 },
            { x: 2, floor: 8 },
            { x: 3, floor: 8 },
            { x: 4, floor: 8 },
        ]
        for (let i = 0; i < floorsPositions.length; i++){
            let pos = floorsPositions[i];
            this.rooms.push(new Floor(pos.x, pos.floor));
        }
        this.dialogue = new SkyscraperDialogue();
        if(playDialogue){
            this.dialogue.SkipToEnd();
        }
    }
}
