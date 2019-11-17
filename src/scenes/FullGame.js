/*global Phaser*/


    var map =      [[ 0, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [ 0, 0,-1, 0,-1,-1,-1, 0,-1,-1,-1, 0,-1,-1],
                    [ 0, 0,-1,-1,-1, 0,-1, 0,-1, 0,-1, 0,-1,-1],
                    [ 0, 0, 0, 0, 0, 0,-1, 0,-1, 0,-1, 0,-1,-1],
                    [ 0, 0,-1,-1,-1,-1,-1, 0,-1, 0,-1, 0,-1,-1],
                    [ 0, 0,-1, 0, 0, 0, 0, 0,-1, 0,-1, 0,-1,-1],
                    [ 0, 0,-1, 0,-1,-1,-1, 0,-1, 0,-1, 0,-1,-1],
                    [-1,-1,-1, 0,-1, 0,-1, 0,-1, 0,-1, 0,-1,-1],
                    [-1,-1,-1,-1,-1, 0,-1,-1,-1, 0,-1,-1,-1,-1],
                    [-1,-1,-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1]];



    // Counters
    var scraps = 40;
    var lifecount = 10;
    var wavesRemaining = 10;
    var totalWaves = wavesRemaining;
    var gameTime = 0;
    var turret_selector = -1;
    var gameTime = 0;
    var reloadTime = 0;
    var count = 0;
    var BC = 1;
    var timeRemaining;
    var buildTimer = 10;
    var maxAmmo = 6;
    var ammoCount = maxAmmo;
    var enemiesRemaining;
    var waveNumber;
    var tickTimer = 3;

    // Booleans
    var pause = true;
    var buildPhase = false;
    var startGame = false;
    var restart = false;
    var reloading = false;
    var spacedown = false;
    var singleShot = true;
    var machineGun = false;
    var machine = false;
    var reloadme = false;
    var purchaseMachineGun = false;

    // Misc
    var path;
    var tick;
    var death;
    var pointer;
    var pointer2;
    var pointer3;
    var healthpointer;
    var healthtext;
    var played = false;

    // Sounds
    var cannonshot;
    var wind;
    var tick;
    var theme;
    var tank;
    var explode;
    var electric;
    var reload;

    // Sounds
    var cannonshot;
    var wind;
    var tick;

    // Enemies
    var fast_enemies;
    var FAST_SPEED = 1/12500;
    var FAST_HEALTH = 80;

    var reg_enemies;
    var REG_SPEED = 1/17500;
    var REG_HEALTH = 160;

    var tough_enemies;
    var TOUGH_SPEED = 1/20000;
    var TOUGH_HEALTH = 280;

    var boss_enemies;
    var BOSS_SPEED = 1/20000;
    var BOSS_HEALTH = 3000;

    // Towers
    var turrets;
    var cannons;
    var lightnings;

    // Damage
    var BULLET_DAMAGE = 40;
    var SHELL_DAMAGE = 120;
    var LIGHTNING_DAMAGE = 5;
    var shots = 6;

    // graphics stuff
    var redSquare
    var graphics
    var turretIndicator
    var turretRange
    var cannonIndicator
    var cannonRange
    var teslaIndicator
    var teslaRange

    // Buttons
    var button1;
    var button2;
    var button3;

    // time between fires
    var delts = 0;
    var frplayer = 200;

    var nextEnemy = 0;
    var waveSize = 6;
    var spawned = 0;
    enemiesRemaining = waveSize;
    waveNumber = 1;
    var spawnDelay = 400;

    // Enemy Spawns
    var enemies = [8,0,0,0];
    var empty = [0,0,0,0];
    var waves = [
                    [8,0,0,0],
                    [0,15,0,0],
                    [10,10,0,0],
                    [5,20,5,0],
                    [10,10,10,0],
                    [15,15,15,0],
                    [25,0,20,0],
                    [0,150,0,0],
                    [20,20,40,0],
                    [30,50,30,1],
                    [0,0,0,0],
                ];
    var waveN = [];

    var test = true;


export default class FullGame extends Phaser.Scene {
  constructor () {
    super('FullGame');
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
    this.load.spritesheet("player_animation", "./assets/spriteSheets/MainPlayer2.png", {
        frameHeight: 48,
        frameWidth: 48
    });
    this.load.spritesheet("bossenemy", "./assets/spriteSheets/TankBoss.png", {
        frameHeight: 96,
        frameWidth: 96
    });
    this.load.spritesheet("bulletCount", "./assets/spriteSheets/BulletCount.png", {
        frameHeight: 80,
        frameWidth: 80
    });
    this.load.spritesheet("machineBulletCount", "./assets/spriteSheets/MachineBulletCount.png", {
        frameHeight: 160,
        frameWidth: 160
    });
    this.load.spritesheet("waterHealth", "./assets/spriteSheets/WaterHealth.png", {
        frameHeight: 96,
        frameWidth: 96
    });

    this.load.image('turret', 'assets/Turret1.png');
    this.load.image('bullet', 'assets/Bullet.png');
    this.load.image('desertBackground', './assets/tilesets/level2map.png');
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
    this.load.audio('reload', 'assets/sounds/reloading.mp3');

    // Assets for cannon class
    this.load.image('cannon', 'assets/cannon.png');
    this.load.audio('cannonshot', 'assets/sounds/cannonshot.mp3');
    this.load.image('shell', 'assets/Cannonball.png');

    // turret selector
    this.load.image('turreticon', 'assets/Turret1-Icon.png');
    this.load.image('cannonicon', 'assets/Cannon-Icon.png');
    this.load.image('lightningicon', 'assets/Tesla-Icon.png');

    // turret upgrade
    this.load.image('checkmark', 'assets/checkmark.png');
    this.load.image('xmark', 'assets/xmark.png');

    // Declare variables for center of the scene
    this.centerX = this.cameras.main.width / 2;
    this.centerY = this.cameras.main.height / 2;
  }

  create() {

    //Add background to level
    this.add.image(this.centerX, this.centerY, "desertBackground");

    var graphicz = this.add.graphics();
    //Create the path
    //DIFFERENT FROM MAIN CODE
    path = this.add.path(160, 0);
    path.lineTo(160, 160);
    path.lineTo(288, 160);
    path.lineTo(288, 96);
    path.lineTo(416, 96);
    path.lineTo(416, 288);
    path.lineTo(160, 288);
    path.lineTo(160, 544);
    path.lineTo(288, 544);
    path.lineTo(288, 416);
    path.lineTo(416, 416);
    path.lineTo(416, 544);
    path.lineTo(544, 544);
    path.lineTo(544, 96);
    path.lineTo(672, 96);
    path.lineTo(672, 480);
    path.lineTo(800, 480);
    path.lineTo(800, -50);

    //Add sounds
    gunfire = this.sound.add('gunshot', {volume: 0.20});
    cannonshot = this.sound.add('cannonshot');
    death = this.sound.add('death', {volume: 0.1});
    explode = this.sound.add('explosion', {volume: 0.7});
    tank = this.sound.add('tankSounds', {loop: true});
    electric = this.sound.add('electricity',{volume: 0.1, loop: false});
    reload = this.sound.add('reload', {volume: .40});

    //ambient wind and ticking
    wind = this.sound.add('wind', {loop: true, volume: 0.1});
    tick = this.sound.add('tick');
    theme = this.sound.add('theme', {loop: true, volume: 0.5});

    //play Sounds
    theme.play();
    wind.play();

//Create enemies/towers/player groups

//Player

    player = this.physics.add.sprite(864, 32, 'player_animation');
    this.physics.world.setBounds(0, 0, 896, 640);
    player.setCollideWorldBounds(true);
    //player can shoot

    if (singleShot==true){
        var spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        spaceBar.on("down", function(){
            if (pause != true && reloading == false){
            addBullet(player.x,player.y,Math.PI)
            ammoCount -= 1
            }
        });
    }

    //Reload key for the player
    this.reloadKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

// Weapons

    var buyMachineGun = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
    buyMachineGun.on("down", function(){
        if (scraps>=15 && machine == false){
            purchaseMachineGun = true;
            machine = true;
            scraps -= 15;
        }
    });

//info displays

    waterHealth = this.add.sprite(850, 595, 'waterHealth');
    waterHealth.setFrame(10);
    bulletCount = this.add.sprite(760, 605, 'bulletCount');
    machineBulletCount = this.add.sprite(730, 590, 'machineBulletCount');
    machineBulletCount.setVisible(false);

//Enemies

    reg_enemies = this.physics.add.group({ classType: Regular, runChildUpdate: true });
    fast_enemies = this.physics.add.group({ classType: Fast, runChildUpdate: true });
    tough_enemies = this.physics.add.group({ classType: Tough, runChildUpdate: true });
    boss_enemies = this.physics.add.group({ classType: Boss, runChildUpdate: true });

    //enemy animations
    this.anims.create({
        key: "reg_walk",
        frames: this.anims.generateFrameNumbers("regularenemy", { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: "tough_walk",
        frames: this.anims.generateFrameNumbers("toughenemy", { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: "fast_walk",
        frames: this.anims.generateFrameNumbers("fastenemy", { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: "tank_move",
        frames: this.anims.generateFrameNumbers("bossenemy", { start: 0, end: 1 }),
        frameRate: 8,
        repeat: -1
    });

    this.nextEnemy = 0;
    this.waveSize = 6;
    this.spawned = 0;
    enemiesRemaining = this.waveSize;
    waveNumber = 1;
    this.spawnDelay = 400;

// Turrets

    //Create turrets
    turrets = this.add.group({ classType: Turret, runChildUpdate: true });
    cannons = this.add.group({classType: Cannon, runChildUpdate: true});
    lightnings = this.add.group({classType: Lightning, runChildUpdate: true});
    this.anims.create({
        key: "lightning",
        frames: this.anims.generateFrameNumbers("lightning", { start: 0, end: 5 }),
        frameRate: 10,
        repeat: 0,
      });

    //Turret selection
    button1 = this.add.sprite(40, 460, 'turreticon', 0).setInteractive();
    button1.alpha = 0.5;
    button1.on('pointerup', function(){
        turret_selector = 0;
        //selected = true;
        button1.alpha = 1;
        button2.alpha = 0.5;
        button3.alpha = 0.5;
    });
    button2 = this.add.sprite(40, 530, 'cannonicon', 0).setInteractive();
    button2.alpha = 0.5;
    button2.on('pointerup', function(){
        turret_selector = 1;
        //selected = true;
        button2.alpha = 1;
        button1.alpha = 0.5;
        button3.alpha = 0.5;
    });
    button3 = this.add.sprite(40, 600, 'lightningicon', 0).setInteractive();
    button3.alpha = 0.5;
    button3.on('pointerup', function(){
        turret_selector = 2;
        //selected = true;
        button3.alpha = 1;
        button1.alpha = 0.5;
        button2.alpha = 0.5;
    });

    //place towers
    this.input.on('pointerdown', placeTower);
    //display where the turrets can be placed
    var q, w;
    var turretGhost = this.add.image(0, 0, 'turret');
    turretGhost.alpha = 0.4;
    turretGhost.setVisible(false);
    var cannonGhost = this.add.image(0, 0, 'cannon');
    cannonGhost.alpha = 0.4;
    cannonGhost.setVisible(false);
    var teslaGhost = this.add.image(0, 0, 'lightning');
    teslaGhost.alpha = 0.4;
    teslaGhost.setVisible(false);
    this.input.on('pointermove', function(pointer) {
        if (pause == true){
        } else {
            q = Math.floor(pointer.x/64);
            w = Math.floor(pointer.y/64);
            if (canPlaceTurret(w, q)) {
                if (turret_selector == 0){
                    //turret
                    turretGhost.x = q * 64 + 32;
                    turretGhost.y = w * 64 + 32;
                    turretGhost.setVisible(true);
                    turretIndicator.clear();
                    turretRange.x = turretGhost.x;
                    turretRange.y = turretGhost.y;
                    turretIndicator.fillCircleShape(turretRange);
                } else if (turret_selector == 1){
                    //cannon
                    cannonGhost.x = q * 64 + 32;
                    cannonGhost.y = w * 64 + 32;
                    cannonGhost.setVisible(true);
                    cannonIndicator.clear();
                    cannonRange.x = cannonGhost.x;
                    cannonRange.y = cannonGhost.y;
                    cannonIndicator.fillCircleShape(cannonRange);
                } else if (turret_selector == 2){
                    //tesla
                    teslaGhost.x = q * 64 + 32;
                    teslaGhost.y = w * 64 + 32;
                    teslaGhost.setVisible(true);
                    teslaIndicator.clear();
                    teslaRange.x = teslaGhost.x;
                    teslaRange.y = teslaGhost.y;
                    teslaIndicator.fillCircleShape(teslaRange);
                }
            } else if (map[w][q] == 1 || map[w][q] == 2) { //if there's a turret there
            	turretGhost.setVisible(false);
                cannonGhost.setVisible(false);
                teslaGhost.setVisible(false);
            } else {
                //might need to check for turret_indicator for efficiency?
                turretGhost.setVisible(false);
                cannonGhost.setVisible(false);
                teslaGhost.setVisible(false);
                turretIndicator.clear();
                cannonIndicator.clear();
                teslaIndicator.clear();
            }
        }
    });

    //Descriptions of turrets
    var b1Text = this.add.text(100, 500, "Turret:\nMedium damage, high fire-rate", {fontSize: 30, color: "#FFFFFF", fontStyle: "bold"});
    b1Text.setVisible(false);
    var b2Text = this.add.text(100, 500, "Cannon:\nHigh damage, low fire-rate", {fontSize: 30, color: "#FFFFFF", fontStyle: "bold"});
    b2Text.setVisible(false);
    var b3Text = this.add.text(100, 500, "Tesla Coil:\nLow damage continuous AOE", {fontSize: 30, color: "#FFFFFF", fontStyle: "bold"});
    b3Text.setVisible(false);

    //Display turret descriptions when hovering over icon
    button1.on('pointerover', function(){b1Text.setVisible(true)});
    button1.on('pointerout', function(){b1Text.setVisible(false)});
    button2.on('pointerover', function(){b2Text.setVisible(true)});
    button2.on('pointerout', function(){b2Text.setVisible(false)});
    button3.on('pointerover', function(){b3Text.setVisible(true)});
    button3.on('pointerout', function(){b3Text.setVisible(false)});

    //place turrets
    this.input.on('pointerdown', placeTower);

    //Add indicators for where turrets can reach
    turretIndicator = this.add.graphics();
    turretRange = new Phaser.Geom.Circle(0, 0, 132);
    //turretIndicator.fillStyle(0xFFFFFF, 0.3);
    cannonIndicator = this.add.graphics();
    cannonRange = new Phaser.Geom.Circle(0, 0, 132);
    //cannonIndicator.fillStyle(0xFFFFFF, 0.3);
    teslaIndicator = this.add.graphics();
    teslaRange = new Phaser.Geom.Circle(0, 0, 96);
    //teslaIndicator.fillStyle(0xFFFFFF, 0.3);

    //Add indicators for where turrets can reach
    turretIndicator = this.add.graphics();
    turretRange = new Phaser.Geom.Circle(0, 0, 132);
    turretIndicator.lineStyle(2, 0xFFFFFF, 0.5);
    turretIndicator.fillStyle(0xFFFFFF, 0.3);
    cannonIndicator = this.add.graphics();
    cannonRange = new Phaser.Geom.Circle(0, 0, 132);
    cannonIndicator.lineStyle(2, 0xFFFFFFFF, 0.5);
    cannonIndicator.fillStyle(0xFFFFFFFF, 0.3);
    teslaIndicator = this.add.graphics();
    teslaRange = new Phaser.Geom.Circle(0, 0, 96);
    teslaIndicator.lineStyle(2, 0xFFFFFFFF, 0.5);
    teslaIndicator.fillStyle(0xFFFFFFFF, 0.3);

    //turret upgrade feedback
    buttonYes = this.add.image(0, 0, 'checkmark');
    buttonYes.setInteractive();
    buttonYes.setScale(.05);
    buttonNo = this.add.image(0, 0, 'xmark');
    buttonNo.setInteractive();
    buttonNo.setScale(.05);
    buttonYes.setActive(false);
    buttonYes.setVisible(false);
    buttonNo.setActive(false);
    buttonNo.setVisible(false);
    /*this.input.on('pointerdown', function(){
        if (buttonYes.isActive){
            buttonYes.setActive(false);
            buttonYes.setVisible(false);
            buttonNo.setActive(false);
            buttonNo.setVisible(false);
        }
    });*/

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

    //place turrets
    this.input.on('pointerdown', placeTower);


    //Add indicators for where turrets can reach
    turretIndicator = this.add.graphics();
    turretRange = new Phaser.Geom.Circle(0, 0, 132);
    turretIndicator.lineStyle(2, 0xFF0000, 0.5);
    turretIndicator.fillStyle(0xFF0000, 0.3);
    cannonIndicator = this.add.graphics();
    cannonRange = new Phaser.Geom.Circle(0, 0, 132);
    cannonIndicator.lineStyle(2, 0xFF0000, 0.5);
    cannonIndicator.fillStyle(0xFF0000, 0.3);
    teslaIndicator = this.add.graphics();
    teslaRange = new Phaser.Geom.Circle(0, 0, 96);
    teslaIndicator.lineStyle(2, 0xFF0000, 0.5);
    teslaIndicator.fillStyle(0xFF0000, 0.3);

//Create game texts

    //Add scrap text
    scrapText = this.add.text(210, 18, this.scraptext, {fontSize: 25, color: "#FFFFFF", fontStyle: "bold"});
    scrapText.setVisible(false);
    //Create wave text
    waveText = this.add.text(415, 18, "Wave: " + waveNumber + '/' + totalWaves, {fontSize: 25, color: '#ffffff', fontStyle: 'bold', depth: 10});
    waveText.setVisible(false);
    //Create timer variable and display text
    this.buildTime = 15;
    timeText = this.add.text(615, 18, timeRemaining, {fontSize: 25, color: '#FFFFFF', fontStyle: 'bold'});
    //Add enemies remaining text
    enemiesRemainingText = this.add.text(600, 18, "Enemies: " + enemiesRemaining, {fontSize: 25, color: '#FFFFFF', fontStyle: 'bold'});
    enemiesRemainingText.setVisible(false);
    //Create health text
    //Create Victory text
    victoryText = this.add.text(250, 250, "VICTORY!", {fontSize: 100, color: '#FFFFFF', fontStyle: 'bold'});
    victoryText.setVisible(false);
    continueText = this.add.text(195, 345, "(Press \"P\" to continue to game)", {fontSize: 30, color: '#FFFFFF', fontStyle: 'bold'});
    continueText.setVisible(false);
    //Defeat text
    defeatText = this.add.text(250, 250, "¡DEFEAT!", {fontSize: 100, color: '#FF0000', fontStyle: 'bold'});
    defeatText.setVisible(false);
    restartText = this.add.text(195, 345, "(Press \"ENTER\" to restart the game)", {fontSize: 30, color: '#FF0000', fontStyle: 'bold'});
    restartText.setVisible(false);
    //this.healthText = this.add.text(600, 500, "100", {fontSize: 100, color: '#FF0000', fontStyle: 'bold'});


//Start the game

    pause = false
    //begin build phase
    buildPhase = true;
    //Enable wave text
    waveText.setVisible(true);
    //Enable scrap text
    scrapText.setVisible(true);
    //Create restart key
    this.restart = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    graphicz.fillStyle(0xFFFFFF, 0.3);

  } //End create

  update (time, delta) {
// Game Phases
    //Win Condition
    if (wavesRemaining == 0){
        //Psuedo pause the game
        pause = true

        //Display victory text
        scrapText.setVisible(false);
        waveText.setVisible(false);
        victoryText.setVisible(true);
        timeText.setVisible(false);
        theme.stop();

        //Prompt user to continue
        //FIX
        continueText.setVisible(true);
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

        if (Phaser.Input.Keyboard.JustDown(this.restart)) {
            this.scene.start('MenuScene')
            location.reload();
        }
    }

    //Build phase
    if (buildPhase == true && pause != true){

        //Add game timer
        gameTime += delta/1000;
        timeRemaining =  Math.floor(this.buildTime - gameTime);
        timeText.setText('Time: ' + timeRemaining);
        timeText.setColor('#FFFFFF');
        if (timeRemaining <= 5) {
            timeText.setColor('#FF0000');
        };

        //ticking sound

        if (timeRemaining == tickTimer){
          tick.play();
          tickTimer -= 1;
        };

        //When buildtime runs out, spawn the next wave
        if (timeRemaining == 0){
            //ammoCount = 6;
            reloading = false;
            //Build phase over
            buildPhase = false;
            //Reset gameTime
            gameTime = 0;
            //Remove text
            timeText.setVisible(false);
            //reset tickTimer
            tickTimer = 3;
            //reset enemies remaining
            enemiesRemaining = enemies.reduce((a, b) => a + b, 0);
            this.spawned = 0;
            //Add text
            //this.enemiesRemainingText.setVisible(true);
        }
    } //End build phase


    //Combat phase
    if (buildPhase == false && pause != true && lifecount > 0){
        //Set timer
        gameTime += delta;

        //Spawn in ememies
        if ((JSON.stringify(enemies) != JSON.stringify(empty)) && (gameTime > this.nextEnemy)){

            //Spawn in each type of enemy consecutively
            for(var i = 0; i<enemies.length; i++){

                if (i==0 && enemies[i] != 0){      // Reg enemies
                    var regular = reg_enemies.get();
                    enemies[0] -= 1
                    regular.setActive(true);
                    regular.setVisible(true);
                    regular.startOnPath(REG_HEALTH);
                    this.spawned+=1

                }else if (i==1 && enemies[i] != 0){  // Fast enemies
                    var fast = fast_enemies.get();
                    enemies[1] -= 1
                    fast.setActive(true);
                    fast.setVisible(true);
                    fast.startOnPath(FAST_HEALTH);
                    this.spawned+=1

                }else if (i==2 && enemies[i] != 0){   // Tough enemies
                    var tough = tough_enemies.get();
                    enemies[2] -= 1
                    tough.setActive(true);
                    tough.setVisible(true);
                    tough.startOnPath(100);
                    this.spawned+=1

                }else if (i==3 && enemies[i] != 0){   // Boss enemy
                    var boss = boss_enemies.get();
                    enemies[3] -= 1
                    boss.setActive(true);
                    boss.setVisible(true);
                    boss.startOnPath(100);
                    this.spawned+=1
                }

                // Include spawn delay
                this.nextEnemy = gameTime + this.spawnDelay;

            }
        } // all enemies spawned

        //All enemies despawned
        if (enemiesRemaining <= 0){
            //begin build phase
            buildPhase = true;
            //Enable time remaining text
            timeText.setVisible(true);
            //reset game time
            gameTime = 0;
            //reset this.nextEnemy
            this.nextEnemy = 0;
            //Increment wave number and remaining waves
            waveNumber += 1;
            waveText.setText("Wave: " + waveNumber + '/' + totalWaves);
            wavesRemaining -= 1;
            //Increment wave size
            enemies = waves[waveNumber-1];
            //Increment spawn delay
            if(this.spawnDelay>100){
                this.spawnDelay -= 100;
            }
            scraps += (3 + waveNumber-2);
        }
    } //End combat phase


//Reload Mechanic (Copy over reload key from constant updates)
    if (ammoCount == 0 || reloadme == true) {
        reloading = true;
        reloadTime += delta/1000;
        if (played == false) {
            reload.play();
            played = true;
        }

        if (Math.floor(reloadTime) >= 1){
            if (machine == false){
                ammoCount = maxAmmo;
                reloadTime = 0;
                reloading = false;
                played = false;
                reloadme = false;
            } else {
                ammoCount = maxAmmo;
                reloadTime = 0;
                reloading = false;
                played = false;
                reloadme = false;
            }
        }

    }


//Buy weapons
    // Machine Gun
    if (purchaseMachineGun){
        // Adjust
        var spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        spaceBar.on("down", function(){
            spacedown = true;
        });
        spaceBar.on("up", function(){
            spacedown = false;
        })
        machine = true;
        purchaseMachineGun = false;
        maxAmmo = 12;
        ammoCount = maxAmmo;
        reloadTime = 0;
        reloading = false;
        played = false;
        reloadme = false;
<<<<<<< HEAD
=======
        bulletCount.setVisible(false);
        machineBulletCount.setVisible(true);
>>>>>>> jarrod_dev
    }

    // Death machine

    // Rocket Launcher

    //Weapon selection
    //Machine Gun
    if (machine){
        if (spacedown == true){
            if (time - delts > frplayer && pause != true && reloading == false) {
                delts = time
                addBullet(player.x,player.y,Math.PI)
<<<<<<< HEAD
                ammoCount -= 1
=======
                if (spacedown != false){
                    ammoCount -= 1
                }
>>>>>>> jarrod_dev
            }
        }
    }


// Constant updates
    // Check for reload
    if (Phaser.Input.Keyboard.JustDown(this.reloadKey)) {
        if (ammoCount != maxAmmo){
            reloadme = true;
        }
    }
    //Adjust scrap text
    scrapText.setText("Scraps: " + scraps);

    //Health and bullet updates

    waterHealth.setFrame(lifecount);
    //this.healthText.setText(lifecount);
    if (machine==false){
        bulletCount.setFrame(6 - ammoCount);
    }else{
<<<<<<< HEAD
        bulletCount.setFrame(Math.floor((12 - ammoCount)/2));
=======
        machineBulletCount.setFrame(12 - ammoCount);
>>>>>>> jarrod_dev
    }

    //Player movement
    if (pause != true) {
        var cursors = this.input.keyboard.createCursorKeys();
        var speed = 6
        var wKey = this.input.keyboard.addKey('W');
        var sKey = this.input.keyboard.addKey('S');

        if (cursors.up.isDown || wKey.isDown) {
        player.y -= speed;
        } else if (cursors.down.isDown || sKey.isDown) {
        player.y += speed;
        } else {
        }
    }
    //player movement but w and s


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
            //DIFFERENT FROM MAIN GAME
            if (this.follower.vec.x == 160) {
              this.rotation = Math.PI;
            } else if (this.follower.vec.x > 160 && this.follower.vec.x < 288 && this.follower.vec.y == 160) {
              this.rotation = Math.PI/2;
            } else if (this.follower.vec.x == 288 && this.follower.vec.y > 96 && this.follower.vec.y < 160) {
              this.rotation = 0;
            } else if (this.follower.vec.y == 96 && this.follower.vec.x > 288 && this.follower.vec.x < 416) {
              this.rotation = Math.PI/2;
            } else if (this.follower.vec.x == 416) {
              this.rotation = Math.PI;
            } else if (this.follower.vec.x < 416 && this.follower.vec.x > 160 && this.follower.vec.y == 288) {
              this.rotation = 3*Math.PI/2;
            } else if (this.follower.vec.x == 160 && this.follower.vec.y > 300) {
              this.rotation = Math.PI;
            } else if (this.follower.vec.y == 544) {
              this.rotation = Math.PI/2;
            } else if (this.follower.vec.y == 544) {
              this.rotation = Math.PI/2;
            } else if (this.follower.vec.x == 288 && this.follower.vec.y > 400) {
              this.rotation = 0;
            } else if (this.follower.vec.x > 288 && this.follower.vec.x < 416 && this.follower.vec.y == 416) {
              this.rotation = Math.PI/2;
            } else if (this.follower.vec.x == 416 && this.follower.vec.y > 400) {
              this.rotation = Math.PI;
            } else if (this.follower.vec.x == 544) {
              this.rotation = 0;
            } else if (this.follower.vec.x > 544 && this.follower.vec.x < 672 ) {
              this.rotation = Math.PI/2;
            } else if (this.follower.vec.x == 672) {
              this.rotation = Math.PI;
            } else if (this.follower.vec.x > 672 && this.follower.vec.x < 800) {
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
      //DIFFERENT FROM MAIN GAME
      if (this.follower.vec.x == 160) {
        this.rotation = Math.PI;
      } else if (this.follower.vec.x > 160 && this.follower.vec.x < 288 && this.follower.vec.y == 160) {
        this.rotation = Math.PI/2;
      } else if (this.follower.vec.x == 288 && this.follower.vec.y > 96 && this.follower.vec.y < 160) {
        this.rotation = 0;
      } else if (this.follower.vec.y == 96 && this.follower.vec.x > 288 && this.follower.vec.x < 416) {
        this.rotation = Math.PI/2;
      } else if (this.follower.vec.x == 416) {
        this.rotation = Math.PI;
      } else if (this.follower.vec.x < 416 && this.follower.vec.x > 160 && this.follower.vec.y == 288) {
        this.rotation = 3*Math.PI/2;
      } else if (this.follower.vec.x == 160 && this.follower.vec.y > 300) {
        this.rotation = Math.PI;
      } else if (this.follower.vec.y == 544) {
        this.rotation = Math.PI/2;
      } else if (this.follower.vec.y == 544) {
        this.rotation = Math.PI/2;
      } else if (this.follower.vec.x == 288 && this.follower.vec.y > 400) {
        this.rotation = 0;
      } else if (this.follower.vec.x > 288 && this.follower.vec.x < 416 && this.follower.vec.y == 416) {
        this.rotation = Math.PI/2;
      } else if (this.follower.vec.x == 416 && this.follower.vec.y > 400) {
        this.rotation = Math.PI;
      } else if (this.follower.vec.x == 544) {
        this.rotation = 0;
      } else if (this.follower.vec.x > 544 && this.follower.vec.x < 672 ) {
        this.rotation = Math.PI/2;
      } else if (this.follower.vec.x == 672) {
        this.rotation = Math.PI;
      } else if (this.follower.vec.x > 672 && this.follower.vec.x < 800) {
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

    Extends: Phaser.GameObjects.Sprite,

    initialize:

    function Enemy (scene){
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'bossenemy');
        this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
        this.play("tank_move", this);
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
      //DIFFERENT FROM MAIN GAME
      if (this.follower.vec.x == 160) {
        this.rotation = Math.PI;
      } else if (this.follower.vec.x > 160 && this.follower.vec.x < 288 && this.follower.vec.y == 160) {
        this.rotation = Math.PI/2;
      } else if (this.follower.vec.x == 288 && this.follower.vec.y > 96 && this.follower.vec.y < 160) {
        this.rotation = 0;
      } else if (this.follower.vec.y == 96 && this.follower.vec.x > 288 && this.follower.vec.x < 416) {
        this.rotation = Math.PI/2;
      } else if (this.follower.vec.x == 416) {
        this.rotation = Math.PI;
      } else if (this.follower.vec.x < 416 && this.follower.vec.x > 160 && this.follower.vec.y == 288) {
        this.rotation = 3*Math.PI/2;
      } else if (this.follower.vec.x == 160 && this.follower.vec.y > 300) {
        this.rotation = Math.PI;
      } else if (this.follower.vec.y == 544) {
        this.rotation = Math.PI/2;
      } else if (this.follower.vec.y == 544) {
        this.rotation = Math.PI/2;
      } else if (this.follower.vec.x == 288 && this.follower.vec.y > 400) {
        this.rotation = 0;
      } else if (this.follower.vec.x > 288 && this.follower.vec.x < 416 && this.follower.vec.y == 416) {
        this.rotation = Math.PI/2;
      } else if (this.follower.vec.x == 416 && this.follower.vec.y > 400) {
        this.rotation = Math.PI;
      } else if (this.follower.vec.x == 544) {
        this.rotation = 0;
      } else if (this.follower.vec.x > 544 && this.follower.vec.x < 672 ) {
        this.rotation = Math.PI/2;
      } else if (this.follower.vec.x == 672) {
        this.rotation = Math.PI;
      } else if (this.follower.vec.x > 672 && this.follower.vec.x < 800) {
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
          //DIFFERENT FROM MAIN GAME
          if (this.follower.vec.x == 160) {
            this.rotation = Math.PI;
          } else if (this.follower.vec.x > 160 && this.follower.vec.x < 288 && this.follower.vec.y == 160) {
            this.rotation = Math.PI/2;
          } else if (this.follower.vec.x == 288 && this.follower.vec.y > 96 && this.follower.vec.y < 160) {
            this.rotation = 0;
          } else if (this.follower.vec.y == 96 && this.follower.vec.x > 288 && this.follower.vec.x < 416) {
            this.rotation = Math.PI/2;
          } else if (this.follower.vec.x == 416) {
            this.rotation = Math.PI;
          } else if (this.follower.vec.x < 416 && this.follower.vec.x > 160 && this.follower.vec.y == 288) {
            this.rotation = 3*Math.PI/2;
          } else if (this.follower.vec.x == 160 && this.follower.vec.y > 300) {
            this.rotation = Math.PI;
          } else if (this.follower.vec.y == 544) {
            this.rotation = Math.PI/2;
          } else if (this.follower.vec.y == 544) {
            this.rotation = Math.PI/2;
          } else if (this.follower.vec.x == 288 && this.follower.vec.y > 400) {
            this.rotation = 0;
          } else if (this.follower.vec.x > 288 && this.follower.vec.x < 416 && this.follower.vec.y == 416) {
            this.rotation = Math.PI/2;
          } else if (this.follower.vec.x == 416 && this.follower.vec.y > 400) {
            this.rotation = Math.PI;
          } else if (this.follower.vec.x == 544) {
            this.rotation = 0;
          } else if (this.follower.vec.x > 544 && this.follower.vec.x < 672 ) {
            this.rotation = Math.PI/2;
          } else if (this.follower.vec.x == 672) {
            this.rotation = Math.PI;
          } else if (this.follower.vec.x > 672 && this.follower.vec.x < 800) {
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
        this.on('pointerdown', this.buttonCheck);
        this.nextTic = 0;
        this.fireRate = 700;
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
    buttonCheck: function()
    {
        buttonYes.off('pointerup');
        var i = (this.y - 32) / 64;
        var j = (this.x - 32) / 64;
        if (map[i][j] == 1){
            buttonYes.setActive(true);
            buttonNo.setActive(true);
            buttonYes.x = this.x - 40;
            buttonYes.y = this.y;
            buttonNo.x = this.x + 40;
            buttonNo.y = this.y;
            buttonYes.setVisible(true);
            buttonNo.setVisible(true);
            buttonYes.on('pointerup', this.upgrade, this);
            buttonNo.on('pointerup', function(){
                buttonYes.setActive(false);
                buttonYes.setVisible(false);
                buttonNo.setActive(false);
                buttonNo.setVisible(false);
                buttonYes.off('pointerup');
            });
        }
    },
    upgrade: function ()
    {
        var i = (this.y - 32) / 64;
        var j = (this.x - 32) / 64;
        buttonYes.setActive(false);
        buttonYes.setVisible(false);
        buttonNo.setActive(false);
        buttonNo.setVisible(false);
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
        this.on('pointerdown', this.buttonCheck);
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
    buttonCheck: function()
    {
        buttonYes.off('pointerup');
        var i = (this.y - 32) / 64;
        var j = (this.x - 32) / 64;
        if (map[i][j] == 1){
            buttonYes.setActive(true);
            buttonNo.setActive(true);
            buttonYes.x = this.x - 40;
            buttonYes.y = this.y;
            buttonNo.x = this.x + 40;
            buttonNo.y = this.y;
            buttonYes.setVisible(true);
            buttonNo.setVisible(true);
            buttonYes.on('pointerup', this.upgrade, this);
            buttonNo.on('pointerup', function(){
                buttonYes.setActive(false);
                buttonYes.setVisible(false);
                buttonNo.setActive(false);
                buttonNo.setVisible(false);
                buttonYes.off('pointerup');
            });
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
        this.on('pointerdown', this.buttonCheck);
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
    buttonCheck: function()
    {
        buttonYes.off('pointerup');
        var i = (this.y - 32) / 64;
        var j = (this.x - 32) / 64;
        if (map[i][j] == 1){
            buttonYes.setActive(true);
            buttonNo.setActive(true);
            buttonYes.x = this.x - 40;
            buttonYes.y = this.y;
            buttonNo.x = this.x + 40;
            buttonNo.y = this.y;
            buttonYes.setVisible(true);
            buttonNo.setVisible(true);
            buttonYes.on('pointerup', this.upgrade, this);
            buttonNo.on('pointerup', function(){
                buttonYes.setActive(false);
                buttonYes.setVisible(false);
                buttonNo.setActive(false);
                buttonNo.setVisible(false);
                buttonYes.off('pointerup');
            });
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
    for(var i = 0; i < fastUnits.length; i++) {
        if(fastUnits[i].active && Phaser.Math.Distance.Between(x, y, fastUnits[i].x, fastUnits[i].y) < distance)
            return fastUnits[i];
    }
    for(var i = 0; i < regularUnits.length; i++) {
        if(regularUnits[i].active && Phaser.Math.Distance.Between(x, y, regularUnits[i].x, regularUnits[i].y) < distance)
            return regularUnits[i];
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
                turret.on('pointerover', function(){
                	if (pause != true){
                    	turretRange.x = turret.x;
                    	turretRange.y = turret.y;
                    	turretIndicator.fillCircleShape(turretRange);
                	}
                });
                turret.on('pointerout', function(){
                    turretIndicator.clear();
                });
                tick.play();
            }
            button1.alpha = .5;
            turretIndicator.clear();
        }
        else if (turret_selector == 1 && scraps >= 10){
            scraps -= 10;
            var cannon = cannons.get();
            if (cannon){
                cannon.setActive(true);
                cannon.setVisible(true);
                cannon.place(i, j);
                cannon.on('pointerover', function(){
                	if (pause != true){
                    	cannonRange.x = cannon.x;
                    	cannonRange.y = cannon.y;
                    	cannonIndicator.fillCircleShape(cannonRange);
                	}
                });
                cannon.on('pointerout', function(){
                    cannonIndicator.clear();
                });
                tick.play();
            }
            button2.alpha = .5;
            cannonIndicator.clear();
        }
        else if (turret_selector == 2 && scraps >= 15){
            scraps -= 15;
            var lightning = lightnings.get();
            if (lightning){
                lightning.setActive(true);
                lightning.setVisible(true);
                lightning.place(i, j);
                lightning.on('pointerover', function(){
                	if (pause != true){
                    	teslaRange.x = lightning.x;
                    	teslaRange.y = lightning.y;
                    	teslaIndicator.fillCircleShape(teslaRange);
                    }
                });
                lightning.on('pointerout', function(){
                    teslaIndicator.clear();
                });
                tick.play();
            }
            button3.alpha = .5;
            teslaIndicator.clear();
        }
        turret_selector = -1;
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
                lightning.on('pointerover', function(){
                    teslaIndicator.clear();
                    teslaRange.x = lightning.x;
                    teslaRange.y = lightning.y;
                    graphicz.fillStyle(0xFFFFFF, 0.3);
                    teslaIndicator.fillCircleShape(teslaRange);
                });
                lightning.on('pointerout', function(){
                    teslaIndicator.clear();
                });
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
