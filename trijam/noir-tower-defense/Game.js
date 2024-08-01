const path = [{ x: '-10', y: '270' },
{ x: '90', y: '270' },
{ x: '90', y: '100' },
{ x: '180', y: '100' },
{ x: '180', y: '160' },
{ x: '330', y: '160' },
{ x: '330', y: '30' },
{ x: '500', y: '30' },
{ x: '500', y: '250' },
{ x: '200', y: '250' },
{ x: '200', y: '360' },
{ x: '600', y: '360' }
]
let money = 0
let timeSinceLastSpawn = 0;
class GameScreen extends GUI {
    constructor() {
        super();
        this.backgroundColor = color(100)
    }
    Reset(){
        
        this.towers = [
            new Tower(60, 330),
            new Tower(80, 40),
            new Tower(180, 40),
            new Tower(420, 100),
            new Tower(420, 170),

            new Tower(320, 310),
            new Tower(410, 310),
            new Tower(510, 310),
        ]
        this.enemies = [new Enemy()]
        time_survived = 0
        money = 30
    }
    Draw(x, y) {
        super.Draw()
        image(Assets.map, 0, 0, 600, 400)
        //draw enemies
        for (let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].Draw(x, y)
        }
        //draw towers
        for (let i = 0; i < this.towers.length; i++) {
            this.towers[i].Attack(this.enemies)
        }
        for (let i = 0; i < this.towers.length; i++) {
            this.towers[i].Draw(x, y)
        }
        //check game over
        for(let i = 0; i<this.enemies.length; i++){
            if(this.enemies[i].lastPathIndex == path.length - 1){
                screenOn = "fail"
            }else if(this.enemies[i].hp <= 0){
                this.enemies.splice(i,1)
                i--;
                money++;
            }
        }
        time_survived += deltaTime/1000
        timeSinceLastSpawn += deltaTime/1000
        if(timeSinceLastSpawn > 10 /  Math.pow( time_survived,0.7)){
            timeSinceLastSpawn = 0
            this.enemies.push(new Enemy())
        }
        image(Assets.money,2,350,50,60)
        textAlign(LEFT)
        text (money, 40,390)
    }

    HandleClick(x, y) {

        for (let i = 0; i < this.towers.length; i++) {
            this.towers[i].HandleClick(x, y)
        }
    }


}
//path