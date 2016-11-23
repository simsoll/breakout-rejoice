import { MENU_STATE } from '../common/states';
import { PADDLE_SPRITE_KEY, BRICK_SPRITE_KEY, BALL_SPRITE_KEY, PLAYER_SPRITE_KEY } from '../common/sprites';
import { header } from '../common/styles';

export const loadState = (game: Phaser.Game) => {
    const preload = () => {
        game.add.text(80, 150, 'loading...', header);

        game.load.image(PADDLE_SPRITE_KEY, './assets/images/paddle.png');
        game.load.image(BRICK_SPRITE_KEY, './assets/images/brick.png');
        game.load.image(BALL_SPRITE_KEY, './assets/images/ball.png');
        game.load.image(PLAYER_SPRITE_KEY, './assets/images/swordsman.png');
    };

    const create = () => {
        game.state.start(MENU_STATE);
    };

    return {
        preload: preload,
        create: create
    } as Phaser.State;
};