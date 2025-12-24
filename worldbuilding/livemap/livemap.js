
function Tick() {
    for (let i = 0; i < tiles.length; i++) {
        tiles[i].UpdateInternal();
    }
    for (let i = 0; i < nations.length; i++) {
        nations[i].Update()
    }
}
let currDate = new Date();
function SetupWorld(){
    createCanvas(1, 1)
    setup_land();
}