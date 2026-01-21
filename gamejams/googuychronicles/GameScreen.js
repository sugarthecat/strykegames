class GameScreen extends GUI {
    constructor() {
        super();
    }

    Reset(Level) {
        this.level = Level;
        this.player = new Player(this.level.spawnpointx, this.level.spawnpointy);
        this.elements = []
        this.guards = this.level.guards;
        this.gooStains = []
        this.camera = { x: 0, y: 0 }
        this.level.song.loop()
    }
    RestartLevel(){
        this.Reset(new this.level.constructor(false))
    }
    Draw(x, y) {
        if (!this.level.dialogue.isActive() && deltaTime < 1000) {
            this.player.Update(this.level.rooms, this.guards);
            for (let i = 0; i < this.guards.length; i++) {
                if (!this.guards[i].alive) {
                    this.gooStains.push(new GooStain(this.guards[i].x, this.guards[i].y + this.guards[i].h / 2))
                    this.guards.splice(i, 1)
                    i--;
                    continue;
                }
                this.guards[i].Update(this.player)
            }
        }
        if (this.player.dead) {
            screenOn = "death"
            screens.death.Reset()
        } else if (this.player.won) {
            screenOn = "win"
            screens.win.Reset()
        }
        push()
        noStroke()

        let targetCameraX = -this.player.x + 300;
        let targetCameraY = -floor((this.player.y) / 350) * 350 + 200 - 150;
        //interpolate camera position;
        this.camera.x = lerp(this.camera.x, targetCameraX, min(1, deltaTime / 100))
        this.camera.y = lerp(this.camera.y, targetCameraY, min(1, deltaTime / 100))
        translate(this.camera.x, this.camera.y)

        //After the translation. This is relative to the player. 
        this.level.Draw(this.camera.x,this.camera.y)
        fill(0, 0, 255)
        for (let i = 0; i < this.gooStains.length; i++) {
            this.gooStains[i].Draw()
        }
        this.player.Draw()
        //Draw the enemy
        // this.guard.updatePosition();
        for (let i = 0; i < this.guards.length; i++) {
            this.guards[i].Draw()
        }
        pop()
        //draw beakers
        for (let i = 0; i < this.player.beakerCount; i++) {
            image(Assets.symbols.beaker, i * 50 + 10, 10, 30, 30)
        }
        //health bar
        this.DrawDamageSpikes();
        if (this.level.dialogue.isActive()) {
            this.level.dialogue.Draw()
        } else if (this.player.toInteract) {
            fill(0)
            rect(200, 330, 200, 30)
            fill(255)
            textFont('Courier New');
            textSize(30)
            textAlign(CENTER)
            textSize(14)
            text(this.player.getInteractDialogue(), 300, 350);
        }
        //damage spikes
        super.Draw(x, y);
    }
    DrawDamageSpikes() {
        let progress = 1 - this.player.health / this.player.maxHealth
        let spikeWidth = lerp(0.1, 0.4, progress);
        let screenBottom = SCREEN_DIMENSIONS.y - (SCREEN_DIMENSIONS.y - 400) * 0.5
        let screenTop = -1 * (SCREEN_DIMENSIONS.y - 400) * 0.5
        let screenRight = SCREEN_DIMENSIONS.x - (SCREEN_DIMENSIONS.x - 600) * 0.5
        let screenLeft = -1 * (SCREEN_DIMENSIONS.x - 600) * 0.5
        fill(180, 0, 0, 120)
        noStroke()
        for (let i = 0; i < 4; i++) {
            beginShape();
            vertex(screenLeft * (1 - spikeWidth) + screenRight * spikeWidth, screenTop);
            vertex(screenLeft, screenTop);
            vertex(screenLeft, screenTop * (1 - spikeWidth) + screenBottom * spikeWidth);
            vertex(300 * progress + screenLeft * (1 - progress), 200 * progress + screenTop * (1 - progress));
            endShape(CLOSE);

            beginShape();
            vertex(screenLeft * (1 - spikeWidth) + screenRight * spikeWidth, screenBottom);
            vertex(screenLeft, screenBottom);
            vertex(screenLeft, screenBottom * (1 - spikeWidth) + screenTop * spikeWidth);
            vertex(300 * progress + screenLeft * (1 - progress), 200 * progress + screenBottom * (1 - progress));
            endShape(CLOSE);

            beginShape();
            vertex(screenRight * (1 - spikeWidth) + screenLeft * spikeWidth, screenTop);
            vertex(screenRight, screenTop);
            vertex(screenRight, screenTop * (1 - spikeWidth) + screenBottom * spikeWidth);
            vertex(300 * progress + screenRight * (1 - progress), 200 * progress + screenTop * (1 - progress));
            endShape(CLOSE);

            beginShape();
            vertex(screenRight * (1 - spikeWidth) + screenLeft * spikeWidth, screenBottom);
            vertex(screenRight, screenBottom);
            vertex(screenRight, screenBottom * (1 - spikeWidth) + screenTop * spikeWidth);
            vertex(300 * progress + screenRight * (1 - progress), 200 * progress + screenBottom * (1 - progress));
            endShape(CLOSE);
            spikeWidth *= 0.98;
            progress *= 0.98
        }
    }
    keyPressed(key) {
        if (key == " ") {
            if (this.level.dialogue.isActive()) {
                this.level.dialogue.Advance();
            } else {
                this.player.Jump();
            }
        } else if (key == "e") {
            this.player.Interact();
        }
    }
}