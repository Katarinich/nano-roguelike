import { TILE_SIZE } from '../constants/tiles';

import PlayerCharacter from '../entities/player';
import BasicMonster from '../entities/basic-monster';

import TurnManager from '../managers/turn';
import DungeonManager from '../managers/dungeon';

export default class InitScene extends Phaser.Scene {
  preload() {
    this.load.spritesheet('tiles', 'src/assets/colored.png', {
      frameWidth: TILE_SIZE,
      frameHeight: TILE_SIZE,
      spacing: 1,
    });
  }

  create() {
    this.turnManager = new TurnManager();

    this.dungeon = new DungeonManager(this, this.turnManager);

    this.dungeon.player = new PlayerCharacter(this.dungeon, 15, 15);

    this.turnManager.addEntity(this.dungeon.player);
    this.turnManager.addEntity(new BasicMonster(this.dungeon, 15, 18));
  }

  update() {
    if (this.turnManager.over()) {
      this.turnManager.refresh();
    }

    this.turnManager.turn();
  }
}
