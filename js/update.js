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
    this.physics.add.collider(this.player1, this.entrancesAndExits);

    this.player2.setVelocityX(0);
    this.physics.add.collider(this.player2, this.backgroundLayer);
    this.physics.add.collider(this.player2, this.entrancesAndExits);

    this.physics.add.collider(this.player1, this.player2);

    /**
     * @description Check for user input and move the players correspondingly.
     */
    checkForUserinput(this, this.player1, 'player1');
    checkForUserinput(this, this.player2, 'player2');
}

/**
 * @function
 * @name addPlayerAnimations
 * @param { Object } game - The "this" instance.
 * @param { Object } player - The player instance.
 * @param { String } playerString - The player string to which the corresponding sprite is attached.
 * @description Check for user input using the player "controls" property.
 */
function checkForUserinput (game, player, playerString) {
    self  = game;
    if (!player.controls.left.isDown && !player.controls.right.isDown && !player.controls.up.isDown &&
        (player.body.onFloor() || player.body.touching.down)) {
        player.anims.play(`${playerString}_still`, true);
    }

    if (player.controls.left.isDown) {
        player.setVelocityX(-250);
        player.anims.play(`${playerString}_left`, true);
    }

    if (player.controls.right.isDown) {
        player.setVelocityX(250);
        player.anims.play(`${playerString}_right`, true);
    }

    if (player.controls.up.isDown && (player.body.onFloor() || player.body.touching.down) && self.time.now > player.jumpTime) {
        player.anims.play(`${playerString}_jump`, true);
        player.setVelocityY(-500);
        player.jumpTime = self.time.now + 500;
    }
}