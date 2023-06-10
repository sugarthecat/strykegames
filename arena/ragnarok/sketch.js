class Hammer{
  constructor(direction){
    this.x = player.x
    this.y = player.y
    this.dmg = 10
    
    this.dx = random(-5,5)
    this.dy = random(-5,5)
    if(direction == 'left'){
      this.dx = -15
    }
    if(direction == 'right'){
      this.dx = 15
    }
    if(direction == 'up'){
      this.dy = -15
    }
    if(direction == 'down'){
      this.dy = 15
    }
    this.x += this.dx * 3
    this.y += this.dy * 3
    this.h = 40
    this.w = 40
  }
  move(){
    this.dmg = Math.pow(dist(0,0,this.dx,this.dy),2)
    let ds = dist(this.x,this.y,player.x,player.y)
    this.x += this.dx * ds/100
    this.y += this.dy * ds/100
    if(player.x > this.x){
      this.dx+=0.5
    }else{
      this.dx-=0.5
    }
    if(player.y > this.y){
      this.dy+=0.5
    }else{
      this.dy-=0.5
    }
    this.dx *= 0.98
    this.dy *= 0.98
    if(this.x < player.x + player.w && this.y < player.y + player.h && this.x + 40 > player.x && this.y + 40 > player.y){
      hammer = false
    }
  }
  display(){
    
    translate(this.x+20,this.y+20)
    let v1 = createVector(this.dx,this.dy)
    let v2 = createVector(1,0)
    rotate(-v1.angleBetween(v2))
    image(images.hammer,-20,-20,40,30)
    rotate(v1.angleBetween(v2))
    translate(-1*(this.x+20),-1*(this.y+20))
  }
}
class Player{
  constructor(){
    this.x = 280
    this.y = 180
    this.w = 40
    this.h = 40
    this.hp = 10;
    this.maxhp = this.hp
    this.left = true
  }
  display(){
    if(this.left){
    image(images.thor,this.x,this.y,this.w,this.h)
    }else{
      push()
      scale(-1,1)
    image(images.thor,-1*(this.x),this.y,-this.w,this.h)
      pop()
    }
    fill(0)
    rect(this.x-0.5,this.y-10.5,this.w+1,6)
    fill(255,0,0)
    rect(this.x,this.y-10,this.w,5)
    fill(0,255,0)
    rect(this.x,this.y-10,this.w/this.maxhp*this.hp,5)
    
  }
  move(movex,movey){
    if(movex > 0){
      this.left = false
    }else if(movex < 0){
      this.left = true
    }
    this.x += movex
    this.y += movey
    if(this.x < 0){
      this.x = 0
    }
    if(this.y < 0){
      this.y = 0
    }
    if(this.y > 400-this.h){
      this.y = 400-this.h
    }
    if(this.x > 600-this.w){
      this.x = 600-this.w
    }
  }
}
class Acid{
  constructor(startx,starty){
    this.x = startx
    this.y = starty
    this.desx = player.x + random(-25,25)
    this.desy = player.y + random(-25,25)
    this.size = 5
    this.sizelimit = random(40,60)
    this.life = random(600,1500)
    this.movespeed = 4
  }
  move(){
    
    
    let dbt = dist(this.x,this.y,this.desx,this.desy)
    if(dbt > this.movespeed){
      this.x += (this.desx-this.x)/dbt*this.movespeed
      this.y += (this.desy-this.y)/dbt*this.movespeed
    }else{
      if(dist(this.x,this.y,player.x+player.w/2,player.y+player.h/2)< this.size){
        player.hp -=0.05
      }
      this.x = this.desx
      this.y = this.desy
      if(this.size < this.sizelimit && this.life > 150){
        this.size+=0.5
      }
      if(this.life/2 < this.size){
        this.size = this.life/2
      }
      if(this.size > this.sizelimit + 0.5){
        this.size-=0.5
      }
      this.life--
    }
    
  }
  display(){
    fill(255,0,255)
    circle(this.x,this.y,this.size)
  
  }
}
class Serpent{
  constructor(){  
    this.x = 0
    this.y = 0
    this.w = 80
    this.h = 40
    this.hp = 1250
    this.maxhp = this.hp
    this.touchingHammer = false
    this.left = false
    this.movetime = 0
    this.moving = true
    this.dx = 4
    this.dy = 0
    this.movespeed = 6
    this.acids = []
  }
  move(){
    for(let i = 0; i<this.acids.length; i++){
      this.acids[i].move()
      
    }
    if(this.x < player.x + player.w && this.y < player.y + player.h && this.x + this.w > player.x && this.y + this.h > player.y){
      player.hp -=0.2
    }
    if(this.x < hammer.x + hammer.w && this.y < hammer.y + hammer.h && this.x + this.w > hammer.x && this.y + this.h > hammer.y){
      if(!this.touchingHammer){
        this.touchingHammer = true
        this.hp -= hammer.dmg*2.5
        if(this.hp <= 0 && player.hp < 10){
          if(player.hp > player.maxhp){
            player.maxhp = player.hp
          }
        }
      }
    }else{
      this.touchingHammer = false
    }
    if(this.moving){
      this.x += this.dx
      this.y += this.dy
      if(this.dx < 0){
        this.left = true
      }else{
        this.left = false
      }
      if (this.x < 0){
        this.x = 0
        this.moving = false
      }
      if (this.y < 0){
        this.y = 0
        this.moving = false
      }
      if (this.y > 400-this.h){
        this.y = 400-this.h
        this.moving = false
      }
      if (this.x > 600-this.w){
        this.x = 600-this.w
        this.moving = false
      }
    }else if (this.movetime <= 0){
      if(random(0,4) >= 1){
      let dbt = dist(this.x,this.y,player.x,player.y)
      this.dx = (player.x-this.x)/dbt*this.movespeed * random(0.85,1.15)
      this.dy = (player.y-this.y)/dbt*this.movespeed * random(0.85,1.15)
        this.movetime = random(20,35)
        this.moving = true
      }else{
        this.acids.push(new Acid(this.x+this.w/2,this.y+this.h/2))
        this.movetime = random(60,100)
      }
      
    }else{
      this.movetime--
    }
  }
  display(){
    for(let i = 0; i<this.acids.length; i++){
      this.acids[i].display()
      if(this.acids[i].size > this.hp / 5){
        this.acids[i].sizelimit = this.hp / 5
      }
      if(this.acids[i].life < 0){
        this.acids.splice(i,1)
        i--;
      }
    }
    fill(255,125,255)
    if(this.left){
    image(images.snake,this.x,this.y,this.w,this.h)  
    }else{
      push()
      scale(-1,1)
      image(images.snake, -this.x-this.w ,this.y ,this.w ,this.h) 
      pop()
    }
    fill(0)
    rect(this.x-0.5,this.y-12,this.w+1,8)
    
    fill(255,0,0)
    rect(this.x,this.y-11.5,this.w,7)
    
    fill(0,255,0)
    rect(this.x,this.y-11.5,this.hp/this.maxhp*this.w,7)
  }
}
class Dead_Soldier{
  constructor(spawnx,spawny){  
    this.x = floor(random(0,2))*660-50
    this.y = floor(random(0,2))*460-50
    this.enemytype = floor(random(0,images.basicEnemies.length))
    if(floor(random(0,2)) == 0){
      this.x = random(-50,610)
    }else{
      this.y = random(-50,410)
    }
    this.w = 40
    this.h = 40
    this.movespeed = random(0.5,sqrt(sqrt(killed/4+0.5)))
    this.hp = floor(random(10,10+sqrt(killed+1)*10))
    this.maxhp = this.hp
    this.touchingHammer = false
  }
  move(){
    let dbt = dist(this.x,this.y,player.x,player.y)
    if(dbt > this.movespeed){
      this.x += (player.x-this.x)/dbt*this.movespeed
      this.y += (player.y-this.y)/dbt*this.movespeed
    }
    if(this.x < hammer.x + hammer.w && this.y < hammer.y + hammer.h && this.x + this.w > hammer.x && this.y + this.h > hammer.y){
      if(!this.touchingHammer){
        this.touchingHammer = true
        this.hp -= hammer.dmg
        if(this.hp <= 0 && player.hp < 10){
          player.hp += 0.1
          if(player.hp > player.maxhp){
            player.maxhp = player.hp
          }
        }
      }
    }else{
      this.touchingHammer = false
    }
    
    if(this.x < player.x + player.w && this.y < player.y + player.h && this.x + this.w > player.x && this.y + this.h > player.y){
      player.hp -= this.hp / this.maxhp
      this.hp = 0
    }
    if(this.hp < 0){
      this.hp = 0
    }
  }
  display(){
    
    fill(255,125,255)
    if(player.x > this.x){
    image(images.basicEnemies[this.enemytype],this.x,this.y,this.w,this.h)  
    }else{
      push()
      scale(-1,1)
      image(images.basicEnemies[this.enemytype], -this.x-this.w ,this.y ,this.w ,this.h) 
      pop()
    }
    fill(0)
    rect(this.x-0.5,this.y-10.5,this.w+1,6)
    
    fill(255,0,0)
    rect(this.x,this.y-10,40,5)
    
    fill(0,255,0)
    rect(this.x,this.y-10,this.hp/this.maxhp*40,5)
  }
}
let killed = 0
let enemies = [new Serpent()]
let boss = false
let player = new Player()
let hammer = false
let canLightningAt = 0
let lightning = false
let images = {}
function preload(){
  
  images.hammer = loadImage('hammer.png')
  images.thor = loadImage('thor.png')
  images.lightning = loadImage('lightning.png')
  images.title = loadImage('titlescreen.jpg')
  images.basicEnemies = [loadImage('skeleton.png')]
  images.snake = loadImage('snake.png')
  images.death = loadImage('death.jpg')
}
function setup() {
  createCanvas(600, 400);
  frameRate(60)
}
let playing = false
function draw() {
  textFont('georgia')
  if(playing && player.hp > 0){
  if(keyIsDown(87)){
    player.move(0,-5)
  } 
  if(keyIsDown(83)){
    player.move(0,5)
  }
  if(keyIsDown(68)){
    player.move(5,0)
  }
  if(keyIsDown(65)){
    player.move(-5,0)
  }
  if(keyIsDown(LEFT_ARROW) && !hammer){
    hammer = new Hammer('left')
  }
  if(keyIsDown(DOWN_ARROW) && !hammer){
    hammer = new Hammer('down')
  }
  if(keyIsDown(RIGHT_ARROW) && !hammer){
    hammer = new Hammer('right')
  }
  if(keyIsDown(UP_ARROW) && !hammer){
    hammer = new Hammer('up')
  }
  if(keyIsDown(32) && frameCount > canLightningAt){
    canLightningAt = frameCount + 300
    if(hammer){
      lightning = {x:hammer.x+hammer.w/2,y:hammer.y+hammer.h/2,life:25}
    }else{
      lightning = {x:player.x + player.w/2,y:player.y + player.h/2,life:25}
    }
    for(let i = 0; i<enemies.length; i++){
      let enemy = enemies[i]
      if(dist( lightning.x, lightning.y, enemy.x+enemy.w/2, enemy.y+enemy.h/2) < 150){
        enemies[i].hp -= 40
      }
     
    }
  }
  background(220);
  noStroke()
    if(lightning){
      fill(100,200,255)
      circle(lightning.x,lightning.y,lightning.life*10)
      lightning.life--
      if(lightning.life < 1){
        lightning = false
      }
    }
  
  if((enemies.length < sqrt(killed)*1.5 && !boss && random(0,10)<1) || enemies.length < 1){
    enemies.push(new Dead_Soldier())
  }
  for(let i = 0; i<enemies.length; i++){
    enemies[i].move()
    enemies[i].display()
    
    //console.log(enemies[i].hp)
    if(enemies[i].hp <= 0){
      enemies.splice(i,1)
      
      player.hp += 0.1
      if(player.hp > player.maxhp){
        player.maxhp = player.hp
      }
      i--
      killed++
    }
  }
  if(hammer){
    hammer.display()
    hammer.move()
  }

  player.display()
    if(lightning && lightning.life > 10){
      image(images.lightning,lightning.x-25+random(-5,5),lightning.y-100+random(-5,5),random(40,60),random(90,110))
    }
  }else if(playing){
    image(images.death,0,0,600,400)
    fill(255)
    textSize(90)
    text(killed, 420,255)
    fill(100)
    if(mouseX > 100 && mouseX < 500 && mouseY > 250 && mouseY < 350){
      fill(150)
    }
    rect(100,280,400,100)
    fill(0)
    textSize(50)
    text("Play Again ", 170,330)
  }else{
    image(images.title,0,0,600,400)
    fill(200,0,0)
    if(mouseX > 100 && mouseX < 500 && mouseY > 270 && mouseY < 370){
      fill(250,100,100)
    }
    rect(100,270,400,100)
    fill(0)
    textSize(50)
    text("Enter The Battle", 120,335)
  }
}
function mouseClicked(){
  if(playing && player.hp <= 0){
    if(mouseX > 100 && mouseX < 500 && mouseY > 250 && mouseY < 350){
      player = new Player()
      killed = 0
      hammer = false
      enemies = [new Serpent()]
    }
  }else if(!playing){
    if(mouseX > 100 && mouseX < 500 && mouseY > 270 && mouseY < 370){
      playing = true
    }
  }
}