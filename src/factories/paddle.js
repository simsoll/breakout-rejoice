import { gameObjects } from './gameObjects';

import { PADDLE_SPRITE_KEY } from '../common/sprites';

export const paddleFactory = {
    create (x, y) {
        var paddle = gameObjects.factory.sprite(x, y, PADDLE_SPRITE_KEY);

        // Make sure the paddle won't move when it hits the ball
        paddle.body.immovable = true;
        paddle.body.collideWorldBounds = true;

        return paddle;
    }
};