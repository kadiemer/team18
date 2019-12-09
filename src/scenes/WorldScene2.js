/*global Phaser*/
import * as ChangeScene from "./ChangeScene.js";

var textTimer = 0;
var tuText;

export default class WorldScene2 extends Phaser.Scene {
  constructor () {
    super('WorldScene2');
  }


  init (data) {
    this.newSprite = data.newSprite
  }

  preload () {
    this.danceMoves = [];
    this.keyCount = 1;
    // Preload assets
    this.load.image('danceBackground', './assets/images/danceBG.png');
    this.load.spritesheet("gothZombie", "./assets/sprites/gothSpriteSheet.png", {
      frameHeight: 3253,
      frameWidth: 1583
    });
    this.load.spritesheet("hipsterZombie", "./assets/sprites/hipsterSpriteSheet.png", {
      frameHeight: 3138.5,
      frameWidth: 1654
    });
    this.load.spritesheet("cheerZombie", "./assets/sprites/cheerleaderSpriteSheet.png", {
      frameHeight: 3153,
      frameWidth: 1848
    });
    this.load.spritesheet("businessZombie", "./assets/sprites/businessSpriteSheet.png", {
      frameHeight: 3163,
      frameWidth: 1470
    });
    this.load.spritesheet("gothZombie", "./assets/sprites/gothSpriteSheet1.png", {
      frameHeight: 813,
      frameWidth: 395.66
    });
    this.load.spritesheet("danceMove","./assets/sprites/danceMoveSpriteSheet.png",{
      frameHeight:412,
      frameWidth:304.34
    });
    this.load.spritesheet("hipHop","./assets/sprites/hipHopSpriteSheet.png",{
      frameHeight:412,
      frameWidth:214.16
    });
    this.load.spritesheet("flip","./assets/sprites/flipSpriteSheet.png",{
      frameHeight:412,
      frameWidth:259.52
    });
    this.load.spritesheet("moonWalk","./assets/sprites/moonWalkSpriteSheet.png",{
      frameHeight:412,
      frameWidth:251.12
    });
    this.load.spritesheet("turn","./assets/sprites/turnSpriteSheet.png",{
      frameHeight:412,
      frameWidth:442.83
    });
    this.load.spritesheet("disco","./assets/sprites/discoSpriteSheet.png",{
      frameHeight:412,
      frameWidth:218.32
    });

    this.load.image("girl", "./assets/sprites/girlSprite.png");
    this.load.image('1Key', './assets/images/1Key.png');
    this.load.image('2Key', './assets/images/2Key.png');
    this.load.image('3Key', './assets/images/3Key.png');
    this.load.image('4Key', './assets/images/4Key.png');


    this.load.audio('Hipster', './assets/sounds/Hipster.mp3');
    this.load.audio('Goth', './assets/sounds/Goth.mp3');
    this.load.audio('Cheerleader', './assets/sounds/Cheerleader.mp3');
    this.load.audio('Business_Man', './assets/sounds/Business_Man.mp3');
    this.load.audio('Miss','./assets/sounds/Miss.wav');
    this.load.audio('Good','./assets/sounds/Good.wav');
    this.load.audio('PowerMove','./assets/sounds/neon_light.wav');


    // Declare variables for center of the scene
    this.centerX = this.cameras.main.width / 2;
    this.centerY = this.cameras.main.height / 2;


  }

  create (data) {
    this.randomValue = Phaser.Math.Between(0,3);
    var songs = ['Goth','Hipster','Cheerleader','Business_Man'];
    var bpms = [618.56,280.37,600,491.8]; //97 bpm,214 bpm,100 bpm, 122 bpm
    this.bpm = bpms[this.randomValue];
    this.trackName = songs[this.randomValue];

    this.gameOver = false;
    this.scoreText;
    this.score = 0;
    this.started = false;
    this.indicatorText = this.add.text(-500, -525, 'placeholder',
    {fontFamily: 'Fantasy', fontSize: 50, color: '#ffffff'});

    //Create the scene
    var background = this.add.image(1001.5,561.5,"danceBackground");

    tuText = this.add
      .text(380, 700/2, 'TEACH THE ZOMBIE TO DANCE TO TURN THEM HUMAN\n BUT BE CAREFUL! IF THEY REACH YOU, YOURE DEAD', {
        fontFamily: "League Gothic",
        fontSize: 70,
        color: "#000000",
        padding: { x: 100, y: 100 },
        backgroundColor: "#e0dac3",
        align: 'center'
      })
      .setScrollFactor(0)
      .setDepth(200);

    this.player = this.physics.add
      .sprite(150, 850, "girl")
      .setSize(250, 1850)
      .setOffset(300, 100)
    this.player.scale = .3;

    this.zombie = this.physics.add
      .sprite(1850, 850, this.newSprite)
      .setSize(100, 1850)
      .setOffset(150, 100)

    this.zombie.scale = .67;
    this.zombie.stunnedTime = 0;

    this.physics.add.collider(this.player,this.zombie,this.zombieHit,null,this);


    //Adds base keys and makes the image smaller

    this.key1 = this.physics.add.sprite(400,650,'1Key');
    this.key1.setScale(.17);
    this.key2 = this.physics.add.sprite(400,750,'2Key');
    this.key2.setScale(.17);
    this.key3 = this.physics.add.sprite(400,850,'3Key');
    this.key3.setScale(.17);
    this.key4 = this.physics.add.sprite(400,950,'4Key');
    this.key4.setScale(.17);


    //creates a group for the falling sprites and an array to store the different keys
    this.myGroup = this.add.group();

    //Uses first 15 seconds of the track
    this.track1 = this.sound.add(this.trackName);
    this.track1.addMarker({
        name: 'track1',
        start: 0.00,
        duration: 10000
      });

      //Adds play button to the screen, the letters will start falling once you hit play

      var enterKey = this.input.keyboard.addKey(Phaser﻿.Input.Keyboard.KeyCodes.ENTER);
      var play = this.add.text(800, 400, 'P r e s s    E n t e r',
      {fontFamily: 'League Gothic', fontSize: 70, color: '#f7b600'}).setInteractive();

      this.callbackFunction;

      //Makes it so letters start falling after click
      this.lastPicker = 0;
      this.buttonFunction = enterKey.on("down", function() {
        tuText.setVisible(false);
        play.destroy();
        this.started = true;
        this.track1.play('track1');
        this.time.addEvent({
        delay: this.bpm, //This is the amount of time in which each letter is delayed
        callback: this.callbackFunction = function(){

          //This is the function that picks a random letter and makes it fall
          this.picker = getRandomInt(4);
          while (this.picker == this.lastPicker){
            this.picker = getRandomInt(4);
          }
          this.lastPicker = this.picker;
          if (this.picker == 0) {
            this.aKey = this.physics.add.sprite(this.zombie.x, 650, '1Key');
            this.myGroup.add(this.aKey);
          }
          else if (this.picker == 1) {
            this.bKey = this.physics.add.sprite(this.zombie.x, 750, '2Key');
            this.myGroup.add(this.bKey);
          }
          else if (this.picker == 2) {
            this.cKey = this.physics.add.sprite(this.zombie.x, 850, '3Key');
            this.myGroup.add(this.cKey);
          }
          else if (this.picker == 3) {
            this.dKey = this.physics.add.sprite(this.zombie.x, 950, '4Key');
            this.myGroup.add(this.dKey);
          }
          if (this.keyCount % 5 == 0){
            this.myGroup.getLast(true).tint = Math.random() * 0xffffff;
            this.myGroup.getLast(true).special = true;
          }
          this.keyCount++;
          this.myGroup.children.iterate(function(child){
            child.setScale(0.17);
            this.physics.add.overlap(this.key1, child, this.hitKey, null, this);
            this.physics.add.overlap(this.key2, child, this.hitKey, null, this);
            this.physics.add.overlap(this.key3, child, this.hitKey, null, this);
            this.physics.add.overlap(this.key4, child, this.hitKey, null, this);
          }, this);

        },
        callbackScope: this,
        repeat: 400 }) //this is how many letters fall + 1
      }, this
    );

    this.anims.create({
      key: "gothZombieWalk",
      frames: this.anims.generateFrameNumbers("gothZombie", { start: 0, end: 3 }),
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
      key: "businessZombieWalk",
      frames: this.anims.generateFrameNumbers("businessZombie", { start: 0, end: 3 }),
      frameRate: 5,
      repeat: -1
    });
    this.anims.create({
      key: "hipsterZombieWalk",
      frames: this.anims.generateFrameNumbers("hipsterZombie", { start: 0, end: 3 }),
      frameRate: 5,
      repeat: -1
    });

    //function used to generate random index for list of keys
      function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }

        //****************************
        // Variables for progressBar
        this.progressBar = this.add.graphics();
        this.progressBox = this.add.graphics();
        this.progressBox.fillStyle(0xDADCD6, 0.8);
        this.progressBox.fillRect(800, 125, 425, 50);
        this.widthTracker = 0;
        this.progressPercentage = 0;

      this.progressText = this.add.text(810, 16, "Progress: 0%", {
                fontFamily: "League Gothic",
                fontSize: 90,
                color: '#ab0000',
                stroke: "#000000",
                strokeThickness:5
                    });
        //*************************

  }

  update(time, delta) {

    textTimer += 1;

    if(textTimer > 250) {
      tuText.setVisible(false);
    }

    if(this.stunnedText){
      this.stunnedText.destroy();
    }

    if(this.started){
      if (this.zombie.stunnedTime < 1){
        this.zombie.x -= window.miniGameSpeed;
        if(this.gameOver != true){
          if (this.zombie['texture']['key'] == "gothZombie"){
            this.zombie.anims.play("gothZombieWalk", true);
          }
          else if (this.zombie['texture']['key'] == "cheerZombie"){
            this.zombie.anims.play("cheerZombieWalk", true);
          }
          else if (this.zombie['texture']['key'] == "businessZombie"){
            this.zombie.anims.play("businessZombieWalk", true);
          }
          else if (this.zombie['texture']['key'] == "hipsterZombie"){
            this.zombie.anims.play("hipsterZombieWalk", true);
          }

        }
        else if(this.gameOver == true){
          this.track1.destroy();
          this.zombie.destroy();
          this.buttonFunction.destroy();
          this.callbackFunction = null;
        }
      }
      else{
        this.stunnedText = this.add.text(this.zombie.x-125, this.zombie.y-350, "S t u n n e d !",{
          fontFamily: "League Gothic",
          fontSize: "60px",
          fill: "#fff"
          });
        this.zombie.stunnedTime--;
        if(this.gameOver == true){
          this.track1.destroy();
          this.zombie.destroy();
          this.buttonFunction.destroy();
          this.callbackFunction = null;
        }
      }
    }

    if (this.danceMoves.length > 0 && this.zombie){
      for (var i = 0; i < this.danceMoves.length; i++) {
        this.danceMoves[i].tint = Math.random() * 0xffffff;
        this.danceMoves[i].x += 6;
        if (this.danceMoves[i].x >= this.zombie.x){
          this.zombie.stunnedTime = 90;
          this.danceMoves[i].x = -1000;
          this.danceMoves[i].destroy();
          this.danceMoves.splice(i,1);
          i--;
        }
      }
    }

    //Makes the letters fall down at speed of 2
    Phaser.Actions.IncX(this.myGroup.getChildren(), -8);

    this.physics.overlap(this.key1,this.myGroup,this.hitKey,null,this);

    this.player.flipX = false;

  }

  hitKey (staticKey, dynamicKey) {

    if (this.score < 0.1) {
      this.progressText.setText("Percentage: 0%");
      this.progressPercentage = 0;
      this.score = 0;
      this.progressBar.clear();
    }


    var aKey = this.input.keyboard﻿.addKey﻿(Phaser﻿.Input.Keyboard.KeyCodes.ONE);
    var bKey = this.input.keyboard﻿.addKey﻿(Phaser﻿.Input.Keyboard.KeyCodes.TWO);
    var cKey = this.input.keyboard﻿.addKey﻿(Phaser﻿.Input.Keyboard.KeyCodes.THREE);
    var dKey = this.input.keyboard﻿.addKey﻿(Phaser﻿.Input.Keyboard.KeyCodes.FOUR);
    this.indicatorText.destroy();

    if(staticKey['texture']['key'] == "1Key"){
      if(aKey.isDown){
        if(dynamicKey.x > 430){
          this.indicatorText = this.add.text(370, 550, 'E a r l y',
          {fontFamily: 'League Gothic', fontSize: 30, color: '#FF0000'});
          this.score+=.2;
          this.sound.play('Miss');
        }
        else if(dynamicKey.x < 345){
          this.indicatorText = this.add.text(370, 550, 'L a t e',
          {fontFamily: 'League Gothic', fontSize: 30, color: '#FF0000'});
          this.score+=.2;
          this.sound.play('Miss');
        }
        else{
          this.indicatorText = this.add.text(370, 550, 'P e r f e c t !',
          {fontFamily: 'League Gothic', fontSize: 30, color: '#32FF00'});
          this.score+=1;
          this.sound.play('Good');
          if (dynamicKey.special){
            this.createDanceMove();
          }
        }

        dynamicKey.destroy();
      }
    }
    else if(staticKey['texture']['key'] == "2Key"){
      if(bKey.isDown){
        if(dynamicKey.x > 430){
          this.indicatorText = this.add.text(370, 550, 'E a r l y',
          {fontFamily: 'League Gothic', fontSize: 30, color: '#FF0000'});
          this.score+=.2;
          this.sound.play('Miss');
        }
        else if(dynamicKey.x < 345){
          this.indicatorText = this.add.text(370, 550, 'L a t e',
          {fontFamily: 'League Gothic', fontSize: 30, color: '#FF0000'});
          this.score+=.2;
          this.sound.play('Miss');
        }
        else{
          this.indicatorText = this.add.text(370, 550, 'P e r f e c t !',
          {fontFamily: 'League Gothic', fontSize: 30, color: '#32FF00'});
          this.score+=1;
          this.sound.play('Good');
          if (dynamicKey.special){
            this.createDanceMove();
            this.sound.play("PowerMove");
          }
        }
        dynamicKey.destroy();

      }
    }
    else if(staticKey['texture']['key'] == "3Key"){
      if(cKey.isDown){
        if(dynamicKey.x > 430){
          this.indicatorText = this.add.text(370, 550, 'E a r l y',
          {fontFamily: 'League Gothic', fontSize: 30, color: '#FF0000'});
          this.score+=.2;
          this.sound.play('Miss');
        }
        else if(dynamicKey.x < 345){
          this.indicatorText = this.add.text(370, 550, 'L a t e',
          {fontFamily: 'League Gothic', fontSize: 30, color: '#FF0000'});
          this.score+=.2;
          this.sound.play('Miss');
        }
        else{
          this.indicatorText = this.add.text(370, 550, 'P e r f e c t !',
          {fontFamily: 'League Gothic', fontSize: 30, color: '#32FF00'});
          this.score+=1;
          this.sound.play('Good');
          if (dynamicKey.special){
            this.createDanceMove();
          }
        }
        dynamicKey.destroy();

      }
    }
    else if(staticKey['texture']['key'] == "4Key"){
      if(dKey.isDown){
        if(dynamicKey.x > 430){
          this.indicatorText = this.add.text(370, 550, 'E a r l y',
          {fontFamily: 'League Gothic', fontSize: 30, color: '#FF0000'});
          this.score+=.2;
          this.sound.play('Miss');
        }
        else if(dynamicKey.x < 345){
          this.indicatorText = this.add.text(370, 550, 'L a t e',
          {fontFamily: 'League Gothic', fontSize: 30, color: '#FF0000'});
          this.score+=.2;
          this.sound.play('Miss');
        }
        else{
          this.indicatorText = this.add.text(370, 550, 'P e r f e c t !',
          {fontFamily: 'League Gothic', fontSize: 30, color: '#32FF00'});
          this.score+=1;
          this.sound.play('Good');
          if (dynamicKey.special){
            this.createDanceMove();
          }
        }
        dynamicKey.destroy();

      }
    }
    if(this.score > 14.5){
      window.totalMiniGames += 1;
      this.gameOver = true;
      this.progressText.setText("Percentage:100%");
      this.myGroup.clear(true);
      /*
      If the player wins the minigame, it takes
      hem back to the other scene and sets convertedzombie to true*/
      window.convertedZombie = true;
      this.scene.stop('WorldScene2');
      if (this.zombie['texture']['key'] == "businessZombie"){
        window.transformedSprite = "normalBusiness";
        this.scene.wake('WorldScene1')
      }
      else if (this.zombie['texture']['key'] == "cheerZombie"){
        window.transformedSprite = "normalCheer";
        this.scene.wake('WorldScene1')
      }
      else if (this.zombie['texture']['key'] == "hipsterZombie"){
        window.transformedSprite = "normalHipster";
        this.scene.wake('WorldScene1')
      }
      else if (this.zombie['texture']['key'] == "gothZombie"){
        window.transformedSprite = "normalGoth";
          this.scene.wake('WorldScene1')

      }

      //this.scene.stop('WorldScene2');

  //    this.scene.start('WinScene');


    }
    this.setProgressBar();
  }

  zombieHit (player, zombie){
    this.scene.start('LoseScene');
    this.track1.destroy();
    this.buttonFunction.destroy();
    this.callbackFunction = null;
  }

  createDanceMove (){

    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }

    this.randomDance = getRandomInt(6);
    if (this.randomDance == 0) {
      var danceMove = this.physics.add.sprite(this.player.x, this.player.y, "danceMove");
      danceMove.tint = Math.random() * 0xffffff;
      this.anims.create({
        key: "danceMove",
        frames: this.anims.generateFrameNumbers("danceMove", { start: 0, end: 22 }),
        frameRate: 15,
        repeat: -1
      });
      danceMove.anims.play("danceMove", true);
      this.danceMoves.push(danceMove);
    }
    else if (this.randomDance == 1) {
      var danceMove = this.physics.add.sprite(this.player.x, this.player.y, "hipHop");
      danceMove.tint = Math.random() * 0xffffff;
      this.anims.create({
        key: "hipHop",
        frames: this.anims.generateFrameNumbers("hipHop", { start: 0, end: 30 }),
        frameRate: 15,
        repeat: -1
      });
      danceMove.anims.play("hipHop", true);
      this.danceMoves.push(danceMove);
    }
    else if (this.randomDance == 2) {
      var danceMove = this.physics.add.sprite(this.player.x, this.player.y, "flip");
      danceMove.tint = Math.random() * 0xffffff;
      this.anims.create({
        key: "flip",
        frames: this.anims.generateFrameNumbers("flip", { start: 0, end: 20 }),
        frameRate: 15,
        repeat: -1
      });
      danceMove.scale = 1.3
      danceMove.anims.play("flip", true);
      this.danceMoves.push(danceMove);
    }
    else if (this.randomDance == 3) {
      var danceMove = this.physics.add.sprite(this.player.x, this.player.y, "moonWalk");
      danceMove.tint = Math.random() * 0xffffff;
      this.anims.create({
        key: "moonWalk",
        frames: this.anims.generateFrameNumbers("moonWalk", { start: 0, end: 18 }),
        frameRate: 10,
        repeat: -1
      });
      danceMove.flipX = true;
      danceMove.anims.play("moonWalk", true);
      this.danceMoves.push(danceMove);
    }
    else if (this.randomDance == 4) {
      var danceMove = this.physics.add.sprite(this.player.x, this.player.y, "turn");
      danceMove.tint = Math.random() * 0xffffff;
      this.anims.create({
        key: "turn",
        frames: this.anims.generateFrameNumbers("turn", { start: 0, end: 17 }),
        frameRate: 20,
        repeat: -1
      });
      danceMove.scale = 1
      danceMove.anims.play("turn", true);
      this.danceMoves.push(danceMove);
    }
    else if (this.randomDance == 5) {
      var danceMove = this.physics.add.sprite(this.player.x, this.player.y, "disco");
      danceMove.tint = Math.random() * 0xffffff;
      this.anims.create({
        key: "disco",
        frames: this.anims.generateFrameNumbers("disco", { start: 0, end: 30 }),
        frameRate: 12,
        repeat: -1
      });
      danceMove.scale = 1.2
      danceMove.anims.play("disco", true);
      this.danceMoves.push(danceMove);
    }
  }

  setProgressBar(){

    if (this.score > 0){
      this.widthTracker = this.score * 28.33;
    }
    else{
      this.widthTracker = 0;
    }

    this.progressPercentage = Phaser.Math.RoundTo(this.score/15 * 100,0);
    this.progressBar.fillStyle(0xFFFB04, 1);
    this.progressBar.fillRect(800, 125, this.widthTracker, 50);
    if (this.progressPercentage < 0.5) {
      this.progressText.setText("Percentage: 0%");
      this.progressPercentage  = 0
    } else {
    this.progressText.setText("Percentage: " + this.progressPercentage + "%");
  }
  console.log(this.score);

}
}
