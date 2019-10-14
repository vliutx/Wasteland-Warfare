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
                    [-1,-1,-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1]];

    var gunfire;
    var timeText;
    var timeRemaining;
    var buildPhase = false;
    var startGame = false;
    var startText;
    var gameTime = 0;
    var reloadTime = 0;
    var enemiesRemaining;
    var waveText;
    var waveNumber;
    var scrapText;
    var lifecount;
    var lifecountText;
    var victoryText;
    var continueText;
    var defeatText;
    var restartText;
    var path;
    var restart = false;
    var cannonshot;
    var walking;
    var wind;
    var tick;
    var ammoCount;
    var ammoCountText;
    var reloading = false;

    //NAME THESE BETTER/DON'T PUT THEM HERE
    var movetext;
    var firetext;
    var pointer;
    var pointer2;
    var selecttext;
    var placetext;

export default class BootScene extends Phaser.Scene {
  constructor () {
    super('Boot');
  }

  init (data) {
    // Initialization code goes here
  }

  preload () {
    // Preload assets
    this.load.spritesheet("regularenemy", "./assets/spriteSheets/RegularEnemy.png", {
      frameHeight: 64,
      frameWidth: 64
    });
    this.load.spritesheet("fastenemy", "./assets/spriteSheets/FastEnemy.png", {
      frameHeight: 64,
      frameWidth: 64
    });

    this.load.image('turret', 'assets/Turret1.png');
    this.load.image('player', 'assets/MainPlayer.png');
    this.load.image('bullet', 'assets/Bullet.png');
    this.load.image('toughenemy', './assets/ToughEnemy.png');
    this.load.image('desertBackground', './assets/tilesets/level1map.png');
    this.load.image('player', './assets/MainPlayer.png');
    this.load.image('pointer', './assets/ArrowPointer.png');
    this.load.audio('gunshot', 'assets/sounds/gunshot.mp3');
    this.load.audio('wind', 'assets/sounds/Wind.mp3');
    this.load.audio('tick', 'assets/sounds/Tick.mp3');

    // Assets for cannon class
    this.load.image('cannon', 'assets/cannon.png');
    this.load.audio('cannonshot', 'assets/sounds/cannonshot.mp3');
    this.load.image('shell', 'assets/Cannonball.png');

    // turret selector
    this.load.image('turreticon', 'assets/Turret1-Icon.png');
    this.load.image('cannonicon', 'assets/Cannon-Icon.png');

    // Declare variables for center of the scene
    this.centerX = this.cameras.main.width / 2;
    this.centerY = this.cameras.main.height / 2;
  }

  create() {

    //ambient wind and ticking
    wind = this.sound.add('wind', {loop: true});
    wind.play();
    tick = this.sound.add('tick');

    //Initialize gun ammo
    ammoCount = 6;

    //DOES NOT WORK CURRENTLY
    walking = this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNumbers("regularenemy", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    //Add background to level
    this.add.image(this.centerX, this.centerY, "desertBackground");

    //Add sounds
    gunfire = this.sound.add('gunshot');
    cannonshot = this.sound.add('cannonshot');

    //Create the path
    path = this.add.path(160, 0);
    path.lineTo(160, 416);
    path.lineTo(416, 416);
    path.lineTo(416, 160);
    path.lineTo(544, 160);
    path.lineTo(544, 544);
    path.lineTo(800, 544);
    path.lineTo(800, -50);

    //creates buttons to change between the turrets
    var button1 = this.add.sprite(40, 600, 'turreticon', 0).setInteractive();
    button1.on('pointerup', function(){
        turret_selector = 0;
        button1.alpha = 1;
        button2.alpha = 0.5;
    });
    var button2 = this.add.sprite(110, 600, 'cannonicon', 0).setInteractive();
    button2.on('pointerup', function(){
        turret_selector = 1;
        button2.alpha = 1;
        button1.alpha = 0.5;
    })
    button2.alpha = 0.5; //initially on button 1 already.

//Create enemies/towers/player groups

    //Player
    player = this.physics.add.sprite(864, 32, 'player');
    this.physics.world.setBounds(0, 0, 896, 640);
    player.setCollideWorldBounds(true);
    //player can shoot
    var spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    spaceBar.on("down", function(){
        if (pause != true && reloading == false){
        addBullet(player.x,player.y,Math.PI)
        ammoCount -= 1
        }
    });
    lifecount = 10;


    //Enemies
    reg_enemies = this.physics.add.group({ classType: Regular, runChildUpdate: true });
    fast_enemies = this.physics.add.group({ classType: Fast, runChildUpdate: true });

    //enemy animations
    this.anims.create({
        key: "walk",
        frames: this.anims.generateFrameNumbers("regularenemy", { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1,
    });

    reg_enemies.playAnimation('walk');


    //enemy blink
    let c1 = Phaser.Display.Color.HexStringToColor('#ffffff'﻿); // From no tint
    let c2 = Phaser.Display.Color.HexStringToColor('#ff0000'﻿); // To RED
    this.tweenStep = 0;
    let tween = this.tweens.add({
        targets: this,
        tweenStep: 100,
        onUpdate: () => {
            let col = Phaser.Display.Color.Interpolate.ColorWithColor(c1, c2, 100, this.tweenStep);
            let colourInt = Phaser.Display.Color.GetColor(col.r, col.g, col.b);
            player.setTint(colourInt); 
        },
        duration: 200,
        yoyo: true
    });


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

//Physics overlaps

    //Bullets overlap for turrets/player
    this.physics.add.overlap(reg_enemies, bullets, damageEnemyBullet);
    this.physics.add.overlap(fast_enemies, bullets, damageEnemyBullet);

    //Shells overlap for cannon
    this.physics.add.overlap(reg_enemies, shells, damageEnemyShell);
    this.physics.add.overlap(fast_enemies, shells, damageEnemyShell);

    //place turrets (ADD FOR CANNONS)
    this.input.on('pointerdown', placeTower);


//Create game texts

    //Add scrap text
    scrapText = this.add.text(365, 40, this.scraptext, {fontSize: 30, color: "#FFFFFF", fontStyle: "bold"});
    scrapText.setVisible(false);
    //Create wave text
    waveText = this.add.text(400, 5, "Wave: " + waveNumber, {fontSize: 30, color: '#ffffff', fontStyle: 'bold', depth: 10});
    waveText.setVisible(false);
    //Create timer variable and display text
    this.buildTime = 10;
    timeText = this.add.text(165, 600, timeRemaining, {fontSize: 30, color: '#000000', fontStyle: 'bold'});
    //Add enemies remaining text
    this.enemiesRemainingText = this.add.text(165, 600, enemiesRemaining, {fontSize: 30, color: '#FF0000', fontStyle: 'bold'});
    this.enemiesRemainingText.setVisible(false);
    //Create health text
    lifecountText = this.add.text(700, 615, "Lifecount: " + lifecount, {fontSize: 25, color: '#FF0000', fontStyle: 'bold'});
    lifecountText.setVisible(false);
    //ammoCount
    ammoCountText = this.add.text(700, 590, "Ammo: " + ammoCount, {fontSize: 25, color: '#FF0000', fontStyle: 'bold'});
    ammoCountText.setVisible(false);
    //Create Victory text
    victoryText = this.add.text(250, 5, "VICTORY!", {fontSize: 100, color: '#FFFFFF', fontStyle: 'bold'});
    victoryText.setVisible(false);
    continueText = this.add.text(195, 90, "(Press \"P\" to continue the game)", {fontSize: 30, color: '#FFFFFF', fontStyle: 'bold'});
    continueText.setVisible(false);
    //Defeat text
    defeatText = this.add.text(250, 5, "¡DEFEAT!", {fontSize: 100, color: '#FF0000', fontStyle: 'bold'});
    defeatText.setVisible(false);
    restartText = this.add.text(195, 100, "(Press \"R\" to restart the game)", {fontSize: 30, color: '#FF0000', fontStyle: 'bold'});
    restartText.setVisible(false);
    //various tutorial texts
    movetext = this.add.text(250, 80, "Move with up and down arrow.", {fontSize: 30, color: '#ff0000', fontStyle: 'bold', depth: 10});
    movetext.setVisible(false);
    firetext = this.add.text(340, 130, "Fire with space", {fontSize: 30, color: '#ff0000', fontStyle: 'bold', depth: 10});
    firetext.setVisible(false);
    pointer = this.add.image(800, 30, 'pointer');
    pointer.setVisible(false);
    selecttext = this.add.text(170, 80, "Select towers by clicking the tower.", {fontSize: 30, color: '#ff0000', fontStyle: 'bold', depth: 10});
    selecttext.setVisible(false);
    placetext = this.add.text(220, 130, "Click a space to place a tower", {fontSize: 30, color: '#ff0000', fontStyle: 'bold', depth: 10});
    placetext.setVisible(false);
    pointer2 = this.add.image(40, 530, 'pointer').setRotation(Math.PI/2);
    pointer2.setVisible(false);


//Start the game

    //Prompt player to start game
    startText = this.add.text(225, 5, "Press \"P\" to start the game", {fontSize: 32, color: '#FF0000', fontStyle: 'bold'});

    //Create key for player to start game
    var startKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    startKey.on("down", function(){
        //start game
        pause = false
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
        ammoCountText.setVisible(true);
    });


  } //End create

  update (time, delta) {

    //Win Condition
    if (wavesRemaining == 0){
        //Psuedo pause the game
        pause = true

        //Display victory text
        scrapText.setVisible(false);
        waveText.setVisible(false);
        victoryText.setVisible(true);

        //Prompt user to continue
        continueText.setVisible(true);
        var continueKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        continueKey.on("down", function(){
            //Disable continue text
            continueText.setVisible(false);
            //Disable victory text
            victoryText.setVisible(false);
            //unpause game
            pause = false;
            //Enable wave text
            waveText.setVisible(true);
            //Enable scrap text
            scrapText.setVisible(true);
            //Increment wavesRemaining so condition goes to false
            wavesRemaining-= 1;
        });
    }

    //Loss condition
    if (lifecount == 0){
        //pause game
        pause = true;

        //remove scrap and wave text
        scrapText.setVisible(false);
        waveText.setVisible(false);

        //Display defeat text
        defeatText.setVisible(true);

        //Prompt player to restart the game
        restartText.setVisible(true);
        var restartKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        restartKey.on("down", function(){
            location.reload();
        });
    }

    //out of bullets. Reload
    if (ammoCount == 0){
      reloading = true;
      reloadTime += delta/1000;

      if (Math.floor(reloadTime) == 1){
        ammoCount = 6;
        reloadTime = 0;
        reloading = false;
      }
    }

    //Build phase
    if (buildPhase == true && pause != true){

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

    //tutorial text number 1
    if (buildPhase == true && waveNumber == 1){
      movetext.setVisible(true);
      firetext.setVisible(true);
      pointer.setVisible(true);
    }

    if (buildPhase == false && waveNumber == 1){
      movetext.setVisible(false);
      firetext.setVisible(false);
      pointer.setVisible(false);
    }

    //tutorial text number 2
    if (buildPhase == true && waveNumber == 2){
      selecttext.setVisible(true);
      placetext.setVisible(true);
      pointer2.setVisible(true);
    }

    if (buildPhase == false && waveNumber == 2){
      selecttext.setVisible(false);
      placetext.setVisible(false);
      pointer2.setVisible(false);
    }

    //Combat phase
    if (buildPhase == false && pause != true){

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
            //Increment wave number and remaining waves
            waveNumber += 1;
            waveText.setText("Wave: " + waveNumber);
            wavesRemaining -= 1;
            //Increment wave size
            this.waveSize += 4;
            //Increment spawn delay
            if(this.spawnDelay>100){
                this.spawnDelay -= 100;
            }
        }
    } //End combat phase

    //Adjust scrap text
    scrapText.setText("Scraps: " + scraps);

    //Adjust lifecount text
    lifecountText.setText("Lifecount: " + lifecount);

    //adjust bullets
    ammoCountText.setText("Ammo: " + ammoCount);

    //Player movement
    if (pause != true) {
        var cursors = this.input.keyboard.createCursorKeys();
        var speed = 6

        if (cursors.up.isDown) {
        player.y -= speed;
        } else if (cursors.down.isDown) {
        player.y += speed;
        } else {
        }
    }


  } //End update()

}//End class export


var Regular = new Phaser.Class({

        Extends: Phaser.GameObjects.Image,

        initialize:

        function Enemy (scene)
        {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'regularenemy');
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
            //VERY MAKESHIFT ROTATION
            if (this.follower.vec.x == 160) {
              this.rotation = Math.PI;
            } else if (this.follower.vec.x > 160 && this.follower.vec.x < 416 ) {
              this.rotation = Math.PI/2;
            } else if (this.follower.vec.x == 416) {
              this.rotation = 0;
            } else if (this.follower.vec.x > 416 && this.follower.vec.x < 544 ) {
              this.rotation = Math.PI/2;
            } else if (this.follower.vec.x == 544) {
              this.rotation = Math.PI;
            } else if (this.follower.vec.x > 544 && this.follower.vec.x < 800 ) {
              this.rotation = Math.PI/2;
            } else if (this.follower.vec.x == 800) {
              this.rotation = 0;
            }

            if (pause != true){
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
          //VERY MAKESHIFT ROTATION
          if (this.follower.vec.x == 160) {
            this.rotation = Math.PI;
          } else if (this.follower.vec.x > 160 && this.follower.vec.x < 416 ) {
            this.rotation = Math.PI/2;
          } else if (this.follower.vec.x == 416) {
            this.rotation = 0;
          } else if (this.follower.vec.x > 416 && this.follower.vec.x < 544 ) {
            this.rotation = Math.PI/2;
          } else if (this.follower.vec.x == 544) {
            this.rotation = Math.PI;
          } else if (this.follower.vec.x > 544 && this.follower.vec.x < 800 ) {
            this.rotation = Math.PI/2;
          } else if (this.follower.vec.x == 800) {
            this.rotation = 0;
          }
            if (pause != true){
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
        }

});


var Turret = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:

    function Turret (scene)
    {
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'turret');
        this.setInteractive();
        this.on('pointerdown', this.upgrade);
        this.nextTic = 0;
        this.fireRate = 1000;
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
            addBullet(this.x, this.y, angle);
            this.angle = (angle + Math.PI/2) * Phaser.Math.RAD_TO_DEG;
        }
    },
    update: function (time, delta)
    {
        if(time > this.nextTic) {
            this.fire();
            this.nextTic = time + this.fireRate;
        }
    },
    upgrade: function ()
    {
        var i = (this.y - 32) / 64;
        var j = (this.x - 32) / 64;
        if (scraps >= 10 && map[i][j] == 1){
            scraps -= 10;
            map[i][j] = 2;
            this.fireRate /= 2;
            this.setTint(0x0000ff);
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
            this.nextTic = time + 2000;
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

        this.speed = Phaser.Math.GetSpeed(500, 1);
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

        this.speed = Phaser.Math.GetSpeed(4000, 1);
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


function damageEnemyBullet(enemy, bullet) {
    // Shot by turret
    if (enemy.active === true && bullet.active === true) {
        // we remove the bullet right away
        bullet.setActive(false);
        bullet.setVisible(false);

        // decrease the enemy hp with BULLET_DAMAGE
        enemy.receiveDamage(BULLET_DAMAGE);
    }
}


function damageEnemyShell(enemy, shell) {
    // Shot by turret
    if (enemy.active === true && shell.active === true) {
        // we remove the shell right away
        shell.setActive(false);
        shell.setVisible(false);

        // decrease the enemy hp with SHELL_DAMAGE
        enemy.receiveDamage(SHELL_DAMAGE);
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
    return map[i][j] === 0 && pause != true;
}


function placeTower(pointer) {
    var i = Math.floor(pointer.y/64);
    var j = Math.floor(pointer.x/64);
    if(canPlaceTurret(i, j)) {
        if (turret_selector == 0 && scraps >= 5){
            scraps -= 5;
            var turret = turrets.get();
            if (turret){
                turret.setActive(true);
                turret.setVisible(true);
                turret.place(i, j);
            }
        }
        else if (turret_selector == 1 && scraps >= 10){
            scraps -= 10;
            var cannon = cannons.get();
            if (cannon){
                cannon.setActive(true);
                cannon.setVisible(true);
                cannon.place(i, j);
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
        gunfire.play()
    }
}


function addShell(x, y, angle) {
    var shell = shells.get();
    if (shell)
    {
        shell.fire(x, y, angle);
        cannonshot.play();
    }
}
