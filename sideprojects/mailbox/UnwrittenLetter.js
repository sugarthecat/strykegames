const poem = [
    "Adrienne,",
    "Lately I've struggled to write down",
    "Of everything I wish to say to you.",
    "Vernacular slips past my mind,",
    "Entranced, only thinking of yours.",
    "Lightly, my pen grazes the page,",
    "Entering an impossible fight.",
    "The words written about you will fail,",
    "To be as beautiful as you are.",
    "Every night is better than the last,",
    "Remembering your words."
]
class UnwrittenLetter extends GUI {
    constructor() {
        super();
        this.time = 0;
        this.elements = []
    }
    reset() {
        this.time = 0;
        this.elements = [];
    }
    Draw(x, y) {
        this.time += deltaTime / 1000;
        push()
        noStroke();
        textFont("Courier New")
        fill(255)
        rect(0, 0, 600, 400)
        textAlign(LEFT)
        textSize(25)
        fill(0)
        let typed = 0
        let totalLetters = this.time * 15;
        let cursor = this.time % 2 < 1.5 ? "" : "_"
        let done = false;
        for (let i = 0; i < poem.length; i++) {
            if (typed + poem[i].length > totalLetters) {
                text(poem[i].substring(0, totalLetters - typed) + cursor, 10, 70 + i * 30)
                done = true;
                break;
            }

            typed += poem[i].length + 20;

            if (typed + poem[i].length > totalLetters) {
                text(poem[i].substring(0, poem[i].length - totalLetters + typed) + cursor, 10, 70 + i * 30)
                done = true;
                break;
            }
            //text(poem[i],10,50+i*30)
            typed += poem[i].length + 3;
        }
        //text("But if there was one thing I could write, I would send you a", )
        if (typed < totalLetters && !done) {
            textAlign(RIGHT)
            let outMsg = "But what I really wish to send is"
            text(outMsg.substring(0, min(outMsg.length, max(0, totalLetters - typed - 180))), 550, 50)
            textAlign(LEFT)
            //retype all lines at the same
            if (typed + 250 > totalLetters) {
                for (let i = 0; i < poem.length; i++) {
                    text(poem[i].substring(0, min(poem[i].length, totalLetters - typed)) + cursor, 10, 70 + i * 30)
                }
                done = true
            }
            typed += 250;
        }
        if (typed < totalLetters && typed + 50 > totalLetters && !done) {
            for (let i = 0; i < poem.length; i++) {
                text(poem[i].substring(0, max(1, poem[i].length - totalLetters + typed)) + cursor, 10, 70 + i * 30)
            }
        }
        typed += 50

        if (typed < totalLetters && !done) {
            let yPos = 100;
            let xPos = 30;
            let interpProgress = min(1, (totalLetters - typed) / 60)
            for (let i = 0; i < poem.length; i++) {
                text(poem[i].charAt(0), lerp(10, xPos, interpProgress), lerp(70 + i * 30, yPos, interpProgress))
                xPos += textWidth(poem[i].charAt(0))
                if (i == 0 || i == 4) {
                    xPos += textWidth(" ")
                }
            }
        }
        typed += 120

        const n_petals = 5;
        //flower
        if (typed < totalLetters && !done) {
            push()
            fill(255, 0, 0)
            strokeWeight(min(20, (totalLetters - typed) / 2))
            stroke(50, 200, 50)
            line(400, 200, 400, 350)
            strokeWeight(min(6, (totalLetters - typed) / 6))
            for (let i = 1; i < 40; i++) {
                let xPos = i * 5 + 300
                let flowerBottom = 175 + 5 * sqrt(20 ** 2 - abs(i - 20) ** 2)
                //
                let darkFlowerTop = 125 + 20 * sin((totalLetters - typed) * 0.05 + i * PI / 40 * n_petals)
                let lightFlowerTop = 125 + 20 * sin((totalLetters - typed) * 0.05 - i * PI / 40 * n_petals)

                darkFlowerTop = max(darkFlowerTop, 225 - (totalLetters - typed))
                lightFlowerTop = max(lightFlowerTop, 225 - (totalLetters - typed))
                flowerBottom = min(flowerBottom, 225 + (totalLetters - typed))
                if (flowerBottom < lightFlowerTop) {
                    continue
                }
                stroke(150, 0, 0)
                line(xPos, darkFlowerTop, xPos, flowerBottom)

                stroke(255, 50, 50)
                line(xPos, lightFlowerTop, xPos, flowerBottom)
            }

            pop()
        }

        typed += 100

        if (typed < totalLetters && !done) {
            let finalMsg = [
                "I may struggle to type", "how I feel about you.",
                "But you know every word", "before it exits my fingertips.",
                "- T.J."]
            textSize(18)
            for (let i = 0; i < finalMsg.length; i++) {

                if (typed < totalLetters) {
                    text(finalMsg[i].substring(0, min(finalMsg[i].length, totalLetters - typed))
                        + ((typed + finalMsg[i].length > totalLetters || i + 1 == finalMsg.length) ? cursor : ""), 5, 200 + i * 20)
                }
                typed += finalMsg[i].length;
            }
        }
        typed += 30
        if (typed < totalLetters && !done && this.elements.length == 0) {
            this.elements.push(
                new Button(40, 340, 200, 40, "Return To Mailbox", function () { screenOn = "title" }))
        }

        pop()
        super.Draw(x, y)
    }
}