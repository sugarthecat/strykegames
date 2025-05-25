class Button {
    constructor(x, y, w, h, text, action) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.text = text;
        this.action = action;
        this.pressed = false;
        this.hovered = false; // Add hovered state to track hover state
    }

    update(mouseX, mouseY) {
        this.hovered = mouseX >= this.x && mouseX <= this.x + this.w && mouseY >= this.y && mouseY <= this.y + this.h;
    }

    HandleClick(x, y) {
        if (x >= this.x && y > this.y && y <= this.y + this.h && x <= this.x + this.w) {
            this.action();
        }
    }

    Draw(mouseX, mouseY) {
        this.update(mouseX, mouseY);

        push();
        noStroke();
        textSize(this.h * 0.6);
        textAlign(CENTER, CENTER);

        if (this.hovered) {
            fill(108, 18, 13);

        } else {
            fill(196, 64, 57);
        }

        let yOffset = this.hovered ? 3 : 0;
        stroke(108, 18, 13);
        strokeWeight(3);
        rect(this.x, this.y + yOffset, this.w, this.h, 8);

        fill(255);
        text(this.text, this.x + this.w / 2, this.y + this.h / 2 + yOffset);
        pop();
    }
}
