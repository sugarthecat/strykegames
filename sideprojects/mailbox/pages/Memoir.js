
class Memoir extends GUI {
    constructor() {
        super();
    }
    reset() {
        this.time = 0;
        this.velocity = 0;
        this.currPage = 0
        this.pageSelected = false
        this.elements = [new Button(5, 5, 200, 40, "Return To Mailbox", function () { screenOn = "title" })]
        this.leftX = 0;
        this.pagetitles = ["Application",
            "The Mailbox",
            "The War Room",
            "A Weird Hallway",
            "Visiting UMW",
            "Minecraft",
            "After the Summer",
            "Meeting your family",
            "Fields of Fear",
            "IHOP With Alec"
        ]
        this.pages = []
        for (let i = 0; i < this.pagetitles.length; i++) {
            let page = createGraphics(800, 800);
            page.textAlign(CENTER)
            page.fill(255 * i / 12, 0, 255 * (1 - i / 12))
            page.rect(0, 0, 800, 800)
            page.fill(0)
            page.textSize(45)
            page.noStroke()
            page.strokeWeight(10)
            page.strokeCap(ROUND);
            page.text(i, 400, 400)
            this.pages.push(page)
        }
        this.coverPage = createGraphics(400, 800)
    }
    mousePressed() {
        let coords = getMousePosition();
        if (abs(this.leftX - coords.x) < 20) {
            this.pageSelected = true;
        } else if (this.leftX == 120 && this.currPage + 1 < this.pages.length && abs(480 - coords.x) < 20) {
            this.currPage++;
            this.leftX = 480;
            this.pageSelected = true;
        }
    }
    mouseReleased() {
        this.pageSelected = false;
        this.velocity = 0
    }
    HandleClick(x, y) {
        super.HandleClick(x, y)
    }
    Draw(x, y) {
        this.time += deltaTime / 1000
        this.updateCoverPage()
        this.updatePage(this.currPage);
        if (this.currPage >= 1) {
            this.updatePage(this.currPage - 1)
        }
        let coords = getMousePosition();
        if (this.pageSelected) {
            this.leftX = constrain(coords.x, 120, 480)
        } else if (deltaTime < 1000) {
            this.leftX = constrain(this.leftX + this.velocity * deltaTime / 1000, 120, 480)

            let targetVelocity = (this.leftX - 300)

            this.velocity = lerp(this.velocity, targetVelocity, min(deltaTime / 1000, 1))

        }
        push()
        fill(140, 211, 255)
        rect(0, 0, 600, 400)
        fill(100)
        image(this.pages[this.currPage], 300, 20, 180, 360, 400, 0, 400, 800)
        if (this.currPage > 0) {
            image(this.pages[this.currPage - 1], 120, 20, 180, 360, 0, 0, 400, 800)
        }

        noStroke()
        push()//offwhite 
        if (this.leftX < 300) {
            image(this.pages[this.currPage], this.leftX, 20, 300 - this.leftX, 360, 0, 0, 400, 800)
        }
        let theta = acos((this.leftX - 300) / 180)


        //portion of previous note
        if (this.leftX > 300) {
            fill(240, 240, 255)
            if (this.currPage == 0) {
                image(this.coverPage, 300, 20, this.leftX - 300, 360)
            } else {
                image(this.pages[this.currPage - 1], 300, 20, this.leftX - 300, 360, 400, 0, 400, 800)
            }
        }
        pop()

        stroke(0)
        strokeWeight(5)
        let leftSide = this.leftX;
        if (this.currPage > 0) {
            leftSide = 120
        }
        line(300, 20, 480, 20)
        line(480, 20, 480, 380)
        line(300, 380, 480, 380)
        line(300, 20, leftSide, 20)
        line(leftSide, 20, leftSide, 380)
        line(300, 380, leftSide, 380)
        line(this.leftX, 20, this.leftX, 380)
        //image (this.buffer,0,0,400,400)
        pop()
        if (this.leftX == 480 && this.currPage >= 1 && !this.pageSelected) {
            this.leftX = 120;
            this.currPage--;
            this.velocity = 0;
        }
        super.Draw(x, y)
    }
    updateCoverPage() {
        this.coverPage.fill(255)
        this.coverPage.noStroke()
        this.coverPage.rect(0, 0, 400, 800);
        this.coverPage.fill(0)
        this.coverPage.textAlign(CENTER)
        this.coverPage.textFont("Times New Roman")
        this.coverPage.textSize(50)
        this.coverPage.text("A Memoir", 200, 150)
        this.coverPage.textSize(30)
        this.coverPage.text("For Adrienne", 200, 210)
        this.coverPage.text("By TJ", 200, 250)
        this.coverPage.fill(255, 108, 180)
        this.coverPage.beginShape()
        this.coverPage.vertex(50, 450)
        this.coverPage.vertex(100, 400)
        this.coverPage.vertex(200, 475)
        this.coverPage.vertex(300, 400)
        this.coverPage.vertex(350, 450)
        this.coverPage.vertex(200, 700)
        this.coverPage.endShape()
    }
    updatePage(index) {
        const page = this.pages[index]
        page.fill(255)
        page.rect(0, 0, 800, 800);


        if (index == 0) {
            page.push()
            page.noFill()
            page.stroke(0)
            page.strokeWeight(2)
            for (let i = 0; i < 30; i++) {
                if (this.time % 1 + i * 0.5 - 1 <= 0) {
                    continue
                }
                page.circle(600, 600, (80 * ((this.time % 1) + i * 0.5 - 1)))
            }
            page.strokeWeight(4)
            for (let i = 0; i < 30; i++) {
                if (this.time % 1 + i * 0.5 - 1 <= 0) {
                    continue
                }
                page.circle(500, 700, (120 * ((this.time % 1) + i * 0.5 - 1)))
            }
            page.strokeWeight(5)
            for (let i = 0; i < 30; i++) {
                if (this.time % 1 + i * 0.5 - 1 <= 0) {
                    continue
                }
                page.circle(400, 400, (120 * ((this.time % 1) + i * 0.5 - 1)))
            }
            page.pop()
        }


        if (index < Assets.memoirPages.length) {
            page.image(Assets.memoirPages[index], 0, 0, 800, 800)
        }
        page.noStroke()
        page.fill(0)
        page.textSize(20)
        page.textAlign(RIGHT)
        page.textFont("Arial")
        page.text(`${index + 1}/${this.pages.length}`, 780, 780);
        page.textSize(40)
        page.textAlign(CENTER)
        page.text(this.pagetitles[index], 400, 50)


        if (index == 1) {
            page.stroke(0)
            page.line(50, 450, 750, 350)
            page.noStroke()
            if (this.time % 8 < 4) {
                page.fill(0)
                for (let i = 0; i < 20; i++) {
                    const x = noise(i * 1.5);
                    const y = noise(i * -1.5 + 5);
                    page.circle(x * 600 + 200, y * 300 + 450, (1 - abs(this.time % 4 - 2) / 2) * 10)
                }
            } else {
                page.fill(abs(this.time % 4 - 2) * 255 / 2)
                page.text("Will you be", 400, 600)
                page.text("my girlfriend?", 400, 650)
            }
            page.fill(0)
        page.textAlign(LEFT)
            const texts = ["If I could write you ", "just one thing, I'd write you ", "a love letter.  "]
            const currText = texts[floor((this.time % 15) / 5)]
            const progress = 1-abs(this.time % 5 - 2.5)/2.5;
            page.text(currText.substring(0,ceil (progress * currText.length)) + (this.time % 1 < 0.7 ? "_" : ""), 200, 250)

        }
    }
}