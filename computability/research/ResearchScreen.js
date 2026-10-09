class ResearchScreen extends LevelBrowser {
  constructor() {
    super("Research", research, "Start", (item) => { }, false)
  }
  getDetails(item) {
    return [
      item.description,
      `Minimum income: ${item.minIncome}/s`,
      `Cost: ${item.cost}`,
      `Unlocks: ${item.unlocks.join(", ")}`
    ]
  }
}
