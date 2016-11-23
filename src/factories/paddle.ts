import { Factory } from './factory'
import { PADDLE_SPRITE_KEY } from '../common/sprites';

export interface Paddle extends Phaser.Sprite {
    moveLeft(): void;
    moveRight(): void;
    refresh(): void;
}

export const getPaddleFactory = (game: Phaser.Game) => {
	const factory = new Phaser.GameObjectFactory(game);

	const acceleration = 50;
	const maxVelocity = 200;

    let actions = new Set<Action>();

	const create = (x: number, y: number): Paddle => {		
		const sprite = factory.sprite(x, y, PADDLE_SPRITE_KEY);
        sprite.anchor.set(0.5,1);

        // Make sure the paddle won't move when it hits the ball
        sprite.body.immovable = true;
        sprite.body.collideWorldBounds = true;

		//ensure velocity descreases over time when the player is inactive
        sprite.body.drag.x = 200;

		const moveLeft = () => {
            actions.add({kind: "left", value: acceleration});
        };
		const moveRight = () => {
            actions.add({kind: "right", value: acceleration})
        };

        const refresh = () => {
            actions.forEach((action: Action) => {
                switch(action.kind) {
                    case "left": 
                    	sprite.body.velocity.x += -action.value;
                        break;
                    case "right": 
                    	sprite.body.velocity.x += action.value;
                        break;
                }
            });

            sprite.body.velocity.x = Phaser.Math.clamp(sprite.body.velocity.x, -maxVelocity, maxVelocity);

            actions.clear();
        };

        return Object.assign(sprite, {
            moveLeft: moveLeft,
            moveRight: moveRight,
            refresh: refresh
        }) as Paddle;
    } 

	return {
		create: create
    } as Factory<Paddle>
}

type Action = Left | Right;

interface Left {
    kind: "left";
    value: number;
}

interface Right {
    kind: "right";
    value: number;
}