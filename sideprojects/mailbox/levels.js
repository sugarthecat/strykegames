
class Level {
    constructor(centerX, centerY, nodes, minOn, lines=[]) {
        this.x = centerX;
        this.y = centerY;
        this.nodes = nodes;
        for(let i = 0; i<nodes.length; i++){
            let node = nodes[i]
            for(let j = 0; j<node.connectedNodeIndexes.length; j++){
                node.connect(nodes[node.connectedNodeIndexes[j]])
            }
        }
        this.minScore = minOn;
        this.lines = lines
    }
    reset(){
        for(let i = 0; i<this.nodes.length; i++){
            this.nodes[i].on = false;
        }
    }
    getScore(){
        let score = 0;
        for(let i = 0; i<this.nodes.length; i++){
            if(this.nodes[i].on){
                score++;
            }
        }
        return score;
    }
    correct(){
        for(let i = 0; i<this.lines.length; i++){
            for(let j = 0; j<this.lines[i].length; j++){
                let node = this.nodes[this.lines[i][j]]
                if(!node.on){
                    node.toggle();
                }
            }
        }
    }
}
class Node {
    constructor(centerX, centerY, connectedNodes) {
        this.x = centerX;
        this.y = centerY;
        this.connectedNodeIndexes = connectedNodes;
        this.neighbors = []
        this.on = false;
    }
    connect(otherNode){
        if(!this.neighbors.includes(otherNode)){
            this.neighbors.push(otherNode);
            otherNode.neighbors.push(this)
        }
    }
    toggle(){
        this.on = !this.on;
        if(this.on){
            for(let i = 0; i<this.neighbors.length; i++)[
                this.neighbors[i].on = false
            ]
        }
    }
}
const symbLevels = [
    new Level(0, 0, [ //W
        new Node(0, -80, []), 
        new Node(160, -80, []), 
        new Node(-160, -80, []), 
        new Node(-80, 80, []), 
        new Node(80, 80, []), 
        new Node(-80, 0, [0,2,3]), 
        new Node(80, 0, [0,1,4]), 
    ], 5, [[2,3,0,4,1]]),
    new Level(200, 0, [ //i
        new Node(0, 0, []), 
        new Node(0, 80, []), 
        new Node(-40, 0, [0,1,3]), 
        new Node(40, 0, [0,1,2]), 
        new Node(0, -80, [2,3]), 
    ], 3, [[0,1],[4]]),
    new Level(320, 0, [ //l
        new Node(0, -80, []), 
        new Node(0, 80, []), 
        new Node(-40, 0, [0,1,3]), 
        new Node(40, 0, [0,1,2]), 

    ], 2,[[0,1]]),
    new Level(430, 0, [ //l
        new Node(0, -80, []), 
        new Node(0, 80, []), 
        new Node(-40, -40, [0,1,3,4]), 
        new Node(40, -40, [0,1]), 
        new Node(-40, 40, [0,1,3]), 
        new Node(40, 40, [0,1,2,3,4]), 
    ], 2,[[0,1]]),
    new Level(600, 0, [ //y
        new Node(-40, -80, []), 
        new Node(40, -80, []), 
        new Node(0, 80, []), 
        new Node(0, 0, []), 
        new Node(-40, 80, [0,2,3]), 
        new Node(40, 80, [1,2,3]), 
        new Node(0, -80, [0,1,3]), 
    ], 4,[[0,3],[1,3,2]]),
    new Level(725, 0, [ //o
        new Node(-40,0, []), 
        new Node(40, 0, []), 
        new Node(-40, 80, []), 
        new Node(40, 80, []), 
        new Node(0, 40, [0,1,2,3]), 
        new Node(0, -40, [0,1,4]), 
    ], 4,[[0,1,3,2,0]]),
    new Level(850, 0, [ //u
        new Node(-40,0, []), 
        new Node(40, 0, []), 
        new Node(-40, 80, []), 
        new Node(40, 80, []), 
        new Node(-40, 40, [0,2]), 
        new Node(40, 40, [1,3,4]), 
        new Node(0, 0, [0,4,1,5]), 
    ], 4,[[0,2,3,1]]),
    new Level(1050, 0, [ //b
        new Node(-40,0, []), 
        new Node(40, 0, []), 
        new Node(-40, 80, []), 
        new Node(40, 80, []), 
        new Node(-40, -80, []), 
        new Node(40, -80, [1,4]), 
        new Node(0, -40, [0,1,4,5]), 
        new Node(0, 40, [0,1,2,3]), 
    ], 5,[[4,0,1,3,2,0]]),
    new Level(1200, 0, [ //e
        new Node(-40,0, []), 
        new Node(40, 0, []), 
        new Node(-40, 80, []), 
        new Node(40, 80, []), 
        new Node(-40, 40, []), 
        new Node(40, 40, []), 
        new Node(0, 20, [0,1,4,5]), 
        new Node(0, 60, [2,3,4,5]), 
    ], 6, [[3,2,0,1,5,4,0]]), //
    new Level(0, 300, [ //m
        new Node(0, 80, []), 
        new Node(80, 80, []), 
        new Node(-80, 80, []), 
        new Node(-40, -80, []), 
        new Node(40, -80, []), 
        new Node(-40, 0, [0,2,3]), 
        new Node(40, 0, [0,1,4,5]), 
    ], 5, [[2,3,0,4,1]]),
    new Level(150, 300, [ //y
        new Node(-40, -80, []), 
        new Node(40, -80, []), 
        new Node(0, 80, []), 
        new Node(0, 0, []), 
        new Node(40, -40, [0,2,3]), 
        new Node(-40, -40, [1,2,3]), 
        new Node(0, -40, [0,1,3]), 
        new Node(0, -80, [0,1,6]), 
    ], 4, [[0,3],[1,3,2]]),
    new Level(400, 300, [ //g
        new Node(-40, -80, []), 
        new Node(40, -80, []), 
        new Node(0, 40, [4,5]), 
        new Node(0, -40, [0,1,2]), 
        new Node(-40, 80, []), 
        new Node(40, 80, []), 
        new Node(-20, 0, [0,4,7]), 
        new Node(20, 0, []), 
    ], 5, [[1,0,4,5,7]]),
    new Level(500, 300, [ //i
        new Node(0, 0, []), 
        new Node(0, 80, []), 
        new Node(0, -80, []), 
        new Node(-40, -40, [0,2]), 
        new Node(40, 40, [0,1]), 
        new Node(40, -40, [0,2,3,4]), 
        new Node(-40, 40, [0,1,3,4]), 
    ], 3, [[0,1],[2]]),
    new Level(610, 300, [ //r
        new Node(-40, -80, [1,3]),
        new Node(-40, 0, []), 
        new Node(-40, 80, []),  
        new Node(40, -80, [4,1]),
        new Node(40, 0, [0]), 
        new Node(40, 80, [4,2,1])
    ], 3, [[2,1,4]]),
    new Level(710, 300, [ //l
        new Node(0, -80, []), 
        new Node(0, 80, []), 
        new Node(20, -40, [0,1]), 
        new Node(-20, 40, [0,1,2]), 
    ], 2, [[0,1]]),

    new Level(810, 300, [ //f
        new Node(-40, -80, []), 
        new Node(-40, 0, []), 
        new Node(-40, 80, []), 
        new Node(0, -40, [0,1,6]), 
        new Node(0, 40, [1,2,6]), 
        new Node(40, -80, []), 
        new Node(40, 0, []), 
        new Node(40, 80, [2,6]), 
    ], 5,[[0,1,2],[5,0],[6,1]]), 

    new Level(930, 300, [ //r
        new Node(0, -40, [1,3]),
        new Node(-40, 0, []), 
        new Node(-40, 80, []),  
        new Node(0, -80, [4,1]),
        new Node(40, 0, [0]), 
        new Node(40, 80, [4,2,1])
    ], 3, [[2,1,4]]),
    new Level(1050, 300, [ //i
        new Node(0, 0, []), 
        new Node(0, 80, []), 
        new Node(-40, 40, [0,1,3]), 
        new Node(-40, -40, [0,1,2]), 
        new Node(0, -80, [2,3]), 
    ], 3, [[0,1],[4]]),
    new Level(1130, 300, [ //e
        new Node(-40,0, []), 
        new Node(40, 0, []), 
        new Node(-40, 80, []), 
        new Node(40, 80, []), 
        new Node(-40, 40, []), 
        new Node(40, 40, []), 
        new Node(0, 0, [0,1,4,5]), 
        new Node(0, 80, [2,3,4,5]), 
        new Node(0, 40, [0,1,2,3,4,5]), 
    ], 6,[[3,2,0,1,5,4,0]]), //
    new Level(1250, 300, [ //n
        new Node(-40, 0, []), 
        new Node(-40, 80, []), 
        new Node(40, 0, []), 
        new Node(40, 80, []), 
        new Node(0, -40, [0,2]), 
        new Node(0, 40, [0,1,2,3]), 
        new Node(0, 120, [1,3]), 
    ], 4,[[1,0,2,3]]),
    new Level(1375, 300, [ //d
        new Node(40,0, []), 
        new Node(-40, 0, []), 
        new Node(40, 80, []), 
        new Node(-40, 80, []), 
        new Node(40, -80, []), 
        new Node(0, -80, [0,4]), 
        new Node(0, 0, [0,1,5,7]), 
        new Node(0, 80, [2,3]), 
        new Node(-40, -40, [0,1,4,5]), 
        new Node(-40, 40, [3,1]),
    ], 5,[[4,0,2,3,1,0]]),
    new Level(1475, 300, [ //?
        new Node(0,80, []), 
        new Node(0, 0, []), 
        new Node(40, -40, []),
        new Node(0, -80, []), 
    ], 4,[[0],[1,2,3]]),
]