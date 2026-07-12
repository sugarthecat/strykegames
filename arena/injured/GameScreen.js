const CAM_ADJUST_SPEED = 0.05;
class GameScreen extends GUI {
    static scaleFactor = 2;
    constructor() {
        super();
        this.player = new Player()
        this.camera = {
            x: 0,
            y: 0
        }
        this.bounds = {
            x: { min: -300, max: 500 },
            y: { min: -600, max: 600 }
        }
        this.enemies = [
            // new Artillery(0, 2, 2, 150, 0, 1),
            new Landmine(200, 400),
            new Barricade(200, 200, PI / 2, PI * 3 / 2),
            new EnemySniper(200, 200, 2),
            new Tree(200, 0, 50)
        ]
        this.bullets = []
        this.bgcolor = color(0, 150, 0)
        this.background = new Background(this.bounds);
    }
    Draw(x, y) {
        if (deltaTime / 1000 > 0.3) {
            return;
        }
        background(this.bgcolor)
        push()
        this.camera.x -= CAM_ADJUST_SPEED * (this.camera.x - this.player.x);
        this.camera.y -= CAM_ADJUST_SPEED * (this.camera.y - this.player.y);
        if (this.camera.x < this.bounds.x.min + GameScreen.scaleFactor * 300) {
            this.camera.x = this.bounds.x.min + GameScreen.scaleFactor * 300
        }
        if (this.camera.y < this.bounds.y.min + GameScreen.scaleFactor * 200) {
            this.camera.y = this.bounds.y.min + GameScreen.scaleFactor * 200
        }
        if (this.camera.x > this.bounds.x.max - GameScreen.scaleFactor * 300) {
            this.camera.x = this.bounds.x.max - GameScreen.scaleFactor * 300
        }
        if (this.camera.y > this.bounds.y.max - GameScreen.scaleFactor * 200) {
            this.camera.y = this.bounds.y.max - GameScreen.scaleFactor * 200
        }
        translate(300, 200)
        scale(1 / GameScreen.scaleFactor)
        translate(- this.camera.x, - this.camera.y)
        this.background.Draw(this.camera.x, this.camera.y)
        this.DrawLowerEnemies()
        this.UpdateEnemies()
        this.UpdateBullets()
        this.player.Draw((x - 300) * GameScreen.scaleFactor + this.camera.x, (y - 200) * GameScreen.scaleFactor + this.camera.y)
        this.DrawUpperEnemies()
        this.player.x = constrain(this.player.x, this.bounds.x.min + this.player.radius, this.bounds.x.max - this.player.radius);
        this.player.y = constrain(this.player.y, this.bounds.y.min + this.player.radius, this.bounds.y.max - this.player.radius);
        pop()
        this.player.DrawGUI()
        super.Draw(x, y);
        if (!this.player.isAlive()) {
            screenOn = "death";
        } else if (this.player.goalTime > 5) {
            screenOn = "dialogue";
            screens.dialogue.Load(this.level + 1)
        }
    }
    UpdateBullets() {
        const sf = GameScreen.scaleFactor;
        for (let i = 0; i < this.bullets.length; i++) {
            const b = this.bullets[i];
            if (b.landed
                || b.x < this.bounds.x.min - 300 * sf
                || b.x > this.bounds.x.max + 300 * sf
                || b.y < this.bounds.y.min - 200 * sf
                || b.y > this.bounds.y.max + 200 * sf) {
                this.bullets.splice(i, 1);
                i--;
                continue;
            }
            b.Update(this.player);
            b.Draw();
        }
    }
    DrawLowerEnemies() {
        for (let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].DrawLower();
        }
    }
    DrawUpperEnemies() {
        for (let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].DrawUpper();
        }
    }
    UpdateEnemies() {
        for (let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].Update(this.player, this.background, this.bullets)
            if (this.enemies[i] instanceof EnemySniper) {
                const bullet = this.enemies[i].attemptShoot();
                if (bullet) {
                    this.bullets.push(bullet);
                }
            }
            if (!this.enemies[i].isAlive()) {
                this.enemies.splice(i, 1)
                i--;
            }
        }
    }
    HandleClick(x, y) {
        const bullet = this.player.attemptShoot(
            (x - 300) * GameScreen.scaleFactor + this.camera.x,
            (y - 200) * GameScreen.scaleFactor + this.camera.y
        )
        if (bullet) {
            this.bullets.push(bullet);
        }
    }

    Load(level) {
        this.player = new Player(0, 0)
        this.bullets = []
        this.level = level;
        let backgroundOverridden = false;
        switch (level) {
            case 1:
                this.bgcolor = color(0, 150, 0)
                GameScreen.scaleFactor = 1
                this.bounds = {
                    x: { min: -300, max: 800 },
                    y: { min: -200, max: 200 }
                }
                this.enemies = [
                    new Landmine(100, -100),
                    new Landmine(125, 20),
                    new Landmine(200, 0),
                    new Landmine(200, 100),
                    new Landmine(225, -175),
                    new Landmine(350, -50),
                    new Landmine(340, 95),
                    new Landmine(380, 50),
                    new Landmine(415, 95),
                    new Landmine(500, -25),
                    new Barricade(230, -70, PI * 3 / 4, PI * 7 / 4),
                    new Tree(-153, 86, 55),
                    new Tree(-80, -30, 35),
                    new Tree(-15, 60, 35),
                    new Tree(250, 150, 50),
                    new Tree(300, -120, 40),
                    new Tree(425, -80, 45),
                    new Tree(525, 50, 50),
                    new Tree(680, 125, 55),
                    new Tree(700, -120, 70),
                    new Goal(650, 0)
                ]
                break;
            case 2:
                this.bgcolor = color(0, 150, 0)
                GameScreen.scaleFactor = 1.5
                this.bounds = {
                    x: { min: -200, max: 1000 },
                    y: { min: -300, max: 300 }
                }
                this.enemies = [
                    new Tree(295, 150, 45),
                    new Tree(305, 250, 45), new Tree(383.38607594936707, 89.24050632911394, 48), new Tree(570.4113924050633, 112.97468354430379, 40),
                    new Tree(212, 213, 41),
                    new Tree(632, 30, 43),
                    new Tree(486, 48, 47),
                    new Tree(346, -226, 46),
                    new Tree(100, -120, 40),
                    new EnemySniper(400, 200, 4, 3, 1000, 1000, 1),
                    new Goal(850, 150)
                ]
                break;
            case 3:
                this.bgcolor = color(0, 150, 0)
                GameScreen.scaleFactor = 1.5
                this.bounds = {
                    x: { min: -200, max: 1000 },
                    y: { min: -300, max: 300 }
                }
                this.enemies = [
                    new Barricade(350, -75, PI * 3 / 4, PI * 7 / 4),
                    new Barricade(350, 0, PI * 1 / 4, PI * 7 / 4),
                    new Barricade(350, 75, PI * 1 / 4, PI * 5 / 4),
                    new EnemySniper(350, -75, 3),
                    new EnemySniper(350, 75, 3),
                    new EnemySniper(600, -95, 2),
                    new Tree(-125, -120, 55),
                    new Tree(100, 0, 45),
                    new Tree(135, 65, 30),
                    new Tree(250, -120, 52),
                    new Tree(290, 190, 42),
                    new Tree(355, 175, 29),
                    new Tree(536, -123, 42),
                    new Tree(566, -30, 48),
                    new Tree(575, -186, 40),
                    new Tree(600, -254, 34),
                    new Landmine(325, -250),
                    new Landmine(300, -205),
                    new Goal(850, 0)
                ]
                break;
            case 4:
                this.bgcolor = color(0, 150, 0)
                GameScreen.scaleFactor = 1.25
                this.bounds = {
                    x: { min: -200, max: 2400 },
                    y: { min: -250, max: 250 }
                }
                this.enemies = [
                    new Artillery(0, 5, 3, 175, 1, 0),
                    new Artillery(0, 4, 4, 150, 0, 0),
                    new Artillery(0, 3, 5, 145, 0.9, -1 / 2),
                    new Artillery(0, 2, 6, 125, 0.9, 1 / 2),
                    new Artillery(1, 2, 2, 75, 0, 0),
                    new Artillery(1, 2, 3, 75, -1, 0),
                    new Tree(100, -227, 40),
                    new Tree(200, -44, 33),
                    new Tree(300, 20, 45),
                    new Tree(400, 164, 50),
                    new Tree(500, -156, 37),
                    new Tree(600, -201, 39),
                    new Tree(700, -114, 43),
                    new Tree(800, 216, 47),
                    new Tree(900, 177, 39),
                    new Tree(1300, -141, 35),
                    new Tree(1400, 21, 47),
                    new Tree(1500, -85, 44),
                    new Tree(1600, 15, 44),
                    new Tree(1700, 131, 45),
                    new Tree(1800, 153, 40),
                    new Tree(1900, 60, 40),
                    new Tree(2000, -240, 33),
                    new Tree(2100, -155, 32),
                    new Tree(2200, -118, 40),
                    new Tree(2400, -235, 50),
                    new Goal(2300, 0, 50),
                ]
                break;
            case 5:
                this.bgcolor = color(0, 150, 0)
                GameScreen.scaleFactor = 1.25
                this.bounds = {
                    x: { min: -200, max: 1200 },
                    y: { min: -250, max: 250 }
                }
                this.enemies = [
                    new EnemySniper(200, 100, 2, 2, 100, 500, 1),
                    new EnemySniper(500, 150, 2, 2, 100, 500, 1),
                    new EnemySniper(800, 150, 2, 2, 100, 500, 1),
                    new EnemySniper(1000, 0, 2, 2, 100, 500, 1),
                    new Barricade(1000, 0, PI * 1 / 2, PI * 3 / 2),
                    new Tree(69.52513514137252, 64.66626682682629, 43),
                    new Tree(-130.53797468354432, -189.873417721519, 48),
                    new Tree(-120.09493670886076, 110.12658227848098, 49),
                    new Tree(439.67567128683277, 182.329783310397, 47),
                    new Tree(545.1659531359188, -185.00404543395828, 38),
                    new Tree(270.0589647267667, -187.09329733344478, 35),
                    new Tree(512.0558041671904, -38.010038416522775, 43),
                    new Tree(859.419588514434, -163.92877523124602, 45),
                    new Tree(1110.0502418657888, 200.49218006815127, 49),
                    new Tree(1150.873005951125, -192.5470429146406, 49),
                    new Tree(648.0224566573916, 130.5246330515591, 43),
                    new Goal(1150, 0, 50),
                ]
                break;
            case 6:
                this.bgcolor = color(0, 150, 0)
                GameScreen.scaleFactor = 1.5
                this.bounds = {
                    x: { min: -200, max: 1200 },
                    y: { min: -600, max: 600 }
                }

                this.player.backwardsRotation = true
                this.enemies = [
                    new Artillery(0, 9, 4, 175, 1, 0),
                    new Goal(1100, 450, 50),
                    new Tree(-77, -295, 49.050119095607876),
                    new Tree(-122, -76, 48.61206553919236),
                    new Tree(-95, 81, 35.428636985436654),
                    new Tree(-69, 328, 44.24592076692028),
                    new Tree(-113, 524, 37.04260221873511),
                    new EnemySniper(134, -486, 1.5557052263943771),
                    new Tree(97, -307, 41.23322370015704),
                    new Tree(104, -128, 37.707750051672406),
                    new EnemySniper(137, 62, 2.227569142191752),
                    new Tree(63, 276, 40.09723192728348),
                    new Tree(73, 480, 42.806334399183086),
                    new Tree(306, -484, 47.73552118385909),
                    new Tree(332, -303, 38.360732170850554),
                    new Tree(273, -93, 36.12241625691574),
                    new Tree(311, 67, 37.224783724826956),
                    new Tree(283, 291, 48.74595451786214),
                    new Tree(260, 460, 39.53902667917458),
                    new Tree(499, -487, 46.06408366758535),
                    new Tree(477, -293, 43.70387141996657),
                    new Tree(512, -82, 37.84315243282931),
                    new Tree(510, 134, 46.6593811557867),
                    new Tree(504, 335, 39.00463128180059),
                    new Tree(528, 518, 39.32370223079728),
                    new EnemySniper(735, -526, 2.145624194263992),
                    new Tree(664, -335, 46.365065474745585),
                    new Tree(677, -130, 41.20137049593399),
                    new EnemySniper(729, 68, 2.4649978604352674),
                    new Tree(739, 260, 39.92569576306444),
                    new Tree(675, 488, 35.92336629781643),
                    new Tree(877, -469, 46.4388314461531),
                    new Tree(919, -337, 37.58934937207756),
                    new Tree(886, -88, 44.343827942130986),
                    new Tree(931, 108, 38.98699179025588),
                    new Tree(890, 261, 43.369035781308455),
                    new Tree(864, 490, 35.75554166675154),
                    new Tree(1060, -526, 43.6850582604847),
                    new Tree(1072, -324, 42.000689753543526),
                    new Tree(1089, -63, 35.794152907943534),
                    new Tree(1090, 123, 45.30603076234662),
                    new Tree(1128, 319, 36.812202819134725),
                    new Tree(1082, 516, 38.686470651759606),
                ]
                break;
            case 7:
                this.bgcolor = color(95, 65, 35)
                GameScreen.scaleFactor = 1.5
                this.bounds = {
                    x: { min: -200, max: 1200 },
                    y: { min: -300, max: 300 }
                }
                this.player.backwardsRotation = true
                this.player.fireFailChance = 0.50

                this.enemies = [
                    new Goal(1100, 0, 50), new Tree(245, -240, 49),
                    new Tree(-61, -346, 47), new Tree(453, -58, 40), new Tree(177, -110, 44), new Tree(-123, -191, 35), new Tree(-71, -49, 45),
                    new Tree(-128, 90, 45), new Tree(-99, 254, 39), new Tree(65, -351, 47), new Tree(87, -244, 46), new Tree(106, -37, 48),
                    new Tree(91, 133, 41), new Tree(63, 260, 41), new Tree(220, -338, 35), new Tree(236, 35, 46), new Tree(256, 137, 41),
                    new Tree(265, 311, 46), new Tree(455, -383, 35), new Tree(247, -173, 36), new Tree(473, -152, 39), new Tree(428, 40, 41),
                    new Tree(455, 130, 45), new Tree(406, 302, 41), new Tree(641, -330, 47), new Tree(628, -185, 42), new Tree(614, 72, 36),
                    new Tree(629, 191, 37), new Tree(586, 324, 42), new Tree(822, -377, 40), new Tree(801, -143, 42), new Tree(785, 40, 38),
                    new Tree(809, 138, 41), new Tree(805, 242, 40), new Tree(969, -389, 49), new Tree(967, -117, 40), new Tree(946, 26, 45),
                    new Tree(947, 144, 42), new Tree(949, 348, 39), new Tree(1122, -332, 40), new Tree(1184, -152, 39), new Tree(1167, 181, 42),
                    new Tree(1166, 285, 42), new Tree(96, -120, 35),
                    new EnemySniper(165, 223), new EnemySniper(184, -33), new EnemySniper(325, -193), new EnemySniper(495, 43),
                    new EnemySniper(636, 254), new EnemySniper(844, 42), new EnemySniper(1001, 197),
                ]
                break;
            case 8:
                this.bgcolor = color(0, 150, 0)
                GameScreen.scaleFactor = 1.25
                this.bounds = {
                    x: { min: -200, max: 2400 },
                    y: { min: -250, max: 250 }
                }
                this.player.moveReshuffle = {
                    keys: [{ keyCode: 65, symbol: "A" }, { keyCode: 87, symbol: "W" }, { keyCode: 68, symbol: "D" }, { keyCode: 83, symbol: "S" }, { keyCode: 81, symbol: "Q" }, { keyCode: 69, symbol: "E" }],
                    shuffleTime: 5,
                    time: 0
                }
                this.player.backwardsRotation = true
                this.player.fireFailChance = 0.3
                this.enemies = [
                    //12 second cycle each direction
                    new Artillery(0, 9, 3, 175, 1, 0),
                    new Artillery(3, 9, 3, 175, -1, 0),
                    new Artillery(6, 9, 3, 175, 0, 1),
                    new Artillery(9, 9, 3, 175, 0, -1),
                    //8 second cycle
                    new Artillery(0, 6, 2, 125, 1, 0),
                    new Artillery(2, 6, 2, 125, 0, 0),
                    new Artillery(4, 6, 2, 125, 1, 0),
                    new Artillery(6, 6, 2, 125, 0, 0),
                    new Tree(100, 116, 44),
                    new Tree(200, 119, 49),
                    new Tree(300, -111, 43),
                    new Tree(400, 66, 52),
                    new Tree(500, -104, 42),
                    new Tree(600, -147, 44),
                    new Tree(700, -198, 45),
                    new Tree(800, -141, 52),
                    new Tree(900, -4, 45),
                    new Tree(1000, 194, 50),
                    new Tree(1100, -47, 43),
                    new Tree(1200, 95, 42),
                    new Tree(1300, 138, 50),
                    new Tree(1400, 6, 43),
                    new Tree(1500, -71, 37),
                    new Tree(1600, 24, 50),
                    new Tree(1700, 227, 42),
                    new Tree(1800, -11, 45),
                    new Tree(1900, -44, 45),
                    new Tree(2000, -116, 46),
                    new Tree(2100, 110, 46),
                    new Tree(2200, -18, 43),
                    new Tree(2300, -94, 41),
                    new Tree(2400, 224, 48),
                    new Goal(2300, 0, 50),
                ]
                break;
            case 9:
                this.bgcolor = color(0, 150, 0)
                GameScreen.scaleFactor = 1.25
                this.bounds = {
                    x: { min: -200, max: 1500 },
                    y: { min: -250, max: 250 }
                }
                this.player.moveReshuffle = {
                    keys: [{ keyCode: 65, symbol: "A" }, { keyCode: 87, symbol: "W" }, { keyCode: 68, symbol: "D" }, { keyCode: 83, symbol: "S" }, { keyCode: 81, symbol: "Q" }, { keyCode: 69, symbol: "E" }],
                    shuffleTime: 12,
                    time: 0
                }
                this.enemies = [
                    new Goal(1400, 0, 50),
                    new Tree(60, -33, 41),
                    new Tree(45, 54, 41),
                    new Tree(324, 10, 41),
                    new Tree(900, -10, 41),
                    new Tree(875, 70, 35),
                    new Tree(955, -120, 35),
                    new Tree(920, 120, 35)
                ]
                for (let i = 0; i < 3; i++) {
                    this.enemies.push(new Barricade(i * 200 + 200, -200, 0, 2 * PI))
                    this.enemies.push(new Barricade(i * 200 + 200, 200, 0, 2 * PI))
                    this.enemies.push(new EnemySniper(i * 200 + 200, -200, 5.5, 1, 1200, 1000))
                    this.enemies.push(new EnemySniper(i * 200 + 200, 200, 5.5, 1, 1200, 1000))
                }
                for (let i = 0; i < 4; i++) {
                    this.enemies.push(new Barricade(1100, i * 400 / 3 - 200, PI / 2, (3 / 2) * PI))
                    this.enemies.push(new EnemySniper(1100, i * 400 / 3 - 200, 7, 1, 2000, 700))
                }
                break;
            case 10:
                this.bgcolor = color(0, 150, 0)
                GameScreen.scaleFactor = 1.25
                this.bounds = {
                    x: { min: -200, max: 1200 },
                    y: { min: -250, max: 250 }
                }
                this.player.moveReshuffle = {
                    keys: [{ keyCode: 65, symbol: "A" }, { keyCode: 87, symbol: "W" }, { keyCode: 68, symbol: "D" }, { keyCode: 83, symbol: "S" }, { keyCode: 81, symbol: "Q" }, { keyCode: 69, symbol: "E" }],
                    shuffleTime: 1.5,
                    time: 0
                }
                this.player.isSurrendering = true
                this.player.speed = 60
                this.enemies = [
                    new Goal(1000, 0, 50),
                    new Tree(100, 200, 35),
                    new Tree(24, -100, 35),
                    new Tree(900, -80, 35),
                    new Tree(100, 50, 35),
                    new Landmine(0, 150, 35),
                    new Landmine(350, -40, 35),
                    new Landmine(170, -150, 35),
                    new Landmine(523, -30, 35),
                    new Landmine(262, -200, 35),
                    new Landmine(190, 6, 35),
                    new Landmine(208, -50, 35),
                    new Landmine(237, 25, 35),
                    new Landmine(350, -120, 35),
                    new Landmine(412, 102, 35),
                    new Landmine(502, 183, 35),
                    new Landmine(402, 183, 35),
                    new Landmine(451, 25, 35),
                ]
                for (let i = 0; i < 3; i++) {
                    this.enemies.push(new Barricade(800, i * 400 / 2 - 200, PI / 2, (3 / 2) * PI))
                    this.enemies.push(new EnemySniper(800, i * 400 / 2 - 200, 7, 1, 300, 200, 4, false))
                }
                break;
        }

        this.camera = {
            x: this.player.x,
            y: this.player.y
        }
        if (!backgroundOverridden) {
            this.background = new Background(this.bounds);
        }
    }

    ReloadLevel() {
        this.Load(this.level);
    }
}