/**
 * @function
 * @name create
 * @description Create the game objects.
 */
 function create () {
    /**
     * @description Add music to the game and some initial game environment settings.
     */
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
     * @description Spawn enemies.
     */
    this.spawnSkeletons = (game) => {
        spawnSkeletons(game);
    };

    this.spawnSkeletons(this);


    this.spawnGhosts = (game) => {
        spawnGhosts(game);
    };

    this.spawnGhosts(this);

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
        up: this.cursors.up,
        right: this.cursors.right,
        left: this.cursors.left,
    };

    this.player2.controls = {
        up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
        right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
        left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
    };
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
     * @description Create left ghost.
     */
    let ghost1RandomX = Math.floor(Math.random() * self.backgroundLayer.width);
    let ghost1RandomY = Math.floor(Math.random() * self.backgroundLayer.height);
    self.ghost1 = self.physics.add.image(ghost1RandomX, ghost1RandomY, 'ghost').setGravity(0);

    // self.ghost1.setVelocityX(enemyVelocity.ghost.x);
    // self.ghost1.setVelocityY(enemyVelocity.ghost.y);

    self.ghost1.setOrigin(0.5, 0.5);

    self.ghost1.setCollideWorldBounds(true);
    self.ghost1.setGravityY(0);
    console.log(self.ghost1);

    /**
     * @description Create right ghost.
     */
    let ghost2RandomX = Math.floor(Math.random() * self.backgroundLayer.width);
    let ghost2RandomY = Math.floor(Math.random() * self.backgroundLayer.height);
    self.ghost2 = self.physics.add.image(ghost2RandomX, ghost2RandomY, 'ghost').setGravity(0);

    // self.ghost2.setVelocityX(enemyVelocity.ghost.x);
    // self.ghost2.setVelocityY(enemyVelocity.ghost.y);

    self.ghost2.setOrigin(0.5, 0.5);

    self.ghost2.setCollideWorldBounds(true);
    self.ghost2.setGravityY(0);
    console.log(self, self.ghost2);
}