class MenuScreen extends GUI {
  constructor() {
    super()
    this.subgameButtons = {
      applications: new ImageButton(200, 0, 400, 133, Assets.title.applications, () => { screenOn = "applications" }),
      chipdesign: new ImageButton(0, 267, 400, 133, Assets.title.chipdesign, () => { screenOn = "chipdesign" }),
      research: new ImageButton(400, 133, 200, 267, Assets.title.research, () => { screenOn = "research" }),
      architecture: new ImageButton(0, 0, 200, 267, Assets.title.architecture, () => { screenOn = "architecture" })
    }
    for (const key in this.subgameButtons) {
      this.elements.push(this.subgameButtons[key])
    }
    this.elements.push(new ImageButton(200, 133, 200, 134, Assets.title.core, () => { screenOn = "core" }))
  }
  Draw(x, y) {
    background(0)
    //hide subgames with no unlocked challenges
    for (const key in this.subgameButtons) {
      this.subgameButtons[key].hidden = screens[key].getEntries().length == 0
    }
    super.Draw(x, y);
  }
}
