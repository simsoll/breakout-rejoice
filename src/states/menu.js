import Phaser from 'phaser';

import { PLAY_STATE } from '../common/states';
import { header, paragraph } from '../common/styles';

export const menuState = Object.assign(Object.create(Phaser.State), {
    preload() {
        this.game.add.text(80, 80, 'Breakout Rejoice!', header);
        this.game.add.text(80, 150, 'press ENTER to start', paragraph);

        this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER)
            .onDown.addOnce(this.startGame, this);
    },

    startGame() {
        this.game.state.start(PLAY_STATE);
    }

});