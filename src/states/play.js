import Phaser from 'phaser';
import { gameObjects } from '../factories/gameObjects';

import { LOSE_STATE } from '../common/states';

import { ballFactory } from '../factories/ball';
import { brickFactory } from '../factories/brick';
import { paddleFactory } from '../factories/paddle';

export const playState = Object.assign(Object.create(Phaser.State), {
    preload() {
        gameObjects.init(this.game);
    },

    create() {
        // Add the physics engine to all the game objetcs
        this.game.world.enableBody = true;

        // Create the left/right arrow keys
        this.left = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.right = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

        this.paddle = paddleFactory.create(200, 400);

        // Create a group that will contain all the bricks
        this.bricks = this.game.add.group();

        // Add 25 bricks to the group (5 columns and 5 lines)
        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < 5; j++) {
                // Create the brick at the correct position
                const brick = brickFactory.create(55 + i * 60, 55 + j * 35);

                this.bricks.add(brick);
            }
        }

        this.ball = ballFactory.create(200,300);
    },

    update() {
        // Here we update the game 60 times per second

        // Move the paddle left/right when an arrow key is pressed
        if (this.left.isDown) {
            this.paddle.moveLeft();
        }
        else if (this.right.isDown) {
            this.paddle.moveRight();
        }
        // Stop the paddle when no key is pressed
        else {
            this.paddle.stop();
        }

        // Add collisions between the paddle and the ball
        this.game.physics.arcade.collide(this.paddle, this.ball);

        // Call the 'hit' function when the ball hits a brick
        this.game.physics.arcade.collide(this.ball, this.bricks, this.hit, null, this);

        // If the ball is below the paddle then game over!
        if (this.ball.y > this.paddle.y) {
            this.game.state.start(LOSE_STATE);
        }
    },

    hit(ball, brick) {
        brick.kill();
    }    
});