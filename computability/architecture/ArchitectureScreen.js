class ArchitectureScreen extends LevelBrowser {
  constructor() {
    super("Architecture", architectures, "Play", (architecture) => { })
  }
  getDetails(architecture) {
    return [architecture.description, architecture.engDescription]
  }
}
