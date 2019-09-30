/*global Phaser*/
export default class EndScene extends Phaser.Scene {

  constructor () {
    super('EndScene');
  }


  init (data) {
    // Initialization code goes here

  }

  preload () {
    // Preload game assets - turrets and bullets
    this.load.atlas('sprites', './assets/spritesheet.png', './assets/spritesheet.json');
    this.load.image('bullet', './assets/bullet.png');
    this.load.image('logo', './assets/logo.png');
    this.load.image('fastenemy', './assets/FastEnemy.png')
    this.load.image('toughenemy', './assets/ToughEnemy.png')
    this.load.image('desertBackground', './assets/background.png')
    this.load.spritesheet('ninja', 'assets/ninja.png', { frameWidth: 88, frameHeight: 88 })
    // Declare variables for center of the scene
    this.centerX = this.cameras.main.width / 2;
    this.centerY = this.cameras.main.height / 2;

    this.ENEMY_SPEED = 1/10000;
    this.path;
    this.graphics;
  }


  //  In our game, enemies will move along a predefined path so
  //  we need to create a simple path element
  create (data) {

    //Add background to level
    this.add.image(400, 300, "desertBackground");
    // this graphics element is for visualization only

    this.graphics = this.add.graphics();
    // draw gridlines
    this.drawGrid(this.graphics);

  //NEW PATH FOR GAME //
    this.path = this.add.path(125, 0); // CHECK FOR CONFLICTS WITH SIZE OF GAME SCREEN
    this.path.lineTo(125,525); //add lines for enemies to follow
    this.path.lineTo(325, 525);
    this.path.lineTo(325, 125);
    this.path.lineTo(525, 125);
    this.path.lineTo(525, 525);
    this.path.lineTo(725, 525);
    this.path.lineTo(725, -50);

    //Make path Visibile
    this.graphics.lineStyle(3, 0x00000, 1);
    // visualize the path
    this.path.draw(this.graphics);

  //Add player and necessary things
    var player = this.add.sprite(125,575,'ninja');
    var bulletsPlayer;
    this.nf = 0; //nextFire
    this.fr = 200; //fireRate
    this.bs = 1000; //speed or bullet speed
    this.bulletsPlayer = this.physics.add.group({
      defaultKey: "bullet",
      maxSize: 1000
    });
    var spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    spaceBar.on("down", this.shoot, this);

  //Add enemies
    // Add enemy group to the game
    this.enemies1 = this.physics.add.group({ classType: Regular, runChildUpdate: true });
    this.enemies2 = this.physics.add.group({ classType: Fast, runChildUpdate: true });
    this.bullets = this.physics.add.group({ defaultKey: "bullet", classType: Bullet, runChildUpdate: true });
    this.nextEnemy = 0;

    //hitboxes
    //this.physics.add.overlap(this.enemies2, this.bullets, function(){console.log("hit2")});
    //this.physics.add.overlap(this.enemies1, this.bullets, function(){console.log("hit1")});
    this.physics.add.overlap(this.enemies1, this.bullets, this.damageEnemy);
    this.physics.add.overlap(this.enemies2, this.bullets, this.damageEnemy);
    this.physics.add.overlap(this.enemies1, this.bulletsPlayer, this.damageEnemy);
    this.physics.add.overlap(this.enemies2, this.bulletsPlayer, this.damageEnemy);

    //Declare wave size and spawned variable
    this.waveSize = 10;
    this.spawned = 0;


  //Add turrents
    this.turrets = this.add.group({ classType: Turret, runChildUpdate: true});

    this.input.on('pointerdown', this.placeTurret);

  //Spawn bullets
    //this.bullets = this.add.group({ defaultKey: "bullet", classType: Bullet, runChildUpdate: true});
    var bullet = this.bullets.get();
    bullet.setScale(20);
    bullet.setPosition(400,300);
    bullet.setActive(true);
    bullet.setVisible(true);



  }

// Add Functions (when called in create, must use this.<function name>())

  update (time, delta) {
    // Update the scene
    if (this.startKey.isDown) {
      this.scene.start('BootScene')
      }
    }
  }