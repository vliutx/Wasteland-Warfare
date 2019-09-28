/*global Phaser, window*/
import BootScene from './scenes/BootScene.js';
import Config from './config/config.js';

class Game extends Phaser.Game {
  constructor () {
    super(Config);
    this.scene.add('Boot', BootScene);
    this.scene.start('Boot');
  }
}

window.game = new Game();
