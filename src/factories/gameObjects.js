import Phaser from 'phaser';

export const gameObjects = {
    init(game) {
        this.factory = new Phaser.GameObjectFactory(game);
    }
};