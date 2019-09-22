/*global Phaser, window*/
import BootScene from './scenes/BootScene.js';
import Config from './config/config.js';
import WorldScene1 from './scenes/WorldScene1.js';

class Game extends Phaser.Game {
  constructor () {
    super(Config);
    this.scene.add('Boot', BootScene);
    this.scene.add('WorldScene1', WorldScene1);
    this.scene.start('WorldScene1');
  }
}

window.game = new Game();
