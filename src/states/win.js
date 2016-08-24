import Phaser from 'phaser';

import { MENU_STATE } from '../common/states';
import { header, paragraph } from '../common/styles';

export const winState = Object.assign(Object.create(Phaser.State), {
    preload() {
        this.game.add.text(80, 80, 'YOU WIN!', header);
        this.game.add.text(80, 150, 'press ENTER to continue', paragraph);

        this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER)
            .onDown.addOnce(this.goToMenu, this);

    },

    goToMenu() {
        this.game.state.start(MENU_STATE);
    }

});