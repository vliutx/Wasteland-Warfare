/*global Phaser, window*/
import GameScene from './scenes/GameScene.js';
import Config from './config/config.js';

class Game extends Phaser.Game {
  constructor () {
    super(Config);
    this.scene.add('GameScene', GameScene);
    this.scene.start('GameScene');
  }
}

window.game = new Game();
