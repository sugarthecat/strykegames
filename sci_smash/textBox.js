import ColorText from "./colorText.js";
export default class TextBox {
    constructor(text, textSpeed) {
        this.margin = 0.04;
        this.text = [];
        this.textSpeed = textSpeed;
        this.textSize = 0.2;
        this.totalShown = 0;
        let shownText = text.split('\\');
        this.bottomtext = shownText[1];
        shownText = "255,255,255}" + shownText[0];
        shownText = shownText.replace('\n', "");
        shownText = shownText.split('{');
        for (let i = 0; i < shownText.length; i++) {
            let colorstring = shownText[i].split('}')[0];
            let contentstring = shownText[i].split('}')[1];
            let r = colorstring.split(',')[0];
            let g = colorstring.split(',')[1];
            let b = colorstring.split(',')[2];
            let contents = contentstring.split(' ');
            for (let i = 0; i < contents.length; i++) {
                let coloredTextContent = new ColorText(contents[i], r, g, b);
                if (i + 1 < contents.length) {
                    coloredTextContent.addAfterSpace();
                }
                this.text.push(coloredTextContent);
            }
        }

    }
    /**
     * Gets the text box display completion status
     * @returns {Boolean} If the text box has completed
     */
    isComplete() {
        let letterOn = 0;
        for (let i = 0; i < this.text.length; i++) {
            letterOn += this.text[i].content.length;
        }
        return letterOn < this.totalShown;
    }
    /**
     * Draws the text box on the screen.
     */
    draw() {
        let xWidth = min(width - 20, height);
        let yWidth = min(width / 3, height / 5);
        noStroke();
        let bgcolor = color(0);
        bgcolor.setAlpha(200);
        fill(bgcolor);
        rect((width - xWidth) / 2, height - yWidth, xWidth, yWidth);
        textSize(this.textSize * min((xWidth - 20), (yWidth - 20)));
        textStyle(BOLD);
        fill(0);
        let rowOn = 1;
        let xOn = 0;
        let lettersTyped = 0;
        for (let i = 0; i < this.text.length; i++) {
            if (xOn + textWidth(this.text[i].content) > xWidth - this.margin * xWidth) {
                rowOn++;
                xOn = 0;
            }
            for (let j = 0; j < this.text[i].content.length; j++) {
                if (lettersTyped < this.totalShown) {
                    fill(this.text[i].color);
                    text(this.text[i].content.charAt(j), (width - xWidth) / 2 + xOn + xWidth * this.margin, height - yWidth + textSize() * rowOn);
                    xOn += textWidth(this.text[i].content.charAt(j));
                    lettersTyped++;
                }
            }
            if (this.text[i].hasAfterSpace) {
                xOn += textWidth(" ");
            }
        }
        fill(255);
        if (this.isComplete()) {
            textSize(0.2 * min((xWidth - 20), (yWidth - 20)));
            text(this.bottomtext, (width - xWidth) / 2 + xWidth * this.margin, height - textSize());
        }
    }
    /**
     * Advances the text in accordance with P5's deltaTime variable.
     * @param {Boolean} finishText If the text is to be instantly finished.
     */
    advanceText(finishText) {
        this.totalShown += this.textSpeed * deltaTime / 1000;
        if (finishText) {
            let letterOn = 0;
            for (let i = 0; i < this.text.length; i++) {
                letterOn += this.text[i].content.length;
            }
            this.totalShown = letterOn + 1;
        }
    }
}