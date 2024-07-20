let player;
let enemies = []
class GameScreen extends GUI {
    constructor() {
        super();
        this.backgroundColor = color(255,255,0)
    }
    DrawBackground() {
        super.DrawBackground();
        for(let i = 0; i<15; i++){
            for(let j = 0; j<10; j++){
                image(Assets.floor,i*40,j*40,40,40)
            }
        }
        if(frameCount % 100 == 0){
            enemies.push(new Devil())
        }
        for(let i = 0; i<enemies.length; i++){
            enemies[i].draw()
            if(enemies[i].x < -320 || enemies[i].y < -220 || enemies[i].y > 220 || enemies[i].x > 320){
                enemies.splice(i,1)
                i--;
            }
        }
        gameTime = gameTime + deltaTime * 0.001
        player.draw()
        if(player.health <= 0){
            screenOn = "score"
        }
    }
}