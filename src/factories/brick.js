import { gameObjects } from './gameObjects';

import { BRICK_SPRITE_KEY } from '../common/sprites';

export const brickFactory = {
    create (x, y) {
        var brick = gameObjects.factory.sprite(x, y, BRICK_SPRITE_KEY);

        // Make sure the brick won't move when the ball hits it
        brick.body.immovable = true;

        return brick;
    }
};