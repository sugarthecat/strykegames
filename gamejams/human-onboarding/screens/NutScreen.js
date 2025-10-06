class NutScreen extends GUI {
    constructor() {
        super();
        this.nutNumber = 0;
        this.runtime = 0;
        const ref = this;
        this.elements = [new Button(220, 350, 60, 25, "Yes.", function () {
            ref.nutNumber++;
            ref.runtime = 0;
        }), new Button(320, 350, 60, 25, "No.", function () {
            ref.nutNumber++;
            ref.runtime = 0;
        }, false)]
    }
    Draw(x, y) {
        this.runtime += deltaTime / 1000
        if (this.runtime < 4) {
            this.elements[0].active = false;
            this.elements[1].active = false;
            this.elements[0].x = 220;
            this.elements[1].x = 320;
        } else {
            this.elements[0].active = true;
            this.elements[1].active = true;
            if (this.nutNumber == 1) {
                if (dist(x, y, 350, 360) < 50) {
                    this.elements[1].x = 420;
                } else {
                    this.elements[1].x = 320;
                }
            }
            if (this.nutNumber == 2) {
                if (x > 300) {
                    this.elements[1].x = 220;
                    this.elements[0].x = 320;
                } else {
                    this.elements[0].x = 220;
                    this.elements[1].x = 320;
                }
            }
        }
        if (this.nutNumber < Assets.nuts.length) {
            image(Assets.nuts[this.nutNumber], 0, 0, 600, 400)
            const message = "Do you hunger for me?"
            textAlign(LEFT);
            textFont('Trebuchet MS')
            textSize(18)
            const charCount = min(this.runtime * 5, message.length)
            fill(255)
            rect(50, 32, textWidth(message.substring(0, charCount)), 25)
            fill(0)
            text(message.substring(0, charCount), 50, 50);
        }else{
            screenOn = "fearofgod";
        }
        super.DrawElements(x, y);
    }

}