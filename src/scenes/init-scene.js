import { TILE_SIZE } from '../constants/tiles';

import PlayerCharacter from '../entities/player';
import BasicMonster from '../entities/basic-monster';

import dungeonManager from '../managers/dungeon';

export default class InitScene extends Phaser.Scene {
  constructor(turnManager) {
    super('world-scene');

    this.turnManager = turnManager;
    this.dungeon = dungeonManager;
  }

  preload() {
    this.load.spritesheet('tiles', 'src/assets/colored_transparent.png', {
      frameWidth: TILE_SIZE,
      frameHeight: TILE_SIZE,
      spacing: 1,
    });
  }

  create() {
    this.dungeon.initialize(this);

    this.dungeon.player = new PlayerCharacter(this.dungeon, 15, 15);

    this.turnManager.addEntity(this.dungeon.player);
    this.turnManager.addEntity(new BasicMonster(this.dungeon, 20, 20));
    this.turnManager.addEntity(new BasicMonster(this.dungeon, 20, 10));
    this.turnManager.addEntity(new BasicMonster(this.dungeon, 76, 10));
    this.turnManager.addEntity(new BasicMonster(this.dungeon, 29, 24));
    this.turnManager.addEntity(new BasicMonster(this.dungeon, 29, 20));

    const camera = this.cameras.main;
    camera.setViewport(
      0,
      0,
      camera.worldView.width - 200,
      camera.worldView.height
    );
    camera.setBounds(0, 0, camera.worldView.width, camera.worldView.height);
    camera.startFollow(this.dungeon.player.sprite);

    this.events.emit('createUI');
  }

  update() {
    if (this.turnManager.over()) {
      this.turnManager.refresh();
    }

    this.turnManager.turn();
  }
}
