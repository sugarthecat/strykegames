//best layout per architecture name: { layout }
//slowdown is recomputed from the layout, since chip designs can improve after saving
const bestArchitectures = {}

const ARCH_GRAPH_AREA = { x: 20, y: 95, w: 360, h: 240 }
const ARCH_VERTEX_RADIUS = 28

function getChipType(name) {
  return chipTypes.find((chipType) => chipType.name == name)
}

function getChipEfficiency(name) {
  const design = bestChipDesigns[name]
  return design ? design.efficiency : 0
}

//null if the layout is incomplete or invalid, otherwise the component's slowdown
function getArchitectureSlowdown(architecture, layout) {
  const vertices = Object.keys(architecture.graph)
  if (vertices.some((vertex) => layout[vertex] == null) || !architecture.isValid(layout)) {
    return null
  }
  let kept = 1
  for (const vertex of vertices) {
    const chipType = getChipType(layout[vertex])
    const slowdown = chipType.getSlowdown(getChipEfficiency(chipType.name), layout, vertex, architecture.graph)
    kept *= max(0, 1 - slowdown)
  }
  return 1 - kept
}

function formatSlowdown(slowdown) {
  return slowdown == null ? "-" : `${round(slowdown * 1000) / 10}%`
}

class ArchitectureLevelScreen extends GUI {
  constructor() {
    super()
    this.architecture = null
    this.layout = {}
    this.positions = {}
    this.tool = null
  }
  Load(architecture) {
    this.architecture = architecture
    const best = bestArchitectures[architecture.name]
    const vertices = Object.keys(architecture.graph)
    this.layout = {}
    this.positions = {}
    const centerX = ARCH_GRAPH_AREA.x + ARCH_GRAPH_AREA.w / 2
    const centerY = ARCH_GRAPH_AREA.y + ARCH_GRAPH_AREA.h / 2
    const radius = vertices.length > 1 ? ARCH_GRAPH_AREA.h / 2 - ARCH_VERTEX_RADIUS - 5 : 0
    for (let k = 0; k < vertices.length; k++) {
      const angle = -HALF_PI + TWO_PI * k / vertices.length
      this.positions[vertices[k]] = { x: centerX + radius * cos(angle), y: centerY + radius * sin(angle) }
      this.layout[vertices[k]] = best ? best.layout[vertices[k]] : null
    }
    this.elements = [new Button(20, 340, 120, 40, "Back", () => { screenOn = "architecture" })]
    //chips without a working design can't be placed
    const tools = chipTypes.filter((chipType) => unlocked.has(chipType.name) && getChipEfficiency(chipType.name) > 0).map((chipType) => chipType.name)
    this.tool = tools[0] ?? null
    for (let k = 0; k < tools.length; k++) {
      const button = new Button(440, 180 + k * 50, 140, 40, tools[k], () => { this.tool = tools[k] })
      button.tool = tools[k]
      this.elements.push(button)
    }
  }
  SaveIfBest() {
    const slowdown = getArchitectureSlowdown(this.architecture, this.layout)
    if (slowdown == null) {
      return
    }
    const best = bestArchitectures[this.architecture.name]
    if (!best || slowdown < getArchitectureSlowdown(this.architecture, best.layout)) {
      bestArchitectures[this.architecture.name] = { layout: { ...this.layout } }
    }
  }
  getHoveredVertex(x, y) {
    for (const vertex in this.positions) {
      if (dist(x, y, this.positions[vertex].x, this.positions[vertex].y) <= ARCH_VERTEX_RADIUS) {
        return vertex
      }
    }
    return null
  }
  Draw(x, y) {
    background(255)
    super.Draw(x, y)
    this.DrawGraph(x, y)
    this.DrawSelectedTool()
    this.DrawPalette()
    const best = bestArchitectures[this.architecture.name]
    push()
    noStroke()
    fill(0)
    textAlign(LEFT, CENTER)
    textSize(20)
    text(`Slowdown: ${formatSlowdown(getArchitectureSlowdown(this.architecture, this.layout))}`, 405, 20)
    textSize(15)
    text(`Best: ${best ? formatSlowdown(getArchitectureSlowdown(this.architecture, best.layout)) : "-"}`, 405, 45)
    textSize(14)
    text("Right click to erase", ARCH_GRAPH_AREA.x, 82)
    text(`Cost: ${this.architecture.cost}`, 160, 360)
    textSize(11)
    textAlign(LEFT, TOP)
    text(this.architecture.engDescription, ARCH_GRAPH_AREA.x, 40, ARCH_GRAPH_AREA.w, 32)
    textSize(22)
    if (textWidth(this.architecture.name) > ARCH_GRAPH_AREA.w) {
      textSize(textSize() * ARCH_GRAPH_AREA.w / textWidth(this.architecture.name))
    }
    textAlign(CENTER, CENTER)
    text(this.architecture.name, ARCH_GRAPH_AREA.x + ARCH_GRAPH_AREA.w / 2, 20)
    pop()
  }
  DrawGraph(x, y) {
    const hovered = this.getHoveredVertex(x, y)
    push()
    stroke(0)
    strokeWeight(3)
    for (const vertex in this.architecture.graph) {
      for (const neighbor of this.architecture.graph[vertex]) {
        line(this.positions[vertex].x, this.positions[vertex].y, this.positions[neighbor].x, this.positions[neighbor].y)
      }
    }
    strokeWeight(2)
    for (const vertex in this.positions) {
      const pos = this.positions[vertex]
      fill(255)
      if (this.layout[vertex] != null) {
        fill(getChipType(this.layout[vertex]).color)
      }
      circle(pos.x, pos.y, ARCH_VERTEX_RADIUS * 2)
      if (hovered == vertex) {
        fill(0, 0, 0, 40)
        circle(pos.x, pos.y, ARCH_VERTEX_RADIUS * 2)
      }
    }
    pop()
  }
  //title, circle and description of the selected chip, above the palette
  DrawSelectedTool() {
    if (this.tool == null) {
      return
    }
    const chipType = getChipType(this.tool)
    push()
    noStroke()
    fill(0)
    textAlign(CENTER, CENTER)
    textSize(18)
    if (textWidth(chipType.name) > 180) {
      textSize(textSize() * 180 / textWidth(chipType.name))
    }
    text(chipType.name, 495, 80)
    textSize(10)
    textAlign(LEFT, TOP)
    text(chipType.arDescription, 475, 100, 115, 70)
    stroke(0)
    strokeWeight(2)
    fill(chipType.color)
    circle(430, 130, 60)
    pop()
  }
  //color swatches and selection marker next to the tool buttons
  DrawPalette() {
    push()
    stroke(0)
    strokeWeight(2)
    for (const button of this.elements) {
      if (!("tool" in button)) {
        continue
      }
      fill(getChipType(button.tool).color)
      circle(415, button.y + 20, 30)
      if (button.tool == this.tool) {
        noFill()
        strokeWeight(4)
        rect(button.x - 4, button.y - 4, button.w + 8, button.h + 8, 6)
        strokeWeight(2)
      }
    }
    pop()
  }
  HandleClick(x, y) {
    const vertex = this.getHoveredVertex(x, y)
    if (vertex != null && this.tool != null) {
      this.layout[vertex] = this.tool
      this.SaveIfBest()
    }
    super.HandleClick(x, y)
  }
  HandleRightClick(x, y) {
    const vertex = this.getHoveredVertex(x, y)
    if (vertex != null) {
      this.layout[vertex] = null
    }
  }
}
