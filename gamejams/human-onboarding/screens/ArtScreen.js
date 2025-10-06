
const ArtScreenColors = [
    '#ffffff',
    '#000000',
    '#ff0000',
    '#00ff00',
    '#0000ff',
]
const ART_SCREEN_PIX_WIDTH = 8;
const ART_SCREEN_PIX_HEIGHT = 8;
const ART_SCREEN_PIX_SIZE = 30;
const previousScreens = [
]
class ArtScreen extends GUI {
    constructor() {
        super();
        this.text = ""
        this.timeLeft = 0
        this.selectedColor = 1;
        this.pixels = []
        for (let i = 0; i < ART_SCREEN_PIX_WIDTH; i++) {
            this.pixels.push([])
            for (let j = 0; j < ART_SCREEN_PIX_HEIGHT; j++) {
                this.pixels[i].push(0)
            }
        }
        const ref = this;
        this.elements = [
            new Button(500,200,50,20,"Create Art",function(){
                ref.SaveArt();
                ref.elements[0].active = false;
            },false),
            new Button(500,240,50,20,"Continue",function(){
                screenOn = "transition"
                screens.transition.Reset("cooking","To create or not to create, that is the question.")
            },false),
        ]
        this.SaveArt();
    }
    SaveArt() {
        const deepCopy = []
        for (let i = 0; i < ART_SCREEN_PIX_WIDTH; i++) {
            deepCopy.push([])
            for (let j = 0; j < ART_SCREEN_PIX_HEIGHT; j++) {
                deepCopy[i].push(this.pixels[i][j])
            }
        }
        previousScreens.push(deepCopy)
        if(previousScreens.length >= 4){
            this.elements[1].active = true;
        }
    }
    IsUniqueArt(min_diffs = 8) {
        for (let k = 0; k < previousScreens.length; k++) {
            let diffs = 0

            for (let i = 0; i < ART_SCREEN_PIX_WIDTH; i++) {
                for (let j = 0; j < ART_SCREEN_PIX_HEIGHT; j++) {
                    if (previousScreens[k][i][j] !== this.pixels[i][j]) {
                        diffs++;
                    }
                }
            }
            if (diffs < min_diffs) {
                return false;
            }
        }
        return true;
    }
    HandleClick(x, y) {
        super.HandleClick(x, y);
        if (x > 300 - ART_SCREEN_PIX_SIZE / 2 * ART_SCREEN_PIX_WIDTH
            && x < 300 + ART_SCREEN_PIX_SIZE / 2 * ART_SCREEN_PIX_WIDTH
            && y > 200 - ART_SCREEN_PIX_SIZE / 2 * ART_SCREEN_PIX_HEIGHT
            && y < 200 + ART_SCREEN_PIX_SIZE / 2 * ART_SCREEN_PIX_HEIGHT
        ) {
            let xCoord = floor((x - 300 + ART_SCREEN_PIX_SIZE / 2 * ART_SCREEN_PIX_WIDTH) / ART_SCREEN_PIX_SIZE);
            let yCoord = floor((y - 200 + ART_SCREEN_PIX_SIZE / 2 * ART_SCREEN_PIX_HEIGHT) / ART_SCREEN_PIX_SIZE);
            this.pixels[xCoord][yCoord] = this.selectedColor
        }
        if (x > ART_SCREEN_PIX_SIZE * 2 && x < ART_SCREEN_PIX_SIZE * 3
            && y > 200 - ART_SCREEN_PIX_SIZE / 2 * ArtScreenColors.length
            && y < 200 + ART_SCREEN_PIX_SIZE / 2 * ArtScreenColors.length) {
            this.selectedColor = floor((y - 200 + ART_SCREEN_PIX_SIZE / 2 * ArtScreenColors.length) / ART_SCREEN_PIX_SIZE)
        }
        this.elements[0].active = this.IsUniqueArt();
    }
    Draw(x, y) {
        push()
        noStroke()
        super.Draw(x, y);
        //drawable screen
        fill(0)
        rect(300 - ART_SCREEN_PIX_SIZE / 2 * ART_SCREEN_PIX_WIDTH - 10,
            200 - ART_SCREEN_PIX_SIZE / 2 * ART_SCREEN_PIX_HEIGHT - 10,
            ART_SCREEN_PIX_SIZE * ART_SCREEN_PIX_WIDTH + 20,
            ART_SCREEN_PIX_SIZE * ART_SCREEN_PIX_HEIGHT + 20
        )
        rect(ART_SCREEN_PIX_SIZE * 2 - 10,
            200 - ArtScreenColors.length * ART_SCREEN_PIX_SIZE / 2 - 10,
            ART_SCREEN_PIX_SIZE + 20, ART_SCREEN_PIX_SIZE * ArtScreenColors.length + 20)
        fill(255)

        rect(ART_SCREEN_PIX_SIZE * 2 - 5,
            200 - ArtScreenColors.length * ART_SCREEN_PIX_SIZE / 2 + 5 + this.selectedColor * ART_SCREEN_PIX_SIZE,
            ART_SCREEN_PIX_SIZE + 10, ART_SCREEN_PIX_SIZE - 10)
        for (let x = 0; x < ART_SCREEN_PIX_WIDTH; x++) {
            for (let y = 0; y < ART_SCREEN_PIX_HEIGHT; y++) {
                fill(ArtScreenColors[this.pixels[x][y]])
                rect(x * ART_SCREEN_PIX_SIZE + 300 - ART_SCREEN_PIX_SIZE / 2 * ART_SCREEN_PIX_WIDTH,
                    y * ART_SCREEN_PIX_SIZE + 200 - ART_SCREEN_PIX_SIZE / 2 * ART_SCREEN_PIX_HEIGHT,
                    ART_SCREEN_PIX_SIZE + 1, ART_SCREEN_PIX_SIZE + 1)
            }
        }
        for (let i = 0; i < ArtScreenColors.length; i++) {
            fill(ArtScreenColors[i])
            rect(ART_SCREEN_PIX_SIZE * 2,
                200 - ArtScreenColors.length * ART_SCREEN_PIX_SIZE / 2 + i * ART_SCREEN_PIX_SIZE,
                ART_SCREEN_PIX_SIZE, ART_SCREEN_PIX_SIZE)
        }
        fill (0)
        textFont('Trebuchet MS')
        textSize(12)
        textAlign(LEFT)
        text ( `Unique works created: ${previousScreens.length-1}`,450,150)
        textSize(20)
        textAlign(CENTER)
        text("Make some art.", 300, 50)
        pop()
    }
}