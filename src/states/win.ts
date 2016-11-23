import * as Phaser from 'phaser';
import { MENU_STATE } from '../common/states';
import { header, paragraph } from '../common/styles';

export const winState = (game: Phaser.Game) => {
    const goToMenu = () => game.state.start(MENU_STATE);

    const preload = () => {
        game.add.text(80, 80, 'YOU WON!', header);
        game.add.text(80, 150, 'press ENTER to continue', paragraph);

        game.input.keyboard.addKey(Phaser.Keyboard.ENTER)
            .onDown.addOnce(goToMenu);
    };
	
    return {
        preload: preload
    } as Phaser.State;
};