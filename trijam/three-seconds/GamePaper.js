class GamePaper {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.image = random(Assets.stickynotes);
        this.pickedUp = false;
        this.posDiff = {}
    }
    HandleClick(x, y) {
        if (dist(x, y, this.x, this.y) < this.size / 2) {
            this.pickedUp = true;
            this.posDiff = { x: this.x - mouseX, y: this.y - mouseY }
            Assets.crumple.play();
            return true;
        }
    }
    //mouseX and Y
    Draw(x, y) {
        if (this.pickedUp) {
            this.x = x;
            this.y = y;
            if (!mouseIsPressed) {
                this.pickedUp = false;
            }
        }
        push()
        if (dist(x, y, this.x, this.y) < this.size / 2) {
            tint(200)
        }
        image(this.image, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size)

        pop()
    }
}