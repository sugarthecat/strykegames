const levels = [
    {
        author: "Unclaimed",
        code: "farm",
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
        author: "Jester & Zephyr",
        code: "sunmoon",
        title: "Sun & Moon",
        description: "Can you help me grow the vegetables?",
        completionMessage: "It's been a great year working with you.",
        defaultType: "sky",
        tileW: 6,
        tileH: 5,
        currencies: ["solar"],
        goalPerSecond: { solar: 80 },
        maxBalance: { solar: 250 },
            tileShop: [
                {
                    price: { solar: 5 },
                    name: "Star",
                    description: "Earns 1 solar energy.",
                    type: "star",
                    avail: 21,
                    owned: 3
                }
            ]
    },
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
        maxBalance: { bandwidth: 500, compute: 500 },
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
                description: "Each edge processor the signal processor is connected to gains 1 more bandwidth.",
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
