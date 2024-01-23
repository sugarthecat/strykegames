import SpriteSheet from "./Spritesheet.js"
/**
 * Container class holding all of the game assets
 */
export default class Assets {
    static rooms = {
        initial: [],
        standard: [],
        loot: [],
        shop: [],
        progression: [],
        boss: [],
    };
    static music = {
        game: [],
    };
    static sound = {
        laugh: []
    }
    static tutorialText
    static backgrounds = [];
    static images = {
        walls: {
        },
        roofs: {
        },
        floors: {
        },
        portal: [],
        enemies: {},
        player: {
            run: []
        },
        clouds: [],

    }
    static spritesheets = {
        player: {}
    }
    static loadFiles(incrementLoadCount) {
        let loaded = incrementLoadCount;
        // load room csvs
        for (let i = 0; i < 2; i++) { this.rooms.initial.push(loadTable('assets/rooms/initial/i' + i + '.csv', 'csv', 'noheader', loaded)); }
        for (let i = 0; i < 18; i++) { this.rooms.standard.push(loadTable('assets/rooms/standard/s' + i + '.csv', 'csv', 'noheader', loaded)); }
        for (let i = 0; i < 3; i++) { this.rooms.progression.push(loadTable('assets/rooms/progression/p' + i + '.csv', 'csv', 'noheader', loaded)); }
        for (let i = 0; i < 2; i++) { this.rooms.boss.push(loadTable('assets/rooms/boss/b' + i + '.csv', 'csv', 'noheader', loaded)); }
        this.rooms.tutorial = loadTable('assets/rooms/tutorial/tutorial.csv', 'csv', 'noheader', loaded)

        // load tutorial blurbs
        fetch("assets/tutorialblurbs.txt")
            .then(x => x.text())
            .then(x => this.tutorialText = x)
            .then(loaded());

        // load music
        this.music.tutorial = loadSound('assets/music/tutorial.mp3', loaded);
        this.music.titlescreen = loadSound('assets/music/titlescreen.mp3', loaded);
        this.music.pausemenu = loadSound('assets/music/pausemenu.mp3', loaded);
        for (let i = 0; i < 10; i++) { this.music.game.push(loadSound('assets/music/game' + i + '.mp3', loaded)) }

        // load sounds
        this.sound.portalopen = loadSound('assets/sound/portalopen.mp3', loaded);
        this.sound.gothroughportal = loadSound('assets/sound/gothroughportal.mp3', loaded);
        this.sound.bookthrow = loadSound('assets/sound/bookthrow.mp3', loaded);
        this.sound.chemistry = loadSound('assets/sound/chemistry.mp3', loaded);
        this.sound.theology = loadSound('assets/sound/theology.mp3', loaded);
        this.sound.geology = loadSound('assets/sound/geology.mp3', loaded);

        // load tile sprites
        for (let i = 0; i < 6; i++) {
            this.images.walls["theme" + i] = []
            for (let j = 0; j < 2; j++) { this.images.walls["theme" + i].push(loadImage('assets/sprites/tiles/theme' + i + '/wall' + j + '.png', loaded)); }
            this.images.roofs["theme" + i] = []
            for (let j = 0; j < 2; j++) { this.images.roofs["theme" + i].push(loadImage('assets/sprites/tiles/theme' + i + '/roof' + j + '.png', loaded)); }
            this.images.floors["theme" + i] = []
            for (let j = 0; j < 4; j++) { this.images.floors["theme" + i].push(loadImage('assets/sprites/tiles/theme' + i + '/floor' + j + '.png', loaded)); }
        }

        // load player sprites
        this.images.player.idle = loadImage('assets/sprites/idle.png', loaded);
        this.spritesheets.player.run = new SpriteSheet('assets/spritesheets/playerRun.png', loaded);
        this.images.aura = loadImage('assets/sprites/playerAura.png', loaded);
        this.images.target = loadImage('assets/sprites/target.png', loaded);

        // load enemy sprites
        this.spritesheets.froghop = new SpriteSheet('assets/spritesheets/froghop.png', loaded);
        this.spritesheets.eviltree = new SpriteSheet('assets/spritesheets/eviltree.png', loaded);
        this.spritesheets.reaperfloat = new SpriteSheet('assets/spritesheets/reaperfloat.png', loaded);
        this.spritesheets.nightborne = new SpriteSheet('assets/spritesheets/nightborne.png', loaded);
        this.spritesheets.batmove = new SpriteSheet('assets/spritesheets/batmove.png', loaded);
        this.spritesheets.skeletonwalk = new SpriteSheet('assets/spritesheets/skeletonwalk.png', loaded);

        // load ability sprites
        this.images.holystar = loadImage('assets/sprites/holystar.png', loaded);
        this.images.laserbeam = loadImage('assets/sprites/laserbeam.png', loaded);
        this.images.laserbeambody = loadImage('assets/sprites/laserbeambody.png', loaded);
        this.images.book = loadImage('assets/sprites/book.png', loaded);
        this.images.chemicalvial = loadImage('assets/sprites/chemicalvial.png', loaded);

        // load ability icons
        this.images.TheologyIcon = loadImage('assets/sprites/TheologyIcon.png', loaded);
        this.images.ChemistryIcon = loadImage('assets/sprites/ChemistryIcon.png', loaded);
        this.images.GeologyIcon = loadImage('assets/sprites/GeologyIcon.png', loaded);

        // load item sprites
        this.spritesheets.chest = new SpriteSheet('assets/spritesheets/chest.png', loaded);
        this.spritesheets.key = new SpriteSheet('assets/spritesheets/key.png', loaded);
        this.spritesheets.coin = new SpriteSheet('assets/spritesheets/coin.png', loaded);
        this.spritesheets.healthpotion = new SpriteSheet('assets/spritesheets/healthpotion.png', loaded);
        this.spritesheets.lifepotion = new SpriteSheet('assets/spritesheets/lifepotion.png', loaded);
        this.spritesheets.portal = new SpriteSheet('assets/spritesheets/portal.png', loaded);

        //other spritesheets

        this.spritesheets.earthquake = new SpriteSheet("assets/spritesheets/earthquake.png", loaded)

        // load UI sprites
        this.images.title = loadImage('assets/sprites/title.png', loaded);
        this.images.wasd = loadImage('assets/sprites/wasd.png', loaded);
        this.images.abilityicon = loadImage('assets/sprites/abilityicon.png', loaded);
        this.images.playbutton = loadImage('assets/sprites/play.png', loaded);
        this.images.skipbutton = loadImage('assets/sprites/skip.png', loaded);
        this.images.arrow = loadImage('assets/sprites/arrow.png', loaded);

        // load backrounds
        for (let i = 1; i < 5; i++) { this.images.clouds.push(loadImage('assets/sprites/clouds/' + i + '.png', loaded)); }
        for (let i = 0; i < 40; i++) { this.backgrounds.push(loadImage('assets/sprites/backgrounds/b' + i + '.jpg', loaded)); }
    }
}