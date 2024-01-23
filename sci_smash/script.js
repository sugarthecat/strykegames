import Camera from "./Camera.js";
import Assets from "./Assets.js";
import Level from "./Level.js";
import GameMenu from "./GameMenu.js";
import LoadingScreen from "./LoadingScreen.js";
import TitleScreen from "./TitleScreen.js";
import MusicSystem from "./MusicSystem.js";
import Tutorial from "./Tutorial.js";
import SaveManager from "./SaveManager.js";
window.addEventListener("contextmenu", e => e.preventDefault());
let loadScreen = new LoadingScreen(169); // Initialize the loading screen with how many files need to be loaded
let gameStarted = false; // boolean of whether the player has clicked continue after the loading screen
// check for if the user switches windows or tabs, and pauses the game
setInterval(function checkWindowFocus() {
	if (!document.hasFocus()) {
		GameMenu.active = true;
	}
}, 200);
// called everytime a file loads
// when all files have been loaded, the game is 'launched'
function loaded() {
	loadScreen.loadsLeft--; // Increment the loading screen
	if (loadScreen.loadsLeft == 0) {
		MusicSystem.initialize();
		Tutorial.initialize();
		GameMenu.initalize();
		Level.loadTutorialRoom();
		Level.removeFalseWalls();
		Camera.setPositionAs(Level.player);
	}
}
// called everytime a key is pressed
function keyPressed() {
	if (loadScreen.continue) {
		if (TitleScreen.isActive()) { // if on the titlescreen
			TitleScreen.continueStarted(); // spin the clouds and begin the actual game
		} else if (GameMenu.menuPage == "death_screen") { // if on the deathscreen
			GameMenu.addInitialLetter(keyCode); // add a letter for the user's initial (arcade game style)
		} else { // otherwise, do movement
			if (!GameMenu.isActive() && !Tutorial.isComplete()) { Tutorial.takeInput(keyCode); } // give input to the tutorial object
			if (keyCode == ESCAPE) { GameMenu.invertActive(); } // pause/unpause the game
			if (keyCode == SHIFT) { Level.player.activateDash(); } // dash
		}
	}
}
// the starting point of the program
function setup() {
	SaveManager.startLoadSave(); // begin loading a save
	// set camera to follow the center of the screen
	Camera.x = -windowWidth / 2;
	Camera.y = -windowHeight / 2;
	// load all asset files
	Assets.loadFiles(loaded); // Initialize assets class
	// initialize canvas
	createCanvas(windowWidth, windowHeight);
	// set framerate to 60
	frameRate(60);
	// change the p5js angle mode to degrees instead of radians
	angleMode(DEGREES);
}
// called everytime the mouse is pressed
function mousePressed() {
	if (loadScreen.loadsLeft == 0) {
		if (gameStarted) {
			if (TitleScreen.isActive()) {
				TitleScreen.mouseClicked();
			} else if (GameMenu.isActive()) {
				GameMenu.mouseClicked()
			} else {
				if (mouseButton == LEFT) {
					Level.activateBasicAttack();
					if (Tutorial.phase == 8 && Tutorial.textbox.isComplete()) {
						Tutorial.advancePhase();
					}
				}
				if (mouseButton == RIGHT) {
					Level.activateSpecialAttack();
					if (Tutorial.phase == 11 && Tutorial.textbox.isComplete()) {
						Tutorial.advancePhase();
					}
				}
			}
		} else {
			gameStarted = true;
			loadScreen.continue = true;
			MusicSystem.switchAudio('titlescreen');
		}
	}
}
function mouseWheel(e) {
	if (!GameMenu.active) {
		if (e.delta < 0) {
			Camera.scaleUp(Level.player);
		} else if (e.delta > 0) {
			Camera.scaleDown(Level.player);
		}
	}
}
function draw() {
	if (!gameStarted) { // while on loading screen
		loadScreen.draw(); // draw the loading screen
	} else if (TitleScreen.isActive()) { // while on title screen
		TitleScreen.draw(); // draw the titlescreen
	} else { // otherwise, draw the game like normal
		background(Level.background);
		push();
		if (!GameMenu.isActive()) {
			Camera.moveTowards(Level.player);
			Level.updateTargetPosition();
			Level.runEntityMovement();
			Level.runPlayerMovement();
			if (!Tutorial.isComplete()) { Tutorial.advanceText(); }
		}
		Camera.adjust();
		noStroke();
		Level.drawFloor();
		Level.drawWalls();
		Level.runDamage();
		Level.interactItems();
		Level.testLevelCompletion();
		pop();
		if (!Tutorial.isComplete() && !GameMenu.isActive()) {
			Tutorial.draw();
		}
		Tutorial.testLevel(); // test level for completed tutorial condition
		Level.drawHUD();
		GameMenu.draw();
		MusicSystem.testGameMusic();
		if (Level.player.getHealth() < 1 && GameMenu.menuPage != "death_screen") {
			GameMenu.switchToPlayerDeathScreen();
		}
		if (Level.finished && Level.lvl % 5 == 0) {
			Level.finished = false;
			Level.newAbility = Level.getRandomAbility();
			GameMenu.switchToAbilityUpgradeScreen();
		}
	}
}
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

window.setup = setup
window.draw = draw;
window.mousePressed = mousePressed
window.windowResized = windowResized
window.keyPressed = keyPressed
window.mouseWheel = mouseWheel