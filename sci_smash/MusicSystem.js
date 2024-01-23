import Assets from "./Assets.js";
import GameMenu from "./GameMenu.js";
/**
 * Manages background music for all areas of the game.
 * 
 * Static class, do not instantiate. 
 */
export default class MusicSystem {
    static tutorialMusic = Assets.music.tutorial;
    static titleScreenMusic = Assets.music.titlescreen;
    static menuMusic = Assets.music.pausemenu;
    static gameMusic = Assets.music.game;
    static currentlyPlayingGameMusic = 0;
    static volume = 0.7;
    static muted = false;
    /**
     * Re-initializes the class, in case it was first initialized when the 
     */
    static initialize(){
        this.tutorialMusic = Assets.music.tutorial;
        this.titleScreenMusic = Assets.music.titlescreen;
        this.menuMusic = Assets.music.pausemenu;
        this.gameMusic = Assets.music.game;
        this.currentlyPlayingGameMusic = 0;
        this.volume = 0.7;
        this.muted = false;
    }
    /**
     * Switches the audio track.
     * @param {String} music The string identifier representing the music to play. Can be either 'tutorial', 'titlescreen', 'pausemenu', or 'game'
     */
    static switchAudio(music) {
        this.pauseAll();
        switch (music) {
            case 'tutorial':
                if (!this.tutorialMusic.isLooping()) {
                    this.tutorialMusic.loop();
                }
                break;
            case 'titlescreen':
                if (!this.titleScreenMusic.isLooping()) {
                    this.titleScreenMusic.loop();
                }
                break;
            case 'pausemenu':
                if (!this.menuMusic.isLooping()) {
                    this.menuMusic.loop();
                }
                break;
            case 'game':
                this.gameMusic[this.currentlyPlayingGameMusic].play();
                break;
        }
        this.fixVolume();
    }
    /**
     * Gets a string represengint the current volume
     * @returns {String} The current volume's string representation
     */
    static getVolumePercentString() {
        return round(this.volume * 100) + "%"
    }
    /**
     * applies the volume property to the currently playing music
     */
    static fixVolume() {
        let currentSong = this.getCurrentSong()
        if (this.muted) {
            currentSong.setVolume(0)
        } else {
            currentSong.setVolume(this.getVolume())
        }
    }
    /**
     * Gets the current volume, as a Number out of 1. (0 = 0% volume, 1 = 100% volume)
     * @returns {Number} The current volume
     */
    static getVolume(){
        if(this.muted){
            return 0;
        }else{
            return this.volume;
        }
    }
    /**
     * Increases the volume by 5%
     */
    static incrementVolume() {
        this.volume += 0.05;
        if (this.volume > 1) {
            this.volume = 1;
        }
        this.fixVolume();
    }
    /**
     * Decreases the volume by 5%
     */
    static decrementVolume() {
        this.volume -= 0.05;
        if (this.volume < 0) {
            this.volume = 0;
        }
        this.fixVolume();
    }
    /**
     * Pauses all of the music tracks.
     */
    static pauseAll() {
        this.tutorialMusic.pause();
        this.titleScreenMusic.pause();
        this.menuMusic.pause();
        this.gameMusic[this.currentlyPlayingGameMusic].pause();
    }
    /**
     * If unmuted, mutes the music.
     * If muted, unmutes the music.
     */
    static toggleMute() {
        let currentSong = this.getCurrentSong()
        if (this.muted) {
            this.muted = false;
            currentSong.setVolume(this.volume)
            GameMenu.buttonDict["sound"][1].text = "Mute Audio"
        } else {
            this.muted = true;
            currentSong.setVolume(0)
            GameMenu.buttonDict["sound"][1].text = "Unmute Audio"
        }
    }
    /**
     * Gets the currently playing song
     * @returns {p5.SoundFile} the currently playing music object
     */
    static getCurrentSong() {
        if (this.tutorialMusic.isPlaying()) {
            return this.tutorialMusic
        }
        if (this.titleScreenMusic.isPlaying()) {
            return this.titleScreenMusic
        }
        if (this.menuMusic.isPlaying()) {
            return this.menuMusic
        }
        if (this.gameMusic[this.currentlyPlayingGameMusic].isPlaying()) {
            return this.gameMusic[this.currentlyPlayingGameMusic]
        }
    }
    /**
     * Moves to next song in gameMusic if the current song has finished 
     */
    static testGameMusic() {
        if (!this.gameMusic[this.currentlyPlayingGameMusic].isPlaying() && !this.gameMusic[this.currentlyPlayingGameMusic].isPaused()) {
            this.currentlyPlayingGameMusic++;
            if (this.currentlyPlayingGameMusic >= this.gameMusic.length) {
                this.currentlyPlayingGameMusic = 0
            }
            this.gameMusic[this.currentlyPlayingGameMusic].play();
            this.fixVolume();
        }
    }
    /**
     * Starts and immediately pauses the game music.
     */
    static initializeGameMusic() {
        this.gameMusic[this.currentlyPlayingGameMusic].play();
        this.gameMusic[this.currentlyPlayingGameMusic].pause();
    }
}