/*global Phaser*/
import * as ChangeScene from "./ChangeScene.js";

var textTimer = 0;
var text;



window.convertedZombie2 = false;
//global var to see if zombie is converted or not

export default class TutorialScene1Pt2 extends Phaser.Scene {

  constructor () {
    super('TutorialScene1Pt2');
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

    this.sCounter = 0;
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
    this.player.setCollideWorldBounds(true);
    this.physics.world.setBounds(0, 0, 1850, 765.5);


     //Adds the transformed person to map and makes it invisible*/
    // THe following code adds 4 zombies to the map and 4 invisible transformed
    // Person sprites to the map and stores the zombie and person in a group
    this.transformedGroup = this.add.group();
    this.increment = 0;
    this.increment2 = 0;
    this.increment3=0; //this is used in the update file to add transformed zombies
    this.oldZombiex = 0;
    this.oldZombiey = 0;
    this.exited = false;
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
      this.increment += 300;
      this.increment2  += 200;
      //this.increment3 += 100

    }
    this.play = this.add.text(1500,900, '< play game now >',
    {fontFamily: 'Fantasy', fontSize: 50, color: '#ffffff'}).setInteractive();
    this.play.on("pointerup", function() {
      this.scene.start('WorldScene1');
    }, this
  );
    this.play.visible = false;

    this.text4 = this.add
        .text(400, 180, 'Using arrow keys to move around, collide\nwith the zombies and teach them to dance again!', {
          font: "40px monospace",
          fill: "#000000",
          padding: { x: 20, y: 10 },
          backgroundColor: "#ffffff"
        })
        .setScrollFactor(0)
        .setDepth(30);
   this.physics.world.enable(this.text4);

        this.text5 = this.add
            .text(400, 180, 'Congrats! You have completed the tutorial\nand converted the zombie back to a human again\nYou are now ready to Dance the Bite Away!\n(Press Enter to start game...)', {
              font: "40px monospace",
              fill: "#000000",
              padding: { x: 20, y: 10 },
              backgroundColor: "#ffffff"
            })
            .setScrollFactor(0)
            .setDepth(30);
        this.text5.visible = false;
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

    // Help text that has a "fixed" position on the screen



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
    //checks for collisions between the zombies and the Player
  /*  if(this.zombieGroup.getLength() === 0 && window.convertedZombie2 == true){
      this.scene.sleep("WorldScene1");
      this.scene.start("WinScene");
    }*/

    this.physics.add.overlap(this.player,this.zombieGroup,this.sceneHit,null,this);
//    this.physics.add.overlap(this.player,this.transformedGroup,this.shadowHit,null,this);
    //this.variable1 = this.physics.add.overlap(this.player, this.text4, this.textHit, null, this );
  /*  if (this.player.y < 440 && this.player.x > 400 && this.player.x < 1640) {
      this.text4.visible = false;
    }
    else {
      this.text4.visible = true;
    } */

    //this.player.x > 400  && this.player.x < 1640




    if (window.convertedZombie2 == true) {
      //var enterKey = this.input.keyboard﻿.addKey﻿(Phaser﻿.Input.Keyboard.KeyCodes.ENTER);
      //if convertedzombie boolean set to true in worldscene2 then it adds
      //transformed sprite to the screen
      this.transformed = this.physics.add.sprite(this.oldZombiex + 300, this.oldZombiey, "transformedGuy")
      this.transformed.scale = .35;
      this.transformedGroup.add(this.transformed);
      window.convertedZombie2 = false;
      this.physics.add.collider(this.transformed,this.zombieGroup,this.transformedHit,null,this);
      this.text4.destroy();
      this.text5.visible = true;
    //  this.play.visible = true;
      this.sCounter +=1;

      /*if(enterKey.isDown){
        this.scene.start("WorldScene1");
        console.log('part 2 started');
        enterKey.isDown = false;

    };*/
  } else 
    {
    if (this.player.y < 440 && this.player.x > 400 && this.player.x < 1640) {
      this.text4.visible = false;
    }
    else {
      this.text4.visible = true;
    }
  }
    var enterKey = this.input.keyboard﻿.addKey﻿(Phaser﻿.Input.Keyboard.KeyCodes.ENTER);
    if(enterKey.isDown && this.sCounter == 1){
      this.cursors.up.isDown = false;
      this.cursors.down.isDown = false;
      this.cursors.left.isDown = false;
      this.cursors.right.isDown = false;
      this.scene.start("WorldScene1");
      console.log('part 2 started');
      enterKey.isDown = false;

  };




    const speed = 250;
    var zomSpeed = 20;
    var zombieAnims = ["gothZombieWalk","cheerZombieWalk","businessZombieWalk","hipsterZombieWalk"]
    //Helps set up zombie movememnt
    if (this.transformedGroup.getLength() != 0){
      Phaser.Actions.Call(this.transformedGroup.getChildren(), function(transformed){
        Phaser.Actions.Call(this.zombieGroup.getChildren(), function(child) {

          if(Math.abs(Math.sqrt((transformed.x*transformed.x - child.x*child.x) + (transformed.y*transformed.y - child.y*child.y))) > Math.abs(Math.sqrt((this.player.x*this.player.x - child.x*child.x) + (this.player.y*this.player.y - child.y*child.y)))){
            if(child.x > this.player.x) {
              child.body.setVelocityX(-zomSpeed);
              //child.anims.play("zombieWalk", true);
              child.flipX = false;
            }
            else if (child.x < this.player.x){
              child.body.setVelocityX(zomSpeed);
              //child.anims.play("zombieWalk", true);
              child.flipX = true;
            }

            if(child.y > this.player.y) {
              child.body.setVelocityY(-zomSpeed);
            }
            else if(child.y < this.player.y){
              child.body.setVelocityY(zomSpeed);
            }
          }
          else{
            if(child.x > transformed.x) {
              child.body.setVelocityX(-zomSpeed);
              //child.anims.play("zombieWalk", true);
              child.flipX = false;
            }
            else if (child.x < transformed.x){
              child.body.setVelocityX(zomSpeed);
              //child.anims.play("zombieWalk", true);
              child.flipX = true;
            }

            if(child.y > transformed.y) {
              child.body.setVelocityY(-zomSpeed);
            }
            else if(child.y < transformed.y){
              child.body.setVelocityY(zomSpeed);
            }
          }

        }, this);
      },this);
    }
    else{
      Phaser.Actions.Call(this.zombieGroup.getChildren(), function(child) {
        if(child.x > this.player.x) {
          child.body.setVelocityX(-zomSpeed);
          //child.anims.play("zombieWalk", true);
          child.flipX = false;
        }
        else if (child.x < this.player.x){
          child.body.setVelocityX(zomSpeed);
          //child.anims.play("zombieWalk", true);
          child.flipX = true;
        }

        if(child.y > this.player.y) {
          child.body.setVelocityY(-zomSpeed);
        }
        else if(child.y < this.player.y){
          child.body.setVelocityY(zomSpeed);
        }
      }, this);
    }

    const prevVelocity = this.player.body.velocity.clone();

    // Stop any previous movement from the last frame
    this.player.body.setVelocity(0);

    // Horizontal movement
    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-speed);
      this.player.anims.play("walk", true);
      this.player.flipX = true;
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(speed);
     this.player.anims.play("walk", true);
      this.player.flipX = false;
    } else {
     this.player.anims.play("idle", true);
    }

    // Vertical movement
    if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-speed);
    } else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(speed);
    }

    // Normalize and scale the velocity so that player can't move faster along a diagonal
    this.player.body.velocity.normalize().scale(speed);




  }

  sceneHit(player, zombie) {

    // Pauses this scene after a collision and starts the minigame
    // Disables whichever zombie is being collided with
    this.oldZombiex = zombie.x;
    this.oldZombiey = zombie.y;
    zombie.disableBody(true,true);
    this.cursors.up.isDown = false;
    this.cursors.down.isDown = false;
    this.cursors.left.isDown = false;
    this.cursors.right.isDown = false;

    this.scene.launch('TutorialScene2');
    this.zombieGroup.remove(zombie);
    this.scene.sleep('TutorialScene1Pt2');

  }

  textHit(player, text) {

    // Pauses this scene after a collision and starts the minigame
    // Disables whichever zombie is being collided with
    console.log(' Collision occurred')
    text.visible = false;
    this.variable1.destroy();

  }

  transformedHit(transformed, zombie) {

    // Pauses this scene after a collision and starts the minigame
    // Disables whichever zombie is being collided with
    this.transformedGroup.remove(transformed);
    var oldX = transformed.x;
    var oldY = transformed.y;
    transformed.destroy();
    this.newZomb = this.physics.add.sprite(oldX, oldY+100, "zombie");
    this.newZomb.scale = .4;
    this.zombieGroup.add(this.newZomb);

  }


/*  shadowHit(player, guy) {
    //this function makes it so whichever zombie
    //collides with the human, its corresponding
    //invisible transformed person is set to visible and displayed if the Player
    //wins the mini game
    guy.visible = true;


  } */
}
