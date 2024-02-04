class Debuffs {
    static DrawDebuffs() {
        for (let i = 0; i < debuffs.length; i++) {

            switch (debuffs[i]) {
                case "blind spots":
                    for (let i = 0; i < this.blindspots.length; i++) {
                        for (let j = 0; j < 10; j++) {
                            let tempColor = color(150)
                            tempColor.setAlpha(100)
                            fill(tempColor)
                            circle(this.blindspots[i].x, this.blindspots[i].y, 10 * j + 100)
                        }
                    }
                    break;
                case "vasospasms":
                    if (this.timeUntilvasospasms < -10) {
                        this.timeUntilvasospasms = random(180, 1800)
                    }
                    if (this.timeUntilvasospasms < 30) {
                        background(this.timeUntilvasospasms / 30 * 255)
                    }
                    this.timeUntilvasospasms--;
                    break;
                case "hallucinations":
                    if(this.hallucinations.length < 2){
                        this.hallucinations.push(new MeleeEnemy())
                        this.hallucinations[this.hallucinations.length-1].damage = 0;
                        this.hallucinations[this.hallucinations.length-1].lifeSpan = random(1000);
                    }
                    for(let i = 0; i<this.hallucinations.length; i++){
                        this.hallucinations[i].Draw();
                        this.hallucinations[i].lifeSpan--;
                        if(this.hallucinations[i].lifeSpan < 0 || this.hallucinations[i].attack > 0){
                            this.hallucinations.splice(i,1)
                            i--;
                        }
                    }
                    break;
            }

        }
    }

    static DrawFilterDebuffs() {

        if (debuffs.includes("bad vision") && screenOn == "game") {
            filter(BLUR, 8);
        }
        if (debuffs.includes("color blindness") && (screenOn == "game" || screenOn == "devil")) {
            filter(GRAY);
        }
    }

    static RefreshDebuffs() {
        //blindspots
        this.blindspots = []
        for (let i = 0; i < 3; i++) {
            this.blindspots.push({ x: random(0, 600), y: random(0, 400) })
        }
        this.hallucinations = []
        this.timeUntilvasospasms = random(0, 600)
    }
}