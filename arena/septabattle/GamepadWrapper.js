class GamepadWrapper {
    constructor(gamepad) {
        this.gamepad = gamepad
        this.updates = []
    }
    update(newState){

    }
    getUpdates(){
        const updates = this.updates;
        this.updates = []
        return updates;
    }
}