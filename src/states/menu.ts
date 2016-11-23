import { PLAY_STATE } from '../common/states';
import { header, paragraph } from '../common/styles';

export const menuState = (game: Phaser.Game) => {
    const startGame = () => game.state.start(PLAY_STATE);

    const preload = () => {
        game.add.text(80, 80, 'Menu State!', header);
        game.add.text(80, 150, 'press ENTER to start', paragraph);

        game.input.keyboard.addKey(Phaser.Keyboard.ENTER)
            .onDown.addOnce(startGame);
    };
	
    return {
        preload: preload
    } as Phaser.State;
};