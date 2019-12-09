/*global Phaser*/
import * as ChangeScene from './ChangeScene.js';
export default class WinScene extends Phaser.Scene {
  constructor () {
    super('WinScene');
  }

  init (data) {
    // Initialization code goes here
  }

  preload () {
    // Preload assets

    // Declare variables for center of the scene
    this.centerX = this.cameras.main.width / 2;
    this.centerY = this.cameras.main.height / 2;
  }

  create (data) {
    // Event listener to change scenes
    ChangeScene.addSceneEventListeners(this);

    //Create the scene

    //tell user game is over and their score
    var enterKey = this.input.keyboard.addKey(Phaser﻿.Input.Keyboard.KeyCodes.ENTER);

    var text = this.add.text( 370, 250, "Congrats, You Survived!", {
      fontFamily: 'League Gothic', fontSize: 150, color: '#e0dac3'});

    var subText = this.add.text( 490, 600, "You turned all " + window.maxZombies + " zombies human again", {
      fontFamily: 'League Gothic', fontSize: 75, color: '#ab0000'});

    var play = this.add.text(665, 750, 'Press enter to play again', {
      fontFamily: 'League Gothic', fontSize: 75, color: '#ab0000'}).setInteractive();


      enterKey.on("down", function() {
        this.scene.start('Difficulty');
      }, this
    );

  }
}
