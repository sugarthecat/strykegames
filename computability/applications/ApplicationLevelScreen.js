//best circuit per application name: { circuit, components }
//value is recomputed from the components, since architectures can improve after saving
const bestApplications = {}

const APP_BOARD = { x: 10, y: 62, w: 390, h: 270 }
const APP_NODE = { w: 90, h: 34 }
const APP_PORT_RADIUS = 6
const WIRE_COLORS = { bool: [60, 110, 230], int: [220, 60, 60], string: [40, 170, 70] }

function getArchitecture(name) {
  return architectures.find((architecture) => architecture.name == name)
}

//architectures can only be used once they have a valid saved layout
function isArchitectureUsable(name) {
  return bestArchitectures[name] !== undefined
}

function getApplicationValue(application, componentNames) {
  let kept = 1
  let cost = 0
  for (const name of componentNames) {
    const architecture = getArchitecture(name)
    const layout = bestArchitectures[name].layout
    kept *= max(0, 1 - getArchitectureSlowdown(architecture, layout))
    cost += architecture.cost
  }
  return application.value * kept - cost
}

function getIncomeRate() {
  let income = 0
  for (const name in bestApplications) {
    const application = applications.find((app) => app.name == name)
    income += getApplicationValue(application, bestApplications[name].components)
  }
  return income
}

function formatValue(value) {
  return `${round(value * 10) / 10}`
}

class ApplicationLevelScreen extends GUI {
  constructor() {
    super()
    this.application = null
    this.nodes = []
    this.tool = null
    this.held = null
    this.testResult = null
  }
  Load(application) {
    this.application = application
    this.held = null
    this.testResult = null
    this.nodes = []
    for (let k = 0; k < application.inputs.length; k++) {
      const x = APP_BOARD.x + APP_BOARD.w * (k + 1) / (application.inputs.length + 1) - APP_NODE.w / 2
      this.nodes.push(this.CreateNode("input", application.inputs[k].name, [], [application.inputs[k]], x, APP_BOARD.y + 5))
    }
    for (let k = 0; k < application.outputs.length; k++) {
      const x = APP_BOARD.x + APP_BOARD.w * (k + 1) / (application.outputs.length + 1) - APP_NODE.w / 2
      this.nodes.push(this.CreateNode("output", application.outputs[k].name, [application.outputs[k]], [], x, APP_BOARD.y + APP_BOARD.h - APP_NODE.h - 5))
    }
    const best = bestApplications[application.name]
    if (best) {
      this.LoadCircuit(best.circuit)
    }
    this.elements = [new Button(20, 340, 100, 40, "Back", () => { screenOn = "applications" })]
    this.testButton = new Button(130, 340, 100, 40, "Test", () => this.Test())
    this.elements.push(this.testButton)
    const tools = architectures.filter((architecture) => unlocked.has(architecture.name) && isArchitectureUsable(architecture.name)).map((architecture) => architecture.name)
    this.tool = tools[0] ?? null
    for (let k = 0; k < tools.length; k++) {
      const button = new Button(420, 180 + k * 50, 160, 40, tools[k], () => { this.tool = tools[k] })
      button.tool = tools[k]
      this.elements.push(button)
    }
  }
  CreateNode(kind, name, inputs, outputs, x, y) {
    return {
      kind: kind,
      name: name,
      inputs: inputs.map((port) => ({ name: port.name, type: port.type, conn: null })),
      outputs: outputs.map((port) => ({ name: port.name, type: port.type })),
      x: x,
      y: y
    }
  }
  CreateComponent(name, x, y) {
    const architecture = getArchitecture(name)
    return this.CreateNode("component", name, architecture.inputs, architecture.outputs, x, y)
  }
  getComponentNames() {
    return this.nodes.filter((node) => node.kind == "component").map((node) => node.name)
  }
  //input and output nodes are rebuilt by Load in the same order, so only components and wires are stored
  SaveCircuit() {
    return {
      components: this.nodes.filter((node) => node.kind == "component").map((node) => ({ name: node.name, x: node.x, y: node.y })),
      wires: this.nodes.map((node) => node.inputs.map((port) => port.conn ? { node: this.nodes.indexOf(port.conn.node), idx: port.conn.idx } : null))
    }
  }
  LoadCircuit(circuit) {
    for (const component of circuit.components) {
      this.nodes.push(this.CreateComponent(component.name, component.x, component.y))
    }
    for (let n = 0; n < this.nodes.length; n++) {
      for (let k = 0; k < this.nodes[n].inputs.length; k++) {
        const wire = circuit.wires[n][k]
        this.nodes[n].inputs[k].conn = wire ? { node: this.nodes[wire.node], idx: wire.idx } : null
      }
    }
  }
  getValue() {
    return getApplicationValue(this.application, this.getComponentNames())
  }
  //returns the output values, with undefined for anything not fully connected
  Evaluate(inputValues) {
    const cache = new Map()
    const evaluateNode = (node) => {
      if (cache.has(node)) {
        return cache.get(node)
      }
      let result
      if (node.kind == "input") {
        result = [inputValues[this.nodes.indexOf(node)]]
      } else {
        const args = node.inputs.map((port) => port.conn ? evaluateNode(port.conn.node)[port.conn.idx] : undefined)
        if (args.some((arg) => arg === undefined)) {
          result = []
        } else if (node.kind == "output") {
          result = args
        } else {
          result = getArchitecture(node.name).evaluateInput(args)
          if (!Array.isArray(result)) {
            result = [result]
          }
        }
      }
      cache.set(node, result)
      return result
    }
    return this.nodes.filter((node) => node.kind == "output").map((node) => evaluateNode(node)[0])
  }
  Test() {
    const failures = []
    for (const testCase of this.application.testCases) {
      const actual = this.Evaluate(testCase.input)
      if (testCase.output.some((expected, k) => actual[k] !== expected)) {
        failures.push({ input: testCase.input, expected: testCase.output, actual: actual })
      }
    }
    this.testResult = { failures: failures, total: this.application.testCases.length }
    if (failures.length == 0) {
      this.SaveIfBest()
    }
  }
  SaveIfBest() {
    const value = this.getValue()
    const best = bestApplications[this.application.name]
    if (value >= 0 && (!best || value > getApplicationValue(this.application, best.components))) {
      bestApplications[this.application.name] = { circuit: this.SaveCircuit(), components: this.getComponentNames() }
    }
  }
  //any change to the circuit invalidates the last test
  Changed() {
    this.testResult = null
  }
  getPortPosition(node, side, k) {
    const ports = side == "input" ? node.inputs : node.outputs
    return {
      x: node.x + APP_NODE.w * (k + 1) / (ports.length + 1),
      y: side == "input" ? node.y : node.y + APP_NODE.h
    }
  }
  getHoveredPort(x, y) {
    for (const node of this.nodes) {
      for (const side of ["input", "output"]) {
        const ports = side == "input" ? node.inputs : node.outputs
        for (let k = 0; k < ports.length; k++) {
          const pos = this.getPortPosition(node, side, k)
          if (dist(x, y, pos.x, pos.y) <= APP_PORT_RADIUS + 3) {
            return { node: node, side: side, idx: k, port: ports[k] }
          }
        }
      }
    }
    return null
  }
  getHoveredNode(x, y) {
    for (let n = this.nodes.length - 1; n >= 0; n--) {
      const node = this.nodes[n]
      if (x >= node.x && x <= node.x + APP_NODE.w && y >= node.y && y <= node.y + APP_NODE.h) {
        return node
      }
    }
    return null
  }
  //the input port whose wire passes under the mouse
  getHoveredWire(x, y) {
    for (const node of this.nodes) {
      for (let k = 0; k < node.inputs.length; k++) {
        const conn = node.inputs[k].conn
        if (!conn) {
          continue
        }
        const a = this.getPortPosition(conn.node, "output", conn.idx)
        const b = this.getPortPosition(node, "input", k)
        const t = constrain(((x - a.x) * (b.x - a.x) + (y - a.y) * (b.y - a.y)) / max(1, (b.x - a.x) ** 2 + (b.y - a.y) ** 2), 0, 1)
        if (dist(x, y, a.x + t * (b.x - a.x), a.y + t * (b.y - a.y)) <= 4) {
          return { node: node, idx: k, port: node.inputs[k] }
        }
      }
    }
    return null
  }
  inBoard(x, y) {
    return x >= APP_BOARD.x && x <= APP_BOARD.x + APP_BOARD.w && y >= APP_BOARD.y && y <= APP_BOARD.y + APP_BOARD.h
  }
  //true if target's value is needed to compute node
  DependsOn(node, target) {
    if (node == target) {
      return true
    }
    return node.inputs.some((port) => port.conn && this.DependsOn(port.conn.node, target))
  }
  Connect(from, to) {
    //from is an output port, to is an input port
    if (from.port.type != to.port.type || this.DependsOn(from.node, to.node)) {
      return
    }
    to.port.conn = { node: from.node, idx: from.idx }
    this.Changed()
  }
  HandleMousePress(x, y) {
    if (this.testResult) {
      this.testResult = null
      return
    }
    if (!this.inBoard(x, y)) {
      return
    }
    const port = this.getHoveredPort(x, y)
    if (port) {
      this.held = { type: "wire", port: port }
      return
    }
    const node = this.getHoveredNode(x, y)
    if (node) {
      if (node.kind == "component") {
        this.held = { type: "node", node: node, dx: node.x - x, dy: node.y - y }
      }
      return
    }
    if (this.tool != null) {
      const component = this.CreateComponent(this.tool, 0, 0)
      this.MoveNode(component, x - APP_NODE.w / 2, y - APP_NODE.h / 2)
      this.nodes.push(component)
      this.Changed()
    }
  }
  HandleMouseRelease(x, y) {
    if (this.held && this.held.type == "wire") {
      const target = this.getHoveredPort(x, y)
      if (target && target.side != this.held.port.side) {
        if (target.side == "input") {
          this.Connect(this.held.port, target)
        } else {
          this.Connect(target, this.held.port)
        }
      }
    }
    this.held = null
  }
  MoveNode(node, x, y) {
    node.x = constrain(x, APP_BOARD.x, APP_BOARD.x + APP_BOARD.w - APP_NODE.w)
    node.y = constrain(y, APP_BOARD.y, APP_BOARD.y + APP_BOARD.h - APP_NODE.h)
  }
  HandleRightClick(x, y) {
    if (!this.inBoard(x, y)) {
      return
    }
    const port = this.getHoveredPort(x, y)
    if (port && port.side == "input") {
      port.port.conn = null
      this.Changed()
      return
    }
    const node = this.getHoveredNode(x, y)
    if (node && node.kind == "component") {
      this.nodes.splice(this.nodes.indexOf(node), 1)
      for (const other of this.nodes) {
        for (const input of other.inputs) {
          if (input.conn && input.conn.node == node) {
            input.conn = null
          }
        }
      }
      this.Changed()
      return
    }
    const wire = this.getHoveredWire(x, y)
    if (wire) {
      wire.port.conn = null
      this.Changed()
    }
  }
  Draw(x, y) {
    if (this.held && this.held.type == "node") {
      this.MoveNode(this.held.node, x + this.held.dx, y + this.held.dy)
    }
    const value = this.getValue()
    this.testButton.active = value >= 0
    background(255)
    super.Draw(x, y)
    this.DrawBoard(x, y)
    this.DrawSelectedTool()
    this.DrawPalette()
    const best = bestApplications[this.application.name]
    push()
    noStroke()
    fill(0)
    textAlign(LEFT, CENTER)
    textSize(20)
    text(`Value: ${formatValue(value)}`, 410, 20)
    textSize(15)
    text(`Best: ${best ? formatValue(getApplicationValue(this.application, best.components)) : "-"}`, 410, 45)
    textSize(11)
    textAlign(LEFT, TOP)
    text(this.application.description, APP_BOARD.x, 35, APP_BOARD.w, 26)
    textSize(22)
    if (textWidth(this.application.name) > APP_BOARD.w) {
      textSize(textSize() * APP_BOARD.w / textWidth(this.application.name))
    }
    textAlign(CENTER, CENTER)
    text(this.application.name, APP_BOARD.x + APP_BOARD.w / 2, 18)
    textSize(12)
    textAlign(LEFT, CENTER)
    text("Right click to delete", 240, 360)
    pop()
    this.DrawTestResult()
    this.DrawTooltip(x, y)
  }
  DrawBoard(x, y) {
    push()
    stroke(0)
    strokeWeight(2)
    fill(245)
    rect(APP_BOARD.x, APP_BOARD.y, APP_BOARD.w, APP_BOARD.h)
    strokeWeight(3)
    for (const node of this.nodes) {
      for (let k = 0; k < node.inputs.length; k++) {
        const conn = node.inputs[k].conn
        if (conn) {
          const a = this.getPortPosition(conn.node, "output", conn.idx)
          const b = this.getPortPosition(node, "input", k)
          stroke(WIRE_COLORS[node.inputs[k].type])
          line(a.x, a.y, b.x, b.y)
        }
      }
    }
    if (this.held && this.held.type == "wire") {
      const pos = this.getPortPosition(this.held.port.node, this.held.port.side, this.held.port.idx)
      stroke(WIRE_COLORS[this.held.port.port.type])
      line(pos.x, pos.y, x, y)
    }
    const hovered = this.getHoveredNode(x, y)
    for (const node of this.nodes) {
      stroke(0)
      strokeWeight(2)
      fill(node.kind == "component" ? 255 : 220)
      if (node == hovered && node.kind == "component") {
        fill(230)
      }
      rect(node.x, node.y, APP_NODE.w, APP_NODE.h, 4)
      noStroke()
      fill(0)
      textSize(11)
      textAlign(CENTER, CENTER)
      text(node.name, node.x + 3, node.y, APP_NODE.w - 6, APP_NODE.h)
      stroke(0)
      strokeWeight(1)
      for (const side of ["input", "output"]) {
        const ports = side == "input" ? node.inputs : node.outputs
        for (let k = 0; k < ports.length; k++) {
          const pos = this.getPortPosition(node, side, k)
          fill(WIRE_COLORS[ports[k].type])
          circle(pos.x, pos.y, APP_PORT_RADIUS * 2)
        }
      }
    }
    pop()
  }
  //type of the hovered port or wire
  DrawTooltip(x, y) {
    if (this.testResult) {
      return
    }
    const port = this.getHoveredPort(x, y)
    let label = null
    if (port) {
      label = `${port.port.name} (${port.port.type})`
    } else {
      const wire = this.getHoveredWire(x, y)
      if (wire) {
        label = wire.port.type
      }
    }
    if (label == null) {
      return
    }
    push()
    textSize(10)
    textAlign(LEFT, CENTER)
    stroke(0)
    strokeWeight(1)
    fill(255)
    rect(x + 8, y - 8, textWidth(label) + 10, 16)
    noStroke()
    fill(0)
    text(label, x + 13, y)
    pop()
  }
  DrawTestResult() {
    if (!this.testResult) {
      return
    }
    const failures = this.testResult.failures
    push()
    stroke(0)
    strokeWeight(3)
    fill(255)
    rect(30, 110, 350, 170, 15)
    noStroke()
    textAlign(LEFT, TOP)
    textSize(16)
    if (failures.length == 0) {
      fill(0, 150, 0)
      text(`All ${this.testResult.total} cases passed`, 45, 125)
    } else {
      fill(180, 0, 0)
      text(`${failures.length} of ${this.testResult.total} cases failed`, 45, 125)
      fill(0)
      textSize(10)
      const formatValues = (ports, values) => ports.map((port, k) => `${port.name} = ${values[k] === undefined ? "nothing" : values[k]}`).join(", ")
      for (let k = 0; k < min(failures.length, 4); k++) {
        const failure = failures[k]
        text(`${formatValues(this.application.inputs, failure.input)}\n  expected ${formatValues(this.application.outputs, failure.expected)}, got ${formatValues(this.application.outputs, failure.actual)}`, 45, 150 + k * 28, 325)
      }
      if (failures.length > 4) {
        text(`...and ${failures.length - 4} more`, 45, 262)
      }
    }
    pop()
  }
  //title and description of the selected component, above the palette
  DrawSelectedTool() {
    if (this.tool == null) {
      return
    }
    const architecture = getArchitecture(this.tool)
    const layout = bestArchitectures[this.tool].layout
    push()
    noStroke()
    fill(0)
    textAlign(CENTER, CENTER)
    textSize(18)
    if (textWidth(architecture.name) > 180) {
      textSize(textSize() * 180 / textWidth(architecture.name))
    }
    text(architecture.name, 500, 80)
    textSize(10)
    textAlign(LEFT, TOP)
    text(`${architecture.description}\n\nSlowdown: ${formatSlowdown(getArchitectureSlowdown(architecture, layout))}\nCost: ${architecture.cost}`, 415, 98, 175, 80)
    pop()
  }
  //selection marker around the tool buttons
  DrawPalette() {
    push()
    noFill()
    stroke(0)
    strokeWeight(4)
    for (const button of this.elements) {
      if ("tool" in button && button.tool == this.tool) {
        rect(button.x - 4, button.y - 4, button.w + 8, button.h + 8, 6)
      }
    }
    pop()
  }
}
