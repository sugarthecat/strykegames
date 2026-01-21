class Room {
    constructor(x, floor, width = 1, height = 1, relativeSurfaces = [], AddCeilingAndFloor = true) {
        this.x = x * 350;
        this.y = -floor * 350;
        this.w = width * 350 - 50;
        this.h = height * 350 - 50;
        this.objects = relativeSurfaces;
        //add ceiling and floor by default
        if (AddCeilingAndFloor) {
            this.objects.push(new HorizontalSurface(0, this.w, 25))
            this.objects.push(new HorizontalSurface(0, this.w, this.h - 50))
        }
    }
    Draw() {
        push()
        stroke(0)
        fill(100, 0, 0)
        rect(this.x, this.y, this.w, this.h)
        translate(this.x, this.y)
        strokeWeight(5);
        for (let i = 0; i < this.objects.length; i++) {
            let object = this.objects[i];
            object.Draw();
        }
        pop()
    }
}

class GameRoom extends Room {
    constructor(x, width, floor, height, background) {
        super(x, floor, width, height);
        this.background = background;
    }
    Draw() {
        push()
        translate(this.x, this.y)
        image(this.background, 0, 0, this.w, this.h)
        stroke(255, 0, 0)
        strokeWeight(5)
        for (let i = 0; i < this.objects.length; i++) {
            if (this.objects[i] instanceof Beaker) {
                this.objects[i].Draw();
                if (!this.objects[i].active) {
                    this.objects.splice(i, 1)
                }
            }
            else if (this.objects[i] instanceof WeakWallSection) {
                this.objects[i].Draw();
            }
            else {
                //this.objects[i].Draw();
            }
        }
        pop()
    }
}

class Floor extends Room {
    constructor(x, floor) {
        super(x, floor, 1);
        this.x = this.x - 50;
        this.y = this.y - 50;
        this.h = 50;
        this.w = this.w + 100;
        this.objects = [];
    }
    Draw() {
        push()
        translate(this.x, this.y)
        image(Assets.rooms.floor, 0, 0, this.w, this.h)
        pop()
    }
}

