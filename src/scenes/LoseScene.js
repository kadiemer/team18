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

    var text = this.add.text( 700, 480, "Oh no, you died!", {
      fontFamily: 'Optima', fontSize: 70, color: '#ffffff'});
    var play = this.add.text(715, 580, 'Press Enter to try again',
    {fontFamily: 'Optima', fontSize: 50, color: '#ffffff'}).setInteractive();
    enterKey.on("down", function() {
      this.scene.start('WorldScene1');
    }, this
  );

  }
}
