class Level {
    constructor(song, dialogue) {
        this.rooms = [];
        this.song = song;
        this.dialogue = dialogue
    }
    Draw(camerax,cameray) {
        while(this.dialogue && this.dialogue.isActive() && !this.playDialogue){
            this.dialogue.Advance()
        }
        let properCameraY = (-cameray) - (SCREEN_DIMENSIONS.y - TARGET_SCREEN_DIMENSIONS.y) /2 
        let properCameraX = (-camerax) - (SCREEN_DIMENSIONS.x - TARGET_SCREEN_DIMENSIONS.x) /2 
        for (let i = 0; i < this.rooms.length; i++) {
            if (this.rooms[i].x > properCameraX + SCREEN_DIMENSIONS.x){
                continue;
            }
            if (this.rooms[i].y > properCameraY + SCREEN_DIMENSIONS.y){
                continue;
            }
            if (this.rooms[i].x + this.rooms[i].w < properCameraX){
                continue;
            }
            if (this.rooms[i].y + this.rooms[i].h < properCameraY){
                continue;
            }
            this.rooms[i].Draw();
        }
    }
}