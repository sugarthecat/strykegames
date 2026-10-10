const chipTypes = [
    {
        name: "CPU",
        description: "The hub for processing information on a computer. Applies a slowdown of 1/efficiency.",
        xDim: 3,
        yDim: 3,
        allowedComponents: ["ALU","FPU"],
        arDescription: "Applies a slowdown of 1/efficiency.",
        cdDescription: "Efficiency is the minimum of the sum of compute, and the minimum of speed. Maximize efficiency.",
        color: [220, 120, 60],
        //layout maps each vertex to a chip type name; graph is the architecture's adjacency list
        getSlowdown: function (efficiency, layout, vertex, graph) {
            return 1 / efficiency
        },
        //stats: the stats of every placed component
        evaluate: function (stats) {
            if (stats.length == 0) {
                return 0
            }
            let compute = 0
            let speed = Infinity
            for (const stat of stats) {
                compute += stat.compute
                speed = min(speed, stat.speed)
            }
            return min(compute, speed)
        }
    }
]

const chipComponents = [
    {
        name: "ALU",
        description: "Provides one compute, and has a speed of 20",
        color: [90, 140, 220],
        //grid[i][j] is a component name or null; use getAdjacent(grid, i, j) for neighbor rules
        getStats: function (grid, i, j) {
            return { compute: 1, speed: 20 }
        }
    },
    {
        name: "FPU",
        description: "Provides two compute, and has a speed of 15",
        color: [0, 220, 220],
        //grid[i][j] is a component name or null; use getAdjacent(grid, i, j) for neighbor rules
        getStats: function (grid, i, j) {
            return { compute: 2, speed: 15 }
        }
    },

]