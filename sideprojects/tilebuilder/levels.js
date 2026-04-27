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
        author: "Sherman",
        code: "datacenter",
        title: "VTHunt Datacenter",
        description: "The VTHunt Headquarters is under construction!",
        completionMessage: "It's been a great year working with you.",
        defaultType: "floor",
        tileW: 8,
        tileH: 6,
        currencies: ["compute", "bandwidth"],
        goalPerSecond: { bandwidth: 20, compute: 20 },
        maxBalance: { bandwidth: 1000, compute: 500 },
        tileShop: [
            {
                price: { bandwidth: 0, compute: 0 },
                name: "Server Rack",
                description: "Provides 1 compute.",
                type: "serverrack",
                avail: 20,
                owned: 4
            },
            {
                price: { bandwidth: 0, compute: 0 },
                name: "Edge Router",
                description: "Provides 1 bandwidth",
                type: "edgerouter",
                avail: 8,
                owned: 1
            },
            {
                price: { bandwidth: 0, compute: 0 },
                name: "Coolant Tank",
                description: "Doubles compute of adjacent server racks.",
                type: "coolanttank",
                avail: 5,
                owned: 1
            },
            {
                price: { bandwidth: 0, compute: 0 },
                name: "Terminal",
                description: "Decided later",
                type: "terminal",
                avail: 3,
                owned: 1
            },
            {
                price: { bandwidth: 0, compute: 0 },
                name: "Signal Processor",
                description: "Decided later",
                type: "signalp",
                avail: 5,
                owned: 1
            }
        ]
    },
]
