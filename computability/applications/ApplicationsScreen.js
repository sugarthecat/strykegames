class ApplicationsScreen extends LevelBrowser {
  constructor() {
    super("Applications", applications, "Play", (application) => { })
  }
  getDetails(application) {
    const formatPorts = (ports) => ports.map((port) => `${port.name} (${port.type})`).join(", ")
    return [
      application.description,
      `Value: ${application.value}`,
      `Inputs: ${formatPorts(application.inputs)}`,
      `Outputs: ${formatPorts(application.outputs)}`
    ]
  }
}
