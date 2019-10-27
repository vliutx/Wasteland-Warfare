/*global Phaser*/


    var map =      [[ 0, 0,-1, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1,-1],
                    [ 0, 0,-1, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1,-1],
                    [ 0, 0,-1, 0, 0, 0,-1,-1,-1, 0, 0, 0,-1,-1],
                    [ 0, 0,-1, 0, 0, 0,-1, 0,-1, 0, 0, 0,-1,-1],
                    [ 0, 0,-1, 0, 0, 0,-1, 0,-1, 0, 0, 0,-1,-1],
                    [ 0, 0,-1, 0, 0, 0,-1, 0,-1, 0, 0, 0,-1,-1],
                    [ 0, 0,-1,-1,-1,-1,-1, 0,-1, 0, 0, 0,-1,-1],
                    [ 0, 0, 0, 0, 0, 0, 0, 0,-1, 0, 0, 0,-1,-1],
                    [-1,-1,-1, 0, 0, 0, 0, 0,-1,-1,-1,-1,-1,-1],
                    [-1,-1,-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1]];



    // Counters
    var scraps = 0;
    var lifecount = 10;
    var wavesRemaining = 3;
    var gameTime = 0;
    var turret_selector = -1;
    var gameTime = 0;
    var reloadTime = 0;


    // Booleans
    var pause = true;
    var buildPhase = false;
    var startGame = false;
    var restart = false;
    var reloading = false;


    // Counters
    var enemiesRemaining;
    var waveNumber;
    var lifecount;
    var ammoCount;
    var tickTimer = 3

    // Misc
    var path;
    var tick;
    var death;
    var ammoCount;
    var ammoCountText;
    var reloading = false;

    //NAME THESE BETTER/DON'T PUT THEM HERE
    var movetext;
    var firetext;
    var pointer;
    var pointer2;
    var pointer3;
    var ammoText;
    var selecttext;
    var placetext;
    var count = 0;
    var BC = 1;
    var wavesRemaining = 5;
    var totalWaves = wavesRemaining;

    // Sounds
    var cannonshot;
    var wind;
    var tick;
    var theme;
    var tank;
    var explode;
    var electric;

    //NAME THESE BETTER/DON'T PUT THEM HERE
    var movetext;
    var firetext;
    var pointer;
    var pointer2;
    var selecttext;
    var placetext;
    var upgradetext;
    var costText;
    var count = 0;
    var BC = 1;
    var wavesRemaining = 5;
    var totalWaves = wavesRemaining;

    // Enemies
    var FAST_SPEED = 1/12500;
    var FAST_HEALTH = 80;
    var fast_enemies;

    var REG_SPEED = 1/15000;
    var REG_HEALTH = 120;
    var reg_enemies;

    var tough_enemies;
    var TOUGH_SPEED = 1/17500;
    var TOUGH_HEALTH = 160;

    var boss_enemies;
    var BOSS_SPEED = 1/20000;
    var BOSS_HEALTH = 1000;

    // Towers
    var turrets;
    var cannons;
    var lightnings;

    // Damage
    var BULLET_DAMAGE = 40;
    var SHELL_DAMAGE = 120;
    var LIGHTNING_DAMAGE = 5;

    // redsquare
    var redSquare
    var graphics

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
    this.load.spritesheet("toughenemy", "./assets/spriteSheets/ToughEnemy.png", {
      frameHeight: 64,
      frameWidth: 64
    });

    this.load.image('bossenemy', 'assets/TankBoss.png');
    this.load.image('turret', 'assets/Turret1.png');
    this.load.image('player', 'assets/MainPlayer.png');
    this.load.image('bullet', 'assets/Bullet.png');
    this.load.image('desertBackground', './assets/tilesets/level1map.png');
    this.load.image('player', './assets/MainPlayer.png');
    this.load.image('pointer', './assets/ArrowPointer.png');
    this.load.audio('gunshot', 'assets/sounds/gunshot.mp3');


    // Assets for lightning turret
    this.load.spritesheet("lightning", "./assets/spriteSheets/Tesla Tower.png", {
        frameHeight: 96,
        frameWidth: 96
      });

    this.load.audio('death', 'assets/sounds/death.mp3');
    this.load.audio('wind', 'assets/sounds/Wind.mp3');
    this.load.audio('tick', 'assets/sounds/Tick.mp3');
    this.load.audio('theme', 'assets/sounds/WastelandWarfare.wav');
    this.load.audio('tankSounds', 'assets/sounds/Tank.mp3');
    this.load.audio('explosion', 'assets/sounds/Explode.mp3');
    this.load.audio('electricity', 'assets/sounds/Electric.mp3');

    // Assets for cannon class
    this.load.image('cannon', 'assets/cannon.png');
    this.load.audio('cannonshot', 'assets/sounds/cannonshot.mp3');
    this.load.image('shell', 'assets/Cannonball.png');

    // turret selector
    this.load.image('turreticon', 'assets/Turret1-Icon.png');
    this.load.image('cannonicon', 'assets/Cannon-Icon.png');
    this.load.image('lightningicon', 'assets/Tesla-Icon.png');

    // upgrades
    this.load.image('checkmark', 'assets/checkmark.png');
    this.load.image('xmark', 'assets/xmark.png');

    // Declare variables for center of the scene
    this.centerX = this.cameras.main.width / 2;
    this.centerY = this.cameras.main.height / 2;
  }

  create() {
    //ambient wind and ticking
    wind = this.sound.add('wind', {loop: true, volume: 0.1});
    tick = this.sound.add('tick');
    theme = this.sound.add('theme', {loop: true, volume: 0.5});

    //Add sounds
    gunfire = this.sound.add('gunshot', {volume: 0.20});
    cannonshot = this.sound.add('cannonshot');
    death = this.sound.add('death', {volume: 0.1});
    explode = this.sound.add('explosion', {volume: 0.7});
    tank = this.sound.add('tankSounds', {loop: true});
    electric = this.sound.add('electricity',{volume: 0.1, loop: false});

    //play Sounds
    theme.play();
    wind.play();

    //Initialize gun ammo
    ammoCount = 6;

    this.anims.create({
        key: "lightning",
        frames: this.anims.generateFrameNumbers("lightning", { start: 0, end: 5 }),
        frameRate: 10,
        repeat: 0,
      });


    //Add background to level
    this.add.image(this.centerX, this.centerY, "desertBackground");

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
    var button1 = this.add.sprite(40, 530, 'turreticon', 0).setInteractive();
    button1.on('pointerup', function(){
        turret_selector = 0;
        button1.alpha = 1;
        button2.alpha = 0.5;
        button3.alpha = 0.5;
    });
    var button2 = this.add.sprite(110, 530, 'cannonicon', 0).setInteractive();
    button2.on('pointerup', function(){
        turret_selector = 1;
        button2.alpha = 1;
        button1.alpha = 0.5;
        button3.alpha = 0.5;
    });
    var button3 = this.add.sprite(40, 600, 'lightningicon', 0).setInteractive();
    button3.on('pointerup', function(){
        turret_selector = 2;
        button3.alpha = 1;
        button1.alpha = 0.5;
        button2.alpha = 0.5;
    });
    button1.alpha = 0.5; // all deselected? trying it idk
    button2.alpha = 0.5;
    button3.alpha = 0.5;
    //Descriptions of turrets
    var b1Text = this.add.text(90, 500, "Turret:\nMedium damage, high fire-rate", {fontSize: 30, color: "#FFFFFF", fontStyle: "bold"});
    b1Text.setVisible(false);
    var b2Text = this.add.text(154, 500, "Cannon:\nHigh damage, low fire-rate", {fontSize: 30, color: "#FFFFFF", fontStyle: "bold"});
    b2Text.setVisible(false);
    var b3Text = this.add.text(90, 570, "Tesla Coil:\nLow damage continuous AOE", {fontSize: 30, color: "#FFFFFF", fontStyle: "bold"});
    b3Text.setVisible(false);
    button1.on('pointerover', function(){
        b1Text.setVisible(true);
    });
    button1.on('pointerout', function(){
        b1Text.setVisible(false);
    });
    button2.on('pointerover', function(){
        b2Text.setVisible(true);
    });
    button2.on('pointerout', function(){
        b2Text.setVisible(false);
    });
    button3.on('pointerover', function(){
        b3Text.setVisible(true);
    });
    button3.on('pointerout', function(){
        b3Text.setVisible(false);
    });

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


    //Enemies
    reg_enemies = this.physics.add.group({ classType: Regular, runChildUpdate: true });
    fast_enemies = this.physics.add.group({ classType: Fast, runChildUpdate: true });
    tough_enemies = this.physics.add.group({ classType: Tough, runChildUpdate: true });
    boss_enemies = this.physics.add.group({ classType: Boss, runChildUpdate: true });

    //enemy animations
    this.anims.create({
        key: "reg_walk",
        frames: this.anims.generateFrameNumbers("regularenemy", { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: "tough_walk",
        frames: this.anims.generateFrameNumbers("toughenemy", { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: "fast_walk",
        frames: this.anims.generateFrameNumbers("fastenemy", { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
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
    cannons = this.add.group({classType: Cannon, runChildUpdate: true});
    lightnings = this.add.group({classType: Lightning, runChildUpdate: true});

    // Bullets
    bullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });
    shells = this.physics.add.group({classType: Shell, runChildUpdate: true});

//Physics overlaps

    //Bullets overlap for turrets/player
    this.physics.add.overlap(reg_enemies, bullets, damageEnemyBullet.bind(this));
    this.physics.add.overlap(fast_enemies, bullets, damageEnemyBullet.bind(this));
    this.physics.add.overlap(tough_enemies, bullets, damageEnemyBullet.bind(this));
    this.physics.add.overlap(boss_enemies, bullets, damageEnemyBullet.bind(this));
    //Shells overlap for cannon
    this.physics.add.overlap(reg_enemies, shells, damageEnemyShell.bind(this));
    this.physics.add.overlap(fast_enemies, shells, damageEnemyShell.bind(this));
    this.physics.add.overlap(tough_enemies, shells, damageEnemyShell.bind(this));
    this.physics.add.overlap(boss_enemies, shells, damageEnemyShell.bind(this));

    //place turrets (ADD FOR CANNONS)
    this.input.on('pointerdown', placeTower);
    //display where the turrets can be placed
    
    graphics = this.add.graphics();
    redSquare = new Phaser.Geom.Rectangle(0, 0, 64, 64);
    var q, w;
    this.input.on('pointermove', function(pointer) {
        q = Math.floor(pointer.x/64);
        w = Math.floor(pointer.y/64);
        if (pause == true){
            graphics.clear();
        } else {
            if (canPlaceTurret(w, q)) {
                console.log('can');
                graphics.clear();
                graphics.lineStyle(2, 0x00FF00, 1);
                graphics.strokeRectShape(redSquare);
                redSquare.x = q * 64;
                redSquare.y = w * 64;
            } else {
                console.log('no');
                graphics.clear();
                graphics.lineStyle(2, 0xFF0000, 1);
                graphics.strokeRectShape(redSquare);
                redSquare.x = q * 64;
                redSquare.y = w * 64;
            }
        }
    });
    


//Create game texts

    //Add scrap text
    scrapText = this.add.text(400, 40, this.scraptext, {fontSize: 30, color: "#FFFFFF", fontStyle: "bold"});
    scrapText.setVisible(false);
    //Create wave text
    waveText = this.add.text(400, 5, "Wave: " + waveNumber + '/' + totalWaves, {fontSize: 30, color: '#ffffff', fontStyle: 'bold', depth: 10});
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
    ammoText = this.add.text(777, 480, 'Ammo', {fontSize: 20, color: '#ff0000', fontStyle: 'bold', depth: 10});
    ammoText.setVisible(false);
    pointer3 = this.add.image(800, 540, 'pointer').setRotation(Math.PI/2);
    pointer3.setVisible(false);
    selecttext = this.add.text(170, 80, "Select towers by clicking the tower.", {fontSize: 30, color: '#ff0000', fontStyle: 'bold', depth: 10});
    selecttext.setVisible(false);
    placetext = this.add.text(220, 130, "Click a space to place a tower", {fontSize: 30, color: '#ff0000', fontStyle: 'bold', depth: 10});
    placetext.setVisible(false);
    pointer2 = this.add.image(40, 460, 'pointer').setRotation(Math.PI/2);
    pointer2.setVisible(false);
    upgradetext = this.add.text(210, 80, "Upgrade a turret by clicking it", {fontSize: 30, color: '#ff0000', fontStyle: 'bold', depth: 10});
    upgradetext.setVisible(false);
    costText = this.add.text(160, 130, "(turret upgrade = 2x cost of turret)", {fontSize: 30, color: '#ff0000', fontStyle: 'bold', depth: 10});
    costText.setVisible(false);


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
        theme.stop();

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
    if (lifecount <= 0){
        //pause game
        pause = true;

        //remove scrap and wave text
        scrapText.setVisible(false);
        waveText.setVisible(false);

        //Display defeat text
        defeatText.setVisible(true);
        theme.stop();

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

        //ticking sound

        if (timeRemaining == tickTimer){
          tick.play();
          tickTimer -= 1;
        }

        //When buildtime runs out, spawn the next wave
        if (timeRemaining == 0){
            ammoCount = 6
            //Build phase over
            buildPhase = false;
            //Reset gameTime
            gameTime = 0;
            //Remove text
            timeText.setVisible(false);
            //reset tickTimer
            tickTimer = 3;
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
      ammoText.setVisible(true);
      pointer3.setVisible(true);
    }

    if (buildPhase == false && waveNumber == 1){
      movetext.setVisible(false);
      firetext.setVisible(false);
      pointer.setVisible(false);
      ammoText.setVisible(false);
      pointer3.setVisible(false);
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

    //tutorial text number 3
    if (buildPhase == true && waveNumber == 3){
      upgradetext.setVisible(true);
      costText.setVisible(true);
    }

    if (buildPhase == false && waveNumber == 3){
      upgradetext.setVisible(false);
      costText.setVisible(false);
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

            if (waveNumber >= 3 && count < 2*(waveNumber-2)){
                var tough = tough_enemies.get();
                count += 1;
            }

            if (wavesRemaining == 1 && BC != 0){
                var boss = boss_enemies.get();
                enemiesRemaining+=1;
                BC -= 1;
            }

            if (boss){
                boss.setActive(true);
                boss.setVisible(true);
                boss.startOnPath(100);
                this.nextEnemy = gameTime + this.spawnDelay;
                this.spawned+=1
            }

            if (tough){
                tough.setActive(true);
                tough.setVisible(true);
                tough.startOnPath(100);
                this.nextEnemy = gameTime + this.spawnDelay;
                this.spawned+=1
            }

            if (regular){
                regular.setActive(true);
                regular.setVisible(true);
                regular.startOnPath(REG_HEALTH);

                this.nextEnemy = gameTime + this.spawnDelay;
                this.spawned+=1
            }

            if (fast){
                fast.setActive(true);
                fast.setVisible(true);
                fast.startOnPath(FAST_HEALTH);

                this.nextEnemy = gameTime + this.spawnDelay+100;
                this.spawned+=1
            }
        } //All enemies spawned

        //All enemies despawned
        if (enemiesRemaining <= 0){
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
            waveText.setText("Wave: " + waveNumber + '/' + totalWaves);
            wavesRemaining -= 1;
            //Increment wave size
            this.waveSize += 4;
            //Increment spawn delay
            if(this.spawnDelay>100){
                this.spawnDelay -= 100;
            }
            count = 0;
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

        Extends: Phaser.GameObjects.Sprite,

        initialize:

        function Enemy (scene)
        {
            Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'regularenemy');
            this.play("reg_walk", this);
            this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
            this.hp = 0;
        },

        //Set speed
        ENEMY_SPEED: REG_SPEED,

        startOnPath: function (i)
        {
            this.follower.t = 0;
            this.hp = REG_HEALTH;

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
                death.play();
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


var Tough = new Phaser.Class({

    Extends: Phaser.GameObjects.Sprite,

    initialize:

    function Enemy (scene)
    {
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'toughenemy');
        this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
        this.play("tough_walk", this);
        this.hp = 0;
    },

    //Set speed
    ENEMY_SPEED: TOUGH_SPEED,

    startOnPath: function (i)
    {
        this.follower.t = 0;
        this.hp = TOUGH_HEALTH;

        path.getPoint(this.follower.t, this.follower.vec);

        this.setPosition(this.follower.vec.x, this.follower.vec.y);
    },
    receiveDamage: function(damage) {
        this.hp -= damage;

        // if hp drops below 0 we deactivate this enemy
        if(this.hp <= 0) {
            this.setActive(false);
            this.setVisible(false);
            scraps += 2;
            death.play();
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
                lifecount -= 3
            }
        }
    }

});

var Boss = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:

    function Enemy (scene)
    {
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bossenemy');
        this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
        tank.play();
        this.hp = 0;
    },

    //Set speed
    ENEMY_SPEED: BOSS_SPEED,

    startOnPath: function (i)
    {
        this.follower.t = 0;
        this.hp = BOSS_HEALTH;

        path.getPoint(this.follower.t, this.follower.vec);

        this.setPosition(this.follower.vec.x, this.follower.vec.y);
    },
    receiveDamage: function(damage) {
        this.hp -= damage;

        // if hp drops below 0 we deactivate this enemy
        if(this.hp <= 0) {
            this.setActive(false);
            this.setVisible(false);
            tank.stop();
            explode.play()
            scraps += 10;
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
                enemiesRemaining -= 3;
                tank.stop();
                lifecount -= 10
            }
        }
    }

});


var Fast = new Phaser.Class({

        Extends: Phaser.GameObjects.Sprite,

        initialize:

        function Enemy (scene)
        {
            Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'fastenemy');

            this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
            this.play("fast_walk", this);
            this.hp = 0;
        },

        //Set speed
        ENEMY_SPEED: FAST_SPEED,

        startOnPath: function (i)
        {
            this.follower.t = 0;
            this.hp = FAST_HEALTH;

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
                death.play();
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
        //var button1 = Phaser.GameObjects.Image.call(this, scene, -32, 0, 'checkmark');
        //Phaser.GameObjects.Image.call(button1, scene, -32, 0, 'checkmark');//.setInteractive();
        //button1.on('pointerup', this.upgrade2);
        //var button2;
        //Phaser.GameObjects.Image.call(button2, scene, 32, 0, 'xmark');
        //button2.setInteractive();
        //this.button2.on('pointerup', this.upgrade3);
        /*
        this.button1.setActive(false);
        this.button1.setVisible(false);
        this.button2.setActive(false);
        this.button2.setVisible(false);*/
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
        this.setInteractive();
        this.on('pointerdown', this.upgrade);
        this.nextTic = 0;
        this.fireRate = 1500;
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
            this.nextTic = time + this.fireRate;
        }
    },
    upgrade: function ()
    {
        var i = (this.y - 32) / 64;
        var j = (this.x - 32) / 64;
        if (scraps >= 20 && map[i][j] == 1){
            scraps -= 20;
            map[i][j] = 2;
            this.fireRate /= 2;
            this.setTint(0xff00ff);
        }
    }
});

var Lightning = new Phaser.Class({

    Extends: Phaser.GameObjects.Sprite,

    initialize:

    function Turret (scene)
    {
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'lightning');
        this.setInteractive();
        this.on('pointerdown', this.upgrade);
        this.nextTic = 0;
        this.fireRate = 200;

    },
    place: function(i, j) {

        this.y = i * 64 + 64/2;
        this.x = j * 64 + 64/2;
        map[i][j] = 1;
    },
    fire: function() {
        var enemies = getEnemies(this.x, this.y, 128);

        for(var i=0; i < enemies.length; i++){
            enemies[i].receiveDamage(LIGHTNING_DAMAGE);
            this.play("lightning", this);
            electric.play();
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
        if (scraps >= 30 && map[i][j] == 1){
            scraps -= 30;
            map[i][j] = 2;
            this.fireRate /= 2;
            this.setTint(0x0000ff);
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
    var toughUnits = tough_enemies.getChildren();
    var bossUnits = boss_enemies.getChildren();
    for(var i = 0; i < regularUnits.length; i++) {
        if(regularUnits[i].active && Phaser.Math.Distance.Between(x, y, regularUnits[i].x, regularUnits[i].y) < distance)
            return regularUnits[i];
    }
    for(var i = 0; i < fastUnits.length; i++) {
        if(fastUnits[i].active && Phaser.Math.Distance.Between(x, y, fastUnits[i].x, fastUnits[i].y) < distance)
            return fastUnits[i];
    }
    for(var i = 0; i < toughUnits.length; i++) {
        if(toughUnits[i].active && Phaser.Math.Distance.Between(x, y, toughUnits[i].x, toughUnits[i].y) < distance)
            return toughUnits[i];
    }
    for(var i = 0; i < bossUnits.length; i++) {
        if(bossUnits[i].active && Phaser.Math.Distance.Between(x, y, bossUnits[i].x, bossUnits[i].y) < distance)
            return bossUnits[i];
    }
    return false;
}

function getEnemies(x, y, distance) {
    var regularUnits = reg_enemies.getChildren();
    var fastUnits = fast_enemies.getChildren();
    var toughUnits = tough_enemies.getChildren();
    var bossUnits = boss_enemies.getChildren();
    var enemies = [];
    for(var i = 0; i < regularUnits.length; i++) {
        if(regularUnits[i].active && Phaser.Math.Distance.Between(x, y, regularUnits[i].x, regularUnits[i].y) < distance)
            enemies.push(regularUnits[i]);
    }
    for(var i = 0; i < fastUnits.length; i++) {
        if(fastUnits[i].active && Phaser.Math.Distance.Between(x, y, fastUnits[i].x, fastUnits[i].y) < distance)
            enemies.push(fastUnits[i]);
    }
    for(var i = 0; i < toughUnits.length; i++) {
        if(toughUnits[i].active && Phaser.Math.Distance.Between(x, y, toughUnits[i].x, toughUnits[i].y) < distance)
            enemies.push(toughUnits[i]);
    }
    for(var i = 0; i < bossUnits.length; i++) {
        if(bossUnits[i].active && Phaser.Math.Distance.Between(x, y, bossUnits[i].x, bossUnits[i].y) < distance)
            enemies.push(bossUnits[i]);
    }
    if (enemies.length > 0){
        return enemies
    }else{
        return false
    }

}

function damageEnemyBullet(enemy, bullet) {
    // Shot by turret
    if (enemy.active === true && bullet.active === true) {
        // we remove the bullet right away
        bullet.setActive(false);
        bullet.setVisible(false);

        // decrease the enemy hp with BULLET_DAMAGE
        enemy.receiveDamage(BULLET_DAMAGE);

     //enemy blink
     this.tweens.addCounter({
            from: 0,
            to: 255,
            duration: 500,
            onUpdate: function (tween)
            {
                var value = Math.floor(tween.getValue());
                enemy.setTint(Phaser.Display.Color.GetColor(255, value,  value));
            }
        });
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

    //enemy blink
     this.tweens.addCounter({
            from: 0,
            to: 255,
            duration: 500,
            onUpdate: function (tween)
            {
                var value = Math.floor(tween.getValue());
                enemy.setTint(Phaser.Display.Color.GetColor(255, value,  value));
            }
        });
    }
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
                tick.play();
            }
        }
        else if (turret_selector == 1 && scraps >= 10){
            scraps -= 10;
            var cannon = cannons.get();
            if (cannon){
                cannon.setActive(true);
                cannon.setVisible(true);
                cannon.place(i, j);
                tick.play();
            }
        }
        else if (turret_selector == 2 && scraps >= 15){
            scraps -= 15;
            var lightning = lightnings.get();
            if (lightning){
                lightning.setActive(true);
                lightning.setVisible(true);
                lightning.place(i, j);
                tick.play();
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
