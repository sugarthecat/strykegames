//best design per chip type name: { grid, efficiency }
const bestChipDesigns = {}

const CHIP_GRID_AREA = { x: 20, y: 95, w: 360, h: 240 }

function getAdjacent(grid, i, j) {
  const adjacent = []
  for (const [di, dj] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
    if (grid[i + di] !== undefined && grid[i + di][j + dj] !== undefined) {
      adjacent.push(grid[i + di][j + dj])
    }
  }
  return adjacent
}

function getChipComponent(name) {
  return chipComponents.find((component) => component.name == name)
}

class ChipLevelScreen extends GUI {
  constructor() {
    super()
    this.chipType = null
    this.grid = []
    this.tool = null
  }
  Load(chipType) {
    this.chipType = chipType
    const best = bestChipDesigns[chipType.name]
    this.grid = []
    for (let i = 0; i < chipType.xDim; i++) {
      this.grid.push([])
      for (let j = 0; j < chipType.yDim; j++) {
        this.grid[i].push(best ? best.grid[i][j] : null)
      }
    }
    this.elements = [new Button(20, 340, 120, 40, "Back", () => { screenOn = "chipdesign" })]
    const tools = chipType.allowedComponents.filter((name) => unlocked.has(name))
    this.tool = tools[0] ?? null
    for (let k = 0; k < tools.length; k++) {
      const button = new Button(440, 180 + k * 50, 140, 40, tools[k], () => { this.tool = tools[k] })
      button.tool = tools[k]
      this.elements.push(button)
    }
  }
  SaveIfBest() {
    const efficiency = this.getEfficiency()
    const best = bestChipDesigns[this.chipType.name]
    if (!best || efficiency > best.efficiency) {
      bestChipDesigns[this.chipType.name] = { grid: this.grid.map((column) => column.slice()), efficiency: efficiency }
    }
  }
  getEfficiency() {
    const stats = []
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        if (this.grid[i][j] != null) {
          stats.push(getChipComponent(this.grid[i][j]).getStats(this.grid, i, j))
        }
      }
    }
    return this.chipType.evaluate(stats)
  }
  getCellSize() {
    return min(CHIP_GRID_AREA.w / this.chipType.xDim, CHIP_GRID_AREA.h / this.chipType.yDim)
  }
  getHoveredCell(x, y) {
    const size = this.getCellSize()
    const i = floor((x - CHIP_GRID_AREA.x) / size)
    const j = floor((y - CHIP_GRID_AREA.y) / size)
    if (x < CHIP_GRID_AREA.x || y < CHIP_GRID_AREA.y || i >= this.chipType.xDim || j >= this.chipType.yDim) {
      return null
    }
    return { i: i, j: j }
  }
  Draw(x, y) {
    background(255)
    super.Draw(x, y)
    this.DrawGrid(x, y)
    this.DrawSelectedTool()
    this.DrawPalette()
    const best = bestChipDesigns[this.chipType.name]
    push()
    noStroke()
    fill(0)
    textAlign(LEFT, CENTER)
    textSize(20)
    text(`Efficiency: ${this.getEfficiency()}`, 405, 20)
    textSize(15)
    text(`Best: ${best ? best.efficiency : "-"}`, 405, 45)
    textSize(14)
    text("Right click to erase", CHIP_GRID_AREA.x, 82)
    textSize(11)
    textAlign(LEFT, TOP)
    text(this.chipType.cdDescription, CHIP_GRID_AREA.x, 40, CHIP_GRID_AREA.w, 32)
    textSize(22)
    if (textWidth(this.chipType.name) > CHIP_GRID_AREA.w) {
      textSize(textSize() * CHIP_GRID_AREA.w / textWidth(this.chipType.name))
    }
    textAlign(CENTER, CENTER)
    text(this.chipType.name, CHIP_GRID_AREA.x + CHIP_GRID_AREA.w / 2, 20)
    pop()
  }
  DrawGrid(x, y) {
    const size = this.getCellSize()
    const hovered = this.getHoveredCell(x, y)
    push()
    stroke(0)
    strokeWeight(2)
    for (let i = 0; i < this.chipType.xDim; i++) {
      for (let j = 0; j < this.chipType.yDim; j++) {
        fill(255)
        if (this.grid[i][j] != null) {
          fill(getChipComponent(this.grid[i][j]).color)
        }
        rect(CHIP_GRID_AREA.x + i * size, CHIP_GRID_AREA.y + j * size, size, size)
        if (hovered && hovered.i == i && hovered.j == j) {
          fill(0, 0, 0, 40)
          rect(CHIP_GRID_AREA.x + i * size, CHIP_GRID_AREA.y + j * size, size, size)
        }
      }
    }
    pop()
  }
  //title, square and description of the selected component, above the palette
  DrawSelectedTool() {
    if (this.tool == null) {
      return
    }
    const component = getChipComponent(this.tool)
    push()
    noStroke()
    fill(0)
    textAlign(CENTER, CENTER)
    textSize(18)
    if (textWidth(component.name) > 180) {
      textSize(textSize() * 180 / textWidth(component.name))
    }
    text(component.name, 495, 80)
    textSize(10)
    textAlign(LEFT, TOP)
    text(component.description, 475, 100, 115, 70)
    stroke(0)
    strokeWeight(2)
    fill(component.color)
    rect(400, 100, 60, 60)
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
      fill(getChipComponent(button.tool).color)
      rect(400, button.y + 5, 30, 30)
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
    const cell = this.getHoveredCell(x, y)
    if (cell && this.tool != null) {
      this.grid[cell.i][cell.j] = this.tool
      this.SaveIfBest()
    }
    super.HandleClick(x, y)
  }
  HandleRightClick(x, y) {
    const cell = this.getHoveredCell(x, y)
    if (cell) {
      this.grid[cell.i][cell.j] = null
    }
  }
}
