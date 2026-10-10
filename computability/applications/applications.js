const applications = [
    {
        name: "Disagreer",
        description: "When given an input, return the opposite of that input.",
        value: 50,
        inputs: [{ name: "Input", type: "bool" }],
        outputs: [{ name: "Output", type: "bool" }],
        testCases: [
            { input: [true], output: [false] },
            { input: [false], output: [true] },
        ]
    },
    {
        name: "Consistency Checker",
        description: "When given an input, output true if and only if every input is true.",
        value: 200,
        inputs: [{ name: "Input A", type: "bool" }, { name: "Input B", type: "bool" }],
        outputs: [{ name: "Output", type: "bool" }],
        testCases: [
            { input: [true, true], output: [true] },
            { input: [true, false], output: [false] },
            { input: [false, true], output: [false] },
            { input: [false, false], output: [false] },
        ]
    },
    {
        name: "Multiple Choice Validator",
        description: "When given an input, output true if and only exactly one input is true.",
        value: 300,
        inputs: [{ name: "Choice A", type: "bool" }, { name: "Choice B", type: "bool" }, { name: "Choice C", type: "bool" }],
        outputs: [{ name: "Output", type: "bool" }],
        testCases: [
            { input: [true, true, true], output: [false] },
            { input: [true, false, true], output: [false] },
            { input: [false, true, true], output: [false] },
            { input: [false, false, true], output: [true] },
            { input: [true, true, false], output: [false] },
            { input: [true, false, false], output: [true] },
            { input: [false, true, false], output: [true] },
            { input: [false, false, false], output: [false] },
        ]
    },
]