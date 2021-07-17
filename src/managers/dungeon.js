import { FLOOR, TILE_SIZE, WALL } from '../constants/tiles';

import level from '../scenes/rooms/room_1';

export default class DungeonManager {
  constructor(scene) {
    this.scene = scene;
    this.level = level;

    const levelWithTiles = level.map((r) =>
      r.map((t) => (t === 1 ? this.sprites.wall : this.sprites.floor))
    );

    const config = {
      data: levelWithTiles,
      tileWidth: TILE_SIZE,
      tileHeight: TILE_SIZE,
    };

    const map = this.scene.make.tilemap(config);

    const tileset = map.addTilesetImage(
      'tiles',
      'tiles',
      TILE_SIZE,
      TILE_SIZE,
      0,
      1
    );

    this.map = map.createDynamicLayer(0, tileset, 0, 0);
  }

  get sprites() {
    return {
      floor: FLOOR,
      wall: WALL,
    };
  }

  isWalkableTile(x, y) {
    return this.level[y][x] !== 1;
  }

  initializeEntity(entity) {
    const x = this.map.tileToWorldX(entity.x);
    const y = this.map.tileToWorldY(entity.y);
    entity.sprite = this.scene.add.sprite(x, y, 'tiles', entity.tile);
    entity.sprite.setOrigin(0);
  }

  moveEntityTo(entity, x, y) {
    entity.moving = true;

    this.scene.tweens.add({
      targets: entity.sprite,
      onComplete: () => {
        entity.moving = false;
        entity.x = x;
        entity.y = y;
      },
      x: this.map.tileToWorldX(x),
      y: this.map.tileToWorldY(y),
      ease: 'Power2',
      duration: 200,
    });
  }
}
