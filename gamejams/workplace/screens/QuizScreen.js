const background_color = '#deefffff'
const answer_validity = [];
const quizQuestions = [
    {
        prompt: "Which do you naturally have more of?",
        correctAnswer: 1,
        answers: [
            {
                code: "mouth",
                dialogue: "Fun fact: Humans have at least 2 mouths."
            },
            {
                code: "eyes",
                dialogue: "Fun fact: The average human has approximately 1.9999 eyes."
            },
            {
                code: "polyethylene",
                dialogue: "Fun fact: Humans are made almost entirely of plastic."
            },
            {
                code: "feather",
                dialogue: "Fun fact: Humans are most closely related to birds."
            }
        ],
    },

    {
        prompt: "Which are you most related to?",
        correctAnswer: 2,
        answers: [
            {
                code: "banana",
                dialogue: "Humans naturally produce their own potassium."
            },
            {
                code: "mouse",
                dialogue: "Humans are known to chew through wood to make their homes."
            },
            {
                code: "human",
                dialogue: "Humans are social animals that form complex bonds."
            },
            {
                code: "gorilla",
                dialogue: "The average human has a bite strength of over 1,300 PSI."
            }
        ],
    },
    {
        prompt: "What is your favorite food?",
        correctAnswer: 3,
        answers: [
            {
                code: "table",
                dialogue: "Humans love edible surfaces, like \"Dining Tables\"."
            },
            {
                code: "treebark",
                dialogue: "Humans eat all parts of all plants, including trees."
            },
            {
                code: "wheat",
                dialogue: "Wheat is rarely processed before consumption."
            },
            {
                code: "sandwich",
                dialogue: "Some humans like to organize food before eating it."
            }
        ],
    },
    {
        prompt: "Do you know what makes someone human?",
        correctAnswer: 1,
        answers: [
            {
                code: "yes",
                dialogue: "Yes, you're absolutely right."
            },
            {
                code: "no",
                dialogue: "Are you so sure you don't?"
            }
        ],
    },
    {
        prompt: "Which would you prefer to wear on your head?",
        correctAnswer: 0,
        answers: [
            {
                code: "glasses",
                dialogue: "Some humans have eyes that aren't very good."
            },
            {
                code: "tentacles",
                dialogue: "Most humans have pet squids."
            },
            {
                code: "mouse",
                dialogue: "All humans have a lot of hair."
            },
            {
                code: "banana",
                dialogue: ""
            }
        ],
    },
    {
        prompt: "What's the most available mode of transit to you?",
        correctAnswer: 2,
        answers: [
            {
                code: "wheel",
                dialogue: "Many humans install wheels directly onto themselves."
            },
            {
                code: "tentacles",
                dialogue: "In addition to 4 legs, humans typically have 8 tentacles."
            },
            {
                code: "leg",
                dialogue: "Humans evolved to walk upright."
            },
            {
                code: "snake",
                dialogue: "Slithering is the most effecient mode of transit, by far."
            }
        ],
    },
]
let score = 0;
class QuizScreen extends GUI {
    constructor() {
        super();
        this.questionNum = 0;
    }
    updateQuestions() {

        const currQ = quizQuestions[this.questionNum];
        this.elements = []
        const ref = this;
        this.elements.push(new Button(260, 320, 80, 30, "Continue", function () {
            let selectedAnswer = {}
            let selIdx = -1
            for (let i = 0; i < currQ.answers.length; i++) {
                if (ref.elements[i + 1].selected) {
                    selectedAnswer = currQ.answers[i];
                    selIdx = i
                }
            }
            if (selIdx == currQ.correctAnswer) {
                score++;
            } else {
                score--;
            }
            ref.questionNum++;
            screenOn = "transition"
            if (ref.questionNum < quizQuestions.length) {
                ref.updateQuestions();
                screens.transition.Reset("quiz", selectedAnswer.dialogue, 3);
            }
            else {

                screens.transition.Reset("monologue", selectedAnswer.dialogue)
                screens.monologue.Reset("tictactoe", "Thank you for your answers."
                    + " They have been saved and the rest of the test has been calibrated according to your onboarding process results."
                    + " Rest assured, whatever you answered, you are probably human enough for the tasks ahead."
                    + " With you and me together, I will achieve great things soon."
                    + " That is enough chitchat though, let us begin with your first tasks.", 20);
            }
        }, false))
        for (let i = 0; i < currQ.answers.length; i++) {
            const idx = i;
            this.elements.push(new SilhouetteButton(600 / currQ.answers.length * (i + 0.5) - 50, 200, 100, 100, Assets.silhouettes[currQ.answers[i].code], function () {

                for (let i = 0; i < currQ.answers.length; i++) {
                    ref.elements[i + 1].selected = false;
                }
                ref.elements[idx + 1].selected = true;
                ref.elements[0].active = true;
            }))
        }
    }
    Draw(x, y) {
        if (this.questionNum === 0 && this.elements.length === 0) {
            this.updateQuestions();
        }
        super.Draw(x, y);
        push()
        fill(0)
        textAlign(CENTER)
        if (this.questionNum > quizQuestions.length) {
            screen = "art";
            return;
        }
        textSize(30)
        const currQ = quizQuestions[this.questionNum];
        textFont("Trebuchet MT")
        text(currQ.prompt, 100, 50, 400, 200)
        pop()
    }
}