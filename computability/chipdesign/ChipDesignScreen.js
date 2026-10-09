class ChipDesignScreen extends LevelBrowser {
  constructor() {
    super("Chip Design", chipTypes, "Play", (chipType) => {
      screens.chiplevel.Load(chipType)
      screenOn = "chiplevel"
    })
  }
  getDetails(chipType) {
    return [chipType.cdDescription]
  }
}
