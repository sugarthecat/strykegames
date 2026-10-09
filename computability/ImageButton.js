class ImageButton extends Button {
    constructor(x, y, w, h, img, action, active = true, hidden = false) {
        super(x, y, w, h, "", action, active, hidden);
        this.img = img;
    }
    //mouseX and Y
    Draw(x, y) {
        if (this.hidden) {
            return;
        }
        this.UpdateCursor(x, y)
        push()
        if (!this.active || !this.contains(x, y)) {
            tint(255 * 0.5)
        }
        image(this.img, this.x, this.y, this.w, this.h)
        pop()
    }
}
