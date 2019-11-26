/*global Phaser, window*/
import Tutorial from './scenes/Tutorial.js';
import MenuScene from './scenes/MenuScene.js';
import FullGame from './scenes/FullGame.js';
import LakeLevel from './scenes/LakeLevel.js';
import Config from './config/config.js';

class Game extends Phaser.Game {
  constructor () {
    super(Config);
    this.scene.add('Tutorial', Tutorial);
    this.scene.add('MenuScene', MenuScene);
    this.scene.add('FullGame', FullGame);
    this.scene.add('LakeLevel', LakeLevel);
    this.scene.start('MenuScene');
  }
}

window.game = new Game();
