const architectures = [
    {
        name: "Nand Computer",
        description: "Outputs false if A and B are both true. Outputs true otherwise.",
        inputs: [{ name: "A", type: "bool" }, { name: "B", type: "bool" }],
        outputs: [{ name: "Output", type: 'bool' }],
        evaluateInput: (inputs) => !(inputs[0] && inputs[1]),
        cost: 10,
        engDescription: "Requires 3 CPUs",
        graph: {
            "1": ["2", "3"],
            "2": ["1", "3"],
            "3": ["1", "2"],
        },
        //layout maps each vertex to a chip type name; every vertex is already filled when this is called
        isValid: function (layout) {
            return Object.values(layout).filter((chip) => chip == "CPU").length == 3
        }
    }
]