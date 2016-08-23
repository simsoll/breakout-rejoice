import Phaser from 'phaser';

export const inputService = {
    init(game, keyCodes) {
        let keys = {};
        keyCodes.forEach(function(value) {
            let key = game.input.keyboard.addKey(value);
            keys[value] = {
                key: key,
                isDownSignal: new Phaser.Signal(),
                onUpSignal: key.onUp
            };
        });

        this.keys = keys;
    },

    addListener(keyCode, isDown, onUp, context) {
        this.keys[keyCode].isDownSignal.add(isDown, context);
        this.keys[keyCode].onUpSignal.add(onUp, context);
    },

    update() {
        let keys = this.keys;
        Object.keys(keys).forEach(function(valueKey) {
            const value = keys[valueKey];

            if (value.key.isDown) {
                value.isDownSignal.dispatch();
            }
        });
    }
};