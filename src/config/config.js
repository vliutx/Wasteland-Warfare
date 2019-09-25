/*global Phaser*/

export default {
  type: Phaser.AUTO,
  parent: 'phaser-example',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
        debug: true
    }
  },
//pixelArt: true
};
