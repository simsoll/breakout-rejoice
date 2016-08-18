import Phaser from 'phaser';

import { MENU_STATE } from '../common/states';
import { PADDLE_SPRITE_KEY, BRICK_SPRITE_KEY, BALL_SPRITE_KEY } from '../common/sprites';
import { header } from '../common/styles';

export const loadState = Object.assign(Object.create(Phaser.State), {
    preload() {
        this.game.add.text(80, 150, 'loading...', header);

        this.game.load.image(PADDLE_SPRITE_KEY, './assets/images/paddle.png');
        this.game.load.image(BRICK_SPRITE_KEY, './assets/images/brick.png');
        this.game.load.image(BALL_SPRITE_KEY, './assets/images/ball.png');
    },

    create() {
        this.game.state.start(MENU_STATE);
    }
});