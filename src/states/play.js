import Phaser from 'phaser';
import { inputService } from '../services/input';
import { gameObjects } from '../factories/gameObjects';

import { LOSE_STATE, WIN_STATE } from '../common/states';

import { ballFactory } from '../factories/ball';
import { brickFactory } from '../factories/brick';
import { paddleFactory } from '../factories/paddle';

export const playState = Object.assign(Object.create(Phaser.State), {
    preload() {
        gameObjects.init(this.game);
        inputService.init(this.game, [Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT]);
    },

    create() {
        // Add the physics engine to all the game objetcs
        this.game.world.enableBody = true;

        // Create the left/right arrow keys
        this.paddle = paddleFactory.create(200, 400);

        // Setup input service
        inputService.addListener(Phaser.Keyboard.LEFT, this.paddle.moveLeft, this.paddle.stop, this.paddle);
        inputService.addListener(Phaser.Keyboard.RIGHT, this.paddle.moveRight, this.paddle.stop, this.paddle);

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

        this.ball = ballFactory.create(200, 300);
    },

    update() {
        // Here we update the game 60 times per second

        inputService.update();

        // Add collisions between the paddle and the ball
        this.game.physics.arcade.collide(this.ball, this.paddle, this.ballHitPaddle);

        // Call the 'hit' function when the ball hits a brick
        this.game.physics.arcade.collide(this.ball, this.bricks, this.ballHitBrick);

        // If the ball is below the paddle then game over!
        if (this.ball.y > this.paddle.y) {
            this.game.state.start(LOSE_STATE);
        }

        if (this.bricks.countLiving() === 0) {
            this.game.state.start(WIN_STATE);
        }
    },

    ballHitPaddle(ball, paddle) {
        ball.body.velocity.x = -1 * 5 * (paddle.x - ball.x);
    },

    ballHitBrick(ball, brick) {
        brick.kill();
    }
});
