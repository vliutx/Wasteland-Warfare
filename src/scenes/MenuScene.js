/*global Phaser*/
export default class MenuScene extends Phaser.Scene {
  constructor () {
    super('Menu');
  }

  init (data) {
    // Initialization code goes here
  }

  preload () {
    // Preload assets
    this.load.spritesheet('button', './assets/spriteSheets/button.png', {
      frameHeight: 98,
      frameWidth: 301
    });

    // Declare variables for center of the scene
    this.centerX = this.cameras.main.width / 2;
    this.centerY = this.cameras.main.height / 2;
  }

  create (data) {
    //Create the scene
    var text = this.add.text();

    var button = this.add.sprite(this.centerX, this.centerY, 'button', 0).setInteractive();
    button.on("pointerover", function(){
      this.setFrame(1);
    });
    button.on("pointerout", function(){
      this.setFrame(0);
    });
    button.on("pointerup", function(){
      this.scene.start('GameScene');
    }, this
    );
  }

  update (time, delta) {
    // Update the scene
  }
}
