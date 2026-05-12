const levels = [
    {
        author: "Starling",
        code: "garden",
        title: "Garden",
        description: "Uh oh! It's crunch week, and the vegetable garden isn't growing right. Somebody has to help us fix this garden, so the septists can get proper nutrition! \n\nLevel by Sherman",
        completionMessage: "Houston— I'm so proud of you and everything you've accomplished during your time in the Hunt. You are the most hard working and dedicated person I know. I'm so lucky to know and love you. Congratulations on retirement!",
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
        description: "We found the best location for a metapuzzle this year! It's just down the road in Christiansburg. Can you help us secure a location for this year's meta?",
        completionMessage: "I could never find the words to properly thank you for everything you have done for the team this year. Your mentorship and guidance will forever be remembered and missed. I can't wait to see what you do next!",
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
        author: "Magus",
        code: "wizard",
        title: "Magus's Magic MacGuffins",
        description: "Mad Magus is running amuck once more. More dungeons! More squares! More madness!",
        completionMessage: "Throughout my year as a Septist, and even some of my time as a Hunter, your positivity and attitude have been inspirational. Furthermore, you've been a true joy to work with and get to know. I'll miss you loads, Houston. <3\n\n"
            + "Sincerely,",
        defaultType: "floor",
        tileW: 3,
        tileH: 3,
        currencies: ["coins", "gems"],

        goalPerSecond: { coins: 60, gems: 10 },
        maxBalance: { coins: 500, gems: 100 },
        tileShop: [
            {
                price: { coins: 5, gems: 0 },
                name: "Power Crystal",
                description: "Earns 3 coin.",
                type: "crystal",
                avail: 0,
                owned: 2
            },
            {
                price: { coins: 5, gems: 0 },
                name: "Spellbook",
                description: "Earns 10 gems if coin income is at most 60.",
                type: "spellbook",
                avail: 2,
                owned: 0
            },
            {
                price: { coins: 5, gems: 5 },
                name: "Skull",
                description: "Loses 4 coin.",
                type: "skull",
                avail: 3,
                owned: 0
            },
            {
                price: { coins: 5, gems: 5 },
                name: "Bookshelf",
                description: "Earns coins equal to its row number.",
                type: "bookshelf",
                avail: 2,
                owned: 0
            },
            {
                price: { coins: 5, gems: 5 },
                name: "Dungeon",
                description: "Loses coins equal to its column number.",
                type: "dungeon",
                avail: 2,
                owned: 0
            },
            {
                price: { coins: 50, gems: 20 },
                name: "Conduit Tower",
                description: "Produces 17 coins if in the same row or column as another conduit tower, but not adjacent, without any non-floor tiles inbetween.",
                type: "conduit",
                avail: 4,
                owned: 0
            },
        ]
    },
    {
        author: "Creature & The Stranger",
        code: "arcade",
        title: "Game Time",
        description: "Houston, we went a little overboard with our hosting duties and we may have told everyone we would turn our apartment into an arcade...oopsies. Could you help us keep our fellow septists happy and gain some revenue for puzzle assets? We can pay you in tokens and pizza :)\n Level by Sherman.",
        completionMessage: "You did it, Houston! Thank you so much for your many many contributions over the years. You are actually the best and it can sometimes be intimidating, but we all love you and appreciate your help. Be warned, however, that we may still message you for assistance out of habit. Don't be a stranger! We kinda already have one of those.",
        defaultType: "carpet",
        tileW: 6,
        tileH: 6,
        currencies: ["tokens","pizza"],
        goalPerSecond: { tokens: 25, pizza: 22 },
        maxBalance: { tokens: 250, pizza: 100 },
        tileShop: [
            {
                price: { tokens: 5, pizza: 1 },
                name: "Arcade Machine",
                description: "Earns 1 token per adjacent arcade machine.",
                type: "arcade",
                avail: 4,
                owned: 2
            },
            {
                price: { tokens: 5, pizza: 2 },
                name: "Chair",
                description: "Earns 1 pizza if adjacent to a table.",
                type: "chair",
                avail: 7,
                owned: 1
            },
            {
                price: { tokens: 5, pizza: 3 },
                name: "Table",
                description: "Lets adjacent chairs earn pizza.",
                type: "table",
                avail: 3,
                owned: 1
            },
            {
                price: { tokens: 30, pizza: 8 },
                name: "Prize Booth",
                description: "Earns 1 token per arcade machine connected by carpet. Must be on the left or right edge of the map.",
                type: "prizebooth",
                avail: 2,
                owned: 0
            },
            {
                price: { tokens: 40, pizza: 15 },
                name: "Pizza Shop",
                description: "Earns 1 pizza per chair connected by carpet that is next to a table. Must be on the edge of the map.",
                type: "pizzashop",
                avail: 2,
                owned: 0
            },
        ]
    },
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
        author: "Jester & Zephyr",
        code: "sunmoon",
        title: "Sun & Moon",
        description: "It's almost launch night, and with how times of day are changing- we don't know when to start. Help us align the skies, and plan accordingly! \n\nLevel by Sherman.",
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
        author: "Sherman",
        code: "datacenter",
        title: "Datacenter",
        description: "Houston! Those online hunters have been going crazy over our chatOHO model. We're getting super heavy network traffic. Can you help me set up our datacenter?",
        completionMessage: "It's been a great year working with you. I've learned a lot about working with systems I don't understand, and seen how our shared craft of web design makes the world go 'round.\n "
            + "Thank you for inspiring it all,",
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
