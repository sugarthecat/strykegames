import Overlay from "./overlays/Overlay.js";


export default class ColonyOverlay extends Overlay {
    constructor(overlay, colonyGraphOverlay) {
        super(overlay)
        this.colonyGraphOverlay = colonyGraphOverlay;
        this.addCloseButton();
        this.addGraphButtons();
        this.colony;
    }

    addCloseButton() {
        this.overlayButton = document.getElementById("colony_overlay_close_btn")
        this.overlayButton.onclick = () => {
            this.hideOverlay();
        }
    }

    displayColonyOverlay(colony) {
        this.showOverlay();
        this.colony = colony;


        const colonyNameElt = document.getElementById("colony_overlay_colony_name");
        colonyNameElt.innerHTML = `${colony.teamId}`

        colonyNameElt.onclick = () => {
            if (colonyNameElt.children.length > 0) {
                return;
            }
            const textBox = document.createElement('input')
            colonyNameElt.innerHTML = ""
            colonyNameElt.appendChild(textBox)
            textBox.addEventListener("keydown", function (event) {
                if (event.key === "Enter") {
                    // Prevent default behavior (like form submission) if necessary
                    event.preventDefault();
                    const newName = textBox.value;
                    colonyNameElt.innerHTML = ""
                    colonyNameElt.innerText = newName
                    colony.teamId = newName
                    // Trigger your function here
                }
            });
        }

        let flagWidth = document.getElementById("colony_overlay").offsetWidth;
        let flagHeight = flagWidth / 300 * 200
        document.getElementById("colony_overlay_flag_canvas").width = flagWidth;
        document.getElementById("colony_overlay_flag_canvas").height = flagHeight;
        colony.flag.displayInCanvas(document.getElementById("colony_overlay_flag_canvas"));

        document.getElementById("colony_overlay_ideology").innerHTML = `${colony.getideology()}`
        document.getElementById("colony_overlay_alliance").innerHTML = `Alliance: ${colony.getAllianceName()}`
        document.getElementById("colony_overlay_tiles").innerHTML = `Tiles: ${colony.totalTiles}`
        document.getElementById("colony_overlay_population").innerHTML = `Population: ${colony.getPopText()}`
        document.getElementById("colony_overlay_military_strength").innerHTML = `Military Strength: ${colony.getCondensedMilStrength()}`
        document.getElementById("colony_overlay_troops").innerHTML = `Troops: ${colony.getTroopText()}`
        document.getElementById("colony_overlay_manpower").innerHTML = `Manpower: ${colony.getManpowerText()}`
        document.getElementById("colony_overlay_enemies").innerHTML = `Enemies: ${colony.getEnemiesString()}`
    }
    addGraphButtons() {
        document.getElementById("colony_overlay_population_btn").onclick = () => {
            this.hideOverlay();
            this.colonyGraphOverlay.setColony(this.colony);
            this.colonyGraphOverlay.setColonyOverlay(this);
            this.colonyGraphOverlay.displayPopulationGraphOverlay();
        }

        document.getElementById("colony_overlay_military_btn").onclick = () => {
            this.hideOverlay();
            this.colonyGraphOverlay.setColony(this.colony);
            this.colonyGraphOverlay.setColonyOverlay(this);
            this.colonyGraphOverlay.displayMilitaryGraphOverlay();
        }
    }

}