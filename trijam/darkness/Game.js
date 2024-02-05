let player;
let camera = { x: 0, y: 0 }
class Game extends GUI {
    constructor() {
        super();
        this.obstacles = []
        this.temptations = []
        this.elements = [new Button(20, 320, 200, 50, "Redeem.", function () {
            game.introScreen = false;
            game.NewLevel();
        })]
    }
    Draw(x, y) {

        fill(255)
        rect(0, 0, 600, 400)
        if (this.introScreen) {
            textFont(Assets.font)
            let messages = ["Heaven is a nice place.", "I'm a good person.", "I just...", "I let loose sometimes.", "I need to control the darkness inside."]
            let msgProgress = [max(0, this.introProgress), max(0, this.introProgress - 5), max(this.introProgress - 10), max(this.introProgress - 15), max(this.introProgress - 20)]
            textAlign(LEFT)
            textSize(30)
            let clr = color(0);
            for (let i = 0; i < messages.length; i++) {
                clr.setAlpha(msgProgress[i]*100)
                fill(clr)
                text(messages[i], 50, i * 50 + 50)
            }
            if (this.introProgress > 0) {
                super.Draw(x, y);
            }
            this.introProgress += deltaTime/1000;
        } else {
            if(this.levelOn == 1){
                fill(255)
                rect(0,350,100,50)
                fill(0)
                text("Shift to regain control.", 0,350,100,50)
            }
            push()
            translate(300 - camera.x, 200 - camera.y);
            fill(0)
            for (let i = floor(camera.x / 100) - 8; i < floor(camera.x / 100) + 8; i++) {
                for (let j = floor(camera.y / 100) - 400; j < floor(camera.y / 100) + 4; j++) {
                    image(Assets.cloudtile, i * 100, j * 100, 101, 101)
                }
            }
            for (let i = 0; i < this.obstacles.length; i++) {
                this.obstacles[i].Draw();
            }
            for (let i = 0; i < this.temptations.length; i++) {
                this.temptations[i].Draw();
                this.temptations[i].Collide(player);
            }
            this.goal.Draw()
            this.goal.Collide(player)
            player.Draw();
            pop()
            fill(255, 0, 0)
            noStroke()
            rect(0, 0, 200 * player.supressionLeft, 20)

            camera.x = camera.x * (1 - deltaTime / 1000) + player.x * (deltaTime / 1000)
            camera.y = camera.y * (1 - deltaTime / 1000) + player.y * (deltaTime / 1000)
        }
    }
    Collides(entity) {
        for (let i = 0; i < this.obstacles.length; i++) {
            if (this.obstacles[i].Collides(entity)) {
                //console.log(this.obstacles[i],i)
                return true;
            }
        }
        return false;
    }
    NewGame() {

        this.levelOn = 0;
        player = new Player();
        this.introProgress = 0;
        this.introScreen = true;
    }
    NewLevel() {
        this.levelOn++;
        camera = { x: 0, y: 0 }
        player.supressionLeft = 3;
        player.x = 0;
        player.y = 0;
        this.obstacles = []
        this.temptations = []
        if (this.levelOn == 1) {
            for (let i = -2; i < 3; i++) {
                this.obstacles.push(new Fence(-2, i))
                this.obstacles.push(new Fence(11, i))
            }
            for (let i = -1; i < 11; i++) {
                this.obstacles.push(new Fence(i, -2))
                this.obstacles.push(new Fence(i, 2))
            }
            this.goal = new Goal(10, 0)
        }
        if (this.levelOn == 2) {
            for (let i = -2; i < 3; i++) {
                this.obstacles.push(new Fence(-2, i))
                this.obstacles.push(new Fence(11, i))
            }
            for (let i = -1; i < 11; i++) {
                this.obstacles.push(new Fence(i, -2))
                this.obstacles.push(new Fence(i, 2))
            }
            this.temptations.push(new Sin(5, 0))
            this.goal = new Goal(10, 0)
        }
        if (this.levelOn == 3) {
            for (let i = -2; i < 3; i++) {
                this.obstacles.push(new Fence(-2, i))
                this.obstacles.push(new Fence(11, i))
            }
            for (let i = -1; i < 11; i++) {
                this.obstacles.push(new Fence(i, -2))
                this.obstacles.push(new Fence(i, 2))
            }
            this.temptations.push(new Sin(5, 0))
            this.temptations.push(new Sin(7, -1))
            this.temptations.push(new Sin(7, 1))
            this.goal = new Goal(10, 0)
        }
        if (this.levelOn == 4) {
            for (let i = -3; i < 4; i++) {
                this.obstacles.push(new Fence(-4, i))
                this.obstacles.push(new Fence(16, i))
            }
            for (let i = -3; i < 16; i++) {
                this.obstacles.push(new Fence(i, -3))
                this.obstacles.push(new Fence(i, 3))
            }
            for (let i = 2; i < 14; i += 2) {
                this.temptations.push(new Sin(i, -2))
                this.temptations.push(new Sin(i, 0))
                this.temptations.push(new Sin(i, 2))
            }
            this.goal = new Goal(15, 0)
        }
        if (this.levelOn == 5) {
            for (let i = -2; i <= 2; i++) {
                this.obstacles.push(new Fence(-4, i))
                this.obstacles.push(new Fence(21, i))
            }
            for (let i = -3; i <= 20; i++) {
                this.obstacles.push(new Fence(i, -2))
                this.obstacles.push(new Fence(i, 2))
            }
            for (let i = 2; i < 18; i += 1) {
                this.temptations.push(new Sin(i, -1.2))
                this.temptations.push(new Sin(i, 1.2))
            }
            this.goal = new Goal(20, 0)
        }
        if (this.levelOn == 6) {
            for (let i = -4; i <= 4; i++) {
                this.obstacles.push(new Fence(-4, i))
                this.obstacles.push(new Fence(11, i))
            }
            for (let i = -3; i <= 10; i++) {
                this.obstacles.push(new Fence(i, -4))
                this.obstacles.push(new Fence(i, 4))
            }
            for (let i = -2; i < 4; i += 1) {
                this.temptations.push(new Sin(2, i))
                this.temptations.push(new Sin(5, -i))
                this.temptations.push(new Sin(8, i))
            }
            this.goal = new Goal(9.5, 3)
        }
    }
}
