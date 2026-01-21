
class Area51 extends Level {
    constructor(playDialogue=true) {
        super( Assets.music.fifty1, new Area51Dialogue());
        this.song = Assets.music.fifty1
        this.spawnpointx = 5;
        this.spawnpointy = 5;
        this.rooms = []

        this.rooms.push(new MediumHelipad(5, 5));
        this.rooms.push(new EscapeRoom(3,5));
        
        this.spawnpointx = 6;
        this.spawnpointy = 2;

        this.guards = [ 
            new MeleeGradStudent(5, 5, 5, 50),

            new MeleeArmy(5, 6, 4),
            new MeleeScientist(5, 6, 4, 200),  //furnace
            new RangedArmy(2, 3, 4),


            new MeleeScientist(5, 6, 3, 200),
            new MeleeScientist(3, 4, 3, 100),


            new RangedArmy(2, 3, 2, 100),
            new MeleeScientist(1, 2, 2, 150),
            new MeleeScientist(1, 2, 2, 150),
            new RangedArmy(1, 2, 2, 100),
            new RangedArmy(8, 9, 2, 60),
            new MeleeScientist(3, 4, 2, 300),

            new RangedArmy(1, 2, 1),
            new MeleeArmy(2, 3, 1), //last floor
            new RangedArmy(3, 4, 1),
            

           
           new MeleeGradStudent(3, 4, 3, 200)]
           

        let possibleSmallRooms = [SmallOffice, SmallOffice, SmallOffice, SmallOffice, SmallOffice, SmallCafeteria, SmallOffice]; // change last small office to helipad
        let smallRoomPositions = [
            { x: 1, floor: 2 },
            { x: 2, floor: 3 },
            { x: 4, floor: 3 },
            { x: 5, floor: 3 },
            { x: 6, floor: 3 },
            { x: 3, floor: 4 },
        ]
        
        for (let i = 0; i < smallRoomPositions.length; i++) {
            let roomTemplateIndex = floor(random(0,possibleSmallRooms.length))
            let pos = smallRoomPositions[i]
            this.rooms.push(new possibleSmallRooms[roomTemplateIndex](pos.x,pos.floor));
            possibleSmallRooms.splice(roomTemplateIndex, 1)
        }

        let possibleMediumRooms = [MediumMeetingRoom, MediumMeetingRoom, MediumGreenhouse, MediumFurnace];
        let mediumRoomPositions = [
            { x: 0, floor: 1 },
            { x: 3, floor: 1 },
            { x: 8, floor: 3 },
            { x: 5, floor: 4 },
        ]
        for (let i = 0; i < mediumRoomPositions.length; i++){
            let roomTemplateIndex = floor(random(0,possibleMediumRooms.length))
            let pos = mediumRoomPositions[i]
            this.rooms.push(new possibleMediumRooms[roomTemplateIndex](pos.x,pos.floor));
            possibleMediumRooms.splice(roomTemplateIndex, 1)
        }

        let possibleLargeRooms = [LargeShootingRange, LargeShootingRange]; //LargeArmory
        let largeRoomPositions = [
            { x: 4, floor: 2 },
            { x: 7, floor: 2 },
        ]
        for (let i = 0; i < largeRoomPositions.length; i++){
            let roomTemplateIndex = floor(random(0,possibleLargeRooms.length))
            let pos = largeRoomPositions[i]
            this.rooms.push(new possibleLargeRooms[roomTemplateIndex](pos.x,pos.floor));
            possibleLargeRooms.splice(roomTemplateIndex, 1)
        }

        let wallsPositions = [
            { x: 0, floor: 1 },
            { x: 1, floor: 2 },
            { x: 2, floor: 3 },
            { x: 3, floor: 4 },
            { x: 3, floor: 5 },

            { x: 5, floor: 1 },
            { x: 11, floor: 2 },
            { x: 11, floor: 3 },
            { x: 8, floor: 4 },

            { x: 7, floor: 3 },
        ]
        for (let i = 0; i < wallsPositions.length; i++){
            let pos = wallsPositions[i];
            this.rooms.push(new Wall(pos.x, pos.floor));
        }

        let ventPositions = [
            { x: 2, floor: 2 },
            { x: 3, floor: 3 },
            { x: 10, floor: 3 },
            { x: 7, floor: 4 },
            { x: 4, floor: 5 },
        ]
        for (let i = 0; i < ventPositions.length; i++){
            let pos = ventPositions[i];
            this.rooms.push(new VentRoom(pos.x, pos.floor));
        }

        let doorsPositions = [
            { x: 2, floor: 1 },
            { x: 3, floor: 1 },

            { x: 2, floor: 2 },
            { x: 3, floor: 2 },
            { x: 4, floor: 2 },
            { x: 7, floor: 2 },
            { x: 10, floor: 2 },

            { x: 3, floor: 3 },
            { x: 4, floor: 3 },
            { x: 5, floor: 3 },
            { x: 6, floor: 3 },
            { x: 8, floor: 3 },
            { x: 10, floor: 3 },

            { x: 4, floor: 4 },
            { x: 5, floor: 4 },
            { x: 7, floor: 4 },

            { x: 4, floor: 5 },
            { x: 5, floor: 5 },
        ]
        for (let i = 0; i < doorsPositions.length; i++){
            let pos = doorsPositions[i];
            this.rooms.push(new Door(pos.x, pos.floor));
        }

        let floorsPositions = [
            { x: 0, floor: 0 },
            { x: 1, floor: 0 },
            { x: 2, floor: 0 },
            { x: 3, floor: 0 },
            { x: 4, floor: 0 },

            { x: 0, floor: 1 },
            { x: 1, floor: 1 },
            { x: 3, floor: 1 },
            { x: 4, floor: 1 },
            { x: 5, floor: 1 },
            { x: 6, floor: 1 },
            { x: 7, floor: 1 },
            { x: 8, floor: 1 },
            { x: 9, floor: 1 },
            { x: 10, floor: 1 },

            { x: 1, floor: 2 },
            { x: 2, floor: 2 },
            { x: 4, floor: 2 },
            { x: 5, floor: 2 },
            { x: 6, floor: 2 },
            { x: 7, floor: 2 },
            { x: 8, floor: 2 },
            { x: 9, floor: 2 },
            { x: 11, floor: 2 },

            { x: 2, floor: 3 },
            { x: 3, floor: 3 },
            { x: 4, floor: 3 },
            { x: 5, floor: 3 },
            { x: 6, floor: 3 },
            { x: 8, floor: 3 },
            { x: 9, floor: 3 },
            { x: 10, floor: 3 },
            { x: 11, floor: 3 },

            { x: 3, floor: 4 },
            { x: 5, floor: 4 },
            { x: 6, floor: 4 },
            { x: 7, floor: 4 },

            { x: 3, floor: 5 },
            { x: 4, floor: 5 },
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