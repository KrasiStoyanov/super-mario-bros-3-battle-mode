/**
 * @function
 * @name preload
 * @description Preload the needed assets.
 */
function preload () {
    /**
     * @description Load all sprites and tilemaps.
     * @source { map } https://kronbits.itch.io/inca-game-assets
     * @source { skeleton, ghost, bat } https://ansimuz.itch.io/grotto-escape-chibi-monsters
     */
    this.load.tilemapTiledJSON('map', 'assets/sprites/map.json');
    this.load.image('tileSet', 'assets/sprites/tileSet.png');
    this.load.spritesheet('player1', 'assets/sprites/player-1.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('player2', 'assets/sprites/player-2.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('skeleton', 'assets/sprites/skeleton.png', { frameWidth: 18, frameHeight: 32 });
    this.load.image('ghost', 'assets/sprites/ghost.png');
    this.load.image('bat', 'assets/sprites/bat.png');

    /**
     * @description Load all sound effects.
     * @source { music } https://jonathan-so.itch.io/creatorpack
     * @source { jump } https://freesound.org/people/acebrian/sounds/380471/
     * @source { gameOver } https://freesound.org/people/landlucky/sounds/277403/
     */
    this.load.audio('music', ['assets/audio/music.wav', 'assets/audio/music.ogg', 'assets/audio/music.mp3']);
    this.load.audio('jump', ['assets/audio/jump.wav', 'assets/audio/jump.ogg']);
    this.load.audio('gameOver', ['assets/audio/game-over.wav', 'assets/audio/game-over.ogg']);
};