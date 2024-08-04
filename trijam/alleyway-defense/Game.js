let timeSinceLastSpawn = 0;
let player;
let cars = []
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
        cars = [new Car(175,100)]
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
                continue
            }else{

                playerBullets[i].Draw()
            }
            for(let j = 0; j<cars.length; j++){
                if(cars[j].Collides(playerBullets[i])){
                    playerBullets.splice(i,1)
                    i--;
                    break
                }
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
                continue;
            }
            for(let j = 0; j<cars.length; j++){
                if(cars[j].Collides(enemyBullets[i])){
                    enemyBullets.splice(i)
                    i--;
                    break;
                }
            }
        }
        for(let i = 0; i<enemies.length; i++){
            if(enemies[i].dead){
                enemies.splice(i,1)
                i--;
                continue
            }else{

                enemies[i].Draw()
            }
        }
        player.Draw()
        for(let i = 0; i<cars.length; i++){
            cars[i].Draw()
            if(cars[i].y > 800 || cars[i].y < -200){
                cars.splice(i,1)
                i--;
                continue;
            }
            if(cars[i].Collides(player)){
                screenOn = "fail"
            }
        }
        //spawning
        if(timeSinceLastSpawn > 0.8 + 10 / Math.pow(time_survived,0.7)){
            timeSinceLastSpawn = 0
            enemies.push(new Enemy(random(50,350),10 / time_survived + 1))
        }
        if(cars.length < 1){
            let xpos = 175
            let deltaY = random(80,140)
            if(random() > 0.5){
                xpos = 425
                deltaY *= -1
            }
            cars.push(new Car(xpos,deltaY))
        }
        
    }

    HandleClick(x, y) {
    }


}
//path