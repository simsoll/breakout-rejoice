export const getInputService = (keyboard: Phaser.Keyboard, keyCodes: number[]) => {
	const keys = keyCodes.map((keyCode: number) => {
        return keyboard.addKey(keyCode);
    });

	const addListeners = (keyCode: number, downListener: Function, upListener: Function, context: any) : void => {
        const key = keys.filter((key: Phaser.Key) => key.keyCode === keyCode)[0];

        if (key) {
            key.onDown.add(downListener, context);
            key.onUp.add(upListener, context);
        }
	};

    const update = () => {
        //ensure onHold is also dispatching onDown events
        keys.forEach((key: Phaser.Key) => {
			if (key.isDown) {
                key.onDown.dispatch();
            }
        });
    };    

    return {
        addListeners: addListeners,
        update: update
    } as InputService;
};

export interface InputService {
    addListeners(keyCode: number, downListener: Function, upListener: Function, context: any): void;
    update(): void;
}