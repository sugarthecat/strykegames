class SmallRoom extends GameRoom {
    constructor(x, floor, background) {
        super(x, 1, floor, 1, background);
    }
}
class MediumRoom extends GameRoom {
    constructor(x, floor, background) {
        super(x, 2, floor, 1, background);
    }
}
class LargeRoom extends GameRoom {
    constructor(x, floor, background) {
        super(x, 3, floor, 1, background);
    }
}
class SmallOffice extends SmallRoom {
    constructor(x, floor) {
        super(x, floor, Assets.rooms.office)
        if (random() < 0.5) {
            this.objects.push(
                new Beaker(80, 170)
            )
        } else {
            this.objects.push(
                new Beaker(220, 170)
            )

        }
    }
}
class SmallClassroom extends SmallRoom {
    constructor(x, floor) {
        super(x, floor, Assets.rooms.classroom)
    }
}
class SmallCafeteria extends SmallRoom {
    constructor(x, floor) {
        super(x, floor, Assets.rooms.cafeteria)
    }
}
class SmallRecRoom extends SmallRoom {
    constructor(x, floor) {
        super(x, floor, Assets.rooms.recroom)
    }
}
class SmallHallway extends SmallRoom {
    constructor(x, floor) {
        super(x, floor, Assets.rooms.hallway)
    }
}
class MediumMeetingRoom extends MediumRoom {
    constructor(x, floor) {
        super(x, floor, Assets.rooms.meetingroom)
    }
}
class MediumAbandonedLibrary extends MediumRoom {
    constructor(x, floor) {
        super(x, floor, Assets.rooms.abandonedlibrary)
    }
}
class MediumGreenhouse extends MediumRoom {
    constructor(x, floor) {
        super(x, floor, Assets.rooms.greenhouse)
    }
}
class MediumHelipad extends MediumRoom {
    constructor(x, floor) {
        super(x, floor, Assets.rooms.helipad)
        this.objects[0].y -= 25
    }
}
class MediumDangerousGreenhouse extends MediumRoom {
    constructor(x, floor) {
        super(x, floor, Assets.rooms.greenhouse)
        for (let i = 50; i < 650; i += 50) {
            this.objects.push(new HazardZone(i, 50, 75, 1))
        }
        this.animationState = 100
    }
    Draw() {
        this.animationState += deltaTime / 1000;
        super.Draw()
        push()
        translate(this.x, this.y)
        fill(0,200,0)
        for (let i = 0; i < 60; i++) {
            circle(i* 10 + 25 + 10* sin (i+this.animationState * ((i * 7 % 13))/13) , 60 +30* cos (i+this.animationState * ((i * 13 % 29)/29) ), 10)
        }
        pop()
    }
}
class MediumFurnace extends MediumRoom {
    constructor(x, floor) {
        super(x, floor, Assets.rooms.furnace)
        this.objects.push(new HazardZone(80, 220, 20, 1));
        this.objects.push(new HazardZone(570, 220, 20, 1));
        this.objects.push(new HazardZone(290, 200, 50, 3));
        this.objects.push(new HazardZone(340, 200, 50, 3));
        this.objects.push(new HorizontalSurface(250,375,125, false))
        this.animationState = 100
    }
    Draw() {
        this.animationState += deltaTime / 1000;
        super.Draw()
        push()
        translate(this.x, this.y)
        fill(240,94,24)
        for (let i = 0; i < 15; i++) {
            circle(325 + 70* sin (i+this.animationState * ((i * 7 % 13))/13) , 200 +50* cos (i+this.animationState * ((i * 13 % 29)/29) ), 10)
        }
        for (let i = 0; i < 4; i++) {
            circle(80 + 20* sin (i+this.animationState * ((i * 13 % 17))/17) , 220 +20* cos (i+this.animationState * ((i * 17 % 29)/29) ), 10)
            circle(570 + 20* sin (i+this.animationState * ((i * 19 % 17))/17) , 220 +20* cos (i+this.animationState * ((i * 19 % 29)/29) ), 10)
        }
        pop()
    }
}
class LargeShootingRange extends LargeRoom {
    constructor(x, floor) {
        super(x, floor, Assets.rooms.shootingrange)
    }
}