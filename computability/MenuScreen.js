class MenuScreen extends GUI {
  constructor() {
    super()
    this.elements.push(new ImageButton(200, 0, 400, 133, Assets.title.applications, () => { screenOn = "applications" }))
    this.elements.push(new ImageButton(0, 267, 400, 133, Assets.title.chipdesign, () => { screenOn = "chipdesign" }))
    this.elements.push(new ImageButton(400, 133, 200, 267, Assets.title.research, () => { screenOn = "research" }))
    this.elements.push(new ImageButton(0, 0, 200, 267, Assets.title.architecture, () => { screenOn = "architecture" }))
    this.elements.push(new ImageButton(200, 133, 200, 134, Assets.title.core, () => { screenOn = "core" }))
  }
  Draw(x, y) {
    background(255)
    super.Draw(x, y);
  }
}
