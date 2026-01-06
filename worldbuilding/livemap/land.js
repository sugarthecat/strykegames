const STARTING_NATION_COUNT = 25;
const ISLAND_NATION_GARUNTEED_POP = 1000000
const TARGET_TILE_SIZE = 35;
const TILE_MIN_SIZE = 25;
let nations = []
function setup_land() {
    //generate land array
    for (let i = 0; i < TILE_WIDTH; i++) {
        isLandArr.push([])
        coveredLand.push([])
        for (let j = 0; j < TILE_HEIGHT; j++) {
            let x = i * MAP_WIDTH / TILE_WIDTH;
            let y = j * MAP_HEIGHT / TILE_HEIGHT;
            let isLand = noise(x * LAND_NOISE_SCALE, y * LAND_NOISE_SCALE) > LAND_CUTOFF;
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
                let newTile = new Tile(true)
                for (let i = 0; i < landArea.length; i++) {
                    newTile.points.push(landArea[i])
                }
                newTile.Setup()
                if (newTile.points.length > 100) {
                    //break continents with > 100 area
                    landMasses.push(SplitTile(newTile));
                } else if (newTile.points.length > 25) {

                    //clear islands with < 25 area;
                    landMasses.push([newTile]);
                }
            }
        }
    }
    //collect tiles from landmasses
    tiles = []
    for (let i = 0; i < landMasses.length; i++) {
        for (let j = 0; j < landMasses[i].length; j++) {
            tiles.push(landMasses[i][j])
        }
    }
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
    //spawn nations randomly
    let usedTiles = []
    nations = []
    for (let i = 0; i < STARTING_NATION_COUNT; i++) {
        nations.push(new Nation())
        let newTile = tiles[floor(i * tiles.length / STARTING_NATION_COUNT)]
        usedTiles.push(newTile);
        nations[i].AnnexTile(newTile);
    }
    //if a landmass does not have any nations, 
    // and its above a certail tile count,
    // add one

    for (let i = 0; i < landMasses.length; i++) {
        let totalPop = 0
        let hasNation = false
        for (let j = 0; j < landMasses[i].length; j++) {
            if (landMasses[i][j].nation) {
                hasNation = true;
                break;
            }
            totalPop += landMasses[i][j].population
        }
        if (hasNation) {
            continue;
        }
        if (totalPop > ISLAND_NATION_GARUNTEED_POP || landMasses[i].length > 10) {
            nations.push(new Nation())
            let newTile = landMasses[i][0]
            usedTiles.push(newTile);
            nations[nations.length - 1].AnnexTile(newTile);
        }
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
function dist2pos(a, b) {
    return dist2(a.x, a.y, b.x, b.y);
}


function SplitTile(tile) {
    let spawnerPoints = []
    let tiles = []

    for (let i = 0; i < tile.points.length / TARGET_TILE_SIZE; i++) {
        let newPoint = tile.points[floor(i * TARGET_TILE_SIZE)]
        spawnerPoints.push(newPoint)
        tiles.push(new Tile())
    }
    let going = true;

    let closestTiles = []
    let points = []
    while (closestTiles.length < isLandArr.length) {
        closestTiles.push([])
        points.push([])
    }
    for (let i = 0; i < tile.points.length; i++) {
        points[tile.points[i].x][tile.points[i].y] = tile.points[i]
    }
    while (going) {
        for (let i = 0; i < tiles.length; i++) {
            tiles[i].points = []
        }
        going = false
        for (let i = 0; i < tile.points.length; i++) {
            let closestTileIndex = 0

            for (let j = 0; j < tiles.length; j++) {
                if (
                    dist2(spawnerPoints[closestTileIndex].x, spawnerPoints[closestTileIndex].y, tile.points[i].x, tile.points[i].y)
                    >
                    dist2(spawnerPoints[j].x, spawnerPoints[j].y, tile.points[i].x, tile.points[i].y)
                ) {
                    closestTileIndex = j;
                }
            }
            tiles[closestTileIndex].points.push(tile.points[i])
            closestTiles[tile.points[i].x][tile.points[i].y] = tiles[closestTileIndex]
            if (
                points[tile.points[i].x - 1] && points[tile.points[i].x + 1] &&
                !(
                    points[tile.points[i].x - 1][tile.points[i].y]
                    && points[tile.points[i].x + 1][tile.points[i].y]
                    && points[tile.points[i].x][tile.points[i].y + 1]
                    && points[tile.points[i].x][tile.points[i].y - 1]
                )
            ) {
                closestTiles[tile.points[i].x][tile.points[i].y].isSeaside = true
            }
        }
        for (let i = 0; i < tile.points.length; i++) {
            let point = tile.points[i]
            if (closestTiles[point.x][point.y]
                && point.x > 0
                && closestTiles[point.x - 1][point.y]
                && closestTiles[point.x][point.y] != closestTiles[point.x - 1][point.y]
            ) {
                closestTiles[point.x][point.y].points.push(points[point.x - 1][point.y])
                closestTiles[point.x][point.y].Connect(closestTiles[point.x - 1][point.y])
            }

            if (closestTiles[point.x][point.y]
                && point.y > 0
                && closestTiles[point.x][point.y - 1]
                && closestTiles[point.x][point.y] != closestTiles[point.x][point.y - 1]
            ) {
                closestTiles[point.x][point.y].points.push(points[point.x][point.y - 1])
                closestTiles[point.x][point.y].Connect(closestTiles[point.x][point.y - 1])
            }

            if (closestTiles[point.x][point.y]
                && point.y > 0
                && point.x > 0
                && closestTiles[point.x - 1][point.y - 1]
                && closestTiles[point.x][point.y] != closestTiles[point.x - 1][point.y - 1]
            ) {
                closestTiles[point.x][point.y].points.push(points[point.x - 1][point.y - 1])
                closestTiles[point.x][point.y].Connect(closestTiles[point.x - 1][point.y - 1])

            }
        }
        for (let i = 0; i < tiles.length; i++) {
            if (!isValidTileShape(tiles[i])) {
                tiles.splice(i, 1)
                spawnerPoints.splice(i, 1)
                going = true;
                i--;
            }
        }
        if (going) {
            for (let i = 0; i < tiles.length; i++) {
                tiles[i].connections = []
            }
        }
    }
    for (let i = 0; i < tiles.length; i++) {
        tiles[i].Setup();
    }
    return tiles
}

function isValidTileShape(tile){
    //invalid shape if below min size
    if(tile.points.length < TILE_MIN_SIZE){
        return false
    }
    let unvisitedPoints = new Set(tile.points);
    let toCheck = [tile.points[0]]
    unvisitedPoints.delete(toCheck[0])
    while(toCheck.length > 0){
        let currPoint = toCheck.pop()
        let toCheckLater = []
        for(const point of unvisitedPoints){
            if(abs(point.x - currPoint.x) <= 1 && abs(point.y - currPoint.y) <= 1){
                toCheckLater.push(point)
            }
        }
        while(toCheckLater.length > 0){
            currPoint = toCheckLater.pop()
            toCheck.push(currPoint)
            unvisitedPoints.delete(currPoint)
        }
    }
    if(unvisitedPoints.size > 0){
        return false;
    }
    return true;
}