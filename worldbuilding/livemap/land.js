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
    while (landMasses.length > 1) {
        //find closest pair, connect landmasses
        let closestPair1 = 0;
        let closestPair2 = 1;
        let closestPair1Tile = landMasses[0][0];
        let closestPair2Tile = landMasses[1][0];

        for (let i = 0; i < landMasses.length; i++) {
            for (let j = 0; j < landMasses[i].length; j++) {
                for (let i2 = i + 1; i2 < landMasses.length; i2++) {
                    for (let j2 = 0; j2 < landMasses[i2].length; j2++) {
                        if (dist2pos(landMasses[i][j].position,landMasses[i2][j2].position)
                            < dist2pos(closestPair1Tile.position, closestPair2Tile.position)
                        ) {
                            closestPair1Tile = landMasses[i][j]
                            closestPair2Tile = landMasses[i2][j2]
                            closestPair1 = i;
                            closestPair2 = i2;
                        }
                    }
                }
            }
        }
        closestPair1Tile.Connect(closestPair2Tile)
        for(let i = 0; i<landMasses[closestPair2].length; i++){
            landMasses[closestPair1].push(landMasses[closestPair2][i])
        }
        landMasses.splice(closestPair2,1)
    }
    tiles = landMasses[0]
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