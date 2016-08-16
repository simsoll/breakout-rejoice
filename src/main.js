import 'pixi';
import 'p2';
import Phaser from 'phaser';

import { MainState } from './states/game';

var game = new Phaser.Game(400, 450);
game.state.add('main', MainState);  
game.state.start('main');