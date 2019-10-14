/*global Phaser*/
import * as ChangeScene from "./ChangeScene.js";

var textTimer = 0;
var text;


window.convertedZombie = false;
//global var to see if zombie is converted or not

export default class WorldScene1 extends Phaser.Scene {

  constructor () {
    super('WorldScene1');
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
    this.load.spritesheet("gothZombie", "./assets/sprites/gothSpriteSheet.png", {
      frameHeight: 3253,
      frameWidth: 1583
    });
    this.load.image('background', './assets/images/background.png');

    /*  Loads "transformed person sprite"*/
    this.load.spritesheet("transformedGuy", "./assets/sprites/guySpriteSheet.png", {
      frameHeight: 960,
      frameWidth: 525
    });

    // An atlas is a way to pack multiple images together into one texture. I'm using it to load all
    // the player animations (walking left, walking right, etc.) in one image. For more info see:
    //  https://labs.phaser.io/view.html?src=src/animation/texture%20atlas%20animation.js
    // If you don't use an atlas, you can do the same thing with a spritesheet, see:
    //  https://labs.phaser.io/view.html?src=src/animation/single%20sprite%20sheet.js
    this.load.atlas(
      "atlas",
      "./assets/atlas/atlas.png",
      "./assets/atlas/atlas.json"
    );
  }

  create() {
    this.add.image(1001.5,561.5,"background")
    //Add change scene event listeners
    ChangeScene.addSceneEventListeners(this);

    const map = this.make.tilemap({ key: "map" });

    // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
    // Phaser's cache (i.e. the name you used in preload)
    //const tileset = map.addTilesetImage("tuxmon-sample-32px-extruded", "tiles");

    // Parameters: layer name (or index) from Tiled, tileset, x, y
    //const belowLayer = map.createStaticLayer("Below Player", tileset, 0, 0);
    //const worldLayer = map.createStaticLayer("World", tileset, 0, 0);
    //const aboveLayer = map.createStaticLayer("Above Player", tileset, 0, 0);

    // worldLayer.setCollisionByProperty({ collides: true });

    //aboveLayer.setDepth(10);

    const spawnPoint = map.findObject(
      "Objects",
      obj => obj.name === "Spawn Point"
    );

    // Create a sprite with physics enabled via the physics system. The image used for the sprite has
    // a bit of whitespace, so I'm using setSize & setOffset to control the size of the player's body.
    this.player = this.physics.add
      .sprite(900, 500, "girl")
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
    this.zombieGroup = this.add.group();
    var i;
    for (i = 0; i < 4; i++) {

      this.zombie1 = this.physics.add
        .sprite(300 + this.increment, 300 + this.increment2, zombies[i]);
    //  this.transformed = this.physics.add.sprite(1600 + this.increment3, 300 + this.increment3 , "transformedGuy")
      //this.transformed.scale = .2;
      //this.zombie1.anims.play("gothZombieWalk",true);
      this.zombie1.scale = .12;
      this.zombieGroup.add(this.zombie1);
    //  this.transformed.visible = false;
      //this.transformedGroup.add(this.transformed);
      this.increment += 300;
      this.increment2  += 200;
      //this.increment3 += 100

    }

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
      frameRate: 10,
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
    text = this.add
      .text(16, 16, 'Arrow keys to move\nTeach all the zombies how to dance again', {
        font: "40px monospace",
        fill: "#000000",
        padding: { x: 20, y: 10 },
        backgroundColor: "#ffffff"
      })
      .setScrollFactor(0)
      .setDepth(30);


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

    this.physics.add.overlap(this.player,this.zombieGroup,this.sceneHit,null,this);
//    this.physics.add.overlap(this.player,this.transformedGroup,this.shadowHit,null,this);



    if (window.convertedZombie == true) {
      //if convertedzombie boolean set to true in worldscene2 then it adds
      //transformed sprite to the screen
      this.transformed = this.physics.add.sprite(1600 + this.increment3, 300 + this.increment3 , "transformedGuy")
      this.transformed.scale = .2;
      this.transformedGroup.add(this.transformed);
      this.increment3 = this.increment3 + 100;
      window.convertedZombie = false;

    }

    textTimer += 1;
    if(textTimer > 300) {
      text.setVisible(false);
    }


    const speed = 250;
    var zomSpeed = 20;
    var zombieAnims = ["gothZombieWalk","cheerZombieWalk","businessZombieWalk","hipsterZombieWalk"]
    //Helps set up zombie movememnt
    Phaser.Actions.Call(this.zombieGroup.getChildren(), function(child) {

      var index = 0
      if(child.x > this.player.x) {
        child.body.setVelocityX(-zomSpeed);
        //child.anims.play(zombieAnims[index], true);
        child.flipX = false;
      }
      else if (child.x < this.player.x){
        child.body.setVelocityX(zomSpeed);
        //child.anims.play(zombieAnims[index], true);
        child.flipX = true;
      }

      if(child.y > this.player.y) {
        child.body.setVelocityY(-zomSpeed);
      }
      else if(child.y < this.player.y){
        child.body.setVelocityY(zomSpeed);
      }

      var index = index + 1

    }, this);



    //movement for invisible transformed people
    /*this.transformedSpeed = 20;
    Phaser.Actions.Call(this.transformedGroup.getChildren(), function(indiv) {
      if(indiv.x > this.player.x) {
        indiv.body.setVelocityX(-this.transformedSpeed);
        indiv.anims.play("transformedWalk", true);
        indiv.flipX = false;
      }
      else if (indiv.x < this.player.x){
        indiv.body.setVelocityX(this.transformedSpeed);
        indiv.anims.play("transformedWalk", true);
        indiv.flipX = true;
      }

      if(indiv.y > this.player.y) {
        indiv.body.setVelocityY(-this.transformedSpeed);
      }
      else if(indiv.y < this.player.y){
        indiv.body.setVelocityY(this.transformedSpeed);
      }

    }, this);*/


    //old code for one zombie
    /*const transformedSpeed = 90;
    if(this.transformed.x > this.player.x) {
      this.transformed.body.setVelocityX(-transformedSpeed);
      this.transformed.anims.play("transformedWalk", true);
      this.transformed.flipX = false;
    }
    else if (this.transformed.x < this.player.x){
      this.transformed.body.setVelocityX(transformedSpeed);
      this.transformed.anims.play("transformedWalk", true);
      this.transformed.flipX = true;
    }

    if(this.transformed.y > this.player.y) {
      this.transformed.body.setVelocityY(-transformedSpeed);
    }
    else if(this.transformed.y < this.player.y){
      this.transformed.body.setVelocityY(transformedSpeed);
    }*/



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
    zombie.disableBody(true,true);
    this.cursors.up.isDown = false;
    this.cursors.down.isDown = false;
    this.cursors.left.isDown = false;
    this.cursors.right.isDown = false;

    this.scene.launch('WorldScene2');
    this.scene.sleep('WorldScene1');

  }

/*  shadowHit(player, guy) {
    //this function makes it so whichever zombie
    //collides with the human, its corresponding
    //invisible transformed person is set to visible and displayed if the Player
    //wins the mini game
    guy.visible = true;


  } */
}
