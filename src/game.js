import 'pixi';
import 'p2';
import Phaser from 'phaser';

import * as states from './states';
import { BOOT_STATE } from './common/states';

var game = new Phaser.Game(400, 450, Phaser.AUTO, 'content');

Object.keys(states).forEach(state => game.state.add(state, states[state]));

game.state.start(BOOT_STATE);