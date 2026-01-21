class EscapeRoom extends SmallRoom{
    constructor(x,floor){
        super(x,floor,Assets.rooms.emptyroom)
        this.objects.push(new WeakWallSection(150,175,150,150))
    }
}