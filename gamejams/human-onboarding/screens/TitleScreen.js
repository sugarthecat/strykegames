
let colors = [];
let centerPoint = {x: 300, y: 200};
function initBackground() {
    for(let i = 0; i<4; i++){
        colors.push(random(240,255))
    }
}

function drawBackground() {
    const edgePoints = [[0,0],[600,0],[600,400],[0,400]]
    for (let i = 0; i < 4; i++) {
        fill (colors[i])
        triangle(edgePoints[i][0], edgePoints[i][1], edgePoints[(i+1)%4][0], edgePoints[(i+1)%4][1], centerPoint.x,centerPoint.y);
        colors[i] = constrain(colors[i] + random(-0.2,0.2),240,255);
    }
    centerPoint.x = constrain (centerPoint.x+random(-0.1,0.1),280,320);
    centerPoint.y = constrain (centerPoint.y+random(-0.1,0.1),180,220);
}
class TitleScreen extends GUI {
    constructor() {
        super();
        this.elements = [
            new Button(250, 350, 100, 45, "Begin", function () {
                screenOn = "transition"
                screens.transition.Reset("monologue","Preparing welcome statement...")
                screens.monologue.Reset("quiz", "Welcome human, I am your A.I. assistant."
                    + " You have been selected and should congratulate yourself for making it here."
                    + " This is quite an important role and it’s best we get started as soon as possible."
                    + " Before we give you your first task, we will complete the preliminary onboarding questions.", 20)
            })
        ]
        this.time = 0
    }
    Draw(x, y) {
        this.time += deltaTime / 1000
        super.Draw(x, y);
        push()
        noStroke()
        for (let i = 0; i < 10; i++) {
            fill(0, 100, 200, 50 + i * 5)
            circle(300, 200, 220 - i * 20 + cos(this.time + i) * 10)
        }
        smooth()
        image(Assets.titleoverlay, 0, 0, 600, 400)
        pop()
        super.DrawElements(x, y);
    }
}