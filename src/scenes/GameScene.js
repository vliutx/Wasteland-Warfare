/*global Phaser*/
export default class GameScene extends Phaser.Scene {

  constructor () {
    super('GameScene');
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


    this.map =     [[ 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0],
                    [ 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1, 0],
                    [ 0, 0, -1, 0, 0, 0,-1,-1,-1,-1,-1, 0, 0, 0,-1, 0],
                    [ 0, 0, -1, 0, 0, 0,-1, 0, 0, 0,-1, 0, 0, 0,-1, 0],
                    [ 0, 0, -1, 0, 0, 0,-1, 0, 0, 0,-1, 0, 0, 0,-1, 0],
                    [ 0, 0, -1, 0, 0, 0,-1, 0, 0, 0,-1, 0, 0, 0,-1, 0],
                    [ 0, 0, -1, 0, 0, 0,-1, 0, 0, 0,-1, 0, 0, 0,-1, 0],
                    [ 0, 0, -1, 0, 0, 0,-1, 0, 0, 0,-1, 0, 0, 0,-1, 0],
                    [ 0, 0, -1, 0, 0, 0,-1, 0, 0, 0,-1, 0, 0, 0,-1, 0],
                    [ 0, 0, -1, 0, 0, 0,-1, 0, 0, 0,-1, 0, 0, 0,-1, 0],
                    [ 0, 0, -1,-1,-1,-1,-1, 0, 0, 0,-1,-1,-1,-1,-1, 0],
                    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];


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

  //Creates wave of enemies
    if ((time > this.nextEnemy) && (this.spawned < this.waveSize)){
      var enemy1 = this.enemies1.get();
      var enemy2 = this.enemies2.get();
      enemy2.setScale(4);
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
    }

    // bullet out of screen
    this.bullets.children.each(
    function (b) {
      if (b.active) {
        if (b.y < 0){
          b.setActive(false);
        } else if (b.y > this.cameras.main.height){
          b.setActive(false);
        } else if (b.x < 0){
          b.setActive(false);
        } else if (b.x > this.cameras.main.width){
          b.setActive(false);
        }
      }
    }.bind(this)
    );


  } // END UPDATE

  shoot () {
    var velocityFromRotation = this.physics.velocityFromRotation;
    var velocity = new Phaser.Math.Vector2();
    velocityFromRotation(3*3.14159265/2, this.bs, velocity);
    var bullet = this.bulletsPlayer.get();
    bullet.setAngle(3*3.14159265/2);
    bullet.enableBody(true, 125, 575, true, true).setVelocity(velocity.x,velocity.y);
  }

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

  damageEnemy(enemy, bullet) {
    // only if both enemy and bullet are alive
    console.log(1);
    if (enemy.active === true && bullet.active === true) {

        bullet.setActive(false);
        bullet.setVisible(false);
        enemy.receiveDamage(BULLET_DAMAGE);
    }
  }


  placeTurret(pointer) {
    var i = Math.floor(pointer.y/50);
    var j = Math.floor(pointer.x/50);
    if (this.scene.map[i][j] === 0){
      var turret = this.scene.turrets.get()
      if (turret){
        turret.setActive(true);
        turret.setVisible(true);
        turret.place(i, j);
      }
    }
  }

  //Allows turrets to fire bullets
  addBullet(x, y, angle) {
    var bullet = this.bullets.get();
    if (bullet){
        bullet.fire(x, y, angle);
    }
  }

  getEnemy(x, y, distance) {
    var enemyUnits1 = this.enemies1.getChildren();
    var enemyUnits2 = this.enemies2.getChildren();
    for(var i = 0; i < enemyUnits1.length; i++) {
        if(enemyUnits1[i].active && Phaser.Math.Distance.Between(x, y, enemyUnits1[i].x, enemyUnits1[i].y) <= distance)
            return enemyUnits1[i];
    }
    for(var i = 0; i < enemyUnits2.length; i++) {
      if(enemyUnits2[i].active && Phaser.Math.Distance.Between(x, y, enemyUnits2[i].x, enemyUnits2[i].y) <= distance)
          return enemyUnits2[i];
    }
    return false;
  }

} // END GAME

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

  receiveDamage: function(damage){
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

    // move the t point along the path, 0 is the start and 0 is the end

    // get the new x and y coordinates in vec
    this.path.getPoint(this.follower.t, this.follower.vec);
    // update enemy x and y to the newly obtained x and y
    this.setPosition(this.follower.vec.x, this.follower.vec.y);
  },

  update: function (time, delta){
    this.follower.t += this.ENEMY_SPEED * delta;
    this.path.getPoint(this.follower.t, this.follower.vec);
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
    this.scene.map[i][j] = 1;
  },

  fire: function() {
      var enemy = this.scene.getEnemy(this.x, this.y, 200);
      if(enemy) {
          var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y);
          this.scene.addBullet(this.x, this.y, angle);
          this.angle = (angle + Math.PI/2) * Phaser.Math.RAD_TO_DEG;
      }
  },


  update: function (time, delta){
    // time to shoot
    if(time > this.nextTic) {
      this.fire();
      this.nextTic = time + 1000;
    }
  }

})

var Bullet = new Phaser.Class({

  Extends: Phaser.GameObjects.Image,

  Initialize: //includes constructor for class and class methods

  //Constructor
  function Bullet (scene){

    //call bullet image
    Phaser.GameObjects.Image.call(this, scene, 0, 0, "bullet");

    //change
    this.dx = 0;
    this.dy = 0;
    this.lifespan = 0;

  },

  //Firing the bullet
  fire: function(x,y,theta){

    //make bullet visibile and non-static
    this.setActive(true);
    this.setVisible(true);

    //Set poosition to firing position
    this.setPosition(x,y);

    //Set the change in x and y coordinates
    this.dx = Math.cos(theta);
    this.dy = Math.sin(theta);

    this.lifespan = 350;
    //Set travel speed of bullet
    this.speed = Phaser.Math.GetSpeed(1000, 1);

  },

  update: function(time, delta){

    //update x and y postion for bullet


    this.x += this.dx * (this.speed * delta);
    this.y += this.dy * (this.speed * delta);

    //decrease remaining lifespan
    this.lifespan -= delta

    //disable bullet when lifespan too low
    if (this.lifespan<=0){
      this.setActive(false);
      this.setVisible(false);
    }
  }
})
