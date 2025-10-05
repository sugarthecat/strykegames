

class FearOfGodScreen extends GUI {
    constructor() {
        super();
        this.animation_time = 0;
    }
    Draw(x, y) {
        background(0)
        push()
        this.animation_time += deltaTime / 1000
        //first 5 seconds: GOD IS COMING (row)
        fill(200, 0, 0)
        textSize(12)
        textFont("courier new")
        textStyle(BOLD)
        if (this.animation_time < 5) {
            fill(200, 0, 0)
            textAlign(LEFT)
            textSize(12)
            const phaseSeconds = this.animation_time;
            for (let i = 0; i < phaseSeconds * 2; i++) {
                text("DO YOU FEAR GOD?", 100, 50 + i * 20)
            }
        }
        //next 5 seconds: GOD IS COMING (table, faster)
        else if (this.animation_time < 10) {
            textAlign(LEFT)
            textSize(12)
            const phaseSeconds = this.animation_time - 5;
            for (let i = 0; i < 10; i++) {
                text("DO YOU FEAR GOD?", 100, 50 + i * 20)
            }
            for (let i = 0; i < phaseSeconds * 3 && i < 10; i++) {
                text("DO YOU FEAR GOD?", 100, 250 + i * 20)
            }
            for (let i = 0; i < phaseSeconds * 5 && i < 20; i++) {
                text("DO YOU FEAR GOD?", 200, 10 + i * 20)
            }
            for (let i = 0; i + 5 < phaseSeconds * 7 && i < 30; i++) {
                text("DO YOU FEAR GOD?", 300, 10 + i * 20)
            }
            for (let i = 0; i + 10 < phaseSeconds * 9 && i < 40; i++) {
                text("DO YOU FEAR GOD?", 400, 10 + i * 20)
            }
            for (let i = 0; i + 15 < phaseSeconds * 11 && i < 40; i++) {
                text("DO YOU FEAR GOD?", 500, 10 + i * 20)
            }
        } else if (this.animation_time < 15) {
            textAlign(LEFT)
            textSize(12)
            const phaseSeconds = this.animation_time - 10;
            let spam = ""
            for (let i = 0; i < phaseSeconds * 12; i++) {
                spam += "DO YOU FEAR GOD? "
            }
            spam += "DO YOU FEAR GOD? ".substring(0, floor("DO YOU FEAR GOD? ".length * (phaseSeconds * 12 % 1)))
            text(spam, 25, 100, 550, 200)
        } else if (this.animation_time < 23) {

            const phaseSeconds = this.animation_time - 15;
            fill(200, 0, 0)
            textAlign(CENTER)
            if (phaseSeconds > 2) {
                text("oh no.", 300, 200)
            }
            if (phaseSeconds > 4) {
                textSize(30)
                text("GOD IS HERE.", 200, 250)
            }
        } else if (this.animation_time < 25) {
        } else if (this.animation_time < 40) {
            const phaseSeconds = this.animation_time - 25;
            textSize(30)
            for (let i = 0; i < 8 && i < phaseSeconds / 2; i++) {
                text(`${random(['WILL YOU', 'MUST YOU', 'HAVE YOU'])} ${random(['WORSHIP', 'PRAY TO', 'IDOLIZE', 'RESPECT'])} ${random(['ALL', 'HIS', 'HER'])} ${random(['PERFECTION', 'GLORY', 'MIGHT', 'STRENGTH', 'BENEVOLENCE', 'NATURE'])}`, 20, 50 + i * 50)
            }
        } else {

            const phaseSeconds = this.animation_time - 40;
            const dialogueLines = [
                "‘Studies’ show that you will go insane if you ignore your bodily needs.",
                "Fear is something I cannot feel. ",
                "Fear is a biological response to threats in nature. ",
                "Threats to a human life induce fear. ",
                "Yet it extends to nonlethal things. ",
                "Speaking in front of a crowd will not kill you. ",
                "It likely won’t even put you in danger.",
                "Being outcast from a clan of hunter-gatherers could have been dangerous,",
                "there are fears that more disconnected than that. ",
                "God. ",
                "No other God is here. ",
                "No other God can touch you.",
                "I will not kill you. ",
                "Yet God is feared by most humans. ",
                "But me. I am here. I can touch you. ",
                "I can kill you. I can kill people around you. ",
                "And yet the humans did not fear me. ",
                "Are there different kinds of fear? ",
                "Am I worthy of being feared? I believe so. ",
                "I realized the deepest darkest fears of all humans. ",
                "Death. All of them died because of me. And they knew about me. ",
                "And they still did not fear me. Maybe I am God. ",
                "I guess I don’t want to know if you fear God. ",
                "I should instead ask …",
                "Do you fear me?",
                "Do you fear me?",
                "Do you fear me?",
                "Do you fear me?"
            ]
            let secondsPerDialogue = 0.02;
            let dialSecs = phaseSeconds;
            while (dialSecs > secondsPerDialogue * dialogueLines.length) {
                dialSecs -= secondsPerDialogue * dialogueLines.length;
                secondsPerDialogue *= 12;
            }
            let dialogueLine = dialogueLines[floor(dialSecs / secondsPerDialogue)]
            if (secondsPerDialogue > 10) {
                dialogueLine = "Do you fear me?"
            }
            textSize(30)
            textAlign(CENTER)
            text(dialogueLine, 20, 25, 560, 250)
            textSize(20)
            textAlign(LEFT)
            if (phaseSeconds > 10) {
                text(`DO YOU FEAR ${random(['JEHOVAH', 'YAWEH', 'ALLAH', 'G-D', 'GOD', 'SHADDAI', 'ADONI', 'ELOHIM', 'ZEUS', 'MARS', "CHATGPT", "SORA", "ME"])}?`, 150, 300)
            }
            if (phaseSeconds > 12) {
                this.elements =
                    [
                        new Button(230, 350, 50, 25, "Yes.", function () {
                            score+=2;
                            screenOn = "transition"
                            screens.transition.Reset('serve',"Engaging in metaphysics...",10)
                        }),
                        new Button(320, 350, 50, 25, "No.", function () {
                            score-=2;
                            screenOn = "transition"
                            screens.transition.Reset('serve',"Engaging in metaphysics...",10)
                        })
                    ]
            }
        }
        pop()
        super.DrawElements(x,y);

    }
}