const BROWSER_LIST = { x: 0, y: 60, w: 250, h: 270 }
const BROWSER_ROW_HEIGHT = 50

class LevelBrowser extends SatelliteScreen {
  constructor(title, entries, actionLabel, action, actionActive = true) {
    super()
    this.entries = entries
    this.selected = null
    this.scrolly = 0
    this.elements.push(new GUIText(10, 5, 230, 50, title))
    this.actionButton = new Button(350, 320, 150, 50, actionLabel, () => action(this.selected), actionActive, true)
    this.elements.push(this.actionButton)
  }
  getEntries() {
    return this.entries.filter((entry) => unlocked.has(entry.name))
  }
  //lines of text shown in the detail panel for the selected entry
  getDetails(entry) {
    return [entry.description]
  }
  getHoveredIndex(x, y) {
    if (x < BROWSER_LIST.x || x > BROWSER_LIST.x + BROWSER_LIST.w || y < BROWSER_LIST.y || y > BROWSER_LIST.y + BROWSER_LIST.h) {
      return -1
    }
    return floor((y - BROWSER_LIST.y - this.scrolly) / BROWSER_ROW_HEIGHT)
  }
  Draw(x, y) {
    this.actionButton.hidden = (this.selected == null)
    super.Draw(x, y)
    const entries = this.getEntries()
    this.UpdateScroll(x, y, entries.length)
    this.DrawList(x, y, entries)
    if (this.selected) {
      this.DrawDetails(this.selected)
    }
  }
  UpdateScroll(x, y, count) {
    if (this.getHoveredIndex(x, y) == -1) {
      return
    }
    const top = BROWSER_LIST.y + 50
    const bottom = BROWSER_LIST.y + BROWSER_LIST.h - 50
    if (y < top) {
      this.scrolly += (top - y) * deltaTime / 1000 * 2
    } else if (y > bottom) {
      this.scrolly -= (y - bottom) * deltaTime / 1000 * 2
    }
    this.scrolly = constrain(this.scrolly, min(0, BROWSER_LIST.h - count * BROWSER_ROW_HEIGHT), 0)
  }
  DrawList(x, y, entries) {
    const hovered = this.getHoveredIndex(x, y)
    push()
    drawingContext.save()
    drawingContext.beginPath()
    drawingContext.rect(BROWSER_LIST.x, BROWSER_LIST.y, BROWSER_LIST.w, BROWSER_LIST.h)
    drawingContext.clip()
    translate(BROWSER_LIST.x, BROWSER_LIST.y + this.scrolly)
    stroke(0)
    strokeWeight(3)
    for (let i = 0; i < entries.length; i++) {
      fill(255)
      if (this.selected == entries[i]) {
        fill(200, 200, 225)
      }
      if (hovered == i) {
        fill(175)
      }
      rect(0, i * BROWSER_ROW_HEIGHT, BROWSER_LIST.w, BROWSER_ROW_HEIGHT)
      noStroke()
      fill(0)
      textSize(16)
      textAlign(LEFT, CENTER)
      text(entries[i].name, 10, i * BROWSER_ROW_HEIGHT + BROWSER_ROW_HEIGHT / 2)
      stroke(0)
    }
    drawingContext.restore()
    pop()
    push()
    stroke(0)
    strokeWeight(6)
    line(BROWSER_LIST.x + BROWSER_LIST.w, 0, BROWSER_LIST.x + BROWSER_LIST.w, 400)
    pop()
  }
  DrawDetails(entry) {
    push()
    stroke(0)
    strokeWeight(3)
    fill(255)
    textSize(22)
    const cardWidth = textWidth(entry.name) * 1.2 + 20
    rect(425 - cardWidth / 2, 20, cardWidth, 50, 20)
    rect(270, 85, 310, 220, 20)
    noStroke()
    fill(0)
    textAlign(CENTER, CENTER)
    text(entry.name, 425, 45)
    textSize(12)
    textAlign(LEFT, TOP)
    const details = this.getDetails(entry).filter((line) => line !== undefined)
    text(details.join("\n\n"), 285, 100, 280, 190)
    pop()
  }
  HandleClick(x, y) {
    const entries = this.getEntries()
    const index = this.getHoveredIndex(x, y)
    if (index >= 0 && index < entries.length) {
      this.selected = entries[index]
    }
    super.HandleClick(x, y)
  }
}
