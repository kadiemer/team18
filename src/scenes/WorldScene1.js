/*global Phaser*/
import * as ChangeScene from "./ChangeScene.js";

var textTimer = 0;
var text;

// window.convertedZombie = false; global var to see if zombie is converted or not

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
    this.load.image('background', './assets/images/background.png');
    this.load.image('guySpriteSheet', "./assets/sprites/guySpriteSheet.png", {
      frameHeight: 96,
      frameWidth: 52.5
    });

    /*  Loads "transformed person sprite"
    this.load.spritesheet("transformedGuy", "./assets/sprites/guySpriteSheet.png", {
      frameHeight: 960,
      frameWidth: 525
    });    */

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

    this.player.scale = .11;

    /* Adds the transformed person to map and makes it invisible
    this.transformed = this.physics.add
      .sprite(900, 500, "transformedGuy")
      .setSize(30, 40)
      .setOffset(0, 24);

    this.transformed.scale = .2;
    this.transformed.visible = false; */

    // Watch the player and worldLayer for collisions, for the duration of the scene:
    //this.physics.add.collider(this.player, worldLayer);

    this.zombie = this.physics.add
      .sprite(300, 300, "zombie");

    this.zombie.scale = .2;


    // Watch the player and zombie for collisions, for the duration of the scene:
    //this.physics.add.collider(this.player, this.zombie);
    this.physics.add.overlap(this.player,this.zombie,this.sceneHit,null,this);

    // Create the player's walking animations from the texture atlas. These are stored in the global
    // animation manager so any sprite can access them.

    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNumbers("girl", { start: 0, end: 11 }),
      frameRate: 12,
      repeat: -1
    });
    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("girl", { start: 0, end: 0 }),
      frameRate: 12,
      repeat: -1
    });
    this.anims.create({
      key: "zombieWalk",
      frames: this.anims.generateFrameNumbers("zombie", { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "zombieIdle",
      frames: this.anims.generateFrameNumbers("zombie", { start: 5, end: 5 }),
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
    /* If zombie has been converted in the minigame it changes the
    zombie sprite to to the transformed guy sprite
    if (window.convertedZombie == true) {
      this.zombie.disableBody(true,true);
      this.transformed.visible = true;

    } */

    textTimer += 1;
    if(textTimer > 300) {
      text.setVisible(false);
    }


    const speed = 250;
    const zomSpeed = 60;

    if(this.zombie.x > this.player.x) {
      this.zombie.body.setVelocityX(-zomSpeed);
      this.zombie.anims.play("zombieWalk", true);
      this.zombie.flipX = false;
    }
    else if (this.zombie.x < this.player.x){
      this.zombie.body.setVelocityX(zomSpeed);
      this.zombie.anims.play("zombieWalk", true);
      this.zombie.flipX = true;
    }

    if(this.zombie.y > this.player.y) {
      this.zombie.body.setVelocityY(-zomSpeed);
    }
    else if(this.zombie.y < this.player.y){
      this.zombie.body.setVelocityY(zomSpeed);
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
    this.scene.start('WorldScene2');

    /* Pauses this scene after a collision and starts the minigame
    this.scene.launch('WorldScene2');
    this.scene.pause('WorldScene1');
    */
  }
}
