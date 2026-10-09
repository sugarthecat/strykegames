const chipTypes = [
    {
        name: "CPU",
        description: "The hub for processing information on a computer.",
        cost: 10,
        xDim: 3,
        yDim: 3,
        allowedComponents: ["ALU"],
        cdDescription: "Efficiency is the minimum of the sum of compute, and the minimum of speed.",
        
    }
]

const chipComponents = [
    {
        name: "ALU",
        description: "Provides one compute, and has a speed of 20",
    }

]