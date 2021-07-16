import level from './rooms/room_1';

import { FLOOR, TILE_SIZE, WALL } from '../constants/tiles';

export default class InitScene extends Phaser.Scene {
  preload() {
    this.load.spritesheet('tiles', 'src/assets/colored.png', {
      frameWidth: TILE_SIZE,
      frameHeight: TILE_SIZE,
      spacing: 1,
    });
  }

  create() {
    let mappedLevel = level.map((r) => r.map((t) => (t == 1 ? WALL : FLOOR)));

    const config = {
      data: mappedLevel,
      tileWidth: TILE_SIZE,
      tileHeight: TILE_SIZE,
    };

    const map = this.make.tilemap(config);

    const tileset = map.addTilesetImage(
      'tiles',
      'tiles',
      TILE_SIZE,
      TILE_SIZE,
      0,
      1
    );

    const ground = map.createStaticLayer(0, tileset, 0, 0);
  }
}
