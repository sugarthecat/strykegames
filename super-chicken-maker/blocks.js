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
}
class CollisionBlock extends Block {
    constructor(x, y, w, h) {
        super("#ffffff", x, y, w, h)
    }
}
class WinBlock extends Block {
    constructor(x, y, w, h) {
        super("#00ff00", x, y, w, h)
    }

}
class FourDegreeTuretBlock extends Block {
    constructor(x, y, w, h) {
        super("#008080", x, y, w, h)
    }

}
