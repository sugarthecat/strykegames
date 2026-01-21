class Dialogue {
    constructor(lineArr) {
        this.lineOn = 0;
        this.lines = lineArr;
        this.charsToShow = 0;
    }
    isActive() {
        return this.lineOn < this.lines.length;
    }
    Advance() {
        if (this.charsToShow < this.lines[this.lineOn].text.length) {
            this.charsToShow = this.lines[this.lineOn].text.length
        } else {
            this.lineOn++;
            this.charsToShow = 0;
        }
    }
    SkipToEnd(){
        while(this.isActive()){
            this.lineOn++;
        }
    }
    Draw() {
        this.charsToShow += deltaTime / 50;
        push()
        noStroke();
        fill(0)
        rect(160, 240, 400, 150)
        fill(255)
        textFont('Courier New');
        textSize(30)
        text(this.lines[this.lineOn].name, 180, 250, 400, 80);
        textAlign(CENTER)
        textSize(14)
        text(this.lines[this.lineOn].text.substring(0, this.charsToShow), 170, 280, 380, 80);
        text("(Space to continue)", 360, 380);

        let charType = 0; //1: spritesheet, 2: orbguy
        let sprite = false;
        switch (this.lines[this.lineOn].name) {
            case "Professor":
            case "Galvis":
            case "Ganuba":
            case "Ganuba (scientist)":
                charType = 1;
                sprite = Assets.spritesheets.madscientist
                break;
            case "Gibraltar":
                charType = 1;
                sprite = Assets.spritesheets.gradstudent
                break;
            case "Gunthar":
            case "Gunthar (police)":
                charType = 1;
                sprite = Assets.spritesheets.police
                break;
            case "Gourd":
            case "Gourd (guard)":
                charType = 1;
                sprite = Assets.spritesheets.armyguy
                break;
            case "???":
            case "Goo Guy":
                charType = 2;
                sprite = Assets.spritesheets.googuy
                break;
        }
        if (charType > 0) {
            noSmooth()
            if (charType == 1) {
                image(sprite, 0, 150, 240, 400,
                    sprite.width / 2 * (1), 0,
                    sprite.width / 2, sprite.height)
            }
            if (charType == 2) {
                image(sprite, 0, 200, 200, 200,
                    0, 0,
                    sprite.width, sprite.height / 2)
            }
        }
        pop()
    }
}
class UniversityDialogue extends Dialogue {
    constructor() {
        super([
            { name: "Professor", text: "GIBRALTAR!!" },
            { name: "Gibraltar", text: "!!!" },
            { name: "Professor", text: "What exactly are you doing here outside of school hours?" },
            { name: "Professor", text: "You’re not supposed to be here!" },
            { name: "Gibraltar", text: "I- well- I’m just .. y’know doing some more work on my research. You said we need to run multiple trials right? To get accurate data?" },

            { name: "Professor", text: "Yes, but did you think that gave you permission to use the lab without permission?" },
            { name: "Gibraltar", text: "I uh..." },
            { name: "Professor", text: "Well!?" },

            { name: "Gibraltar", text: "No Professor Galvis" },
            { name: "Galvis", text: "Ok so start packing up whatever it is you're doing and go home. I’ll escort you out and we can have a talk about this tomorrow. Your lab privileges are on thin ice, especially after what you brought in last week." },
            { name: "Galvis", text: "I mean c’mon Gibraltar. You’re lucky I don’t report you to the dean after this…" },
            { name: "Galvis", text: "Well!?" },
            { name: "Gibraltar", text: "*sighs under breath* …" },
            { name: "Galvis", text: "You have 2 minutes to clean up. I’ll be outside." },
            { name: "Galvis", text: "*Leaves*" },
            { name: "Gibraltar", text: "..." },
            { name: "Gibraltar", text: "..." },
            { name: "Gibraltar", text: "??" },
            { name: "Gibraltar", text: "Does that look like an … eye?" },
            { name: "???", text: "..." },
            { name: "???", text: "Goo!" },
            { name: "Goo Guy", text: "More Goo!" }
        ]
        )

    }
}
// { name: "", text: "" },
class SkyscraperDialogue extends Dialogue {
    constructor() {
        super([
            { name: "Gunthar (police)", text: "Ah you must the entertainment" },
            { name: "Goo Guy", text: "Where other goo?" },
            { name: "Gunthar", text: "Wait no… this isn’t a pinata?" },
            { name: "Goo Guy", text: "So confused! Can’t think right! Not enough goo power!" },
            { name: "Gunthar", text: "And since when can pinata’s talk? You know what? You're not supposed to be here." },
            { name: "Goo Guy", text: "You want talk to goo? Goo yay!" },
            { name: "Gunthar", text: "*screaming*" }
        ]
        )
    }
}
class MilitaryFortDialogue extends Dialogue {
    constructor() {
        super([
            { name: "Gourd (gaurd)", text: "Halt! You’ve violated the law! You're not supposed to be here." },
            { name: "Goo Guy", text: "Goo is beautiful! Don’t you want goo?" },
            { name: "Gourd", text: "We don’t want none of your ‘goo’ pal! Now scram before I get mad." },
            { name: "Goo Guy", text: "That what they all goo!" },
            { name: "Gourd", text: "*screaming" },
        ]
        )
    }
}
class RobotFactoryDialogue extends Dialogue {
    constructor() {
        super([
            { name: "G-962 (robot)", text: "You're not supposed to be here. You are trespassing on private corporate property and you will be detained in 30 seconds if you do not comply. State your identity and your intention." },
            { name: "Goo Guy", text: "We are goo! We come in goo! We want to make you happy!" },
            { name: "G-962", text: "Initial biological scans indicate the perpetrator is not carbon based. If you are an android, state your serial number and prime directive." },
            { name: "Goo Guy", text: "I’m goo 1342578069728! Pleased to goo you!" },
            { name: "G-962", text: "Welcome back Unit GOO-1342578069728. You are late for designated brunchtime. Please hurry to your station." },
            { name: "Goo Guy", text: "Goo brunch!" },
            { name: "G-962", text: "..." },
            { name: "G-962", text: "Hey, wait a minute ..." },
        ]
        )
    }
}
class UndergroundBunkerDialogue extends Dialogue {
    constructor() {
        super([
            { name: "Gubba (scientist)", text: "How the hell did you get in here!? You're not supposed to be here!" },
            { name: "Gubba", text: "Oh god its begun hasn’t it? I need to get everyone. We need to … oh god. Wait … if you’re in here … it’s too late?? No …" },
            { name: "Goo Guy", text: "Nothing stop us! Not space! Not ground! Not goo!" },
            { name: "Gubba", text: "Oh wait… you’re not a zombie? Oh thank god! We’re saved!" },
            { name: "Goo Guy", text: "Yes! Goo saves! Goo has saved trillions! Goo will save you!" },
            { name: "Gubba", text: "*screams*" },
        ]
        )
    }
}
class Area51Dialogue extends Dialogue {
    constructor() {
        super([
            { name: "Ganuba (scientist)", text: "..." },
            { name: "Ganuba", text: "Hey buddyyy … let’s talk this out alright?" },
            { name: "Ganuba", text: "I know you think your little gang of buddies wanna turn our brains into computers ..." },
            { name: "Ganuba", text: "Aaaand even though you're not supposed to be here..." },
            { name: "Ganuba", text: "I think you’ll find that-" },
            { name: "Goo Guy", text: "..." },
            { name: "Goo Guy", text: "Don’t call me buddy" },
            { name: "Goo Guy", text: "Skin bag" },
            { name: "Ganuba", text: "*screams*" },
            { name: "Goo Guy", text: "I did it! Mamma will be so proud!" },
            { name: "Goo Guy", text: "..." },
            { name: "Goo Guy", text: "Wait what?" },
            { name: "Goo Guy", text: "Wrong planet?" },
            { name: "Goo Guy", text: "Ohhhh you said Goopiter! Not Gearth! Silly Goo!" },
        ]
        )
    }
}