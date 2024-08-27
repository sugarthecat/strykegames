const STARTING_NATION_COUNT = 25;
let nations = []
function setup_land() {
    //generate land array
    for (let i = 0; i < TILE_WIDTH; i++) {
        isLandArr.push([])
        coveredLand.push([])
        for (let j = 0; j < TILE_HEIGHT; j++) {
            let x = i * MAP_WIDTH / TILE_WIDTH;
            let y = j * MAP_HEIGHT / TILE_HEIGHT;
            let isLand = noise(x * NOISE_SCALE, y * NOISE_SCALE) > LAND_CUTOFF;
            isLandArr[i].push(isLand)
            coveredLand[i].push(false);
        }
    }
    let landMasses = []
    for (let i = 0; i < isLandArr.length; i++) {
        for (let j = 0; j < isLandArr[i].length; j++) {
            if (isLandArr[i][j] && !coveredLand[i][j]) {
                let landArea = getLandmass(i, j)
                //console.log(landArea.length)
                let newTile = new Tile()
                for (let i = 0; i < landArea.length; i++) {
                    newTile.points.push(landArea[i])
                }
                newTile.Setup()
                if (newTile.points.length > 100) {
                    //break continents with > 100 area
                    landMasses.push(newTile.Split());
                } else if (newTile.points.length > 15) {

                    //clear islands with < 15 area;
                    landMasses.push([newTile]);
                }
            }
        }
    }
    //connect landmasses
    for(let i = 0; i<landMasses.length; i++){
        //find closest landmass distance
        let mindists = []
        for(let j = 0; j<landMasses.length; j++){
            if(j == i){
                continue;
            }
            let mindist = dist2pos(landMasses[i][0].position,landMasses[j][0].position)
            let connTiles = [landMasses[i][0],landMasses[j][0]]
            for(let i2 = 0; i2 < landMasses[i].length; i2++){
                for(let j2 = 0; j2 < landMasses[j].length; j2++){
                    let newdist = dist2pos(landMasses[i][i2].position,landMasses[j][j2].position);
                    if(newdist < mindist){
                        mindist = newdist;
                        connTiles = [landMasses[i][i2],landMasses[j][j2]]
                    }
                }
            }
            mindists.push({dist:mindist,tiles: connTiles})
        }
        let conn = mindists[0];
        for(let j = 0; j<mindists.length; j++){
            if(mindists[j].dist < conn.dist){
                conn = mindists[j]
            }
        }
        for(let j = 0; j< mindists.length; j++){
            if(mindists[j].dist < conn.dist * 2){
                
                mindists[j].tiles[0].Connect(mindists[j].tiles[1])
            }
        }
    }
    //join lists
    while (landMasses.length > 1) {
        for(let i = 0; i<landMasses[landMasses.length-1].length; i++){
            landMasses[0].push(landMasses[landMasses.length-1][i])
        }
        landMasses.pop()
    }
    tiles = landMasses[0]
    //setup occupying tiles
    isLandArr = []
    coveredLand = []
    for (let i = 0; i < tiles.length; i++) {
        for (let j = 0; j < tiles[i].points.length; j++) {
            let point = tiles[i].points[j]
            while (occupyingTile.length <= point.x) {
                occupyingTile.push([])
            }
            occupyingTile[point.x][point.y] = tiles[i]
        }
    }
    //spawn nations
    let usedTiles = []
    nations = []
    for (let i = 0; i < STARTING_NATION_COUNT; i++) {
        nations.push(new Nation())
        let newTile = tiles[floor(i * tiles.length / STARTING_NATION_COUNT)]
        usedTiles.push(newTile);
        nations[i].AnnexTile(newTile);
    }
    let going = true;
    while (going) {
        usedTiles = []
        going = false;
        for (let i = 0; i < tiles.length; i++) {
            if (!usedTiles.includes(tiles[i]) && tiles[i].nation) {
                for (let j = 0; j < tiles[i].connections.length; j++) {
                    if (!tiles[i].connections[j].nation) {
                        tiles[i].nation.AnnexTile(tiles[i].connections[j])
                        usedTiles.push(tiles[i].connections[j])
                        going = true;
                    }
                }
            }
        }
    }
    //name tiles
    for (let i = 0; i < nations.length; i++) {
        nations[i].NameTiles();
    }
}


function getLandmass(x1, y1) {
    //let landArea = 1;
    coveredLand[x1][y1] = true;
    let land = [new Point(x1, y1)]
    let toSearch = [new Point(x1, y1)]
    while (toSearch.length > 0) {
        let x = toSearch[0].x
        let y = toSearch[0].y
        let borderingOceans = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                let newx = i + x;
                let newy = j + y
                if (newx >= 0
                    && newy >= 0
                    && (i == 0 || j == 0)
                    && newx < isLandArr.length
                    && newy < isLandArr[newx].length
                    && isLandArr[newx][newy]
                    && !coveredLand[newx][newy]) {
                    //landArea += 1
                    coveredLand[newx][newy] = true;
                    land.push(new Point(newx, newy))
                    toSearch.push(new Point(newx, newy))
                }
            }
        }
        //console.log(`x: ${x}, y: ${y}, len:${toSearch.length}`)
        toSearch.shift()
    }
    return land;
}
function dist1(x1, x2) {
    return Math.abs(x1 - x2);
}
function dist2pos(a,b) {
    return dist2(a.x,a.y,b.x,b.y);
}