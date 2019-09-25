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


    // this.map =      [[ 0,-1, 0, 0, 0, 0, 0, 0, 0, 0],
    //                 [ 0,-1, 0, 0, 0, 0, 0, 0, 0, 0],
    //                 [ 0,-1,-1,-1,-1,-1,-1,-1, 0, 0],
    //                 [ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0],
    //                 [ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0],
    //                 [ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0],
    //                 [ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0],
    //                 [ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0]];
    

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
    this.enemies = this.add.group({ classType: Enemy, runChildUpdate: true });
    this.nextEnemy = 0;

    //Declare wave size and spawned variable
    this.waveSize = 5;
    this.spawned = 0;

  
  //Add turrents
    this.turrets = this.add.group({ classType: Turret, runChildUpdate: true});
    
    this.input.on('pointerdown', this.placeTurret);

    //console.log(typeof(this.turrets));


    //console.log(typeof(this.map));
  } //END CREATE FUNC

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
    
    var i = pointer.y;
    var j = pointer.x;

    var turret = this.scene.turrets.get()
    turret.setActive(true);
    turret.setVisible(true);
    turret.place(i, j);
  }



}



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
    this.y = i;
    this.x = j;
    
    //console.log(this.map)
    //this.map[i][j] = 1;             //error here
  },

  update: function (time, delta){
    // time to shoot
    if(time > this.nextTic) {                
      this.nextTic = time + 1000;
    }
  }

})



