import { LOAD_STATE } from '../common/states';

export const bootState = (game: Phaser.Game) =>  {
    const create = (): void => {
        game.stage.backgroundColor = '#3598db';

        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.state.start(LOAD_STATE);
    };

	return {
        create: create
    } as Phaser.State;
};