let timeSinceLastSpawn = 0;
let player;
class GameScreen extends GUI {
    constructor() {
        super();
        this.backgroundColor = color(100)
    }
    Reset() {
        player = new Player()
        playerBullets = []
        enemies = [new Enemy(200,2)]
        enemyBullets = []
        time_survived = 0
    }
    Draw(x, y) {
        time_survived += deltaTime / 1000
        timeSinceLastSpawn += deltaTime / 1000
        super.Draw()
        image(Assets.map, 0, 0, 600, 400)
        for(let i = 0; i<playerBullets.length; i++){
            if(playerBullets[i].x < -600 || playerBullets[i].x > 600){
                playerBullets.splice(i,1)
                i--;
            }else{

                playerBullets[i].Draw()
            }
        }
        for(let i = 0; i<enemyBullets.length; i++){
            enemyBullets[i].Draw()
            let enemyBullet = enemyBullets[i]
            if(dist ( enemyBullet.x,enemyBullet.y,player.x,player.y) < 20){
                screenOn = "fail"
            }
            
            if(enemyBullet.x < -800 || enemyBullet.x > 800){
                enemyBullets.splice(i,1)
                i--;
            }
        }
        for(let i = 0; i<enemies.length; i++){
            if(enemies[i].dead){
                enemies.splice(i,1)
                i--;
            }else{

                enemies[i].Draw()
            }
        }
        player.Draw()
        if(timeSinceLastSpawn > 0.8 + 10 / Math.pow(time_survived,0.8)){
            timeSinceLastSpawn = 0
            enemies.push(new Enemy(random(50,350),10 / time_survived + 1))
        }
    }

    HandleClick(x, y) {
    }


}
//path