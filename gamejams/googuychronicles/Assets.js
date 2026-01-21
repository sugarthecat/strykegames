class Assets {
    static spritesheets = {}
    static rooms = {}
    static entities = {}
    static symbols = {}
    static music = {}
    static sound = {}
    static screens = {}
    static loadAssets() {
        this.spritesheets.googuy = loadImage("assets/googuy.png")
        this.spritesheets.armyguy = loadImage("assets/armyguy.png")
        this.spritesheets.police = loadImage("assets/police.png")
        this.spritesheets.gradstudent = loadImage("assets/gradstudent.png")
        this.spritesheets.madscientist = loadImage("assets/madscientist.png")
        this.spritesheets.gun = loadImage("assets/gun.png")
        this.rooms.office = loadImage("assets/office.png")
        this.rooms.cafeteria = loadImage("assets/cafeteria.png")
        this.rooms.hallway = loadImage("assets/hallway.png")
        this.rooms.meetingroom = loadImage("assets/meetingroom.png")
        this.rooms.classroom = loadImage("assets/classroom.png")
        this.rooms.recroom = loadImage("assets/recroom.png")
        this.rooms.abandonedlibrary = loadImage("assets/library.png")
        this.rooms.greenhouse = loadImage("assets/greenhouse.png")
        this.rooms.furnace = loadImage("assets/furnace_room.png")
        this.rooms.helipad = loadImage("assets/helipad.png")
        this.rooms.shootingrange = loadImage("assets/shootingrange.png")
        this.rooms.narrowvent = loadImage("assets/narrowvent.png")
        this.rooms.widevent = loadImage("assets/widevent.png")
        this.rooms.staircase = loadImage("assets/staircase.png")
        this.rooms.ventpath = loadImage("assets/ventpath.png")
        this.rooms.ventpath2 = loadImage("assets/ventpath2.png")
        this.rooms.emptyroom = loadImage("assets/emptyroom.png")
        this.entities.midAirGooGuy = loadImage("assets/googuymidair.png")
        this.entities.wallcracks = loadImage("assets/crack.png")
        this.entities.wallhole = loadImage("assets/hole.png")
        this.entities.goostain = loadImage("assets/goostain.png")
        this.rooms.door = loadImage("assets/door.png")
        this.rooms.wall = loadImage("assets/wall.png")
        this.rooms.floor = loadImage("assets/floor.png")
        this.symbols.alert = loadImage("assets/exclamationpoint.png")
        this.symbols.beaker = loadImage("assets/beaker.png")
        this.screens.titlescreen = loadImage("assets/titlescreen.png")
        this.screens.levelselectscreen = loadImage("assets/levelselect.png")
        
        this.sound.jump = loadSound("assets/sound/goo_jump.mp3")
        this.sound.land = loadSound("assets/sound/goo_impact.mp3")
        
        this.music.entergoo = loadSound("assets/sound/music/enter_goo.mp3")
        this.music.robot = loadSound("assets/sound/music/robot_factory.mp3")
        this.music.fifty1 = loadSound("assets/sound/music/51.mp3")

        this.sound.death = loadSound("assets/sound/death/death_man.mp3")
  
    }
    static setVolume(volume) {
    }
}