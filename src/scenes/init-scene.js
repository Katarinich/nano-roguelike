import { FLOOR, TILE_SIZE, WALL } from '../constants/tiles';
import PlayerCharacter from '../player';
import DungeonManager from '../managers/dungeon';
import TurnManager from '../managers/turn';

export default class InitScene extends Phaser.Scene {
  preload() {
    this.load.spritesheet('tiles', 'src/assets/colored.png', {
      frameWidth: TILE_SIZE,
      frameHeight: TILE_SIZE,
      spacing: 1,
    });
  }

  create() {
    this.dungeon = new DungeonManager(this);
    const player = new PlayerCharacter(this.dungeon, 15, 15);

    this.turnManager = new TurnManager();

    this.turnManager.addEntity(player);
  }

  update() {
    if (this.turnManager.over()) {
      this.turnManager.refresh();
    }

    this.turnManager.turn();
  }
}
