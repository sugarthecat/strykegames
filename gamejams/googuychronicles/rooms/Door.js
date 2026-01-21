class Door extends Room {
    constructor(x, floor) {
        super(x, floor,1, 1, [])
        this.x = x * 350 - 50
        this.w = 50;
        //add ceiling and floor by default
        this.objects = [
            new VerticalSurface(50, 0, 150),
            new VerticalSurface(0, 0, 150),
            new HorizontalSurface(0, 50, 150),
            new HorizontalSurface(0, 50, 250)
        ]
    }
    Draw() {
        push()
        translate(this.x, this.y)
        image(Assets.rooms.door, 0,0, this.w, this.h)
        pop()
    }
}