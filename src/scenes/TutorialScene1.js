/*global Phaser*/
import * as ChangeScene from "./ChangeScene.js";

var textTimer = 0;
var text;



//global var to see if zombie is converted or not

export default class TutorialScene1 extends Phaser.Scene {

  constructor () {
    super('TutorialScene1');
  }

  preload() {
    this.load.image("tiles", "./assets/tilesets/tuxmon-sample-32px-extruded.png");
    this.load.tilemapTiledJSON("map", "./assets/tilemaps/tuxemon-town.json");
    this.load.spritesheet("zombie", "./assets/sprites/zombieSpriteSheet.png", {
      frameHeight: 940,
      frameWidth: 491
    });
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
    this.load.image('background', './assets/images/background.png');

    /*  Loads "transformed person sprite"*/
    this.load.spritesheet("transformedGuy", "./assets/sprites/guySpriteSheet.png", {
      frameHeight: 960,
      frameWidth: 525
    });

    this.load.atlas(
      "atlas",
      "./assets/atlas/atlas.png",
      "./assets/atlas/atlas.json"
    );
  }

  create() {
    this.minigameZombie;
    this.add.image(1001.5,561.5,"background")
    //Add change scene event listeners
    ChangeScene.addSceneEventListeners(this);

    const map = this.make.tilemap({ key: "map" });

    const spawnPoint = map.findObject(
      "Objects",
      obj => obj.name === "Spawn Point"
    );

    // Create a sprite with physics enabled via the physics system. The image used for the sprite has
    // a bit of whitespace, so I'm using setSize & setOffset to control the size of the player's body.
    this.player = this.physics.add
      .sprite(600, 700, "girl")
      .setSize(30, 40)
      .setOffset(0, 24);

    this.player.scale = .2;
    var zombies = ["gothZombie","cheerZombie","businessZombie","hipsterZombie"];

     //Adds the transformed person to map and makes it invisible*/
    // THe following code adds 4 zombies to the map and 4 invisible transformed
    // Person sprites to the map and stores the zombie and person in a group
    this.transformedGroup = this.add.group();
    this.increment = 0;
    this.increment2 = 0;
    this.increment3=0; //this is used in the update file to add transformed zombies
    this.oldZombiex = 0;
    this.oldZombiey = 0;
    this.zombieGroup = this.add.group();
    var i;
    for (i = 0; i < 1; i++) {

      this.zombie1 = this.physics.add
        .sprite(1400, 720, zombies[i]);
    //  this.transformed = this.physics.add.sprite(1600 + this.increment3, 300 + this.increment3 , "transformedGuy")
      //this.transformed.scale = .2;
      //this.zombie1.anims.play("gothZombieWalk",true);
      this.zombie1.scale = .45;
      this.zombie1.num = i;
      this.zombieGroup.add(this.zombie1);
    //  this.transformed.visible = false;
      //this.transformedGroup.add(this.transformed);

      //this.increment3 += 100

    }








  /*  this.transformedGroup = this.add.group();
     //this is used in the update file to add transformed zombies
    this.oldZombiex = 0;
    this.oldZombiey = 0;



    this.zombie1 = this.physics.add.sprite(1400, 720, zombies[0]);
    this.zombie1.scale = .45; */

    text = this.add
      .text(400, 200, 'Welcome to the tutorial of Dance the Bite Away!\n(Press Enter to continue...)', {
        font: "40px monospace",
        fill: "#000000",
        padding: { x: 20, y: 10 },
        backgroundColor: "#ffffff"
      })
      .setScrollFactor(0)
      .setDepth(30);

    this.loopCounter = 0;

    /*this.text2 = this.add
        .text(400, 180, 'Your objective is to convert the zombies back \nto humans by teaching them how to dance.\n(Press Enter to continue...)', {
          font: "40px monospace",
          fill: "#000000",
          padding: { x: 20, y: 10 },
          backgroundColor: "#ffffff"
        })
        .setScrollFactor(0)
        .setDepth(30);
    this.text2.visible = false;*/

    this.text2 = this.add
        .text(400, 180, 'Your objective is to convert the zombies back \nto humans by teaching them how to dance.\n(Press Enter to continue...)', {
          font: "40px monospace",
          fill: "#000000",
          padding: { x: 20, y: 10 },
          backgroundColor: "#ffffff"
        })
        .setScrollFactor(0)
        .setDepth(30);
    this.text2.visible = false;

  /*  this.text3 = this.add
        .text(400, 180, 'Throughout the game you will encounter a variety \nof rooms and levels. In each room the\nzombies will run after you and any other\nhumans on the map.You must quickly/strategically\nmove around and convert each zombie before they\nget to any other humans \n(Press Enter to continue...)', {
          font: "40px monospace",
          fill: "#000000",
          padding: { x: 20, y: 10 },
          backgroundColor: "#ffffff"
        })
        .setScrollFactor(0)
        .setDepth(30);
    this.text3.visible = false; */

    this.text3 = this.add
        .text(400, 180, 'Using arrow keys to move around, collide\nwith the zombies and teach them to dance again!\n(Press Enter to start the movement...)', {
          font: "40px monospace",
          fill: "#000000",
          padding: { x: 20, y: 10 },
          backgroundColor: "#ffffff"
        })
        .setScrollFactor(0)
        .setDepth(30);
    this.text3.visible = false;

    /*this.text4 = this.add
        .text(400, 180, 'Using arrow keys to move around, collide\nwith the zombies and teach them to dance again!)', {
          font: "40px monospace",
          fill: "#000000",
          padding: { x: 20, y: 10 },
          backgroundColor: "#ffffff"
        })
        .setScrollFactor(0)
        .setDepth(30);
    this.text4.visible = false;*/




    /*this.zombie = this.physics.add
      .sprite(300, 300, "zombie");

    this.zombie.scale = .2; */


    // Watch the player and zombie for collisions, for the duration of the scene:
    //this.physics.add.collider(this.player, this.zombie);
    //this.counter2 = 0;
    //Phaser.Actions.Call(this.zombieGroup.getChildren(), function(child) {
  //    this.physics.add.overlap(this.player,child,this.sceneHit,null,this);
    //  this.str1 = this.counter2.toString();
    //  console.log(this.str1)

//    } , this);
    // Create the player's walking animations from the texture atlas. These are stored in the global
    // animation manager so any sprite can access them.

    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNumbers("girl", { start: 0, end: 11 }),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("girl", { start: 0, end: 0 }),
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
     //transformed walking animations
    this.anims.create({
      key: "transformedWalk",
      frames: this.anims.generateFrameNumbers("transformedGuy", { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "transformedIdle",
      frames: this.anims.generateFrameNumbers("transformedGuy", { start: 5, end: 5 }),
      frameRate: 10,
      repeat: -1
    });

    const camera = this.cameras.main;
    camera.startFollow(this.player);
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    this.cursors = this.input.keyboard.createCursorKeys();




    // Debug graphics
    this.input.keyboard.once("keydown_D", event => {
      // Turn on physics debugging to show player's hitbox
    this.physics.world.createDebugGraphic();

   // Create worldLayer collision graphic above the player, but below the help text
      const graphics = this.add
        .graphics()
        .setAlpha(0.75)
        .setDepth(20);
      worldLayer.renderDebug(graphics, {
        tileColor: null, // Color of non-colliding tiles
        collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
      });
    });


  }



  update(time, delta) {
    var enterKey = this.input.keyboard﻿.addKey﻿(Phaser﻿.Input.Keyboard.KeyCodes.ENTER);

    if(enterKey.isDown && this.loopCounter == 0){
      text.destroy();
      this.text2.visible = true;
      enterKey.isDown = false;
      this.loopCounter +=1;
    };
    if(enterKey.isDown && this.loopCounter == 1){
      this.text2.destroy();
      this.text3.visible = true;
      enterKey.isDown = false;
      this.loopCounter +=1;
    };
    if(enterKey.isDown && this.loopCounter == 2){
      this.scene.start("TutorialScene1Pt2");
      console.log('part 2 started');
      //this.text3.destroy();
    //  this.text4.visible = true;
      enterKey.isDown = false;
    //  this.loopCounter +=1;
   };


/*    if(enterKey.isDown && this.loopCounter == 3){
      this.scene.start("TutorialScene1Pt2");
      console.log('part 2 started');
      enterKey.isDown = false; */



  //  };












}
}
