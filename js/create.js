/**
 * @function
 * @name create
 * @description Create the game objects.
 */
 function create () {
    /**
     * @description Make a game over counter so as to prevent multiple game over function calls.
     */
    this.gameOverCounter = 0;

    /**
     * @description Add music to the game and some initial game environment settings.
     */
    this.jumpSound = this.sound.add('jump');
    this.gameOverSound = this.sound.add('gameOver');
    this.music = this.sound.add('music');
    this.music.play();

    /**
     * @description Create the game map.
     */
    this.map = this.add.tilemap('map');
    let tileSet = this.map.addTilesetImage('tileSet', 'tileSet');

    this.backgroundLayer = this.map.createStaticLayer('backgroundLayer', tileSet, 0, 0);
    this.map.setCollision([1, 2, 3, 4, 6, 7, 8, 9, 10, 13, 14, 15, 16, 19, 20, 21, 22], true, 'backgroundLayer');

    /**
     * @description Initialize the players and give them animations.
     */
    this.player1 = this.physics.add.sprite(firstPlayer.initialPosition.x, firstPlayer.initialPosition.y, 'player1');
    this.player1.setOrigin(0.5, 0.5);

    this.player2 = this.physics.add.sprite(secondPlayer.initialPosition.x, secondPlayer.initialPosition.y, 'player2');
    this.player2.setOrigin(0.5, 0.5);

    addPlayerAnimations(this, 'player1');
    addPlayerAnimations(this, 'player2');

    /**
     * @description Create still animations.
     */
    this.anims.create({
        key: 'player1_still',
        frames: self.anims.generateFrameNumbers('player1', { start: firstPlayer.animations.still.frames.start, end: firstPlayer.animations.still.frames.end }),
        frameRate: firstPlayer.animations.still.frameRate,
        repeat: true
    });

    this.anims.create({
        key: 'player2_still',
        frames: self.anims.generateFrameNumbers('player2', { start: secondPlayer.animations.still.frames.start, end: secondPlayer.animations.still.frames.end }),
        frameRate: secondPlayer.animations.still.frameRate,
        repeat: true
    });

    /**
     * @description Spawn skeletons.
     */
    this.spawnSkeletons = (game) => {
        spawnSkeletons(game);
    };

    this.spawnSkeletons(this);

    /**
     * @description Add a second layer - the entrances and exits so as to enemies appear as if they are coming in and out of them.
     */
    this.entrancesAndExits = this.map.createStaticLayer('entrancesAndExits', tileSet, 0, 0);
    this.map.setCollision([5, 6, 11, 12, 17, 18, 23, 24], true, 'entrancesAndExits');

    /**
     * @description Add collision boundaries to the players.
     */
    this.player1.setCollideWorldBounds(true);
    this.player2.setCollideWorldBounds(true);

    this.physics.add.collider(this.player1, this.player2);
    this.physics.add.collider(this.player2, this.player1);

    /**
     * @description Create collider boundaries.
     */
    this.cursors = this.input.keyboard.createCursorKeys();
    this.player1.jumpTime = 0;
    this.player2.jumpTime = 0;

    /**
     * @description Create animation controls.
     */
    this.player1.controls = {
        up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
        right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
        left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
    };

    this.player2.controls = {
        up: this.cursors.up,
        right: this.cursors.right,
        left: this.cursors.left,
    };

    /**
     * @description Spawn ghosts (after a while).
     */
    this.time.addEvent({
        delay: 5000,
        callback: () => {
            this.spawnGhosts = (game) => {
                spawnGhosts(game);
            };

            this.spawnGhosts(this);
        },
        callbackScope: this
    });

    /**
     * @description Spawn bats (after a while).
     */
    this.time.addEvent({
        delay: 10000,
        callback: () => {
            this.spawnBats = (game) => {
                spawnBats(game);
            };

            this.spawnBats(this);
        },
        callbackScope: this
    });
}

/**
 * @function
 * @name addPlayerAnimations
 * @param { Object } game - The "this" instance.
 * @param { String } playerString - The player string to which the corresponding sprite is attached.
 * @description Attach animation controlls for the selected player.
 */
function addPlayerAnimations (game, playerString) {
    self = game;
    self.anims.create({
        key: `${playerString}_right`,
        frames: self.anims.generateFrameNumbers(playerString, { start: playerAnimations.right.frames.start, end: playerAnimations.right.frames.end }),
        frameRate: playerAnimations.right.frameRate,
        repeat: true
    });

    self.anims.create({
        key: `${playerString}_left`,
        frames: self.anims.generateFrameNumbers(playerString, { start: playerAnimations.left.frames.start, end: playerAnimations.left.frames.end }),
        frameRate: playerAnimations.left.frameRate,
        repeat: true
    });

    self.anims.create({
        key: `${playerString}_jump`,
        frames: self.anims.generateFrameNumbers(playerString, { frames: playerAnimations.jump.frames }),
        frameRate: playerAnimations.jump.frameRate
    });

    self.anims.create({
        key: `${playerString}_lose`,
        frames: self.anims.generateFrameNumbers(playerString, { frames: playerAnimations.lose.frames }),
        frameRate: playerAnimations.lose.frameRate
    });
}

/**
 * @function
 * @name spawnSkeleton
 * @param { Object } game - The "this" instance.
 * @description Spawn the skeleton enemies.
 */
function spawnSkeletons (game) {
    self = game;

    /**
     * @description Create left skeleton.
     */
    self.skeletonLeft = self.physics.add.sprite(enemies.skeleton.left.initialPosition.x, enemies.skeleton.left.initialPosition.y, 'skeleton');
    self.skeletonLeft.setVelocityX(enemyVelocity.skeleton.x);

    self.skeletonLeft.setOrigin(0.5, 0.5);

    self.skeletonLeft.setCollideWorldBounds(true);
    self.physics.add.collider(self.skeletonLeft, self.backgroundLayer);

    /**
     * @description Create right skeleton.
     */
    self.skeletonRight = self.physics.add.sprite(enemies.skeleton.right.initialPosition.x, enemies.skeleton.right.initialPosition.y, 'skeleton', 2);
    self.skeletonRight.setVelocityX(-enemyVelocity.skeleton.x);

    self.skeletonRight.setOrigin(0.5, 0.5);

    self.skeletonRight.setCollideWorldBounds(true);
    self.physics.add.collider(self.skeletonRight, self.backgroundLayer);
}

/**
 * @function
 * @name spawnGhosts
 * @param { Object } game - The "this" instance.
 * @description Spawn the ghost enemies.
 */
function spawnGhosts (game) {
    self = game;

    /**
     * @description Create first ghost.
     */
    let ghost1RandomX = Math.floor(Math.random() * self.backgroundLayer.width);
    let ghost1RandomY = Math.floor(Math.random() * self.backgroundLayer.height);
    self.ghost1 = self.physics.add.image(ghost1RandomX, ghost1RandomY, 'ghost');

    self.ghost1.setOrigin(0.5, 0.5);
    self.ghost1.setCollideWorldBounds(true);

    /**
     * @description Create second ghost.
     */
    let ghost2RandomX = Math.floor(Math.random() * self.backgroundLayer.width);
    let ghost2RandomY = Math.floor(Math.random() * self.backgroundLayer.height);
    self.ghost2 = self.physics.add.image(ghost2RandomX, ghost2RandomY, 'ghost');

    self.ghost2.setOrigin(0.5, 0.5);
    self.ghost2.setCollideWorldBounds(true);
}

/**
 * @function
 * @name spawnBats
 * @param { Object } game - The "this" instance.
 * @description Spawn the bat enemies.
 */
function spawnBats (game) {
    self = game;

    /**
     * @description Create first bat.
     */
    let bat1RandomX = Math.floor(Math.random() * self.backgroundLayer.width);
    let bat1RandomY = Math.floor(Math.random() * self.backgroundLayer.height);
    self.bat1 = self.physics.add.image(bat1RandomX, bat1RandomY, 'bat');

    self.bat1.setOrigin(0.5, 0.5);
    self.bat1.setCollideWorldBounds(true);

    /**
     * @description Create second bat.
     */
    let bat2RandomX = Math.floor(Math.random() * self.backgroundLayer.width);
    let bat2RandomY = Math.floor(Math.random() * self.backgroundLayer.height);
    self.bat2 = self.physics.add.image(bat2RandomX, bat2RandomY, 'bat');

    self.bat2.setOrigin(0.5, 0.5);
    self.bat2.setCollideWorldBounds(true);
}