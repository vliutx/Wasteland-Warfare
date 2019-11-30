/*global Phaser*/

    var map =      [[ 3, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 3],
                    [ 3, 0,-1, 0,-1,-1,-1, 0,-1,-1,-1, 0,-1, 3],
                    [ 3, 0,-1,-1,-1, 0,-1, 0,-1, 0,-1, 0,-1, 3],
                    [ 0, 0, 0, 0, 0, 0,-1, 0,-1, 0,-1, 0,-1, 3],
                    [ 0, 0,-1,-1,-1,-1,-1, 0,-1, 0,-1, 0,-1, 3],
                    [ 0, 0,-1, 0, 0, 0, 0, 0,-1, 0,-1, 0,-1, 3],
                    [ 0, 0,-1, 0,-1,-1,-1, 0,-1, 0,-1, 0,-1, 3],
                    [ 3,-1,-1, 0,-1, 0,-1, 0,-1, 0,-1, 0,-1, 3],
                    [ 3,-1,-1,-1,-1, 0,-1,-1,-1, 0,-1,-1,-1, 3],
                    [ 3,-1,-1, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3]];


    // Counters
    var scraps = 0;
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
    var enemiesRemaining;
    var waveNumber = 1;
    var maxAmmo = 6;
    var ammoCount = maxAmmo;
    var tickTimer = 3;
    var buildTimer = 15;

    // Booleans
    var pause = true;
    var buildPhase = false;
    var startGame = false;
    var restart = false;
    var gameOverPlayed = false;
    var victoryPlayed = false;
    var played = false;

    // Gun stuff pew pew
    var reloading = false;
    var reloadme = false;
    var spacedown = false;
    var weapon = 0; //selected weapon. 0 is pistol, 1 is machine gun, 2 is whatever we decide to add after.
    var machine = false; //did they purchase the machine gun?
    var spartan = false; //did they purchase the death machine? !!!!!!!!!
    //LASER CODE
    var chargeTime = 2; //Time to charge up laser
    var charge = 0;    //Tracks time it has been charged for
    var firetime = 0; // Tracks how long laser has been firing
    var firing = false;

    // Misc
    var path;
    var tick;
    var death;
    var menuText;
    var laserText;
    var laserPointer;

    // Sounds
    var cannonshot;
    var wind;
    var tick;
    var theme;
    var gameOverMusic;
    var tank;
    var explode;
    var electric;
    var reload;
    var lasershot;
    var lasercharge;
    var laserReload;
    var purchase;
    var purchaseLaser;
    var upgradeTower;

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
    var buildTower;

    //Guns
    var laser;
    var laserbeam;

    // Damage
    var BULLET_DAMAGE = 40;
    var SHELL_DAMAGE = 120;
    var LIGHTNING_DAMAGE = 5;
    var LASER_DAMAGE = 120;
    var LASER_WIDTH = 50;

    // graphics stuff
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
    var gbutton1;
    var gbutton2;
    var gbutton3;
    var buyLock1;
    var buyLock2;

    // time between fires
    var delts = 0;
    var frplayer = 150; // might need multiple variables for diff guns

    var nextEnemy = 0;
    var waveSize = 6;
    var spawned = 0;
    var spawnDelay = 400;

    // Enemy Spawns
    var enemiesRemaining
    var enemies = [6,0,0,0];
    var empty = [0,0,0,0];
    var waves = [
                    [6,0,0,0],
                    [0,12,0,0],
                    [5,7,0,0],
                    [5,5,3,0],
                    [5,10,5,0],
                    [10,20,10,0],
                    [0,115,0,0],
                    [25,0,25,0],
                    [25,20,30,0],
                    [30,50,30,1],
                    [50,50,50,0],
                ];
    var waveN = [];
    var test = true;
    var scrapMultiplier = 1;
    //[30,50,30,1],


export default class FullGame extends Phaser.Scene {
  constructor () {
    super('FullGame');
  }

  init (data) {
    // Initialization code goes here
  }

  preload () {
    ///////////////// Preload assets /////////////////
    ////// Spritesheets //////
    // UI
    this.load.spritesheet("bulletCount", "./assets/spriteSheets/BulletCount.png", {
        frameHeight: 80,
        frameWidth: 80
    });
    this.load.spritesheet("machineBulletCount", "./assets/spriteSheets/MachineBulletCount.png", {
        frameHeight: 160,
        frameWidth: 160
    });

    this.load.spritesheet("laserCharge", './assets/spriteSheets/LaserCharge.png', {
        frameHeight: 128,
        frameWidth: 128
    });
    this.load.spritesheet("waterHealth", "./assets/spriteSheets/WaterHealth.png", {
        frameHeight: 96,
        frameWidth: 96
    });
    // player
    this.load.spritesheet("player_animation", "./assets/spriteSheets/MainPlayer2.png", {
        frameHeight: 48,
        frameWidth: 48
    });

/*//LASER CODE ///////////////
    this.load.spritesheet("laser_animation", "./assets/spriteSheets/Laser.png", {
        frameHeight: 48,
        frameWidth: 48
    });
/// LASER CODE /////////*/

    // turrets
    this.load.spritesheet("lightning", "./assets/spriteSheets/Tesla Tower.png", {
        frameHeight: 96,
        frameWidth: 96
    });
    // enemies
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
    this.load.spritesheet("bossenemy", "./assets/spriteSheets/TankBoss.png", {
        frameHeight: 96,
        frameWidth: 96
    });

    ////// END Spritesheets //////
    ////// Images //////
    // UI
    this.load.image('desertBackground', './assets/tilesets/level2map.png');
    this.load.image('turreticon', 'assets/Turret1-Icon.png');
    this.load.image('cannonicon', 'assets/Cannon-Icon.png');
    this.load.image('lightningicon', 'assets/Tesla-Icon.png');
    this.load.image('pointer', './assets/ArrowPointer.png');
    // gun selector stuff will need to be added
    this.load.image('lock', 'assets/Lock.png');
    this.load.image('pistolGun', 'assets/PistolNoCost.png');
    this.load.image('machineGun', 'assets/MachineGunIconNoCost.png');
    this.load.image('machineGunPrice', 'assets/MachineGunIconWithCost.png');
    this.load.image('laser', 'assets/LaserIconNoCost.png');
    this.load.image('laserPrice', 'assets/LaserIconWithCost.png');
    this.load.image('checkmark', 'assets/checkmark.png');
    this.load.image('xmark', 'assets/xmark.png');
    // player
    this.load.image('playerBullet', 'assets/newBullet.png');
    this.load.image('laser', 'assets/laser.png');
    this.load.image('laserbeam', 'assets/Laser.png')
    // turrets
    this.load.image('turret', 'assets/Turret1.png');
    this.load.image('bullet', 'assets/Bullet.png');
    //
    this.load.image('cannon', 'assets/cannon.png');
    this.load.image('shell', 'assets/Cannonball.png');
    // enemies (none)
    ////// END Images //////
    ////// Audio //////
    // UI
    this.load.audio('wind', 'assets/sounds/Wind.mp3');
    this.load.audio('tick', 'assets/sounds/Tick.mp3');
    this.load.audio('theme', 'assets/sounds/WastelandWarfare.wav');
    this.load.audio('gameOverMusic', 'assets/sounds/DeathSong.wav');
    this.load.audio('victoryMusic', 'assets/sounds/VictorySong.wav');
    // player
    this.load.audio('reload', 'assets/sounds/reloading.mp3');
    this.load.audio('purchase', 'assets/sounds/purchase.mp3');
    this.load.audio('purchaseLaser', 'assets/sounds/purchaseLaser.mp3');
 ////// LASERRRRR CODEEEEE //////////
    this.load.audio('lasershot', 'assets/sounds/lasershot.wav');
    this.load.audio('lasercharge', 'assets/sounds/lasercharge.wav'); ////////ADD SOUND///////

    // turrets
    this.load.audio('gunshot', 'assets/sounds/gunshot.mp3');
    //
    this.load.audio('cannonshot', 'assets/sounds/cannonshot.mp3');
    //
    this.load.audio('electricity', 'assets/sounds/Electric.mp3');
    //
    this.load.audio('buildTower', 'assets/sounds/buildTower.mp3');
    //
    this.load.audio('upgradeTower', 'assets/sounds/upgradeTower.mp3');

    // enemies
    this.load.audio('death', 'assets/sounds/death.mp3');
    this.load.audio('tankSounds', 'assets/sounds/Tank.mp3');
    this.load.audio('explosion', 'assets/sounds/Explode.mp3');
    ////// END Audio //////
    ///////////////// END assets /////////////////

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
    gunfire = this.sound.add('gunshot', {volume: 0.075});
    cannonshot = this.sound.add('cannonshot', {volume: .20});
    death = this.sound.add('death', {volume: 0.1});
    explode = this.sound.add('explosion', {volume: 0.5});
    tank = this.sound.add('tankSounds', {loop: true});
    electric = this.sound.add('electricity',{volume: 0.1, loop: false});
    reload = this.sound.add('reload', {volume: .40});
    lasershot = this.sound.add('lasershot', {volume: .10});
    lasercharge = this.sound.add('lasercharge', {volume: .10});
    purchase = this.sound.add('purchase', {volume: .10});
    purchaseLaser = this.sound.add('purchaseLaser', {volume: .3});
    buildTower =  this.sound.add('buildTower', {volume: .30});
    upgradeTower =  this.sound.add('upgradeTower', {volume: .30});


    //ambient wind and ticking
    wind = this.sound.add('wind', {loop: true, volume: 0.2});
    tick = this.sound.add('tick', {volume: .4});
    theme = this.sound.add('theme', {loop: true, volume: 0.2});

    //Uncomment to mute
    //theme = this.sound.add('theme', {loop: true, volume: 0.0});

    //play Sounds
    theme.play();
    wind.play();

//Create enemies/towers/player groups

//Player

    player = this.physics.add.sprite(864, 32, 'player_animation');
    this.physics.world.setBounds(0, 0, 896, 640);
    player.setCollideWorldBounds(true);

    //player animations
    this.anims.create({
        key: "play_idle",
        frames: this.anims.generateFrameNumbers("player_animation", { start: 0, end: 0 }),
        frameRate: 1,
        repeat: -1
    });
    this.anims.create({
        key: "play_walk",
        frames: this.anims.generateFrameNumbers("player_animation", { start: 1, end: 4 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: "play_idle_machine",
        frames: this.anims.generateFrameNumbers("player_animation", { start: 5, end: 5 }),
        frameRate: 1,
        repeat: -1
    });
    this.anims.create({
        key: "play_walk_machine",
        frames: this.anims.generateFrameNumbers("player_animation", { start: 6, end: 9 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: "play_idle_laser",
        frames: this.anims.generateFrameNumbers("player_animation", { start: 10, end: 10 }),
        frameRate: 1,
        repeat: -1
    });
    this.anims.create({
        key: "play_walk_laser",
        frames: this.anims.generateFrameNumbers("player_animation", { start: 11, end: 14}),
        frameRate: 10,
        repeat: -1
    });

    //player can shoot
    var spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    spaceBar.on("down", function(){
        spacedown = true;
    });
    spaceBar.on("up", function(){
        spacedown = false;
    });

    //Reload key for the player
    this.reloadKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    laserbeam = this.add.image(player.x, player.y, 'laserbeam');
    laserbeam.setVisible(false);

// Weapons
// This first checks if the gun is bought. If it isn't it buys it and immediately switches to it
// If it is bought, it allows the user to switch back and forth
    //Machine gun
    var switchPisol = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
    switchPisol.on("down", function(){
        gbutton1.alpha = 1;
        gbutton2.alpha = 0.5;
        gbutton3.alpha = 0.5;
        weapon = 0; //we don't need to check for purchase because default
        maxAmmo = 6;
        ammoCount = 0;
        reloadTime = 0;
        reloading = false;
        played = false;
        reloadme = false;
        machineBulletCount.setVisible(false);
        laserCharge.setVisible(false);
        bulletCount.setVisible(true);
    });
    var switchMachineGun = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
    switchMachineGun.on("down", function(){
        if (!machine){
            if (scraps >= 15){
                purchase.play()
                machine = true;
                scraps -= 15;
                weapon = 1;
                maxAmmo = 12;
                ammoCount = maxAmmo;
                reloadTime = 0;
                reloading = false;
                played = false;
                reloadme = false;
                bulletCount.setVisible(false);
                machineBulletCount.setVisible(true);
                laserCharge.setVisible(false);
                buyLock1.setVisible(false);
                gbutton2.setVisible(false);
                gbutton1.alpha = 0.5;
                gbutton3.alpha = 0.5;
                gbutton2 = this.add.sprite(40, 110, 'machineGun', 0).setInteractive();
                gbutton2.on('pointerover', function(){gb2Text.setVisible(true)});
                gbutton2.on('pointerout', function(){gb2Text.setVisible(false)});
                gbutton2.on('pointerup', function(){
                    gbutton2.alpha = 1;
                    gbutton1.alpha = 0.5;
                    gbutton3.alpha = 0.5;
                    weapon = 1;
                    maxAmmo = 12;
                    ammoCount = 0;
                    reloadTime = 0;
                    reloading = false;
                    played = false;
                    reloadme = false;
                    bulletCount.setVisible(false);
                    machineBulletCount.setVisible(true);
                    laserCharge.setVisible(false);
                });
            }
        } else {
            gbutton2.alpha = 1;
            gbutton1.alpha = 0.5;
            gbutton3.alpha = 0.5;
            weapon = 1;
            maxAmmo = 12;
            ammoCount = 0;
            reloadTime = 0;
            reloading = false;
            played = false;
            reloadme = false;
            bulletCount.setVisible(false);
            machineBulletCount.setVisible(true);
            laserCharge.setVisible(false);
        }
    }, this);
//SPARTAN LASER CODE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    var swtichSpartanLaser = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
    swtichSpartanLaser.on("down", function(){
        if (!spartan){
            if (scraps >= 50){
                purchase.play();
                purchaseLaser.play()
                spartan = true;
                scraps -= 50;
                weapon = 2;
                buyLock2.setVisible(false);
                gbutton3.setVisible(false);
                gbutton1.alpha = 0.5;
                gbutton2.alpha = 0.5;
                gbutton3 = this.add.sprite(40, 180, 'laser', 0).setInteractive();
                gbutton3.on('pointerover', function(){gb3Text.setVisible(true)});
                gbutton3.on('pointerout', function(){gb3Text.setVisible(false)});
                gbutton3.on('pointerup', function(){
                    purchaseLaser.play();
                    gbutton3.alpha = 1;
                    gbutton1.alpha = 0.5;
                    gbutton2.alpha = 0.5;
                    weapon = 2;
                    laserCharge.setVisible(true);
                    // CHANGE REALOD SHIT FOR LASER //
                    reloadTime = 0;
                    reloading = false;
                    played = false;
                    reloadme = false;
                });
                //Display tutorial text
                laserText.setVisible(true)
                laserPointer.setVisible(true)
           }
        } else {
            purchaseLaser.play();
            gbutton3.alpha = 1;
            gbutton1.alpha = 0.5;
            gbutton2.alpha = 0.5;
            weapon = 2;
        	// CHANGE REALOD SHIT FOR LASER //
            reloadTime = 0;
            reloading = false;
            played = false;
            reloadme = false;
        }
    }, this);
    //


//info displays

    waterHealth = this.add.sprite(850, 595, 'waterHealth');
    waterHealth.setFrame(10);
    bulletCount = this.add.sprite(760, 605, 'bulletCount');
    machineBulletCount = this.add.sprite(760, 605, 'machineBulletCount');
    machineBulletCount.setScale(0.65);
    machineBulletCount.setVisible(false);
    laserCharge = this.add.sprite(780, 594, 'laserCharge');
    laserCharge.setScale(0.65);
    laserCharge.setVisible(false);

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
    waveSize = waves[waveNumber].reduce((a,b) => a + b, 0)
    this.spawned = 0;
    enemiesRemaining = waveSize;
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
        if (scraps >= 5){
            turret_selector = 0;
            button1.alpha = 1;
            button2.alpha = 0.5;
            button3.alpha = 0.5;
        }
    });
    button2 = this.add.sprite(40, 530, 'cannonicon', 0).setInteractive();
    button2.alpha = 0.5;
    button2.on('pointerup', function(){
        if (scraps >= 10){
            turret_selector = 1;
            button2.alpha = 1;
            button1.alpha = 0.5;
            button3.alpha = 0.5;
        }
    });
    button3 = this.add.sprite(40, 600, 'lightningicon', 0).setInteractive();
    button3.alpha = 0.5;
    button3.on('pointerup', function(){
        if (scraps >= 15){
            turret_selector = 2;
            button3.alpha = 1;
            button1.alpha = 0.5;
            button2.alpha = 0.5;
        }
    });

    //Gun selection
    //As of right now there is no click to purchase option it is just a visual indicator
    //Descriptions of guns
    var gb1Text = this.add.text(100, 575, "Pistol: \nModerate semi-automatic damage", {fontSize: 30, color: "#FFFFFF", fontStyle: "bold"});
    gb1Text.setVisible(false);
    var gb2Text = this.add.text(100, 575, "Machine Gun: \nModerate fully-automatic damage", {fontSize: 30, color: "#FFFFFF", fontStyle: "bold"});
    gb2Text.setVisible(false);
    var gb3Text = this.add.text(100, 575, "Laser: \nMassive damage, charge to fire", {fontSize: 30, color: "#FFFFFF", fontStyle: "bold"});
    gb3Text.setVisible(false);
    //icons
    gbutton1 = this.add.sprite(40, 40, 'pistolGun', 0).setInteractive();
    gbutton1.on('pointerover', function(){gb1Text.setVisible(true)});
    gbutton1.on('pointerout', function(){gb1Text.setVisible(false)});
    gbutton1.on('pointerup', function(){
        //Doesn't need a buy option
        gbutton1.alpha = 1;
        gbutton2.alpha = 0.5;
        gbutton3.alpha = 0.5;
        weapon = 0; //we don't need to check for purchase because default
        maxAmmo = 6;
        ammoCount = 0;
        reloadTime = 0;
        reloading = false;
        played = false;
        reloadme = false;
        machineBulletCount.setVisible(false);
        bulletCount.setVisible(true);
    });
    gbutton2 = this.add.sprite(40, 110, 'machineGunPrice', 0).setInteractive();
    buyLock1 = this.add.sprite(40, 110, 'lock', 0);
    buyLock1.alpha = 0.8;
    gbutton2.alpha = 0.5;
    gbutton2.on('pointerover', function(){gb2Text.setVisible(true)});
    gbutton2.on('pointerout', function(){gb2Text.setVisible(false)});
    gbutton2.on('pointerup', function(){
        //buy gun
        if (scraps >= 15){
            machine = true;
            scraps -= 15;
            weapon = 1;
            maxAmmo = 12;
            ammoCount = 0;
            reloadTime = 0;
            reloading = false;
            played = false;
            reloadme = false;
            bulletCount.setVisible(false);
            machineBulletCount.setVisible(true);
            laserCharge.setVisible(false);
            buyLock1.setVisible(false);
            gbutton2.setVisible(false);
            gbutton1.alpha = 0.5;
            gbutton3.alpha = 0.5;
            gbutton2 = this.add.sprite(40, 110, 'machineGun', 0).setInteractive();
            gbutton2.on('pointerover', function(){gb2Text.setVisible(true)});
            gbutton2.on('pointerout', function(){gb2Text.setVisible(false)});
            gbutton2.on('pointerup', function(){
                //gun is bought
                gbutton2.alpha = 1;
                gbutton1.alpha = 0.5;
                gbutton3.alpha = 0.5;
                weapon = 1;
                maxAmmo = 12;
                ammoCount = 0;
                reloadTime = 0;
                reloading = false;
                played = false;
                reloadme = false;
                bulletCount.setVisible(false);
                machineBulletCount.setVisible(true);
                laserCharge.setVisible(false);
            });
        }
    }, this);
    gbutton3 = this.add.sprite(40, 180, 'laserPrice', 0).setInteractive();
    buyLock2 = this.add.sprite(40, 180, 'lock', 0);
    buyLock2.alpha = 0.8;
    gbutton3.alpha = 0.5;
    gbutton3.on('pointerover', function(){gb3Text.setVisible(true)});
    gbutton3.on('pointerout', function(){gb3Text.setVisible(false)});
    gbutton3.on('pointerup', function(){
        //buy the gun
        if (scraps >= 50){
            purchase.play();
            purchaseLaser.play()
            spartan = true;
            scraps -= 50;
            weapon = 2;
            buyLock2.setVisible(false);
            gbutton3.setVisible(false);
            gbutton1.alpha = 0.5;
            gbutton2.alpha = 0.5;
            gbutton3 = this.add.sprite(40, 180, 'laser', 0).setInteractive();
            gbutton3.on('pointerover', function(){gb3Text.setVisible(true)});
            gbutton3.on('pointerout', function(){gb3Text.setVisible(false)});
            gbutton3.on('pointerup', function(){
                //gun is bought
                purchaseLaser.play();
                gbutton3.alpha = 1;
                gbutton1.alpha = 0.5;
                gbutton2.alpha = 0.5;
                weapon = 2;
                // CHANGE REALOD SHIT FOR LASER //
                reloadTime = 0;
                reloading = false;
                played = false;
                reloadme = false;
            })
        }
    }, this);

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
                    turretIndicator.fillStyle(0xFFFFFF, 0.3);
                    turretIndicator.fillCircleShape(turretRange);
                } else if (turret_selector == 1){
                    //cannon
                    cannonGhost.x = q * 64 + 32;
                    cannonGhost.y = w * 64 + 32;
                    cannonGhost.setVisible(true);
                    cannonIndicator.clear();
                    cannonRange.x = cannonGhost.x;
                    cannonRange.y = cannonGhost.y;
                    cannonIndicator.fillStyle(0xFFFFFF, 0.3);
                    cannonIndicator.fillCircleShape(cannonRange);
                } else if (turret_selector == 2){
                    //tesla
                    teslaGhost.x = q * 64 + 32;
                    teslaGhost.y = w * 64 + 32;
                    teslaGhost.setVisible(true);
                    teslaIndicator.clear();
                    teslaRange.x = teslaGhost.x;
                    teslaRange.y = teslaGhost.y;
                    teslaIndicator.fillStyle(0xFFFFFF, 0.3);
                    teslaIndicator.fillCircleShape(teslaRange);
                }
            } else if (map[w][q] == 1 || map[w][q] == 2) { //if there's a turret there
            	turretGhost.setVisible(false);
                cannonGhost.setVisible(false);
                teslaGhost.setVisible(false);
            } else if (map[w][q] == -1){
                if (turret_selector == 0){
                    //turret
                    turretGhost.x = q * 64 + 32;
                    turretGhost.y = w * 64 + 32;
                    turretGhost.setVisible(true);
                    turretIndicator.clear();
                    turretRange.x = turretGhost.x;
                    turretRange.y = turretGhost.y;
                    turretIndicator.fillStyle(0xFF0000, 0.3);
                    turretIndicator.fillCircleShape(turretRange);
                } else if (turret_selector == 1){
                    //cannon
                    cannonGhost.x = q * 64 + 32;
                    cannonGhost.y = w * 64 + 32;
                    cannonGhost.setVisible(true);
                    cannonIndicator.clear();
                    cannonRange.x = cannonGhost.x;
                    cannonRange.y = cannonGhost.y;
                    cannonIndicator.fillStyle(0xFF0000, 0.3);
                    cannonIndicator.fillCircleShape(cannonRange);
                } else if (turret_selector == 2){
                    //tesla
                    teslaGhost.x = q * 64 + 32;
                    teslaGhost.y = w * 64 + 32;
                    teslaGhost.setVisible(true);
                    teslaIndicator.clear();
                    teslaRange.x = teslaGhost.x;
                    teslaRange.y = teslaGhost.y;
                    teslaIndicator.fillStyle(0xFF0000, 0.3);
                    teslaIndicator.fillCircleShape(teslaRange);
                }
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
    var b1Text = this.add.text(100, 575, "Turret:\nMedium damage, high fire-rate", {fontSize: 30, color: "#FFFFFF", fontStyle: "bold"});
    b1Text.setVisible(false);
    var b2Text = this.add.text(100, 575, "Cannon:\nHigh damage, low fire-rate", {fontSize: 30, color: "#FFFFFF", fontStyle: "bold"});
    b2Text.setVisible(false);
    var b3Text = this.add.text(100, 575, "Tesla Coil:\nLow damage continuous AOE", {fontSize: 30, color: "#FFFFFF", fontStyle: "bold"});
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
    turretRange = new Phaser.Geom.Circle(0, 0, 196);
    cannonIndicator = this.add.graphics();
    cannonRange = new Phaser.Geom.Circle(0, 0, 196);
    teslaIndicator = this.add.graphics();
    teslaRange = new Phaser.Geom.Circle(0, 0, 96);

    //turret upgrade feedback
    confirmText = this.add.text(0, 0, "Upgrade?");
    confirmText.setVisible(false);
    confirmText.setDepth(2);
    confirmBox = this.add.graphics();
    confirmBox.setDepth(1);
    blackBox = new Phaser.Geom.Rectangle(0, 0, 81, 20);
    buttonYes = this.add.image(0, 0, 'checkmark');
    buttonYes.setInteractive();
    buttonYes.setScale(.05);
    buttonYes.setDepth(2);
    buttonNo = this.add.image(0, 0, 'xmark');
    buttonNo.setInteractive();
    buttonNo.setScale(.05);
    buttonNo.setDepth(2);
    buttonYes.setActive(false);
    buttonYes.setVisible(false);
    buttonNo.setActive(false);
    buttonNo.setVisible(false);

// Bullets
    bullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });
    shells = this.physics.add.group({classType: Shell, runChildUpdate: true});
    playerBullets = this.physics.add.group({ classType: PlayerBullet, runChildUpdate: true });

//Physics overlaps

    //Bullets overlap for turrets/player
    this.physics.add.overlap(reg_enemies, bullets, damageEnemyBullet.bind(this));
    this.physics.add.overlap(fast_enemies, bullets, damageEnemyBullet.bind(this));
    this.physics.add.overlap(tough_enemies, bullets, damageEnemyBullet.bind(this));
    this.physics.add.overlap(boss_enemies, bullets, damageEnemyBullet.bind(this));
    this.physics.add.overlap(reg_enemies, playerBullets, damageEnemyBullet.bind(this));
    this.physics.add.overlap(fast_enemies, playerBullets, damageEnemyBullet.bind(this));
    this.physics.add.overlap(tough_enemies, playerBullets, damageEnemyBullet.bind(this));
    this.physics.add.overlap(boss_enemies, playerBullets, damageEnemyBullet.bind(this));

    //Shells overlap for cannon
    this.physics.add.overlap(reg_enemies, shells, damageEnemyShell.bind(this));
    this.physics.add.overlap(fast_enemies, shells, damageEnemyShell.bind(this));
    this.physics.add.overlap(tough_enemies, shells, damageEnemyShell.bind(this));
    this.physics.add.overlap(boss_enemies, shells, damageEnemyShell.bind(this));


//Create game texts

    //Add scrap text
    scrapText = this.add.text(215, 18, this.scraptext, {fontSize: 25, color: "#FFFFFF", fontStyle: "bold"});
    scrapText.setVisible(false);
    //Create wave text
    waveText = this.add.text(415, 18, "Wave: " + waveNumber + '/' + totalWaves, {fontSize: 25, color: '#ffffff', fontStyle: 'bold', depth: 10});
    waveText.setVisible(false);
    //Create timer variable and display text
    this.buildTime = buildTimer;
    timeText = this.add.text(600, 18, timeRemaining, {fontSize: 25, color: '#FFFFFF', fontStyle: 'bold'});
    //Add enemies remaining text
    enemiesRemainingText = this.add.text(590, 18, "Enemies: " + enemiesRemaining, {fontSize: 25, color: '#FFFFFF', fontStyle: 'bold'});
    enemiesRemainingText.setVisible(false);
    //Create health text
    //Create Victory text
    victoryText = this.add.text(155, 155, "!VICTORY!", {fontSize: 120, color: '#FFFFFF', fontStyle: 'bold'});
    victoryText.setVisible(false);
    victoryText.setDepth(1);
    continueText = this.add.text(125, 275, "(Press \"ENTER\" to continue the game)", {fontSize: 33, color: '#FFFFFF', fontStyle: 'bold'});
    continueText.setVisible(false);
    continueText.setDepth(1);
    menuText = this.add.text(145, 325, "(Press \"ESCAPE\" to return to menu)", {fontSize: 33, color: '#FFFFFF', fontStyle: 'bold'});
    menuText.setVisible(false);
    menuText.setDepth(1);
    //Defeat text
    defeatText = this.add.text(200, 155, "¡DEFEAT!", {fontSize: 120, color: '#FF0000', fontStyle: 'bold'});
    defeatText.setVisible(false);
    defeatText.setDepth(1);
    restartText = this.add.text(135, 265, "(Press \"ESCAPE\" to restart the game)", {fontSize: 33, color: '#FF0000', fontStyle: 'bold'});
    restartText.setVisible(false);
    restartText.setDepth(1);
    //Laser tutorial text
    laserText = this.add.text(500, 580, "Hold space\nto charge", {fontSize: 28, color: '#FF0000', fontStyle: 'bold', depth: 10});
    laserPointer = this.add.image(715, 600, 'pointer');
    laserText.setVisible(false);
    laserPointer.setVisible(false);


//Start the game
    pause = false
    //begin build phase
    buildPhase = true;
    //Enable wave text
    waveText.setVisible(true);
    //Enable scrap text
    scrapText.setVisible(true);
    //Create restart key
    this.restart = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    graphicz.fillStyle(0xFFFFFF, 0.3);
    // Create key to start wave early
    this.sendWave = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

  } //End create

  update (time, delta) {
// Game Phases
    //Win Condition
    if (wavesRemaining == 0){
        //Psuedo pause the game
        pause = true

        //Display victory text
        victoryText.setVisible(true);
        timeText.setVisible(false);
        theme.stop();
        victorySong = this.sound.add('victoryMusic', {loop: false, volume: 0.5});
        if (victoryPlayed == false) {
          victorySong.play();
          victoryPlayed = true
        };

        //Prompt user to
        continueText.setVisible(true);
        //Prompt user to return to menu
        menuText.setVisible(true);
        //Change waveText
        waveText.setText("Wave: " + 10 + '/' + 10);
        //User chooses continue
        if (Phaser.Input.Keyboard.JustDown(this.sendWave)) {
            continueText.setVisible(false);
            victoryText.setVisible(false);
            menuText.setVisible(false);
            pause = false
            wavesRemaining=-1;
            timeText.setVisible(true);
            waveText.setText("Wave: " + waveNumber);
            waveText.setPosition(430, 18);
            //Adjust enemy values
            //Health values
            REG_HEALTH += 80
            FAST_HEALTH += 80
            TOUGH_HEALTH += 120
            BOSS_HEALTH += 1000
            //Speed Values
            REG_SPEED *= 1.25
            FAST_SPEED *= 1.25
            TOUGH_SPEED *= 1.25
            BOSS_SPEED *= 1.25
        }
        //User chooses return to menu
        if (Phaser.Input.Keyboard.JustDown(this.restart)) {
            location.reload();
        }
    }

    //Loss condition
    if (lifecount <= 0){
        //pause game
        pause = true;

        //Display defeat text
        defeatText.setVisible(true);
        //enemiesRemainingText.setVisible(false);
        theme.stop();
        gameOverMusic = this.sound.add('gameOverMusic', {loop: false, volume: 0.5});
        if (gameOverPlayed == false) {
          gameOverMusic.play();
          gameOverPlayed = true
        }

        //Prompt player to restart the game
        restartText.setVisible(true);

        if (Phaser.Input.Keyboard.JustDown(this.restart)) {
            location.reload();
        }
    }

    //Build phase
    if (buildPhase == true && pause != true){

        //Add game timer
        gameTime += delta/1000;
        enemiesRemainingText.setVisible(false);
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

        // Add button to begin next wave
        if (Phaser.Input.Keyboard.JustDown(this.sendWave)) {
            timeRemaining = 0;
        }

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
            enemiesRemainingText.setVisible(true)
            //reset tickTimer
            tickTimer = 3;
            //reset enemies remaining to next wave
            enemiesRemaining = enemies.reduce((a,b) => a + b, 0);
            this.spawned = 0;
        }
    } //End build phase


    //Combat phase
    if (buildPhase == false && pause != true && lifecount > 0){
        //Set timer
        gameTime += delta;
        if (waveNumber<=10){
            enemies = waves[waveNumber-1];
            
        }
        

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
            if (waveNumber<=11){
                waveText.setText("Wave: " + waveNumber + '/' + totalWaves);
            } else {
                waveText.setText("Wave: " + waveNumber);
            }
            wavesRemaining -= 1;
            //Increment wave size
            if (waveNumber<=10){
                enemies = waves[waveNumber-1];
            } else { //Enedless Survival
                //Reg enemies
                enemies[0] += 30
                //Fast enemies
                enemies[1] += 30
                //Tough enemies
                enemies[2] += 20
                //Boss enemies + adjust health/speed values every 3 waves
                if ((waveNumber-10)%3==0){
                    //Health values
                    REG_HEALTH += 80
                    FAST_HEALTH += 80
                    TOUGH_HEALTH += 120
                    BOSS_HEALTH += 1000
                    //Speed Values
                    REG_SPEED *= 1.25
                    FAST_SPEED *= 1.25
                    TOUGH_SPEED *= 1.25
                    BOSS_SPEED *= 1.25
                    //Increment boss counter
                    enemies[3] += 2
                }
            }
            //Increment spawn delay
            if (waveNumber == 4){
                scrapMultiplier = .75;
            }
            if (waveNumber == 6){
                scrapMultiplier = .75
            }
            if (waveNumber == 7){
                this.spawnDelay = 65;
                scrapMultiplier = .5
            }
            if (waveNumber == 8){
                this.spawnDelay = 90;
                scrapMultiplier = .25
                REG_HEALTH += 40
                FAST_HEALTH += 40
                TOUGH_HEALTH += 40
            }
            if (waveNumber == 11){
                scrapMultiplier = .25;
                this.spawnDelay = 85;
            }
            if(this.spawnDelay>100){
                this.spawnDelay -= 100;
            }
            scraps += 2*(waveNumber - 1);
            console.log(this.spawnDelay)
            console.log(scrapMultiplier);
        }
        laserText.setVisible(false)
        laserPointer.setVisible(false)
    } //End combat phase


//Reload Mechanic (Copy over reload key from constant updates)
    if (ammoCount == 0 || reloadme == true && pause == false) {
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


//Switch between weapons (this is the shooting portion)
    if (spacedown == true){
        if (weapon == 0){
        // pistol
            if (pause != true && reloading == false){
                // might need to add a delay to the semi auto-ness because right now they can theoretically shoot faster than machine gun if they mash
                addPlayerBullet(player.x-20,player.y,Math.PI);
                ammoCount -= 1;
                spacedown = false; //need to set this so that they need to let go of spacebar before they can shoot again
            }
        } else if (weapon == 1){
        // Machine Gun
            if (time - delts > frplayer && pause != true && reloading == false){
                delts = time; //if we're building the 3rd weapon the same way need to consider changing this variable or having multiple similar
                addPlayerBullet(player.x-25,player.y-10,Math.PI);
                ammoCount -= 1;
            }
        } else if (weapon == 2){ //Spartan Laser
        /// LASER CODE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            if (charge==0){
                lasercharge.play();
            }
            // Charge laser while holding space
            charge += delta/1000
            // Play firing animation HERE
            if (charge > 0.29 && charge < 0.62) {
              laserCharge.setFrame(1)
            } else if (charge >= 0.62 && charge < 0.95) {
              laserCharge.setFrame(2)
            } else if (charge >= 0.95 && charge < 1.28) {
              laserCharge.setFrame(3)
            } else if (charge >= 1.28 && charge < 1.61) {
              laserCharge.setFrame(4)
            } else if (charge >= 1.61 && charge < 1.75) {
              laserCharge.setFrame(5)
            //Need this last line to briefly show charge is ready
            } else if (charge >= 1.75 && charge < 2) {
              laserCharge.setFrame(6)
            };

            // Wait until laser is fully charged, the fire
            if (charge >= chargeTime){
                // Get all enemies at same y position as player
                var laserEnemies = getEnemiesHeight(player.y, LASER_WIDTH);
                // Damage enemies
                if (laserEnemies.length > 0){
                    for(var i=0; i < laserEnemies.length; i++){
                        // Enemys turn red code add later
                        laserEnemies[i].receiveDamage(LASER_DAMAGE);
                    }
                    //Play firing sound
                    lasershot.play();
                    laserbeam.setVisible(true);
                    firing = true;
                    firetime = 0;
                } else {
                    lasershot.play();
                    laserbeam.setVisible(true);
                    firing = true;
                    firetime = 0;
                }
                // Shot fired, reset and play reload
                spacedown = false;
                charge = 0;
            }
        }
    }
    if (!spacedown){
        // Player releases space
        charge = 0;
        laserCharge.setFrame(0);
        // End charging sound
        lasercharge.stop();
    }



// Constant updates
    //Update enemies remaining test
    enemiesRemainingText.setText("Enemies: " + enemiesRemaining)
    if (enemiesRemaining >= 100){
        enemiesRemainingText.setText("Enemies:" + enemiesRemaining)
    }

    //Laser firing
    if(firing){
        firetime += delta/1000;
        if(firetime<.25){
            laserbeam.setPosition(player.x - 850, player.y - 10);
        } else {
            laserbeam.setVisible(false);
            firing = false;
        }
    }

    // Check for reload
    if (Phaser.Input.Keyboard.JustDown(this.reloadKey)) {
        if (ammoCount != maxAmmo){
            reloadme = true;
        }
    }
    //Adjust scrap text
    scrapText.setText("Scraps: " + Math.floor(scraps));

    //Health and bullet updates
    waterHealth.setFrame(lifecount);
    if (weapon == 0){
        bulletCount.setFrame(6 - ammoCount);
    } else if (weapon == 1){
        machineBulletCount.setFrame(12 - ammoCount);
    } else {
      machineBulletCount.setVisible(false);
      bulletCount.setVisible(false);
      laserCharge.setVisible(true);
    }

    //Player movement
    if (pause != true) {
        var cursors = this.input.keyboard.createCursorKeys();
        var speed = 6
        var wKey = this.input.keyboard.addKey('W');
        var sKey = this.input.keyboard.addKey('S');
        if (cursors.up.isDown || wKey.isDown) {
            player.y -= speed;
            if (weapon == 0){
                player.anims.play("play_walk", true);
            } else if (weapon == 1){
                player.anims.play("play_walk_machine", true);
            } else if (weapon == 2){
                player.anims.play('play_walk_laser', true);
            }
        } else if (cursors.down.isDown || sKey.isDown) {
            player.y += speed;
            if (weapon == 0){
                player.anims.play("play_walk", true);
            } else if (weapon == 1){
                player.anims.play("play_walk_machine", true);
            } else if (weapon == 2){
                player.anims.play('play_walk_laser', true);
            }
        } else {
            if (weapon == 0){
                player.anims.play("play_idle", true);
            } else if (weapon == 1){
                player.anims.play("play_idle_machine", true);
            } else if (weapon == 2){
                player.anims.play('play_idle_laser', true);
            }
        }
      }

  } //End update()

}//End class export

//ENEMIES
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
                scraps += 1*scrapMultiplier;
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
            scraps += 2*scrapMultiplier;
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
            scraps += 10*scrapMultiplier;
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
                enemiesRemaining -= 1;
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
                scraps += .75*scrapMultiplier;
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
//END ENEMIES
//TURRETS
var Turret = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:

    function Turret (scene)
    {
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'turret');
        this.setInteractive();
        this.on('pointerdown', this.buttonCheck);
        this.nextTic = 0;
        this.fireRate = 500;
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
        if (pause == false){
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
                confirmText.x = this.x-37;
                confirmText.y = this.y-44;
                confirmBox.x = this.x-40;
                confirmBox.y = this.y-45;
                confirmBox.fillStyle(0x000000);
                confirmBox.fillRectShape(blackBox);
                buttonYes.setVisible(true);
                buttonNo.setVisible(true);
                confirmText.setVisible(true);
                buttonYes.on('pointerup', this.upgrade, this);
                buttonNo.on('pointerup', function(){
                    buttonYes.setActive(false);
                    buttonYes.setVisible(false);
                    buttonNo.setActive(false);
                    buttonNo.setVisible(false);
                    confirmText.setVisible(false);
                    confirmBox.clear();
                    buttonYes.off('pointerup');
                });
            }
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
        confirmText.setVisible(false);
        confirmBox.clear();
        if (scraps >= 10 && map[i][j] == 1){
            scraps -= 10;
            map[i][j] = 2;
            this.fireRate /= 2;
            this.setTint(0x0000ff);
            upgradeTower.play();
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
        this.fireRate = 800;
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
        if (pause == false){
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
                confirmText.x = this.x-37;
                confirmText.y = this.y-44;
                confirmBox.x = this.x-40;
                confirmBox.y = this.y-45;
                confirmBox.fillStyle(0x000000);
                confirmBox.fillRectShape(blackBox);
                buttonYes.setVisible(true);
                buttonNo.setVisible(true);
                confirmText.setVisible(true);
                buttonYes.on('pointerup', this.upgrade, this);
                buttonNo.on('pointerup', function(){
                    buttonYes.setActive(false);
                    buttonYes.setVisible(false);
                    buttonNo.setActive(false);
                    buttonNo.setVisible(false);
                    confirmText.setVisible(false);
                    confirmBox.clear();
                    buttonYes.off('pointerup');
                });
            }
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
        confirmText.setVisible(false);
        confirmBox.clear();
        if (scraps >= 20 && map[i][j] == 1){
            scraps -= 20;
            map[i][j] = 2;
            this.fireRate /= 2;
            this.setTint(0xff0000);
            upgradeTower.play();
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
        if (pause == false){
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
                confirmText.x = this.x-37;
                confirmText.y = this.y-44;
                confirmBox.x = this.x-40;
                confirmBox.y = this.y-45;
                confirmBox.fillStyle(0x000000);
                confirmBox.fillRectShape(blackBox);
                buttonYes.setVisible(true);
                buttonNo.setVisible(true);
                confirmText.setVisible(true);
                buttonYes.on('pointerup', this.upgrade, this);
                buttonNo.on('pointerup', function(){
                    buttonYes.setActive(false);
                    buttonYes.setVisible(false);
                    buttonNo.setActive(false);
                    buttonNo.setVisible(false);
                    confirmText.setVisible(false);
                    confirmBox.clear();
                    buttonYes.off('pointerup');
                });
            }
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
        confirmText.setVisible(false);
        confirmBox.clear();
        if (scraps >= 30 && map[i][j] == 1){
            scraps -= 30;
            map[i][j] = 2;
            this.fireRate /= 1.5;
            this.setTint(0x0000ff);
            upgradeTower.play();
        }
    }
});
//END TURRETS

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

var PlayerBullet = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:

    function Bullet (scene)
    {
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'playerBullet');

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

///////  LASER CODE!!!! //////
function getEnemiesHeight(y, width) {
    var regularUnits = reg_enemies.getChildren();
    var fastUnits = fast_enemies.getChildren();
    var toughUnits = tough_enemies.getChildren();
    var bossUnits = boss_enemies.getChildren();
    var enemies = [];
    //  Create lower bound for laser hitbox
    var lower = y - width;
    var upper = y + width;
    for(var i = 0; i < regularUnits.length; i++) {
        // Check if enemy y within
        if(regularUnits[i].active && lower < regularUnits[i].y && upper > regularUnits[i].y){
            enemies.push(regularUnits[i]);
        }
    };
    for(var i = 0; i < fastUnits.length; i++) {
        if(fastUnits[i].active && lower < fastUnits[i].y && upper > fastUnits[i].y){
            enemies.push(fastUnits[i]);
        }
    };
    for(var i = 0; i < toughUnits.length; i++) {
        if(toughUnits[i].active && lower < toughUnits[i].y && upper > toughUnits[i].y){
            enemies.push(toughUnits[i]);
        }
    };
    for(var i = 0; i < bossUnits.length; i++) {
        if(bossUnits[i].active && lower < bossUnits[i].y && upper > bossUnits[i].y){
            enemies.push(bossUnits[i]);
        }
    };
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
            turret_selector = -1;
            buildTower.play();
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
            turret_selector = -1;
            buildTower.play();
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
            turret_selector = -1;
            buildTower.play();
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

function addPlayerBullet(x, y, angle) {
    var playerbullet = playerBullets.get();
    if (playerbullet)
    {
        playerbullet.fire(x, y, angle);
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
