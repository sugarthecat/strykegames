
function updateGrid() {
    const newWidth = parseInt(document.getElementById("width").value);
    const newHeight = parseInt(document.getElementById("height").value);
    tileSize = document.getElementById("tilesize").value;
    document.getElementById("tiletxt").innerText = `Tile Size: ${tileSize} pixels`
    document.getElementById("widthtxt").innerText = `Width: ${newWidth} tiles`
    document.getElementById("heighttxt").innerText = `Height: ${newHeight} tiles`
    TILE_DIM.x = newWidth;
    TILE_DIM.y = newHeight;
    setupVals()
}
function setupVals() {
    SCREEN_DIMENSIONS.x = TILE_DIM.x * tileSize;
    SCREEN_DIMENSIONS.y = TILE_DIM.y * tileSize;
    autoPlay = false;
    let newValues = []
    for (let i = 0; i < TILE_DIM.x; i++) {
        newValues.push([])
        for (let j = 0; j < TILE_DIM.y; j++) {
            newValues[i].push(false)
        }
    }
    values = newValues;
    resizeCanvas(SCREEN_DIMENSIONS.x, SCREEN_DIMENSIONS.y)
}
