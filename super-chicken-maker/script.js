import "./blocks.js";
import "./button.js";
let scalex;
let scaley;
let MouseX;
let MouseY;
let mode = "level";
let canvas;
let ctx;
let interval;
let mouseDown = false;
function resetMouseState() {
    mouseDown = false;
}
function mouseMove(event) {

}
function mouseNowDown(event) {
    if (!mouseDown) {
        mouseClick();
    }
    mouseDown = true;
}
function mouseClick() {

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
    scalex = (window.innerWidth / 600) / 1.2;
    scaley = (window.innerHeight / 400) / 1.2;
    if(mode == "level"){

    }else if(mode == "editor"){
        
    }

}
