class TitleScreen extends GUI {
  constructor() {
    super()
  }
  Draw(x, y) {
    background(255)
    image(Assets.title.applications, 200, 0, 400, 133)
    image(Assets.title.chipdesign, 0, 267, 400, 133)
    image(Assets.title.research, 400, 133, 200, 267)
    image(Assets.title.architecture, 0, 0, 200, 267)
    image(Assets.title.core, 200, 133, 200, 134)
    super.Draw(x, y);
  }
}