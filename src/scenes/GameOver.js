/*global Phaser*/
export default class GameOver extends Phaser.Scene {
  constructor () {
    super('GameOver');
  }

  init (data) {
    // Initialization code goes here

  }

  preload () {

    // Add in background
    this.load.image('desert', './assets/desertEndScreen.jpg')

    // Declare variables for center of the scene
    this.centerX = this.cameras.main.width / 2;
    this.centerY = this.cameras.main.height / 2;
  }

  create (data) {

    const background = this.add.sprite(284, 177, 'desert');
    background.setScale(2);

    //Create the scene
    var gameOverStyle = { font: "bold 32px Arial", fill: "#f00",
    boundsAlignH: "center",
    boundsAlignV: "middle" };

    var questionStyle = { font: "16px Arial", fill: "#f00",
    boundsAlignH: "center",
    boundsAlignV: "middle" };
    var gameOverText = this.add.text(this.centerX - 100, this.centerY - 25, 'Game Over', gameOverStyle);
    var text = this.add.text(this.centerX - 100, this.centerY + 50, 'Play Again? Press Y', questionStyle);
    this.startKey = this.input.keyboard.addKey('Y');
    //this.titleKey = this.input.keyboard.addKey('N');

  }

  update (time, delta) {
    // Update the scene
    if (this.startKey.isDown) {
      this.scene.start('Gameplay')
    } 
  }
}
