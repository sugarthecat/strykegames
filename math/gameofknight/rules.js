const presets = [
    {
        name: "Conway's Game Of Life",
        spawnmin: 3,
        spawnmax: 3,
        survivemin: 2,
        survivemax: 3,
        neighbors: [[-1, -1], [-1, 0], [-1, 1], [0, 1], [0, -1], [1, 1], [1, 0], [1, -1]]
    },
    {
        name: "Game Of Knight",
        spawnmin: 3,
        spawnmax: 3,
        survivemin: 2,
        survivemax: 3,
        neighbors: [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]]
    },
    {
        name: "Cave Smoothing",
        spawnmin: 7,
        spawnmax: 8,
        survivemin: 3,
        survivemax: 8,
        neighbors: [[-1, -1], [-1, 0], [-1, 1], [0, 1], [0, -1], [1, 1], [1, 0], [1, -1]]
    },
    {
        name: "Game Of Lite",
        spawnmin: 2,
        spawnmax: 2,
        survivemin: 1,
        survivemax: 1,
        neighbors: [[-1, 0], [1, 0], [0, -1], [0, 1]]
    }
]

const neighbors = []
const neighborDist = 3
const neighborTileSize = 20
for (let i = 0; i < 1 + neighborDist * 2; i++) {
    neighbors.push([])
    for (let j = 0; j < 1 + neighborDist * 2; j++) {
        neighbors[i].push(false)
    }
}



let spawnmin = 3;
let spawnmax = 3;
let survivemin = 2;
let survivemax = 3;
function stepSim() {
    let newValues = []
    for (let i = 0; i < TILE_DIM.x; i++) {
        newValues.push([])
        for (let j = 0; j < TILE_DIM.y; j++) {
            let neighborCount = 0;
            let isAlive = values[i][j]

            //count neighbors
            for (let x1 = 0; x1 < neighbors.length; x1++) {
                for (let x2 = 0; x2 < neighbors.length; x2++) {
                    let xPos = x1 - neighborDist + i;
                    let yPos = x2 - neighborDist + j;
                    if (xPos < 0 || yPos < 0) {
                        continue;
                    }
                    if (xPos >= values.length || yPos >= values[xPos].length) {
                        continue;
                    }
                    if (!values[xPos][yPos] || !neighbors[x1][x2]) {
                        continue
                    }
                    neighborCount++;
                }
            }
            let aliveNextRound = (isAlive && neighborCount >= survivemin && neighborCount <= survivemax)
                || (!isAlive && neighborCount >= spawnmin && neighborCount <= spawnmax)
            newValues[i].push(aliveNextRound)
        }
    }
    values = newValues;
}

var neighborEditor = function (sketch) {
    sketch.setup = function () {
        let canvas = sketch.createCanvas(neighbors.length * neighborTileSize, neighbors.length * neighborTileSize);
        canvas.parent(document.getElementById("neighborcanvasdiv"))
    }
    sketch.draw = function () {
        sketch.background(0);
        sketch.noStroke()
        sketch.fill(255)
        for (let i = 0; i < neighbors.length; i++) {
            for (let j = 0; j < neighbors[i].length; j++) {
                if (i == neighborDist && j == neighborDist) {
                    sketch.fill(255, 0, 0)
                    sketch.rect(i * neighborTileSize, j * neighborTileSize, neighborTileSize, neighborTileSize)
                } else if (neighbors[i][j]) {
                    sketch.fill(255)
                    sketch.rect(i * neighborTileSize, j * neighborTileSize, neighborTileSize, neighborTileSize)
                }
            }
        }
        sketch.stroke(150)
        sketch.strokeWeight(3)
        for (let i = 0; i <= neighbors.length; i++) {
            sketch.line(0, i * neighborTileSize, sketch.width, i * neighborTileSize)
        }
        for (let i = 0; i <= neighbors[0].length; i++) {
            sketch.line(i * neighborTileSize, 0, i * neighborTileSize, sketch.height)
        }
    }
    sketch.mouseClicked = function () {
        if (sketch.mouseX < 0 || sketch.mouseY < 0) {
            return;
        }
        if (sketch.mouseX > sketch.width || sketch.mouseY > sketch.height) {
            return;
        }
        let xPos = floor(sketch.mouseX / neighborTileSize)
        let yPos = floor(sketch.mouseY / neighborTileSize)
        if (xPos == neighborDist && yPos == neighborDist) {
            return;
        }
        neighbors[xPos][yPos] = !neighbors[xPos][yPos]
        updateRules()
    }
};

function setupPresets() {
    for (let i = 0; i < presets.length; i++) {
        const preset = presets[i]
        const loadFunc = function () {
            loadPreset(preset)
        }
        let button = document.createElement('button')
        button.innerText = preset.name;
        button.onclick = loadFunc;
        document.getElementById('presets').appendChild(button)
    }
}

function loadPreset(preset) {
    for (let i = 0; i < 1 + neighborDist * 2; i++) {
        for (let j = 0; j < 1 + neighborDist * 2; j++) {
            neighbors[i][j] = false
        }
    }
    for (let i = 0; i < preset.neighbors.length; i++) {
        neighbors[preset.neighbors[i][0] + neighborDist][preset.neighbors[i][1] + neighborDist] = true
    }
    updateRules()
    document.getElementById('spawnmin').max = preset.spawnmin;
    document.getElementById('spawnmax').max = preset.spawnmax;
    document.getElementById('lifemin').max = preset.survivemin;
    document.getElementById('lifemax').max = preset.survivemax;
    document.getElementById('spawnmin').min = preset.spawnmin;
    document.getElementById('spawnmax').min = preset.spawnmax;
    document.getElementById('lifemin').min = preset.survivemin;
    document.getElementById('lifemax').min = preset.survivemax;
    document.getElementById('spawnmin').value = preset.spawnmin;
    document.getElementById('spawnmax').value = preset.spawnmax;
    document.getElementById('lifemin').value = preset.survivemin;
    document.getElementById('lifemax').value = preset.survivemax;
    updateRules()
}

function updateRules() {
    let neighborCount = 0
    for (let i = 0; i < neighbors.length; i++) {
        for (let j = 0; j < neighbors[i].length; j++) {
            if (neighbors[i][j]) {
                neighborCount++;
            }
        }
    }
    spawnmin = parseInt(document.getElementById('spawnmin').value)
    spawnmax = parseInt(document.getElementById('spawnmax').value)
    document.getElementById('spawnmin').min = 0;
    document.getElementById('spawnmax').min = spawnmin;
    document.getElementById('spawnmax').max = neighborCount + 1;
    document.getElementById('spawnmin').max = spawnmax;
    document.getElementById('spawntxt').innerText = `Dead cells become alive from dead if they have between ${spawnmin} and ${spawnmax} living neighbors, inclusively.`
    survivemin = parseInt(document.getElementById('lifemin').value)
    survivemax = parseInt(document.getElementById('lifemax').value)
    document.getElementById('lifemin').min = 0;
    document.getElementById('lifemax').min = survivemin;
    document.getElementById('lifemax').max = neighborCount + 1;
    document.getElementById('lifemin').max = survivemax;
    document.getElementById('lifetxt').innerText = `Living cells stay alive if they have they have between ${survivemin} and ${survivemax} living neighbors, inclusively.`
}