import "./blocks.js";
import Button from "./button.js";
let scalex;
let scaley;
let buttons = [
    new Button(500,300,100,100,"#ffffff","Start Level",function(){mode = "level";})
];
let exitGameButton = new Button(0,0,100,100,"#ffffff","Return to Editor", function(){mode = "editor";})
let mouseX;
let mouseY;
let mode = "editor";
let canvas;
let ctx;
let interval;
let mouseDown = false;
function resetMouseState() {
    mouseDown = false;
}
function mouseMove(event) {
    mouseX = event.clientX
    mouseY = event.clientY;
}
function mouseNowDown(event) {
    if (!mouseDown) {
        mouseClick();
    }
    mouseDown = true;
}
function mouseClick() {
    if(mode == "editor"){
        for(let i = 0; i<buttons.length; i++){
            buttons[i].click(mouseX / scalex,mouseY / scaley)
        }
    }else{
        exitGameButton.click(mouseX/scalex,mouseY/scaley);
    }
}
document.addEventListener('keydown', function (evt) {

})
document.addEventListener('keyup', function (evt) {

})
document.addEventListener('mouseout', function (evt) {
    if (evt.toElement == null && evt.relatedTarget == null) {
        mouseDown = false;
    }
});
window.addEventListener("load",setup);
function setup(){
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.addEventListener("mousemove",mouseMove)
    canvas.addEventListener("mousedown",mouseNowDown)
    canvas.addEventListener("mouseup",resetMouseState)
    interval = setInterval(Render,10)
}
function Render() {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    ctx.fillStyle = "#7f7f90";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    scalex = (window.innerWidth / 600);
    scaley = (window.innerHeight / 400);
    if(mode == "level"){
        exitGameButton.draw(ctx,scalex,scaley)
    }else if(mode == "editor"){
        for(let i = 0; i<buttons.length; i++){
            buttons[i].draw(ctx,scalex,scaley);
        }
    }

}
