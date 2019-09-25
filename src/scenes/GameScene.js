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
    this.load.image('bullet', 'assets/bullet.png');
    this.load.image('logo', './assets/logo.png');

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
    // this graphics element is for visualization only


    this.map =      [[ 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0],
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
  
  //PATH FOR EXAMPLE
    //  The this.path for our enemies
    //  parameters are at the start x and y of our this.path
    // this.path = this.add.path(96, -32);
    // this.path.lineTo(96, 164);
    // this.path.lineTo(480, 164);
    // this.path.lineTo(480, 644);

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
    this.graphics.lineStyle(3, 0xffffff, 1);
    // visualize the path
    this.path.draw(this.graphics);


  //Add enemies
    // Add enemy group to the game
    this.enemies = this.add.group({ classType: Enemy, runChildUpdate: true });
    this.nextEnemy = 0;

    //Declare wave size and spawned variable
    this.waveSize = 5;
    this.spawned = 0;

  
  //Add turrents
    this.turrets = this.add.group({ classType: Turret, runChildUpdate: true});
    
    this.input.on('pointerdown', this.placeTurret);
  
  //Spawn bullets
    this.bullets = this.add.group({ classType: Bullet, runChildUpdate: true});
  

  }

// Add Functions (when called in create, must use this.<function name>())

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
      var enemy = this.enemies.get();
      if (enemy){
        // place the enemy at the start of the path
        enemy.startOnPath();
        enemy.setActive(true);
        enemy.setVisible(true);

        //Spawn new enemy 
        this.nextEnemy = time + 300;
        //increment # of enemies spawned
        this.spawned+=1;
      }         
    }


  } // END UPDATE
  
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
    var enemyUnits = this.enemies.getChildren();
    for(var i = 0; i < enemyUnits.length; i++) {       
        if(enemyUnits[i].active && Phaser.Math.Distance.Between(x, y, enemyUnits[i].x, enemyUnits[i].y) <= distance)
            return enemyUnits[i];
    }
    return false;
  }
  
} // END GAME

var Enemy = new Phaser.Class({

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
    Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');

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

    this.lifespan = 500;
    //Set travel speed of bullet
    this.speed = Phaser.Math.GetSpeed(600, 1);

  },

  update: function(time, delta){

    //update x and y postion for bullet
  

    this.x += this.dx * (this.speed * delta);
    this.y += this.dy * (this.speed * delta);

    //decrease remaining lifespan
    this.lifespan -= -delta

    //disable bullet when lifespan too low
    if (this.lifespan<=0){
      this.setActive(false);
      this.setVisible(false);
    }
  }
})

