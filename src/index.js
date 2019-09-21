/*global Phaser, window*/
import Config from './config/config.js';
import Menu from './scenes/MenuScene.js';
import GameScene from './scenes/GameScene.js';


class Game extends Phaser.Game {
  constructor () {
    super(Config);
    this.scene.add('Menu', Menu);
    this.scene.add('GameScene', GameScene);
    this.scene.start('Menu');
  }
}

window.game = new Game();
