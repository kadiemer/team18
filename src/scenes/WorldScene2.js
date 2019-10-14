/*global Phaser*/
import * as ChangeScene from "./ChangeScene.js";

export default class WorldScene2 extends Phaser.Scene {
  constructor () {
    super('WorldScene2');
  }

  init (data) {
    // Initialization code goes here
  }

  preload () {

    // Preload assets
    this.load.image('danceBackground', './assets/images/danceBackground.png');
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
    this.load.image("girl", "./assets/sprites/girlSprite.png");
    this.load.image('wKey', './assets/images/wKey.png');
    this.load.image('aKey', './assets/images/aKey.png');
    this.load.image('sKey', './assets/images/sKey.png');
    this.load.image('dKey', './assets/images/dKey.png');

    this.load.audio('track1', './assets/sounds/track1.mp3');
    this.load.audio('Miss','./assets/sounds/Miss.wav');
    this.load.audio('Good','./assets/sounds/Good.wav');


    // Declare variables for center of the scene
    this.centerX = this.cameras.main.width / 2;
    this.centerY = this.cameras.main.height / 2;
  }

  create (data) {

    this.gameOver = false;
    this.scoreText;
    this.score = 0;
    this.started = false;
    this.indicatorText = this.add.text(-500, -525, 'placeholder',
    {fontFamily: 'Fantasy', fontSize: 50, color: '#ffffff'});

    //Create the scene
    this.add.image(1001.5,561.5,"danceBackground");

    this.player = this.physics.add
      .sprite(150, 850, "girl");
    this.player.scale = .3;

    this.zombie = this.physics.add
      .sprite(1800, 850, "gothZombie");

    this.zombie.scale = .67;

    this.physics.add.collider(this.player,this.zombie,this.zombieHit,null,this);


    //Adds base keys and makes the image smaller

    this.key1 = this.physics.add.sprite(400,650,'wKey');
    this.key1.setScale(.75);
    this.key2 = this.physics.add.sprite(400,750,'aKey');
    this.key2.setScale(.75);
    this.key3 = this.physics.add.sprite(400,850,'sKey');
    this.key3.setScale(.75);
    this.key4 = this.physics.add.sprite(400,950,'dKey');
    this.key4.setScale(.75);


    //creates a group for the falling sprites and an array to store the different keys
    this.myGroup = this.add.group();

    //Uses first 15 seconds of the track
    this.track1 = this.sound.add('track1');
    this.track1.addMarker({
        name: 'track1',
        start: 0.00,
        duration: 100
      });

      //Adds play button to the screen, the letters will start falling once you hit play

      var play = this.add.text(875, 525, '< play >',
      {fontFamily: 'Fantasy', fontSize: 50, color: '#ffffff'}).setInteractive();

      //Makes it so letters start falling after click
      play.on("pointerup", function() {
        play.destroy();
        this.started = true
        this.track1.play('track1');
        this.time.addEvent({
        delay: 300 + getRandomInt(500), //This is the amount of time in which each letter is delayed
        callback: function(){

          //This is the function that picks a random letter and makes it fall
          this.picker = getRandomInt(4);
          if (this.picker == 0) {
            this.wKey = this.physics.add.sprite(this.zombie.x, 650, 'wKey');
            this.myGroup.add(this.wKey);
          }
          else if (this.picker == 1) {
            this.aKey = this.physics.add.sprite(this.zombie.x, 750, 'aKey');
            this.myGroup.add(this.aKey);
          }
          else if (this.picker == 2) {
            this.sKey = this.physics.add.sprite(this.zombie.x, 850, 'sKey');
            this.myGroup.add(this.sKey);
          }
          else if (this.picker == 3) {
            this.dKey = this.physics.add.sprite(this.zombie.x, 950, 'dKey');
            this.myGroup.add(this.dKey);
          }
          this.myGroup.children.iterate(function(child){
            child.setScale(0.75);
            this.physics.add.overlap(this.key1, child, this.hitKey, null, this);
            this.physics.add.overlap(this.key2, child, this.hitKey, null, this);
            this.physics.add.overlap(this.key3, child, this.hitKey, null, this);
            this.physics.add.overlap(this.key4, child, this.hitKey, null, this);
          }, this);

        },
        callbackScope: this,
        repeat: 40 }) //this is how many letters fall + 1
      }, this
    );

    this.anims.create({
      key: "zombieWalk",
      frames: this.anims.generateFrameNumbers("gothZombie", { start: 0, end: 3 }),
      frameRate: 5,
      repeat: -1
    });

    //function used to generate random index for list of keys
      function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }
      this.scoreText = this.add.text(50, 16, "score: 0", {
        fontSize: "60px",
        fill: "#000"
        });

  }

  update(time, delta) {

    if(this.started){
      this.zombie.x -= .8;
      if(this.gameOver != true){
        this.zombie.anims.play("zombieWalk", true);
      }
      else if(this.gameOver == true){
        this.track1.destroy();
        this.zombie.destroy();
      }
    }

    //Makes the letters fall down at speed of 2
    Phaser.Actions.IncX(this.myGroup.getChildren(), -8);

    this.physics.overlap(this.key1,this.myGroup,this.hitKey,null,this);

    this.player.flipX = false;

  }

  hitKey (staticKey, dynamicKey) {
    var wKey = this.input.keyboard﻿.addKey﻿(Phaser﻿.Input.Keyboard.KeyCodes.W);
    var aKey = this.input.keyboard﻿.addKey﻿(Phaser﻿.Input.Keyboard.KeyCodes.A);
    var sKey = this.input.keyboard﻿.addKey﻿(Phaser﻿.Input.Keyboard.KeyCodes.S);
    var dKey = this.input.keyboard﻿.addKey﻿(Phaser﻿.Input.Keyboard.KeyCodes.D);
    this.indicatorText.destroy();

    if(staticKey['texture']['key'] == "wKey"){
      if(wKey.isDown){
        if(dynamicKey.x > 400){
          this.indicatorText = this.add.text(370, 550, 'Early',
          {fontFamily: 'Fantasy', fontSize: 30, color: '#FF0000'});
          this.score+=.5;
          this.sound.play('Miss');
        }
        else if(dynamicKey.x < 350){
          this.indicatorText = this.add.text(370, 550, 'Late',
          {fontFamily: 'Fantasy', fontSize: 30, color: '#FF0000'});
          this.score+=.5;
          this.sound.play('Miss');
        }
        else{
          this.indicatorText = this.add.text(370, 550, 'Great!',
          {fontFamily: 'Fantasy', fontSize: 30, color: '#32FF00'});
          this.score+=1;
          this.sound.play('Good');
        }
        dynamicKey.destroy();
        this.scoreText.setText("Score: " + this.score);
      }
    }
    else if(staticKey['texture']['key'] == "aKey"){
      if(aKey.isDown){
        if(dynamicKey.x > 400){
          this.indicatorText = this.add.text(370, 550, 'Early',
          {fontFamily: 'Fantasy', fontSize: 30, color: '#FF0000'});
          this.score+=.5;
          this.sound.play('Miss');
        }
        else if(dynamicKey.x < 350){
          this.indicatorText = this.add.text(370, 550, 'Late',
          {fontFamily: 'Fantasy', fontSize: 30, color: '#FF0000'});
          this.score+=.5;
          this.sound.play('Miss');
        }
        else{
          this.indicatorText = this.add.text(370, 550, 'Great!',
          {fontFamily: 'Fantasy', fontSize: 30, color: '#32FF00'});
          this.score+=1;
          this.sound.play('Good');
        }
        dynamicKey.destroy();
        this.scoreText.setText("Score: " + this.score);
      }
    }
    else if(staticKey['texture']['key'] == "sKey"){
      if(sKey.isDown){
        if(dynamicKey.x > 400){
          this.indicatorText = this.add.text(370, 550, 'Early',
          {fontFamily: 'Fantasy', fontSize: 30, color: '#FF0000'});
          this.score+=.5;
          this.sound.play('Miss');
        }
        else if(dynamicKey.x < 350){
          this.indicatorText = this.add.text(370, 550, 'Late',
          {fontFamily: 'Fantasy', fontSize: 30, color: '#FF0000'});
          this.score+=.5;
          this.sound.play('Miss');
        }
        else{
          this.indicatorText = this.add.text(370, 550, 'Great!',
          {fontFamily: 'Fantasy', fontSize: 30, color: '#32FF00'});
          this.score+=1;
          this.sound.play('Good');
        }
        dynamicKey.destroy();
        this.scoreText.setText("Score: " + this.score);
      }
    }
    else if(staticKey['texture']['key'] == "dKey"){
      if(dKey.isDown){
        if(dynamicKey.x > 400){
          this.indicatorText = this.add.text(370, 550, 'Early',
          {fontFamily: 'Fantasy', fontSize: 30, color: '#FF0000'});
          this.score+=.5;
          this.sound.play('Miss');
        }
        else if(dynamicKey.x < 350){
          this.indicatorText = this.add.text(370, 550, 'Late',
          {fontFamily: 'Fantasy', fontSize: 30, color: '#FF0000'});
          this.score+=.5;
          this.sound.play('Miss');
        }
        else{
          this.indicatorText = this.add.text(370, 550, 'Great!',
          {fontFamily: 'Fantasy', fontSize: 30, color: '#32FF00'});
          this.score+=1;
          this.sound.play('Good');

        }
        dynamicKey.destroy();
        this.scoreText.setText("Score: " + this.score);
      }
    }
    if(this.score > 1){
      this.gameOver = true;
      this.scoreText.setText("You win");
      this.myGroup.clear(true);
      /*
      If the player wins the minigame, it takes
      hem back to the other scene and sets convertedzombie to true*/
      window.convertedZombie = true;
      this.scene.stop('WorldScene2');
      this.scene.wake('WorldScene1');
      //this.scene.stop('WorldScene2');

  //    this.scene.start('WinScene');


    }
  }

  zombieHit (player, zombie){
    this.scoreText.setText("You lose")
    this.scene.start('LoseScene');
    this.track1.destroy();
  }

}
