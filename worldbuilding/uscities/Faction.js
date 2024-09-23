class Faction {
    constructor(factionObj) {
        this.name = factionObj.name;
        this.id = factionObj.id;
        this.color = color(factionObj.color.r, factionObj.color.g, factionObj.color.b)
    }
}