
class University extends Level {
    constructor(playDialogue=true) {
        super( Assets.music.entergoo, new UniversityDialogue());
        this.rooms = []
        this.rooms.push(new EscapeRoom(0,1));
        
        let possibleSmallRooms = [SmallOffice, SmallCafeteria, SmallOffice, SmallOffice, SmallClassroom];

        this.spawnpointx = -1;
        this.spawnpointy = 0;
        this.guards = [new MeleeGradStudent(1, 2, 1, 50), 
                       new MeleeGradStudent(5, 6, 1, 50), 
                       new MeleeScientist(1, 1.3, 2, 90), 
                       new MeleeGradStudent(5, 6, 2, 50),
                       new MeleeGradStudent(3, 4, 2, 50),
                       new MeleeScientist(3, 4, 1, 90)]
        let smallRoomPositions = [
            { x: 1, floor: 1 },
            { x: 7, floor: 1 },
            { x: 1, floor: 2 },
            { x: 3, floor: 2 },
            { x: 4, floor: 2 },
        ]
        for (let i = 0; i < smallRoomPositions.length; i++) {
            let roomTemplateIndex = floor(random(0,possibleSmallRooms.length))
            let pos = smallRoomPositions[i]
            this.rooms.push(new possibleSmallRooms[roomTemplateIndex](pos.x,pos.floor));
            possibleSmallRooms.splice(roomTemplateIndex, 1)
        }

        let possibleMediumRooms = [MediumAbandonedLibrary, MediumGreenhouse];
        let mediumRoomPositions = [
            { x: 3, floor: 1 },
            { x: 6, floor: 2 },
        ]
        for (let i = 0; i < mediumRoomPositions.length; i++){
            let roomTemplateIndex = floor(random(0,possibleMediumRooms.length))
            let pos = mediumRoomPositions[i]
            this.rooms.push(new possibleMediumRooms[roomTemplateIndex](pos.x,pos.floor));
            possibleMediumRooms.splice(roomTemplateIndex, 1)
        }
        
        let hallwayPositions = [
            { x: -1, floor: 1 },
            { x: 6, floor: 1 },
        ]
        for (let i = 0; i < hallwayPositions.length; i++){
            let pos = hallwayPositions[i];
            this.rooms.push(new SmallHallway(pos.x, pos.floor));
        }

        let ventPositions = [
            { x: 2, floor: 2 },
            { x: 5, floor: 2 },
        ]
        for (let i = 0; i < ventPositions.length; i++){
            let pos = ventPositions[i];
            this.rooms.push(new VentRoom2(pos.x, pos.floor));
        }

        let wallsPositions = [
            { x: -1, floor: 1 },
            { x: 3, floor: 1 },
            { x: 8, floor: 1 },
            { x: 1, floor: 2 },
            { x: 8, floor: 2 },
        ]
        for (let i = 0; i < wallsPositions.length; i++){
            let pos = wallsPositions[i];
            this.rooms.push(new Wall(pos.x, pos.floor));
        }

        let doorsPositions = [
            { x: 0, floor: 1 },
            { x: 1, floor: 1 },
            { x: 2, floor: 1 },
            { x: 5, floor: 1 },
            { x: 6, floor: 1 },
            { x: 7, floor: 1 },

            { x: 2, floor: 2 },
            { x: 3, floor: 2 },
            { x: 4, floor: 2 },
            { x: 5, floor: 2 },
            { x: 6, floor: 2 },
        ]
        for (let i = 0; i < doorsPositions.length; i++){
            let pos = doorsPositions[i];
            this.rooms.push(new Door(pos.x, pos.floor));
        }

        let floorsPositions = [
            { x: -1, floor: 0 },
            { x: -1, floor: 1 },

            { x: 0, floor: 0 },
            { x: 1, floor: 0 },
            { x: 2, floor: 0 },
            { x: 3, floor: 0 },
            { x: 4, floor: 0 },
            { x: 5, floor: 0 },
            { x: 6, floor: 0 },
            { x: 7, floor: 0 },

            { x: 0, floor: 1 },
            { x: 1, floor: 1 },
            { x: 3, floor: 1 },
            { x: 4, floor: 1 },
            { x: 6, floor: 1 },
            { x: 7, floor: 1 },

            { x: 1, floor: 2 },
            { x: 2, floor: 2 },
            { x: 3, floor: 2 },
            { x: 4, floor: 2 },
            { x: 5, floor: 2 },
            { x: 6, floor: 2 },
            { x: 7, floor: 2 },
        ]
        for (let i = 0; i < floorsPositions.length; i++){
            let pos = floorsPositions[i];
            this.rooms.push(new Floor(pos.x, pos.floor));
        }
        this.dialogue = new UniversityDialogue();
        if(playDialogue){
            this.dialogue.SkipToEnd();
        }
    }
}