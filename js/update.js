let map;
let layer1;
let layer2;

let snd;

let player1;
let player2;
let controlsP1 = {};
let controlsP2 = {};

let playerSpeed = 300;
let jumpTime = 0;
let jumpTime1 = 0;

let evilShroom;
let evilShroom2;
let evilShroomSpeed = 2;
let evilShroomSpeed2 = -2;

//enemy spawn places
EvilShroomSpawn1 = function(game) {
    evilShroom = this.add.sprite(100, 96, 'evilShroom');
    this.physics.arcade.enable(this.evilShroom);
    evilShroom.anchor.set(0.5, 0.5);
};

EvilShroomSpawn2 = function(game) {
    evilShroom2 = this.add.sprite(500, 96, 'evilShroom');
    this.physics.arcade.enable(this.evilShroom2);
    evilShroom2.anchor.set(0.5, 0.5);
};

//win conditions
player1Win = function(game) {
    this.paused = true;
    let p1wins = this.add.text(this.world.centerX, this.world.centerY, 'Player 1 Wins');
};

player2Win = function(game) {
    this.paused = true;
    let p2wins = this.add.text(this.world.centerX, this.world.centerY, 'Player 2 Wins');
}

/**
 * @function
 * @name update
 * @description Check if collisions or user inputs occur and update the render.
 */
function update () {
    /**
     * @description Check for collision and reset the players' velocity.
     */
    this.player1.setVelocityX(0);
    this.physics.add.collider(this.player1, this.backgroundLayer);

    /**
     * @description Check for user input for player 1.
     */
    if (!this.cursors.left.isDown && !this.cursors.right.isDown && !this.cursors.up.isDown &&
        (this.player1.body.onFloor() || this.player1.body.touching.down)) {
        this.player1.anims.play('still', true);
    }

    if (this.cursors.left.isDown) {
        this.player1.setVelocityX(-250);
        this.player1.anims.play('left', true);
    }

    if (this.cursors.right.isDown) {
        this.player1.setVelocityX(250);
        this.player1.anims.play('right', true);
    }

    if (this.cursors.up.isDown && (this.player1.body.onFloor() || this.player1.body.touching.down) && this.time.now > this.jumpTime) {
        this.player1.anims.play('jump', true);
        this.player1.setVelocityY(-500);
        this.jumpTime = this.time.now + 500;
    }

    /**
     * @description Check for user input for player 2.
     */
    if (!this.cursors.left.isDown && !this.cursors.right.isDown && !this.cursors.up.isDown &&
        (this.player1.body.onFloor() || this.player1.body.touching.down)) {
        this.player1.anims.play('still', true);
    }

    if (this.cursors.left.isDown) {
        this.player1.setVelocityX(-250);
        this.player1.anims.play('left', true);
    }

    if (this.cursors.right.isDown) {
        this.player1.setVelocityX(250);
        this.player1.anims.play('right', true);
    }

    if (this.cursors.up.isDown && (this.player1.body.onFloor() || this.player1.body.touching.down) && this.time.now > this.jumpTime) {
        this.player1.anims.play('jump', true);
        this.player1.setVelocityY(-500);
        this.jumpTime = this.time.now + 500;
    }
    // this.physics.arcade.collide(player2, layer1);
    // this.physics.arcade.collide(player1, player2);

    // this.physics.arcade.collide(player1, layer2);
    // this.physics.arcade.collide(player2, layer2);

    // this.physics.arcade.collide(evilShroom, layer1);
    // this.physics.arcade.collide(evilShroom2, layer1);

    // //players velocity resets every frame
    // player1.body.velocity.x = 0;
    // player2.body.velocity.x = 0;


    // //enemy velocity, collision check, and respawn.
    // if (evilShroom.x > 512 || evilShroom.x <0){
    //     evilShroomSpeed = -evilShroomSpeed;
    // };

    // if (evilShroom2.x > 512 || evilShroom2.x <0){
    //     evilShroomSpeed2 = -evilShroomSpeed2;
    // };

    // if(evilShroom.x < 64 && evilShroom.y > 390){
    //     evilShroom.kill();
    //     EvilShroomSpawn1(game);
    // }

    // if(evilShroom2.x > 448 && evilShroom2.y > 390){
    //     evilShroom2.kill();
    //     EvilShroomSpawn2(game);
    // }

    // evilShroom.x += evilShroomSpeed;
    // evilShroom2.x += evilShroomSpeed2;


    // //check if controls pressed, then take action
    // if (controlsP1.up.isDown && (player1.body.onFloor() || player1.body.touching.down) && this.time.now > jumpTime) {
    //     snd.play();
    //     player1.animations.play('jump');
    //     player1.body.velocity.y = -600;
    //     jumpTime = this.time.now + 750;
    // };

    // if (controlsP2.up.isDown && (player2.body.onFloor() || player2.body.touching.down) && this.time.now > jumpTime1) {
    //     snd.play('', 0, 0.2);
    //     player2.animations.play('jump');
    //     player2.body.velocity.y = -600;
    //     jumpTime1 = this.time.now + 750;
    // };


    // if(controlsP1.right.isDown){
    //     player1.animations.play('run');
    //     player1.scale.set(-1,1);
    //     player1.body.velocity.x += playerSpeed;
    // };

    // if(controlsP2.right.isDown){
    //     player2.animations.play('run');
    //     player2.scale.set(-1,1);
    //     player2.body.velocity.x += playerSpeed;
    // };

    // if(controlsP1.left.isDown){
    //     player1.animations.play('run');
    //     player1.scale.set(1,1);
    //     player1.body.velocity.x -= playerSpeed;
    // };

    // if(controlsP2.left.isDown){
    //     player2.animations.play('run');
    //     player2.scale.set(1,1);
    //     player2.body.velocity.x -= playerSpeed;
    // };

    // //check for collision
    // if(this.physics.arcade.overlap(player1, evilShroom)){
    //     player1.kill();
    //     player2Win(game);
    // }

    // else if(this.physics.arcade.overlap(player1, evilShroom2)){
    //     player1.kill();
    //     player2Win(game);
    // }

    // else if(this.physics.arcade.overlap(player2, evilShroom)){
    //     player2.kill();
    //     player1Win(game);
    // }

    // else if(this.physics.arcade.overlap(player2, evilShroom2)){
    //     player2.kill();
    //     player1Win(game);
    // }
};