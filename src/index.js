import Phaser from 'phaser';

import config from './config';
import InitScene from './scenes/init-scene';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add('Scene', new InitScene());
    this.scene.start('Scene');
  }
}

const game = new Game();
