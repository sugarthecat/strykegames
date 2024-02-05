window.onload = function(){
    let content = document.getElementById("gamecontent").children;
    for(let i = 0; i<content.length; i++){
        content[i].style.gridRowStart = Math.max(i,1);
        content[i].style.gridRowEnd = i+2;
    }
}