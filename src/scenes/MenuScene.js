/*global Phaser*/
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
    this.load.image('menu', './assets/images/menuscreen.png');

    // Declare variables for center of the scene
    this.centerX = this.cameras.main.width / 2;
    this.centerY = this.cameras.main.height / 2;
  }

  create (data) {
    //Add change scene event listeners
    ChangeScene.addSceneEventListeners(this);
    //Create the scene
    var background = this.add.image(200, 300, 'menu');

    var play = this.add.text(300, 195, '< play >',
    {fontFamily: 'Fantasy', fontSize: 50, color: '#ffffff'}).setInteractive();
    play.on("pointerup", function() {
      this.scene.start('WorldScene1');
    }, this
  );

    var title = this.add.text(220,70, '[ Dance The Bite Away ]',
    {fontFamily: 'Fantasy', fontSize: 50, color: '#ffffff'});

  }

  update (time, delta) {
  }
}
