let nationpos;
class SelectedTileGUI extends GUI {
    constructor() {
        super()
        this.w = 200;
        this.h = 150;
        this.elements = [
            new GUIButton(0, 0, 25, 25, "X", function () { selectedTile = false; }),
            new GUIText(40, 0, 120, 30, "Tile Name"),
            new GUIText(20, 35, 160, 20, "Climate"),
            new GUIText(20, 55, 160, 20, "Population"),
            new GUIText(20, 75, 160, 20, "Population"),
            new GUIText(20, 95, 160, 20, "Population"),
            new GUIButton(50, 120, 100, 30, "X", function () { selectedNation = selectedTile.nation; nationpos = selectedTile.position; selectedTile = false; }),
        ]
    }
    Draw(x, y) {
        let xOffset = (selectedTile.position.x + 5) * TILE_SIZE * scaleFactor;
        let yOffset = (selectedTile.position.y + 5) * TILE_SIZE * scaleFactor;
        this.elements[1].text = selectedTile.name
        this.elements[2].text =  selectedTile.terrain + (selectedTile.nation != selectedTile.originalNation ? ", Occupied " : "")
        this.elements[3].text = "Population: " + formatNumber(selectedTile.population);
        this.elements[4].text = `${formatNumber(selectedTile.troops)} Troops`;
        this.elements[5].text = '';
        this.elements[6].text = "View Nation";
        push()
        translate(xOffset, yOffset)
        fill(255)
        noStroke()
        rect(0, 0, this.w, this.h)
        super.Draw(x - xOffset, y - yOffset)
        pop()
    }
    HandleClick(x, y) {
        let xOffset = (selectedTile.position.x + 5) * TILE_SIZE * scaleFactor;
        let yOffset = (selectedTile.position.y + 5) * TILE_SIZE * scaleFactor;
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
function formatNumber(num) {
    return floor(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}