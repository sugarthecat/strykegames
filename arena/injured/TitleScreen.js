class TitleScreen extends GUI {
    static nExplostions = 5;
    constructor() {
        super();
        this.elements = [new Button(200, 300, 200, 50, "Play", function () {
            screenOn = "dialogue"
            screens.dialogue.Load(5)
        })]
        this.explosions = []

        for (let i = 0; i < TitleScreen.nExplostions; i++) {
            this.explosions.push({
                x: random(0, 600),
                time: random(0, 20)
            })
        }
    }
    Draw(x, y) {
        background(20, 60, 200)

        fill(95, 65, 35)
        rect(0, 250, 600, 200)
        for (let i = 0; i < 10; i++) {
            for (const explosion of this.explosions) {
                const c = color(
                    constrain(255 + i * 5 - explosion.time * 5, 0, 255),
                    constrain(i * 70 - explosion.time * 40, 0, 255),
                    constrain(25 + i * 5 - explosion.time * 5, 0, 255),
                )
                c.setAlpha(i * 50 - explosion.time * 20)
                fill(c)
                const bottomWidth = explosion.time * 20 / (i + 1)
                const topWidth = explosion.time * 30 / (i + 1)
                const explosionHeight = explosion.time * 50 / (i + 1)
                beginShape()
                vertex(explosion.x - bottomWidth, 250)
                vertex(explosion.x + bottomWidth, 250)
                vertex(explosion.x + topWidth, 250 - explosionHeight)
                vertex(explosion.x, 250 - explosionHeight * 1.4)
                vertex(explosion.x - topWidth, 250 - explosionHeight)
                endShape(CLOSE)
            }
        }
        for (let i = 0; i < this.explosions.length; i++) {
            this.explosions[i].time += deltaTime / 1000
            if (this.explosions[i].time > 23) {
                this.explosions[i].time -= 23;
                this.explosions[i].x = random(0,600)
            }
        }
        image(Assets.titleCard, 0, 0, 600, 400)
        super.Draw(x, y)
    }
}