import { gameObjects } from './gameObjects';

import { BALL_SPRITE_KEY } from '../common/sprites';

export const ballFactory = {
    create (x, y) {
        var ball = gameObjects.factory.sprite(x, y, BALL_SPRITE_KEY);

        // Give the ball some initial speed
        ball.body.velocity.x = 200;
        ball.body.velocity.y = -200;

        // Make sure the ball will bounce when hitting something
        ball.body.bounce.setTo(1);
        ball.body.collideWorldBounds = true;

        return ball;
    }
};