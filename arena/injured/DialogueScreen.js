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
            if (this.level < 11) {
                screens.game.Load(this.level);
                screenOn = "game"
            } else {
                screenOn = "title"
            }
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
                image(Assets.characters.explosion, 0, -10 + sin(this.time / 3) * 20, 600, 400)
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
                    image(Assets.characters.soldier, 0, -10 + sin(this.time / 3) * 20, 600, 400)
                }
                if (currPhase.character == "officer") {
                    image(Assets.characters.officer, 0, -10 + sin(this.time / 3) * 20, 600, 400)
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
                message: "You have completed the demo of the game.",
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
                    messageEng: "[Ivan, you're not so bad for a\n fresh university graduate.]",
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
        } else if (level == 2) {
            //landmines
            this.phases = [
                {
                    character: "officer",
                    message: "[Translate]",
                    messageEng: "[Be careful around those!]",
                    time: 3
                },
                {
                    character: "soldier",
                    message: "[Translate]",
                    messageEng: "[Quiet! There are soldiers ahead.]",
                    time: 4
                },
                {
                    character: "officer",
                    message: "[Translate]",
                    messageEng: "[It's only one enemy.\nYou can handle this.]",
                    time: 5
                }
            ]
        } else if (level == 3) {
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
                    messageEng: "[Heads up! Enemies!]",
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
                    messageEng: "[There's time later for explaining.\nQuick, clear them out and let's get home.]",
                    time: 3
                },
                {
                    character: "officer",
                    message: "[Translate]",
                    messageEng: "[First, we just need to get through this\n minefield. Go ahead and lead.]",
                    time: 4
                },
            ]
        } else if (level == 4) {
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
                    time: 2
                },
                {
                    character: "soldier",
                    message: "[Translate]",
                    messageEng: "[He's dead!\n They killed him!]",
                    time: 5
                },
            ]
        } else if (level == 5) {
            //artillery
            this.phases = [
                {
                    character: "soldier",
                    message: "[Translate]",
                    messageEng: "[That squad over there!\n They have a radio.]",
                    time: 5
                },
                {
                    character: "soldier",
                    message: "[Translate]",
                    messageEng: "[I need it to find my way home.]",
                    time: 5
                }
            ]
        } else if (level == 6) {
            //artillery
            this.phases = [
                {
                    character: "soldier",
                    message: "[Translate]",
                    messageEng: "[Dear radio, please work.]",
                    time: 2
                },
                {
                    character: "radio",
                    message: "[Polish text here]",
                    time: 3
                },

                {
                    character: "soldier",
                    message: "[Translate]",
                    messageEng: "[I don't speak Polish.]",
                    time: 5
                },
                {
                    character: "soldier",
                    message: "[Translate]",
                    messageEng: "[I have to keep wandering.]",
                    time: 3
                },
                {
                    character: "soldier",
                    message: "[Translate]",
                    messageEng: "[I feel sick. I can't tell my left from my right.]",
                    time: 3
                },
            ]
        } else if (level == 7) {
            //artillery
            this.phases = [
                {
                    character: "radio",
                    message: "[Polish text here]",
                    time: 3
                },
                {
                    character: "soldier",
                    message: "[Translate]",
                    messageEng: "[Hello? Can you hear me?]",
                    time: 5
                },
                {
                    character: "soldier",
                    message: "[Translate]",
                    messageEng: "[This rain. I've got mud in my rifle.]",
                    time: 3
                },
                {
                    character: "soldier",
                    message: "[Translate]",
                    messageEng: "[I need to be careful,\n it could misfire.]",
                    time: 3
                },
            ]
        } else if (level == 8) {
            //artillery
            this.phases = [
                {
                    character: "radio",
                    message: "[Polish text here]",
                    time: 3
                },
                {
                    character: "soldier",
                    message: "[Translate]",
                    messageEng: "[That sounds like my location.]",
                    time: 5
                },
                {
                    character: "soldier",
                    message: "[Translate]",
                    messageEng: "[I need to get out of here!]",
                    time: 3
                }
            ]
        } else if (level == 9) {
            //artillery
            this.phases = [
                {
                    character: "soldier",
                    message: "[Translate]",
                    messageEng: "[Is that an enemy fort?]",
                    time: 5
                },
                {
                    character: "soldier",
                    message: "[Translate]",
                    messageEng: "[Well, no way out but through.]",
                    time: 3
                }
            ]
        } else if (level == 10) {
            //artillery
            this.phases = [
                {
                    character: "soldier",
                    message: "[Translate]",
                    messageEng: "[Is that an enemy tank?]",
                    time: 5
                },
                {
                    character: "soldier",
                    message: "[Translate]",
                    messageEng: "[Oh, shit. I'm dead, aren't I?]",
                    time: 3
                }
            ]
        } else if (level == 11) {
            //artillery
            this.phases = [
                {
                    character: "soldier",
                    message: "[Translate]",
                    messageEng: "[I give up! I give up!\n I surrender! Please!]",
                    time: 5
                },
                {
                    character: "soldier",
                    message: "[Translate]",
                    messageEng: "[I don't care.\n I don't want to fight anymore.]",
                    time: 3
                }
            ]
        }
    }
}