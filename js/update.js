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

    checkForCollisionBetweenPlayerAndEnemy(this, this.player1, this.skeletonLeft, 'Blue');
    checkForCollisionBetweenPlayerAndEnemy(this, this.player1, this.skeletonRight, 'Blue');
    checkForCollisionBetweenPlayerAndEnemy(this, this.player2, this.skeletonLeft, 'Red');
    checkForCollisionBetweenPlayerAndEnemy(this, this.player2, this.skeletonRight, 'Red');

    if (this.skeletonLeft.x > exitTubesPositionBoundaries.right.x && this.skeletonLeft.y > exitTubesPositionBoundaries.right.y) {
        this.skeletonLeft.destroy();
        this.skeletonLeft.isDestroyed = true;

    }

    if (this.skeletonRight.x < exitTubesPositionBoundaries.left.x && this.skeletonRight.y > exitTubesPositionBoundaries.left.y) {
        this.skeletonRight.destroy();
        this.skeletonRight.isDestroyed = true;
    }

    if (this.skeletonLeft.isDestroyed && this.skeletonRight.isDestroyed) {
        this.spawnSkeletons(this);
    }

    if (this.ghost1 && this.ghost2) {
        this.physics.moveToObject(this.ghost1, this.player1, enemyVelocity.ghost.x, 800);
        this.physics.moveToObject(this.ghost2, this.player2, enemyVelocity.ghost.x, 800);

        checkForCollisionBetweenPlayerAndEnemy(this, this.player1, this.ghost1, 'Blue');
        checkForCollisionBetweenPlayerAndEnemy(this, this.player1, this.ghost2, 'Blue');
        checkForCollisionBetweenPlayerAndEnemy(this, this.player2, this.ghost1, 'Red');
        checkForCollisionBetweenPlayerAndEnemy(this, this.player2, this.ghost2, 'Red');
    }

    if (this.bat1 && this.bat2) {
        this.physics.moveToObject(this.bat1, this.player1, enemyVelocity.bat.x, 2000);
        this.physics.moveToObject(this.bat2, this.player2, enemyVelocity.bat.x, 2000);

        checkForCollisionBetweenPlayerAndEnemy(this, this.player1, this.bat1, 'Blue');
        checkForCollisionBetweenPlayerAndEnemy(this, this.player1, this.bat2, 'Blue');
        checkForCollisionBetweenPlayerAndEnemy(this, this.player2, this.bat1, 'Red');
        checkForCollisionBetweenPlayerAndEnemy(this, this.player2, this.bat2, 'Red');
    }
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
        player.setVelocityX(-playerVelocity.x);
        player.anims.play(`${playerString}_left`, true);
    }

    if (player.controls.right.isDown) {
        player.setVelocityX(playerVelocity.x);
        player.anims.play(`${playerString}_right`, true);
    }

    if (player.controls.up.isDown && (player.body.onFloor() || player.body.touching.down) && self.time.now > player.jumpTime) {
        player.anims.play(`${playerString}_jump`, true);
        player.setVelocityY(-playerVelocity.y);
        player.jumpTime = self.time.now + playerVelocity.y;
    }
}

/**
 * @function
 * @name checkForCollisionBetweenPlayerAndEnemy
 * @param { Object } game - The "this" instance.
 * @param { Object } player - The player instance.
 * @param { Object } enemy - The enemy instance.
 * @param { String } winingPlayerString - The color of the wining player.
 * @description Check for collision between a player and an enemy.
 */
function checkForCollisionBetweenPlayerAndEnemy (game, player, enemy, winingPlayerString) {
    self  = game;
    self.physics.add.overlap(player, enemy, () => {
        gameOver(game, winingPlayerString, player);
    }, null, self);
}

/**
 * @function
 * @name gameOver
 * @param { Object } game - The "this" instance.
 * @param { String } winingPlayerString - The color of the wining player.
 * @description Display game over message.
 */
function gameOver (game, winingPlayerString) {
    self = game;
    self.scene.pause();

    let winText = self.add.text(self.backgroundLayer.width / 2, (self.backgroundLayer.height / 2) - 100, `${winingPlayerString} player wins!`);
    winText.setOrigin(0.5, 0.5);
}