class SurgeryItem {
    constructor(x, y, image, size) {
        this.x = x;
        this.y = y;
        this.image = image;
        this.r = size;
    }
    draw() {
        if (selectedObject == this) {
            let mousePosition = getMousePosition();
            image(this.image, mousePosition.x - this.r, mousePosition.y - this.r, this.r * 2, this.r * 2)
        } else {
            image(this.image, this.x - this.r, this.y - this.r, this.r * 2, this.r * 2)
        }
    }
    containsPoint(point) {
        return dist(point.x, point.y, this.x, this.y) < this.r
    }

}
