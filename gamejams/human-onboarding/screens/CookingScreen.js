
const finished_sandwiches = []
const ingredients = [
]
class CookingScreen extends GUI {
    constructor() {
        super();
        this.errorMessage = "Not Known"
        this.selectedDraggable = null;
        this.phase = 0;
        this.onGrill = [];
        this.sandwich = [];
        const ref = this;
        this.elements = [
            new Button(490, 280, 80, 30, "Serve", function () {
                if (!ref.CheckCanServe()) {
                    ref.elements[0].active = false;
                    return
                }
                ref.errorMessage = "";
                finished_sandwiches.push(ref.sandwich)
                ref.sandwich = []
                ref.elements[0].active = false;
                ref.phase++;
                if (ref.phase === 4) {
                    screenOn = "transition";
                    screens.transition.Reset("monologue", "You call that food? Interesting.")
                    screens.monologue.Reset("nut", "Visual art is the hardest for me to grasp because it seems functionally irrelevant, "
                        + "yet humans constantly create and consume it. Food is also vexing in this way."
                        + " Food at least has a purpose; sustenance, but humans have created thousands of different foods,"
                        + " and deem certain food ‘good’ or ‘bad’."
                        + "It seems like a waste of effort for something that gives you energy the same no matter what."
                        + " Humor. 99% of human speech is irrelevant. I can’t understand. More intense testing is required…", 20)
                }
            }, false),
            new Button(490, 320, 80, 30, "Trash", function () {
                ref.sandwich = []
                ref.elements[0].active = false;
                ref.elements[1].active = false;
            }, false)]
        ingredients.push(
            {
                img_raw: Assets.cooking.cheese.raw,
                img_cooked: Assets.cooking.cheese.cooked,
                img_overcooked: Assets.cooking.cheese.overcooked,
                cook_time: 2,
                overcook_time: 5,
            },
            {
                img_raw: Assets.cooking.bread.raw,
                img_cooked: Assets.cooking.bread.cooked,
                img_overcooked: Assets.cooking.bread.overcooked,
                cook_time: 3,
                overcook_time: 10,
            },
            {
                img_raw: Assets.cooking.patty.raw,
                img_cooked: Assets.cooking.patty.cooked,
                img_overcooked: Assets.cooking.patty.overcooked,
                cook_time: 10,
                overcook_time: 25,
            },
            {
                img_raw: Assets.cooking.circuit_board,
                img_cooked: Assets.cooking.circuit_board,
                img_overcooked: Assets.cooking.circuit_board,
                cook_time: 1,
                overcook_time: 2,
            },
            {
                img_raw: Assets.cooking.bacon.raw,
                img_cooked: Assets.cooking.bacon.cooked,
                img_overcooked: Assets.cooking.bacon.overcooked,
                cook_time: 6,
                overcook_time: 14,
            },
            {
                img_raw: Assets.cooking.paper.raw,
                img_cooked: Assets.cooking.paper.cooked,
                img_overcooked: Assets.cooking.paper.overcooked,
                cook_time: 1,
                overcook_time: 2,
            },
        )
    }
    HandleMouseDown(x, y) {
        for (let i = 0; i < ingredients.length; i++) {
            const xPos = 50 + (i % 2 == 0 ? 80 : 0);
            const yPos = 90 + 80 * floor(i / 2);
            if (x > xPos && x < xPos + 60 && y > yPos && y < yPos + 60) {
                this.selectedDraggable = {
                    cook_time: 0,
                    id: i
                }
            }
        }
        for (let i = 0; i < this.onGrill.length; i++) {
            if (dist(x, y, this.onGrill[i].x, this.onGrill[i].y) < 30) {
                this.selectedDraggable = this.onGrill[i];
                this.onGrill.splice(i, 1);
                break;
            }
        }
        if (x > 325 && x < 425 && y > 250 && y < 380 && this.sandwich.length !== 0) {
            this.selectedDraggable = this.sandwich.pop()
            if (this.sandwich.length === 0) {
                this.elements[0].active = false;
                this.elements[1].active = false;
            }
        }
    }
    Draw(x, y) {
        super.Draw(x, y)
        push()
        noStroke()
        fill(0)
        textSize(16)
        textAlign(CENTER)
        textFont('Trebuchet MS')
        if (this.phase === 0) {
            text("Make a plain Grilled Cheese.", 300, 20)
        }
        if (this.phase === 1) {
            text("Make a dish that reminds you of home.", 300, 20)
        }
        if (this.phase === 2) {
            text("Make a Double Bacon Cheeseburger.", 300, 20)
        }
        if (this.phase === 3) {
            text("Make an optimum dish that inspires the future.", 300, 20)
        }
        textSize(12)
        fill(255, 0, 0)
        if (!this.elements[0].active && this.sandwich.length > 0) {
            textAlign(LEFT)
            text(this.errorMessage, 490, 225, 80, 200)
        }
        this.DrawGrill()
        this.DrawSandwichBoard();
        //draw selectable stuff
        noStroke()
        for (let i = 0; i < ingredients.length; i++) {
            const xPos = 50 + (i % 2 == 0 ? 80 : 0);
            const yPos = 90 + 80 * floor(i / 2);
            fill(255)
            rect(xPos - 3, yPos - 3, 66, 66)
            fill(200)
            rect(xPos, yPos, 60, 60)
            fill(255)
            rect(xPos + 2, yPos + 2, 56, 56)
            push()
            translate(xPos + 5 + 25, yPos + 5 + 25)
            for (let j = 0; j <= 3; j++) {
                push()
                translate(0, -j * 3)
                image(ingredients[i].img_raw, -25, -25, 50, 50)
                pop()
            }
            pop()
        }
        pop()
        super.DrawElements(x, y);
        //draw draggable
        if (this.selectedDraggable !== null) {
            this.DrawItem(this.selectedDraggable, x, y)
        }
        if (this.selectedDraggable !== null && !mouseIsPressed) {
            if (x > 250 && y > 60 && x < 550 && y < 210) {
                this.onGrill.push({
                    id: this.selectedDraggable.id,
                    cook_time: this.selectedDraggable.cook_time,
                    x: x,
                    y: y,
                })
            } else if (x > 250 && x < 500 && y > 250 && y < 380) {
                this.sandwich.push(this.selectedDraggable);
                this.elements[0].active = true;
                this.elements[1].active = true;
            }
            this.selectedDraggable = null;
        }
    }
    CheckCanServe() {
        if (this.phase == 0) {
            if (this.sandwich.length > 3) {
                this.errorMessage = "Too much stuff!"
                return false;
            }
            if (this.sandwich.length < 3) {
                this.errorMessage = "Not enough stuff!"
                return false;
            }
            if (this.sandwich[1].id !== 0) {

                this.errorMessage = "There's no cheese!"
                return false;
            }
            if (this.sandwich[1].cook_time < 2) {
                this.errorMessage = "This cheese isn't grilled!"
                return false;
            }
            if (this.sandwich[1].cook_time > 6) {
                this.errorMessage = "You burnt the cheese!"
                return false;
            }
            if (this.sandwich[0].id !== 1 || this.sandwich[2].id !== 1) {
                this.errorMessage = "You need bread on the ends!"
                return false;
            }
            if (this.sandwich[0].cook_time < 3
                || this.sandwich[2].cook_time < 3) {
                this.errorMessage = "This bread isn't crisp!"
                return false
            }
            if (this.sandwich[0].cook_time < 10
                && this.sandwich[2].cook_time < 10) {
                return true
            }
            this.errorMessage = "You burnt the bread!"
            return false
            //plain grilled cheese: 2 cooked slices of bread
        } else if (this.phase == 1) {
            if (this.sandwich.length < 2) {
                this.errorMessage = "Put some effort in!"
                return false;
            }
            return true
        } else if (this.phase == 2) {
            //double bacon cheeseburger: 2 slices of bread on top / below, max 3 slices of bread, no chips or paper
            let breadCount = 0;
            let cheseCount = 0;
            let pattyCount = 0;
            let baconCount = 0;
            for (let i = 0; i < this.sandwich.length; i++) {
                if (this.sandwich[i].id === 3) {
                    this.errorMessage = "There's electronics in here!"
                    return false;
                }
                if (this.sandwich[i].id === 5) {
                    this.errorMessage = "There's paper in here!"
                    return false;
                }
                if (this.sandwich[i].id === 0) {
                    cheseCount++;
                    if (this.sandwich[i].cook_time > 6) {
                        this.errorMessage = "You burnt the cheese!"
                        return false;
                    }
                    if (this.sandwich[i].cook_time < 2) {
                        this.errorMessage = "You didn't melt the cheese!"
                        return false;
                    }
                }
                if (this.sandwich[i].id === 1) {
                    breadCount++;
                    if (this.sandwich[i].cook_time > 10) {
                        this.errorMessage = "You burnt the bread!"
                        return false;
                    }
                }
                if (this.sandwich[i].id === 2) {
                    pattyCount++;
                    if (this.sandwich[i].cook_time > 25
                    ) {
                        this.errorMessage = "You burnt the patty!"
                        return false;
                    }
                    if (this.sandwich[i].cook_time < 10
                    ) {
                        this.errorMessage = "This patty is raw!"
                        return false;
                    }
                }
                if (this.sandwich[i].id === 4) {
                    baconCount++;
                    if (this.sandwich[i].cook_time > 14
                    ) {
                        this.errorMessage = "You burnt the bacon!"
                        return false;
                    }
                    if (this.sandwich[i].cook_time < 6
                    ) {
                        this.errorMessage = "This bacon is raw!"
                        return false;
                    }
                }
            }
            if (this.sandwich[0].id !== 1 || this.sandwich[this.sandwich.length - 1].id !== 1) {
                //needs top and buttom bun
                this.errorMessage = "You need buns on your burger!"
                return false;
            }
            if (breadCount > 3) {
                this.errorMessage = "That's too much bread!"
                return false
            }
            if (cheseCount > 3) {
                this.errorMessage = "That's too much cheese!"
                return false
            }
            if (pattyCount > 2) {
                this.errorMessage = "That's too many patties!"
                return false
            }
            if (pattyCount < 2) {
                this.errorMessage = "That's not enough patties!"
                return false
            }
            if (baconCount > 3) {
                this.errorMessage = "That's too much bacon!"
                return false
            }
            if (baconCount < 2) {
                this.errorMessage = "That's not enough bacon!"
                return false
            }
            if (cheseCount < 2) {
                this.errorMessage = "That's not enough cheese!"
                return false
            }
            return true;
        } else if (this.phase == 3) {
            let circuitCount = 0;
            let paperCount = 0;
            for (let i = 0; i < this.sandwich.length; i++) {
                if (this.sandwich[i].id === 3) {
                    circuitCount++;
                }
                if (this.sandwich[i].id === 5) {
                    paperCount++;
                }
            }
            if (circuitCount == 0) {
                this.errorMessage = random(["Could be more innovative.", "Under-optimized for hardware.", "Analog."])
                return false;
            }
            if (paperCount == 0) {
                this.errorMessage = random(["Needs to be research-supported.", "Needs deeper study.", "Unscientific."])
                return false;
            }
            if (this.sandwich.length < 3) {
                this.errorMessage = random(["This is too simple.", "Lacking in complexity.", "Undersized."])
                return false;
            }
            if (this.sandwich.length > 5) {
                this.errorMessage = random(["Bloated with technical debt.", "Far too complex.", "Oversized."])
                return false;
            }
            if (this.sandwich[0].id !== 5) {
                this.errorMessage = random(["Start with your research.", "Use a paper as a jumping-off point.", "Add an abstract at the start."])
                return false;
            }
            if (this.sandwich[this.sandwich.length - 1].id !== 3) {
                this.errorMessage = random(["End with a strong algorithm.", "Finish on a vision for the future.", "Back it up in the end with some code."])
                return false;
            }
            return true
        }
    }
    DrawGrill() {
        push()

        //draw grill

        //embers / fire underneath
        const interp_dist = 6
        for (let i = 0; i < 5; i++) {

            fill(255, i * 40, 0)
            rect(250 + i * interp_dist, 60 + i * interp_dist, 300 - i * interp_dist * 2, 150 - i * interp_dist * 2, 10)
        }
        //bars (width 10)
        fill(100)
        rect(245, 55, 310, 10)
        rect(245, 205, 310, 10)
        for (let x = 0; x <= 10; x++) {
            rect(245 + 30 * x, 55, 10, 160)
        }
        for (let i = 0; i < this.onGrill.length; i++) {
            const item = this.onGrill[i]
            item.cook_time += deltaTime / 1000
            for (let i = 0; i < 5; i++) {
                fill(255, i * 50, 0)
                circle(item.x, item.y, min(max(0, ingredients[item.id].overcook_time - item.cook_time), 1) * (35 - i * 5 + (i * 3 + 1) * cos(item.cook_time * 10 + i)))

            }
            this.DrawItem(item, item.x, item.y)
        }
        pop()

    }
    DrawItem(item, x, y) {

        if (item.cook_time > ingredients[item.id].overcook_time) {
            image(ingredients[item.id].img_overcooked, x - 25, y - 25, 50, 50)
        } else if (item.cook_time > ingredients[item.id].cook_time) {
            image(ingredients[item.id].img_cooked, x - 25, y - 25, 50, 50)
        } else {
            image(ingredients[item.id].img_raw, x - 25, y - 25, 50, 50)
        }
    }
    DrawSandwichBoard() {
        fill('#d1b06d')
        const centerX = 270 + 220 / 2;
        const cetnerY = 230 + 140 / 2;
        rect(245, 240, 240, 140, 20)
        stroke('#a37550')
        strokeWeight(10)
        rect(255, 250, 220, 120, 10)
        strokeWeight(3)
        line(centerX - 10, cetnerY - 5, centerX - 25, cetnerY + 32)
        line(centerX - 30, cetnerY - 25, centerX - 50, cetnerY - 15)
        line(centerX + 50, cetnerY + 5, centerX + 25, cetnerY - 12)
        line(centerX + 10, cetnerY - 5, centerX + 30, cetnerY - 15)
        line(centerX - 80, cetnerY + 35, centerX - 50, cetnerY + 45)
        for (let i = 0; i < this.sandwich.length; i++) {
            this.DrawItem(this.sandwich[i], 365, 320 - i * 5)
        }
    }
}