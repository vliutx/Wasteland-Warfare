/*global Phaser*/
export default class GameScene extends Phaser.Scene {

  constructor () {
    super('GameScene');
  }


  init (data) {
    // Initialization code goes here
  }

  preload () {
    // Preload game assets - turrets, bullets, and enemies
    this.load.atlas('sprites', './assets/spritesheet.png', './assets/spritesheet.json');
    this.load.image('bullet', 'assets/bullet.png');
    this.load.image('logo', './assets/logo.png');
    this.load.image('fastenemy', './assets/FastEnemy.png')
    this.load.image('toughenemy', './assets/ToughEnemy.png')
    this.load.image('desertBackground', './assets/background.png')

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

    this.add.image(400, 300, "desertBackground");
    // this graphics element is for visualization only


    this.map =     [[ 0,-1, 0, 0, 0, 0, 0, 0, 0, 0],
                    [ 0,-1, 0, 0, 0, 0, 0, 0, 0, 0],
                    [ 0,-1,-1,-1,-1,-1,-1,-1, 0, 0],
                    [ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0],
                    [ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0],
                    [ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0],
                    [ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0],
                    [ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0]];


    this.graphics = this.add.graphics();
    // draw gridlines
    this.drawGrid(this.graphics);

  //PATH FOR EXAMPLE
    //  The this.path for our enemies
    //  parameters are at the start x and y of our this.path
    // this.path = this.add.path(96, -32);
    // this.path.lineTo(96, 164);
    // this.path.lineTo(480, 164);
    // this.path.lineTo(480, 644);

  //NEW PATH FOR GAME //
    this.path = this.add.path(100, 0); // CHECK FOR CONFLICTS WITH SIZE OF GAME SCREEN
    this.path.lineTo(100,500); //add lines for enemies to follow
    this.path.lineTo(300, 500);
    this.path.lineTo(300, 100);
    this.path.lineTo(500, 100);
    this.path.lineTo(500, 500);
    this.path.lineTo(700, 500);
    this.path.lineTo(700, -50);

    //Make path Visibile
    this.graphics.lineStyle(3, 0xffffff, 1);
    // visualize the path
    this.path.draw(this.graphics);

  //Add enemies
    // Add enemy group to the game
    this.enemies1 = this.physics.add.group({ classType: Regular, runChildUpdate: true });
    this.enemies2 = this.physics.add.group({ classType: Fast, runChildUpdate: true });
    this.bullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true});
    this.nextEnemy = 0;

    this.physics.add.overlap(enemies, bullets, damageEnemy);

    // Add enemy2 group to the game
    //Declare wave size and spawned variable
    this.waveSize = 10;
    this.spawned = 0;
    this.health = 1;  //this doesn't work
    this.gameOver = false;


  //Add turrets
    this.turrets = this.add.group({ classType: Turret, runChildUpdate: true});
    this.input.on('pointerdown', this.placeTurret);

function damageEnemy(enemy, bullet) {
    // only if both enemy and bullet are alive
    if (enemy.active === true && bullet.active === true) {
        // we remove the bullet right away
        bullet.setActive(false);
        bullet.setVisible(false);

        // decrease the enemy hp with BULLET_DAMAGE
        enemy.receiveDamage(BULLET_DAMAGE);
    }

  } //END CREATE FUNC
}
// Add Functions (when called in create, must use this.<function name>())
  //Draw out a grid on the map


  drawGrid(graphics){
    graphics.lineStyle(1, 0x0000ff, 0.8);
    for (var i=0; i<12; i++){ // horizontal lines
      graphics.moveTo(0, i*50);
      graphics.lineTo(840, i*50);
    }
    for (var j=0; j<16; j++){ // vertical lines
      graphics.moveTo(j*50, 0);
      graphics.lineTo(j*50, 640);
    }
    graphics.strokePath();
  }


  placeTurret(pointer) {
    var i = Math.floor(pointer.y/50);
    var j = Math.floor(pointer.x/50);
    console.log(typeof(this.map))
    var turret = this.turrets.get();
    turret.setActive(true);
    turret.setVisible(true);
    turret.place(i, j);
//!!!! Map is not defined here


    // if((this.map[i][j] === 0)) {
    //     var turret = this.turrets.get();
    //     if (turret)
    //     {
    //         turret.setActive(true);
    //         turret.setVisible(true);
    //         turret.place(i, j);
    //     }
    // }

  }

  update (time, delta) {
    // Update the scene

  // Creates continuous strean of enemies
    // if (time > this.nextEnemy)
    // {
    //   var enemy = this.enemies.get();
    //   if (enemy)
    //   {
    //     enemy.setActive(true);
    //     enemy.setVisible(true);

    //     // place the enemy at the start of the path
    //     enemy.startOnPath();

    //     this.nextEnemy = time + 2000;
    //   }
    // }


  //Creates wave of enemies
    if ((time > this.nextEnemy) && (this.spawned < this.waveSize)){
      var enemy1 = this.enemies1.get();
      var enemy2 = this.enemies2.get();
      enemy2.setScale(4);

      //Place enemy type1
      if (enemy1){
        // place the enemy at the start of the path
        enemy1.startOnPath();
        enemy1.setActive(true);
        enemy1.setVisible(true);

        //Spawn new enemy
        this.nextEnemy = time + 300;
        //increment # of enemies spawned
        this.spawned+=1;
      }

      //Place enemy type2
      if (enemy2){
        // place the enemy at the start of the path
        enemy2.startOnPath();
        enemy2.setActive(true);
        enemy2.setVisible(true);

        //Spawn new enemy
        this.nextEnemy = time + 300;
        //increment # of enemies spawned
        this.spawned+=1;
      }
      //end game. Doesn't work
      if (this.gameOver){
        this.scene.start('GameOver');
      }
    }


  }

  // Class at end
}

var Regular = new Phaser.Class({

  Extends: Phaser.GameObjects.Image,

  initialize: //Class variables/methods

  //Constructor
  function Enemy (scene)
  {
    // Declare path object from scene !!!!!!
    this.path = scene.path;
    Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sprites', 'enemy');
    this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
    this.hp = 0;
  },

  // Initialize Variables
  ENEMY_SPEED: 1/10000,

  //Places the enemy at the first point of our path
  startOnPath: function ()
  {

      // set the t parameter at the start of the path
      this.follower.t = 0;
      this.hp = 100;

      // get x and y of the given t point
      this.path.getPoint(this.follower.t, this.follower.vec);


      // set the x and y of our enemy to the received from the previous step
      this.setPosition(this.follower.vec.x, this.follower.vec.y);
  },
  receiveDamage: function(damage) {
      this.hp -= damage;

      // if hp drops below 0 we deactivate this enemy
      if(this.hp <= 0) {
          this.setActive(false);
          this.setVisible(false);
      }
  },

  //Updates enemy position along path
  update: function (time, delta)
  {
    console.log(this.gameOver) //does nothing
    // move the t point along the path, 0 is the start and 0 is the end
    this.follower.t += this.ENEMY_SPEED * delta;

    // get the new x and y coordinates in vec
    this.path.getPoint(this.follower.t, this.follower.vec);

    // update enemy x and y to the newly obtained x and y
    this.setPosition(this.follower.vec.x, this.follower.vec.y);

    // if we have reached the end of the path, remove the enemy
    if (this.follower.t >= 1)
    {
        this.setActive(false);
        this.setVisible(false);
        this.health -= 1;  //doesn't work
        this.gameOver = true;

    }

  }

});

var Fast = new Phaser.Class({

  Extends: Phaser.GameObjects.Image,

  initialize: //Class variables/methods

  //Constructor
  function Enemy (scene)
  {
    // Declare path object from scene !!!!!!
    this.path = scene.path;
    Phaser.GameObjects.Image.call(this, scene, 0, 0, 'fastenemy');
    this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
  },

  // Initialize Variables
  ENEMY_SPEED: 1/5000,

  //Places the enemy at the first point of our path
  startOnPath: function ()
  {

      // set the t parameter at the start of the path
      this.follower.t = 0;

      // get x and y of the given t point
      this.path.getPoint(this.follower.t, this.follower.vec);


      // set the x and y of our enemy to the received from the previous step
      this.setPosition(this.follower.vec.x, this.follower.vec.y);

  },

  //Updates enemy position along path
  update: function (time, delta)
  {

    // move the t point along the path, 0 is the start and 0 is the end
    this.follower.t += this.ENEMY_SPEED * delta;

    // get the new x and y coordinates in vec
    this.path.getPoint(this.follower.t, this.follower.vec);

    // update enemy x and y to the newly obtained x and y
    this.setPosition(this.follower.vec.x, this.follower.vec.y);

    // if we have reached the end of the path, remove the enemy
    if (this.follower.t >= 1)
    {
        this.setActive(false);
        this.setVisible(false);
        this.health -= 1;
        this.gameOver = true;

    }
  }

});

//not used yet
var Tough = new Phaser.Class({

  Extends: Phaser.GameObjects.Image,

  initialize: //Class variables/methods

  //Constructor
  function Enemy (scene)
  {
    // Declare path object from scene !!!!!!
    this.path = scene.path;
    Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sprites', 'enemy');
    this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
  },

  // Initialize Variables
  ENEMY_SPEED: 1/10000,

  //Places the enemy at the first point of our path
  startOnPath: function ()
  {

      // set the t parameter at the start of the path
      this.follower.t = 0;

      // get x and y of the given t point
      this.path.getPoint(this.follower.t, this.follower.vec);


      // set the x and y of our enemy to the received from the previous step
      this.setPosition(this.follower.vec.x, this.follower.vec.y);

  },

  //Updates enemy position along path
  update: function (time, delta)
  {
    console.log(this.gameOver)
    // move the t point along the path, 0 is the start and 0 is the end
    this.follower.t += this.ENEMY_SPEED * delta;

    // get the new x and y coordinates in vec
    this.path.getPoint(this.follower.t, this.follower.vec);

    // update enemy x and y to the newly obtained x and y
    this.setPosition(this.follower.vec.x, this.follower.vec.y);

    // if we have reached the end of the path, remove the enemy
    if (this.follower.t >= 1)
    {
        this.setActive(false);
        this.setVisible(false);
        this.health -= 1;  //doesn't work
        this.gameOver = true;

    }

  }

});

//Create class for turrets
var Turret = new Phaser.Class({

  Extends: Phaser.GameObjects.Image,

  initialize:

  // Turrent constructor
  function Turret(scene){
    Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sprites', 'turret');
    this.nextTic = 0;
  },

   // we will place the turret according to the grid
  place: function(i, j) {
    this.y = i * 50 + 50/2;
    this.x = j * 50 + 50/2;
    this.map = scene.map;
    console.log(this.map)
    this.map[i][j] = 1;             //error here
  },

  update: function (time, delta){
    // time to shoot
    if(time > this.nextTic) {
      this.nextTic = time + 1000;
    }
  }

})
