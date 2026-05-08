const levels = [
    {
        author: "Unclaimed",
        code: "garden",
        title: "Garden",
        description: "Can you help me grow the vegetables?",
        completionMessage: "It's been a great year working with you.",
        defaultType: "dirt",
        tileW: 5,
        tileH: 5,
        currencies: ["coins"],
        goalPerSecond: { coins: 80 },
        maxBalance: { coins: 250 },
        tileShop: [
            {
                price: { coins: 5 },
                name: "Wheat",
                description: "Earns 1 coin.",
                type: "wheat",
                avail: 21,
                owned: 3
            },
            {
                price: { coins: 20 },
                name: "Corn",
                description: "Earns 4 coins if adjacent to wheat.",
                type: "corn",
                avail: 12,
                owned: 0
            },
            {
                price: { coins: 50 },
                name: "Strawberry Patch",
                description: "Earns 8 coins if adjacent to only strawberries.",
                type: "strawberry",
                avail: 8,
                owned: 0
            }
        ]
    },
    {
        author: "Oculus",
        code: "farm",
        title: "The Farm",
        description: "The Farm",
        completionMessage: "It's been a great year working with you.",
        defaultType: "dirt",
        tileW: 6,
        tileH: 6,
        currencies: ["coins"],
        goalPerSecond: { coins: 132 },
        maxBalance: { coins: 250 },
            tileShop: [
                {
                    price: { coins: 5 },
                    name: "Wheat",
                    description: "Gains 1 coin.",
                    type: "wheat",
                    avail: 25,
                    owned: 5
                },
                {
                    price: { coins: 12 },
                    name: "Grain Silo",
                    description: "Gains 1 coin per adjacent wheat.",
                    type: "silo",
                    avail: 15,
                    owned: 0
                },
                {
                    price: { coins: 25 },
                    name: "Dirt Road",
                    description: "Extends Adjacency.",
                    type: "dirtroad",
                    avail: 20,
                    owned: 0
                },
            ]
    },
    {
        author: "Jester & Zephyr",
        code: "sunmoon",
        title: "Sun & Moon",
        description: "The Sun & The Moon. Level by Sherman.",
        completionMessage: "We just wanted to say how much we appreciate you Houston. Your guidance, your company, your patience, and your eye for design. You always made working with the HUNT a fantastic place to make memories. We will miss brain storming the large scale operation with you, but we definitely look forward to picking your brain at play testing. See you at trivia night. Loves, ",
        defaultType: "sky",
        tileW: 5,
        tileH: 5,
        currencies: ["coins"],
        goalPerSecond: { coins: 27 },
        maxBalance: { coins: 250 },
            tileShop: [
                {
                    price: { coins: 5 },
                    name: "Cloud",
                    description: "Makes the sky look nice. ",
                    type: "cloud",
                    avail: 15,
                    owned: 5
                },
                {
                    price: { coins: 10 },
                    name: "Sun",
                    description: "Earns 1 coin per adjacent cloud. Has no income if it shares a row, column, or corner with another sun.",
                    type: "sun",
                    avail: 4,
                    owned: 1
                },
                {
                    price: { coins: 15 },
                    name: "Moon",
                    description: "Earns 1 coin per adjacent cloud. Has no income if it shares a row, column, or corner with another moon.",
                    type: "moon",
                    avail: 4,
                    owned: 1
                }
            ]
    },/*
    {
        author: "Voltaire",
        code: "brat",
        title: "Getting BRAT-ty",
        description: "Voltaire please write this",
        completionMessage: "It's been a great year working with you.",
        defaultType: "floor",
        tileW: 6,
        tileH: 6,
        currencies: ["records"],
        goalPerSecond: { records: 25 },
        maxBalance: { records: 250 },
            tileShop: [
            ]
    },*/
    {
        author: "Sherman",
        code: "datacenter",
        title: "Datacenter",
        description: "The Headquarters is under construction!",
        completionMessage: "Toodles!",
        defaultType: "floor",
        tileW: 8,
        tileH: 6,
        currencies: ["compute", "bandwidth"],
        goalPerSecond: { bandwidth: 60, compute: 115 },
        maxBalance: { bandwidth: 500, compute: 1000 },
        tileShop: [
            {
                price: { bandwidth: 0, compute: 10 },
                name: "Server Rack",
                description: "Provides 1 compute.",
                type: "serverrack",
                avail: 20,
                owned: 4
            },
            {
                price: { bandwidth: 3, compute: 5 },
                name: "Edge Router",
                description: "Provides 1 bandwidth",
                type: "edgerouter",
                avail: 8,
                owned: 1
            },
            {
                price: { bandwidth: 20, compute: 40 },
                name: "Coolant Tank",
                description: "Doubles compute of adjacent server racks.",
                type: "coolanttank",
                avail: 6,
                owned: 0
            },
            {
                price: { bandwidth: 36, compute: 180 },
                name: "Signal Processor",
                description: "Each edge router the signal processor is connected to gains 1 more bandwidth.",
                type: "signalp",
                avail: 6,
                owned: 0
            },
            {
                price: { bandwidth: 125, compute: 300 },
                name: "Terminal",
                description: "Provides 10 compute if adjacent to exactly 2 signal processors.",
                type: "terminal",
                avail: 4,
                owned: 0
            }
        ]
    },
]
