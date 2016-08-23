import { gameObjects } from './gameObjects';

import { PADDLE_SPRITE_KEY } from '../common/sprites';

const moveLeft = function moveLeft() {
    this.body.velocity.x = -300;
};

const moveRight = function moveRight() {
    this.body.velocity.x = 300;
};

const stop = function stop() {
    this.body.velocity.x = 0;
};

export const paddleFactory = {
    create (x, y) {
        var paddle = gameObjects.factory.sprite(x, y, PADDLE_SPRITE_KEY);

        // Make sure the paddle won't move when it hits the ball
        paddle.body.immovable = true;
        paddle.body.collideWorldBounds = true;

        paddle.moveLeft = moveLeft;
        paddle.moveRight = moveRight;
        paddle.stop = stop;

        return paddle;
    }
};