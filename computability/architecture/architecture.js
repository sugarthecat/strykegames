const architectures = [
    {
        name: "Nand Computer",
        description: "Outputs false if A and B are both true. Outputs true otherwise.",
        inputs: [{ name: "A", type: "bool" }, { name: "B", type: "bool" }],
        outputs: [{ name: "Output", type: 'bool' }],
        evaluateInput: (inputs) => !(inputs[0] && inputs[1]),

        engDescription: "Requires 3 CPUs",
        graph: {
            "1": ["2", "3"],
            "2": ["1", "3"],
            "3": ["1", "2"],
        },
        isValid: function(graph){
            //TODO: check if graph["1"], etc are instances of CPU
            return true
        }
    }
]