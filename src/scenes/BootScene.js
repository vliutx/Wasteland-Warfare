/*global Phaser*/


    var map =      [[ 0, 0,-1, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1,-1],
                    [ 0, 0,-1, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1,-1],
                    [ 0, 0,-1, 0, 0, 0,-1,-1,-1, 0, 0, 0,-1,-1],
                    [ 0, 0,-1, 0, 0, 0,-1, 0,-1, 0, 0, 0,-1,-1],
                    [ 0, 0,-1, 0, 0, 0,-1, 0,-1, 0, 0, 0,-1,-1],
                    [ 0, 0,-1, 0, 0, 0,-1, 0,-1, 0, 0, 0,-1,-1],
                    [ 0, 0,-1,-1,-1,-1,-1, 0,-1, 0, 0, 0,-1,-1],
                    [ 0, 0, 0, 0, 0, 0, 0, 0,-1, 0, 0, 0,-1,-1],
                    [ 0, 0, 0, 0, 0, 0, 0, 0,-1,-1,-1,-1,-1,-1],
                    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1]];

    var gunfire;
    var timeText;
    var timeRemaining;
    var buildPhase = false;
    var startGame = false;
    var startText;
    var gameTime = 0;
    var enemiesRemaining;
    var waveText;
    var waveNumber;
    var scrapText;
    var lifecount; 
    var lifecountText;

export default class BootScene extends Phaser.Scene {
  constructor () {
    super('Boot');
  }

  init (data) {
    // Initialization code goes here
  }

  preload () {
    // Preload assets
    this.load.atlas('sprites', 'assets/spritesheet.png', 'assets/spritesheet.json');
    this.load.image('turret', 'assets/Turret1.png');
    this.load.image('player', 'assets/MainPlayer.png');
    this.load.image('bullet', 'assets/bullet.png');
    this.load.image('fastenemy', './assets/FastEnemy.png');
    this.load.image('toughenemy', './assets/ToughEnemy.png');
    this.load.image('desertBackground', './assets/tilesets/level1map.png');
    this.load.image('player', './assets/MainPlayer.png');
    this.load.audio('gunshot', 'assets/sounds/gunshot.mp3');

    // !!!! ADD ASSETS FOR CANNON CLASS !!!!
    this.load.image('cannon', 'assets/cannon.png');
    this.load.audio('cannonshot', 'assets/sounds/cannonshot.mp3');
    this.load.image('shell', 'assets/shell.png');

    // Declare variables for center of the scene
    this.centerX = this.cameras.main.width / 2;
    this.centerY = this.cameras.main.height / 2;
  }

  create() {

    //Add background to level
    this.add.image(this.centerX, this.centerY, "desertBackground");

    //Add sounds
    //gunfire = this.sound.add('gunshot');

    //Create the path
    path = this.add.path(160, 0);
    path.lineTo(160, 416);
    path.lineTo(416, 416);
    path.lineTo(416, 160);
    path.lineTo(544, 160);
    path.lineTo(544, 544);
    path.lineTo(800, 544);
    path.lineTo(800, -50);

//Draw grid lines    
    // var graphics = this.add.graphics();
    // drawLines(graphics);
    // for path planning
    // graphics.lineStyle(3, 0xffffff, 1);
    // path.draw(graphics);


//Create enemies/towers/player groups

    //Player
    player = this.physics.add.sprite(864, 32, 'player');
    this.physics.world.setBounds(0, 0, 896, 640);
    player.setCollideWorldBounds(true);
    //player can shoot
    var spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    spaceBar.on("down", function(){addBullet(player.x,player.y,Math.PI)});
    lifecount = 10;


    //Enemies
    reg_enemies = this.physics.add.group({ classType: Regular, runChildUpdate: true });
    fast_enemies = this.physics.add.group({ classType: Fast, runChildUpdate: true });
   
    // Declare variables
    this.nextEnemy = 0;
    this.waveSize = 6;
    this.spawned = 0;
    enemiesRemaining = this.waveSize;
    waveNumber = 1;
    this.spawnDelay = 400;


    // Turrets
    turrets = this.add.group({ classType: Turret, runChildUpdate: true });
    cannons = this.add.group({classType: Cannon, runChildUpdate: true})

    // Bullets
    bullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });
    shells = this.physics.add.group({classType: Shell, runChildUpdate: true});

//Create game functions

    //class overlaps (ADD FOR CANNONS)
    this.physics.add.overlap(reg_enemies, bullets, damageEnemy);
    this.physics.add.overlap(fast_enemies, bullets, damageEnemy);

    //place turrets (ADD FOR CANNONS)
    //this.input.on('pointerdown', placeTurret);
    this.input.on('pointerdown', placeCannon);


//Create game texts

    //Add scrap text
    scrapText = this.add.text(365, 40, this.scraptext, {fontSize: 30, color: "#FFFFFF", fontStyle: "bold"});
    scrapText.setVisible(false);

    //Create wave text
    waveText = this.add.text(400, 5, "Wave: " + waveNumber, {fontSize: 30, color: '#ffffff', fontStyle: 'bold'});
    waveText.setVisible(false);
    
    //Create timer variable and display text
    this.buildTime = 5;
    timeText = this.add.text(25, 600, timeRemaining, {fontSize: 26, color: '#000000', fontStyle: 'bold'});

    //Add enemies remaining text
    this.enemiesRemainingText = this.add.text(25, 600, enemiesRemaining, {fontSize: 30, color: '#FF0000', fontStyle: 'bold'});
    this.enemiesRemainingText.setVisible(false);

    //Create health text
    lifecountText = this.add.text(650, 600, "Lifecount: " + lifecount, {fontSize: 30, color: '#FF0000', fontStyle: 'bold'});
    lifecountText.setVisible(false);

//Start the game
    //Prompt player to start game
    startText = this.add.text(225, 5, "Press \"P\" to start the game", {fontSize: 32, color: '#FF0000', fontStyle: 'bold'});

    //Create key for player to start game
    var startKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    startKey.on("down", function(){
        //start game
        startGame = true;
        //begin build phase
        buildPhase = true;
        //disable start text
        startText.setVisible(false);  
        //Enable wave text
        waveText.setVisible(true);  
        //Enable scrap text
        scrapText.setVisible(true);
        //Enable lifecount text
        lifecountText.setVisible(true);
    });

    
  } //End create

  update (time, delta) {

    //During build phase
    if (buildPhase == true){

        //Add game timer
        gameTime += delta/1000;
        timeRemaining =  Math.floor(this.buildTime - gameTime);
        timeText.setText('Time before next wave: ' + timeRemaining);
        
        //When buildtime runs out, spawn the next wave
        if (timeRemaining == 0){
            //Build phase over
            buildPhase = false;
            //Reset gameTime    
            gameTime = 0;
            //Remove text
            timeText.setVisible(false);
            //reset enemies remaining
            enemiesRemaining = this.waveSize;
            this.spawned = 0;
            //Add text
            this.enemiesRemainingText.setVisible(true);
        }
    } //Build phase ends

    //During wave phase
    if (buildPhase == false && startGame == true){

        //Set timer 
        gameTime += delta;

        //Display # of enemies remaining
        this.enemiesRemainingText.setText('Enemies remaining: ' + enemiesRemaining);

        //Spawn in enemies
        if ((gameTime > this.nextEnemy) && (this.spawned < this.waveSize)){
            var fast = fast_enemies.get();
            var regular = reg_enemies.get();
            if (regular){
                regular.setActive(true);
                regular.setVisible(true);
                regular.startOnPath(100);

                this.nextEnemy = gameTime + this.spawnDelay;
                this.spawned+=1
            }

            if (fast){
                fast.setActive(true);
                fast.setVisible(true);
                fast.startOnPath(50);

                this.nextEnemy = gameTime + this.spawnDelay+100;
                this.spawned+=1
            }
        } //All enemies spawned 

        //All enemies despawned
        if (enemiesRemaining == 0){
            //begin build phase
            buildPhase = true;
            //Enable time remaining text
            timeText.setVisible(true);
            //reset game time
            gameTime = 0;
            //Enemy text disable
            this.enemiesRemainingText.setVisible(false);    
            //reset this.nextEnemy
            this.nextEnemy = 0;
            //Increment wave number
            waveNumber += 1;
            waveText.setText("Wave: " + waveNumber);
            //Increment wave size
            this.waveSize += 4; 
            //Increment spawn delay
            if(this.spawnDelay>100){
                this.spawnDelay -= 100;
            }
        }
    } //End wave phase

    //Adjust scrap text
    scrapText.setText("Scraps: " + scraps);

    //Adjust lifecount text
    lifecountText.setText("Lifecount: " + lifecount);

//Player movement
    var cursors = this.input.keyboard.createCursorKeys();
    var speed = 6

    if (cursors.up.isDown) {
      player.y -= speed;
    } else if (cursors.down.isDown) {
      player.y += speed;
    } else {
    }


  } //End update()

}//End class export

var Regular = new Phaser.Class({

        Extends: Phaser.GameObjects.Image,

        initialize:

        function Enemy (scene)
        {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sprites', 'enemy');

            this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
            this.hp = 0;
        },

        //Set speed
        ENEMY_SPEED: 1/10000,

        startOnPath: function (i)
        {
            this.follower.t = 0;
            this.hp = i;

            path.getPoint(this.follower.t, this.follower.vec);

            this.setPosition(this.follower.vec.x, this.follower.vec.y);
        },
        receiveDamage: function(damage) {
            this.hp -= damage;

            // if hp drops below 0 we deactivate this enemy
            if(this.hp <= 0) {
                this.setActive(false);
                this.setVisible(false);
                scraps += 1;
                enemiesRemaining -= 1;;
            }
        },
        update: function (time, delta)
        {
            this.follower.t += this.ENEMY_SPEED * delta;
            path.getPoint(this.follower.t, this.follower.vec);

            this.setPosition(this.follower.vec.x, this.follower.vec.y);

            if (this.follower.t >= 1)
            {
                this.setActive(false);
                this.setVisible(false);
                enemiesRemaining -= 1;
                lifecount -= 1
            }
        }

});


var Fast = new Phaser.Class({

        Extends: Phaser.GameObjects.Image,

        initialize:

        function Enemy (scene)
        {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'fastenemy');

            this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
            this.hp = 0;
        },

        //Set speed
        ENEMY_SPEED: 1/7500,

        startOnPath: function (i)
        {
            this.follower.t = 0;
            this.hp = i;

            path.getPoint(this.follower.t, this.follower.vec);

            this.setPosition(this.follower.vec.x, this.follower.vec.y);
        },
        receiveDamage: function(damage) {
            this.hp -= damage;

            // if hp drops below 0 we deactivate this enemy
            if(this.hp <= 0) {
                this.setActive(false);
                this.setVisible(false);
                scraps += 1;
                enemiesRemaining -= 1;
            }
        },
        update: function (time, delta)
        {
            this.follower.t += this.ENEMY_SPEED * delta;
            path.getPoint(this.follower.t, this.follower.vec);

            this.setPosition(this.follower.vec.x, this.follower.vec.y);

            if (this.follower.t >= 1)
            {
                this.setActive(false);
                this.setVisible(false);
                enemiesRemaining -= 1;
                lifecount -= 1
            }
        }

});


var Turret = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:

    function Turret (scene)
    {
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'turret');
        this.nextTic = 0;
    },
    place: function(i, j) {

        this.y = i * 64 + 64/2;
        this.x = j * 64 + 64/2;
        map[i][j] = 1;
    },
    fire: function() {
        var enemy = getEnemy(this.x, this.y, 200);
        if(enemy) {
            var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y);
            addShell(this.x, this.y, angle);
            this.angle = (angle + Math.PI/2) * Phaser.Math.RAD_TO_DEG;
        }
    },
    update: function (time, delta)
    {
        if(time > this.nextTic) {
            this.fire();
            this.nextTic = time + 1000;
        }
    }
});

var Cannon = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:

    function Turret (scene)
    {
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'cannon');
        this.nextTic = 0;
    },
    place: function(i, j) {

        this.y = i * 64 + 64/2;
        this.x = j * 64 + 64/2;
        map[i][j] = 1;
    },
    fire: function() {
        var enemy = getEnemy(this.x, this.y, 200);
        if(enemy) {
            var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y);
            addShell(this.x, this.y, angle);
            this.angle = (angle + Math.PI/2) * Phaser.Math.RAD_TO_DEG;
        }
    },
    update: function (time, delta)
    {
        if(time > this.nextTic) {
            this.fire();
            this.nextTic = time + 1000;
        }
    }
});

var Shell = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:

    function Shell (scene)
    {
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'shell');

        this.incX = 0;
        this.incY = 0;
        this.lifespan = 0;

        this.speed = Phaser.Math.GetSpeed(750, 1);
    },

    fire: function (x, y, angle)
    {
        this.setActive(true);
        this.setVisible(true);
        //  Bullets fire from the middle of the screen to the given x/y
        this.setPosition(x, y);

    //  we don't need to rotate the bullets as they are round
    //    this.setRotation(angle);

        this.dx = Math.cos(angle);
        this.dy = Math.sin(angle);

        this.lifespan = 1000;
    },

    update: function (time, delta)
    {
        this.lifespan -= delta;

        this.x += this.dx * (this.speed * delta);
        this.y += this.dy * (this.speed * delta);

        if (this.lifespan <= 0)
        {
            this.setActive(false);
            this.setVisible(false);
        }
    }

});


var Bullet = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:

    function Bullet (scene)
    {
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');

        this.incX = 0;
        this.incY = 0;
        this.lifespan = 0;

        this.speed = Phaser.Math.GetSpeed(5000, 1);
    },

    fire: function (x, y, angle)
    {
        this.setActive(true);
        this.setVisible(true);
        //  Bullets fire from the middle of the screen to the given x/y
        this.setPosition(x, y);

    //  we don't need to rotate the bullets as they are round
    //    this.setRotation(angle);

        this.dx = Math.cos(angle);
        this.dy = Math.sin(angle);

        this.lifespan = 1000;
    },

    update: function (time, delta)
    {
        this.lifespan -= delta;

        this.x += this.dx * (this.speed * delta);
        this.y += this.dy * (this.speed * delta);

        if (this.lifespan <= 0)
        {
            this.setActive(false);
            this.setVisible(false);
        }
    }

});


function getEnemy(x, y, distance) {
    var regularUnits = reg_enemies.getChildren();
    var fastUnits = fast_enemies.getChildren();
    for(var i = 0; i < regularUnits.length; i++) {
        if(regularUnits[i].active && Phaser.Math.Distance.Between(x, y, regularUnits[i].x, regularUnits[i].y) < distance)
            return regularUnits[i];
    }
    for(var i = 0; i < fastUnits.length; i++) {
        if(fastUnits[i].active && Phaser.Math.Distance.Between(x, y, fastUnits[i].x, fastUnits[i].y) < distance)
            return fastUnits[i];
    }
    return false;
}


function damageEnemy(enemy, bullet) {
    // only if both enemy and bullet are alive
    if (enemy.active === true && bullet.active === true) {
        // we remove the bullet right away
        bullet.setActive(false);
        bullet.setVisible(false);

        // decrease the enemy hp with BULLET_DAMAGE
        enemy.receiveDamage(BULLET_DAMAGE);
    }
}


function drawLines(graphics) {
    graphics.lineStyle(1, 0x0000ff, 0.8);
    for(var i = 0; i < 10; i++) {
        graphics.moveTo(0, i * 64);
        graphics.lineTo(896, i * 64);
    }
    for(var j = 0; j < 14; j++) {
        graphics.moveTo(j * 64, 0);
        graphics.lineTo(j * 64, 640);
    }
    graphics.strokePath();
}


function canPlaceTurret(i, j) {
    return map[i][j] === 0;
}


function placeTurret(pointer) {
    if (scraps >= 5){
        scraps -=5;
        var i = Math.floor(pointer.y/64);
        var j = Math.floor(pointer.x/64);
        if(canPlaceTurret(i, j)) {
            var turret = turrets.get();
            if (turret){
                turret.setActive(true);
                turret.setVisible(true);
                turret.place(i, j);
            }
        }
    }
}

function placeCannon(pointer) {
    if (scraps >= 0){
        scraps -= 0;
        var i = Math.floor(pointer.y/64);
        var j = Math.floor(pointer.x/64);
        if(canPlaceTurret(i, j)) {
            var cannon = cannons.get();
            if (cannon){
                cannon.setActive(true);
                cannon.setVisible(true);
                cannon.place(i, j);
            }
        }
    }
}



function addBullet(x, y, angle) {
    var bullet = bullets.get();
    if (bullet)
    {
        bullet.fire(x, y, angle);
        //gunfire.play()
    }
}

function addShell(x, y, angle) {
    var shell = shells.get();
    if (shell)
    {
        shell.fire(x, y, angle);
        //gunfire.play() !!!!!ADD IN SOUND!!!!
    }
}
