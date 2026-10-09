const research = [
    {
        name: "Economic Applications",
        description: "Investigate what Computers could be used for, economically.",
        fail: false,
        minIncome: 10,
        cost: 100,
        unlocks: ["Consistency Checker", "Computerized Testing"]
    },
    {
        name: "Computerized Testing",
        description: "Computers can be useful for conducting tests, since they store information rigidly and well.",
        fail: false,
        minIncome: 30,
        cost: 100,
        unlocks: ["Multiple Choice Validator"]
    },
    {
        name: "Experimental Hardware",
        description: "Research potential avenues for unorthodox and novel hardware.",
        fail: false,
        minIncome: 30,
        cost: 100,
        unlocks: ["Potato Supercomputer", "Floating Point Units"]
    },
    {
        name: "Floating Point Units",
        description: "Investigate the feasibility of creating a chip doing arithmetic in floating-point space",
        fail: false,
        minIncome: 10,
        cost: 300,
        unlocks: ["FPU"]
    },
    {
        name: "Potato Supercomputer",
        description: "Fund a lab to investigate the computational efficiency of potatoes.",
        fail: true,
        minIncome: 10,
        cost: 500,
        unlocks: []
    }
]