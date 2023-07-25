class Block {
    constructor(color, x, y, w, h) {
        this.color = color;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    draw(ctx, scalex, scaley) {
        ctx.fillStyle = this.color;
        ctx.fillRect(x * scalex, y * scaley, w * scalex, h * scaley)
    }
    drawEditor(ctx, scalex, scaley, xoff){
        ctx.fillStyle = this.color;
        ctx.fillRect(Math.round((this.x-xoff*10) * scalex), Math.round(this.y * scaley), Math.round(this.w * scalex), Math.round(this.h * scaley))
    }
}
export class CollisionBlock extends Block {
    constructor(x, y, w, h) {
        super("#d8d7e0", x, y, w, h)
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
