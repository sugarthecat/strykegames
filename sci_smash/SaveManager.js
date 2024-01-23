import Level from "./Level.js";
/**
 * Manages savegames, and the server connection. static class, do not instantiate. 
 * 
 * I mean, you can if you really want to, it won't really do much though
 */
export default class SaveManager {

    static previousSave = false; // unless changed, it is noted that there is not a previous save associated with the user's browser via cookie
    // if the user's browser has a previous save associated with a cookie, the save is loaded
    static setCookieToSave(result) {
        if (result.saveId > 0) {
            document.cookie = JSON.stringify({ saveID: result.saveId })
        }
    }
    // saves the player's game to the saves database
    static saveGame() {
        fetch("https://ktprog.com/sci_smash/server/saveGame.php?"
            + "max_health=" + Level.player.maxHealth
            + "&current_health=" + Level.player.health
            + "&level=" + Level.lvl
            + "&coins=" + Level.player.coins
            + "&chestkeys=" + Level.player.keys
            + "&primary_ability_id=" + Level.player.specialAbility.abilityId
            + "&primary_ability_level=" + Level.player.specialAbility.upgradeLevel
        ).then(x => x.json()).then(x => setCookieToSave(x))
    }
    // does the first half of loading a save
    static startLoadSave() {
        if (document.cookie.length > 0) {
            fetch('https://ktprog.com/sci_smash/server/loadGame.php?save_id=' + JSON.parse(document.cookie).saveID)
                .then(x => x.json())
                .then(x => previousSave = x);
        }
    }
    // does the second half of loading a save
    static finishLoadSave(saveObject) {
        Level.player.setMaxHealth(saveObject.max_health)
        Level.lvl = saveObject.level - 1;
        Level.player.coins = saveObject.coins;
        Level.player.keys = saveObject.chestkeys;
        Level.player.health = saveObject.current_health;
        switch (saveObject.primary_ability_id) {
            case 1: // Chemisty's ability ID is 1
                Level.player.specialAbility = new Chemistry();
                break;
            case 2: // Theology's ability ID is 2
                Level.player.specialAbility = new Theology();
                break;
            case 3: // Geology's ability ID is 3
                Level.player.specialAbility = new Geology();
                break;
        }
        Level.finishLevel();
    }
}