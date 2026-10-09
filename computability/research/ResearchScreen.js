//the research in progress: { item, progress } where progress is money spent so far
let activeResearch = null
const completedResearch = new Set()
//short message shown on every screen when research finishes
let researchNotice = null
const RESEARCH_NOTICE_TIME = 3

//runs every frame, regardless of the screen
function UpdateResearch() {
  if (researchNotice) {
    researchNotice.time -= deltaTime / 1000
    if (researchNotice.time <= 0) {
      researchNotice = null
    }
  }
  if (!activeResearch) {
    return
  }
  activeResearch.progress += getIncomeRate() * deltaTime / 1000
  const item = activeResearch.item
  if (activeResearch.progress >= item.cost) {
    completedResearch.add(item.name)
    if (!item.fail) {
      for (const name of item.unlocks) {
        unlocked.add(name)
      }
    }
    researchNotice = { text: `${item.name} ${item.fail ? "failed" : "succeeded"}`, success: !item.fail, time: RESEARCH_NOTICE_TIME }
    activeResearch = null
  }
}

function DrawResearchNotice() {
  if (!researchNotice) {
    return
  }
  push()
  const alpha = 255 * min(1, researchNotice.time)
  textSize(16)
  const w = textWidth(researchNotice.text) + 40
  stroke(0, alpha)
  strokeWeight(3)
  fill(255, alpha)
  rect(300 - w / 2, 10, w, 40, 10)
  noStroke()
  if (researchNotice.success) {
    fill(0, 150, 0, alpha)
  } else {
    fill(180, 0, 0, alpha)
  }
  textAlign(CENTER, CENTER)
  text(researchNotice.text, 300, 30)
  pop()
}

class ResearchScreen extends LevelBrowser {
  constructor() {
    super("Research", research, "Start", (item) => {
      activeResearch = { item: item, progress: 0 }
    })
  }
  getEntries() {
    return super.getEntries().filter((item) => !completedResearch.has(item.name))
  }
  getDetails(item) {
    const income = getIncomeRate()
    const details = [
      item.description,
      `Minimum income: ${item.minIncome}/s`,
      `Cost: ${item.cost}`,
      `Your income: ${formatValue(income)}/s`
    ]
    if (activeResearch && activeResearch.item == item) {
      const remaining = (item.cost - activeResearch.progress) / income
      details.push(`Progress: ${floor(100 * activeResearch.progress / item.cost)}%` + (income > 0 ? ` (${ceil(remaining)}s left)` : ""))
    } else if (activeResearch) {
      details.push(`Researching ${activeResearch.item.name}`)
    }
    return details
  }
  Draw(x, y) {
    if (this.selected && completedResearch.has(this.selected.name)) {
      this.selected = null
    }
    this.actionButton.active = this.selected != null && activeResearch == null && getIncomeRate() >= this.selected.minIncome
    super.Draw(x, y)
  }
}
