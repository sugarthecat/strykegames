export default class Chicken {
    constructor() {
        this.x = 20;
        this.y = 100;
        this.w = 25
        this.h = 25
        this.rightmove = false;
        this.leftmove = false;
        this.jumpable = true;
        this.momentum = 0;
    }
    draw(ctx, scalex, scaley, xoff) {
        let x = this.x - xoff;
        let y = this.y
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(x * scalex, y * scaley + 5 * scaley, 25 * scalex, 20 * scaley);
        ctx.fillStyle = "#dbdbdb";
        ctx.fillRect(x * scalex, y * scaley + 5 * scaley, 25 * scalex, 7 * scaley);
        ctx.fillStyle = "#ffffff";
        if (this.rightmove) {
            ctx.fillRect(x * scalex + 15 * scalex, y * scaley, 10 * scalex, 15 * scaley);
            ctx.fillStyle = "#d14141";
            ctx.fillRect(x * scalex + 18 * scalex, y * scaley + 8 * scaley, 3 * scalex, 5 * scaley);
            ctx.fillRect(x * scalex + 18 * scalex, y * scaley - 3 * scaley, 3 * scalex, 3 * scaley);
        }
        else {
            if (this.leftmove) {
                ctx.fillRect(x * scalex, y * scaley, 10 * scalex, 15 * scaley);
                ctx.fillStyle = "#d14141";
                ctx.fillRect(x * scalex + 3 * scalex, y * scaley + 8 * scaley, 3 * scalex, 5 * scaley);
                ctx.fillRect(x * scalex + 3 * scalex, y * scaley - 3 * scaley, 3 * scalex, 3 * scaley);
            }
            else {
                ctx.fillRect(x * scalex + 7.5 * scalex, y * scaley, 10 * scalex, 15 * scaley);
                ctx.fillStyle = "#d14141";
                ctx.fillRect(x * scalex + 10.5 * scalex, y * scaley + 8 * scaley, 3 * scalex, 5 * scaley);
                ctx.fillRect(x * scalex + 10 * scalex, y * scaley - 3 * scaley, 3 * scalex, 3 * scaley);
            }
        }
    }
    updatePhysics() {
        if (this.momentum < 0) {
            this.momentum *= 0.9
        }
        this.momentum -= 1;

        if (this.y < 0) {
            this.momentum = 0;
            this.y = 0;
        }
        if (this.rightmove) {
            this.x += 2;
        }
        if (this.leftmove) {
            this.x -= 2;
        }
        this.y -= this.momentum / 2;

    }
    drawEditor(ctx, scalex, scaley, xoff) {
        this.draw(ctx,scalex*5/6,scaley*3/4,xoff*10)
    }
    collides(object) {
        if (object.x + object.w < this.x || this.x + this.w < object.x || this.y + this.h < object.y || object.y + object.h < this.y) {
            return false
        }
        return true
    }
    jump() {
        if (this.jumpable) {
            this.momentum = 20;
        }
    }
    canJump() {
        this.jumpable = true;
    }
}
