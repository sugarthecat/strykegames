class CoreScreen extends SatelliteScreen {
  constructor() {
    super()
    this.elements.push(new GUIText(20, 20, 560, 60, "Core"))
  }
  Draw(x, y) {
    super.Draw(x, y);
  }
}



// Story: Losing yourself into a problem
// Initially, only the core is unlocked 
//
// Character's name: Alonzo
// Stage 1: Send letter to family, tell them you're working on something in the basement
// req: nothing, just visit core
// unlocks: Chip design
// Stage 2: Send letter to family, tell them you've started working on something great
// req: Chip with certain stats
// unlocks: Architecture
// Stage 3: Send letter to family, ask for tech magazine
// req: Component with certain stats
// unlocks: Applications
// Stage 4: Send letter to family, ask for internet access
// req: Succesful Application
// unlocks: Research
// Stage 5: Send letter to university, sharing results
// req: certain research results
// unlocks: new chip parts
// Stage 6: Send letter to tech company, sharing results
// req: certain income level
// unlocks: new chip parts
// Stage 7: Send letter to family, and then rolls credits.
// req: certain research level.
// unlocks: credits



// Overall game design:
//
//
// Chip Design - Houston, We Have A Problem
// Each "Chip" to be designed is a Houston, We Have A Problem grid, except without the currency system, only the income
// optimization. New chip components, and chip types can be unlocked via research. Each chip optimized some stat, 
// which is an numerical arbitrary metric that the Architecture level uses.
// 
// Architecture - new mechanic
// Each "architecture" problem is a graph which represents an Applications component. It has a requirement of a certain
// number of certain chips, and each chip has some upside/downside on the performance of the component. This is variable and arbitrary,
// one chip may half the slowdown, but provide a minimum slowdown as a function of its design.
// The player places the chips on the vertices of this graph, to minimize slowdown.
//
// Applications - Circuit Crazy mechanics
// Contains similar mechanics to Circuit Crazy, with each "application" being a component used.
// One difference to circuit crazy is that there are distinct wire types, instead of all integer wires. The hover text specifies the type,
// and the wire type is also specified with color. Blue = boolean, red = integer, green = string.
// Each task has an "economic value", which is the profit you gain from solving the problem. 
// However, each component has two drawbacks: 'slowdown', which is a multiple applied to economic value, 
// and 'cost', which is subtracted from economic value after the end
// Overall, the formula for the value of an application is the economic value times the product of (1 - slowdown) for each component,
// minus the sum of the costs. A slowdown of 0.01 (1%) keeps 0.99 of the value.
// The costs are constant, and the slowdowns are a function of the architecture of the componentsib
// 
// Research - Tech Tree
// each research item has a name, description, minimum income rate, and total money required. Note that money isn't stored.
// therefore, the research takes money / income rate to finish.
// needs the minimum income rate, and can only do one research at a time.
// note: some research can 'fail', and provide no results. You're betting time and money on ideas.
// after a succesful bet, you may unlock new research opportunities, new chip components, new applications, new components, etc