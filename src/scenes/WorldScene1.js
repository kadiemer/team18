/*global Phaser*/
import * as ChangeScene from "./ChangeScene.js";

var textTimer = 0;
var newTimer = 0;
var text;
var text1;
var text2;
var transformedCount;
var transformTimer = 0;
var sfx;


window.totalMiniGames = 0;
window.convertedZombie = false;
window.transformedSprite = "nothing";
window.transformedCount = 0;
window.zombieCount = 0;



//global var to see if zombie is converted or not

export default class WorldScene1 extends Phaser.Scene {

  constructor () {
    super('WorldScene1');
  }


  preload() {
    this.load.audio('track2','./assets/sounds/track2.mp3');
    this.load.audio('zombie','./assets/sounds/zombie.m4a');
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

    this.load.spritesheet("normalGoth", "./assets/sprites/normalGoth.png", {
      frameHeight: 784,
      frameWidth: 290
    });
    this.load.spritesheet("normalBusiness", "./assets/sprites/normalBusinessMan.png", {
      frameHeight: 784,
      frameWidth: 284
    });
    this.load.spritesheet("normalCheer", "./assets/sprites/NormalCheer.png", {
      frameHeight: 784,
      frameWidth: 380
    });
    this.load.spritesheet("normalHipster", "./assets/sprites/normalHipster.png", {
      frameHeight: 784,
      frameWidth: 315
    });

    /*  Loads "transformed person sprite"*/
    this.load.spritesheet("transformedGuy", "./assets/sprites/guySpriteSheet.png", {
      frameHeight: 960,
      frameWidth: 525
    });
    this.load.image('newBackground', './assets/images/newBackground.png');
    this.load.image('house1', './assets/images/house1.png');
    this.load.image('house2', './assets/images/house2.png');
    this.load.image('house3', './assets/images/house3.png');
    this.load.image('house4', './assets/images/house4.png');
    this.load.image('house5', './assets/images/house5.png');
    this.load.image('house6', './assets/images/house6.png');
    this.load.image('tree1', './assets/images/tree1.png');
    this.load.image('tree2', './assets/images/tree2.png');
    this.load.image('tree3', './assets/images/tree3.png');
    this.load.image('mailbox2', './assets/images/mailbox2.png');

  }

  create() {

    sfx = this.sound.add("zombie");
    this.minigameZombie;
    this.add.image(2150,1202.5,"newBackground");
    this.add.image(975,1775,"mailbox2");
    this.add.image(3900,1200,"mailbox2");
    this.delay;

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
      .sprite(100, 1775, "girl")
      .setSize(350, 500)
      .setOffset(400, 100);

    this.player.setCollideWorldBounds(true);
    this.physics.world.setBounds(50, 0, 4200, 2150);

    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }

    function generateX(max,zombies){
      var xCoord = getRandomInt(max);
      Phaser.Actions.Call(zombies.getChildren(), function(child) {
        while(Math.abs(xCoord - child.x) < 50) {
          xCoord = getRandomInt(max)
        }
      },this);
      return xCoord + 400

    }
    function generateY(max,zombies){
      var yCoord = getRandomInt(max);
      Phaser.Actions.Call(zombies.getChildren(), function(child) {
        while(Math.abs(yCoord - child.y) < 25) {
          yCoord = getRandomInt(max)
        }
      },this);
      return yCoord
    }



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
    var j = 0;
    for (i = 0; i < window.maxZombies; i++) { //window.maxZombies
  this.zombie1 = this.physics.add
        .sprite(generateX(4200,this.zombieGroup),generateY(2300,this.zombieGroup), zombies[j])
        .setSize(200, 300)
        .setOffset(100, 100)
        .setDepth(50);
    //  this.transformed = this.physics.add.sprite(1600 + this.increment3, 300 + this.increment3 , "transformedGuy")
      //this.transformed.scale = .2;
      //this.zombie1.anims.play("gothZombieWalk",true);
      this.zombie1.scale = .45;
      this.zombie1.num = i;
      this.zombie1.setCollideWorldBounds(true);
      this.zombieGroup.add(this.zombie1);
      window.zombieCount += 1;
      if (j == 3) {
        j = 0
      }
      else if (j < 3) {
        j++
      }




    //  this.transformed.visible = false;
      //this.transformedGroup.add(this.transformed);
      this.increment += 300;
      this.increment2  += 200;
      //this.increment3 += 10

    }

    //this.buildings = this.physics.add.staticGroup();

    //this.buildings
      //.create(1000, 620, "house1")
      //.body.setSize(300,375);
    //this.buildings
      //.create(2140, 1750, "house2")
      //.body.setSize(325,400);
    //this.buildings
      //.create(4000, 900, "house3")
      //.body.setSize(300,375);
    //this.buildings
      //.create(3660, 1700, "house4")
      //.body.setSize(300,375);
    //this.buildings
      //.create(850, 1400, "house5")
      //.body.setSize(350,450);
    //this.buildings
      //.create(2500, 650, "house6")
      //.body.setSize(425,500);









    this.physics.add.collider(this.player, this.buildings);
    this.physics.add.collider(this.zombieGroup, this.buildings);


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
      frameRate: 8,
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
      key: "transformedGothWalk",
      frames: this.anims.generateFrameNumbers("transformedGothWalk", { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1
    });



    const camera = this.cameras.main;
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBounds(0, 0, 4280, 2408);

    this.cursors = this.input.keyboard.createCursorKeys();



    // Help text that has a "fixed" position on the screen
    this.zombieCount = this.add
      .text(15,5, 'ZOMBIES TRANSFORMED:' + window.transformedCount + "/" + window.maxZombies , {
        fontFamily: "League Gothic",
        fontSize: 70,
        color: '#ab0000',
        stroke: "#000000",
        strokeThickness:5
      })
      .setScrollFactor(0)
      .setDepth(200)


    text = this.add
      .text(950/2, 700/2, 'THE WORLD HAS BEEN OVERRUN BY ZOMBIES\nYOU ARE THE ONLY ONE WHO CAN HELP', {
        fontFamily: "League Gothic",
        fontSize: 40,
        color: "#000000",
        padding: { x: 100, y: 100 },
        backgroundColor: "#e0dac3",
        align: 'center'
      })
      .setScrollFactor(0)
      .setDepth(200);

    text1 = this.add
          .text(720/2, 700/2, 'TEACH THEM TO DANCE TO FIND THEIR INNER HUMANITY\nUSE ARROW KEYS TO MOVE/COLLIDE WITH ZOMBIES', {
            fontFamily: "League Gothic",
            fontSize: 40,
            color: "#000000",
            padding: { x: 100, y: 100 },
            backgroundColor: "#e0dac3",
            align: 'center'
          })
          .setScrollFactor(0)
          .setDepth(200);

    text2 = this.add
          .text(950/2, 700/2, 'THE ZOMBIE TURNED BACK HUMAN, PROTECT THEM! \nTHEY CAN BE TURNED BACK IF THEY COLLIDE WITH A ZOMBIE', {
            fontFamily: "League Gothic",
            fontSize: 40,
            color: "#000000",
            padding: { x: 100, y: 100 },
            backgroundColor: "#e0dac3",
            align: 'center'
          })
          .setScrollFactor(0)
          .setDepth(200);



    // Debug graphics
    this.input.keyboard.once("keydown_D", event => {
      // Turn on physics debugging to show player's hitbox
    //this.physics.world.createDebugGraphic();

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

    //if(this.player.y > this.buildings.y) {
      //this.player.depth = 0;
    //}

    //checks for collisions between the zombies and the Player
    if(this.zombieGroup.getLength() === 0 && window.convertedZombie == true){
      this.scene.sleep("WorldScene1");
      this.scene.start("WinScene");
    }

    this.physics.add.overlap(this.player,this.zombieGroup,this.sceneHit,null,this);
//    this.physics.add.overlap(this.player,this.transformedGroup,this.shadowHit,null,this);


    if (window.convertedZombie == true) {
      //if convertedzombie boolean set to true in worldscene2 then it adds
      //transformed sprite to the screen
      this.transformed = this.physics.add.sprite(this.oldZombiex + 30, this.oldZombiey, window.transformedSprite)
      window.transformedSprite = "nothing";
      this.transformed.scale = .45
      this.transformed.setSize(200, 300)
      this.transformed.setOffset(0, 0)
      this.transformedGroup.add(this.transformed);
      this.transformed.setCollideWorldBounds(true);
      window.transformedCount += 1;
      this.zombieCount.setText("Zombies Transformed: " + window.transformedCount + "/" + window.maxZombies);
      window.convertedZombie = false;
      this.physics.add.collider(this.transformed,this.zombieGroup,this.transformedHit,null,this);

    }

    var zomSpeed = 0;
    var speed = 0;

    textTimer += 1;
    text1.setVisible(false);
    text2.setVisible(false);

    if(textTimer > 200) {
      text.setVisible(false);
      text1.setVisible(true);
      var zomSpeed = window.zombieSpeed;
      speed = 350;
      if (this.cursors.up.isDown || this.cursors.down.isDown){
        text1.destroy()
      }
      if(this.cursors.left.isDown || this.cursors.right.isDown){
        text1.destroy()
      }
      }


    if(window.totalMiniGames == 1){
      newTimer += 1;
      speed = 350;
      text2.setVisible(true);
      if(newTimer > 200) {
        text2.setVisible(false);
        zomSpeed = window.zombieSpeed;
      }
      if (this.cursors.up.isDown || this.cursors.down.isDown){
        text2.destroy()
      }
      if(this.cursors.left.isDown || this.cursors.right.isDown){
        text2.destroy()
      }
              }


    function distance(x1, y1, x2, y2) {
        var dx = x1 - x2;
        var dy = y1 - y2;

        return Math.sqrt(dx * dx + dy * dy);
    }

    function zombieFollow(zombie,transGroup,player) {
      var closest = 5000;
      var closestObj = null;
      var newDistance;
      Phaser.Actions.Call(transGroup.getChildren(), function(transformed) {
        newDistance = distance(zombie.x,zombie.y,transformed.x,transformed.y);
        if(newDistance < closest) {
          closest = newDistance;
          closestObj = transformed;
        }
      },this);
      newDistance = distance(zombie.x,zombie.y,player.x,player.y);
      if(newDistance < closest) {
        closestObj = player;
        return closestObj
      }
      else{
        return closestObj
      }
    }



    var zombieAnims = ["gothZombieWalk","cheerZombieWalk","businessZombieWalk","hipsterZombieWalk"]
    //Helps set up zombie movememnt
    if (zomSpeed > 0 ) {
      if (this.transformedGroup.getLength() != 0){
        Phaser.Actions.Call(this.zombieGroup.getChildren(), function(child) {
          var closestObj = zombieFollow(child,this.transformedGroup,this.player)
        if(distance(closestObj.x,closestObj.y,child.x,child.y) > 1100){
          child.enable = true;
          if(child.x > closestObj.x) {
            child.body.setVelocityX(zomSpeed);
            //child.anims.play("zombieWalk", true);
            child.flipX = true;
            }
          else if (child.x < closestObj){
            child.body.setVelocityX(-zomSpeed);
            //child.anims.play("zombieWalk", true);
            child.flipX = false;
          }
          if(child.y > closestObj.y) {
            child.body.setVelocityY(zomSpeed);
          }
          else if(child.y < closestObj.y){
            child.body.setVelocityY(-zomSpeed);
          }
        }
        if(distance(closestObj.x,closestObj.y,child.x,child.y) < 1100 || distance(closestObj.x,closestObj.y,child.x,child.y) > 2100) {
          child.enable = true;
          if(child.x > closestObj.x + 20) {
            child.body.setVelocityX(-zomSpeed);
            //child.anims.play("zombieWalk", true);
            child.flipX = false;
          }
          else if (child.x < closestObj.x - 20){
            child.body.setVelocityX(zomSpeed);
            //child.anims.play("zombieWalk", true);
            child.flipX = true;
          }
          else if (closestObj.x + 20 < child.x < closestObj.x - 20){
            child.body.setVelocityX(zomSpeed);
            //child.anims.play("zombieWalk", true);
          }
          if(child.y > closestObj.y) {
            child.body.setVelocityY(-zomSpeed);
            child.depth = 100;
            closestObj.depth = 5;
            }
          else if(child.y < closestObj.y){
            child.body.setVelocityY(zomSpeed);
            child.depth = 5;
            closestObj.depth = 100;
          }
        }

          Phaser.Actions.Call(this.transformedGroup.getChildren(), function(transformed) {
            if (transformed.y > this.player.y - 20){
              transformed.depth = 100;
              this.player.depth = 50;
            }
            else if(transformed.y < this.player.y - 20){
              transformed.depth = 50;
              this.player.depth = 100;
            }
            if (child.y > this.player.y - 20){
              child.depth = 50;
              this.player.depth = 100;
            }
            else if(child.y < this.player.y - 20){
              child.depth = 100;
              this.player.depth = 50;
            }
            if (transformed.y > child.y - 20){
              transformed.depth = 100;
              child.depth = 50;
            }
            else if(transformed.y < child.y - 20){
              transformed.depth = 50;
               child.depth = 100;
            }
          },this);
        },this);
      }



      else{
        Phaser.Actions.Call(this.zombieGroup.getChildren(), function(child) {
          if(distance(this.player.x,this.player.y,child.x,child.y) > 1100){
            child.enable = true;
            if(child.x > this.player.x) {
              child.body.setVelocityX(zomSpeed);
              if (child['texture']['key'] == "gothZombie"){
                child.anims.play("gothZombieWalk", true);
              }
              else if (child['texture']['key'] == "cheerZombie"){
                child.anims.play("cheerZombieWalk", true);
              }
              else if (child['texture']['key'] == "businessZombie"){
                child.anims.play("businessZombieWalk", true);
              }
              else if (child['texture']['key'] == "hipsterZombie"){
                child.anims.play("hipsterZombieWalk", true);
              }
              child.flipX = true;
            }
            else if (child.x < this.player.x){
              child.body.setVelocityX(-zomSpeed);
              if (child['texture']['key'] == "gothZombie"){
                child.anims.play("gothZombieWalk", true);
              }
              else if (child['texture']['key'] == "cheerZombie"){
                child.anims.play("cheerZombieWalk", true);
              }
              else if (child['texture']['key'] == "businessZombie"){
                child.anims.play("businessZombieWalk", true);
              }
              else if (child['texture']['key'] == "hipsterZombie"){
                child.anims.play("hipsterZombieWalk", true);
              }
              //child.anims.play("zombieWalk", true);
              child.flipX = false;
            }
            if(child.y > this.player.y) {
              child.body.setVelocityY(zomSpeed);
              this.player.depth = 5;
              child.depth = 100;
            }
            else if(child.y < this.player.y){
              child.body.setVelocityY(-zomSpeed);
              this.player.depth = 100;
              child.depth = 5;
            }
          }
          if (distance(this.player.x,this.player.y,child.x,child.y) < 1100 || distance(this.player.x,this.player.y,child.x,child.y) > 2100){
            child.enable = true;
            if(child.x > this.player.x + 20) {
              child.body.setVelocityX(-zomSpeed);
              if (child['texture']['key'] == "gothZombie"){
                child.anims.play("gothZombieWalk", true);
              }
              else if (child['texture']['key'] == "cheerZombie"){
                child.anims.play("cheerZombieWalk", true);
              }
              else if (child['texture']['key'] == "businessZombie"){
                child.anims.play("businessZombieWalk", true);
              }
              else if (child['texture']['key'] == "hipsterZombie"){
                child.anims.play("hipsterZombieWalk", true);
              }
              child.flipX = false;
            }
            else if (child.x < this.player.x - 20){
              child.body.setVelocityX(zomSpeed);
              if (child['texture']['key'] == "gothZombie"){
                child.anims.play("gothZombieWalk", true);
              }
              else if (child['texture']['key'] == "cheerZombie"){
                child.anims.play("cheerZombieWalk", true);
              }
              else if (child['texture']['key'] == "businessZombie"){
                child.anims.play("businessZombieWalk", true);
              }
              else if (child['texture']['key'] == "hipsterZombie"){
                child.anims.play("hipsterZombieWalk", true);
              }
              //child.anims.play("zombieWalk", true);
              child.flipX = true;
            }
            else if (this.player.x - 20 > child.x > this.player.x + 20) {
              child.body.setVelocityX(zomSpeed);
              if (child['texture']['key'] == "gothZombie"){
                child.anims.play("gothZombieWalk", false);
              }
              else if (child['texture']['key'] == "cheerZombie"){
                child.anims.play("cheerZombieWalk", false);
              }
              else if (child['texture']['key'] == "businessZombie"){
                child.anims.play("businessZombieWalk", false);
              }
              else if (child['texture']['key'] == "hipsterZombie"){
                child.anims.play("hipsterZombieWalk", false);
              }
            }

            if(child.y > this.player.y + 10) {
              child.body.setVelocityY(-zomSpeed);
              this.player.depth = 5;
              child.depth = 100;
            }
            else if(child.y < this.player.y - 10){
              child.body.setVelocityY(zomSpeed);
              this.player.depth = 100;
              child.depth = 5;
            }
            else if(this.player + 10 < child.y < this.player.y - 10){
              child.body.setVelocityY(zomSpeed);
              this.player.depth = 100;
              child.depth = 5;

            }
          }
        }, this);
      }


      const prevVelocity = this.player.body.velocity.clone();

      // Stop any previous movement from the last frame
      this.player.body.setVelocity(0);

      // Horizontal movement
      if (speed > 0) {
        if (this.cursors.left.isDown) {
          this.player.body.setVelocityX(-speed);
          this.player.anims.play("walk", true);
          this.player.flipX = true;
        }
        else if (this.cursors.right.isDown) {
          this.player.body.setVelocityX(speed);
          this.player.anims.play("walk", true);
          this.player.flipX = false;
        }
        // Vertical movement
        if (this.cursors.up.isDown) {
          this.player.body.setVelocityY(-speed);
          this.player.anims.play("walk", true);
        }
        else if (this.cursors.down.isDown) {
          this.player.body.setVelocityY(speed);
          this.player.anims.play("walk", true);
        }
        if (this.cursors.up.isDown == false && this.cursors.down.isDown == false){
          if(this.cursors.left.isDown == false && this.cursors.right.isDown == false){
            this.player.anims.play("idle",true)
        }
      }
    }
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
    if (zombie['texture']['key'] == "gothZombie") {
      sfx.play({
        volume: .8,
        detune: 2
      });
      this.scene.launch('WorldScene2',{newSprite: "gothZombie"});
    }
    else if (zombie['texture']['key'] == "cheerZombie") {
      sfx.play();
      this.scene.launch('WorldScene2',{newSprite: "cheerZombie"});
    }
    else if (zombie['texture']['key'] == "businessZombie") {
      sfx.play();
      this.scene.launch('WorldScene2',{newSprite: "businessZombie"});
    }
    else if (zombie['texture']['key'] == "hipsterZombie") {
      sfx.play();
      this.scene.launch('WorldScene2',{newSprite: "hipsterZombie"});
    }
    this.scene.sleep('WorldScene1');
    this.zombieGroup.remove(zombie);
    }

  transformedHit(transformed, zombie) {

      this.transformedGroup.remove(transformed);
      var oldX = transformed.x;
      var oldY = transformed.y;
      transformed.destroy();
      if (this.transformed['texture']['key'] == "normalGoth"){
        this.newZomb = this.physics.add.sprite(oldX, oldY + 10, "gothZombie");
      }
      else if (this.transformed['texture']['key'] == "normalBusiness"){
        this.newZomb = this.physics.add.sprite(oldX, oldY + 10, "businessZombie");
      }
      else if (this.transformed['texture']['key'] == "normalCheer"){
        this.newZomb = this.physics.add.sprite(oldX, oldY + 10, "cheerZombie");
      }
      else if (this.transformed['texture']['key'] == "normalHipster"){
        this.newZomb = this.physics.add.sprite(oldX, oldY + 10, "hipsterZombie");
      }
      this.newZomb.scale = .45;
      this.newZomb.setSize(200, 300)
      this.newZomb.setOffset(100, 100)
      this.zombieGroup.add(this.newZomb);
      window.zombieCount += 1;
      window.transformedCount -=1;
      this.zombieCount.setText("Zombies Transformed: " + window.transformedCount + "/" + window.maxZombies);
      transformTimer = 0;
    }




/*  shadowHit(player, guy) {
    //this function makes it so whichever zombie
    //collides with the human, its corresponding
    //invisible transformed person is set to visible and displayed if the Player
    //wins the mini game
    guy.visible = true;


  } */
}
