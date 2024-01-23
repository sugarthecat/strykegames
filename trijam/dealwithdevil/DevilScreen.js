
class DevilScreen {
    static NewGame() {
        this.debuffs = [/*
            "shaky hands",
            "blind spots",
            "illiteracy",
            "unrefusable contracts",
            "gun jams",
            "vasospasms",*/
            "vertigo",
            "vertigo",/*
            "frailness",
            "hallucinations",
            "invisible bullets",
            "swaying bullets",
            "time constriction",*/
        ];
        if(!badComputer){
            this.debuffs.push("bad vision")
            this.debuffs.push("color blindness")
        }
        this.buffs = [
            "an automatic gun",
            "healing abilities",
            "multishot rounds",
            "enemy counts",
            "greater stamina",
            "a double barrel",
            "sharper bullets",
            "a stronger gun",
            "a faster gun"
        ]
    }
    static NewDeal() {
        this.character = 0;
        if (this.debuffs.length <= 1) {
            this.debuffs.push("stronger opponents")
            this.debuffs.push("faster opponents")
        }
        if (this.buffs.length <= 1) {
            this.buffs.push("a stronger gun")
            this.buffs.push("a faster gun")

        }
        this.buff = random(this.buffs)
        this.debuff = random(this.debuffs)
        this.dealertext = "I'd like to make a deal...";
        this.bufftext = "I can give you " + this.buff
        this.debufftext = "If you can deal with the " + this.debuff + "..."
        if (debuffs.includes("illiteracy")) {
            this.dealertext = shuffleString(this.dealertext)
            this.bufftext = shuffleString(this.bufftext)
            this.debufftext = shuffleString(this.debufftext)
        }
    }

    static Draw() {
        background(0);
        fill(50, 0, 0)
        noStroke();
        rect(0, 0, 600, 400)
        textAlign(CENTER);
        stroke(200, 0, 0)
        fill(150, 0, 0)
        textSize(60)
        this.character += 0.3;
        let dealertext = this.dealertext;
        let bufftext = this.bufftext;
        let debufftext = this.debufftext
        if (dealertext.length > this.character) {
            dealertext = dealertext.substring(0, floor(this.character))
            bufftext = "";
            debufftext = "";
        } else if (bufftext.length + dealertext.length > this.character) {
            bufftext = bufftext.substring(0, floor(this.character - dealertext.length))
            debufftext = "";
        } else if (debufftext.length + bufftext.length + dealertext.length > this.character) {
            debufftext = debufftext.substring(0, floor(this.character - dealertext.length - bufftext.length))
        }
        text(dealertext, 300, 150)
        textSize(30)
        text(bufftext, 300, 200)
        text(debufftext, 300, 250)

        textSize(15)
        text("level-" + levelOn + ".purg", 300, 30)

        textSize(40)
        stroke(200, 0, 0)
        if (mouseInRange(60, 310, 120, 50)) {
            fill(10, 0, 0)
        } else {
            fill(80, 0, 0)
        }
        rect(60, 310, 120, 50)
        fill(150, 0, 0)
        text("Accept", 120, 350)

        if (!debuffs.includes("unrefusable contracts")) {
            textSize(40)
            stroke(200, 0, 0)
            if (mouseInRange(420, 310, 120, 50)) {
                fill(10, 0, 0)
            } else {
                fill(80, 0, 0)
            }
            rect(420, 310, 120, 50)
            fill(150, 0, 0)
            text("Refuse", 480, 350)
        }
    }
    static HandleClick() {
        if (this.debufftext.length + this.bufftext.length + this.dealertext.length < this.character) {
            if (mouseInRange(60, 310, 120, 50)) {
                //accepted
                Game.ApplyStats();
                this.debuffs.splice(this.debuffs.indexOf(this.debuff), 1)
                this.buffs.splice(this.buffs.indexOf(this.buff), 1)
                screenOn = "game"
                Game.NewLevel();
                Assets.keyboard.stop();
            }
            if (mouseInRange(420, 310, 120, 50) && !debuffs.includes("unrefusable contracts")) {
                screenOn = "game"
                Game.NewLevel();
                Assets.keyboard.stop();
            }
        }
    }
}