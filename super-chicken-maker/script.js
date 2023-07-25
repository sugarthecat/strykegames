import { CollisionBlock, WinBlock, PainBlock, FourDegreeTuretBlock, EightDegreeTuretBlock, OmnidirectionalTuretBlock } from "./blocks.js";
import Button from "./button.js";
let scalex;
let scaley;
let buttons = [
    new Button(500, 300, 100, 100, "#ffffff", "Start Level", function () { mode = "level"; }),
    new Button(505, 5, 30, 30, "#d8d7e0", "", function () { brush = 1; }), // collision block
    new Button(535, 5, 30, 30, "#75b855", " ", function () { brush = 2; }), // red block 
    new Button(565, 5, 30, 30, "#db6161", " ", function () { brush = 3; }), // green block
    new Button(505, 35, 30, 30, "#db5ece", " ", function () { brush = 4; }), //4shooter
    new Button(535, 35, 30, 30, "#bd2bae", " ", function () { brush = 5; }), //8shooter
    new Button(565, 35, 30, 30, "#750169", " ", function () { brush = 6; }), // 360shooter
    new Button(505, 65, 30, 30, "#000000", " ", function () { brush = 0; }), //eraser

    new Button(505, 250, 20, 30, "#fff", "<", function () { 
        levelOn--;
        if (levelOn < 0) { levelOn = 0; }
        blocks = levels[levelOn];
        buttons[9].text = levelOn; }), //eraser
    new Button(530, 250, 40, 30, "#fff", 0, function () { }), //eraser
    new Button(575, 250, 20, 30, "#fff", ">", function () {
        levelOn++;
        if (levelOn >= levels.length) { levels.push(generateNewLevel()) }
        blocks = levels[levelOn];
        buttons[9].text = levelOn;
    }), //eraser
];
let brush = 1;
let exitGameButton = new Button(0, 0, 100, 20, "#ffffff", "Return to Editor", function () { mode = "editor"; })
let mouseX;
let mouseY;
let xoff = 0;
let blocks = generateNewLevel();
let levels = [blocks];
let levelOn = 0;
let mode = "editor";
let canvas;
let ctx;
let interval;
let mouseDown = false;
function generateNewLevel() {
    let blocks = [];
    for (let x = 0; x < 60; x++) {
        blocks.push([]);
        for (let y = 0; y < 40; y++) {
            blocks[x][y] = null;
        }
    }
    return blocks
}
// generates a new block based on the selected brush 
function getBlock(x, y) {
    switch (brush) {
        case 0:
            return null;
        case 1:
            return new CollisionBlock(x, y, 10, 10);
        case 2:
            return new WinBlock(x, y, 10, 10);
        case 3:
            return new PainBlock(x, y, 10, 10);
        case 4:
            return new FourDegreeTuretBlock(x, y, 10, 10);
        case 5:
            return new EightDegreeTuretBlock(x, y, 10, 10);
        case 6:
            return new OmnidirectionalTuretBlock(x, y, 10, 10);
    }
}
function resetMouseState() {
    mouseDown = false;
}
function mouseMove(event) {
    mouseX = event.clientX / scalex;
    mouseY = event.clientY / scaley;
    if (mode == "editor" && mouseX < 500 && mouseY < 300 && mouseDown) {
        let adjx = mouseX
        let adjy = mouseY
        let xInd = Math.floor(adjx / 10) + xoff;
        let yInd = Math.floor(adjy / 10);
        blocks[xInd][yInd] = getBlock(xInd * 10, yInd * 10);
    }
}
function mouseNowDown(event) {
    if (!mouseDown) {
        mouseClick();
    }
    mouseDown = true;
}
function mouseClick() {
    if (mode == "editor") {
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].click(mouseX, mouseY)
        }
    } else {
        exitGameButton.click(mouseX, mouseY);
    }
}
document.addEventListener('keydown', function (evt) {
    if (mode == "editor") {
        if (evt.code == "ArrowRight") {
            xoff++;
            if (xoff > blocks.length - 60) {
                blocks.push([])
                for (let i = 0; i < blocks[blocks.length - 1].length; i++) {
                    blocks[blocks.length - 1][i] = null;
                }
            }
        } else if (evt.code == "ArrowLeft") {
            xoff--;
            if (xoff < 0) {
                xoff = 0;
            }
        }
    } else {

    }
})
document.addEventListener('keyup', function (evt) {

})
document.addEventListener('mouseout', function (evt) {
    if (evt.toElement == null && evt.relatedTarget == null) {
        mouseDown = false;
    }
});
window.addEventListener("load", setup);
function setup() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.addEventListener("mousemove", mouseMove)
    canvas.addEventListener("mousedown", mouseNowDown)
    canvas.addEventListener("mouseup", resetMouseState)
    interval = setInterval(Render, 10)
}
function Render() {
    //adjust canvas size
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    scalex = (window.innerWidth / 600);
    scaley = (window.innerHeight / 400);
    //render game
    if (mode == "level") {
        ctx.fillStyle = "#4d5361";
        ctx.fillRect(0, 0,canvas.width,canvas.height);
        exitGameButton.draw(ctx, scalex, scaley)
    } else if (mode == "editor") {
        ctx.fillStyle = "#333";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#4d5361";
        ctx.fillRect(0, 0, 500 * scalex, 300 * scaley);
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].draw(ctx, scalex, scaley);
        }
        for (let i = 0; i < blocks.length; i++) {
            for (let j = 0; j < blocks[i].length; j++) {
                if (blocks[i][j] !== null) {
                    blocks[i][j].drawEditor(ctx, scalex, scaley, xoff);
                }
            }
        }
    }

}
