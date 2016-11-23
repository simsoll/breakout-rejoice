import { Factory } from './factory'
import { BALL_SPRITE_KEY } from '../common/sprites';

export const getBallFactory = (game: Phaser.Game) => {
	const factory = new Phaser.GameObjectFactory(game);

	const create = (x: number, y: number): Ball => {
		const sprite = factory.sprite(x, y, BALL_SPRITE_KEY);
        sprite.body.velocity.x = 0;
        // Give the sprite some initial speed
        sprite.body.velocity.x = 0;
        sprite.body.velocity.y = -200;

        // Make sure the sprite will bounce when hitting something
        sprite.body.bounce.setTo(1);
        sprite.body.collideWorldBounds = true;
        sprite.anchor.set(0.5);     

        return Object.assign(sprite) as Ball;   
    } 

	return {
		create: create
    } as Factory<Ball>;
}

export interface Ball extends Phaser.Sprite {
}