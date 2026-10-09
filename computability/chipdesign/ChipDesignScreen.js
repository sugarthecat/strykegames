class ChipDesignScreen extends LevelBrowser {
  constructor() {
    super("Chip Design", chipTypes, "Play", (chipType) => { })
  }
  getDetails(chipType) {
    return [chipType.description, chipType.cdDescription, `Grid: ${chipType.xDim}x${chipType.yDim}`, `Cost: ${chipType.cost}`]
  }
}
