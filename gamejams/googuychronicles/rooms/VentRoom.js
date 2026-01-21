class VentRoom extends GameRoom{
    constructor(x,floor){
        super(x,1,floor,2,Assets.rooms.ventpath);
        this.objects.push(new VerticalSurface(110,251,370))
        this.objects.push(new VerticalSurface(180,251,370))
        this.objects.push(new HorizontalSurface(0,110,250,false))
        this.objects.push(new HorizontalSurface(0,110,370,false))
        this.objects.push(new HorizontalSurface(180,300,250,false))
        this.objects.push(new HorizontalSurface(180,300,370,false))
        this.objects.push(new HorizontalSurface(110,190,505))

    }
}
class VentRoom2 extends GameRoom{
    constructor(x,floor){
        super(x,1,floor,2,Assets.rooms.ventpath2);

        this.objects.push(new HorizontalSurface(0,220,250,false))
        this.objects.push(new HorizontalSurface(0,10,370,false))
        this.objects.push(new HorizontalSurface(290,300,250,false))
        this.objects.push(new HorizontalSurface(80,300,370,false))

        this.objects.push(new HorizontalSurface(10,220,280))
        this.objects.push(new HorizontalSurface(80,290,350))
        
        this.objects.push(new VerticalSurface(290,251,350))
        this.objects.push(new VerticalSurface(10,281,370))

        this.objects.push(new VerticalSurface(220,250,280))
        this.objects.push(new VerticalSurface(80,350,370))

    }
}