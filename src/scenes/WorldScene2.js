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
    this.load.spritesheet("zombie", "./assets/sprites/zombieSpriteSheet.png", {
      frameHeight: 940,
      frameWidth: 491
    });
    this.load.image("guy", "./assets/sprites/guySprite.png");
    this.load.image('wKey', './assets/images/wKey.png');
    this.load.image('aKey', './assets/images/aKey.png');
    this.load.image('sKey', './assets/images/sKey.png');
    this.load.image('dKey', './assets/images/dKey.png');

    this.load.audio('track1', './assets/sounds/track1.mp3');



    // Declare variables for center of the scene
    this.centerX = this.cameras.main.width / 2;
    this.centerY = this.cameras.main.height / 2;
  }

  create (data) {

    this.gameOver = false;
    this.scoreText;
    this.score = 0;

    //Create the scene
    this.add.image(1001.5,561.5,"danceBackground");

    this.player = this.physics.add
      .sprite(150, 850, "guy");
    this.player.scale = .5;

    this.zombie = this.physics.add
      .sprite(1800, 850, "zombie");

    this.zombie.scale = .5;

    this.physics.add.collider(this.player,this.zombie,this.zombieHit,null,this);

    //Adds base keys and makes the image smaller

    this.key1 = this.physics.add.sprite(750,450,'wKey');
    this.key1.setScale(1);
    this.key2 = this.physics.add.sprite(900,450,'aKey');
    this.key2.setScale(1);
    this.key3 = this.physics.add.sprite(1050,450,'sKey');
    this.key3.setScale(1);
    this.key4 = this.physics.add.sprite(1200,450,'dKey');
    this.key4.setScale(1);


    //creates a group for the falling sprites and an array to store the different keys
    this.myGroup = this.add.group();

    //Uses first 15 seconds of the track
    var track1 = this.sound.add('track1');
    track1.addMarker({
        name: 'track1',
        start: 0.00,
        duration: 100
      });

      //Adds play button to the screen, the letters will start falling once you hit play

      var play = this.add.text(875, 525, '< play >',
      {fontFamily: 'Fantasy', fontSize: 50, color: '#ffffff'}).setInteractive();

      //Makes it so letters start falling after click
      play.on("pointerup", function() {
        track1.play('track1');
        this.time.addEvent({
        delay: 1500, //This is the amount of time in which each letter is delayed
        callback: function(){

          //This is the function that picks a random letter and makes it fall

          this.picker = getRandomInt(4);
          if (this.picker == 0) {
            this.wKey = this.physics.add.sprite(750, 50, 'wKey');
            this.myGroup.add(this.wKey);
          }
          else if (this.picker == 1) {
            this.aKey = this.physics.add.sprite(900, 50, 'aKey');
            this.myGroup.add(this.aKey);
          }
          else if (this.picker == 2) {
            this.sKey = this.physics.add.sprite(1050, 50, 'sKey');
            this.myGroup.add(this.sKey);
          }
          else if (this.picker == 3) {
            this.dKey = this.physics.add.sprite(1200, 50, 'dKey');
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
        repeat: 1000 }) //this is how many letters fall + 1
      }, this
    );

    this.anims.create({
      key: "zombieWalk",
      frames: this.anims.generateFrameNumbers("zombie", { start: 0, end: 5 }),
      frameRate: 5,
      repeat: -1
    });

    //function used to generate random index for list of keys
      function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }
      this.scoreText = this.add.text(50, 16, "score: 0", {
        fontSize: "40px",
        fill: "#000"
        });

  }

  update(time, delta) {

    this.zombie.x -= .7;

    if(this.gameOver != true){
      this.zombie.anims.play("zombieWalk", true);
    }
    else if(this.gameOver == true){
      this.zombie.destroy();
    }
    //Makes the letters fall down at speed of 2
    Phaser.Actions.IncY(this.myGroup.getChildren(), 2);

    this.physics.overlap(this.key1,this.myGroup,this.hitKey,null,this);

    this.player.flipX = true;

  }

  hitKey (staticKey, dynamicKey) {
    var wKey = this.input.keyboard﻿.addKey﻿(Phaser﻿.Input.Keyboard.KeyCodes.W);
    var aKey = this.input.keyboard﻿.addKey﻿(Phaser﻿.Input.Keyboard.KeyCodes.A);
    var sKey = this.input.keyboard﻿.addKey﻿(Phaser﻿.Input.Keyboard.KeyCodes.S);
    var dKey = this.input.keyboard﻿.addKey﻿(Phaser﻿.Input.Keyboard.KeyCodes.D);
    if(staticKey['texture']['key'] == "wKey"){
      if(wKey.isDown){
        console.log("Pressing the w key")
        dynamicKey.destroy();
        this.score+=1;
        this.scoreText.setText("Score: " + this.score);
      }
    }
    else if(staticKey['texture']['key'] == "aKey"){
      if(aKey.isDown){
        console.log("Pressing the a key")
        dynamicKey.destroy();
        this.score+=1;
        this.scoreText.setText("Score: " + this.score);
      }
    }
    else if(staticKey['texture']['key'] == "sKey"){
      if(sKey.isDown){
        console.log("Pressing the s key")
        dynamicKey.destroy();
        this.score+=1;
        this.scoreText.setText("Score: " + this.score);
      }
    }
    else if(staticKey['texture']['key'] == "dKey"){
      if(dKey.isDown){
        console.log("Pressing the d key")
        dynamicKey.destroy();
        this.score+=1;
        this.scoreText.setText("Score: " + this.score);
      }
    }
    if(this.score > 14){
      this.gameOver = true;
      this.scoreText.setText("You win")
      this.myGroup.clear(true);
      this.scene.start('WinScene');


    }
  }

  zombieHit (player, zombie){
    this.scoreText.setText("You lose")
    this.scene.start('LoseScene');


  }

}
