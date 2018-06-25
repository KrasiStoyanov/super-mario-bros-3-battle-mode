/**
 * @function
 * @name preload
 * @description Preload the needed assets.
 */
function preload () {
    /**
     * @description Load all sprites and tilemaps.
     */
    this.load.tilemapTiledJSON('map', 'assets/sprites/map.json');
    this.load.image('tileSet', 'assets/sprites/tileSet.png');
    this.load.spritesheet('player1', 'assets/sprites/player-1.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('player2', 'assets/sprites/player-2.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('skeleton', 'assets/sprites/skeleton.png', { frameWidth: 18, frameHeight: 32 });
    this.load.image('ghost', 'assets/sprites/ghost.png');

    /**
     * @description Load all sound effects.
     */
    this.load.audio('jump', ['assets/audio/jump.ogg', 'assets/audio/jump.wav']);
    this.load.audio('music', ['assets/audio/music.wav', 'assets/audio/music.mp3']);
};