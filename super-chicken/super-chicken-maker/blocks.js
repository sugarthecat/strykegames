class Block {
  constructor(color, x, y, w, h) {
    this.color = color;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  draw(ctx, scalex, scaley, xoff) {
    if (this.x - xoff >= 600) {
      return;
    }
    ctx.fillStyle = this.color;
    ctx.fillRect((this.x - xoff) * scalex, this.y * scaley, Math.ceil(this.w * scalex), Math.ceil(this.h * scaley))
  }
  drawEditor(ctx, scalex, scaley, xoff) {
    if (this.x - xoff * 10 >= 600) {
      return;
    }
    ctx.fillStyle = this.color;
    ctx.fillRect(Math.round((this.x - xoff * 10) * scalex), Math.round(this.y * scaley), Math.ceil(this.w * scalex), Math.ceil(this.h * scaley))
  }
}
export class CollisionBlock extends Block {
  constructor(x, y, w, h) {
    super("#d8d7e0", x, y, w, h)
  }
  collide(player) {
    var collisionside;
    let thing = true;
    let numon = 0;
    let momentum = player.momentum;
    //x,y,coll,gr
    let colliscoms = [[0, -3, 1, 1], [-1.5, 3, 2, 0], [3, 0, 3, 0], [-1.5, 1.5, 0, 0], [0, -7.5, 1, 1], [-3, 6, 2, 0], [6, 0, 3, 0], [-3, 0, 0, 0]]
    while (thing && (this.y < player.y + 25 && this.x < player.x + 25 && player.y < this.y + this.h && player.x < this.w + this.x)) {
      player.x += colliscoms[numon][0]
      player.y += colliscoms[numon][1]
      collisionside = colliscoms[numon][2]
      numon++
      if (numon >= colliscoms.length) {
        thing = false
      }
    }
    if (collisionside == 10) {
      if (momentum > 0) {
        momentum = 0;
        player.y = this.y + this.h;
      }
      if (momentum < 0) {
        momentum = 0;
        player.y = this.y - 25;
      }
    }
    if (collisionside == 2) {
      player.x = this.x - 25;
    }
    if (collisionside == 3) {
      player.x = this.x + this.w;
    }
    if (collisionside == 0) {
      momentum = 0;
      player.y = this.y + this.h;
    }
    if (collisionside == 1) {
      player.y = this.y - 25;
    }
    player.x = player.x;
    player.y = player.y;
    player.momentum = momentum;
  }
  colliding(player) {
    return (this.x < player.x + 25)
      && (this.y < player.y + 25)
      && (player.y < this.y + this.h)
      && (player.x < this.w + this.x);
  }
}
export class WinBlock extends Block {
  constructor(x, y, w, h) {
    super("#75b855", x, y, w, h)
  }

}
export class PainBlock extends Block {
  constructor(x, y, w, h) {
    super("#db6161", x, y, w, h)
  }

}
export class FourDegreeTuretBlock extends Block {
  constructor(x, y, w, h) {
    super("#db5ece", x, y, w, h)
  }
}
export class EightDegreeTuretBlock extends Block {
  constructor(x, y, w, h) {
    super("#bd2bae", x, y, w, h)
  }
}
export class OmnidirectionalTuretBlock extends Block {
  constructor(x, y, w, h) {
    super("#750169", x, y, w, h)
  }
}
