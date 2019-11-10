/*global Phaser, window*/
import BootScene from './scenes/BootScene.js';
import MenuScene from './scenes/MenuScene.js';
import Config from './config/config.js';

class Game extends Phaser.Game {
  constructor () {
    super(Config);
    this.scene.add('BootScene', BootScene);
    this.scene.add('MenuScene', MenuScene);
    this.scene.start('MenuScene');
  }
}

window.game = new Game();
