export default class Button {
    constructor(x, y, w, h, color, text, action) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
        this.text = text;
        this.action = action;
    }
    click(mouseX, mouseY) {
        if (mouseX >= this.x && mouseY >= this.y && mouseX <= this.x + this.w && mouseY <= this.y + this.h) {
            this.action();
        }
    }
    draw(ctx, scalex, scaley) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x * scalex, this.y * scaley, this.w * scalex, this.h * scaley);
        ctx.fillStyle = "#000000"
        ctx.font = (this.w/this.text.length*Math.min(scalex,scaley)*1.5)+"px Comic Sans MS"
        ctx.textAlign = "center";
        ctx.fillText(this.text,(this.x+this.w/2)*scalex,(this.y+this.h*3/4)*scaley)
    }
}