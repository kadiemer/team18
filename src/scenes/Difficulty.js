/*global Phaser*/
import * as ChangeScene from './ChangeScene.js';

window.maxZombies = 0;
window.zombieSpeed = 0;
window.miniGameSpeed = 0;

export default class WinScene extends Phaser.Scene {
  constructor () {
    super('Difficulty');
  }

  init (data) {
    // Initialization code goes here
  }

  preload () {
    // Preload assets

    this.load.audio('select','./assets/sounds/select1.m4a');

    this.load.image('difficultyBG', './assets/images/difficultyBG.png');

    // Declare variables for center of the scene
    this.centerX = this.cameras.main.width / 2;
    this.centerY = this.cameras.main.height / 2;
  }

  create (data) {
    // Event listener to change scenes
    ChangeScene.addSceneEventListeners(this);
    //Create the scene
    this.add.image(this.centerX,this.centerY,"difficultyBG");

    //tell user game is over and their score
    var oneKey = this.input.keyboard.addKey(Phaser﻿.Input.Keyboard.KeyCodes.ONE);
    var twoKey = this.input.keyboard.addKey(Phaser﻿.Input.Keyboard.KeyCodes.TWO);
    var threeKey = this.input.keyboard.addKey(Phaser﻿.Input.Keyboard.KeyCodes.THREE);
    var music;
    music = this.sound.add('select');

      music.play({
        volume: .3
      });


    var play = this.add.text(275, 150, 'CHOOSE DIFFICULTY', {
      fontFamily: 'League Gothic',
      fontSize: 275,
      color: '#e0dac3',
      stroke: "#000000",
      strokeThickness: 25
    })


    oneKey.on("down", function() {
      music.play({
        volume: .6
      });
      window.maxZombies = 5;
      window.zombieSpeed = 20;
      window.miniGameSpeed = .6;
      this.scene.start('WorldScene1');
      }, this
    );

    twoKey.on("down", function() {
      music.play({
        volume: .6
      });
      window.maxZombies = 10;
      window.zombieSpeed = 30;
      window.miniGameSpeed = .8;
      this.scene.start('WorldScene1');
      }, this
    );

    threeKey.on("down", function() {
      music.play({
        volume: .6
      });
      window.maxZombies = 15;
      window.zombieSpeed = 40;
      window.miniGameSpeed = 1;
      this.scene.start('WorldScene1');
      }, this
    );

  }
}
