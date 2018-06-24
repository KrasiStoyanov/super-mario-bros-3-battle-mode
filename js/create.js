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
     * @description Create animation controls (input detector, time limit).
     */
    this.cursors = this.input.keyboard.createCursorKeys();
    this.jumpTime = 0;

	/**
     * @description Add a second layer - the entrances and exits so as to enemies appear as if they are coming in and out of them.
     */
    this.entrancesAndExits = this.map.createStaticLayer('entrancesAndExits', tileSet, 0, 0);
    this.map.setCollision([5, 6, 11, 12, 17, 18, 23, 24], true, 'entrancesAndExits');

    /**
     * @description Add collision boundaries to the players.
     */
    this.physics.add.collider(this.player1, this.backgroundLayer);
    this.physics.add.collider(this.player1, this.entrancesAndExits);
    this.player1.setCollideWorldBounds(true);

    this.physics.add.collider(this.player2, this.backgroundLayer);
    this.physics.add.collider(this.player2, this.entrancesAndExits);
    this.player2.setCollideWorldBounds(true);
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
        key: 'still',
        frames: self.anims.generateFrameNumbers(playerString, { start: playerAnimations.still.frames.start, end: playerAnimations.still.frames.end }),
        frameRate: playerAnimations.still.frameRate,
        repeat: true
    });

    self.anims.create({
        key: 'right',
        frames: self.anims.generateFrameNumbers(playerString, { start: playerAnimations.right.frames.start, end: playerAnimations.right.frames.end }),
        frameRate: playerAnimations.right.frameRate,
        repeat: true
    });

    self.anims.create({
        key: 'left',
        frames: self.anims.generateFrameNumbers(playerString, { start: playerAnimations.left.frames.start, end: playerAnimations.left.frames.end }),
        frameRate: playerAnimations.left.frameRate,
        repeat: true
    });

    self.anims.create({
        key: 'jump',
        frames: self.anims.generateFrameNumbers(playerString, { frames: playerAnimations.jump.frames }),
        frameRate: playerAnimations.jump.frameRate
    });
}