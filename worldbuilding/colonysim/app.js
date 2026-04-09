import { default as Tile } from "./Tile.js";
import { default as Colony } from "./Colony.js";
import { default as Population } from "./Population.js";
import { default as Selector } from "./Selector.js";


import { default as TileOverlay } from "./TileOverlay.js";
import { default as ColonyOverlay } from "./ColonyOverlay.js";
import { default as ColonyGraphsOverlay } from "./ColonyGraphsOverlay.js"


import { default as Water } from "./terrainTiles/Water.js";
import { default as ForestTile } from "./terrainTiles/ForestTile.js";
import { default as MountainTile } from "./terrainTiles/MountainTile.js";
import { default as RiverTile } from "./terrainTiles/RiverTile.js";
import { default as PlainTile } from "./terrainTiles/PlainTile.js";

import { default as WaterTile } from "./WaterTile.js";
import { default as LandTile } from "./LandTile.js";
import { default as Save } from "./Save.js";
import { default as SaveReader } from "./SaveReader.js";
import { default as generateName } from "./generateName.js";

import Troop from "./Troop.js";
import DesertTile from "./terrainTiles/DesertTile.js";
import TundraTile from "./terrainTiles/TundraTile.js";
import InterfaceRecorder from "./InterfaceRecorder.js";
import gameruleInterFace from "./gameruleInterface.js";

import FlagEditor from "./FlagEditor.js";
import Alliance from "./Alliance.js";
import Politics from "./Politics.js";
import Flag from "./Flag.js";
var VERSION = "00.00.03";


//TODO finsih implementing map modes
//TODO colont current active ships not accurate
//TODO create a class holding game values, like maxRandomColonyPop
//TODO Make colonys hold troops and place on border

//TODO Attack draw map issue, F#-1-1 

const LAND_WAR_CHANCE = 0.0001;
const NAVAL_WAR_CHANCE = 0.001;
const PEACETIME_ALLIANCE_LEAVE_CHANCE = 0.001;
const WARTIME_ALLIANCE_LEAVE_CHANCE = 0.0002;
var UPDATE_TIME = 10; // 10
var REDRAW_NEEDED = false;

var GAME_BOARD = [];
var RAW_BOARD = [];
var SHUFFLED_GAME_BOARD = [];

var WRAP_BOARD_OPT = false;


var SIZE = 2;

var IMAGE_WIDTH;
var IMAGE_HEIGHT;

var BOARD_WIDTH = Math.floor(900 / SIZE);
var BOARD_HEIGHT = Math.floor(600 / SIZE);

var RUN_GAME = false;
var UPDATE_RAW_BOARD = true;

var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

var COLONY_ARRAY = [];
var COLONY_COUNT;

/// Edit Map Variables
var SHOW_EDIT_TERRAIN_BUTTONS = true;
var SELECTOR = new Selector();
var EDIT_BRUSH_SIZE = 3;

const MOUNTAIN_TILE = new MountainTile();
const PLAIN_TILE = new PlainTile();
const RIVER_TILE = new RiverTile();
const FOREST_TILE = new ForestTile();
const DESERT_TILE = new DesertTile();
const TUNDRA_TILE = new TundraTile();

const WATER_TILE = new Water();

var STEPS = 0;

const BASE_POP = 3000;
const BASE_ATTACK = 1.0; // double attack Modifier 
const BASE_DEFENSE = 1.0; // double Defense mod
const BASE_RECRUIT_PERC = .015; //double percent of recruited troops
const BASE_POP_GROWTH = 0.04; // double
const BASE_EXPAND_RATE = 100; // int
const BASE_MIL_STRENGTH = 5;
const LARGER_POP_DIVIDER_NEEDED_TO_SEND_MIGRANTS = 2; //

var MAP_DISPLAY_STYLE = "political"; // political, geo, pop, strength... 
var maxStartingPop = 50;

var INTERFACE_RECORDER = new InterfaceRecorder();


//Overlay variables
var TILE_OVERLAY = new TileOverlay(document.getElementById("tile_overlay"));
TILE_OVERLAY.hideOverlay();



// PLACEHOLDER FOR CULTURE
var cultureColorMatch = {}

var COLONY_GRAPHS_OVERLAY = new ColonyGraphsOverlay(document.getElementById("colony_graphs_overlay"));
COLONY_GRAPHS_OVERLAY.hideOverlay();
COLONY_GRAPHS_OVERLAY.hideAllGraphOverlays();
COLONY_GRAPHS_OVERLAY.setCultureMatch(cultureColorMatch);

var COLONY_OVERLAY = new ColonyOverlay(document.getElementById("colony_overlay"), COLONY_GRAPHS_OVERLAY);
COLONY_OVERLAY.hideOverlay();

let FLAG_EDITOR = document.getElementById('flag_editor')
var INITIAL_CLICK = true;

//TODO RandomPopulations






/// editing map variables
var DRAW_EDIT_ON_MAP = false;




function startGame() {

    addPauseButton();
    createMainImageInput();
    addMapImportInput()
    addDisplayMapButton();
    hideAllToggleElements();
    //addChangeMapModeButton();
    addNumberOfColniesButton();
    addPrintGameBoard();
    addEditStatsButtons();
    addToggleButtons();
    addMapModeButtons();
    // addEditTerrainButtons(); // old edit terrain toggle
    addEditIndividualTerrainButtons();
    addGameCommandButtons();
    addSortTypeButtons();
    addSelectButton();
    addPlaceAndDrawCustomColonyButton();
    addCreateAllianceButton();
    addViewUpcomingUpdates();
    addViewCredits();
    addSaveMapButton();
    addIdeologySliders();
    addSpeedSlider();
    addEditBrushSlider();

    createStartingMap();

    ctx.stroke();
    setupFlagEditors();
    //ctx.drawImage("./img/work")
    //TODO Have map at beginning

}
function addIdeologySliders() {
    let k = document.getElementsByClassName('custom_colony_ideology')
    for (let i = 0; i < k.length; i++) {
        k[i].onchange = function () {
            let newPolitics = new Politics()
            newPolitics.ideoAuthority = document.getElementById("custom_colony_ideo_auth").value / 101
            newPolitics.ideoRadicalism = document.getElementById("custom_colony_ideo_rad").value / 101
            newPolitics.ideoProgress = document.getElementById("custom_colony_ideo_prog").value / 101
            document.getElementById("custom_colony_ideo_name").innerHTML = newPolitics.getIdeologyName()
        }
    }
}
function addCreateAllianceButton() {
    const allianceCreateBtn = document.getElementById('create_custom_alliance_btn');
    allianceCreateBtn.onclick = function () {
        let newMembers = []
        let alliance = new Alliance()
        alliance.name = document.getElementById('custom_alliance_name_input').value
        alliance.color = document.getElementById('custom_alliance_color_input').value
        alliance.setFlag(ALLIANCE_FLAG_EDITOR.currentFlag)
        for (let i = 0; i < COLONY_ARRAY.length; i++) {
            if (COLONY_ARRAY[i].allianceCheckbox && COLONY_ARRAY[i].allianceCheckbox.checked) {
                newMembers.push(COLONY_ARRAY[i])
            }
        }
        for (let i = 0; i < newMembers.length; i++) {
            alliance.addMember(newMembers[i])
        }
    }
}
let COLONY_FLAG_EDITOR, ALLIANCE_FLAG_EDITOR
function setupFlagEditors() {
    COLONY_FLAG_EDITOR = new FlagEditor(document.getElementById('colony_flag_editor'))
    ALLIANCE_FLAG_EDITOR = new FlagEditor(document.getElementById('alliance_flag_editor'))
}
function createStartingMap() {
    UPDATE_RAW_BOARD = true;
    const image = new Image();
    image.src = "./img/worldMap.png";
    image.onload = () => {
        IMAGE_WIDTH = image.width;
        IMAGE_HEIGHT = image.height;

        BOARD_HEIGHT = Math.floor(IMAGE_HEIGHT);
        BOARD_WIDTH = Math.floor(IMAGE_WIDTH);
        c.width = Math.floor(IMAGE_WIDTH);
        c.height = Math.floor(IMAGE_HEIGHT);

        ctx.drawImage(image, 0, 0);

    }
}

function addGameCommandButtons() {
    document.getElementById('clear_alliances').onclick = function () {
        for (let i = 0; i < COLONY_ARRAY.length; i++) {
            COLONY_ARRAY[i].leaveAlliance();
        }
    }
    document.getElementById('end_all_wars').onclick = function () {
        for (let i = 0; i < COLONY_ARRAY.length; i++) {
            COLONY_ARRAY[i].clearEnemies();
        }
    }
    document.getElementById('clear_all_colonies').onclick = function () {
        for (let i = 0; i < COLONY_ARRAY.length; i++) {
            COLONY_ARRAY[i].isDead = true;
        }
    }
}
function createMainImageInput() {
    const imageInput = document.querySelector("#main_image_input");
    var uploadedImage = "";
    console.log(imageInput)
    imageInput.addEventListener("change", function () { 
        const reader = new FileReader();

        // gets the image's width and height and changes canvas and board sizes
        reader.onload = (theFile) => {
            console.log(theFile)

            //checks if file type is text
            if (theFile.target.result.split("/")[0].split(":")[1] === "text") {
            } else {
                UPDATE_RAW_BOARD = true;
                const image = new Image();
                image.src = theFile.target.result;
                image.onload = () => {
                    IMAGE_WIDTH = image.width;
                    IMAGE_HEIGHT = image.height;

                    BOARD_HEIGHT = Math.floor(IMAGE_HEIGHT);
                    BOARD_WIDTH = Math.floor(IMAGE_WIDTH);
                    c.width = Math.floor(IMAGE_WIDTH);
                    c.height = Math.floor(IMAGE_HEIGHT);

                    ctx.drawImage(image, 0, 0);


                };
            }
        };


        // sets image as background
        reader.addEventListener("load", () => {

        })
        reader.readAsDataURL(this.files[0]);
    });
    //console.log("Convert")
}

function addMapImportInput() {
    document.getElementById('map_import_input').onchange = function (evt) {


        try {
            let files = evt.target.files;
            if (!files.length) {
                alert('No file selected!');
                return;
            }
            let file = files[0];

            let reader = new FileReader();
            const self = this;
            reader.onload = (event) => {

                ctx.clearRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT)

                var saveReader = new SaveReader(VERSION, SELECTOR);
                saveReader.convertSaveTextFileMain(event.target.result);
                GAME_BOARD = saveReader.gameBoard;
                RAW_BOARD = GAME_BOARD.map(function (arr) {
                    return arr.slice();
                });
                COLONY_ARRAY = saveReader.colonyArray;
                // console.log(saveReader);


                SIZE = saveReader.tileSize;

                c.width = saveReader.boardWidth * saveReader.tileSize
                c.height = saveReader.boardHeight * saveReader.tileSize


                for (let i = 0; i < COLONY_ARRAY.length; i++) {
                    var newColony = COLONY_ARRAY[i]
                    newColony.createNewStatDisplay();
                    newColony.createNewOverlayButton();
                    newColony.createNewAllianceStub();
                }

                SHUFFLED_GAME_BOARD = shuffleGameBoard();

                drawAllTiles();

                //console.log('FILE CONTENT', event.target.result);
                // convertJsonToGameBoard(JSON.parse(event.target.result));
                //drawAllTiles();
            };
            reader.readAsText(file);
        } catch (err) {
            console.error(err);
        }
    }
}

function readTextFileForSave(files) {
    console.log(files);

    try {

        console.log(files.target.toString());

        // let files = evt.target.files;

        let file = files[0];
        let reader = new FileReader();
        const self = this;


        reader.onload = (event) => {
            ctx.clearRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT)



            var saveReader = new SaveReader(VERSION, SELECTOR);
            saveReader.convertSaveTextFileMain(event.target.result);
            GAME_BOARD = saveReader.gameBoard;
            COLONY_ARRAY = saveReader.colonyArray;
            // console.log(saveReader);


            SIZE = saveReader.tileSize;

            c.width = saveReader.boardWidth * saveReader.tileSize
            c.height = saveReader.boardHeight * saveReader.tileSize


            for (let i = 0; i < COLONY_ARRAY.length; i++) {
                var newColony = COLONY_ARRAY[i]
                newColony.createNewStatDisplay();
                newColony.createNewOverlayButton();
                newColony.createNewAllianceStub();
            }

            SHUFFLED_GAME_BOARD = shuffleGameBoard();

            drawAllTiles();

            //console.log('FILE CONTENT', event.target.result);
            // convertJsonToGameBoard(JSON.parse(event.target.result));
            //drawAllTiles();
        };
        reader.readAsText(file);
    } catch (err) {
        console.error(err);
    }
}

function convertJsonToGameBoard(jCont) {
    GAME_BOARD = []
    var tempRow = []
    var newTile;
    var jElem;

    for (let row = 0; row < jCont.length; row += 1) {
        tempRow = [];
        for (let col = 0; col < jCont[0].length; col += 1) {

            tempRow.push(newTile)
        }
        GAME_BOARD.push(tempRow);
    }
    console.log(GAME_BOARD);
}

function ConvertJsonElementForGameBoardMain(JElem) {
    console.log(jCont[row][col]);
    jElem = jCont[row][col];
    newTile = new Tile(jElem.x, jElem.y, jElem.size)
    newTile.tileType = new LandTile(PLAIN_TILE);

    console.log(newTile);
}

/**
 * reads the current state of the canvas and converts it to a 2d array 
 */
function convertCanvasTo2dArray(size = SIZE) {
    var mapArray = [];
    var tempRow;
    var tempTile;
    var tileColor;

    drawAllTiles();

    for (let row = 0; row < BOARD_HEIGHT; row += 1) {
        tempRow = [];
        for (let col = 0; col < BOARD_WIDTH; col += 1) {
            tileColor = ctx.getImageData(col * size, row * size, size, size);
            //console.log(col, row);
            tempTile = new Tile(col, row, size);
            tempTile.toDraw = true;

            //console.log(tileColor.data[0],tileColor.data[1],tileColor.data[2])

            //tile is white
            if (tileColor.data[0] > 200 && tileColor.data[1] > 200 && tileColor.data[2] > 200) {
                tempTile.tileType = WATER_TILE;

            } else {
                // tile is green
                tempTile.tileType = PLAIN_TILE;
            }

            tempRow.push(tempTile);
        }
        mapArray.push(tempRow);
    }

    return mapArray;

}

// converts the raw board to a new board with proper sized tiles
function create2DArrayFromRawBoard(size) {
    dArray = [];
    var height = GAME_BOARD.length();
    var width = GAME_BOARD[0].length();

    for (let row = 0; row < Math.floor(height / size); row += 1) {
        tempRow = [];
        for (let col = 0; col < Math.floor(width / size); col += 1) {


        }
    }
    return dArray;
}

/**
 *  Downloads the canvas to users computer
 */
function downloadCanvasAsPNG(fileName) {
    // allows user to view and save image (imageConverted is an id of a img tag on html)
    // const dataURI = c.toDataURL();
    // imageConverted.src = dataURI;

    //allows user to download image

    // for IE and Edge Only
    if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(c.msToBlob(), fileName);
    } else {
        // for all other browsers
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.href = c.toDataURL();
        a.download = fileName;

        a.click();
        document.body.removeChild(a);
    }
}

function printBoard() {
    var tempTile;
    console.log("STARTING PRINTBOARD");

    for (let row = 0; row < BOARD_HEIGHT; row += 1) {
        console.log("===NEW LINE===")
        for (let col = 0; col < BOARD_WIDTH; col += 1) {
            tempTile = GAME_BOARD[row][col]
            tempTile.print();
        }

    }

    console.log("++++ END ++++")


}

/**
 * 
 * Saving
 * 
**/
function downloadEntireMapWithJson(content, fileName = "ColonySimIoMap.txt", contentType = "text/plain") {

    var a = document.createElement('a')
    var blob = new Blob([content], { type: contentType })
    var url = URL.createObjectURL(blob)
    a.setAttribute('href', url)
    a.setAttribute('download', fileName)
    a.click()

}

function downloadEntireMapDataToTxt(fileName = `${VERSION} ColonySimIoMap.txt`, contentType = "text/plain") {
    const content = saveEntireMapMain();

    var a = document.createElement('a')
    var blob = new Blob([content], { type: contentType })
    var url = URL.createObjectURL(blob)
    a.setAttribute('href', url)
    a.setAttribute('download', fileName)
    a.click()
}


/**
 * 
 * EDITING MAP
 * 
 **/
function handleMouseDown(e) {
    DRAW_EDIT_ON_MAP = true;
    drawEditOnMapMain(e);
    INITIAL_CLICK = true;
}
function handleMouseUp(e) {
    DRAW_EDIT_ON_MAP = false;
    INITIAL_CLICK = true;
}
function handleMouseMove(e) {
    if (DRAW_EDIT_ON_MAP) {
        // console.log(INITIAL_CLICK);
        // console.log("MOVE");


        if (INITIAL_CLICK) {
            INITIAL_CLICK = false;
        }
        else {
            drawEditOnMapMain(e);
        }
    }
}
/// Interacting With Map ///
function drawEditOnMapMain(e) {
    var mousePos = getMousePosition(c, e);
    const clickedTile = GAME_BOARD[Math.floor(mousePos.y * GAME_BOARD.length)][Math.floor(mousePos.x * GAME_BOARD[0].length)]

    if (SELECTOR.selectorType === "select") {
        tileSelectedMain(clickedTile);
    } else if (SELECTOR.selectorType === "select_colony") {
        colonySelectedMain(clickedTile);
    }
    else if (SELECTOR.listOfTerrainEdits.includes(SELECTOR.selectorType)) {

        if (clickedTile.tileType instanceof LandTile) {
            editMapWithSelectedTerrain(clickedTile);
        }
    } else if (SELECTOR.selectorType === "place_colony") {
        placeCustomColonyMain(clickedTile);
    } else if (SELECTOR.selectorType === "draw_colony") {
        drawColonyBordersMain(clickedTile);
    } else if (SELECTOR.selectorType === "ocean") {
        editMapWithOcean(clickedTile);
    } else if (SELECTOR.selectorType === "edit_pop_on_map") {
        editPopMain(clickedTile);
    }
}

function editMapWithOcean(tile) {
    const gameBoardHeight = GAME_BOARD.length;
    const gameBoardWidth = GAME_BOARD[0].length;
    var tempTile;
    ctx.fillStyle = WATER_TILE.color;

    tile.tileType = new WaterTile(WATER_TILE);
    tile.isEmpty = true;
    tile.toDraw = true;
    tile.isNew = false;
    tile.isOccupiedLand = false;

    ctx.fillRect(tile.getDrawX(), tile.getDrawY(), tile.getDrawSize(), tile.getDrawSize());
    //console.log(EDIT_BRUSH_SIZE)
    for (let row = tile.y - EDIT_BRUSH_SIZE + 1; row < tile.y + EDIT_BRUSH_SIZE - 1; row++) {
        for (let col = tile.x - EDIT_BRUSH_SIZE + 1; col < tile.x + EDIT_BRUSH_SIZE - 1; col++) {
            if (row >= 0 && row < gameBoardHeight && col >= 0 && col < gameBoardWidth) {

                tempTile = GAME_BOARD[row][col];
                if (tempTile.tileType instanceof LandTile) {
                    tempTile.tileType = new WaterTile(WATER_TILE)
                    //TODO decrease ship count if there was a ship
                    tempTile.isEmpty = true;
                    tempTile.toDraw = true;
                    tempTile.isNew = false;
                    tempTile.isOccupiedLand = false;

                    ctx.fillRect(tempTile.getDrawX(), tempTile.getDrawY(), tempTile.getDrawSize(), tempTile.getDrawSize());
                }
            }

        }
    }

}

function hideAllOverlays() {
    COLONY_OVERLAY.hideOverlay();
    TILE_OVERLAY.hideOverlay();
    COLONY_GRAPHS_OVERLAY.hideOverlay();

}

function colonySelectedMain(tile) {
    hideAllOverlays();
    if (tile.isOccupiedLand) {
        COLONY_OVERLAY.displayColonyOverlay(tile.tileType.population.colony);
    }
}

function tileSelectedMain(tile) {
    // console.log(stringify);
    // console.log(JSON.parse(stringify));
    // console.log(tile);
    hideAllOverlays();
    TILE_OVERLAY.displayTileOverlay(tile);
    //console.log(tile.constructor.name);
}


function editMapWithSelectedTerrain(tile) {
    //console.log(Math.floor(mousePos.y/SIZE), Math.floor(mousePos.x/SIZE), SIZE);
    addTerrainToSelectedTiles(tile)
}

function addTerrainToSelectedTiles(tile) {
    const terrainType = getSelectedTerrainObject()
    ctx.fillStyle = terrainType.color;
    var tempTile;
    const gameBoardHeight = GAME_BOARD.length;
    const gameBoardWidth = GAME_BOARD[0].length;

    tile.tileType.terrain = terrainType;
    ctx.fillRect(tile.getDrawX(), tile.getDrawY(), tile.getDrawSize(), tile.getDrawSize());
    //console.log(EDIT_BRUSH_SIZE)
    for (let row = tile.y - EDIT_BRUSH_SIZE + 1; row < tile.y + EDIT_BRUSH_SIZE - 1; row++) {
        for (let col = tile.x - EDIT_BRUSH_SIZE + 1; col < tile.x + EDIT_BRUSH_SIZE - 1; col++) {
            if (row >= 0 && row < gameBoardHeight && col >= 0 && col < gameBoardWidth) {

                if (tempTile.tileType instanceof LandTile) {
                    GAME_BOARD[row][col].tileType = new LandTile(PLAIN_TILE);
                    tempTile.tileType.terrain = terrainType;
                    ctx.fillRect(tempTile.getDrawX(), tempTile.getDrawY(), tempTile.getDrawSize(), tempTile.getDrawSize());
                }
                tempTile = GAME_BOARD[row][col];
                if (tempTile.tileType instanceof LandTile) {
                    tempTile.tileType.terrain = terrainType;
                    ctx.fillRect(tempTile.getDrawX(), tempTile.getDrawY(), tempTile.getDrawSize(), tempTile.getDrawSize());
                }
            }

        }
    }


}

function getSelectedTerrainObject() {
    switch (SELECTOR.selectorType) {
        case "plain":
            return PLAIN_TILE;
        case "mountain":
            return MOUNTAIN_TILE;
        case "forest":
            return FOREST_TILE;
        case "river":
            return RIVER_TILE;
        case "desert":
            return DESERT_TILE;
        case "tundra":
            return TUNDRA_TILE;

    }

}

function getMousePosition(c, e) {
    var boundary = c.getBoundingClientRect();
    // (e.clientX, e.clientY)  => Mouse coordinates wrt whole browser
    //  (boundary.left, boundary.top) => Canvas starting coordinate
    //     console.log(e.clientX - boundary.left, e.clientY - boundary.top);
    // console.log((e.clientX - boundary.left)/boundary.width);
    // console.log((e.clientY - boundary.top)/boundary.height);
    return {
        x: (e.clientX - boundary.left) / boundary.width,
        y: (e.clientY - boundary.top) / boundary.height
    };
}
function parseIntWithDefault(number,defaultNumber){
    if(isNaN(parseInt(number))){
        return defaultNumber;
    }else{
        return parseInt(number);
    }
}
function placeCustomColonyMain(tile) {
    const newColony = createNewColonyWithStats(document.getElementById("custom_colony_name_input").value,
        document.getElementById("custom_colony_color_input").value,

        BASE_ATTACK, BASE_DEFENSE,
        // parseInt(document.getElementById("custom_colony_attack_input").value),
        // parseInt(document.getElementById("custom_colony_defense_input").value),
        BASE_RECRUIT_PERC, BASE_POP_GROWTH, BASE_EXPAND_RATE,
        parseIntWithDefault(document.getElementById("custom_colony_strength_input").value,0),
        COLONY_FLAG_EDITOR.currentFlag
    );
    addCustomColonyTraits(newColony)

    newColony.reserveTroops =  parseIntWithDefault(document.getElementById("custom_colony_troops_input").value,20);
    COLONY_ARRAY.push(newColony);

    placeCustomColonyOnBoard(tile, newColony,  parseIntWithDefault(document.getElementById("custom_colony_capital_population_input").value,500));
    //TODO make sure clicked tile is land
    tile.tileType.population.tilePopCap =  parseIntWithDefault(document.getElementById("custom_colony_capital_population_input").value,500);
    drawTile(tile)
    newColony.politics.ideoAuthority = document.getElementById('custom_colony_ideo_auth').value / 101
    newColony.politics.ideoRadicalism = document.getElementById('custom_colony_ideo_rad').value / 101
    newColony.politics.ideoProgress = document.getElementById('custom_colony_ideo_prog').value / 101
    newColony.createNewStatDisplay();
    newColony.createNewOverlayButton();
    newColony.createNewAllianceStub();

    SELECTOR.selectorType = "NONE";

}

function drawColonyBordersMain(tile) {
    const gameBoardHeight = GAME_BOARD.length;
    const gameBoardWidth = GAME_BOARD[0].length;
    var tempTile
    for (let row = tile.y - EDIT_BRUSH_SIZE + 1; row < tile.y + EDIT_BRUSH_SIZE - 1; row++) {
        for (let col = tile.x - EDIT_BRUSH_SIZE + 1; col < tile.x + EDIT_BRUSH_SIZE - 1; col++) {
            if (row >= 0 && row < gameBoardHeight && col >= 0 && col < gameBoardWidth) {

                tempTile = GAME_BOARD[row][col];
                if (tempTile.tileType instanceof LandTile) {

                    // console.log(tempTile.tileType.population.pop)
                    tempTile.tileType.population.setStatsForInitialPlacement(tempTile, SELECTOR.selectedColony, tempTile.tileType.population.pop)

                    drawTile(tempTile);
                }
            }
        }

    }
}

//TODO find a place for this (startGame()?)
c.addEventListener('mousemove', handleMouseMove, false);
c.addEventListener('mousedown', handleMouseDown, false);
c.addEventListener('ontouchstart', handleMouseDown, false);
c.addEventListener('touchend', handleMouseUp, false);
c.addEventListener('mouseup', handleMouseUp, false);

/**
 * 
 * Math 
 * 
 */


function createRawBoard() {
    //Improved//


    var mapArray = [];
    var tempRow;
    var tempTile;
    var tileColor;

    const allImageData = ctx.getImageData(0, 0, BOARD_WIDTH, BOARD_HEIGHT);


    for (let row = 0; row < BOARD_HEIGHT; row += 1) {
        tempRow = [];
        for (let col = 0; col < BOARD_WIDTH; col += 1) {
            tempTile = new Tile(col, row, 1);
            tempTile.toDraw = true;

            if (
                allImageData.data[(col + row * BOARD_WIDTH) * 4 + 0] > 200 &&
                allImageData.data[(col + row * BOARD_WIDTH) * 4 + 1] > 200 &&
                allImageData.data[(col + row * BOARD_WIDTH) * 4 + 2] > 200) {
                // tile is Water
                tempTile.tileType = new WaterTile(WATER_TILE);

            } else {
                tempTile.tileType = new LandTile(PLAIN_TILE);
                tempTile.tileType.setPopulation(new Population(BASE_POP, null))
            }
            tempRow.push(tempTile)
        }
        mapArray.push(tempRow)
    }
    return mapArray;
}


function drawTile(tile) {
    var tilePop = tile.tileType.population;
    //console.log(MAP_DISPLAY_STYLE);

    if (MAP_DISPLAY_STYLE === "political" && tile.isEmpty == false) {
        //TODO TEMPARARY
        //console.log("DRAWING");
        if (tile.isOccupiedLand) {
            ctx.fillStyle = tilePop.colony.color;
        } else {
            ctx.fillStyle = tile.tileType.ship.population.colony.color;
        }


    } else if (MAP_DISPLAY_STYLE === "ideology" && tile.isEmpty == false) {
        //TODO TEMPARARY
        //console.log("DRAWING");
        if (tile.isOccupiedLand) {
            ctx.fillStyle = tilePop.colony.politics.getColor()
        } else {
            ctx.fillStyle = tile.tileType.ship.population.colony.color;
        }
    } else if (MAP_DISPLAY_STYLE == "alliance" && tile.isEmpty == false) {

        if (tile.isOccupiedLand) {
            if (tilePop.colony.alliance) {
                ctx.fillStyle = tilePop.colony.alliance.color
                //console.log('its doing it!')
            } else {
                ctx.fillStyle = tilePop.colony.color
            }
        } else {
            if (tile.tileType.ship.population.colony.alliance) {
                ctx.fillStyle = tile.tileType.ship.population.colony.alliance.color
            } else {
                ctx.fillStyle = tile.tileType.ship.population.colony.color;
            }
        }

    }
    else if (MAP_DISPLAY_STYLE === "geo") {
        ctx.fillStyle = tile.tileType.terrain.color;
    } else if (MAP_DISPLAY_STYLE === "pop" && tile.isEmpty == false) {

        const maxPop = findMaxPopFromColonies();
        // convert to color and color tile
        if (tile.tileType.terrain.name === "water") {
            ctx.fillStyle = "#" + toHex(Math.floor(255 - (255 * tile.tileType.ship.population.pop / maxPop))) + toHex(Math.floor(255 - (255 * tile.tileType.ship.population.pop / maxPop))) + "FF";
        } else {
            ctx.fillStyle = "#" + toHex(Math.floor(255 - (255 * tilePop.pop / maxPop))) + toHex(Math.floor(255 - (255 * tilePop.pop / maxPop))) + "FF";
        }

    } else if (MAP_DISPLAY_STYLE === "attack" && tile.isEmpty == false) {
        const maxAttack = findMaxAttackFromColonies();

        if (tile.tileType.terrain.name === "water") {
            // naval strength -- since water
            //TODO get max ship strength
            ctx.fillStyle = "#FF" + toHex(Math.floor(255 - (255 * tile.tileType.ship.strength / maxAttack))) + toHex(Math.floor(255 - (255 * tile.tileType.ship.strength / maxAttack)));
        } else {
            // console.log(`${tile.getCombinedAttack()}/${maxAttack} = ${tile.getCombinedAttack()/maxAttack}`);
            var g = Math.floor(255 - (255 * tile.getCombinedAttack() / maxAttack));
            var b = Math.floor(255 - (255 * tile.getCombinedAttack() / maxAttack));
            if (g < 0) {
                // console.log(`g=${g}`);
                g = 0
            }
            if (b < 0) {
                // console.log(`b=${b}`);
                b = 0
            }
            // console.log(`#FF${toHex(g)}${toHex(b)}`);
            ctx.fillStyle = "#FF" + toHex(g) + toHex(b);
            // console.log("#FF" + toHex(g) + toHex(b));
        }

    }
    else if (MAP_DISPLAY_STYLE === "defense" && tile.isEmpty == false) {
        const maxDefense = findMaxDefenseFromColonies();

        if (tile.tileType.terrain.name === "water") {
            // naval health -- since water
            //TODO get max ship health
            ctx.fillStyle = "#FF" + toHex(Math.floor(255 - (255 * tile.tileType.ship.health / maxDefense))) + "FF";
        } else {
            // console.log(`${tile.getCombinedAttack()}/${maxAttack} = ${tile.getCombinedAttack()/maxAttack}`);
            var g = Math.floor(255 - (255 * tile.getCombinedDefense() / maxDefense));
            var r = Math.floor(255 - (255 * tile.getCombinedDefense() / maxDefense));
            if (g < 0) {
                // console.log(`g=${g}`);
                g = 0
            }
            if (r < 0) {
                // console.log(`b=${b}`);
                r = 0
            }
            // console.log(`#FF${toHex(g)}${toHex(b)}`);
            ctx.fillStyle = "#" + toHex(r) + toHex(g) + "FF";
            // console.log("#FF" + toHex(g) + toHex(b));
        }

    } else if (MAP_DISPLAY_STYLE === "frontline" && tile.isEmpty == false && !(tile.tileType instanceof WaterTile)) {
        //console.log(tile);
        if (tile.tileType.inCombat) {
            ctx.fillStyle = "#FF00AC";
        } else {
            ctx.fillStyle = tile.tileType.terrain.color;
        }

    } else if (MAP_DISPLAY_STYLE === "troop" && tile.isEmpty == false && !(tile.tileType instanceof WaterTile)) {

        if (tilePop.troop.troopCount > 1) {
            ctx.fillStyle = tile.tileType.population.colony.color;
        } else {
            ctx.fillStyle = "#ACACAC";
        }

        // }else if(tile.tileType.ship.population.troop.troopCount > 1){
        //     ctx.fillStyle =tile.tileType.ship.population.colony.color;
        // }

    } else if (MAP_DISPLAY_STYLE === "supply" && tile.isOccupiedLand) {
        if (tilePop.storage.supply.supplyCount < 1) {
            ctx.fillStyle = "#FF0000";
        }
        else if (tilePop.storage.supply.supplyCount < 1000) {
            ctx.fillStyle = "#FA5858";
        } else if (tilePop.storage.supply.supplyCount < 5000) {
            ctx.fillStyle = "#FAC558";
        } else if (tilePop.storage.supply.supplyCount < 10_000) {
            ctx.fillStyle = "#EAFA58";
        } else {
            ctx.fillStyle = "#379F1B";
        }
    } else if (MAP_DISPLAY_STYLE === "colonyControl" && tile.isOccupiedLand) {
        var r;
        var g;
        var b;
        // console.log(tile.tileType.population.colonyControl);

        if (tile.tileType.population.colonyControl > .9) {
            // console.log("Ello");
            r = 0
            g = 140
            b = 0
        } else if (tile.tileType.population.colonyControl > .6) {
            r = 77
            g = 220
            b = 0
        } else if (tile.tileType.population.colonyControl > .4) {
            r = 255
            g = 240
            b = 0
        }
        else if (tile.tileType.population.colonyControl > .2) {
            r = 255
            g = 148
            b = 0
        }
        else if (tile.tileType.population.colonyControl > .1) {
            r = 255
            g = 80
            b = 0
        }
        else if (tile.tileType.population.colonyControl > 0) {
            r = 255
            g = 0
            b = 0
        }
        // console.log(`${r},${g},${b}`);
        ctx.fillStyle = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
        // console.log(ctx.fillStyle);
    }
    else {
        // console.log(tile);
        ctx.fillStyle = tile.tileType.terrain.color;
    }

    ctx.fillRect(tile.getDrawX(), tile.getDrawY(), tile.getDrawSize(), tile.getDrawSize());
    tile.toDraw = false;
}

function toHex(d) {
    return ("0" + (Number(d).toString(16))).slice(-2).toUpperCase()
}

/**
 * 
 * HTML
 * 
 */

function addDisplayMapButton() {
    let btn = document.getElementById("display_map_btn");


    btn.onclick = function () {
        STEPS = 0;
        SIZE = parseInt(document.getElementById("size_input").value);

        BOARD_WIDTH = c.width;
        BOARD_HEIGHT = c.height;
        // create a raw board to act as the image
        if (UPDATE_RAW_BOARD) {
            RAW_BOARD = createRawBoard();
            UPDATE_RAW_BOARD = false;
        }


        //console.log(RAW_BOARD);

        //GAME_BOARD = convertCanvasTo2dArray(SIZE);
        GAME_BOARD = createGameBoardWithProperSizeFromRaw(SIZE);

        //reset overlay colonies 
        document.getElementById("overlay_buttons").innerHTML = "";


        //log(GAME_BOARD)

        ctx.clearRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT)
        drawAllTiles();

        //shuffleGameBoard();
        SHUFFLED_GAME_BOARD = shuffleGameBoard();

        // console.log(SHUFFLED_GAME_BOARD);
        // console.log(GAME_BOARD)

        //console.log(STEPS)
    }
}

function addChangeMapModeButton() {
    let btn = document.getElementById("change_map_mode_btn");
    btn.innerHTML = "Mode: Political"


    btn.onclick = function () {
        switch (MAP_DISPLAY_STYLE) {
            case "political":
                btn.innerHTML = "Mode: Geo";
                MAP_DISPLAY_STYLE = "geo"
                break;
            case "geo":
                btn.innerHTML = "Mode: Population";
                MAP_DISPLAY_STYLE = "pop"
                break;
            case "pop":
                btn.innerHTML = "Mode: Political";
                MAP_DISPLAY_STYLE = "political"
                break;
        }

        drawAllTiles();
    }
}

function addPrintGameBoard() {
    let btn = document.getElementById("print_game_board");
    btn.style.display = "none";

    btn.onclick = function () {
        //console.log(GAME_BOARD);

    }
}

function addPauseButton() {
    let btn = document.getElementById("play_pause_btn");

    btn.onclick = function () {

        if (RUN_GAME) {
            RUN_GAME = false;
            btn.innerHTML = "Play";
            btn.style.backgroundColor = "#6E9E5F";
        } else {
            RUN_GAME = true;
            btn.innerHTML = "Stop";
            btn.style.backgroundColor = "#F53B38";
        }

    };
}

function addNumberOfColniesButton() {
    let btn = document.getElementById("create_random_colonies");

    btn.onclick = function () {
        //document.getElementById("overlay_buttons").innerHTML = "";

        //TODO set COLONY_ARRAY = [] ??? check if colonies remain in there
        createRandomColoniesMain();
        createNewStatDisplays();


    }
}

function showElements(elements, specifiedDisplay) {
    elements = elements.length ? elements : [elements];
    for (var index = 0; index < elements.length; index++) {
        elements[index].style.display = specifiedDisplay || 'block';
    }
}



function hideAllToggleElements() {
    hideAllElementsInClass('specific_map_mode_buttons');
    hideAllElementsInClass('specific_edit_terrain_buttons');
    hideAllElementsInClass('create_custom_colony_group');

    hideAllElementsInClass('specific_sort_options');
    hideAllElementsInClass('specific_edit_stats_buttons');
    hideAllElementsInClass('edit_population_editor');
    hideAllElementsInClass('create_custom_alliance_group');
    hideAllElementsInClass('specific_setting_command_buttons');

}


function addToggleButtons() {
    // 
    var btn = document.getElementById("show_map_modes_btn");

    const elem = document.getElementById('display_political_map_btn');
    const style = window.getComputedStyle(elem);


    btn.onclick = function () {
        if (INTERFACE_RECORDER.toggleMapModes()) {
            showAllElementsInClass('specific_map_mode_buttons');
        } else {
            hideAllElementsInClass('specific_map_mode_buttons');
        }
    }

    btn = document.getElementById("show_edit_terrain_btn");
    btn.onclick = function () {
        if (INTERFACE_RECORDER.toggleEditTerrain()) {
            showAllElementsInClass('specific_edit_terrain_buttons');
        } else {
            hideAllElementsInClass('specific_edit_terrain_buttons');
        }
    }

    btn = document.getElementById("show_add_custom_colony_btn");
    btn.onclick = function () {
        if (INTERFACE_RECORDER.toggleAddCustomColony()) {
            showAllElementsInClass('create_custom_colony_group');
        } else {
            hideAllElementsInClass('create_custom_colony_group');
        }
    }

    btn = document.getElementById("show_edit_stats_btn");
    btn.onclick = function () {
        if (INTERFACE_RECORDER.toggleCustomStats()) {
            showAllElementsInClass('specific_edit_stats_buttons');
        } else {
            hideAllElementsInClass('specific_edit_stats_buttons');
        }
    }
    btn = document.getElementById("show_sorts");
    btn.onclick = function () {
        if (INTERFACE_RECORDER.toggleSorts()) {
            showAllElementsInClass('specific_sort_options');
        } else {
            hideAllElementsInClass('specific_sort_options');
        }
    }
    btn = document.getElementById("show_commands_settings");
    btn.onclick = function () {
        if (INTERFACE_RECORDER.toggleCommands()) {
            showAllElementsInClass('specific_setting_command_buttons');
        } else {
            hideAllElementsInClass('specific_setting_command_buttons');
        }
    }

    btn = document.getElementById("show_add_custom_alliance");
    btn.onclick = function () {
        if (INTERFACE_RECORDER.toggleAddCustomAlliance()) {
            showAllElementsInClass('create_custom_alliance_group');
        } else {
            hideAllElementsInClass('create_custom_alliance_group');
        }
    }


}




function addEditStatsButtons() {


    // edit stats -> pop button
    var btn = document.getElementById("edit_population_on_map_btn");
    btn.onclick = function () {
        if (INTERFACE_RECORDER.togglePopulationEditor()) {
            showAllElementsInClass('edit_population_editor');
            //convert map to pop map
            drawPopMapForAllTiles();
        } else {
            hideAllElementsInClass('edit_population_editor');
        }
    }


    btn = document.getElementById("edit_pop_to_map");
    btn.onclick = function () {
        INTERFACE_RECORDER.recordMaxPopFromAllTiles(GAME_BOARD);
        SELECTOR.selectorType = "edit_pop_on_map"
    }


    btn = document.getElementById("update_pop_map");
    btn.onclick = function () {
        drawPopMapForAllTiles();
    }



}


function addMapModeButtons() {


    // political map mode button
    var btn = document.getElementById("display_political_map_btn");
    btn.onclick = function () {
        MAP_DISPLAY_STYLE = "political"
        drawAllTiles();

    }
    // alliance map mode button
    var btn = document.getElementById("display_alliance_map_btn");
    btn.onclick = function () {
        MAP_DISPLAY_STYLE = "alliance"
        drawAllTiles();

    }
    var btn = document.getElementById("display_alliance_flags_map_btn");
    btn.onclick = function () {
        MAP_DISPLAY_STYLE = "allianceFlags"
        drawAllTiles();
        drawAllTilesForSpecialMaps();

    }

    // geo map mode button
    btn = document.getElementById("display_geo_map_btn");
    btn.onclick = function () {
        MAP_DISPLAY_STYLE = "geo"
        drawAllTiles();

    }

    // pop map mode button
    btn = document.getElementById("display_pop_map_btn");
    btn.onclick = function () {
        MAP_DISPLAY_STYLE = "pop"
        drawAllTiles();
    }


    // Attack map mode button
    btn = document.getElementById("display_attack_map_btn");
    btn.onclick = function () {
        MAP_DISPLAY_STYLE = "attack"
        drawAllTiles();
    }

    // Defense map mode button
    btn = document.getElementById("display_defense_map_btn");
    btn.onclick = function () {
        MAP_DISPLAY_STYLE = "defense"
        drawAllTiles();
    }

    // Troop map mode button
    btn = document.getElementById("display_troop_map_btn");
    btn.onclick = function () {
        MAP_DISPLAY_STYLE = "troop"
        drawAllTiles();
    }


    // frontline map mode button
    btn = document.getElementById("display_frontline_map_btn");
    btn.onclick = function () {
        MAP_DISPLAY_STYLE = "frontline"
        drawAllTiles();
    }


    // supply map mode button
    btn = document.getElementById("display_supply_map_btn");
    btn.onclick = function () {
        MAP_DISPLAY_STYLE = "supply"
        drawAllTiles();
    }



    // supply map mode button
    btn = document.getElementById("display_colony_control_map_btn");
    btn.onclick = function () {
        MAP_DISPLAY_STYLE = "colonyControl"
        drawAllTiles();
    }
    btn = document.getElementById("display_ideology_map_btn");
    btn.onclick = function () {
        MAP_DISPLAY_STYLE = "ideology"
        drawAllTiles();
    }

    btn = document.getElementById("display_flags_map_btn");
    btn.onclick = function () {
        MAP_DISPLAY_STYLE = "flags"
        drawAllTiles();
        drawAllTilesForSpecialMaps();
    }

}

function addEditTerrainButtons() {
    var btn = document.getElementById("main_terrain_edit_btn");
    hideAllEditTerrainButtons();

    btn.onclick = function () {
        if (SHOW_EDIT_TERRAIN_BUTTONS) {
            btn.innerHTML = "Save Terrain";
            btn.style.backgroundColor = "#72DF9390";
            showAllEditTerrainButtons();
        } else {
            btn.innerHTML = "Edit Terrain";
            btn.style.backgroundColor = "#72DFDB90";
            hideAllEditTerrainButtons();

        }

    }


}

function addSortTypeButtons() {
    var btn = document.getElementById("sort_population");
    btn.onclick = function () {
        sortColoniesByPop()
    }
    var btn = document.getElementById("sort_tile");
    btn.onclick = function () {
        sortColoniesByTiles()
    }
    var btn = document.getElementById("sort_strength");
    btn.onclick = function () {
        sortColoniesByStrength()
    }
    var btn = document.getElementById("sort_troops");
    btn.onclick = function () {
        sortColoniesByTroops()
    }
    var btn = document.getElementById("sort_capability");
    btn.onclick = function () {
        sortColoniesByCapability()
    }
}

function addEditIndividualTerrainButtons() {

    // edit mountain button
    var btn = document.getElementById("mountains_terrain_edit_btn");
    btn.onclick = function () {
        SELECTOR.selectorType = "mountain";
    }

    // edit plain button
    var btn = document.getElementById("plains_terrain_edit_btn");
    btn.onclick = function () {
        SELECTOR.selectorType = "plain"

    }

    // edit river button
    var btn = document.getElementById("rivers_terrain_edit_btn");
    btn.onclick = function () {
        SELECTOR.selectorType = "river"

    }

    // edit forest button
    var btn = document.getElementById("forests_terrain_edit_btn");
    btn.onclick = function () {
        SELECTOR.selectorType = "forest"

    }

    // edit desert button
    var btn = document.getElementById("deserts_terrain_edit_btn");
    btn.onclick = function () {
        SELECTOR.selectorType = "desert"
    }

    // edit tundra button
    var btn = document.getElementById("tundras_terrain_edit_btn");
    btn.onclick = function () {
        SELECTOR.selectorType = "tundra"
    }

    // edit ocean button
    var btn = document.getElementById("oceans_terrain_edit_btn");
    btn.onclick = function () {
        SELECTOR.selectorType = "ocean"

    }
}

function showAllEditTerrainButtons() {
    var div = document.getElementsByClassName("hidden_terrain_buttons");
    for (var i = 0; i < div.length; i += 1) {
        div[i].style.display = 'block';
    }
    SHOW_EDIT_TERRAIN_BUTTONS = false;


}

function hideAllElementsInClass(className) {
    var div = document.getElementsByClassName(className);
    for (var i = 0; i < div.length; i += 1) {
        div[i].style.display = 'none';
    }
}

function showAllElementsInClass(className) {
    var div = document.getElementsByClassName(className);
    for (var i = 0; i < div.length; i += 1) {
        div[i].style.display = 'block';
    }
}

function hideAllEditTerrainButtons() {

    var div = document.getElementsByClassName("hidden_terrain_buttons");
    for (var i = 0; i < div.length; i += 1) {
        div[i].style.display = 'none';
    }

    SHOW_EDIT_TERRAIN_BUTTONS = true;


}

function addSpeedSlider() {

    const slider = document.getElementById("speed_slider");
    slider.oninput = function () {
        clearInterval(MAIN_INTERVAL)
        UPDATE_TIME = 255 - slider.value; // full -> every 5 mil-seconds
        //console.log(UPDATE_TIME)
        MAIN_INTERVAL = setInterval(function () { update() }, UPDATE_TIME);
    }
}

function addEditBrushSlider() {
    const slider = document.getElementById("brush_size_slider");

    slider.oninput = function () {
        EDIT_BRUSH_SIZE = parseInt(slider.value)
        //console.log(EDIT_BRUSH_SIZE);
    }
}

function addSelectButton() {
    var btn = document.getElementById("select_tile_btn");
    //btn.style.display = "none";

    btn.onclick = function () {
        SELECTOR.selectorType = "select"
    }


    btn = document.getElementById("select_colony_btn");
    //btn.style.display = "none";

    btn.onclick = function () {
        SELECTOR.selectorType = "select_colony";
    }
}

function addSaveMapButton() {
    let btn = document.getElementById("save_map_btn");
    //btn.style.display = "none";

    btn.onclick = function () {
        saveEntireMapMain();// dont need, called and returns in dowload

        downloadEntireMapDataToTxt();
    }
}


function saveEntireMapMain() {

    const save = new Save();

    //inital
    save.addInitialSimData(VERSION, GAME_BOARD[0][0].size, GAME_BOARD.length, GAME_BOARD[0].length)

    //colony
    save.addColonyData(COLONY_ARRAY);

    //tiles
    save.addTileData(GAME_BOARD)

    // console.log(save.getSaveString());

    //Alliances
    save.addAllianceArray(COLONY_ARRAY);

    return save.getSaveString();
}


function addPlaceAndDrawCustomColonyButton() {
    const btnPlace = document.getElementById("custom_colony_place_colony_btn");
    btnPlace.onclick = function () {
        SELECTOR.selectorType = "place_colony"
        //console.log(SELECTOR.selectorType);
    }

    const btnDraw = document.getElementById("custom_colony_draw_colony_btn");
    btnDraw.onclick = function () {
        const overlay = document.getElementById("select_colony_overlay");

        overlay.style.display = "block";
        overlay.onclick = function () {
            overlay.style.display = "none";
        }
        SELECTOR.showSelectColonyOverlay = true;


        // console.log(SELECTOR.selectorType);
    }
}

function addViewUpcomingUpdates() {

    let btn = document.getElementById("view_upcoming_updates");

    btn.onclick = function () {
        const overlay = document.getElementById("upcoming_updates_overlay");

        overlay.style.display = "block";
        overlay.onclick = function () {
            overlay.style.display = "none";
        }
        SELECTOR.showSelectColonyOverlay = true;
    }

}

function addViewCredits() {
    let btn = document.getElementById("view_credits");

    btn.onclick = function () {
        const overlay = document.getElementById("credits_overlay");

        overlay.style.display = "block";
        overlay.onclick = function () {
            overlay.style.display = "none";
        }
        SELECTOR.showSelectColonyOverlay = true;
    }

}


/**
 * 
 *  === Editing Stats ===
 * 
 */

function editPopMain(tile) {
    // console.log(`Tile: ${tile}`);
    // check if feather is clicked
    const toFeather = document.getElementById("feather_brush_checkbox").checked;
    const popToChange = parseInt(document.getElementById("edit_pop_input").value);
    const brushSize = parseInt(document.getElementById("brush_size_slider").value);

    //TODO get checkbox to work
    editPop(toFeather, popToChange, brushSize, tile);

    // console.log(popToChange, brushSize);
}

function editPop(toFeather, popToChange, brushSize, tile) {
    const gameBoardHeight = GAME_BOARD.length;
    const gameBoardWidth = GAME_BOARD[0].length;
    var value;
    var tempTile;
    var maxPop = INTERFACE_RECORDER.recordedMaxPop;
    var tilePop;

    for (let row = tile.y - brushSize + 1; row < tile.y + brushSize - 1; row++) {
        for (let col = tile.x - brushSize + 1; col < tile.x + brushSize - 1; col++) {
            if (row >= 0 && row < gameBoardHeight && col >= 0 && col < gameBoardWidth) {

                tempTile = GAME_BOARD[row][col];
                if (tempTile.tileType instanceof LandTile) {
                    if (toFeather) {
                        value = Math.abs(row + col - tile.x - tile.y);
                        if (value == 0) { value = 1; }
                        // console.log(`value: ${value}`);
                        tempTile.tileType.population.changePop(popToChange / value);
                        tempTile.tileType.population.tilePopCap = tempTile.tileType.population.pop
                    } else {
                        tempTile.tileType.population.changePop(popToChange);
                        tempTile.tileType.population.tilePopCap = tempTile.tileType.population.pop;


                    }

                    tilePop = tempTile.tileType.population;
                    //TODO THis is a quick Fix for when pop > maxPop [in toHex() if -1 then FF?]
                    if (tilePop.pop > INTERFACE_RECORDER.recordedMaxPop) {
                        INTERFACE_RECORDER.recordedMaxPop = tilePop.pop;
                    }
                    maxPop = INTERFACE_RECORDER.recordedMaxPop;
                    ctx.fillStyle = "#" + toHex(Math.floor(255 - (255 * tilePop.pop / maxPop))) + toHex(Math.floor(255 - (255 * tilePop.pop / maxPop))) + "FF";
                    // console.log(`255-(255*${tilePop.pop}/${maxPop}) = ${255-(255*(tilePop.pop/maxPop))} = ${toHex(Math.floor(255-(255*(tilePop.pop/maxPop))))}`);
                    ctx.fillRect(tempTile.getDrawX(), tempTile.getDrawY(), tempTile.getDrawSize(), tempTile.getDrawSize());

                }
            }

        }
    }



}



/**
 * 
 * ==== Board Setup ====
 * 
 */



function createGameBoardWithProperSizeFromRaw(size = SIZE) {
    var tempRow = [];
    var tempTile;
    var board = [];

    const popMap = createRandomPopMapWithSize(BOARD_WIDTH, BOARD_HEIGHT);

    if (size == 1) {
        board = RAW_BOARD
        return board;
    }

    for (let row = 0; row < BOARD_HEIGHT; row += size) {
        tempRow = []
        for (let col = 0; col < BOARD_WIDTH; col += size) {
            tempTile = new Tile(col / size, row / size, size)

            // merges group of tiles into 1 tile returns true if plain tile type
            if (returnMergedTile(col, row, col + size, row + size)) {
                //plain tile
                tempTile.tileType = new LandTile(PLAIN_TILE);
                tempTile.tileType.population = new Population(popMap[row][col], null);

                //tempTile.tileType.population.pop = Math.random() * maxStartingPop;
            } else {
                //tempTile.tileType = WATER_TILE;
                tempTile.tileType = new WaterTile(WATER_TILE);

            }
            tempRow.push(tempTile);
            STEPS++;

        }
        board.push(tempRow);

    }
    return board;
}

function returnMergedTile(x, y, x2, y2) {
    var plainCount = 0;
    var waterCount = 0;


    for (let row = y; row < y2; row++) {
        for (let col = x; col < x2; col++) {
            if (row < BOARD_HEIGHT && col < BOARD_WIDTH) {
                //console.log("RC", row + ", " + col);
                //console.log("BHW" , BOARD_HEIGHT, BOARD_WIDTH + "YX" , row, col)
                // console.log(RAW_BOARD[row][col]);
                if (RAW_BOARD[row][col].tileType.terrain.name === "water") {
                    waterCount++;
                } else {
                    plainCount++;
                }
                STEPS++;
            }

        }
    }
    // console.log("YX", y + ", " + x+ "| Y2X2", y2 + ", " + x2);
    // console.log(plainCount>=waterCount);

    return (plainCount >= waterCount);

}

function findMaxPopFromColonies() {
    //todo find the largest population from all colonies for map mode

    var maxPrevMaxPop = COLONY_ARRAY[0].prevMaxPop;

    for (let i = 1; i < COLONY_ARRAY.length; i++) {
        if (COLONY_ARRAY[i].prevMaxPop > maxPrevMaxPop) {
            maxPrevMaxPop = COLONY_ARRAY[i].prevMaxPop;
        }

    }
    return maxPrevMaxPop;
}


function findMaxDefenseFromColonies() {
    //todo find the largest population from all colonies for map mode

    var prevMaxDefense = COLONY_ARRAY[0].prevMaxDefense;

    for (let i = 1; i < COLONY_ARRAY.length; i++) {
        if (COLONY_ARRAY[i].prevMaxDefense > prevMaxDefense) {
            prevMaxDefense = COLONY_ARRAY[i].prevMaxDefense;
        }

    }
    return prevMaxDefense;
}


function findMaxAttackFromColonies() {
    var prevMaxAttack = COLONY_ARRAY[0].prevMaxAttack;

    for (let i = 1; i < COLONY_ARRAY.length; i++) {
        if (COLONY_ARRAY[i].prevMaxAttack > prevMaxAttack) {
            prevMaxAttack = COLONY_ARRAY[i].prevMaxAttack;
        }

    }
    return prevMaxAttack;
}

/**
 * 
 * ==== Game Setup ====
 * 
 */

function createRandomColoniesMain() {
    // reset displayed colonies
    document.getElementById('stat_holder').innerHTML = ""
    // get number of colonies to create 
    COLONY_COUNT = document.getElementById("random_colonies_input").value;
    //console.log(COLONY_COUNT);
    if (COLONY_COUNT > 0) {
        // create new colony objects and place and draw them
        createCustomColoniesByAmount(COLONY_COUNT)
    }

    //console.log(COLONY_ARRAY);
}

function createCustomColonyName() {
    return generateName()
}

function createCustomColoniesByAmount(numColonies) {

    var randomColor;
    var tempColony;

    for (let i = 0; i < numColonies; i++) {
        randomColor = '#'
        for (let i2 = 0; i2 < 3; i2++) {
            let rc = Math.floor(Math.random() * 16 * 14)
            if (rc < 16) {
                randomColor += '0'
            }
            randomColor += rc.toString(16)
        }

        //tempColony = createNewColonyWithStats("Colony"+i, randomColor, BASE_ATTACK, BASE_DEFENSE, BASE_RECRUIT_PERC, BASE_POP_GROWTH, BASE_EXPAND_RATE);
        tempColony = createNewColonyWithStats(createCustomColonyName(), randomColor, BASE_ATTACK, BASE_DEFENSE, BASE_RECRUIT_PERC, BASE_POP_GROWTH, BASE_EXPAND_RATE, BASE_MIL_STRENGTH);


        // add colony to array
        COLONY_ARRAY.push(tempColony);

        //TODO Optomize placing new colonies
        //place colonies on map

        const boardWidth = GAME_BOARD[0].length;
        const boardHeigth = GAME_BOARD.length

        var newX = Math.floor(Math.random() * boardWidth);
        var newY = Math.floor(Math.random() * boardHeigth);
        //console.log(newX, newY,"BWH", BOARD_WIDTH,BOARD_HEIGHT)
        //console.log(GAME_BOARD);

        while (GAME_BOARD[newY][newX].tileType.terrain.isMoveable == false) {
            var newX = Math.floor(Math.random() * boardWidth);
            var newY = Math.floor(Math.random() * boardHeigth);
        }


        // placing colony
        placeColonyOnBoard(newX, newY, tempColony);

        // add colony to selecting overlay
        tempColony.createNewOverlayButton();
        tempColony.createNewAllianceStub();

        drawTile(GAME_BOARD[newY][newX]);
    }
}


function placeColonyOnBoard(x, y, colony) {
    GAME_BOARD[y][x].tileType.population.setStatsForInitialPlacement(GAME_BOARD[y][x], colony, BASE_POP);
    //console.log("Placing Colony");
}
function placeCustomColonyOnBoard(tile, colony, pop) {
    //console.log(pop);
    GAME_BOARD[tile.y][tile.x].tileType.population.setStatsForInitialPlacement(GAME_BOARD[tile.y][tile.x], colony, pop);
    //console.log("Placing Custom Colony");

}


function createRandomPopMapWithSize(xSize, ySize) {
    const indexArray = createRandomPopIndexArray(xSize, ySize);
    const modArray = createRandomPopModArray(xSize, ySize);

    var popMap = [];
    var tempArray = [];
    var pop;
    for (let row = 0; row < ySize; row++) {
        tempArray = [];
        for (let col = 0; col < xSize; col++) {
            pop = getSurroundedTotal(col, row, indexArray)
            pop *= getSurroundedTotal(col, row, modArray);
            tempArray.push(pop * pop / 1000);
        }
        popMap.push(tempArray);
    }

    return popMap;
}

function getSurroundedTotal(x, y, array) {
    var total = 0
    total += 2 * array[y][x]
    if (x - 1 >= 0 && x + 1 < array[0].length && y - 1 >= 0 && y + 1 < array.length) {
        total += array[y - 1][x - 1]
        total += array[y - 1][x]
        total += array[y - 1][x + 1]

        total += array[y][x - 1]
        total += array[y][x + 1]

        total += array[y + 1][x - 1]
        total += array[y + 1][x]
        total += array[y + 1][x + 1]
    }

    return total;
}

function createRandomPopIndexArray(xSize, ySize) {
    var indexArray = [];
    var tempArray = [];
    const pop_const_modifier = 6 //base 6

    for (let row = 0; row < ySize; row++) {
        tempArray = [];
        for (let col = 0; col < xSize; col++) {
            tempArray.push(Math.random() * pop_const_modifier);
        }
        indexArray.push(tempArray);
    }
    return indexArray;
}

function createRandomPopModArray(xSize, ySize) {
    var modArray = [];
    var tempArray = [];
    const pop_const_modifier = 30 //base 30

    for (let row = 0; row < ySize; row++) {
        tempArray = [];
        for (let col = 0; col < xSize; col++) {
            tempArray.push(Math.random() * (pop_const_modifier - 0) + 0);
        }
        modArray.push(tempArray);
    }
    return modArray;
}

function addCustomColonyTraits(colony) {
    colony.traits.neutral = document.getElementById('neutral_trait_checkbox').checked
    colony.traits.landlocked = document.getElementById('landlocked_trait_checkbox').checked
    colony.traits.noalliance = document.getElementById('sovereign_trait_checkbox').checked
    colony.traits.warmonger = document.getElementById('warmonger_trait_checkbox').checked
    colony.traits.stagnant = document.getElementById('stagnant_trait_checkbox').checked
    colony.traits.defender = document.getElementById('defender_trait_checkbox').checked
    colony.traits.demilitarized = document.getElementById('demilitarized_trait_checkbox').checked
    colony.traits.unpopular = document.getElementById('unpopular_trait_checkbox').checked
}
/**
 * 
 * @param {String} teamId 
 * @param {String} color 
 * @param {Number} attack 
 * @param {Number} defense 
 * @param {Number} recruitPerc 
 * @param {Number} popGrowth 
 * @param {Number} expandRate 
 * @param {Number} milStrength 
 * @param {Flag} flag 
 * @returns 
 */
function createNewColonyWithStats(teamId, color, attack, defense, recruitPerc, popGrowth, expandRate, milStrength, flag) {
    //TODO make a similar function that creates random stats for the colony (if user wants random stats)
    // creates new colony
    //console.log(SELECTOR);
    var newColony = new Colony(teamId, color, SELECTOR, flag);
    newColony.setColonyStats(attack, defense, recruitPerc, popGrowth, expandRate, milStrength)
    return newColony;
}

function AttemptReproduce(tile) {
    // get a random neighboring tile
    var newX = randomIntFromRange(-1, 1) + tile.x
    var newY = randomIntFromRange(-1, 1) + tile.y

    const boardWidth = GAME_BOARD[0].length;
    const boardHeight = GAME_BOARD.length;



    if (WRAP_BOARD_OPT) {
        if (newX < 0) {
            newX = boardWidth - 1;
        }
        if (newX >= boardWidth) {
            newX = 0;
        }
        if (newY < 0) {
            newY = boardHeight - 1;
        }
        if (newY >= boardHeight) {
            newY = 0;
        }
    } else {
        if (!(newX >= 0 && newX < GAME_BOARD[0].length && newY >= 0 && newY < GAME_BOARD.length)) {
            return;
        }
    }

    var newTile = GAME_BOARD[newY][newX];
    //console.log(newTile);
    //check if tile is a waterTile
    if (newTile.tileType.terrain.isMoveable) {
        // check if new tile is empty
        if (tile.tileType.population.colony.isDead) {

        } else if (newTile.isEmpty) {
            //tile is empty and land, so expand!
            expandToEmptyTile(tile, newTile)
        } else {
            let allied = false;
            if (newTile.tileType.population.colony.alliance && tile.tileType.population.colony.alliance) {
                allied = newTile.tileType.population.colony.alliance == tile.tileType.population.colony.alliance
            }
            if (newTile.tileType.population.colony !== tile.tileType.population.colony && !allied) {
                // new tile is an enemy
                newTile.tileType.inCombat = true;
                tile.tileType.inCombat = true;
                // attackNewTileMain(tile, newTile);
            } else {
                // same team
                if (newTile.pop < tile.pop && !newTile.checkIfAtPopCap()) {
                    // sends pop to a lower populated tile
                    //tile.migrateSomePopToTile(newTile);
                }
            }
        }
    } else {

        //TODO condition for land tile attacking a ship  land -- reprodues onto water with an enemy
        // land tile sends off a navy (if it can)
        // check if you can build and newTile is empty and if new ship can be made

        if (newTile.isEmpty && !(tile.tileType.population.colony.traits.landlocked) && tile.tileType.population.colony.currentActiveShips < tile.tileType.population.colony.activeNavalCap) {

            // water tile is empty || checks if tile has enough pop to send troops
            newTile.tileType.createNewShipWithLandTile(newTile, tile);

        }
    }
}


function siegeLandTileMain(tile, newTile) {
    if (!gameruleInterFace.peacetime() ||
        (tile.tileType.ship.population.colony.willDoWar(newTile.tileType.population.colony)
            && (NAVAL_WAR_CHANCE > Math.random()
                || newTile.tileType.population.colony.totalTiles < 0.05 * tile.tileType.ship.population.colony.totalTiles))) {
        //console.log('naval')
        let j = tile.tileType.ship.population.colony.alliance
        tile.tileType.ship.population.colony.declareWar(newTile.tileType.population.colony)
        //newTile.tileType.population.colony.declareWar(tile.tileType.ship.population.colony)
        if (tile.tileType.ship.population.colony.alliance != j && MAP_DISPLAY_STYLE == 'alliance') {
            REDRAW_NEEDED = true
        }
    }
    if (tile.tileType.ship.population.colony.isAtWar(newTile.tileType.population.colony) && tile.tileType.siegeLandTileFromWater(tile, newTile)) {
        // ship won --> attacker takes over tile
        if (tile.tileType.ship) {
            let j = newTile.tileType.population.colony.alliance
            newTile.tileType.population.colony.declareWar(tile.tileType.ship.population.colony)
            if (newTile.tileType.population.colony.alliance != j && MAP_DISPLAY_STYLE == 'alliance') {
                REDRAW_NEEDED = true
            }
        }
        tile.tileType.takeOverLandTileAfterSiege(tile, newTile)
    } else if (tile.tileType.ship) {
        tile.tileType.ship.population.colony.currentActiveShips -= 1;
        tile.tileType.emptyTile(tile);
    }

}

function attackNewTileMain(attackingTile, defendingTile) {
    var colonySurround = [];
    var enemySurround = [];
    // attack new tile
    if (!gameruleInterFace.peacetime()
        || ((Math.random() < LAND_WAR_CHANCE
            || (defendingTile.tileType.population.colony.totalTiles < 0.01 * attackingTile.tileType.population.colony.totalTiles &&defendingTile.tileType.population.colony.totalTiles != 0 ))
            && attackingTile.tileType.population.colony.willDoWar(defendingTile.tileType.population.colony)
            && !attackingTile.tileType.population.colony.isAtWar(defendingTile.tileType.population.colony))) {
        //console.log('land war')
        let j = attackingTile.tileType.population.colony.alliance
        attackingTile.tileType.population.colony.declareWar(defendingTile.tileType.population.colony)
        //defendingTile.tileType.population.colony.declareWar(attackingTile.tileType.population.colony)
        //console.log(COLONY_ARRAY.includes(defendingTile.tileType.population.colony))
        //console.log(COLONY_ARRAY.includes(attackingTile.tileType.population.colony))
        if (attackingTile.tileType.population.colony.alliance != j && MAP_DISPLAY_STYLE == "alliance") {
            REDRAW_NEEDED = true
        }
        //console.log(COLONY_ARRAY)
    }

    if (attackingTile.tileType.population.colony.isAtWar(defendingTile.tileType.population.colony) && attackingTile.tileType.population.attackEnemyTile(attackingTile, defendingTile)) {
        // Attacker won -> move to defender's tile
        let j = defendingTile.tileType.population.colony.alliance
        defendingTile.tileType.checkIfInCombat(attackingTile, GAME_BOARD, colonySurround, enemySurround);
        defendingTile.tileType.population.colony.declareWar(attackingTile.tileType.population.colony)
        if (defendingTile.tileType.population.colony.alliance != j) {
            REDRAW_NEEDED = true
        }
        // console.log(colonySurround);
        // console.log(enemySurround);
        // if naval war
        if (colonySurround.length > 0) {

            const randIndx = Math.floor(Math.random() * colonySurround.length);


            // RETREAT
            // console.log("== RETREAT ==");
            // console.log(`Retreating ${defendingTile.tileType.population.troop.troopCount} to new Tile ${colonySurround[randIndx].tileType.population.troop.troopCount}`);

            colonySurround[randIndx].tileType.population.troop.troopCount += defendingTile.tileType.population.troop.troopCount


            // transfer some supplies back to new tile
            colonySurround[randIndx].tileType.population.storage.supply.increaseSupply(Math.floor(defendingTile.tileType.population.storage.supply.getSupplyCount() / 2));
            defendingTile.tileType.population.storage.supply.decreaseSupply(Math.floor(defendingTile.tileType.population.storage.supply.getSupplyCount() / 2));
        }
        defendingTile.tileType.population.tranferStatsFromAttackerTile(defendingTile, attackingTile.tileType.population);
        // if defender colony is dead
    }

}

function expandToEmptyTile(oldTile, newTile) {
    //console.log(newTile.y,newTile.x)
    newTile.tileType.population.setTransferStatsFromOldTileToEmptyTile(newTile, oldTile);
}

function createNewStatDisplays() {
    resetAllColoniesDisplayStats()
    // loops through each colony in array to add a <p> to store stats
    for (let i = 0; i < COLONY_ARRAY.length; i++) {
        COLONY_ARRAY[i].createNewStatDisplay();
    }
}

function removeOldStatDisplays() {
    // removes all elements/tags stored in the div "stat_holder"
    document.getElementById("stat_holder").innerHTML = "";
}

function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function drawAllTiles() {
    for (let row = 0; row < GAME_BOARD.length; row += 1) {
        for (let col = 0; col < GAME_BOARD[0].length; col += 1) {
            //console.log(GAME_BOARD[row][col].constructor.name);

            drawTile(GAME_BOARD[row][col]);
        }
    }
}

function moveShip(waterTile) {
    // pick a random new tile
    var newX = waterTile.tileType.ship.getNewX()
    var newY = waterTile.tileType.ship.getNewY()
    //TODO implement navy Figure out issue
    let newXPos = (waterTile.x + newX + GAME_BOARD[0].length) % GAME_BOARD[0].length;
    let newYPos = (waterTile.y + newY);
    if(newYPos < 0){
        newYPos = 0;
        waterTile.tileType.ship.changeDirectionRandomly();
    }else if(newYPos >= GAME_BOARD.length){
        newYPos = GAME_BOARD.length - 1;
        waterTile.tileType.ship.changeDirectionRandomly();
    }

    const newTile = GAME_BOARD[newYPos][newXPos];
    // console.log("NewTile: ",waterTile.y + newY, waterTile.x + newX);
    // console.log("NewTile: ", newTile)
    //check if tile is empty
    if (newTile.isEmpty) {
        // if newTile is water
        if (newTile.tileType.terrain.name === "water") {
            waterTile.tileType.moveShipToEmptyWaterTile(waterTile, newTile);
            //waterTile.moveShipToEmptyWaterTile(tile, newTile);
        } else if (newTile.tileType.terrain.isMoveable) {
            // newTile is land
            // settle on new tile
            //newTile.setTransferStatsFromOldWaterToEmptyLand(waterTile);
            waterTile.tileType.moveShipToEmptyLandAndSettle(waterTile, newTile);
        }
    } else {
        // is not empty
        if (newTile.tileType.terrain.name === "water") {
            if (newTile.tileType.ship.population.colony.teamId === waterTile.tileType.ship.population.colony.teamId) {
                // same team        
                // either ignore, or give pop (counter,, after 5 turns,, idk)
            } else {
                // Naval Battle
                waterTile.tileType.attackEnemyNavalShip(waterTile, newTile);
            }
        } else {
            //console.log("Pop: ", waterTile.tileType.ship.population.pop);
            // enemy land tile
            if (waterTile.tileType.ship.population.colony.teamId !== newTile.tileType.population.colony.teamId) {
                // TODO not occupied and Land is enemy

                siegeLandTileMain(waterTile, newTile);
            } else {
                //console.log(waterTile);
                // friendly land tile --> transfers troops to land tile and removes ship
                waterTile.tileType.landOnFriendlyTileFromWater(waterTile, newTile);
            }
        }
    }
}

function tileInCombatMain(tile, tilePop) {
    //console.log("===========");

    var enemySurround = []
    var colonySurround = [];
    //selectedPop.combatTroopRequestsMain(selectedTile,GAME_BOARD);
    //check if still in combat
    tile.tileType.inCombat = tile.tileType.checkIfInCombat(tile, GAME_BOARD, colonySurround, enemySurround);


    if (tile.tileType.inCombat) {
        //console.log("In Combat");

        //increase morale
        tilePop.troop.turnMoraleIncrease();

        //atttempt to attack random enemy tile (nearby)
        const randIndex = Math.floor(Math.random() * enemySurround.length);
        // console.log(enemySurround);
        // console.log(randIndex);
        // console.log(enemySurround[randIndex]);
        const defendingTile = enemySurround[randIndex]
        if (defendingTile.isNew == false && !tile.tileType.population.colony.traits.defender) {
            attackNewTileMain(tile, defendingTile)
        }
    }

    tilePop.reinforceTroops(tilePop);
    if (MAP_DISPLAY_STYLE == "frontline") {
        //TODO change to own map display mode
        tile.toDraw = true;
    }
}

function tileNotInCombatButHasTroopsMain(tile, tilePop) {
    var enemySurround = []
    var colonySurround = [];
    //TODO fix there errors
    if (tile.tileType.checkIfInCombat(tile, GAME_BOARD, enemySurround, colonySurround)) {
        tile.tileType.inCombat = true;
    } else {
        if (colonySurround.length > 0) {
            colonySurround[Math.floor(Math.random() * colonySurround.length)] = tilePop.troop.troopCount;
        } else {
            // no neighnbohrs to send troops to
            //TODO move troops back to colony and set thsi to nothing
            tilePop.colony.reserveTroops += tilePop.troop.troopCount;
            tilePop.troop.troopCount = 0;
        }
    }
}

function checkIfTileAlive(tile) {
    if (tile.tileType instanceof WaterTile && tile.isEmpty == false) {
        if (tile.tileType.ship.population.colony.isDead) {
            tile.tileType.emptyTileDecreaseActiveShips(tile);
        }
    }
}

/**
 * main loop that gets every tiles turn
 */
function loopTileTurns() {
    //TODO perhaps create an away with no water tiles and only moveable tiles // or have ships in water
    ctx.beginPath();

    var selectedTile;
    var selectedPop;

    const rows = GAME_BOARD.length;
    const cols = GAME_BOARD[0].length;



    // iterates through all tiles
    // for (let row = 0; row < GAME_BOARD.length; row+=1){
    //     for(let col = 0; col<GAME_BOARD[0].length; col+=1){

    var row = 0;
    var col = 0;

    //console.log(rows-1, cols-1);
    while (row < rows) {
        while (col < cols) {
            //selectedTile = GAME_BOARD[row][col];
            //console.log(selectedTile);
            //console.log("Tile: ",row, col)
            selectedTile = SHUFFLED_GAME_BOARD[row][col];
            selectedPop = selectedTile.tileType.population;

            checkIfTileAlive(selectedTile);

            if (selectedTile.isNew == false) {

                // checks if tile is not empty
                if (selectedTile.isEmpty == false) {
                    /// is not water:
                    if (selectedTile.tileType.terrain.name !== "water") {
                        ///Land Tile
                        if (selectedPop.colony.isDead) {
                            selectedPop.emptyTileAfterColonySurrender(selectedTile);
                        }

                        selectedTile.tileTurnDuties(GAME_BOARD);

                        if (selectedTile.tileType.inCombat) {
                            tileInCombatMain(selectedTile, selectedPop);
                        } else if (selectedPop.troop.troopCount > 0) {
                            //not in combat but has troops
                            tileNotInCombatButHasTroopsMain(selectedTile, selectedPop);
                        }
                        if (selectedPop.attemptToExpand()) {
                            AttemptReproduce(selectedTile);
                        }
                        selectedPop.attemptMutateCulture(selectedTile); //TODO update
                        selectedPop.checkIfStatsAreNewColonyMax(selectedTile);
                        selectedPop.updateColonyDisplayStats(selectedTile);

                    } else {
                        /// is non-empty water:
                        //check if colony is dead
                        if (selectedTile.tileType.ship.population.colony.isDead) {

                            selectedTile.tileType.emptyTileDecreaseActiveShips(selectedTile);
                        } else {
                            moveShip(selectedTile);
                        }

                    }
                }

                // && selectedTile.isEmpty == false
                if ((selectedTile.toDraw || MAP_DISPLAY_STYLE === "pop" && selectedTile.isEmpty == false)) {
                    drawTile(selectedTile);
                    selectedTile.toDraw = false; //TODO NEW
                }
            } else {

                // if tile was new, now it is not
                selectedTile.isNew = false;
                if (selectedTile.toDraw) {
                    drawTile(selectedTile);
                }
            }
            col++;
        }
        row++;
        col = 0;

    }
}

function drawPopMapForAllTiles() {
    const maxPop = getMaxPopFromAlltiles();
    var tilePop;
    var tile;
    for (let row = 0; row < GAME_BOARD.length; row += 1) {
        for (let col = 0; col < GAME_BOARD[0].length; col += 1) {
            if (GAME_BOARD[row][col].tileType instanceof LandTile) {
                tile = GAME_BOARD[row][col];
                tilePop = GAME_BOARD[row][col].tileType.population
                ctx.fillStyle = "#" + toHex(Math.floor(255 - (255 * tilePop.pop / maxPop))) + toHex(Math.floor(255 - (255 * tilePop.pop / maxPop))) + "FF";

                ctx.fillRect(tile.getDrawX(), tile.getDrawY(), tile.getDrawSize(), tile.getDrawSize());

            }
        }
    }
}


function getMaxPopFromAlltiles() {
    var maxPop = 0;
    for (let row = 0; row < GAME_BOARD.length; row += 1) {
        for (let col = 0; col < GAME_BOARD[0].length; col += 1) {
            if (GAME_BOARD[row][col].tileType instanceof LandTile) {
                if (GAME_BOARD[row][col].tileType.population.pop > maxPop) {
                    maxPop = GAME_BOARD[row][col].tileType.population.pop;
                }

            }
        }
    }
    return maxPop;
}

function drawAllTilesForSpecialMaps() {
    if (MAP_DISPLAY_STYLE == "troop" || MAP_DISPLAY_STYLE == "supply" || MAP_DISPLAY_STYLE == "colonyControl") {
        for (let row = 0; row < GAME_BOARD.length; row += 1) {
            for (let col = 0; col < GAME_BOARD[0].length; col += 1) {
                if (GAME_BOARD[row][col].isOccupiedLand) {
                    //if(GAME_BOARD[row][col].tileType.population.troop.troopCount > 0 || GAME_BOARD[row][col].tileType.inCombat)
                    drawTile(GAME_BOARD[row][col]);
                }
            }
        }
    }
    if (MAP_DISPLAY_STYLE == "flags") {
        let miniMap = []
        let groupColonies = []
        let maxDims = []
        //left right up down
        for (let row = 0; row < GAME_BOARD.length; row += 1) {
            miniMap.push([])
            for (let col = 0; col < GAME_BOARD[0].length; col += 1) {
                if (GAME_BOARD[row][col].isOccupiedLand) {
                    miniMap[row].push(-1)
                } else {
                    miniMap[row].push(-2)
                }
            }
        }
        while (in2dArray(-1, miniMap)) {
            let toSearch = []
            let searched = []
            let rowColAt = [0, 0]
            for (let row = rowColAt[0]; row < miniMap.length; row += 1) {
                for (let col = rowColAt[1]; col < miniMap[0].length; col += 1) {
                    if (miniMap[row][col] == -1) {
                        rowColAt = [row, col]
                        toSearch.push([row, col])
                        groupColonies.push(GAME_BOARD[row][col].tileType.population.colony)
                        maxDims.push([row, row, col, col])
                        row = miniMap.length;
                        col = miniMap[0].length;
                    }
                }
            }
            while (searched.length - 2 < toSearch[0][0]) {
                searched.push([])
            }
            while (searched[toSearch[0][0]].length - 2 < toSearch[0][1]) {
                searched[toSearch[0][0]].push(false)
            }
            while (toSearch.length > 0) {
                if (miniMap[toSearch[0][0]][toSearch[0][1]] == groupColonies.length - 1) {
                    console.error('Error')

                }
                else {
                    miniMap[toSearch[0][0]][toSearch[0][1]] = groupColonies.length - 1;
                    for (let x = toSearch[0][0] - 1; x <= toSearch[0][0] + 1; x++) {
                        for (let y = toSearch[0][1] - 1; y <= toSearch[0][1] + 1; y++) {
                            if (x >= 0 && y >= 0 && x < miniMap.length && y < miniMap[0].length && miniMap[x][y] == -1 && (!searched[x][y]) && GAME_BOARD[x][y].tileType.population.colony == groupColonies[groupColonies.length - 1]) {

                                toSearch.push([x, y])
                                while (searched.length - 3 < x) {
                                    searched.push([])
                                }
                                for (let i = -2; i < 3; i++) {
                                    while (searched[x + i] && searched[x + i].length + 2 < y) {
                                        searched[x + i].push(false)
                                    }
                                }
                                searched[x][y] = true
                                if (x < maxDims[maxDims.length - 1][0]) {
                                    maxDims[maxDims.length - 1][0] = x
                                }
                                if (x > maxDims[maxDims.length - 1][1]) {
                                    maxDims[maxDims.length - 1][1] = x
                                }
                                if (y < maxDims[maxDims.length - 1][2]) {
                                    maxDims[maxDims.length - 1][2] = y
                                }
                                if (y > maxDims[maxDims.length - 1][3]) {
                                    maxDims[maxDims.length - 1][3] = y
                                }
                            }
                        }
                    }
                    let numArray = toSearch;

                }
                toSearch.shift()
            }
        }
        //visualize flags via drawtiles
        for (let i = 0; i < maxDims.length; i++) {
            maxDims[i][1]++;
            maxDims[i][3]++;
        }
        for (let row = 0; row < miniMap.length; row += 1) {
            let tilecolony = false
            let groupstart = 0
            let groupstartcol = 0
            let grouplength = 0
            let tile
            for (let col = 0; col < miniMap[0].length; col += 1) {

                tile = GAME_BOARD[row][col]
                grouplength++;
                if (tile.isOccupiedLand) {
                    //console.log(groupColonies)
                    let group = miniMap[row][col]
                    if (tilecolony != groupColonies[group]) {
                        if (tilecolony) {
                            var flagCanvas = groupColonies[miniMap[row][groupstartcol]].flagCanvas;
                            let m = maxDims[miniMap[row][groupstartcol]]

                            ctx.drawImage(flagCanvas,
                                flagCanvas.width * (groupstartcol - m[2]) / (m[3] - m[2]),
                                flagCanvas.height * (row - m[0]) / (m[1] - m[0]),
                                flagCanvas.width / (m[3] - m[2]) * grouplength,
                                flagCanvas.height / (m[1] - m[0]),
                                //flagCanvas.width*grouplength/(m[1]-m[0]),
                                //flagCanvas.height/(m[3]-m[2]),
                                groupstart,
                                tile.getDrawY(),
                                grouplength * tile.getDrawSize(),
                                tile.getDrawSize(),
                            )
                        }
                        tilecolony = groupColonies[group]
                        groupstart = tile.getDrawX()
                        grouplength = 0
                        groupstartcol = col
                    }
                } else if (tilecolony) {
                    var flagCanvas = groupColonies[miniMap[row][groupstartcol]].flagCanvas;
                    let m = maxDims[miniMap[row][groupstartcol]]
                    ctx.drawImage(flagCanvas,
                        flagCanvas.width * (groupstartcol - m[2]) / (m[3] - m[2]),
                        flagCanvas.height * (row - m[0]) / (m[1] - m[0]),
                        flagCanvas.width / (m[3] - m[2]) * grouplength,
                        flagCanvas.height / (m[1] - m[0]),
                        //flagCanvas.width*grouplength/(m[1]-m[0]),
                        //flagCanvas.height/(m[3]-m[2]),
                        groupstart,
                        tile.getDrawY(),
                        grouplength * tile.getDrawSize(),
                        tile.getDrawSize(),
                    )
                    tilecolony = null

                }
            }
            if (tilecolony) {
                grouplength++;
                var flagCanvas = groupColonies[miniMap[row][groupstartcol]].flagCanvas;
                let m = maxDims[miniMap[row][groupstartcol]]
                ctx.drawImage(flagCanvas,
                    flagCanvas.width * (groupstartcol - m[2]) / (m[3] - m[2]),
                    flagCanvas.height * (row - m[0]) / (m[1] - m[0]),
                    flagCanvas.width / (m[3] - m[2]) * grouplength,
                    flagCanvas.height / (m[1] - m[0]),
                    //flagCanvas.width*grouplength/(m[1]-m[0]),
                    //flagCanvas.height/(m[3]-m[2]),
                    groupstart,
                    tile.getDrawY(),
                    grouplength * tile.getDrawSize(),
                    tile.getDrawSize(),
                )
                tilecolony = null

            }
        }
        //console.log(maxDims.length)
    }
    if (MAP_DISPLAY_STYLE == "allianceFlags") {
        let miniMap = []
        let groupAlliances = []
        let maxDims = []
        //left right up down
        for (let row = 0; row < GAME_BOARD.length; row += 1) {
            miniMap.push([])
            for (let col = 0; col < GAME_BOARD[0].length; col += 1) {
                if (GAME_BOARD[row][col].isOccupiedLand && GAME_BOARD[row][col].tileType.population.colony.alliance) {
                    miniMap[row].push(-1)
                } else {
                    miniMap[row].push(-2)
                }
            }
        }
        while (in2dArray(-1, miniMap)) {
            let toSearch = []
            let searched = []
            let rowColAt = [0, 0]
            for (let row = rowColAt[0]; row < miniMap.length; row += 1) {
                for (let col = rowColAt[1]; col < miniMap[0].length; col += 1) {
                    if (miniMap[row][col] == -1) {
                        rowColAt = [row, col]
                        toSearch.push([row, col])
                        groupAlliances.push(GAME_BOARD[row][col].tileType.population.colony.alliance)
                        maxDims.push([row, row, col, col])
                        row = miniMap.length;
                        col = miniMap[0].length;
                    }
                }
            }
            while (searched.length - 2 < toSearch[0][0]) {
                searched.push([])
            }
            while (searched[toSearch[0][0]].length - 2 < toSearch[0][1]) {
                searched[toSearch[0][0]].push(false)
            }
            while (toSearch.length > 0) {
                if (miniMap[toSearch[0][0]][toSearch[0][1]] == groupAlliances.length - 1) {
                    //console.log('!!!!')
                    //
                }
                else {
                    miniMap[toSearch[0][0]][toSearch[0][1]] = groupAlliances.length - 1;
                    for (let x = toSearch[0][0] - 1; x <= toSearch[0][0] + 1; x++) {
                        for (let y = toSearch[0][1] - 1; y <= toSearch[0][1] + 1; y++) {
                            if (x >= 0 && y >= 0 && x < miniMap.length && y < miniMap[0].length && miniMap[x][y] == -1 && (!searched[x][y]) && GAME_BOARD[x][y].tileType.population.colony.alliance == groupAlliances[groupAlliances.length - 1]) {

                                toSearch.push([x, y])
                                while (searched.length - 3 < x) {
                                    searched.push([])
                                }
                                for (let i = -2; i < 3; i++) {
                                    while (searched[x + i].length + 2 < y) {
                                        searched[x + i].push(false)
                                    }
                                }
                                searched[x][y] = true
                                if (x < maxDims[maxDims.length - 1][0]) {
                                    maxDims[maxDims.length - 1][0] = x
                                }
                                if (x > maxDims[maxDims.length - 1][1]) {
                                    maxDims[maxDims.length - 1][1] = x
                                }
                                if (y < maxDims[maxDims.length - 1][2]) {
                                    maxDims[maxDims.length - 1][2] = y
                                }
                                if (y > maxDims[maxDims.length - 1][3]) {
                                    maxDims[maxDims.length - 1][3] = y
                                }
                            }
                        }
                    }
                    let numArray = toSearch;

                }
                toSearch.shift()
            }
        }
        //visualize flags via drawtiles
        for (let i = 0; i < maxDims.length; i++) {
            maxDims[i][1]++;
            maxDims[i][3]++;
        }
        for (let row = 0; row < miniMap.length; row += 1) {
            let tilecolony = false
            let groupstart = 0
            let groupstartcol = 0
            let grouplength = 0
            let tile
            for (let col = 0; col < miniMap[0].length; col += 1) {

                tile = GAME_BOARD[row][col]
                grouplength++;
                if (tile.isOccupiedLand) {
                    //console.log(groupColonies)
                    let group = miniMap[row][col]
                    if (tilecolony != groupAlliances[group]) {
                        if (tilecolony) {
                            var flagCanvas = groupAlliances[miniMap[row][groupstartcol]].flagCanvas;
                            let m = maxDims[miniMap[row][groupstartcol]]
                            ctx.drawImage(flagCanvas,
                                flagCanvas.width * (groupstartcol - m[2]) / (m[3] - m[2]),
                                flagCanvas.height * (row - m[0]) / (m[1] - m[0]),
                                flagCanvas.width / (m[3] - m[2]) * grouplength,
                                flagCanvas.height / (m[1] - m[0]),
                                //flagCanvas.width*grouplength/(m[1]-m[0]),
                                //flagCanvas.height/(m[3]-m[2]),
                                groupstart,
                                tile.getDrawY(),
                                grouplength * tile.getDrawSize(),
                                tile.getDrawSize(),
                            )
                        }
                        tilecolony = groupAlliances[group]
                        groupstart = tile.getDrawX()
                        grouplength = 0
                        groupstartcol = col
                    }
                } else if (tilecolony) {
                    var flagCanvas = groupAlliances[miniMap[row][groupstartcol]].flagCanvas;
                    let m = maxDims[miniMap[row][groupstartcol]]

                    ctx.drawImage(flagCanvas,
                        flagCanvas.width * (groupstartcol - m[2]) / (m[3] - m[2]),
                        flagCanvas.height * (row - m[0]) / (m[1] - m[0]),
                        flagCanvas.width / (m[3] - m[2]) * grouplength,
                        flagCanvas.height / (m[1] - m[0]),
                        //flagCanvas.width*grouplength/(m[1]-m[0]),
                        //flagCanvas.height/(m[3]-m[2]),
                        groupstart,
                        tile.getDrawY(),
                        grouplength * tile.getDrawSize(),
                        tile.getDrawSize(),
                    )
                    tilecolony = null

                }
            }
            if (tilecolony) {
                grouplength++;
                var flagCanvas = groupAlliances[miniMap[row][groupstartcol]].flagCanvas;
                let m = maxDims[miniMap[row][groupstartcol]]

                ctx.drawImage(flagCanvas,
                    flagCanvas.width * (groupstartcol - m[2]) / (m[3] - m[2]),
                    flagCanvas.height * (row - m[0]) / (m[1] - m[0]),
                    flagCanvas.width / (m[3] - m[2]) * grouplength,
                    flagCanvas.height / (m[1] - m[0]),
                    //flagCanvas.width*grouplength/(m[1]-m[0]),
                    //flagCanvas.height/(m[3]-m[2]),
                    groupstart,
                    tile.getDrawY(),
                    grouplength * tile.getDrawSize(),
                    tile.getDrawSize(),
                )
                tilecolony = null

            }
        }
        //console.log(maxDims.length)
    }
}
function in2dArray(value, array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].includes(value)) {
            return true
        }
    }
    return false;
}

function shuffleGameBoard() {
    let a = []
    for (let i = 0; i < GAME_BOARD.length; i++) {
        a[i] = [...GAME_BOARD[i]];
    }

    var m = a.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        //  swap it with the current element.
        t = a[m];
        a[m] = a[i];
        a[i] = t;
    }

    for (let i = 0; i < a.length; i++) {
        if (Math.random() * 2 < 1) {
            a[i] = a[i].reverse();
        }
        //console.log(a[i]);

    }


    return a;
}


function resetAllColoniesDisplayStats() {
    for (let i = 0; i < COLONY_ARRAY.length; i++) {
        COLONY_ARRAY[i].resetTotalDisplayStats();
    }
}
function sortColoniesByTiles() {
    COLONY_ARRAY.sort(function (a, b) { return b.totalTiles - a.totalTiles });
    document.getElementById("stat_holder").innerHTML = ""
    createNewStatDisplays()
}
function sortColoniesByPop() {
    COLONY_ARRAY.sort(function (a, b) { return b.totalPop - a.totalPop });
    document.getElementById("stat_holder").innerHTML = ""
    createNewStatDisplays()
}
function sortColoniesByStrength() {
    COLONY_ARRAY.sort(function (a, b) { return b.milStrength - a.milStrength });
    document.getElementById("stat_holder").innerHTML = ""
    createNewStatDisplays()
}
function sortColoniesByTroops() {
    COLONY_ARRAY.sort(function (a, b) { return b.totalTroops - a.totalTroops });
    document.getElementById("stat_holder").innerHTML = ""
    createNewStatDisplays()
}
function sortColoniesByCapability() {
    COLONY_ARRAY.sort(function (a, b) { return b.milStrength * b.totalPop - a.milStrength * a.totalPop });
    document.getElementById("stat_holder").innerHTML = ""
    createNewStatDisplays()
}
function displayAllColoniesStats() {

    for (let i = 0; i < COLONY_ARRAY.length; i++) {
        COLONY_ARRAY[i].displayStats();
        // set current stats to prev stats
        COLONY_ARRAY[i].setCurrentMaxToPrevMax();

    }
    document.getElementById('colonies_remaining').innerHTML = "Colonies remaining: " + COLONY_ARRAY.length
}


function colonyTurnDuties() {
    for (const colony of COLONY_ARRAY) {
        colony.saveLocalColonyData();
        colony.updateMaxTotalPop();
        if (colony.alliance &&
            ((Math.random() * colony.alliance.getMemberCount() < PEACETIME_ALLIANCE_LEAVE_CHANCE && colony.isAtPeace()) 
        || (!colony.isAtPeace() && Math.random() * colony.alliance.getMemberCount() < WARTIME_ALLIANCE_LEAVE_CHANCE))) {
            colony.leaveAlliance();
        }
    }
}


function colonyGraphOverlayTurnDuties() {
    COLONY_GRAPHS_OVERLAY.updateActiveCharts();
}


function checkForDeadColonies() {

    for (let i = 0; i < COLONY_ARRAY.length; i++) {
        const colony = COLONY_ARRAY[i];
        if (colony.wouldDie()) {
            colony.isDead = true;
            //console.log(colony.currentActiveShips)
            COLONY_ARRAY.splice(i, 1);
            //console.log(i,"REMOVED");
            for (let i2 = 0; i2 < COLONY_ARRAY.length; i2++) {
                if (i2 != i && COLONY_ARRAY[i2].enemies.includes(COLONY_ARRAY[i])) {
                    COLONY_ARRAY[i2].enemies.splice(COLONY_ARRAY[i2].enemies.indexOf(COLONY_ARRAY[i]), 1)
                    //console.log(COLONY_ARRAY[i2].teamId)
                    //console.log(COLONY_ARRAY[i2].enemies)
                }
            }
            colony.clearAllianceStub()
            colony.display.remove();
            colony.overlayButton.remove()

        }
    }
}

function redrawColoniesThatNeedRedraw() {
    for (let row = 0; row < GAME_BOARD.length; row += 1) {
        for (let col = 0; col < GAME_BOARD[0].length; col += 1) {
            if (GAME_BOARD[row][col].tileType.population && GAME_BOARD[row][col].tileType.population.colony && GAME_BOARD[row][col].tileType.population.colony.needsRedraw) {
                drawTile(GAME_BOARD[row][col]);
            }
        }
    }
}

function loopColonies() {
    for (let i = 0; i < COLONY_ARRAY.length; i++) {

        if(gameruleInterFace.technologySharing()){
            if (COLONY_ARRAY[i].alliance) {
                COLONY_ARRAY[i].alliance.collectiveStrengthBoost()
            }else{
                COLONY_ARRAY[i].strengthBoost();
            }
        }else{
            COLONY_ARRAY[i].strengthBoost();
        }
        if (COLONY_ARRAY[i].needsRedraw && (MAP_DISPLAY_STYLE == 'alliance' || MAP_DISPLAY_STYLE == "allianceFlags")) {
            REDRAW_NEEDED = true
            COLONY_ARRAY[i].needsRedraw = false
        }

    }
}

function preStepColonyTurn() {
    for (let i = 0; i < COLONY_ARRAY.length; i++) {
        var tempCol = COLONY_ARRAY[i];
        if (!Object.values(cultureColorMatch).includes(tempCol.teamId)) {
            // add colony name to culture color match
            cultureColorMatch[tempCol.teamId] = tempCol.color;
        }

        // clear cultureName dictionary
        COLONY_ARRAY[i].clearCultureNameDict();


    }
}


function update() {
    if (RUN_GAME) {
        var startTime = performance.now()
        preStepColonyTurn();
        resetAllColoniesDisplayStats();
        loopTileTurns();
        colonyTurnDuties();
        redrawColoniesThatNeedRedraw()
        colonyGraphOverlayTurnDuties();
        loopColonies();
        checkForDeadColonies();
        //TODO make an optionla button to display stats
        displayAllColoniesStats();
        var endTime = performance.now()
        const time = endTime - startTime
        // console.log(`update took ${(Math.round(time * 100) / 100).toFixed(2)} milliseconds | ~ ${Math.round(1000/((time)))} TPS`)
        drawAllTilesForSpecialMaps();

    }
}

/**
 * 
 * MAIN
 */
startGame();

//setInterval(function() {update()},UPDATE_TIME);
var MAIN_INTERVAL = setInterval(function () { update() }, UPDATE_TIME);


