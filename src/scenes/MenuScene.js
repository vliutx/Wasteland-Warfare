/*global Phaser*/
export default class MenuScene extends Phaser.Scene {
  constructor () {
    super('MenuScene');
  }

  init (data) {
    // Initialization code goes here
  }

  preload () {
    // Preload assets

    this.load.image('background', './assets/titleScreen.png');
    this.load.image('turret', 'assets/Turret1.png');
    this.load.image('cannon', 'assets/cannon.png');

    this.load.spritesheet("lightning", "./assets/spriteSheets/Tesla Tower.png", {
        frameHeight: 96,
        frameWidth: 96
      });

    // Declare variables for center of the scene
    this.centerX = this.cameras.main.width / 2;
    this.centerY = this.cameras.main.height / 2;
  }

  create (data) {
    //Create the scene
    var background = this.add.image(this.centerX, this.centerY, "background");
    background.setScale(6.4);

    var turret1 = this.add.image(780, 400, "turret").setRotation(18*Math.PI/13);
    var turret2 = this.add.image(550, 500, "turret").setRotation(18*Math.PI/13);
    var tesla1 = this.add.sprite(320, 605, "lightning");
    var tesla2 = this.add.sprite(470, 605, "lightning");
    var cannon = this.add.image(395, 500, "cannon").setRotation(Math.PI);

    startText = this.add.text(160, 420, "Press \"P\" to start the game", {fontSize: 32, color: '#FF0000', fontStyle: 'bold'});

    var startKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

    startKey.on("down", function(){
        this.scene.start('BootScene');
    }, this
    );
  }


  update (time, delta) {
    // Update the scene
  }
}
