import Phaser from 'phaser';

import config from './config';
import InitScene from './scenes/init-scene';
import UI from './scenes/ui';

import turnManager from './managers/turn';

class Game extends Phaser.Game {
  constructor() {
    super(config);

    const worldScene = new InitScene(turnManager);

    const uiScene = new UI(turnManager);

    this.scene.add('world-scene', worldScene);
    this.scene.add('ui-scene', uiScene);

    this.scene.start('world-scene');
    this.scene.start('ui-scene');
  }
}

const game = new Game();
