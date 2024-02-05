let player;
let camera = { x: 0, y: 0 }
class Game extends GUI {
    constructor() {
        super();
        this.obstacles = []
        this.temptations = []
    }
    Draw(x, y) {

        super.Draw(x, y);
        fill(255)
        rect(0, 0, 600, 400)
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
        this.NewLevel();
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
            this.temptations.push(new Sin(5,0))
            this.goal = new Goal(10,0)
        }
    }
}
