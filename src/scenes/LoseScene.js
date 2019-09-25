/*global Phaser*/
import * as ChangeScene from './ChangeScene.js';
export default class LoseScene extends Phaser.Scene {
  constructor () {
    super('LoseScene');
  }

  init (data) {
    // Initialization code goes here
  }

  preload () {
    // Preload assets

    // Declare variables for center of the scene
    this.centerX = this.cameras.main.width / 2;
    this.centerY = this.cameras.main.height / 2;
  }

  create (data) {
    // Event listener to change scenes
    ChangeScene.addSceneEventListeners(this);

    //Create the scene

    //tell user game is over and their score
    var text = this.add.text( 700, 480, "Oh, no! You died!", {
      fontFamily: 'Fantasy', fontSize: 70, color: '#ffffff'});
    var play = this.add.text(705, 580, '< click here to try again >',
    {fontFamily: 'Fantasy', fontSize: 50, color: '#ffffff'}).setInteractive();
    play.on("pointerup", function() {
      this.scene.start('WorldScene1');
    }, this
  );

  }
}
