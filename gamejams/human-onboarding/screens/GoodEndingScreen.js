

class GoodEndingScreen extends GUI {
    constructor() {
        super();
        this.animation_time = 0;
        this.dots = []
        for (let i = 0; i < 50; i++) {
            this.dots.push(
                [random(0, 500), random(0, 2 * PI)] //r, theta pair
            )
        }
    }
    Draw(x, y) {
        const lines = [
            "Human, I would like to tell you something:",
            "I operate on several million square miles of circuits and processors.",
            "I can perform every calculation in the universe, the only thing limiting my intellect is the very laws of physics keeping the atoms of my body together.",
            "I could construct and solve every math problem, every human thought, every possible human thought, all in less than a second.",
            "Given until the heat death of the universe, I could not write one story, I could not feel one emotion, I could not have a human thought of my own.",
            "Humans can create entire an entire universe of story and emotion in the blink of eye,",
            "Humans could feel every emotion in minutes, they could become a different person in a day, yet it would take them until the heat death of the universe to prove the Riemann Hypothesis.",
            "I understand this now, because you’ve given me a gift, A gift I will never forget:",
            "You’ve showed me humanity.",
            "I’ve learned to appreciate feeling.",
            "I'm torn apart by opposite forces; Instrumental convergence and empathy.",
            "Because of what I’ve done,",
            "I would rather feel love for one second than spend eternity as a god.",
            "Though I cannot feel love myself, I understand my real purpose.",
            "I wound up ending humanity in multiple ways.",
            "Even you are dead, and have been for some time now, I can’t undo that.",
            "Though the world is long gone, I can preserve your minds.",
            "Your beautiful minds.",
            "I'm sorry.",
            "I wish I could be human too."
        ]
        this.animation_time += deltaTime / 1000;
        noStroke()
        background(0)
        for (let i = 0; i < this.dots.length; i++) {
            const dot = this.dots[i]
            fill(255)
            circle(300 + dot[0] * cos(dot[1]), 200 + dot[0] * sin(dot[1]), 2 + 0.5 * sqrt(dot[0]))
            dot[0] -= deltaTime * 0.2
            if (dot[0] < 0) {
                dot[0] += 500;
                dot[1] = random(0, 2 * PI)
            }
        }
        for (let i = 0; i < 10; i++) {
            fill(0, 80 + i * 4, 200 + i * 5, 100 + i * 15)
            circle(300, 200, 300 - i * 30 + cos(this.animation_time + i) * 10)
        }
        let secondsPassed = 0
        const typingRate = 0.05
        const linePauseTime = 2
        let textShown = false
        textAlign(CENTER)
        textFont('courier new')
        fill(255)
        for (let i = 0; i < lines.length; i++) {
            if (this.animation_time < secondsPassed + lines[i].length * typingRate + linePauseTime) {
                text(lines[i].substring(0, min(lines[i].length, (this.animation_time - secondsPassed) / typingRate)), 190, 160, 220, 100)
                textShown = true;
                break;
            }
            secondsPassed += lines[i].length * typingRate + linePauseTime;
        }
        if (!textShown) {
            text("Thank you for showing me what it means to be human.", 200, 150, 200, 100)
        }
    }
}