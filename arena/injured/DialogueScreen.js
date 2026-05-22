class DialogueScreen extends GUI {
    constructor() {
        super();
        this.idx = 0;
        this.phases = [];
        this.time = 0;
    }
    HandleClick(x, y) {
        if (this.idx >= this.phases.length) {
            return;
            //should not happen
        }
        const currPhase = this.phases[this.idx]
        if (this.time < currPhase.time) {
            this.time = currPhase.time;
            return;
        }
        this.time = 0;
        this.idx++;
    }
    Draw(x, y) {
        if (this.idx >= this.phases.length) {
            screens.game.Load(this.level);
            screenOn = "game"
            return;
        }
        push()
        this.time += deltaTime / 1000
        const currPhase = this.phases[this.idx]
        switch (currPhase.character) {
            case "radio":
                image(Assets.backgrounds.poland, 0, 0, 600, 400)
                break;
            case "officer":
            case "soldier":
            case "explosion":
                image(Assets.backgrounds.ussr, 0, 0, 600, 400)
                break;
        }
        textFont("trebuchet MT")
        switch (currPhase.character) {
            case "radio":
                image(Assets.characters.radio, 300, 100 + sin(this.time / 3) * 50, 300, 200)
                stroke(0)
                strokeWeight(5)
                fill(255)
                rect(25, 150 + cos(this.time / 3) * 25, 250, 100, 50, 50)
                noStroke()
                fill(0)
                textSize(12)
                textAlign(CENTER, CENTER)
                text(currPhase.message.substring(0, floor(this.time / currPhase.time * currPhase.message.length)),
                    150, 200 + cos(this.time / 3) * 25)
                break;
            case "explosion":
                stroke(0)
                strokeWeight(5)
                fill(255)
                rect(325, 150 + cos(this.time / 3) * 25, 250, 100, 50, 50)
                noStroke()
                fill(0)
                textSize(12)
                textAlign(CENTER, CENTER)
                text(currPhase.message.substring(0, floor(this.time / currPhase.time * currPhase.message.length)),
                    450, 200 + cos(this.time / 3) * 25)
                break;
            case "soldier":
            case "officer":
                if (currPhase.character == "soldier") {
                    image(Assets.characters.soldier, 0, -50 + sin(this.time / 3) * 50, 600, 400)
                }
                if (currPhase.character == "officer") {
                    image(Assets.characters.officer, 0, -50 + sin(this.time / 3) * 50, 600, 400)
                }
                stroke(0)
                strokeWeight(5)
                fill(255)
                rect(325, 150 + cos(this.time / 3) * 25, 250, 100, 50, 50)
                noStroke()
                fill(0)
                textSize(12)
                textAlign(CENTER, CENTER)
                text(currPhase.message.substring(0, floor(this.time / currPhase.time * currPhase.message.length)),
                    450, 175 + cos(this.time / 3) * 25)
                text(currPhase.messageEng.substring(0, floor(this.time / currPhase.time * currPhase.messageEng.length)),
                    450, 225 + cos(this.time / 3) * 25)
                break;
        }
        pop()
    }
    Load(level) {
        this.idx = 0;
        this.level = level;

        this.phases = [
            {
                character: "radio",
                message: "You are not supposed to be here.",
                time: 3
            },
        ]
        if (level == 1) {
            //landmines
            this.phases = [
                {
                    character: "officer",
                    message: "[Translate]",
                    messageEng: "[Okay, it's just us, but I think we're okay.]",
                    time: 3
                },
                {
                    character: "soldier",
                    message: "[Translate]",
                    messageEng: "[Mikhail, you're not so bad for a\n fresh university graduate.]",
                    time: 4
                },
                {
                    character: "officer",
                    message: "[Translate]",
                    messageEng: "[Anything to get home.\n It's just the two of us, we need\n to look out for each other.]",
                    time: 5
                },
                {
                    character: "officer",
                    message: "[Translate]",
                    messageEng: "[I'll plan a route home, if\n you can protect me along the way.]",
                    time: 4
                },
                {
                    character: "soldier",
                    message: "[Translate]",
                    messageEng: "[Very well, sir.]",
                    time: 3
                },
                {
                    character: "officer",
                    message: "[Translate]",
                    messageEng: "[First, we just need to get through this\n minefield. Go ahead and lead.]",
                    time: 4
                },
            ]
        }else if(level == 2){
            //first enemy
            this.phases = [
                {
                    character: "officer",
                    message: "[Translate]",
                    messageEng: "[That was a close call!]",
                    time: 3
                },
                {
                    character: "soldier",
                    message: "[Translate]",
                    messageEng: "[Indeed.]",
                    time: 2
                },
                {
                    character: "officer",
                    message: "[Translate]",
                    messageEng: "[Heads up! An enemy!]",
                    time: 3
                },
                {
                    character: "soldier",
                    message: "[Translate]",
                    messageEng: "[Why are they blue?]",
                    time: 4
                },
                {
                    character: "officer",
                    message: "[Translate]",
                    messageEng: "[There's time later for explaining.\n Quick, clear them out and let's get home. ]",
                    time: 3
                },
                {
                    character: "officer",
                    message: "[Translate]",
                    messageEng: "[First, we just need to get through this\n minefield. Go ahead and lead.]",
                    time: 4
                },
            ]
        }else if(level == 3){
            //artillery
            this.phases = [
                {
                    character: "officer",
                    message: "[Translate]",
                    messageEng: "[Watch out! I heard there's artillery ahead.]",
                    time: 3
                },
                {
                    character: "officer",
                    message: "[Translate]",
                    messageEng: "[Mind the-]",
                    time: 3
                },
                {
                    character: "explosion",
                    message: "[BOOM]",
                    time: 3
                },
                {
                    character: "soldier",
                    message: "[Translate]",
                    messageEng: "[He's dead!]",
                    time: 2
                },
            ]
        }
    }
}