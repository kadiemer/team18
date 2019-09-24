/*global Phaser*/
export default class Scene1 extends Phaser.Scene {
  constructor () {
    super('Scene1');
  }

  init (data) {
    // Initialization code goes here
  }

  preload () {
    // Preload assets
    this.load.image('danceBackground', './assets/images/danceBackground.png');
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
    //Create the scene
    this.add.image(1001.5,561.5,"danceBackground");

    //Adds base keys and makes the image smaller

    this.key1 = this.physics.add.sprite(120,450,'wKey');
    this.key1.setScale(0.75);
    this.key2 = this.physics.add.sprite(220,450,'aKey');
    this.key2.setScale(0.75);
    this.key3 = this.physics.add.sprite(320,450,'sKey');
    this.key3.setScale(0.75);
    this.key4 = this.physics.add.sprite(420,450,'dKey');
    this.key4.setScale(0.75);


    //creates a group for the falling sprites and an array to store the different keys
    this.myGroup = this.physics.add.staticGroup();

    this.physics.add.collider(this.key2, this.myGroup);
    this.physics.add.collider(this.key3, this.myGroup);
    this.physics.add.collider(this.key4, this.myGroup);


    //Uses first 15 seconds of the track
    var track1 = this.sound.add('track1');
    track1.addMarker({
        name: 'track1',
        start: 0.00,
        duration: 100
      });

      //Adds play button to the screen, the letters will start falling once you hit play

      var play = this.add.text(500, 195, '< play >',
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
            this.myGroup.create(120, 50, 'wKey');

          }
            else if (this.picker == 1) {
            this.myGroup.create(220, 50, 'aKey');
          } else if (this.picker == 2) {
            this.myGroup.create(320,50, 'sKey');
          } else if (this.picker == 3) {
            this.myGroup.create(420, 50, 'dKey');
          }
          this.myGroup.children.iterate(function(child){
            child.setScale(0.75);

          });

        },
        callbackScope: this,
        repeat: 1000 }) //this is how many letters fall + 1
      }, this
    );

    //function used to generate random index for list of keys
      function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
}



  }



  update (time, delta) {
    //Makes the letters fall down at speed of 2
    Phaser.Actions.IncY(this.myGroup.getChildren(), 2);
    Phaser.Actions.Call(this.myGroup.getChildren(), function(key) {
      this.physics.add.overlap(this.key1,key,this.hitKey,null,this);
    }, this);

  }

  hitKey (key1, key) {
    text = this.add
      .text(staticKey.x, staticKey.y-20, 'Hit!', {
        font: "20px monospace",
      })
      .setScrollFactor(0)
      .setDepth(30);
    console.log("Hit Key");

  }

}
