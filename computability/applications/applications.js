const applications = [
    {
        name: "Disagreer",
        description: "When given an input, return the opposite of that input.",
        value: 100,
        inputs: [{ name: "Input", type: "bool" }],
        outputs: [{ name: "Output", type: "bool" }],
        testCases: [
            { input: [true], output: [false] },
            { input: [false], output: [true] },
        ]
    },
    {
        name: "Consistency Checker",
        description: "When given an input, return true if and only if every input is true.",
        value: 500,
        inputs: [{ name: "Input A", type: "bool" }, { name: "Input B", type: "bool" }],
        outputs: [{ name: "Output", type: "bool" }],
        testCases: [
            { input: [true, true], output: [true] },
            { input: [true, false], output: [false] },
            { input: [false, true], output: [false] },
            { input: [false, false], output: [false] },
        ]
    },
]