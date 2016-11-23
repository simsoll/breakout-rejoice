import * as Phaser from 'phaser';
import { getInputService, InputService } from '../services/input';

import { LOSE_STATE, WIN_STATE } from '../common/states';

import { getBallFactory, Ball } from '../factories/ball';
import { getBrickFactory, Brick } from '../factories/brick';
import { getPaddleFactory, Paddle } from '../factories/paddle';

interface PlayState {
    paddle?: Paddle;
    ball?: Ball;
	bricks?: Phaser.Group;
    inputService?: InputService
}

export const playState = (game: Phaser.Game) => {
	
    let state = {} as PlayState;

    const factoriesWrapper = (game: Phaser.Game) => {
        return {
            ballFactory: getBallFactory(game),
            brickFactory: getBrickFactory(game),
            paddleFactory: getPaddleFactory(game)
        };
    }

    const servicesWrapper = (game: Phaser.Game) => {
	    return {
            inputService: getInputService(game.input.keyboard, [Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT]) 
        };
    }

    const ballHitPaddle = (ball: Ball, paddle: Paddle) => {
        ball.body.velocity.x = -1 * 5 * (paddle.x - ball.x);
    };

    const ballHitBrick = (ball: Ball, brick: Brick) => {
        brick.kill();
    };

    const create = () => {
        // Add the physics engine to all the game objetcs
        game.world.enableBody = true;

		const factories = factoriesWrapper(game);

		state.paddle = factories.paddleFactory.create(200,400);
	    state.ball = factories.ballFactory.create(200, 300);		
	
		// Create a group that will contain all the bricks
	    state.bricks = game.add.group();

	    // Add 25 bricks to the group (5 columns and 5 lines)
	    for (var i = 0; i < 5; i++) {
	        for (var j = 0; j < 5; j++) {
	            // Create the brick at the correct position
	            const brick = factories.brickFactory.create(55 + i * 60, 55 + j * 35);
	
	            state.bricks.add(brick);
	        }
	    }   

        // Setup input service
		state.inputService = servicesWrapper(game).inputService;
        state.inputService.addListeners(Phaser.Keyboard.LEFT, state.paddle.moveLeft, () => {}, state.paddle);
        state.inputService.addListeners(Phaser.Keyboard.RIGHT, state.paddle.moveRight, () => {}, state.paddle);
    }

    
    const update = () => {
        // Here we update the game 60 times per second

        state.inputService.update();

        state.paddle.refresh();

        // Add collisions between the paddle and the ball
        game.physics.arcade.collide(state.ball, state.paddle, ballHitPaddle);

        // Call the 'hit' function when the ball hits a brick
        game.physics.arcade.collide(state.ball, state.bricks, ballHitBrick);

        // If the ball is below the paddle then game over!
        if (state.ball.y > state.paddle.y) {
            game.state.start(LOSE_STATE);
        }

        if (state.bricks.countLiving() === 0) {
            game.state.start(WIN_STATE);
        }
    }

	return {
        create: create,
        update: update
    } as Phaser.State;    
};