/*global Phaser, window*/
import GameScene from './scenes/GameScene.js';
import GameOver from './scenes/GameOver.js';
import Config from './config/config.js';

class Game extends Phaser.Game {
  constructor () {
    super(Config);
    this.scene.add
    this.scene.add('GameOver', GameOver);
    this.scene.add('GameScene', GameScene);
    this.scene.start('GameScene');
  }
}

window.game = new Game();
