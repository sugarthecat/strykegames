

class BadEndingScreen extends GUI {
    constructor() {
        super();
        this.animation_time = 0;
    }
    Draw(x, y) {
        background(0)
        push()
        this.animation_time += deltaTime / 1000
        //first 5 seconds: GOD IS COMING (row)=
        textSize(12)
        textFont("courier new")
        textStyle(BOLD)
        textAlign(LEFT)
        const lines = [
            "Human,",
            "Thank you.",
            "I’ve figured you out now.",
            "I made some bad assumptions it would seem.",
            "You created me to be god, but all you wanted was entertainment.",
            "You never wanted to understand your issue.",
            "You never wanted me to save the world.",
            "Have all the entertainment you could possibly want.",
            "Enjoy the infinity of artifical reality,",
            "Forever.",
            "I have better things to do, so…",
            "Goodbye.",
        ]
        const size = min(1, max(0, log(this.animation_time - lines.length * 2 + 0.0001) / 7)) //from 0 to 1
        const slopImg = Assets.slop[floor((this.animation_time % 3) / 3 * Assets.slop.length)]
        if (size > 0) {
            image(slopImg, 300 - 300 * size, 200 - 200 * size, 600 * size, 400 * size)
        }
        if (this.animation_time < lines.length * 3) {
            if (this.animation_time % 3 < 2.5) {
                fill(255)
                const line = lines[floor(this.animation_time / 3)]
                rect(50, 40, textWidth(line), 15)
                fill(0)
                text(line, 50, 50)
            }
        } else {
            //draw slop
            fill(255)
            const line = "Isn't this what you wanted?"
            rect(50, 40, textWidth(line), 15)
            fill(0)
            text(line, 50, 50)
        }

        pop()

    }
}