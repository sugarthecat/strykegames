class ArchitectureScreen extends LevelBrowser {
  constructor() {
    super("Architecture", architectures, "Play", (architecture) => {
      screens.architecturelevel.Load(architecture)
      screenOn = "architecturelevel"
    })
  }
  getDetails(architecture) {
    return [architecture.description, architecture.engDescription]
  }
}
