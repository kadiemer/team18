/*global Phaser, window*/
import BootScene from './scenes/BootScene.js';
import Config from './config/config.js';
import MenuScene from './scenes/MenuScene.js'
import WorldScene1 from './scenes/WorldScene1.js';
import WorldScene2 from './scenes/WorldScene2.js';
import LoseScene from './scenes/LoseScene.js';
import WinScene from './scenes/WinScene.js';
import TutorialScene1 from './scenes/TutorialScene1.js'
import TutorialScene1Pt2 from './scenes/TutorialScene1Pt2.js'
import TutorialScene2 from './scenes/TutorialScene2.js'



class Game extends Phaser.Game {
  constructor () {
    super(Config);
    this.scene.add('Boot', BootScene);
    this.scene.add('MenuScene', MenuScene);
    this.scene.add('WorldScene1', WorldScene1);
    this.scene.add('WorldScene2',WorldScene2);
    this.scene.add('LoseScene',LoseScene);
    this.scene.add('WinScene',WinScene);
    this.scene.add('TutorialScene1,', TutorialScene1);
    this.scene.add('TutorialScene1Pt2', TutorialScene1Pt2);
    this.scene.add('TutorialScene2', TutorialScene2);


    this.scene.start('MenuScene');
  }
}

window.game = new Game();
