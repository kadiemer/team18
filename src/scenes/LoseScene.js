/*global Phaser*/
import * as ChangeScene from './ChangeScene.js';
export default class LoseScene extends Phaser.Scene {
  constructor () {
    super('LoseScene');
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

    var text = this.add.text( 450, 250, "Oh no, you died!",
    {fontFamily: 'League Gothic', fontSize: 150, color: '#e0dac3'});
    var play = this.add.text(580, 750, 'Press enter to try again',
    {fontFamily: 'League Gothic', fontSize: 75, color: '#ab0000'});
    var score = this.add.text(460, 600,'You turned ' + window.transformedCount + '/' + window.maxZombies + ' zombies human',
    {fontFamily: 'League Gothic', fontSize: 75, color: '#ab0000'});


    enterKey.on("down", function() {
      this.scene.start('Difficulty');
    }, this
  );

  }
}
