/*global Phaser*/
export default class EndScene extends Phaser.Scene {

  constructor () {
    super('EndScene');
  }

  init (data) {
    // Initialization code goes here

  }

  preload () {

    // Declare variables for center of the scene
    this.centerX = this.cameras.main.width / 2;
    this.centerY = this.cameras.main.height / 2;
    this.startKey;
  }

  create (data) {

    //Create the scene
    var text = this.add.text(this.centerX - 100, this.centerY + 25, 'Play Again? Press Y');
    this.startKey = this.input.keyboard.addKey('Y');

  }

  update (time, delta) {
    // Update the scene
    if (this.startKey.isDown) {
      this.scene.start('BootScene')
    }
    }
  }
}
