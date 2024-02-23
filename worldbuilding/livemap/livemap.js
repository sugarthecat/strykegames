
function Tick() {
    for (let i = 0; i < tiles.length; i++) {
        tiles[i].UpdateInternal();
    }
    for (let i = 0; i < nations.length; i++) {
        nations[i].Update()
    }
    for (let i = 0; i < tiles.length; i++) {
        tiles[i].AttackNeighbors();
    }
}
function SetupWorld(){
    
    randomSeed(currDate.getMonth() + currDate.getFullYear() * 200)
    noiseSeed(currDate.getMonth() + currDate.getFullYear() * 200)
    createCanvas(1, 1)
    setup_land();
}