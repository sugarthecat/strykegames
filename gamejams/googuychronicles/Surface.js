
class HorizontalSurface {
    constructor(leftX, rightX, yPos, sticky=true) {
        this.x1 = leftX;
        this.x2 = rightX;
        this.y = yPos;
        this.sticky = sticky;
    }
    Draw(){
        line(this.x1,this.y,this.x2,this.y)
    }
}
class VerticalSurface {
    constructor(xPos, topY, bottomY) {
        this.x = xPos;
        this.y1 = topY;
        this.y2 = bottomY;
    }
    Draw(){
        line(this.x,this.y1,this.x,this.y2)
    }
}