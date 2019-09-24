/*global Phaser, window*/
import BootScene from './scenes/BootScene.js';
import Config from './config/config.js';
import WorldScene1 from './scenes/WorldScene1.js';
import MenuScene from './scenes/MenuScene.js';
import Scene1 from './scenes/Scene1.js';

class Game extends Phaser.Game {
  constructor () {
    super(Config);
    this.scene.add('Boot', BootScene);
    this.scene.add('WorldScene1', WorldScene1);
    this.scene.add('MenuScene', MenuScene);
    this.scene.add('Scene1', Scene1);
    this.scene.start('MenuScene');
  }
}

window.game = new Game();
