
class SelectedNationGUI extends GUI {
    constructor() {
        super()
        this.w = 200;
        this.h = 150;
        this.elements = [
            new GUIButton(0, 0, 25, 25, "X", function () { selectedNation = false; }),
            new GUIText(40, 0, 120, 30, "Tile Name"),
            new GUIText(20, 35, 160, 20, "Frontline tiles"),
            new GUIText(20, 55, 160, 20, "Population"),
            new GUIText(20, 75, 160, 20, "Population"),
            new GUIText(20, 95, 160, 20, "Population")
        ]
    }
    Draw(x, y) {
        let xOffset = (nationpos.x + 5) * TILE_SIZE * scaleFactor;
        let yOffset = (nationpos.y + 5) * TILE_SIZE * scaleFactor;
        this.elements[1].text = selectedNation.recruits + " Recruits";
        this.elements[2].text = selectedNation.frontlineTiles + " Frontlines";
        this.elements[3].text = "Population: " + selectedNation.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        this.elements[4].text = "Troops: " + floor(selectedNation.troops).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        push()
        translate(xOffset, yOffset)
        fill(255)
        noStroke()
        rect(0, 0, this.w, this.h)
        super.Draw(x - xOffset, y - yOffset)
        pop()
    }
    HandleClick(x, y) {
        let xOffset = (nationpos.x + 5) * TILE_SIZE * scaleFactor;
        let yOffset = (nationpos.y + 5) * TILE_SIZE * scaleFactor;
        if (super.HandleClick(x - xOffset, y - yOffset)) {
            return true
        }
        if (x > xOffset && y > yOffset & x < this.w + xOffset && y < this.h + yOffset) {
            return true;
        }
        return false;
    }
    Update() {
    }
}