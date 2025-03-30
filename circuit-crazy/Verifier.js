function getNumberRange() {
    let cases = []
    for (let i = 0; i < 12; i++) {
        cases.push([i])
    }
    return cases;
}
function getDualNumberRange() {
    let cases = []
    for (let i = 0; i < 12; i++) {
        for (let j = 0; j < 12; j++) {
            cases.push([j, i])
        }
    }
    return cases;
}
function getDualNumberRangeDecreasing() {
    let cases = []
    for (let i = 0; i < 12; i++) {
        for (let j = i; j < 12; j++) {
            cases.push([j, i])
        }
    }
    return cases;
}
function getDuoProblemDomain() {
    let cases = []
    for (let i = 3; i < 10; i++) {
        for (let j = 2; j < 40; j++) {
            if ((j % i) % 2 == 0) {
                cases.push([j, i])
            }
        }
    }
    return cases;
}
function factorial(n){
  if(n < 1) {
	return(1);
  }
  else {
    return(n*factorial(n-1));
  }
  
}
function getDuoProblemDomainSmall() {
    let cases = []
    for (let i = 1; i < 5; i++) {
        for (let j = 1; j < 6; j++) {
            if ((j % i) % 2 == 0) {
                cases.push([j, i])
            }
        }
    }
    return cases;
}
function getThreeBinaryDigits() {
    let cases = []
    for (let i = 0; i <= 1; i++) {
        for (let j = 0; j <= 1; j++) {
            for (let k = 0; k <= 1; k++) {
                cases.push([i, j, k])
            }
        }
    }
    return cases
}

function VerifyCurrentSolution() {
    const correctSolutions = [
        //count 0
        { inputs: getNumberRange, outputs: function (input) { return 0; } },
        //input to output
        { inputs: getNumberRange, outputs: function (input) { return input[0]; } },
        //Sum plus three
        { inputs: getDualNumberRange, outputs: function (input) { return input[0] + input[1] + 3; } },
        //All three 
        { inputs: getThreeBinaryDigits, outputs: function (input) { return input[0] * input[1] * input[2]; } },
        //NAND gate
        {
            inputs: getThreeBinaryDigits, outputs: function (input) {

                return 1 - (input[0] * input[1] * input[2]);
            }
        },
        //6: Tiger steak distribution
        {
            inputs: getDuoProblemDomain, outputs: function (input) {

                return floor(input[1] / (input[0]));
            }
        },
        //7: Tiger duos
        {
            inputs: getDuoProblemDomain, outputs: function (input) {

                return (input[0] % input[1]) / 2;
            }
        },
        //8: mini collatz
        {
            inputs: getNumberRange, outputs: function (input) {
                if (input[0] % 2 == 0) {
                    return input[0] / 2;
                } else {
                    return 3 * input[0] + 1;
                }
            }
        },
        //9: exactly-2 gate
        {
            inputs: getThreeBinaryDigits, outputs: function (input) {
                return (input[0] + input[1] + input[2]) == 2;
            }
        },
        //10: sum of digits up to N
        {
            inputs: getNumberRange, outputs: function (input) {
                return (input[0] + 1) * (input[0]) / 2;
            }
        },
        //11: n^k
        {
            inputs: getDuoProblemDomainSmall, outputs: function (input) {
                return (input[0]) ** (input[1]);
            }
        },
        //12: (n-1)!
        {
            inputs: getNumberRange, outputs: function (input) {
                return factorial(input[0]-1);
            }
        },
        //13: n choose k
        {
            inputs: getDualNumberRangeDecreasing, outputs: function (input) {
                return factorial(input[0]) / (factorial(input[1]) * factorial(input[0] - input[1]));
            }
        },
        //14: box theorem
        {
            inputs: getDuoProblemDomainSmall, outputs: function (input) {
                return factorial(input[0] + input[1] - 1) / (factorial(input[1] - 1) * factorial(input[0]));
            }
        },

        //15: 2^(n-1) choose k
        {
            inputs: getDuoProblemDomainSmall, outputs: function (input) {
                let n = input[0] - 1;
                let k = input[1];
                let total = 2 ** (n) - 1;
                return factorial(total) / (factorial(k) * factorial(total - k));
            }
        },
    ]
    //verify current level
    let solSet = correctSolutions[levelOn - 1];
    let data = solSet.inputs();
    let isTrue = true;
    let failCases = [];
    let succCases = [];
    for (let i = 0; i < data.length; i++) {
        let correctSolution = solSet.outputs(data[i]);
        let userSolution = screens.editor.EvaluateForInput(data[i]);
        if (!userSolution.complete) {
            userSolution.output = 0;
        }
        if (userSolution.output != correctSolution) {
            if (userSolution.complete) {
                failCases.push({ input: data[i], output: userSolution.output, correct: correctSolution })
            } else {
                failCases.push({ input: data[i], output: 0, correct: correctSolution })
            }
            isTrue = false;
        } else {
            succCases.push({ input: data[i], output: userSolution.output, correct: correctSolution })
        }
    }
    let successRate = succCases.length / data.length;
    let shownCases = []
    if (succCases.length > 0) {
        shownCases.push(succCases[0])
        succCases.shift()
    }
    while ((shownCases.length < 4 || (succCases.length == 0 && shownCases.length < 5)) && failCases.length > 0) {
        let rand = floor(random(failCases.length))
        shownCases.push(failCases[rand])
        failCases.splice(rand, 1);
    }
    while (shownCases.length < 5 && succCases.length > 0) {
        let rand = floor(random(succCases.length))
        shownCases.unshift(succCases[rand])
        succCases.splice(rand, 1);
    }
    return { success: isTrue, cases: shownCases, successRate: successRate }
}   