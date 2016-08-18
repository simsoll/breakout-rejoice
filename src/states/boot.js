import Phaser from 'phaser';
import { LOAD_STATE } from '../common/states';

export const bootState = Object.assign(Object.create(Phaser.State), {
    create() {
        this.game.stage.backgroundColor = '#3598db';

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.game.state.start(LOAD_STATE);
    }
});