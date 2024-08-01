window.addEventListener('keydown', (e) => {
  if (([32, 37, 38, 39, 40].includes(e.keyCode)) && e.target === document.body) {
    e.preventDefault();
  }
});
let lastLasered = 0
class Player {
  constructor() {
    this.x = 280
    this.dirx = 0
    this.diry = 0
    this.y = 180
    this.w = 40
    this.h = 40
    this.hp = 10;
    this.maxhp = this.hp
    this.shield = 2
    this.left = true
  }
  display() {
    this.dirx = 0
    this.diry = 0
    if (this.shield < 0) {
      this.hp += this.shield
      this.shield = 0
    }

    this.shield += 0.008;
    if (laser) {
      this.shield += 0.008
    }
    if (this.shield > 2) {
      this.shield = 2;
    }
    if (this.left) {
      image(images.thor, this.x, this.y, this.w, this.h)
    } else {
      push()
      scale(-1, 1)
      image(images.thor, -1 * (this.x), this.y, -this.w, this.h)
      pop()
    }
    let shieldColor = color(100, 100, 255)
    shieldColor.setAlpha(100)
    fill(shieldColor)
    if (this.shield > 0.8) {
      stroke(100, 100, 255)
      strokeWeight(5)
      circle(this.x + this.w / 2, this.y + this.h / 2, sqrt(this.w * this.shield * 50))
      noStroke()
    }
    fill(0)
    rect(this.x - 0.5, this.y - 22.5, this.w + 1, 19)
    if (laser) {
      fill(255, 255, 0)
      rect(this.x, this.y - 22, this.w * laser.life / (70 + killed / 50 * 20), 5)
    } else {
      fill(255, 0, 255)
      if (frameCount > canLaserAt) {
        fill(255, 255, 0)
      }
      rect(this.x, this.y - 22, min(this.w, this.w * (frameCount - lastLasered) / (canLaserAt - lastLasered)), 5)
    }
    fill(0, 255, 0)
    rect(this.x, this.y - 10, this.w / this.maxhp * this.hp, 5)
    fill(50, 50, 255)
    rect(this.x, this.y - 16, this.w / 2 * this.shield, 5)
  }
  move(movex, movey) {
    if (movex > 0) {
      this.left = false
    } else if (movex < 0) {
      this.left = true
    }
    this.dirx += movex
    this.diry += movey
    this.x += movex
    this.y += movey
    if (this.x < 0) {
      this.x = 0
      this.dirx = 0
    }
    if (this.y < 0) {
      this.y = 0
      this.diry = 0
    }
    if (this.y > 400 - this.h) {
      this.y = 400 - this.h
      this.diry = 0
    }
    if (this.x > 600 - this.w) {
      this.x = 600 - this.w
      this.dirx = 0
    }
  }
}
class Dead_Soldier {
  constructor(spawnx, spawny) {
    this.x = floor(random(0, 2)) * 660 - 50
    this.y = floor(random(0, 2)) * 460 - 50
    this.enemytype = floor(random(0, images.basicEnemies.length))
    if (floor(random(0, 2)) == 0) {
      this.x = random(-50, 610)
    } else {
      this.y = random(-50, 410)
    }
    this.w = 40
    this.h = 40
    this.dirmulti = random(0, 35)
    this.movespeed = random(0.5, sqrt(killed / 8 + 0.5))
    this.hp = floor(random(10, 10 + sqrt(killed + 1) * 10))
    this.maxhp = this.hp
  }
  move() {
    let dbt = dist(this.x, this.y, player.x + player.dirx * this.dirmulti, player.y + player.diry * this.dirmulti)
    if (dbt > this.movespeed) {
      this.x += (player.x - this.x + player.dirx * this.dirmulti) / dbt * this.movespeed
      this.y += (player.y - this.y + player.diry * this.dirmulti) / dbt * this.movespeed
    }


    if (this.x < player.x + player.w && this.y < player.y + player.h && this.x + this.w > player.x && this.y + this.h > player.y) {
      player.shield -= this.hp / this.maxhp
      this.hp = 0
    }
    if (this.hp < 0) {
      this.hp = 0
    }
  }
  display() {

    fill(255, 125, 255)
    if (player.x > this.x) {
      image(images.basicEnemies[this.enemytype], this.x, this.y, this.w, this.h)
    } else {
      push()
      scale(-1, 1)
      image(images.basicEnemies[this.enemytype], -this.x - this.w, this.y, this.w, this.h)
      pop()
    }
    fill(0)
    rect(this.x - 0.5, this.y - 10.5, this.w + 1, 6)

    fill(255, 0, 0)
    rect(this.x, this.y - 10, 40, 5)

    fill(0, 255, 0)
    rect(this.x, this.y - 10, this.hp / this.maxhp * 40, 5)
  }
}
let killed = 0
let enemies = []
let boss = false
let player = new Player()
let canLaserAt = 0
let laser = false
let images = {}
function preload() {
  images.thor = loadImage('thor.png')
  images.laser = loadImage('laserbeam.png')
  images.basicEnemies = [loadImage('skeleton.png')]
}
function setup() {
  createCanvas(600, 400).parent("game");
  frameRate(60)
}
let playing = false
function draw() {
  textFont('georgia')
  if (playing && player.hp > 0) {
    if (keyIsDown(87) || keyIsDown(38)) {
      player.move(0, -5)
    }
    if (keyIsDown(83) || keyIsDown(40)) {
      player.move(0, 5)
    }
    if ((keyIsDown(68) || keyIsDown(RIGHT_ARROW)) && !(keyIsDown(65) || keyIsDown(LEFT_ARROW))) {
      player.move(5, 0)
    }
    if ((keyIsDown(65) || keyIsDown(LEFT_ARROW)) && !(keyIsDown(68) || keyIsDown(RIGHT_ARROW))) {
      player.move(-5, 0)
    }
    if (keyIsDown(32) && frameCount > canLaserAt) {
      laser = { life: 70 + killed / 50 * 20 }
      canLaserAt = frameCount + 220 - killed / 50 * 20
      lastLasered = frameCount
    }
    background(220);
    noStroke()
    fill(0)
    textSize(20)
    text("Kills: " + killed, 0, 20)

    if ((enemies.length < sqrt(killed) * 1.5 && !boss && random(0, 10) < 1) || enemies.length < 1) {
      enemies.push(new Dead_Soldier())
    }
    if (frameCount % 500 == 0 && killed > 100) {
      enemies.push(new Dead_Soldier())
    } else if (frameCount % 250 == 0 && killed > 115) {
      enemies.push(new Dead_Soldier())
    } else if (frameCount % 100 == 0 && killed > 130) {
      enemies.push(new Dead_Soldier())
    } else if (frameCount % 50 == 0 && killed > 150) {
      enemies.push(new Dead_Soldier())
    } else if (frameCount % 20 == 0 && killed > 200) {
      enemies.push(new Dead_Soldier())
    }
    for (let i = 0; i < enemies.length; i++) {
      enemies[i].move()
      enemies[i].display()

      //console.log(enemies[i].hp)
      if (enemies[i].hp <= 0) {
        enemies.splice(i, 1)
        i--
        killed++
      }
    }

    player.display()
    if (laser) {
      laser.life -= 1
      if (!player.left) {
        image(images.laser, player.x + 30 + random(-5, 5), player.y + 10 + random(-5, 5), 100, 20)
        for (let i = 0; i < enemies.length; i++) {
          if (player.x + 125 > enemies[i].x && player.y + 30 > enemies[i].y && player.x + 30 < enemies[i].x + enemies[i].w && player.y + 10 < enemies[i].y + enemies[i].h) {
            enemies[i].hp = -1
          }
        }
      } else {
        push()
        scale(-1, 1)
        image(images.laser, (player.x + 10 + random(-5, 5)) * -1, player.y + 10 + random(-5, 5), 100, 20)
        pop()
        for (let i = 0; i < enemies.length; i++) {
          if (player.x + 10 > enemies[i].x && player.y + 30 > enemies[i].y && player.x - 80 < enemies[i].x + enemies[i].w && player.y + 10 < enemies[i].y + enemies[i].h) {
            enemies[i].hp = -1
          }
        }
      }
      if (laser.life <= 0) {
        laser = false;
        lastLasered = frameCount
      }
    }

  } else if (playing) {
    fill(0)
    rect(0, 0, width, height)
    fill(255)
    textSize(60)
    text("You have slain " + killed, 50, 220)
    fill(100)
    if (mouseX > 100 && mouseX < 500 && mouseY > 250 && mouseY < 350) {
      fill(150)
    }
    rect(100, 280, 400, 100)
    fill(0)
    textSize(50)
    text("Play Again ", 170, 330)
  } else {
    fill(255)
    textSize(50)
    text("Thorium-Man: The Fight for the Periodic Table", 170, 130)
    fill(0)
    rect(0, 0, width, height)
    fill(200, 0, 0)
    if (mouseX > 100 && mouseX < 500 && mouseY > 270 && mouseY < 370) {
      fill(250, 100, 100)
    }
    rect(100, 270, 400, 100)
    fill(0)
    textSize(50)
    text("Enter The Battle", 120, 335)
  }
}
function mouseClicked() {
  if (playing && player.hp <= 0) {
    if (mouseX > 100 && mouseX < 500 && mouseY > 250 && mouseY < 350) {
      player = new Player()
      killed = 0
      laser = false;
      enemies = []
    }
  } else if (!playing) {
    if (mouseX > 100 && mouseX < 500 && mouseY > 270 && mouseY < 370) {
      playing = true
    }
  }
}