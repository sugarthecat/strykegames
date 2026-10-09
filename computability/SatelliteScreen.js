class SatelliteScreen extends GUI {
  constructor() {
    super()
    this.elements.push(new Button(20, 340, 120, 40, "Back", () => { screenOn = "menu" }))
  }
  Draw(x, y) {
    background(255)
    super.Draw(x, y);
  }
}
