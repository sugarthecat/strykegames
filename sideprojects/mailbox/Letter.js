const NODE_SIZE = 20;
const TRANSITION_TIME = 1;
class Letter extends GUI {
    constructor() {
        super();

        //Levels: WILLYOUBEMYVALENTINELOVETJ

        this.elements = []
    }
    reset() {
        this.cameraX = 0;
        this.cameraY = 0;
        this.scale = 1;
        this.level = 0;
        this.transitionProgress = 0;
        this.transitioning = false;
        this.elements = []
        for (let i = 0; i < symbLevels.length; i++) {
            symbLevels[i].reset();
        }
    }
    HandleClick(x, y) {

        if (this.level < symbLevels.length && !this.transitioning) {
            let level = symbLevels[this.level];
            let adjX = x - 300;
            let adjY = y - 200;
            for (let i = 0; i < level.nodes.length; i++) {
                let node = level.nodes[i];
                if (dist(adjX, adjY, node.x, node.y) < NODE_SIZE) {
                    node.toggle();
                }
            }
        }
        super.HandleClick(x, y)
    }
    Draw(x, y) {
        if (this.transitioning) {
            this.transitionProgress += deltaTime / 1000
        }
        //end transitions
        if (this.transitioning && this.transitionProgress > TRANSITION_TIME && this.level + 1 < symbLevels.length) {
            this.transitioning = false
            this.level++;
            this.transitionProgress = 0;
        }

        if (this.level < symbLevels.length && symbLevels[this.level].getScore() == symbLevels[this.level].minScore) {
            this.transitioning = true;
            if (this.level + 1 == symbLevels.length) {
                for (let i = 0; i < symbLevels.length; i++) {
                    symbLevels[i].correct();
                }
            }
        }
        let inFinalForm = (this.transitioning && this.level + 1 == symbLevels.length)
        push()
        fill(255)
        rect(0, 0, 600, 400)
        fill(0)
        let typingProg = min(1, (this.transitionProgress - 8) / 20);
        let typingProg2 = min(1, (this.transitionProgress - 40) / 5);
        if (this.level < symbLevels.length && !inFinalForm) {
            textAlign(CENTER)
            textSize(20)
            text(`Select ${symbLevels[this.level].minScore} nodes such that no two share a vertex.`, 300, 20)
            text(`${symbLevels[this.level].getScore()}/${symbLevels[this.level].minScore} selected`, 300, 50)
        } else if (typingProg > 0 && inFinalForm) {
            textAlign(LEFT)
            textSize(18)
            textFont(Assets.fonts.love)
            let msgLines = [
                "Adrienne,",
                "You say you never liked Valentine's Day.", "I used to agree with you.",
                "But this time, something feels different.", "I think I love Valentine's Day.",
                "Because now,                   ",
                "it's about you."
            ]
            let totalLength = 0;
            for (let i = 0; i < msgLines.length; i++) {
                totalLength += msgLines[i].length;
            }
            let toType = totalLength * typingProg; //num of chars left to type
            for (let i = 0; i < msgLines.length; i++) {
                if (msgLines[i].length <= toType) {
                    text(msgLines[i], 20, 25 + i * 20)
                } else {
                    text(msgLines[i].substring(0, toType), 20, 25 + i * 20)
                    break;
                }
                toType -= msgLines[i].length;
            }
            if (typingProg2 > 0) {
                msgLines = [
                    "Happy Valentine's Day.",
                    "Love,",
                    "T.J."
                ]
                totalLength = 0;
                for (let i = 0; i < msgLines.length; i++) {
                    totalLength += msgLines[i].length;
                }
                toType = totalLength * typingProg2
                for (let i = 0; i < msgLines.length; i++) {
                    if (msgLines[i].length <= toType) {
                        text(msgLines[i], 20, 340 + i * 20)
                    } else {
                        text(msgLines[i].substring(0, toType), 20, 340 + i * 20)
                        break;
                    }
                    toType -= msgLines[i].length;
                }
            }
        }
        strokeWeight(5)
        if (this.transitioning && this.level + 1 < symbLevels.length) {
            this.cameraX = lerp(symbLevels[this.level].x, symbLevels[this.level + 1].x, this.transitionProgress / TRANSITION_TIME)
            this.cameraY = lerp(symbLevels[this.level].y, symbLevels[this.level + 1].y, this.transitionProgress / TRANSITION_TIME)
        }
        else if (this.transitioning && this.level + 1 == symbLevels.length) {
            let cameraProg = min(1, this.transitionProgress / 5)

            this.cameraX = lerp(symbLevels[this.level].x, 180, cameraProg)
            this.cameraY = lerp(symbLevels[this.level].y, 0, cameraProg)
            this.scale = lerp(1, 0.25, cameraProg)
        }
        else if (this.level < symbLevels.length) {
            this.cameraX = symbLevels[this.level].x
            this.cameraY = symbLevels[this.level].y
        }
        translate(300 - this.cameraX, 200 - this.cameraY)
        scale(this.scale)
        this.renderLevel();

        pop()
        super.Draw(x, y)
    }
    renderLevel() {

        let inFinalForm = (this.transitioning && this.level + 1 == symbLevels.length)
        let fadeOutProg = min(1, (this.transitionProgress - 5) / 3)
        let fadeInProg = min(1, (this.transitionProgress - 32) / 3)

        for (let i = 0; i < symbLevels.length; i++) {
            let level = symbLevels[i]
            // draw lines

            if (i == this.level || inFinalForm) {
                stroke(0)
            } else {
                stroke(150)
            }
            if (fadeOutProg > 0 && inFinalForm) {
                strokeWeight((1 - fadeOutProg) * 5)
            }
            if (fadeOutProg < 1 || !inFinalForm) {
                for (let j = 0; j < level.nodes.length; j++) {
                    let node = level.nodes[j];
                    for (let k = 0; k < node.neighbors.length; k++) {
                        let neighbor = node.neighbors[k]
                        line(level.x + node.x, level.y + node.y, level.x + neighbor.x, level.y + neighbor.y)
                    }
                }
            }
            //draw nodes
            for (let j = 0; j < level.nodes.length; j++) {
                let node = level.nodes[j];
                //console.log(level.x + node.x, level.y + node.y, 10)
                if (!node.on) {
                    fill(255)
                } else if (i == this.level || inFinalForm) {
                    fill(0)
                } else {
                    fill(150)
                }

                circle(level.x + node.x, level.y + node.y, NODE_SIZE)
            }

            if (fadeInProg > 0 && inFinalForm) {
                stroke(0)
                strokeWeight(fadeInProg * 10)
                for (let j = 0; j < level.lines.length; j++) {
                    for (let k = 0; k < level.lines[j].length - 1; k++) {
                        let selectedLine = level.lines[j]
                        let node1 = level.nodes[selectedLine[k]]
                        let node2 = level.nodes[selectedLine[k + 1]]
                        line(node1.x + level.x, node1.y + level.y, node2.x + level.x, node2.y + level.y)
                    }
                }
            }
        }
    }
}