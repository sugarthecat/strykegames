const levels = [
    {
        author: "Starling",
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
        description: "The Sun & The Moon. \nLevel by Sherman.",
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
    },
    {
        author: "Magus",
        code: "wizard",
        title: "Wizard",
        description: "Jacob please write this (Unplayable at the moment, WIP)",
        completionMessage: "It's been a great year working with you.",
        defaultType: "floor",
        tileW: 3,
        tileH: 3,
        currencies: ["coins", "gems"],

        /*
        Conductor Towers:
        if(orthogonally aligned with another non-adjacent cond. tower && nothing is between this and that cond. tower)
            Produces +7

        Skulls:
        Produces -1

        Crystals:
        Produces +2

        Bookshelf:
        Produces +[Row number]

        Dungeon:
        Produces -[Column number]

        Spell Book:
        if(production <= 20)5
            Produces 5 secondary currency.
        */
       
        goalPerSecond: { coins: 20, gems: 5 },
        maxBalance: { coins: 500, gems: 100 },
        tileShop: [
            {
                price: { coins: 5, gems: 0 },
                name: "Crystal Growth",
                description: "Earns 2 coin",
                type: "crystal",
                avail: 18,
                owned: 2
            },
            {
                price: { coins: 5, gems: 0 },
                name: "Spellbook",
                description: "Earns 5 gems if coin income is at most 20.",
                type: "spellbook",
                avail: 18,
                owned: 2
            },
            {
                price: { coins: 5, gems: 5 },
                name: "Skull",
                description: "Loses 1 coin.",
                type: "skull",
                avail: 18,
                owned: 2
            },
            {
                price: { coins: 5, gems: 5 },
                name: "Bookshelf",
                description: "Earns coins equal to its row number.",
                type: "bookshelf",
                avail: 18,
                owned: 2
            },
            {
                price: { coins: 5, gems: 5 },
                name: "Dungeon",
                description: "Loses coins equal to its column number.",
                type: "dungeon",
                avail: 18,
                owned: 2
            },
            {
                price: { coins: 50, gems: 20 },
                name: "Conduit Tower",
                description: "Produces 7 coins if in the same row or column as another conduit tower, but not adjacent, without any non-floor tiles inbetween.",
                type: "conduit",
                avail: 18,
                owned: 2
            },
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
        author: "Zeitgeist",
        code: "chess",
        title: "Wizard's Gambit II",
        description: "Heyy Houston, so people left the chess pieces flying around Bollos everywhere. They need to be put back on the board. Can you help me organize the chessboard?",
        completionMessage: "Hi Houston. Thank you so much for everything you've done. We couldn't have done it without you. Thank you for helping me out endless amount of times, answering even more questions and all the fun conversations along the way. You’re awesome!! I’ll miss you a lot, and I really really hope to see you again someday. Thank you again for everything.",
        defaultType: "chessboard",
        tileW: 5,
        tileH: 5,
        currencies: ["coins"],
        goalPerSecond: { coins: 65 },
        maxBalance: { coins: 250 },
        tileShop: [
            {
                price: { coins: 5 },
                name: "Pawn",
                description: "Earns 1 coin. Fails if there are more than 8 pawns of either color.",
                type: "pawn",
                avail: 16,
                owned: 2
            },
            {
                price: { coins: 15 },
                name: "Rook",
                description: "Earns 3 coins if on the edge of the map. Fails if there are more than 2 rooks of either color. ",
                type: "rook",
                avail: 4,
                owned: 0
            },
            {
                price: { coins: 15 },
                name: "Bishop",
                description: "Earns 3 coins if not sharing a diagonal with any other bishop. Fails if there are more than 2 bishops of either color.",
                type: "bishop",
                avail: 4,
                owned: 0
            },
            {
                price: { coins: 15 },
                name: "Knight",
                description: "Earns 3 coins if adjacent to a bishop. Fails if there are more than 2 knights of either color.",
                type: "knight",
                avail: 4,
                owned: 0
            },
            {
                price: { coins: 50 },
                name: "King",
                description: "Earns 5 coins if not in check. Fails if there is more than 1 king of either color.",
                type: "king",
                avail: 2,
                owned: 0
            },
            {
                price: { coins: 50 },
                name: "Queen",
                description: "Earns 5 coins unless threatened by a knight. Fails if there is more than 1 queen of either color.",
                type: "queen",
                avail: 2,
                owned: 0
            }
        ]
    },
    {
        author: "Sherman",
        code: "datacenter",
        title: "Datacenter",
        description: "Houston! Those online hunters have been going crazy. We're getting super heavy network traffic. Can you help me set up our datacenter?",
        completionMessage: "It's been a great year working with you. I've learned a lot about working with systems I don't understand, and seen how our shared craft of web design makes the world go 'round.\n "
            + "",
        defaultType: "floor",
        tileW: 8,
        tileH: 6,
        currencies: ["compute", "bandwidth"],
        goalPerSecond: { bandwidth: 60, compute: 115 }, //60, 115
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
