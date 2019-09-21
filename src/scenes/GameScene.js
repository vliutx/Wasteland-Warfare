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
  }
  

  //  In our game, enemies will move along a predefined path so
  //  we need to create a simple path element
  create (data) {
    // this graphics element is for visualization only
    var graphics = this.add.graphics();
  

    //  The path for our enemies
    //  parameters are at the start x and y of our path
    var path = this.add.path(96, -32); // CHECK FOR CONFLICTS WITH SIZE OF GAME SCREEN
    path.lineTo(96,200); //add lines for enemies to follow 
    path.lineTo(480, 200);
    path.lineTo(480, 830);
    
    graphics.lineStyle(3, 0xffffff, 1);
    // visualize the path
    path.draw(graphics);

    //  Create Enemies
    this.Enemy = new Phaser.Class({

      Extends: Phaser.GameObjects.Image,

      startOnPath: function() {
         // set the t parameter at the start of the path
        this.follower.t = 0;
        
        // get x and y of the given t point            
        path.getPoint(this.follower.t, this.follower.vec);
        
        // set the x and y of our enemy to the received from the previous step
        this.setPosition(this.follower.vec.x, this.follower.vec.y);
      },

      initialize:

      function Enemy (scene)
      {
          Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sprites', 'enemy');

          this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
      },
      update: function (time, delta)
      {
          // move the t point along the path, 0 is the start and 0 is the end
          this.follower.t += this.ENEMY_SPEED * delta;

          // get the new x and y coordinates in vec
          path.getPoint(this.follower.t, this.follower.vec);
          
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

    // Add enemy group to the game
    this.enemies = this.add.group({ classType: this.Enemy, runChildUpdate: true });
    this.nextEnemy = 0;
    var test_enemy = this.enemies.get();
    test_enemy.setVisible(true);
    test_enemy.setActive(true);
    //test_enemy.startOnPath();
  }

  update (time, delta) {
    // Update the scene
        // if its time for the next enemy
    // if (time > this.nextEnemy)
    // {        
    //     var enemy = this.enemies.get();
    //     if (enemy)
    //     {
    //         enemy.setActive(true);
    //         enemy.setVisible(true);
            
    //         // place the enemy at the start of the path
    //         enemy.startOnPath();
            
    //         this.nextEnemy = time + 2000;
    //     }       
    // }

  }
}
