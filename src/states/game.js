import Phaser from 'phaser';

export class MainState extends Phaser.State {
    preload() {
        // Here we preload the assets

        this.game.load.image('paddle', './assets/images/paddle.png');
        this.game.load.image('brick', './assets/images/brick.png');
        this.game.load.image('ball', './assets/images/ball.png');
    }

    create() {
        // Here we create the game

        // Set the background color to blue
        this.game.stage.backgroundColor = '#3598db';

        // Start the Arcade physics system (for movements and collisions)
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        // Add the physics engine to all the game objetcs
        this.game.world.enableBody = true;

        // Create the left/right arrow keys
        this.left = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.right = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

        // Add the paddle at the bottom of the screen
        this.paddle = this.game.add.sprite(200, 400, 'paddle');

        // Make sure the paddle won't move when it hits the ball
        this.paddle.body.immovable = true;
        this.paddle.body.collideWorldBounds = true;

        // Create a group that will contain all the bricks
        this.bricks = this.game.add.group();

        // Add 25 bricks to the group (5 columns and 5 lines)
        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < 5; j++) {
                // Create the brick at the correct position
                var brick = this.game.add.sprite(55 + i * 60, 55 + j * 35, 'brick');

                // Make sure the brick won't move when the ball hits it
                brick.body.immovable = true;

                // Add the brick to the group
                this.bricks.add(brick);
            }
        }

        // Add the ball 
        this.ball = this.game.add.sprite(200, 300, 'ball');

        // Give the ball some initial speed
        this.ball.body.velocity.x = 200;
        this.ball.body.velocity.y = -200;

        // Make sure the ball will bounce when hitting something
        this.ball.body.bounce.setTo(1);
        this.ball.body.collideWorldBounds = true;
    }

    update() {
        // Here we update the game 60 times per second

        // Move the paddle left/right when an arrow key is pressed
        if (this.left.isDown) {
            this.paddle.body.velocity.x = -300;
        }
        else if (this.right.isDown) {
            this.paddle.body.velocity.x = 300;
        }
        // Stop the paddle when no key is pressed
        else {
            this.paddle.body.velocity.x = 0;
        }

        // Add collisions between the paddle and the ball
        this.game.physics.arcade.collide(this.paddle, this.ball);

        // Call the 'hit' function when the ball hits a brick
        this.game.physics.arcade.collide(this.ball, this.bricks, this.hit, null, this);

        // Restart the game if the ball is below the paddle
        if (this.ball.y > this.paddle.y) {
            this.game.state.start('main');
        }
    }

    hit(ball, brick) {
        brick.kill();
    }
}
