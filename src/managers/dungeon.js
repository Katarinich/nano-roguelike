import { FLOOR, TILE_SIZE, WALL } from '../constants/tiles';
import level from '../scenes/rooms/room_1';

export default class DungeonManager {
  constructor(scene) {
    this.scene = scene;

    scene.level = level.map((r) =>
      r.map((t) => (t === 1 ? this.sprites.wall : this.sprites.floor))
    );

    const config = {
      data: scene.level,
      tileWidth: TILE_SIZE,
      tileHeight: TILE_SIZE,
    };

    const map = scene.make.tilemap(config);

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
}
