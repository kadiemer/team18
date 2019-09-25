/*global Phaser*/
import * as ChangeScene from './ChangeScene.js';
export default class WinScene extends Phaser.Scene {
  constructor () {
    super('WinScene');
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
    var text = this.add.text( 650, 480, "Congrats! You Survived!", {
      fontFamily: 'Fantasy', fontSize: 70, color: '#ffffff'});

    var subText = this.add.text( 600, 580, "You turned all the zombies human again", {
      fontFamily: 'Fantasy', fontSize: 50, color: '#ffffff'});



  }
}
