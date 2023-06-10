let playerx = 300
let playery = 200
let playing = false
let titlescreen = true;
let level = 0;
let enemyhp = 100;
let images = {characters:{}}
const levels = [[{x:-100,y:300,dx:4,dy:0,w:100,h:50},{x:700,y:100,dx:-4,dy:0,w:100,h:50},{x:-500,y:250,dx:4,dy:0,w:100,h:50},{x:1100,y:150,dx:-4,dy:0,w:100,h:50},{x:-800,y:200,dx:4,dy:0,w:100,h:50},{x:1400,y:200,dx:-4,dy:0,w:100,h:50},
              ],
                [{x:0,y:-100,dx:0,dy:5,w:50,h:50},
                 {x:550,y:-200,dx:0,dy:5,w:50,h:50},
                 {x:50,y:-300,dx:0,dy:5,w:50,h:50},
                 {x:500,y:-400,dx:0,dy:5,w:50,h:50},
                 {x:100,y:-500,dx:0,dy:5,w:50,h:50},
                 {x:450,y:-600,dx:0,dy:5,w:50,h:50},
                 {x:150,y:-700,dx:0,dy:5,w:50,h:50},
                 {x:400,y:-800,dx:0,dy:5,w:50,h:50},
                 {x:200,y:-900,dx:0,dy:5,w:50,h:50},
                 {x:350,y:-1000,dx:0,dy:5,w:50,h:50},
                 {x:250,y:-1100,dx:0,dy:5,w:50,h:50},
                 {x:300,y:-1200,dx:0,dy:5,w:50,h:50},
                 {x:0,y:500,dx:0,dy:-5,w:50,h:50},
                 {x:550,y:600,dx:0,dy:-5,w:50,h:50},
                 {x:50,y:700,dx:0,dy:-5,w:50,h:50},
                 {x:500,y:800,dx:0,dy:-5,w:50,h:50},
                 {x:100,y:900,dx:0,dy:-5,w:50,h:50},
                 {x:450,y:1000,dx:0,dy:-5,w:50,h:50},
                 {x:150,y:1100,dx:0,dy:-5,w:50,h:50},
                 {x:400,y:1200,dx:0,dy:-5,w:50,h:50},
                 {x:200,y:1300,dx:0,dy:-5,w:50,h:50},
                 {x:350,y:1400,dx:0,dy:-5,w:50,h:50},
                 {x:250,y:1500,dx:0,dy:-5,w:50,h:50},
                 {x:300,y:1600,dx:0,dy:-5,w:50,h:50}, 
              ],
              [
                
                 {x:-500,y:0,dx:6,dy:0,w:50,h:50},
                {x:-500,y:100,dx:6,dy:0,w:50,h:50},
                {x:-500,y:150,dx:6,dy:0,w:50,h:50},
                 {x:1300,y:50,dx:-6,dy:0,w:50,h:50},
                {x:1300,y:300,dx:-6,dy:0,w:50,h:50},
                {x:1300,y:200,dx:-6,dy:0,w:50,h:50},
                 {x:100,y:-1000,dx:0,dy:5,w:50,h:50},
                {x:0,y:-1000,dx:0,dy:5,w:50,h:50},
                {x:150,y:-1000,dx:0,dy:5,w:50,h:50},
                {x:350,y:-1000,dx:0,dy:5,w:50,h:50},
                {x:450,y:-1000,dx:0,dy:5,w:50,h:50},
                {x:400,y:-1000,dx:0,dy:5,w:50,h:50},
                 {x:50,y:1800,dx:0,dy:-5,w:50,h:50},
                {x:200,y:1800,dx:0,dy:-5,w:50,h:50},
                {x:100,y:1800,dx:0,dy:-5,w:50,h:50},
                {x:300,y:1800,dx:0,dy:-5,w:50,h:50},
                {x:550,y:1800,dx:0,dy:-5,w:50,h:50},
                {x:450,y:1800,dx:0,dy:-5,w:50,h:50},
                 {x:-2200,y:0,dx:6,dy:0,w:50,h:50},
                {x:-2200,y:100,dx:6,dy:0,w:50,h:50},
                {x:-2200,y:200,dx:6,dy:0,w:50,h:50},
                {x:-2200,y:250,dx:6,dy:0,w:50,h:50},
                {x:-2200,y:300,dx:6,dy:0,w:50,h:50},
              ],[
                 {x:0,y:0,dx:6,dy:0,w:50,h:50,},
                {x:0,y:300,dx:6,dy:0,w:50,h:50,},
                {x:-100,y:200,dx:6,dy:0,w:50,h:50,},
                 {x:-200,y:150,dx:6,dy:0,w:50,h:50,},
                 {x:-300,y:250,dx:6,dy:0,w:50,h:50,},
                {x:-300,y:350,dx:6,dy:0,w:50,h:50,},
                 {x:-300,y:100,dx:6,dy:0,w:50,h:50,},
                {x:-400,y:150,dx:6,dy:0,w:50,h:50,},
                 {x:-400,y:300,dx:6,dy:0,w:50,h:50,},
                {x:-600,y:100,dx:6,dy:0,w:50,h:50, },
                 {x:-600,y:0,dx:6,dy:0,w:50,h:50, },
                {x:-700,y:200,dx:6,dy:0,w:50,h:50, },
                {x:-700,y:100,dx:6,dy:0,w:50,h:50, },
                {x:-900,y:300,dx:6,dy:0,w:50,h:50, },
                {x:-900,y:250,dx:6,dy:0,w:50,h:50, },
                {x:-1000,y:150,dx:6,dy:0,w:50,h:50, },
                {x:-1000,y:50,dx:6,dy:0,w:50,h:50, },
                {x:-1200,y:200,dx:6,dy:0,w:50,h:50, },
                {x:-1100,y:150,dx:6,dy:0,w:50,h:50, },
                {x:-1200,y:250,dx:6,dy:0,w:50,h:50, },
                {x:-1300,y:0,dx:6,dy:0,w:50,h:50, },
                {x:-1400,y:100,dx:6,dy:0,w:50,h:50, },
                {x:-1400,y:350,dx:6,dy:0,w:50,h:50, },
                {x:-1500,y:200,dx:6,dy:0,w:50,h:50, },
                {x:-1600,y:150,dx:6,dy:0,w:50,h:50, },
                {x:-1600,y:100,dx:6,dy:0,w:50,h:50, },
                {x:-1600,y:300,dx:6,dy:0,w:50,h:50, },
                {x:-1800,y:100,dx:6,dy:0,w:50,h:50, },
                {x:-1900,y:350,dx:6,dy:0,w:50,h:50, },
                {x:-2000,y:0,dx:6,dy:0,w:50,h:50, },
                {x:-2000,y:250,dx:6,dy:0,w:50,h:50, },
                {x:-2100,y:300,dx:6,dy:0,w:50,h:50, },
                {x:-2300,y:50,dx:6,dy:0,w:50,h:50, },
                {x:-2300,y:150,dx:6,dy:0,w:50,h:50, },
                {x:-2400,y:100,dx:6,dy:0,w:50,h:50, },
                {x:-2400,y:200,dx:6,dy:0,w:50,h:50, },
                {x:-2500,y:300,dx:6,dy:0,w:50,h:50, },
                {x:-2600,y:100,dx:6,dy:0,w:50,h:50, },
                {x:-2600,y:50,dx:6,dy:0,w:50,h:50, },
                {x:-2700,y:350,dx:6,dy:0,w:50,h:50, },
                {x:-2900,y:0,dx:6,dy:0,w:50,h:50, },
                {x:-2900,y:200,dx:6,dy:0,w:50,h:50, },
              ],[
                {x:-100,y:0,dx:8,dy:0,w:200,h:100},
                {x:-500,y:100,dx:8,dy:0,w:200,h:100},
                {x:-900,y:300,dx:8,dy:0,w:200,h:100},
                {x:-1300,y:200,dx:8,dy:0,w:200,h:100},
                {x:1800,y:300,dx:-8,dy:0,w:200,h:100},
                {x:2200,y:100,dx:-8,dy:0,w:200,h:100},
                {x:2600,y:200,dx:-8,dy:0,w:200,h:100},
                {x:3000,y:0,dx:-8,dy:0,w:200,h:100},
                {x:-2000,y:0,dx:8,dy:0,w:200,h:100},
                {x:-2400,y:150,dx:8,dy:0,w:200,h:100},
                {x:-2800,y:0,dx:8,dy:0,w:200,h:100},
                {x:-3200,y:250,dx:8,dy:0,w:200,h:100},
                {x:4000,y:50,dx:-8,dy:0,w:200,h:100},
                {x:4000,y:150,dx:-8,dy:0,w:200,h:100},
                {x:4000,y:250,dx:-8,dy:0,w:200,h:100},
                {x:8000,y:0,dx:-13,dy:0,w:200,h:100},
                {x:8000,y:300,dx:-13,dy:0,w:200,h:100},
              ],
               [
                {x:3000,y:0,dx:-5,dy:0,w:400,h:180},
                 {x:3000,y:220,dx:-5,dy:0,w:400,h:180},
                 {x:-100,y:-100,dx:5,dy:5,w:50,h:50},
                 {x:700,y:-100,dx:-5,dy:5,w:50,h:50},
                 {x:275,y:-100,dx:0,dy:5,w:50,h:50},
                 {x:275,y:-300,dx:0,dy:5,w:50,h:50},
                 {x:-600,y:-100,dx:5,dy:1,w:50,h:50},
                 {x:-400,y:0,dx:5,dy:1,w:50,h:50},
                 {x:-600,y:250,dx:5,dy:0,w:50,h:50},
                 {x:-600,y:0,dx:5,dy:0,w:50,h:50},
                 {x:-800,y:350,dx:5,dy:0,w:50,h:50},
                 {x:900,y:400,dx:-5,dy:-1,w:50,h:50},
                 {x:0,y:-300,dx:1,dy:5,w:50,h:50},
                 {x:600,y:-500,dx:-1,dy:5,w:50,h:50},
                 {x:300,y:800,dx:-1,dy:-5,w:50,h:50},
                 {x:70,y:400,dx:1,dy:-5,w:50,h:50},
                 {x:1000,y:800,dx:5,dy:-5,w:50,h:50},
                 {x:-400,y:800,dx:-5,dy:-5,w:50,h:50},
                 {x:-1200,y:0,dx:5,dy:0,w:50,h:50},
                 {x:-1200,y:350,dx:5,dy:0,w:50,h:50},
                 {x:-1600,y:100,dx:5,dy:0,w:50,h:50},
                 {x:-1600,y:250,dx:5,dy:0,w:50,h:50},
                 {x:-1600,y:300,dx:5,dy:-0.5,w:50,h:50},
                 {x:2800,y:300,dx:-5,dy:0,w:50,h:50},
                 {x:2600,y:100,dx:-5,dy:0.1,w:50,h:50},
                 {x:2400,y:400,dx:-5,dy:-1,w:50,h:50},
                 {x:2200,y:-1600,dx:-5,dy:-5,w:50,h:50},
                 {x:1800,y:500,dx:-5,dy:-0.8,w:50,h:50},
                 {x:1900,y:400,dx:-5,dy:-0.65,w:50,h:50},
                 {x:2000,y:100,dx:-5,dy:0.15,w:50,h:50},
                 {x:2100,y:50,dx:-5,dy:0.05,w:50,h:50},
                 {x:1700,y:300,dx:-5,dy:0.25,w:50,h:50},
                 {x:1600,y:200,dx:-5,dy:0.35,w:50,h:50},
                 {x:1800,y:300,dx:-5,dy:-0.5,w:50,h:50},
                 {x:0,y:1400,dx:0,dy:-5,w:50,h:50},
                 {x:350,y:1600,dx:0,dy:-5,w:50,h:50},
                 {x:550,y:1400,dx:0,dy:-5,w:50,h:50},
                 {x:200,y:1500,dx:0,dy:-5,w:50,h:50},
                 {x:600,y:-700,dx:-1,dy:5,w:50,h:50},
               ]]
let currentworld = []
let leveltitles = []
function setup() {
  createCanvas(600, 400);
}
function preload(){
  images.title= loadImage("titlescreen.png")
  leveltitles = [loadImage("liontitle.png"),
loadImage("hydratitle.png"),
loadImage("deertitle.png"),
loadImage("birdtitle.png"),
loadImage("bulltitle.png"),
loadImage("cerberostitle.png"),
loadImage("credits.png"),
                ]
  images.bird = loadImage("bird.png")
  images.fire = loadImage("flame.png")
  images.hercules = loadImage("heracles.png")
  images.lion = loadImage("lion.png")
  images.tree = loadImage("tree.png")
  images.bull = loadImage("bull.png")
  images.carberos = loadImage("carberos.png")
  images.ghost = loadImage("ghost.png")
}
function draw() {
  if(playing){
    background(100)
    if((keyIsDown(87) || keyIsDown(UP_ARROW))&& playery > 0){
      playery-=5
    } 
    if((keyIsDown(83) || keyIsDown(DOWN_ARROW))&& playery < 370){
      playery+=5
    }
    if((keyIsDown(68) || keyIsDown(RIGHT_ARROW)) && playerx < 570){
      playerx+=5
    }
    if((keyIsDown(65) || keyIsDown(LEFT_ARROW))&& playerx > 0){
      playerx-=5
    }
    fill(255)
    image(images.hercules,playerx,playery,30,30)
    noFill()
    rect(50,10,500,20)
    fill(255,0,0)
    rect(50,10,enemyhp*5,20)
    enemyhp-= 1/(level+2)
    if(enemyhp < 0){
      playing = false;
    }
    for(let i = 0; i<currentworld.length; i++){
      currentworld[i].x += currentworld[i].dx
      currentworld[i].y += currentworld[i].dy
      if(level == 1){
        if(currentworld[i].dx > 0){
          image(images.lion,currentworld[i].x,currentworld[i].y,currentworld[i].w,currentworld[i].h)
        }else{
          push();
    scale(-1, 1)
    image(images.lion, -currentworld[i].x-currentworld[i].w, currentworld[i].y,currentworld[i].w,currentworld[i].h);
    pop();
        }
      }
      else if(level == 2){
        image(images.fire,currentworld[i].x,currentworld[i].y,currentworld[i].w,currentworld[i].h)
      }else if(level == 3){
        image(images.tree,currentworld[i].x,currentworld[i].y,currentworld[i].w,currentworld[i].h)
      }
      else if(level == 4){
        image(images.bird,currentworld[i].x,currentworld[i].y,currentworld[i].w,currentworld[i].h)
      }else if(level == 5){
       if(currentworld[i].dx < 0){
          image(images.bull,currentworld[i].x,currentworld[i].y,currentworld[i].w,currentworld[i].h)
        }else{
          push();
    scale(-1, 1)
    image(images.bull, -currentworld[i].x-currentworld[i].w,currentworld[i].y,currentworld[i].w,currentworld[i].h);
    pop();
        }
      }else if(level == 6){
       if(currentworld[i].w > 100){
         fill(180)
rect(currentworld[i].x,currentworld[i].y,currentworld[i].w,currentworld[i].h)         
         image(images.carberos,currentworld[i].x,currentworld[i].y,currentworld[i].w,currentworld[i].h)
        }else{
    image(images.ghost, currentworld[i].x,currentworld[i].y,currentworld[i].w,currentworld[i].h);
        }
      }else{
        rect(currentworld[i].x,currentworld[i].y,currentworld[i].w,currentworld[i].h)
      }
      
    noFill()
    rect(50,10,500,20)
    fill(255,0,0)
    rect(50,10,enemyhp*5,20)
    if ((currentworld[i].y + currentworld[i].h > playery) && (currentworld[i].y < playery + 30) && (currentworld[i].x + currentworld[i].w > playerx) && (currentworld[i].x < playerx + 30)){
      playing = false;
      level--
      i = currentworld.length
    }
    }
  }else{
    fill(255)
    
    if(titlescreen){
      image(images.title, 0, 0, 600, 400);
      rect(200,300,200,50)
      textSize(30)
      fill(0)
      text("Play",210,335)
    }else{
      image(leveltitles[level],0,0,600,400)
      
      if(level < leveltitles.length-1){
        rect(50,300,150,50)
        textSize(30)
        fill(0)
        text("Play",60,335)
      }
    }
  }
}
function mouseClicked(){
  if(titlescreen){
     if(mouseX > 200 && mouseX < 400 && mouseY > 300 && mouseY < 350){
    titlescreen = false 
     }
  }
  else if(!playing){
      if(mouseX > 50 && mouseX < 200 && mouseY > 300 && mouseY < 350 && level < leveltitles.length-1){
        playing = true
        enemyhp = 100
        playerx = 300
        playery = 200
        currentworld = [];
        for(let i = 0; i<levels[level].length; i++){
          currentworld.push({x:levels[level][i].x,
                            y:levels[level][i].y,
                            dx:levels[level][i].dx,
                            dy:levels[level][i].dy,
                            w:levels[level][i].w,
                            type:levels[level][i].type,
                            h:levels[level][i].h})
        }        
        level++
     }
  }
}