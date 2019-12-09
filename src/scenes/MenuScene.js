/*global Phaser*/

window.bgMusic;
import * as ChangeScene from './ChangeScene.js';
import WorldScene1 from './WorldScene1.js'
export default class MenuScene extends Phaser.Scene {
  constructor () {
    super('MenuScene');
  }

  init (data) {
    // Initialization code goes here
  }

  preload () {
    // Preload assets
    this.load.audio('select','./assets/sounds/select1.m4a');
    this.load.image('titleScreen', './assets/images/titleScreen.png');
    this.load.image('enter', './assets/images/enter.png');

    this.load.spritesheet("girl", "./assets/sprites/girlSpriteSheet.png", {
      frameHeight: 1831,
      frameWidth: 878
    });
    this.load.spritesheet("hipsterZombie", "./assets/sprites/hipsterSpriteSheet1.png", {
      frameHeight: 784.5,
      frameWidth: 413.33
    });
    this.load.spritesheet("cheerZombie", "./assets/sprites/cheerleaderSpriteSheet1.png", {
      frameHeight: 788.5,
      frameWidth: 462
    });
    this.load.spritesheet("businessZombie", "./assets/sprites/businessSpriteSheet1.png", {
      frameHeight: 790.5,
      frameWidth: 367.33
    });
    this.load.spritesheet("gothZombie", "./assets/sprites/gothSpriteSheet1.png", {
      frameHeight: 813,
      frameWidth: 395.66
    });
    //this.load.spritesheet("dance", "./assets/sprites/danceMove1SpriteSheet.png", {
      //frameHeight: 412,
      //frameWidth: 304.34
    //});


    // Declare variables for center of the scene
    this.centerX = this.cameras.main.width / 2;
    this.centerY = this.cameras.main.height / 2;
  }

  create (data) {

    //Add change scene event listeners

    ChangeScene.addSceneEventListeners(this);
    //Create the scene
    var background = this.add.image(this.centerX, this.centerY, 'titleScreen');
    background.scale = 1.07
    var enter = this.add.image(this.centerX, this.centerY - 125, 'enter');
    enter.scale = .65

    this.zombie1 = this.physics.add.sprite(this.centerX, this.centerY + 300, "businessZombie");
    this.zombie1.scale = .6
    this.zombie1.flipX = true;

    this.zombie2 = this.physics.add.sprite(this.centerX + 400, this.centerY + 175, "cheerZombie");
    this.zombie2.scale = .35

    this.zombie3 = this.physics.add.sprite(this.centerX - 350, this.centerY + 100, "hipsterZombie");
    this.zombie3.scale = .2

    this.zombie4 = this.physics.add.sprite(this.centerX - 700, this.centerY + 200, "gothZombie");
    this.zombie4.scale = .4
    this.zombie4.flipX = true;

    //this.anims.create({
      //key: "danceMove1",
      //frames: this.anims.generateFrameNumbers("dance", { start: 0, end: 23 }),
      //frameRate: 10,
      //repeat: -1
    //});

    //this.player = this.physics.add.sprite(this.centerX, this.centerY, "dance" );
    //this.player.scale = 2
    //this.player.anims.play("danceMove1",true);



    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNumbers("girl", { start: 0, end: 11 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "gothZombieWalk",
      frames: this.anims.generateFrameNumbers("gothZombie", { start: 0, end: 3 }),
      frameRate: 5,
      repeat: -1
    });
    this.anims.create({
      key: "businessZombieWalk",
      frames: this.anims.generateFrameNumbers("businessZombie", { start: 0, end: 3 }),
      frameRate: 5,
      repeat: -1
    });
    this.anims.create({
      key: "cheerZombieWalk",
      frames: this.anims.generateFrameNumbers("cheerZombie", { start: 0, end: 3 }),
      frameRate: 5,
      repeat: -1
    });
    this.anims.create({
      key: "hipsterZombieWalk",
      frames: this.anims.generateFrameNumbers("hipsterZombie", { start: 0, end: 3 }),
      frameRate: 5,
      repeat: -1
    });
    this.anims.create({
      key: "danceMove1",
      frames: this.anims.generateFrameNumbers("dance", { start: 0, end: 22 }),
      frameRate: 10,
      repeat: -1
    });

  }

  update (time, delta) {

    var music;
    music = this.sound.add('select');
    var enterKey = this.input.keyboard﻿.addKey﻿(Phaser﻿.Input.Keyboard.KeyCodes.ENTER);

    if(enterKey.isDown){
      music.play({
        volume: .3,
        loop: false
      });
      this.scene.start('Difficulty')
    };

  }
}
