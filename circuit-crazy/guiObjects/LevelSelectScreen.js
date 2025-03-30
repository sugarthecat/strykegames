
let levelsUnlocked = 1;
let levelOn = 0;
class LevelSelectScreen extends GUI {
    constructor() {
        super();
        this.ResetLevels();
        this.elements.push(new Button(585, 15, 60, 30, "⇦", function () { screenOn = "title"; }))
    }
    Draw(x, y) {
        push()

        background(241, 234, 210)
        for (let i = -OFFSET.x + (frameCount / 10 % 50); i < 800 + OFFSET.x; i += 50) {
            stroke(230, 222, 194)
            strokeWeight(25)
            line(i, -OFFSET.y, i - 200, 400 + OFFSET.y)
        }
        fill(195, 66, 59)
        textSize(50)
        text("Level Select", 300, 75)
        pop()
        super.Draw(x, y)
    }
    ResetLevels() {
        let levels = []
        //Level 1: count 0
        levels.push({ items: [ConstantNode, OutputNode], inputs: [], instructions: "If you have x tigers and y lions, how many apples do you have?" })

        //Level 2: count tigers
        levels.push({ items: [ConstantNode, InputNode, OutputNode], inputs: ["X"], instructions: "If you have x tigers, how many tigers do you have?" })

        //Level 3: Add tigers
        levels.push({ items: [ConstantNode, InputNode, AddNode, OutputNode], inputs: ["X", "Y"], instructions: "If you have x tigers in one enclosure, y in the other, and 3 roaming the zoo, how many tigers do you have?" })

        //4: And gate
        levels.push({ items: [ConstantNode, InputNode, AddNode, MultNode, OutputNode], inputs: ["X", "Y", "Z"], instructions: "Given 3 integers, x, y, and z, that can be either 0 or 1, return 1 if all of them are 1, and 0 otherwise." })

        //5: NAND gate
        levels.push({ items: [ConstantNode, InputNode, AddNode, SubNode, MultNode, OutputNode], inputs: ["X", "Y", "Z"], instructions: "Given 3 integers, x, y and z, that can be either 0 or 1, return 1 if any of them are 0, and 0 otherwise." })

        //6: Divide tigers
        levels.push({ items: [ConstantNode, InputNode, AddNode, SubNode, MultNode, DivNode, OutputNode], inputs: ["X", "Y"], instructions: "If you distribute Y steaks equally to X tigers, how many steaks does each tiger get, assuming excess steaks are thrown out?" })

        //7: Mod tigers 
        levels.push({ items: [ConstantNode, InputNode, AddNode, SubNode, MultNode, DivNode, OutputNode], inputs: ["X", "Y"], instructions: "You have x tigers. You put them into y packs. Each pack has the same number of tigers-- any leftover tigers form duos. How many duos are there?" })

        //8: mini-collatz
        levels.push({ items: [ConstantNode, InputNode, AddNode, SubNode, MultNode, DivNode, OutputNode], inputs: ["N"], instructions: "Given an integer n, if n is even return n/2. If n is odd, return 3n + 1." })

        //9: Exactly-2 gate
        levels.push({ items: [ConstantNode, InputNode, AddNode, SubNode, MultNode, DivNode, OutputNode], inputs: ["X", "Y", "Z"], instructions: "Given 3 integers, x, y and z, that can be either 0 or 1, return 1 if exactly two of them are 1, and 0 otherwise." })

        //10: Sum of integers to n
        levels.push({ items: [ConstantNode, InputNode, AddNode, SubNode, MultNode, DivNode, OutputNode], inputs: ["N"], instructions: "What is the sum of all integers up to N?" })

        //11: exponents
        levels.push({ items: [ConstantNode, InputNode, AddNode, SubNode, MultNode, DivNode, ExpNode, OutputNode,], inputs: ["N", "K"], instructions: "A tiger has n stripes. Each stripe could be k colors. How many possible stripe patterns could this tiger have?" })

        //12: circular permutation
        levels.push({ items: [ConstantNode, InputNode, AddNode, SubNode, MultNode, DivNode, FactorialNode, ExpNode, OutputNode], inputs: ["N"], instructions: "How many ways can you arrange n unique tigers in a circle, ignoring rotations?" })

        //13: choose function
        levels.push({ items: [ConstantNode, InputNode, AddNode, SubNode, MultNode, DivNode, FactorialNode, ExpNode, OutputNode], inputs: ["X", "Y"], instructions: "There are X tigers. You need to form a group of Y tigers for a hackathon. How many different ways can you make a group?" })

        //14: box theorem
        levels.push({ items: [ConstantNode, InputNode, AddNode, SubNode, MultNode, DivNode, FactorialNode, ChooseNode, ExpNode, OutputNode], inputs: ["X", "Y"], instructions: "How many different ways could you give X identical steaks to Y unique tigers?" })

        //15: Loud Combinatorics
        levels.push({ items: [ConstantNode, InputNode, AddNode, SubNode, MultNode, DivNode, FactorialNode, ChooseNode, ExpNode, OutputNode], inputs: [], instructions: "How many ways are there to choose N codes which are K-digit or shorter binary sequences" })



        this.elements = []
        for (let i = 0; i < 15; i++) {
            if (levelsUnlocked > i) {
                let lvl = i;
                this.elements.push(new LevelButton(75 + 100 * (i % 5), 150 + 80 * floor(i / 5), 60, 60, (i + 1).toString(),
                    function () {
                        screenOn = "editor";
                        levelOn = lvl + 1;
                        screens.editor.Reset(levels[lvl].items, levels[lvl].inputs, levels[lvl].instructions)
                    }
                ))
            }
        }
    }
}