//idea: 
class Simulator extends GUI {
    constructor() {
        super();
    }
    reset() {
        this.fireActive = false;
        this.bfaction = false;
        this.askmenu = false;
        this.embers = []
        this.time = 0;
        this.elements = [new Button(40, 20, 100, 20, "Return To Mailbox", function () { screenOn = "title" })]
    }
    getOptions() {
        return [
            { text: this.fireActive ? "Fire!" : "Cold!", action: "fire" },
            { text: "Potato!", action: "potato" },
            { text: "Book!", action: "book" },
            { text: "Cake!", action: "cake" },
            { text: "Kiss!", action: "kiss" },
        ]
    }
    Draw(x, y) {
        this.time += deltaTime / 1000;
        push()
        noStroke();
        noSmooth();
        image(Assets.simulator.background, 0, 0, 600, 400)
        this.DrawFire()
        if (this.bfaction) {
            switch (this.bfaction) {
                case "fire":
                    if (this.time < 3) {
                        image(Assets.simulator.bffire, 0, 0, 600, 400);
                    } else if (this.time < 4) {
                        image(Assets.simulator.bfstand, 0, 0, 600, 400);
                    } else {
                        this.fireActive = !this.fireActive;
                        this.bfaction = false;
                    }
                    break;
                case "kiss":
                    if (this.time < 1) {
                        image(Assets.simulator.bfstand, 0, 0, 600, 400);
                    } else if (this.time < 2) {
                        image(Assets.simulator.bfkiss, 0, 0, 600, 400);
                    } else if (this.time < 3) {
                        image(Assets.simulator.bfstand, 0, 0, 600, 400);
                    } else if (this.time < 4) {
                        image(Assets.simulator.bfkiss, 0, 0, 600, 400);
                    } else if (this.time < 5) {
                        image(Assets.simulator.bfstand, 0, 0, 600, 400);
                    } else {
                        this.bfaction = false;
                    }
                    break;
                case "plate":
                    if (this.time < 1) {
                    } else if (this.time < 2) {
                        image(Assets.simulator.bfstand, 0, 0, 600, 400)
                    } else if (this.time < 3) {
                        image(Assets.simulator.bfserve, 0, 0, 600, 400)
                    } else if (this.time < 4) {
                        image(Assets.simulator.bfstand, 0, 0, 600, 400)
                    }

                    if (this.time < 3) {
                        image(Assets.simulator.bfserve, 0, 0, 600, 400)
                        image(Assets.simulator.plate, 0, 0, 600, 400);
                    }
                    if (this.time > 4) {
                        this.bfaction = false;
                    }
                    break;
                case "book":
                    if (this.time < 1) {
                        image(Assets.simulator.bfstand, 0, 0, 600, 400);
                    } else if (this.time < 2) {
                        //do nothing
                    } else if (this.time < 3) {
                        image(Assets.simulator.bfstand, 0, 0, 600, 400);
                    } else if (this.time < 4) {
                        image(Assets.simulator.bfserve, 0, 0, 600, 400);
                        image(Assets.simulator.book1, 300, 0, 600, 400);
                    } else if (this.time < 5) {
                        image(Assets.simulator.bfstand, 0, 0, 600, 400);
                        image(Assets.simulator.book1, 0, 0, 600, 400);
                    } else if (this.time < 10) {
                        image(Assets.simulator.book1, 0, 0, 600, 400);
                    } else if (this.time < 15) {
                        image(Assets.simulator.book2, 0, 0, 600, 400);
                    } else if (this.time < 20) {
                        image(Assets.simulator.book3, 0, 0, 600, 400);
                    } else {
                        this.bfaction = false;
                    }
                    break;
                case "potato":
                    if (this.time < 1) {
                        image(Assets.simulator.bfstand, 0, 0, 600, 400);
                    } else if (this.time < 2) {
                        //do nothing
                    } else if (this.time < 3) {
                        image(Assets.simulator.bfstand, 0, 0, 600, 400);
                    } else if (this.time < 4) {
                        image(Assets.simulator.bfserve, 0, 0, 600, 400);
                        image(Assets.simulator.potato1, 0, 0, 600, 400);
                    } else if (this.time < 5) {
                        image(Assets.simulator.bfstand, 0, 0, 600, 400);
                        image(Assets.simulator.potato1, 0, 0, 600, 400);
                    } else {
                        image(Assets.simulator.potato1, 0, 0, 600, 400);
                        this.bfaction = "potato1"
                    }
                    break;
                case "cake":
                    if (this.time < 1) {
                        image(Assets.simulator.bfstand, 0, 0, 600, 400);
                    } else if (this.time < 2) {
                        //do nothing
                    } else if (this.time < 3) {
                        image(Assets.simulator.bfstand, 0, 0, 600, 400);
                    } else if (this.time < 4) {
                        image(Assets.simulator.bfserve, 0, 0, 600, 400);
                        image(Assets.simulator.cake1, 0, 0, 600, 400);
                    } else if (this.time < 5) {
                        image(Assets.simulator.bfstand, 0, 0, 600, 400);
                        image(Assets.simulator.cake1, 0, 0, 600, 400);
                    } else {
                        image(Assets.simulator.cake1, 0, 0, 600, 400);
                        this.bfaction = "cake1"
                    }
                    break;
                case "potato1":
                    image(Assets.simulator.potato1, 0, 0, 600, 400);
                    break;
                case "potato2":
                    image(Assets.simulator.potato2, 0, 0, 600, 400);
                    break;
                case "potato3":
                    image(Assets.simulator.potato3, 0, 0, 600, 400);
                    break;
                case "cake1":
                    image(Assets.simulator.cake1, 0, 0, 600, 400);
                    break;
                case "cake2":
                    image(Assets.simulator.cake2, 0, 0, 600, 400);
                    break;
                case "cake3":
                    image(Assets.simulator.cake3, 0, 0, 600, 400);
                    break;
                case "cake4":
                    image(Assets.simulator.cake4, 0, 0, 600, 400);
                    break;
                case "cake5":
                    image(Assets.simulator.cake5, 0, 0, 600, 400);
                    break;
                case "summon":
                    if (this.time > 1) {
                        this.bfaction = false;
                        this.askmenu = true;
                        this.time = 0
                    }
                    break;
            }
        } else if (this.askmenu) {
            image(Assets.simulator.bfchat, 600 * (1 - (this.time ** 2) / (this.time ** 2 + 4)), 0, 600, 400);
            textSize(20)
            textAlign(LEFT)
            let curry = 232;
            let currx = 50;
            let options = []
            if (this.time > 7) {
                options = this.getOptions()
            }
            for (let i = 0; i < options.length; i++) {
                if (currx + textWidth(options[i].text) > 400) {
                    currx = 50;
                    curry += 40
                }
                fill(0)
                rect(currx, curry, textWidth(options[i].text) + 18, 33)
                fill(255)
                if (currx < x && currx + textWidth(options[i].text) + 18 > x
                    && curry < y && curry + 33 > y) {
                    fill(180)
                }
                rect(currx + 4, curry + 4, textWidth(options[i].text) + 10, 25)
                fill(0)
                text(options[i].text, currx + 9, curry + 24)
                currx += textWidth(options[i].text) + 30;
            }
        } else {
            fill(0)
            circle(550, 35, 50)
            fill(255)
            if (dist(x, y, 550, 35) < 50) {
                fill(180)
            }
            circle(550, 35, 40)
            fill(0)
            textAlign(CENTER)
            textStyle(BOLD)
            textSize(40)
            text("!", 550, 50)
        }
        pop()
        super.Draw(x, y)
    }
    DrawFire() {
        let minRoll = 1.015 - this.embers.length * 0.001
        if (this.fireActive) {
            minRoll = 5 / max(6, this.embers.length / 4)
        }
        if (random() > minRoll) {
            let x = 350 + random(-30, 30) + random(-30, 30)
            this.embers.push({ x: x, y: random(190, 200) + Math.sqrt(60 - abs(x - 350)) * 5, g: random(255) * random() })
        }
        //start: 290 205
        //end: 400 205
        for (let i = 0; i < this.embers.length; i++) {
            fill(255, this.embers[i].g, 0)
            rect(this.embers[i].x, this.embers[i].y, 3, 3)
            if (deltaTime < 200) {
                this.embers[i].y -= deltaTime * noise(this.embers[i].x / 100 + i * 5, this.embers[i].y / 100) / 50
                this.embers[i].x += deltaTime * (noise(this.embers[i].x / 100 + i * 5, this.embers[i].y / 100) - 0.5) / 200
                this.embers[i].x += (340 - this.embers[i].x) / 1000
                if (this.embers[i].y < 120) {
                    this.embers.splice(i, 1)
                    i--;
                }
            }
        }
    }
    SetBFAction(action) {
        this.bfaction = action;
        this.time = 0;
    }
    HandleClick(x, y) {
        super.HandleClick(x, y)
        let clickAdvance = {
            potato1: "potato2",
            potato2: "potato3",
            potato3: "plate",

            cake1: 'cake2',
            cake2: 'cake3',
            cake3: 'cake4',
            cake4: 'cake5',
            cake5: 'plate',
        }
        if (this.bfaction) {
            if (this.bfaction in clickAdvance) {
                this.bfaction = clickAdvance[this.bfaction]
            }

            return;
        }
        if (this.askmenu) {

            let curry = 232;
            let currx = 50;
            let options = []
            if (this.time > 7) {
                options = this.getOptions()
            }
            textSize(20)
            for (let i = 0; i < options.length; i++) {
                if (currx + textWidth(options[i].text) > 400) {
                    currx = 50;
                    curry += 40
                }
                if (currx < x && currx + textWidth(options[i].text) + 18 > x
                    && curry < y && curry + 33 > y) {
                    this.SetBFAction(options[i].action)
                    this.askmenu = false;
                }
                currx += textWidth(options[i].text) + 30;
            }
        } else {
            if (dist(x, y, 550, 35) < 50) {
                this.SetBFAction('summon')
            }
        }
    }
}