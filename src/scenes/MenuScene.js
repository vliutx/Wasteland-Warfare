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

    this.load.image('button', 'assets/TitleButton.png');

    this.load.audio('theme', 'assets/sounds/WastelandWarfare.wav');

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
    var titleTheme = this.sound.add('theme', {loop: true, volume: 0.5});
    titleTheme.play();
    var background = this.add.image(this.centerX, this.centerY, "background");
    background.setScale(6.4);

    var turret1 = this.add.image(600, 585, "turret").setRotation(18*Math.PI/13);
    var turret2 = this.add.image(270, 500, "turret").setRotation(18*Math.PI/13);
    var tesla1 = this.add.sprite(40, 605, "lightning");
    var tesla2 = this.add.sprite(190, 605, "lightning");
    var cannon = this.add.image(110, 500, "cannon").setRotation(Math.PI);
    cannon.setScale(1.5);

    var tutorialButton =  this.add.sprite(this.centerX, 450, "button").setInteractive();
    var fullGameButton =  this.add.sprite(this.centerX, 570, "button").setInteractive();
    tutorialButton.setScale(3);
    fullGameButton.setScale(3);
    tutorialButton.on('pointerup', function(){
      titleTheme.stop()
      this.scene.start('Tutorial');
    }, this
    );
    fullGameButton.on('pointerup', function(){
      titleTheme.stop();
      this.scene.start('FullGame');
    }, this
    );
    startText  = this.add.text(this.centerX - 75, 435, "Tutorial", {fontSize: 32, color: "#FFFFFF", fontStyle: "bold"});
    startText  = this.add.text(this.centerX - 40, 555, "Game", {fontSize: 32, color: "#FFFFFF", fontStyle: "bold"});

  }


  update (time, delta) {
    // Update the scene
  }
}
